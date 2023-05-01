import { useEffect, useState } from 'react';
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import moment from 'moment';
import { useFetchMarketChartRangeQuery } from '../../store/features/coins/coinsApi';
import { IHistoricCoinPrices } from '../../model/coinsTypes';
import { Box, CircularProgress } from '@mui/material';

interface IProps {
  coin: string;
}

const TableChart = ({ coin }: IProps) => {
  const { isError, isFetching, isSuccess, data } =
    useFetchMarketChartRangeQuery(coin);
  const [prices, setPrices] = useState<{ date: number; price: number }[]>();

  useEffect(() => {
    const arr = data?.prices.map((el: number[]) => {
      return {
        date: el[0],
        price: el[1],
      };
    });
    setPrices(arr);
  }, [data]);

  if (isSuccess && data) {
    return (
      <ResponsiveContainer width='100%' height='100%'>
        <LineChart width={500} height={300} data={prices}>
          <Line type='monotone' dataKey='price' stroke='blue' dot={false} />

          <YAxis
            axisLine={false}
            tickLine={false}
            type='number'
            domain={['dataMin', 'dataMax']}
            hide={true}
          />
        </LineChart>
      </ResponsiveContainer>
    );
  } else if (isFetching) {
    return (
      <Box
        sx={{
          width: '200px',
          height: '100px',
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
  }
};

export default TableChart;
