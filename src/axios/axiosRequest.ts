import axios from 'axios';

export const axiosRequest = axios.create({
  baseURL: 'https://some-domain.com/api/',
  timeout: 1000,
  headers: { 'X-Custom-Header': 'foobar' },
});

export const coinGeckoApi = axios.create({
  baseURL: 'https://api.coingecko.com/api/v3/',
  timeout: 1000,
  headers: { 'X-Custom-Header': 'foobar' },
});
