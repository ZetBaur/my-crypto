import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  ICoinMarkets,
  ICoinMarketsQuery,
  IMarketChart,
  IMarketChartQuery,
  ISearchCoin,
  ICoin,
} from '../../../model/coinsTypes';

export const coinsApi = createApi({
  reducerPath: 'coinsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.coingecko.com/api/v3/',
  }),

  // keepUnusedDataFor: 60,
  // refetchOnFocus: true,
  // refetchOnReconnect: true,

  endpoints: (build) => ({
    fetchCoinMarkets: build.query<ICoinMarkets[], ICoinMarketsQuery>({
      query: (obj: ICoinMarketsQuery) => ({
        url: `coins/markets`,
        params: {
          vs_currency: obj.currency,
          ids: obj.coin,
        },
      }),
    }),

    fetchMarketChart: build.query<IMarketChart, IMarketChartQuery>({
      query: (obj: IMarketChartQuery) => ({
        url: `coins/bitcoin/market_chart`,
        params: {
          id: obj.id,
          vs_currency: obj.currency,
          days: obj.days,
          interval: obj.interval,
        },
      }),
    }),

    searchCoin: build.query<ISearchCoin, string>({
      query: (query: string) => ({
        url: `search`,
        params: {
          query,
        },
      }),

      // transformResponse: (response: ISearchCoin) => response.coins,
    }),
  }),
});

export const {
  useLazyFetchCoinMarketsQuery,
  useLazyFetchMarketChartQuery,
  useLazySearchCoinQuery,
} = coinsApi;
