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
import { Box, CircularProgress } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { tokens } from '../../contexts/themeContext';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHook';
import { setCurrentCoin } from '../../store/features/coins/marketChartSlice';
import {
  useLazyFetchCoinByIdQuery,
  useLazyFetchMarketChartQuery,
} from '../../store/features/coins/coinsApi';
import { IHistoricCoinPrices } from '../../model/coinsTypes';

const Chart = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useAppDispatch();
  const id = useAppSelector((state) => state.coins.id);
  const vsCurrency = useAppSelector((state) => state.coins.vsCurrency);
  const days = useAppSelector((state) => state.coins.days);
  const interval = useAppSelector((state) => state.coins.interval);
  const [prices, setPrices] = useState<IHistoricCoinPrices[]>();

  const [
    fetchCoinById,
    {
      isError: isCoinByIdError,
      isLoading: isCoinByIdLoading,
      isFetching: isCoinByIdFetchig,
      isSuccess: isCoinByIdSuccess,
      data: coinByIdData,
    },
  ] = useLazyFetchCoinByIdQuery();

  const [
    fetchMarketChart,
    {
      isError: isMarketChartError,
      isFetching: isMarketChartFetching,
      isLoading: isMarketChartLoading,
      isSuccess: isMarketChartSuccess,
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
    if (id) fetchMarketChart(params);
  }, [id, vsCurrency, days, interval]);

  useEffect(() => {
    const arr = marketChartData?.prices.map((el: number[]) => {
      return {
        date: moment(el[0]).format('MMM DD'),
        price: el[1].toFixed(7),
      };
    });

    // arr?.forEach((el) => {
    //   el.price.slice(6, 4);
    // });
    setPrices(arr);
  }, [isMarketChartSuccess]);

  useEffect(() => {
    const newCurrentCoin = {
      id: coinByIdData?.id,
      symbol: coinByIdData?.symbol,
      name: coinByIdData?.name,
      image: coinByIdData?.image.thumb,
      inPortfolio: false,
    };
    dispatch(setCurrentCoin(newCurrentCoin));
  }, [isCoinByIdSuccess]);

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
          position: 'relative',
        }}
      >
        {(isMarketChartLoading || isMarketChartFetching) && (
          <CircularProgress
            sx={{
              position: 'absolute',
              top: '40%',
              left: '45%',
              zIndex: '10',
              color: 'blue',
            }}
          />
        )}

        {isMarketChartError && 'Server does not respond. Try later'}

        {marketChartData && (
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
                animationDuration={500}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </Box>
    </Box>
  );
};

export default Chart;
