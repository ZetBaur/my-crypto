import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ICoinMarkets } from '../../../model/coinsTypes';

interface ICoinMarketsQuery {
  currency: string;
  limit: number;
}

export const coinsApi = createApi({
  reducerPath: 'coinsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.coingecko.com/api/v3/coins/',
  }),

  keepUnusedDataFor: 60,
  refetchOnFocus: true,
  refetchOnReconnect: true,

  endpoints: (build) => ({
    fetchCoinMarkets: build.query<ICoinMarkets[], ICoinMarketsQuery>({
      query: (obj: ICoinMarketsQuery) => ({
        url: `markets`,
        params: {
          vs_currency: obj.currency,
          per_page: obj.limit,
        },
      }),
    }),
  }),
});

export const { useFetchCoinMarketsQuery } = coinsApi;
