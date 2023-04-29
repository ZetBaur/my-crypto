import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  IMarkets,
  IMarketsQuery,
  IMarketChart,
  IMarketChartQuery,
  ISearchCoin,
  ICoinById,
  IPublicCompanies,
} from '../../../model/coinsTypes';

export const coinsApi = createApi({
  reducerPath: 'coinsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.coingecko.com/api/v3/',
  }),

  keepUnusedDataFor: 60,
  // refetchOnFocus: true,
  // refetchOnReconnect: true,

  endpoints: (build) => ({
    fetchMarkets: build.query<IMarkets[], IMarketsQuery>({
      query: (obj: IMarketsQuery) => ({
        url: `coins/markets`,
        params: {
          vs_currency: 'usd',
          page: obj.page,
          per_page: obj.perPage,
        },
      }),
    }),

    fetchMarketChart: build.query<IMarketChart, IMarketChartQuery>({
      query: (obj: IMarketChartQuery) => ({
        url: `coins/${obj.id}/market_chart`,
        params: {
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

    fetchCoinById: build.query<ICoinById, string | null>({
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

    fetchPublicCompanies: build.query<IPublicCompanies, string | null>({
      query: (id: string) => ({
        url: `companies/public_treasury/${id}`,
      }),
    }),

    fetchTrending: build.query<any, void>({
      query: () => ({
        url: `search/trending`,
      }),
    }),
  }),
});

export const {
  useLazyFetchMarketsQuery,
  useLazyFetchMarketChartQuery,
  useLazySearchCoinQuery,
  useFetchMarketChartQuery,
  useLazyFetchCoinByIdQuery,
  useLazyFetchPublicCompaniesQuery,
  useLazyFetchTrendingQuery,
  useFetchTrendingQuery,
} = coinsApi;
