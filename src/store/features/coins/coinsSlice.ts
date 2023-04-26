import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICurrentCoin, IPrices } from '../../../model/coinsTypes';

interface IInitialState {
  prices: IPrices[] | undefined;
  currentCoin: ICurrentCoin | undefined;
  id: string | null;
  vsCurrency: string;
  days: string;
  interval: string;
  portfolio: ICurrentCoin[];
}

const initialState: IInitialState = {
  prices: [],
  currentCoin: {
    id: 'bitcoin',
    name: 'Bitcoin',
    symbol: 'btc',
    image: {
      large:
        'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579',
      small:
        'https://assets.coingecko.com/coins/images/1/small/bitcoin.png?1547033579',
      thumb:
        'https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png?1547033579',
    },
  },

  id: 'bitcoin',
  vsCurrency: 'USD',
  days: '7',
  interval: 'daily',
  portfolio: [],
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

    setCurrentCoin(state, action: PayloadAction<ICurrentCoin | undefined>) {
      state.currentCoin = action.payload;
    },

    addToPortfolio(state, action: PayloadAction<ICurrentCoin>) {
      state.portfolio.push(action.payload);
    },

    removeFromPortfolio(state, action: PayloadAction<ICurrentCoin>) {
      state.portfolio = state.portfolio.filter(
        (el) => el.id !== action.payload
      );
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
} = coinsSlice.actions;
export default coinsSlice.reducer;
