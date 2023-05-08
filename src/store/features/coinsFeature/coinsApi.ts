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

    // list of all coins
    fetchPlatformsAll: build.query<ICoinsList[], void>({
      query: () => {
        return {
          url: `platforms/all`,
          method: 'POST',
        };
      },
    }),
  }),
});

export const { useLazyFetchCoinsSingleHistoryQuery } = coinsApi;
