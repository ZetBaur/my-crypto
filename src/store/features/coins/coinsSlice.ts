import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICoinData, ICoinMarkets, IPrices } from '../../../model/coinsTypes';

interface IInitialState {
  id: string | null;
  vsCurrency: string;
  days: string;
  interval: string;

  prices: IPrices[] | undefined;
  currentCoin: ICoinData | undefined;
  coinMarkets: ICoinMarkets[] | undefined;
  portfolio: ICoinData[];
}

const initialState: IInitialState = {
  prices: [],
  currentCoin: {
    id: 'bitcoin',
    name: 'Bitcoin',
    symbol: 'btc',
    image:
      'https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png?1547033579',
    inPortfolio: false,
  },
  id: 'bitcoin',
  vsCurrency: 'USD',
  days: '1',
  interval: 'hourly',
  portfolio: [],
  coinMarkets: [],
};

export const coinsSlice = createSlice({
  name: 'coins',
  initialState,
  reducers: {
    setId(state, action: PayloadAction<string | null>) {
      state.id = action.payload;
    },

    setVsCurrency(state, action: PayloadAction<string>) {
      state.vsCurrency = action.payload;
    },

    setDays(state, action: PayloadAction<string>) {
      state.days = action.payload;
    },

    setInterval(state, action: PayloadAction<string>) {
      state.interval = action.payload;
    },

    setPrices(state, action: PayloadAction<IPrices[] | undefined>) {
      state.prices = action.payload;
    },

    setCurrentCoin(state, action: PayloadAction<ICoinData | undefined>) {
      state.currentCoin = action.payload;
    },

    addToPortfolio(state, action: PayloadAction<ICoinData>) {
      state.portfolio.push(action.payload);
    },

    removeFromPortfolio(state, action: PayloadAction<ICoinData>) {
      state.portfolio = state.portfolio.filter(
        (el) => el.id !== action.payload.id
      );
    },

    setCoinMarkets(state, action: PayloadAction<ICoinMarkets[] | undefined>) {
      state.coinMarkets = action.payload;
    },
  },
});

export const {
  setId,
  setVsCurrency,
  setDays,
  setInterval,
  setCurrentCoin,
  setPrices,
  addToPortfolio,
  removeFromPortfolio,
  setCoinMarkets,
} = coinsSlice.actions;
export default coinsSlice.reducer;
