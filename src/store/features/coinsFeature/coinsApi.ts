import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  ICoinsSingleHistory,
  ICoinsSingleHistoryRequest,
  ICoinsListRequest,
  ICoinsList,
  IOverviewHistoryRequest,
} from '../../../model/liveCoinWatchTypes';

export const coinsApi = createApi({
  reducerPath: 'coinsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.livecoinwatch.com/',
    prepareHeaders(headers) {
      headers.set('x-api-key', 'd7f95b44-4d4b-4a93-be79-635fa5c6de59');
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

    fetchOverviewHistory: build.query<ICoinsList[], IOverviewHistoryRequest>({
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
