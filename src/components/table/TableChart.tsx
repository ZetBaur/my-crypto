import { useEffect, useState } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { ResponsiveContainer, YAxis, AreaChart, Area } from 'recharts';
import { useLazyFetchOverviewHistoryQuery } from '../../store/features/livecoinwatch/liveCoinWatchApi';
import moment from 'moment';
import { ICoinsSingleHistory, IHistory } from '../../model/liveCoinWatchTypes';

interface IProps {
  coin: string;
}

const TableChart = ({ coin }: IProps) => {
  const [history, setHistory] = useState<ICoinsSingleHistory>();

  const [prices, setPrices] = useState<{ date: number; price: number }[]>();

  const [fetchHistory, { isError, isFetching, data }] =
    useLazyFetchOverviewHistoryQuery();

  useEffect(() => {
    const coinExist = !!localStorage.getItem(coin);

    if (coinExist) {
      setHistory(JSON.parse(localStorage.getItem(coin) || ''));
    } else {
      fetchHistory({
        currency: 'USD',
        code: coin,
        start: new Date(moment().subtract(7, 'days').format()).getTime(),
        end: Date.parse(moment().format('LL')),
        meta: true,
      });
    }
  }, []);

  useEffect(() => {
    if (data) {
      localStorage.setItem(`${data?.code}`, JSON.stringify(data));
      setHistory(data);
    }
  }, [data]);

  useEffect(() => {
    const arr = history?.history?.map((el: IHistory) => {
      return {
        date: el.date,
        price: el.rate,
      };
    });

    setPrices(arr);
  }, [history]);

  if (prices?.length !== 0) {
    return (
      <ResponsiveContainer width='100%' height='100%'>
        <AreaChart width={500} height={300} data={prices}>
          <Area type='monotone' dataKey='price' dot={false} fillOpacity={0.1} />
          <YAxis domain={['dataMin', 'dataMax']} hide={true} />
        </AreaChart>
      </ResponsiveContainer>
    );
  } else if (prices?.length === 0) {
    return (
      <Box
        sx={{
          textAlign: 'center',
        }}
      >
        NA
      </Box>
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
