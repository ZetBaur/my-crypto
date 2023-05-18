import React, { useEffect, useState } from 'react';
import { useLazyFetchOverviewHistoryQuery } from '../../store/features/coins/liveCoinWatchApi';
import { useAppDispatch, useAppSelector } from '../../helpers/reduxHook';
import { getDate } from '../../helpers/getDate';
import moment from 'moment';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { tokens } from '../../contexts/themeContext';
import {
  IHistoricCoinPrices,
  IOverviewHistory,
} from '../../model/liveCoinWatchTypes';

import OverviewChart from './OverviewChart';

export interface IPayload {
  chartType: string | undefined;
  color: string;
  dataKey: string;
  fill: string;
  fillOpacity: number;
  formatter: Function | undefined;
  name: string;
  payload: { cap: string; date: string };
  stroke: string;
  strokeWidth: string;
  type: string | undefined;
  unit: string | undefined;
  value: string;
}

const MarketOverview = () => {
  const theme = useTheme();

  const colors = tokens(theme.palette.mode);

  const currency = useAppSelector((state) => state.coins.currency);

  const [fetchOverviewHistory, { data }] = useLazyFetchOverviewHistoryQuery();

  const body = {
    currency,
    start: getDate(7, 'days'),
    end: Date.parse(moment().format('LL')),
  };

  useEffect(() => {
    fetchOverviewHistory(body);
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        gap: '1rem',
      }}
    >
      <OverviewChart data={data} overview='cap' />
      <OverviewChart data={data} overview='volume' />
      <OverviewChart data={data} overview='liquidity' />
      <OverviewChart data={data} overview='btcDominance' />
    </Box>
  );
};

export default MarketOverview;
