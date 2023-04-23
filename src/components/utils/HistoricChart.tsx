import { useEffect, useState } from 'react';
import moment from 'moment';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import {
  Box,
  FormControl,
  IconButton,
  InputBase,
  MenuItem,
  Select,
  Tooltip as MuiTooltip,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { tokens } from '../../contexts/themeContext';
import { IPrices } from '../../model/coinsTypes';
import { useFetchMarketChartQuery } from '../../store/features/coins/coinsApi';
import SearchIcon from '@mui/icons-material/Search';
import { BootstrapSelect } from '../../utils/styles';

const initialMarketChartQueryState = {
  id: 'bitcoin',
  currency: 'usd',
  days: '21',
  interval: 'hourly',
};

//-------------------------

const MarketsChart = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [prices, setPrices] = useState<IPrices[]>([]);
  const [searchCoin, setSearchCoin] = useState<string>(); //for id
  const [currency, setCurrency] = useState<string>(); // select currency

  const [age, setAge] = useState('');
  const handleChange = (event: { target: { value: string } }) => {
    setAge(event.target.value);
  };

  const {
    data: coinPrices,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useFetchMarketChartQuery(initialMarketChartQueryState);

  useEffect(() => {
    if (isSuccess) {
      const arr = coinPrices.prices.map((el) => {
        return {
          date: moment(el[0]).format('MMM DD HH'),
          price: parseInt(el[1].toFixed(2)),
        };
      });

      setPrices(arr);
    }
  }, [isSuccess]);

  return (
    <Box
      sx={{
        background: colors.primary.DEFAULT,
        border: `1px solid ${colors.chartBoderColor}`,
        borderRadius: '12px',
      }}
    >
      <Box
        sx={{
          padding: '1rem',
          display: 'flex',
          gap: '1rem',
          alignItems: 'center',
        }}
      >
        {/* search input */}

        <Box
          sx={{
            background: theme.palette.background.paper,
            display: 'flex',
            borderRadius: '4px',
            flex: 1,
            border: `1px solid ${theme.palette.background.paper}`,
          }}
        >
          <InputBase sx={{ ml: 2, flex: 1 }} placeholder='Search' />

          <IconButton type='button' sx={{ p: 1 }}>
            <SearchIcon />
          </IconButton>
        </Box>

        {/* selects */}

        <FormControl variant='standard'>
          <MuiTooltip title='Currency' placement='top'>
            <Select
              value={age}
              onChange={handleChange}
              input={<BootstrapSelect />}
              sx={{
                width: '100px',
              }}
            >
              <MenuItem value=''>
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </MuiTooltip>
        </FormControl>

        <FormControl variant='standard'>
          <MuiTooltip title='Period' placement='top'>
            <Select
              value={age}
              onChange={handleChange}
              input={<BootstrapSelect />}
              sx={{
                width: '100px',
              }}
            >
              <MenuItem value=''>
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </MuiTooltip>
        </FormControl>

        <FormControl variant='standard'>
          <MuiTooltip title='Interval' placement='top'>
            <Select
              value={age}
              onChange={handleChange}
              input={<BootstrapSelect />}
              sx={{
                width: '100px',
              }}
            >
              <MenuItem value=''>
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </MuiTooltip>
        </FormControl>
      </Box>

      {/* chart */}

      <Box
        sx={{
          width: '100%',
          height: '500px',
          padding: '1rem 1rem 0 0',
        }}
      >
        <ResponsiveContainer width='100%' height='100%'>
          <AreaChart width={500} height={300} data={prices}>
            <CartesianGrid strokeDasharray='3' vertical={false} />

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

export default MarketsChart;
