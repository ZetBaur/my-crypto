import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IMarkets } from '../../../model/coinsTypes';

interface IInitialState {
  markets: IMarkets[] | undefined;
}

const initialState: IInitialState = {
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
