import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  IMarkets,
  IMarketsQuery,
  IMarketChart,
  IMarketChartQuery,
  ISearchCoin,
  ICoinById,
  IPublicCompanies,
  IList,
} from '../../../model/coinsTypes';
import moment from 'moment';

export const coinsApi = createApi({
  reducerPath: 'coinsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.coingecko.com/api/v3/',
  }),

  keepUnusedDataFor: 60,
  // refetchOnFocus: true,
  refetchOnReconnect: true,

  endpoints: (build) => ({
    fetchList: build.query<IList[], void>({
      query: () => ({
        url: `coins/list`,
      }),
    }),

    fetchMarkets: build.query<IMarkets[], IMarketsQuery>({
      query: (obj: IMarketsQuery) => ({
        url: `coins/markets`,
        params: {
          vs_currency: 'usd',
          page: obj.page,
          per_page: obj.rowsPerPage,
          order: obj.order,
          price_change_percentage: '1h, 24h',
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

    fetchMarketChartRange: build.query<IMarketChart, string>({
      query: (id: string) => ({
        url: `coins/${id}/market_chart/range`,
        params: {
          vs_currency: 'usd',
          from:
            new Date(moment().subtract(7, 'days').calendar()).getTime() / 1000,
          to: Date.now() / 1000,
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
  useLazyFetchListQuery,
  useLazyFetchMarketsQuery,
  useLazyFetchMarketChartQuery,
  useLazySearchCoinQuery,
  useFetchMarketChartQuery,
  useLazyFetchCoinByIdQuery,
  useLazyFetchPublicCompaniesQuery,
  useLazyFetchTrendingQuery,
  useFetchTrendingQuery,
  useFetchListQuery,
  useFetchMarketChartRangeQuery,
} = coinsApi;
