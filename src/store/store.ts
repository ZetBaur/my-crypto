import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { coinsApi } from './features/coins/coinsApi';

import marketChartSlice from './features/coins/marketChartSlice';
import marketsSlice from './features/coins/marketsSlice';
import coinByIdSlice from './features/coins/coinByIdSlice';
import portfolioSlice from './features/coins/portfolioSlice';

export const store = configureStore({
  reducer: {
    [coinsApi.reducerPath]: coinsApi.reducer,
    marketChart: marketChartSlice,
    markets: marketsSlice,
    coinById: coinByIdSlice,
    portfolio: portfolioSlice,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(coinsApi.middleware),
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
