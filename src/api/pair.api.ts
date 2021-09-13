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