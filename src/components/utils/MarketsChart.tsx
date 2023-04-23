import { useEffect, useState } from 'react';
import moment from 'moment';
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
import {
  useFetchCoinMarketsQuery,
  useFetchMarketChartQuery,
} from '../../store/features/coins/coinsApi';

interface IPrices {
  date: string;
  price: number;
}

const MarketsChart = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [prices, setPrices] = useState<IPrices[]>([]);

  const {
    data: coinPrices,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useFetchMarketChartQuery({
    id: 'bitcoin',
    currency: 'usd',
    days: '13',
  });

  useEffect(() => {
    if (isSuccess) {
      const arr = coinPrices.prices.map((el) => {
        return {
          date: moment(el[0]).format('MMM DD'),
          price: parseInt(el[1].toFixed(2)),
        };
      });

      console.log('arr', arr);

      setPrices(arr);
    }
  }, [isSuccess]);

  return (
    <Box
      sx={{
        background: colors.primary.DEFAULT,
        border: `1px solid ${colors.chartBoderColor}`,
        borderRadius: '12px',
        padding: '2rem 1rem 1rem 0',
        width: '100%',
        height: '500px',
      }}
    >
      <ResponsiveContainer width='100%' height='100%'>
        <LineChart width={500} height={300} data={prices}>
          <CartesianGrid strokeDasharray='3' vertical={false} />

          <XAxis
            dataKey='date'
            padding={{ left: 30, right: 30 }}
            axisLine={false}
            tickLine={false}
          />

          <YAxis
            axisLine={false}
            tickLine={false}
            type='number'
            domain={['dataMin', 'dataMax']}
          />

          <Tooltip />

          <Line
            type='monotone'
            dataKey='price'
            stroke='#FFAF2C'
            activeDot={{ r: 8 }}
            strokeWidth='1'
            dot={false}
          />

          {/* <Line type='monotone' dataKey='uv' stroke='#428CF4' strokeWidth='1' /> */}
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default MarketsChart;
