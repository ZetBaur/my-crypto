import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  ICoinsSingleHistory,
  ICoinsSingleHistoryRequest,
  ICoinsListRequest,
  ICoinsList,
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
    // history chart --------- /coins/single/history ------------------------------------------
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

    // table
    fetchCoinsList: build.query<ICoinsList[], ICoinsListRequest>({
      query: (body: ICoinsListRequest) => {
        return {
          url: `coins/list`,
          method: 'POST',
          body,
        };
      },
    }),

    // list of all coins   ----   /platforms/all
    // fetchPlatformsAll: build.query<ICoinsList[], void>({
    //   query: () => {
    //     return {
    //       url: `platforms/all`,
    //       method: 'POST',
    //     };
    //   },
    // }),

    // fetchOverview: build.query<ICoinsList[], void>({
    //   query: () => {
    //     return {
    //       url: `overview`,
    //       method: 'POST',
    //     };
    //   },
    // }),

    // fetchOverviewHistory: build.query<ICoinsList[], void>({
    //   query: (body) => {
    //     return {
    //       url: `overview/history`,
    //       method: 'POST',
    //       body,
    //     };
    //   },
    // }),

    fetchOverviewHistory: build.query<
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

    // fetchGlobal: build.query<IGlobal, void>({
    //   query: () => {
    //     return {
    //       url: `global`,
    //     };
    //   },
    // }),
  }),
});

export const {
  useFetchCoinsSingleHistoryQuery,
  useLazyFetchCoinsSingleHistoryQuery,
  // useFetchPlatformsAllQuery,
  // useLazyFetchOverviewQuery,
  useLazyFetchCoinsListQuery,
  useLazyFetchOverviewHistoryQuery,
  // useFetchGlobalQuery,
} = coinsApi;
