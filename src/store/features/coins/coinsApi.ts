import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  ICoinMarkets,
  ICoinMarketsQuery,
  IMarketChart,
  IMarketChartQuery,
  ISearchCoin,
  ICoin,
  ICurrentCoin,
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
        url: `coins/${obj.id}/market_chart`,
        params: {
          // id: obj.id,
          vs_currency: obj.vsCurrency,
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
    }),

    fetchCoinById: build.query<ICurrentCoin, string | null>({
      query: (id: string) => ({
        url: `coins/${id}`,
        params: {
          localization: false,
          tickers: false,
          market_data: false,
          community_data: false,
          developer_data: false,
          sparkline: false,
        },
      }),
    }),
  }),
});

export const {
  useLazyFetchCoinMarketsQuery,
  useLazyFetchMarketChartQuery,
  useLazySearchCoinQuery,
  useFetchMarketChartQuery,
  useLazyFetchCoinByIdQuery,
} = coinsApi;
