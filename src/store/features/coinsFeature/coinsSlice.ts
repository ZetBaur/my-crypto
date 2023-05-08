import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICoinData, IMarkets } from '../../../model/coinsTypes';
import moment from 'moment';
import { ICoinsSingleHistory } from '../../../model/liveCoinWatchTypes';

interface IInitialState {
  code: string;
  currency: string;
  start: number;
  end: number;

  currentCoin: ICoinsSingleHistory | null;
}

const initialState: IInitialState = {
  code: 'BTC',
  currency: 'USD',
  start: new Date(moment().subtract(7, 'days').calendar()).getTime(),
  end: Date.parse(moment().format('LL')),

  currentCoin: {
    code: 'BTC',
    name: 'Bitcoin',
    webp64:
      'https://lcw.nyc3.cdn.digitaloceanspaces.com/production/currencies/64/btc.webp',
  },
};

//-------------------------------------------------------------------------------

export const coinsSlice = createSlice({
  name: 'coins',
  initialState,
  reducers: {
    setCode(state, action: PayloadAction<string>) {
      state.code = action.payload;
    },

    setCurrency(state, action: PayloadAction<string>) {
      state.currency = action.payload;
    },

    setStartr(state, action: PayloadAction<number>) {
      state.start = action.payload;
    },

    setEnd(state, action: PayloadAction<number>) {
      state.end = action.payload;
    },

    setCurrentCoin(state, action: PayloadAction<ICoinsSingleHistory>) {
      console.log('action', action);
      state.currentCoin = action.payload;
    },
  },
});

export const { setCurrentCoin } = coinsSlice.actions;
export default coinsSlice.reducer;
