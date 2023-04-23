import { useEffect, useState } from 'react';
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

import { useFetchMarketChartQuery } from '../../store/features/coins/coinsApi';

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
    days: '21',
    interval: 'hourly',
  });

  useEffect(() => {
    if (isSuccess) {
      const arr = coinPrices.prices.map((el) => {
        return {
          date: moment(el[0]).format('MMM DD HH'),
          price: parseInt(el[1].toFixed(2)),
        };
      });

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
        <AreaChart width={500} height={300} data={prices}>
          <CartesianGrid strokeDasharray='3' vertical={false} />

          <XAxis dataKey='date' axisLine={false} tickLine={false} />

          <YAxis
            axisLine={false}
            tickLine={false}
            type='number'
            domain={['dataMin', 'dataMax']}
          />

          <Tooltip
            contentStyle={{
              background: '#000000',
              color: '#fff',
              fontSize: '10px',
              borderRadius: '5px',
            }}
          />

          <Area
            type='monotone'
            dataKey='price'
            stroke='#428CF4'
            activeDot={{ r: 8 }}
            strokeWidth='2'
            dot={false}
            fill='#428CF4'
          />
        </AreaChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default MarketsChart;
