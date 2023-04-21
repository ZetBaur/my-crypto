import { useEffect, useState } from 'react';
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
import { useTheme } from '@mui/material/styles';
import { tokens } from '../../contexts/themeContext';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const Dashboard = () => {
  // const [open, setOpen] = useState(true);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [age, setAge] = useState('Ten');

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

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  return (
    <Box
      sx={{
        background: colors.primary.DEFAULT,
        border: `1px solid ${colors.chartBoderColor}`,
        borderRadius: '12px',
        padding: '1rem',
      }}
    >
      <Box mb='1rem'>
        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          value={age}
          label='Age'
          onChange={handleChange}
          sx={{
            // height: '2.5rem',
            // color: 'white',
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'transparent',
            },
            '& .MuiSvgIcon-root': {
              color: 'yellow',
            },
          }}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </Box>

      <Box
        sx={{
          width: '100%',
          height: '500px',
        }}
      >
        <ResponsiveContainer width='100%' height='100%'>
          <LineChart width={500} height={300} data={data}>
            <CartesianGrid strokeDasharray='3' vertical={false} />
            <XAxis
              dataKey='name'
              padding={{ left: 30, right: 30 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis axisLine={false} tickLine={false} />
            <Tooltip />
            <Line
              type='monotone'
              dataKey='pv'
              stroke='#FFAF2C'
              activeDot={{ r: 8 }}
              strokeWidth='3'
            />
            <Line
              type='monotone'
              dataKey='uv'
              stroke='#428CF4'
              strokeWidth='3'
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};

export default Dashboard;
