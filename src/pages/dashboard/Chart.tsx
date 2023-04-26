import { useEffect, useState } from 'react';
import moment from 'moment';
import ChartHeader from './ChartHeader';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Box, CircularProgress, Backdrop } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { tokens } from '../../contexts/themeContext';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHook';
import {
  setCurrentCoin,
  setPrices,
} from '../../store/features/coins/coinsSlice';
import {
  useLazyFetchCoinByIdQuery,
  useLazyFetchMarketChartQuery,
} from '../../store/features/coins/coinsApi';

const Chart = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const id = useAppSelector((state) => state.coins.id);
  const vsCurrency = useAppSelector((state) => state.coins.vsCurrency);
  const days = useAppSelector((state) => state.coins.days);
  const interval = useAppSelector((state) => state.coins.interval);
  const prices = useAppSelector((state) => state.coins.prices);
  const currentCoin = useAppSelector((state) => state.coins.currentCoin);
  const dispatch = useAppDispatch();

  const [fetchCoinById, { isLoading: isCoinByIdLoading, data: coinByIdData }] =
    useLazyFetchCoinByIdQuery();

  const [
    fetchChart,
    {
      isFetching: isChartFetching,
      isLoading: isChartLoading,
      data: marketChartData,
    },
  ] = useLazyFetchMarketChartQuery();

  useEffect(() => {
    if (id) fetchCoinById(id);
  }, [id]);

  useEffect(() => {
    const params = {
      id,
      vsCurrency,
      days,
      interval,
    };
    if (id) fetchChart(params);
  }, [id, vsCurrency, days, interval]);

  useEffect(() => {
    const arr = marketChartData?.prices.map((el) => {
      return {
        date: moment(el[0]).format('MMM DD'),
        price: el[1].toFixed(7),
      };
    });
    dispatch(setPrices(arr));
  }, [marketChartData]);

  useEffect(() => {
    if (coinByIdData) {
      const newCurrentCoin = {
        id: coinByIdData.id,
        symbol: coinByIdData.symbol,
        name: coinByIdData.name,
        image: coinByIdData.image.thumb,
        inPortfolio: false,
      };
      dispatch(setCurrentCoin(newCurrentCoin));
    }
  }, [coinByIdData]);

  return (
    <Box
      sx={{
        background: colors.primary.DEFAULT,
        border: `1px solid ${colors.chartBoderColor}`,
        borderRadius: '12px',
        flex: '1',
      }}
    >
      <ChartHeader />

      <Box
        sx={{
          width: '100%',
          height: '40vh',
          padding: '1rem 1rem 0 1rem',
        }}
      >
        <ResponsiveContainer width='100%' height='100%'>
          <AreaChart width={500} height={300} data={prices}>
            <CartesianGrid
              strokeDasharray='3'
              vertical={false}
              stroke={colors.secondary.DEFAULT}
            />

            <XAxis
              dataKey='date'
              axisLine={false}
              tickLine={false}
              style={{ fontSize: '10px' }}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              type='number'
              domain={['dataMin', 'dataMax']}
              style={{ fontSize: '10px' }}
              tickCount={7}
            />

            <Tooltip
              contentStyle={{
                background: '#000000',
                color: '#fff',
                fontSize: '10px',
                borderRadius: '5px',
              }}
              wrapperStyle={{
                outline: 'none',
              }}
            />

            <Area
              type='monotone'
              dataKey='price'
              stroke='#FFAF2C'
              activeDot={{ r: 8 }}
              strokeWidth='2'
              dot={false}
              fill='#FFAF2C'
            />
          </AreaChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};

export default Chart;
