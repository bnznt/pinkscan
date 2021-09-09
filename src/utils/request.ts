import { config } from '@/config';
import axios from 'axios';

export const request = axios.create({
    baseURL: config.baseUrl
});

export const bscRequest = axios.create({
    baseURL: 'https://api.bscscan.com/api'
});