import { useEffect, useState } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { useFetchMarketChartRangeQuery } from '../../store/features/coins/coinsApi';
import { useLazyFetchOverviewHistoryQuery } from '../../store/features/livecoinwatch/liveCoinWatchApi';
import moment from 'moment';

interface IProps {
  coin: string;
}

const TableChart = ({ coin }: IProps) => {
  // const { isError, isFetching, isSuccess, data } =
  //   useFetchMarketChartRangeQuery(coin);

  const [prices, setPrices] = useState<{ date: number; price: number }[]>();

  const [fetchHistory, { isError, isFetching, isSuccess, data }] =
    useLazyFetchOverviewHistoryQuery();

  useEffect(() => {
    fetchHistory({
      currency: 'USD',
      code: coin,
      start: new Date(moment().subtract(7, 'days').calendar()).getTime(),
      end: Date.now(),
      meta: true,
    });
  }, []);

  // useEffect(() => {
  //   const arr = data?.prices.map((el: number[]) => {
  //     return {
  //       date: el[0],
  //       price: el[1],
  //     };
  //   });
  //   setPrices(arr);
  // }, [data]);

  useEffect(() => {
    const arr = data?.history.map(
      (el: {
        cap: number;
        date: number;
        liquidity: number;
        rate: number;
        volume: number;
      }) => {
        return {
          date: el.date,
          price: el.rate,
        };
      }
    );

    // console.log(arr);

    setPrices(arr);
  }, [isSuccess, data]);

  if (isSuccess && data) {
    return (
      <ResponsiveContainer width='100%' height='100%'>
        <LineChart width={500} height={300} data={prices}>
          <Line type='monotone' dataKey='price' stroke='blue' dot={false} />

          <YAxis domain={['dataMin', 'dataMax']} hide={true} />
        </LineChart>
      </ResponsiveContainer>
    );
  } else if (isFetching) {
    return (
      <Box
        sx={{
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
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        'Server Error'
      </Box>
    );
  } else {
    return null;
  }
};

export default TableChart;
