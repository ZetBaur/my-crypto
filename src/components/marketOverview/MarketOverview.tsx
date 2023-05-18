import React, { useEffect, useState } from 'react';
import { useLazyFetchOverviewHistoryQuery } from '../../store/features/coinsFeature/coinsApi';
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

import OverviewCharts from './OverviewChart';

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

// const PriceTooltip = ({
//   payload,
//   label,
// }: {
//   payload: IPayload[];
//   label: string;
// }) => {
//   if (payload && payload.length) {
//     const v = parseInt(payload[0].value).toLocaleString('fi-FI');

//     return (
//       <Box
//         sx={{
//           width: '100%',
//           height: '100%',
//           display: 'flex',
//           flexDirection: 'column',
//           justifyContent: 'space-between',
//           fontSize: '13px',
//         }}
//       >
//         <Box>{`Market Cap $${v}`}</Box>
//         <Box>{`${label}`}</Box>
//       </Box>
//     );
//   }

//   return null;
// };

const MarketOverview = () => {
  const theme = useTheme();

  const colors = tokens(theme.palette.mode);

  const currency = useAppSelector((state) => state.coins.currency);

  //   const [prices, setPrices] = useState<IHistoricCoinPrices[]>();

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
      <OverviewCharts data={data} overview='cap' />
      <OverviewCharts data={data} overview='volume' />
      <OverviewCharts data={data} overview='liquidity' />
      <OverviewCharts data={data} overview='btcDominance' />
    </Box>
  );
};

export default MarketOverview;
