import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ICoinMarkets } from '../../../model/coinsTypes';

export const coinsApi = createApi({
  reducerPath: 'coinsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.coingecko.com/api/v3/coins/',
  }),

  keepUnusedDataFor: 60,
  refetchOnFocus: true,
  refetchOnReconnect: true,

  endpoints: (build) => ({
    fetchCoinMarkets: build.query<ICoinMarkets[], string>({
      query: (currency: string) => ({
        url: `markets`,
        params: {
          vs_currency: currency,
          // per_page: limit,
        },
      }),
    }),
  }),
});

export const { useFetchCoinMarketsQuery } = coinsApi;
