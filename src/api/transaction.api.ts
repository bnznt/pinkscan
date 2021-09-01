import { request } from "@/utils/request"

export const getHistory = () => {
    return request({
        url: '/transactions'
    });
}