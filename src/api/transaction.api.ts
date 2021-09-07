import { request } from "@/utils/request"

export const getTransactions = async (params:Object) => {
    return request({
        url: '/transactions',
        params: params
    });
}

export const getTransactionsCount = async (params:Object) => {
    return request({
        url: '/transactions/count',
        params: params
    });
}