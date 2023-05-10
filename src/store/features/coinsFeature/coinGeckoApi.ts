import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  ICoinsSingleHistory,
  ICoinsSingleHistoryRequest,
  ICoinsListRequest,
  ICoinsList,
} from '../../../model/liveCoinWatchTypes';
import { IGlobal } from '../../../model/coinGeckoTypes';

export const coinsGeckoApi = createApi({
  reducerPath: 'coinsGeckoApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.coingecko.com/api/v3/',
    // prepareHeaders(headers) {
    //   headers.set('x-api-key', 'd7f95b44-4d4b-4a93-be79-635fa5c6de59');
    //   return headers;
    // },
  }),

  endpoints: (build) => ({
    // global------------------------------------------
    fetchGlobal: build.query<IGlobal, void>({
      query: () => {
        return {
          url: `global`,
        };
      },
    }),
  }),
});

export const { useFetchGlobalQuery } = coinsGeckoApi;
