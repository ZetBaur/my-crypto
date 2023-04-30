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
import { useAppSelector } from '../../hooks/reduxHook';
import { useLazyFetchMarketChartQuery } from '../../store/features/coins/coinsApi';
import { IHistoricCoinPrices } from '../../model/coinsTypes';

const Chart = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const id = useAppSelector((state) => state.marketChart.id);
  const vsCurrency = useAppSelector((state) => state.marketChart.vsCurrency);
  const days = useAppSelector((state) => state.marketChart.days);
  const interval = useAppSelector((state) => state.marketChart.interval);
  const [prices, setPrices] = useState<IHistoricCoinPrices[]>();

  const [
    fetchMarketChart,
    { isError, isFetching, isLoading, isSuccess, data },
  ] = useLazyFetchMarketChartQuery();

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
    const arr = data?.prices.map((el: number[]) => {
      return {
        date: moment(el[0]).format('MMM DD'),
        price: el[1].toFixed(7),
      };
    });
    setPrices(arr);
  }, [data]);

  //---------------------------------------
  if (isFetching) {
    return (
      <Box
        sx={{
          height: '400px',
          background: colors.primary.DEFAULT,
          border: `1px solid ${colors.chartBoderColor}`,
          borderRadius: '4px',
          flex: '1',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CircularProgress
          sx={{
            zIndex: '10',
            color: 'blue',
          }}
        />
      </Box>
    );
  } else if (isLoading) {
    return (
      <Box
        sx={{
          height: '400px',
          background: colors.primary.DEFAULT,
          border: `1px solid ${colors.chartBoderColor}`,
          borderRadius: '4px',
          flex: '1',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CircularProgress
          sx={{
            zIndex: '10',
            color: 'blue',
          }}
        />
      </Box>
    );
  } else if (isError) {
    return (
      <Box
        sx={{
          background: colors.primary.DEFAULT,
          height: '400px',
          border: `1px solid ${colors.chartBoderColor}`,
          borderRadius: '4px',
          flex: '1',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        Server does not respond. Try later
      </Box>
    );
  } else if (isSuccess && data) {
    return (
      <Box
        sx={{
          background: colors.primary.DEFAULT,
          border: `1px solid ${colors.chartBoderColor}`,
          borderRadius: '4px',
          flex: '1',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <ChartHeader />

        <Box
          sx={{
            width: '100%',
            flex: '1',
            padding: '1rem 1rem 0 1rem',
            // position: 'relative',
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
                hide={true}
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
        </Box>
      </Box>
    );
  }
};

export default Chart;
