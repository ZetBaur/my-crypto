import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICoinData, IMarkets } from '../../../model/coinsTypes';
import moment from 'moment';
import { ICoinsSingleHistory } from '../../../model/liveCoinWatchTypes';

interface IInitialState {
  code: string | null;
  currency: string;
  start: number;
  end: number;

  portfolio: string[];

  currentCoin: ICoinsSingleHistory;
}

const initialState: IInitialState = {
  code: 'Bitcoin',
  currency: 'USD',
  start: new Date(moment().subtract(7, 'days').calendar()).getTime(),
  end: Date.parse(moment().format('LL')),

  portfolio: [],

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
    setCode(state, action: PayloadAction<string | null>) {
      state.code = action.payload;
    },

    setCurrency(state, action: PayloadAction<string>) {
      state.currency = action.payload;
    },

    setStart(state, action: PayloadAction<number>) {
      state.start = action.payload;
    },

    setEnd(state, action: PayloadAction<number>) {
      state.end = action.payload;
    },

    addToPortfolio(state, action: PayloadAction<string>) {
      state.portfolio.push(action.payload);
    },

    removeFromPortfolio(state, action: PayloadAction<string>) {
      state.portfolio = state.portfolio.filter((el) => el !== action.payload);
    },

    setCurrentCoin(state, action: PayloadAction<ICoinsSingleHistory>) {
      state.currentCoin = action.payload;
    },
  },
});

export const {
  setCurrentCoin,
  setStart,
  setEnd,
  setCode,
  setCurrency,
  addToPortfolio,
  removeFromPortfolio,
} = coinsSlice.actions;
export default coinsSlice.reducer;
