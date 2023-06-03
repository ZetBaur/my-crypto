import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { coinsApi } from './features/coins/liveCoinWatchApi';
import { coinsGeckoApi } from './features/coins/coinGeckoApi';
import coinsSlice from './features/coins/coinsSlice';
import { binanceApi } from './features/binance/binanceApi';

export const store = configureStore({
  reducer: {
    [coinsApi.reducerPath]: coinsApi.reducer,
    [coinsGeckoApi.reducerPath]: coinsGeckoApi.reducer,
    coins: coinsSlice,
    [binanceApi.reducerPath]: binanceApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(coinsApi.middleware)
      .concat(binanceApi.middleware)
      .concat(coinsGeckoApi.middleware),
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
