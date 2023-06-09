import { useEffect, useState } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { ResponsiveContainer, YAxis, AreaChart, Area } from 'recharts';
import { useLazyFetchCoinsSingleHistoryQuery } from '../../store/features/coins/liveCoinWatchApi';
import moment from 'moment';
import { IHistory } from '../../model/liveCoinWatchTypes';
import { getDate } from '../../helpers/getDate';
import { useAppSelector } from '../../helpers/reduxHook';

interface IProps {
  coin: string;
  directionsDay: any;
  setDirectionsDay: (arg0: any) => void;
}

const TableChart = (props: IProps) => {
  const { coin, directionsDay, setDirectionsDay } = props;
  const [prices, setPrices] = useState<{ date: number; price: number }[]>();
  const currency = useAppSelector((state) => state.coins.currency);

  const [
    fetchTableChartHistory,
    {
      isError: isTableChartHistoryError,
      isFetching: isTableChartHistoryFetching,
      data: tableChartData,
    },
  ] = useLazyFetchCoinsSingleHistoryQuery();

  const [
    fetchDayChartHistory,
    {
      isError: isDayHistoryError,
      isFetching: isDayHistoryFetching,
      data: dayHistoryData,
    },
  ] = useLazyFetchCoinsSingleHistoryQuery();

  useEffect(() => {
    const body = {
      currency,
      code: coin,
      start: getDate(7, 'days'),
      end: Date.parse(moment().format('LL')),
      meta: true,
    };

    fetchTableChartHistory(body);
    fetchDayChartHistory({ ...body, start: getDate(1, 'days') });
  }, []);

  useEffect(() => {
    if (dayHistoryData?.history?.length && tableChartData) {
      const priceChange =
        dayHistoryData?.history[0].rate -
        dayHistoryData?.history[dayHistoryData.history?.length - 1].rate;

      setDirectionsDay({
        ...directionsDay,
        [coin]: priceChange,
      });

      const arr = tableChartData?.history?.map((el: IHistory) => {
        return {
          date: el.date,
          price: el.rate,
        };
      });

      setPrices(arr);
    }
  }, [tableChartData, dayHistoryData]);

  if (tableChartData && prices?.length !== 0) {
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
  } else if (isTableChartHistoryFetching) {
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
  } else if (isTableChartHistoryError) {
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
