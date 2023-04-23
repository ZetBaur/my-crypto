import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  ICoinMarkets,
  ICoinMarketsQuery,
  IMarketChart,
  IMarketChartQuery,
} from '../../../model/coinsTypes';

export const coinsApi = createApi({
  reducerPath: 'coinsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.coingecko.com/api/v3/coins/',
  }),

  // keepUnusedDataFor: 60,
  // refetchOnFocus: true,
  // refetchOnReconnect: true,

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

    fetchMarketChart: build.query<IMarketChart, IMarketChartQuery>({
      query: (obj: IMarketChartQuery) => ({
        url: `bitcoin/market_chart`,
        params: {
          id: obj.id,
          vs_currency: obj.currency,
          days: obj.days,
          interval: obj.interval,
        },
      }),
    }),
  }),
});

export const {
  useFetchCoinMarketsQuery,
  useFetchMarketChartQuery,
  useLazyFetchMarketChartQuery,
} = coinsApi;
