import { configureStore } from '@reduxjs/toolkit';
import headerSlice from './features/header.slice';

export const store = configureStore({
  reducer: {
    headerSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
