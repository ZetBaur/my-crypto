import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICoinData, IMarketChart } from '../../../model/coinsTypes';

interface IInitialState {
  id: string | null;
  vsCurrency: string;
  days: string;
  interval: string;

  marketChart: IMarketChart | null;
}

const initialState: IInitialState = {
  id: 'bitcoin',
  vsCurrency: 'USD',
  days: '1',
  interval: 'hourly',

  marketChart: null,
};

export const marketChartSlice = createSlice({
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
  },
});

export const { setId, setVsCurrency, setDays, setInterval } =
  marketChartSlice.actions;
export default marketChartSlice.reducer;
