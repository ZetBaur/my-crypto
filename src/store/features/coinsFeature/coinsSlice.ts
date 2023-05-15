import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import moment from 'moment';
import {
  ICoinsSingleHistory,
  // IHistory,
} from '../../../model/liveCoinWatchTypes';

interface IInitialState {
  code: string;
  currency: string;
  start: number;
  end: number;

  portfolio: string[];

  currentCoin: ICoinsSingleHistory;

  // drawerIsOpen: boolean | null;

  // history: IHistory | null;
}

const initialState: IInitialState = {
  code: 'BTC',
  currency: 'USD',

  start: new Date(moment().subtract(1, 'days').format()).getTime(),
  end: Date.parse(moment().format('LL')),

  portfolio: [],

  drawerIsOpen: null,

  // history: null,

  currentCoin: {
    code: 'BTC',
    name: 'Bitcoin',
    png32:
      'https://lcw.nyc3.cdn.digitaloceanspaces.com/production/currencies/32/btc.png',
    png64:
      'https://lcw.nyc3.cdn.digitaloceanspaces.com/production/currencies/64/btc.png',
    webp32:
      'https://lcw.nyc3.cdn.digitaloceanspaces.com/production/currencies/32/btc.webp',
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

    // setDrawer(state, action: PayloadAction<boolean>) {
    //   state.drawerIsOpen = action.payload;
    // },

    // setHistory(state, action: PayloadAction<IHistory>) {
    //   state.history = action.payload;
    // },
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
  // setDrawer,
  // setHistory,
} = coinsSlice.actions;
export default coinsSlice.reducer;
