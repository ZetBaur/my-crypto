import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICoinData } from '../../../model/coinsTypes';

interface IInitialState {
  portfolio: ICoinData[];
}

const initialState: IInitialState = {
  portfolio: [],
};

export const coinsSlice = createSlice({
  name: 'coins',
  initialState,
  reducers: {
    addToPortfolio(state, action: PayloadAction<ICoinData>) {
      state.portfolio.push(action.payload);
    },

    removeFromPortfolio(state, action: PayloadAction<ICoinData>) {
      state.portfolio = state.portfolio.filter(
        (el) => el.id !== action.payload.id
      );
    },
  },
});

export const { addToPortfolio, removeFromPortfolio } = coinsSlice.actions;
export default coinsSlice.reducer;
