import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { IGlobal } from '../../../model/coinGeckoTypes';

export const coinsGeckoApi = createApi({
  reducerPath: 'coinsGeckoApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.coingecko.com/api/v3/',
  }),

  endpoints: (build) => ({
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
