import { getTransactions } from "@/api/transaction.api";
import { batchTicksToCandle } from "candlestick-convert";

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

export default {
    
    onReady: (callback:any) => {
        console.log('[onReady]: Method call');
        setTimeout(() => callback(config))
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
            pairAddress: '0x74E4716E431f45807DCF19f284c7aA99F18a4fbc',
            pageSize: 500
        });
        
        const ticks = bars.map((transaction:any) => ({
            time: new Date(transaction.time).getTime(),
            quantity: Number(transaction.price),
            price: Number(transaction.price_per_token),
        }));

        const historyBars = batchTicksToCandle(ticks, resolutionMap[resolution], true)

        if(historyBars.length < 1){
            onResult([], { noData: true, nextTime: periodParams.to });
        } else {
            onResult(historyBars, { noData: false });
        }
    },
    subscribeBars: (symbolInfo:any, resolution:any, onRealtimeCallback:any, subscribeUID:any, onResetCacheNeededCallback:any) => {
        
    },
    unsubscribeBars: (subscriberUID:any) => {
        
    },
}