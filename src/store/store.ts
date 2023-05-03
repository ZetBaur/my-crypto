import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { coinsApi } from './features/coins/coinsApi';
import { binanceApi } from './features/binance/binanceApi';

import marketChartSlice from './features/coins/marketChartSlice';
import marketsSlice from './features/coins/marketsSlice';
import coinByIdSlice from './features/coins/coinByIdSlice';
import portfolioSlice from './features/coins/portfolioSlice';

export const store = configureStore({
  reducer: {
    [coinsApi.reducerPath]: coinsApi.reducer,
    [binanceApi.reducerPath]: binanceApi.reducer,

    marketChart: marketChartSlice,
    markets: marketsSlice,
    coinById: coinByIdSlice,
    portfolio: portfolioSlice,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(coinsApi.middleware)
      .concat(binanceApi.middleware),
  // getDefaultMiddleware().concat(binanceApi.middleware),
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
