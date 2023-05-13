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
import { useLazyFetchCoinsSingleHistoryQuery } from '../../store/features/coinsFeature/coinsApi';
import { IHistoricCoinPrices, IHistory } from '../../model/liveCoinWatchTypes';
import { setCurrentCoin } from '../../store/features/coinsFeature/coinsSlice';

import Chart from 'react-apexcharts';

// const initialOptionsState = {
//   options: {
//     chart: {
//       id: 'basic-bar',
//     },
//     xaxis: {
//       categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
//     },
//   },
// };

// const initialSeriessState = [
//   {
//     name: 'series-1',
//     data: [30, 40, 45, 50, 49, 60, 70, 91],
//   },
// ];

const ApexChart = () => {
  //   const [chartOptions, setChartOptions] = useState(initialOptionsState);
  //   const [chartSeries, setChartSeries] = useState(initialSeriessState);

  //------------
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const dispatch = useAppDispatch();

  const code = useAppSelector((state) => state.coins.code);
  const currency = useAppSelector((state) => state.coins.currency);
  const start = useAppSelector((state) => state.coins.start);
  const end = useAppSelector((state) => state.coins.end);

  const drawer = useAppSelector((state) => state.coins.drawerIsOpen);

  const [prices, setPrices] = useState<IHistoricCoinPrices[]>();

  const [fetchChart, { isError, isFetching, isSuccess, data }] =
    useLazyFetchCoinsSingleHistoryQuery();

  const params = {
    code,
    currency,
    start,
    end,
    meta: true,
  };

  useEffect(() => {
    fetchChart(params);
  }, [currency, code, start]);

  useEffect(() => {
    if (data) {
      const arr = data.history?.map((el: IHistory) => {
        return {
          date: moment(el.date).format('MMM DD'),
          price: el.rate,
        };
      });
      dispatch(setCurrentCoin(data));
      setPrices(arr);
    }
  }, [data]);

  //   useEffect(() => {
  //     if (drawer) fetchChart(params);
  //   }, [drawer]);

  return (
    <Box
      sx={{
        background: colors.primary.DEFAULT,
        border: `1px solid ${colors.chartBoderColor}`,
        borderRadius: '4px',
        flex: '1',
        display: 'flex',
        flexDirection: 'column',
        padding: '1rem 1rem 0 1rem',
        // minHeight: '400px',
      }}
    >
      <ChartHeader />

      <Chart
        options={{
          //   chart: {
          //     id: 'basic-bar',
          //   },
          xaxis: {
            categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
          },
        }}
        series={[
          {
            // name: 'series-1',
            data: [30, 40, 45, 50, 49, 60, 70, 91],
          },
        ]}
        type='area'
        height='100%'
        width='100%'
      />

      {!isError && !isFetching && isSuccess && data && (
        <Box
          sx={{
            flex: '1',
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
      )}

      {isFetching && (
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
      )}

      {isError && (
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
      )}
    </Box>
  );
};

export default ApexChart;
