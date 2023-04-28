import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IMarkets } from '../../../model/coinsTypes';

interface IInitialState {
  vsCurrency: string;
  ids?: string;
  category?: string;
  order?: string;
  perPage?: number;
  page?: number;
  sparkline?: boolean;
  priceChangePercentage?: string;
  locale?: string;

  markets: IMarkets[] | undefined;
}

const initialState: IInitialState = {
  vsCurrency: 'usd',
  ids: '',
  category: '',
  order: '',
  perPage: 10,
  page: 1,
  sparkline: false,
  priceChangePercentage: '',
  locale: '',
  markets: [],
};

export const marketsSlice = createSlice({
  name: 'coins',
  initialState,
  reducers: {
    setMarkets(state, action: PayloadAction<IMarkets[] | undefined>) {
      state.markets = action.payload;
    },
  },
});

export const { setMarkets } = marketsSlice.actions;
export default marketsSlice.reducer;
