import { config } from '@/config';
import axios from 'axios';

export const request = axios.create({
    baseURL: config.baseUrl
});