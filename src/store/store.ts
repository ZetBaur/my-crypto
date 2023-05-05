import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { coinsApi } from './features/coins/coinsApi';
import { binanceApi } from './features/binance/binanceApi';
import { liveCoinWatchApi } from './features/livecoinwatch/liveCoinWatchApi';

import marketChartSlice from './features/coins/marketChartSlice';
// import marketsSlice from './features/coins/marketsSlice';
import currentCoinSlice from './features/coins/currentCoinSlice';
import portfolioSlice from './features/coins/portfolioSlice';

export const store = configureStore({
  reducer: {
    [coinsApi.reducerPath]: coinsApi.reducer,
    [binanceApi.reducerPath]: binanceApi.reducer,
    [liveCoinWatchApi.reducerPath]: liveCoinWatchApi.reducer,

    marketChart: marketChartSlice,
    // markets: marketsSlice,
    currentCoin: currentCoinSlice,
    portfolio: portfolioSlice,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(coinsApi.middleware)
      .concat(binanceApi.middleware)
      .concat(liveCoinWatchApi.middleware),
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
