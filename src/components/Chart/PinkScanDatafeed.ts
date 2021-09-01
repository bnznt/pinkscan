import request from 'axios';

declare const Datafeeds: any;

const bars = [
    {
        time: 1508313600000,
        close: 42.1,
        open: 41.0,
        high: 43.0,
        low: 40.4,
        volume: 12000
    }, {
        time: 1508317200000,
        close: 43.4,
        open: 42.9,
        high: 44.1,
        low: 42.1,
        volume: 18500
    }, {
        time: 1508320800000,
        close: 44.3,
        open: 43.7,
        high: 44.8,
        low: 42.8,
        volume: 24000
    }, {
        time: 1508324400000,
        close: 42.8,
        open: 44.5,
        high: 44.5,
        low: 42.3,
        volume: 45000
    }
];

function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

const generateBar = (timepoint: number) => {
    const bar = bars[getRandomInt(0, 3)];
    bar.time = timepoint;

    return bar;
}

export class PinkScanDatafeed extends Datafeeds.UDFCompatibleDatafeed {
    constructor(...args: any[]) {
        super(...args);
    }

    // public getBars(symbolInfo: any, resolution: any, periodParams: any, onResult: any, onError: any): void {
    //     const bars: any[] = [];

    //     let timePoint = +new Date(periodParams.from * 1e3).setSeconds(0, 0);
    //     const now = +new Date(1630664256146);
    //     while (timePoint < now) {
    //         this.lastBarTimestamp = timePoint;
    //         bars.push(generateBar(timePoint));

    //         timePoint += resolution * 1e3;
    //     }

    //     onResult(bars);
    // }

    // async getBars(symbolInfo: any, resolution: any, periodParams: any, onResult: any, onError: any) {
    //     const apiUrl = new URL('https://api2.poocoin.app/candles-bsc?to=2021-08-31T09%3A25%3A00.000Z&limit=321&lpAddress=0x74E4716E431f45807DCF19f284c7aA99F18a4fbc&baseLp=0x58F876857a02D6762E0101bb5C46A8c1ED44Dc16');

    //     apiUrl.searchParams.set('interval', '1m');

    //     const { data: bars } = await request(apiUrl.toString());

    //     onResult(bars);
    // }
}