import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  ICoinsSingleHistory,
  ICoinsSingleHistoryRequest,
  ICoinsListRequest,
  ICoinsList,
  IOverviewHistoryRequest,
  IOverviewHistory,
} from '../../../model/liveCoinWatchTypes';

export const coinsApi = createApi({
  reducerPath: 'coinsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.livecoinwatch.com/',
    prepareHeaders(headers) {
      headers.set('x-api-key', 'd1531264-4875-4362-8748-9e5b859d01ff');
      return headers;
    },
  }),

  endpoints: (build) => ({
    fetchCoinsSingleHistory: build.query<
      ICoinsSingleHistory,
      ICoinsSingleHistoryRequest
    >({
      query: (body: ICoinsSingleHistoryRequest) => {
        return {
          url: `/coins/single/history`,
          method: 'POST',
          body,
        };
      },
    }),

    fetchCoinsList: build.query<ICoinsList[], ICoinsListRequest>({
      query: (body: ICoinsListRequest) => {
        return {
          url: `coins/list`,
          method: 'POST',
          body,
        };
      },
    }),

    // fetchOverview: build.query<ICoinsList[], void>({
    //   query: () => {
    //     return {
    //       url: `overview`,
    //       method: 'POST',
    //     };
    //   },
    // }),

    fetchOverview: build.query<ICoinsList[], void>({
      query: (body) => {
        return {
          url: `overview/history`,
          method: 'POST',
          body,
        };
      },
    }),

    fetchOverviewHistory: build.query<
      IOverviewHistory[],
      IOverviewHistoryRequest
    >({
      query: (body: IOverviewHistoryRequest) => {
        return {
          url: `overview/history`,
          method: 'POST',
          body,
        };
      },
    }),
  }),
});

export const {
  useFetchCoinsSingleHistoryQuery,
  useLazyFetchCoinsSingleHistoryQuery,
  useLazyFetchCoinsListQuery,
  // useFetchOverviewHistoryQuery,
  useLazyFetchOverviewHistoryQuery,
} = coinsApi;
