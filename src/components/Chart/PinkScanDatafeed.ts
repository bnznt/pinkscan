import global from "@/globals";
import { findIndex } from "lodash";
import { getTransactions } from "@/api/transaction.api";
import { batchTicksToCandle } from "candlestick-convert";
import { TransactionService } from "@/lib/transactions/TransactionService";

const config = {
    supports_search: false,
    supports_group_request: true,
    supports_marks: false,
    supports_timescale_marks: false,
    supported_resolutions: ['1', '3', '5', '15', '30', '60', '120', '240', '360', '720', '1D', '3D', '1W', '1M']
};

const resolutionMap = {
    '1': 60,
    '3': 180,
    '5': 300,
    '30': 30 * 60,
    '60': 60 * 60,
    '120': 60 * 60 * 2,
    '240': 60 * 60 * 4,
    '360': 60 * 60 * 6,
    '1D': 86400,
    '3D': 86400 * 3,
    '1w': 86400 * 7,
    '1M': 86400 * 30,
};

const lastBarsCache = new Map();

const channelToSubscription = new Map();

const getNextBarTime = (barTime:any, resolution:any) => {
    let interval = resolutionMap[resolution]
	return barTime + interval * 1000;
}

const fetchMainNetTransaction = async (transactionService: any = null, resolution:any = '', channelString:any = '') => {

    if(!global.state.pair.main_net_running) {
        return;
    }

    if(!(transactionService instanceof TransactionService)) {
        transactionService = new TransactionService();
        await transactionService.init({
            nameTokenOne: global.state.pair.name_token_1,
            nameTokenTwo: global.state.pair.name_token_2,
            nameFactory: 'BUSD'
        })
    }

    let transactions = await transactionService.getTransactions();

    if(transactions.length < 1) {
        global.pushTransaction({})
        fetchMainNetTransaction(transactionService, resolution, channelString)
        setTimeout(() => {
        }, 500);
        return;
    }
    
    transactions.forEach((transaction:any) => {
        
        if (findIndex(global.state.pair.transactions, (trans:any) => { return trans.tx == transaction.tx; }) !== -1) {
            return;
        }

        global.pushTransaction(transaction)

        const subscriptionItem = channelToSubscription.get(channelString);
        const prevBar = subscriptionItem.prevBar;
        const tradeTime = new Date(transaction.time).getTime()
        const tradePrice = Number(transaction.price_per_token)
        const tradeVolume = Number(transaction.price)
        const nextBarTime = getNextBarTime(prevBar.time, resolution);
        let bar;

        if ( tradeTime >= nextBarTime) {
            bar = {
                time: nextBarTime,
                open: tradePrice,
                high: tradePrice,
                low: tradePrice,
                close: tradePrice,
                volume: tradeVolume
            };
            console.log('[realtime] Generate new bar', bar);
        } else {
            bar = {
                ...prevBar,
                high: Math.max(prevBar.high, tradePrice),
                low: Math.min(prevBar.low, tradePrice),
                close: tradePrice,
                volume: ( prevBar.volume + tradeVolume )
            };
            console.log('[realtime] Update the latest bar by price', bar);
        }
        subscriptionItem.prevBar = bar;
        subscriptionItem.handlers.forEach((handler:any) => handler.callback(bar));
    });

    fetchMainNetTransaction(transactionService, resolution, channelString)
    setTimeout(() => {
    }, 500);
}


export default {
    
    onReady: (callback:any) => {
        console.log('[onReady]: Method call');
        setTimeout(() => callback(config))
        console.log(global.state.pair)
    },
    searchSymbols: (userInput:any, exchange:any, symbolType:any, onResultReadyCallback:any) => {
		console.log('====Search Symbols running')
	},
    resolveSymbol: (symbolName:any, onSymbolResolvedCallback:any, onResolveErrorCallback:any) => {
		
		let symbolConfig = {
			name: symbolName,
			description: '',
			type: 'crypto',
			session: '24x7',
			timezone: 'Etc/UTC',
			ticker: symbolName,
			exchange: 'PinkScan',
			minmov: 1,
			pricescale: 100,
			has_intraday: true,
			intraday_multipliers: ['1', '60'],
			supported_resolution:  config.supported_resolutions,
			volume_precision: 8,
			data_status: 'streaming',
		}
        
		setTimeout(function() {
			onSymbolResolvedCallback(symbolConfig)
		}, 0)

	},
    getBars: async (symbolInfo: any, resolution: String, periodParams: any, onResult: any, onError: any) => {

        const {data: bars} = await getTransactions({
            pairAddress: global.state.pair.address,
            pageSize: 50000,
            from: periodParams.from * 1e3,
            to: periodParams.to  * 1e3
        });
        
        const ticks = bars.map((transaction:any) => ({
            time: new Date(transaction.time).getTime(),
            quantity: Number(transaction.price),
            price: Number(transaction.price_per_token),
        }));

        let historyBars = batchTicksToCandle(ticks, resolutionMap[resolution], true)
        
        if(periodParams.firstDataRequest) {
            let bar = historyBars[historyBars.length - 1]
            lastBarsCache.set(symbolInfo.name, {
                ...bar,
            });
        }
        
        if(historyBars.length < 1){
            onResult([], { noData: true });
        } else {
            onResult(historyBars, { noData: false });
        }
    },
    subscribeBars: (symbolInfo:any, resolution:any, onRealtimeCallback:any, subscribeUID:any, onResetCacheNeededCallback:any) => {
        console.log('subscribeBars running', subscribeUID)
        
        let prevBar = lastBarsCache.get(symbolInfo.name)

        const channelString = `${symbolInfo.exchange}~${symbolInfo.name}`
        const handler = {
            id: subscribeUID,
            callback: onRealtimeCallback,
        };

        let subscriptionItem = channelToSubscription.get(channelString);

        if (subscriptionItem) {
            subscriptionItem.handlers.push(handler);
            
        } else {
            subscriptionItem = {
                subscribeUID,
                resolution,
                prevBar,
                handlers: [handler],
            };
            
            channelToSubscription.set(channelString, subscriptionItem);
        }

        fetchMainNetTransaction(null, resolution, channelString)
    },
    unsubscribeBars: (subscriberUID:any) => {
        for (const channelString of channelToSubscription.keys()) {
            const subscriptionItem = channelToSubscription.get(channelString);
            const handlerIndex = subscriptionItem.handlers .findIndex((handler) => handler.id === subscriberUID);
    
            if (handlerIndex !== -1) {
                subscriptionItem.handlers.splice(handlerIndex, 1);
    
                if (subscriptionItem.handlers.length === 0) {
                    channelToSubscription.delete(channelString);
                    break;
                }
            }
        }
    },
}
