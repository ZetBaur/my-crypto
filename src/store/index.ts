import { configureStore } from '@reduxjs/toolkit';
import themeSlice from './features/theme.slice';

export const store = configureStore({
  reducer: {
    themeSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
