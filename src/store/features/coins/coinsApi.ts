import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ICoinsMarkets } from '../../../model/coinsTypes';

export const coinsApi = createApi({
  reducerPath: 'coinsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.coingecko.com/api/v3/',
  }),

  keepUnusedDataFor: 60,
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
    }),

    fetchCoinsList: build.query<unknown, boolean>({
      query: (include: boolean) => ({
        url: `coins/list`,
      }),
    }),
  }),
});

export const { useFetchCoinsMarketsQuery, useFetchCoinsListQuery } = coinsApi;
