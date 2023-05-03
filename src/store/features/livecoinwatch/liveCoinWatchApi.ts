import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  ICoinsSingleHistory,
  ICoinsSingleHistoryRequest,
} from '../../../model/liveCoinWatchTypes';

export const liveCoinWatchApi = createApi({
  reducerPath: 'liveCoinWatchApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.livecoinwatch.com/',
    prepareHeaders(headers) {
      headers.set('x-api-key', 'd7f95b44-4d4b-4a93-be79-635fa5c6de59');
      return headers;
    },
  }),

  endpoints: (build) => ({
    // last 7 days ---------------------------------------------------
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
  }),
});

export const {
  useFetchOverviewHistoryQuery,
  useLazyFetchOverviewHistoryQuery,
} = liveCoinWatchApi;
