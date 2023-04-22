import { configureStore } from '@reduxjs/toolkit';
import themeSlice from './features/theme/themeSlice';
import { coinsApi } from './features/coins/coinsApi';
import { setupListeners } from '@reduxjs/toolkit/query';

export const store = configureStore({
  reducer: {
    themeSlice,
    [coinsApi.reducerPath]: coinsApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(coinsApi.middleware),
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
