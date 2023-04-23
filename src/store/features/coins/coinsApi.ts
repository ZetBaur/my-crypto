import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ICoinMarkets } from '../../../model/coinsTypes';

interface ICoinMarketsQuery {
  currency: string;
  limit: number;
}

export interface IPrices {
  prices: number[][];
  market_caps: number[][];
  total_volumes: number[][];
}

interface ICoinPricesQuery {
  id: string;
  currency: string;
  days: string;
}

export const coinsApi = createApi({
  reducerPath: 'coinsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.coingecko.com/api/v3/coins/',
  }),

  keepUnusedDataFor: 60,
  refetchOnFocus: true,
  refetchOnReconnect: true,

  endpoints: (build) => ({
    fetchCoinMarkets: build.query<ICoinMarkets[], ICoinMarketsQuery>({
      query: (obj: ICoinMarketsQuery) => ({
        url: `markets`,
        params: {
          vs_currency: obj.currency,
          days_page: obj.limit,
        },
      }),
    }),

    //bitcoin/market_chart?vs_currency=usd&days=13

    fetchMarketChart: build.query<IPrices, ICoinPricesQuery>({
      query: (obj: ICoinPricesQuery) => ({
        url: `bitcoin/market_chart`,
        params: {
          id: obj.id,
          vs_currency: obj.currency,
          days: obj.days,
        },
      }),

      // transformResponse: (response: IPrices) => response.prices,
    }),
  }),
});

export const { useFetchCoinMarketsQuery, useFetchMarketChartQuery } = coinsApi;
