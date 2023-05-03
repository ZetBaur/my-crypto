import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const binanceApi = createApi({
  reducerPath: 'binanceApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.binance.com/api/v3',
  }),

  // keepUnusedDataFor: 60,
  // refetchOnFocus: true,
  // refetchOnReconnect: true,

  endpoints: (build) => ({
    fetchAggTrades: build.query<IList[], void>({
      query: () => ({
        url: `/ticker/24hr`,
        params: {
          symbols: JSON.stringify(['ETHUSDC', 'SOLUSDC']),
          // rateLimitType: 'REQUEST_WEIGHT',
          // interval: 'MINUTE',
          // intervalNum: 1,
          // limit: 1200,
        },
      }),
    }),
  }),
});

export const { useFetchAggTradesQuery, useLazyFetchAggTradesQuery } =
  binanceApi;
