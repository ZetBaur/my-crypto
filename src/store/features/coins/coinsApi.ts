//minin

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ICoinsMarkets } from '../../../model/coinsTypes';

export const coinsApi = createApi({
  reducerPath: 'coinsApi',

  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.coingecko.com/api/v3/',
  }),

  keepUnusedDataFor: 30,
  refetchOnFocus: true,
  refetchOnReconnect: true,

  endpoints: (build) => ({
    fetchCoinsMarkets: build.query<ICoinsMarkets[], string>({
      query: (currency: string) => ({
        url: `coins/markets`,

        params: {
          vs_currency: currency,
        },
      }),

      //   transformResponse: (response: unknown) => response.items,
    }),

    getUserRepos: build.query<unknown, string>({
      query: (username: string) => ({
        url: `users/${username}/repos`,
      }),
    }),

    createUser: build.mutation<any, void>({
      query: () => ``,
    }),
  }),
});

export const { useFetchCoinsMarketsQuery } = coinsApi;
