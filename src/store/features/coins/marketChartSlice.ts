import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICoinData, IMarketChart } from '../../../model/coinsTypes';

interface IInitialState {
  id: string | null;
  vsCurrency: string;
  days: string;
  interval: string;

  marketChart: IMarketChart | null;

  currentCoin: ICoinData | undefined;
}

const initialState: IInitialState = {
  id: 'bitcoin',
  vsCurrency: 'USD',
  days: '1',
  interval: 'hourly',

  marketChart: null,

  currentCoin: {
    id: 'bitcoin',
    name: 'Bitcoin',
    symbol: 'btc',
    image:
      'https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png?1547033579',
    inPortfolio: false,
  },
};

export const coinsSlice = createSlice({
  name: 'marketChart',
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

    setCurrentCoin(state, action: PayloadAction<ICoinData | undefined>) {
      state.currentCoin = action.payload;
    },
  },
});

export const { setId, setVsCurrency, setDays, setInterval, setCurrentCoin } =
  coinsSlice.actions;
export default coinsSlice.reducer;
