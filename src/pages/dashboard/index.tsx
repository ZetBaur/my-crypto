import { useEffect } from 'react';
import {
  useFetchCoinsMarketsQuery,
  useFetchCoinsListQuery,
} from '../../store/features/coins/coinsApi';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { data } from '../../data';
import { Box } from '@mui/material';

const Dashboard = () => {
  // const { isLoading, isError, data } = useFetchCoinsMarketsQuery('usd', {
  //   refetchOnFocus: true,
  // });

  // const {
  //   isLoading: coinsLoadinf,
  //   isError: coinsListIsError,
  //   data: coinsList,
  // } = useFetchCoinsListQuery(false);

  useEffect(() => {
    console.log('data', data);
  }, []);

  return (
    <Box
      sx={{
        width: '100%',
        height: '500px',
      }}
    >
      <ResponsiveContainer width='100%' height='100%'>
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='name' padding={{ left: 30, right: 30 }} />
          <YAxis />
          <Tooltip />
          {/* <Legend /> */}
          <Line
            type='monotone'
            dataKey='pv'
            stroke='#8884d8'
            activeDot={{ r: 8 }}
          />
          <Line type='monotone' dataKey='uv' stroke='#82ca9d' />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default Dashboard;
