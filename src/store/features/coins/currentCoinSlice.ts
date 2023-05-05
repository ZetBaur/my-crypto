import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICoinData, IMarkets } from '../../../model/coinsTypes';

interface IInitialState {
  currentCoin: IMarkets | undefined;
}

const initialState: IInitialState = {
  currentCoin: {
    id: 'bitcoin',
    name: 'Bitcoin',
    symbol: 'btc',
    image:
      'https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png?1547033579',
  },
};

export const coinByIdSlice = createSlice({
  name: 'coins',
  initialState,
  reducers: {
    setCurrentCoin(state, action: PayloadAction<IMarkets | undefined>) {
      state.currentCoin = action.payload;
    },
  },
});

export const { setCurrentCoin } = coinByIdSlice.actions;
export default coinByIdSlice.reducer;
