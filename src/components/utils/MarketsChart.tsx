import { useEffect, useState } from 'react';

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { mockData } from '../../data';
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { tokens } from '../../contexts/themeContext';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { ICoinMarketsQuery } from '../../model/coinsTypes';
import { useFetchCoinMarketsQuery } from '../../store/features/coins/coinsApi';

const MarketsChart = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [coin, setCoin] = useState('');

  const {
    data: coinMarkets,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useFetchCoinMarketsQuery({
    currency: 'usd',
    limit: 10,
  });

  if (isSuccess) {
    console.log('coinsList', coinMarkets);
  }

  return (
    <Box
      sx={{
        background: colors.primary.DEFAULT,
        border: `1px solid ${colors.chartBoderColor}`,
        borderRadius: '12px',
        padding: '1rem',
        width: '100%',
        height: '500px',
      }}
    >
      <ResponsiveContainer width='100%' height='100%'>
        <LineChart width={500} height={300} data={mockData}>
          <CartesianGrid strokeDasharray='3' vertical={false} />
          <XAxis
            dataKey='name'
            padding={{ left: 30, right: 30 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis axisLine={false} tickLine={false} />
          <Tooltip />
          <Line
            type='monotone'
            dataKey='pv'
            stroke='#FFAF2C'
            activeDot={{ r: 8 }}
            strokeWidth='1'
          />
          <Line type='monotone' dataKey='uv' stroke='#428CF4' strokeWidth='1' />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default MarketsChart;
