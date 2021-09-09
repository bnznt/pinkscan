import { request, bscRequest } from "@/utils/request"
import { BSCSCAN_API_KEY } from '@/lib/constants';

export const getSymbols = async (name:String) => {
    return request({
        url: '/symbols',
        params: {
            name: name
        }
    });
}

export const getPairs = async (symbolAddress:String) => {
    return request({
        url: `/symbols/${symbolAddress}/pairs`
    });
}

export const getTotalSupply = async (symbol:String) => {
    return bscRequest({
        url: `?module=stats&action=tokensupply&contractaddress=${symbol}&apikey=${BSCSCAN_API_KEY}`,
    })
}