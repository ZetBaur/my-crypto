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

import SearchIcon from '@mui/icons-material/Search';
import { BootstrapSelect } from '../../utils/styles';

import { useTheme } from '@mui/material/styles';
import { tokens } from '../../contexts/themeContext';
import { IPrices } from '../../model/coinsTypes';

import {
  useLazyFetchMarketChartQuery,
  useLazyFetchCoinMarketsQuery,
} from '../../store/features/coins/coinsApi';

import { useDebounce } from '../../hooks/debounceHook';

//-------------------------

const MarketsChart = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [prices, setPrices] = useState<IPrices[]>([]);

  const [searchCoin, setSearchCoin] = useState<string>('');

  const debounced = useDebounce(searchCoin);

  console.log('debounced', debounced);

  const [currency, setCurrency] = useState<string>('');
  const [period, setPeriod] = useState<string>('');
  const [interval, setInterval] = useState<string>('');

  //------------ markets

  const [
    fetchMarkets,
    {
      data: marketsData,
      isLoading: isMarketsLoading,
      isSuccess: isMarketsSuccess,
      isError: isMarketsError,
      error: marketsError,
    },
  ] = useLazyFetchCoinMarketsQuery();

  useEffect(() => {
    const params = {
      currency: 'usd',
      coin: debounced,
    };

    fetchMarkets(params);

    if (marketsData) {
      console.log('marketsData', marketsData);
    }
  }, [isMarketsSuccess, debounced]);

  //---------- chart --------------------

  const [
    fetchMarketChart,
    {
      data: marketChartData,
      isLoading: isMarketChartLoading,
      isSuccess: isMarketChartSuccess,
      isError: isMarketChartError,
      error: marketChartError,
    },
  ] = useLazyFetchMarketChartQuery();

  useEffect(() => {
    const initialMarketChartQueryState = {
      id: 'bitcoin',
      currency: 'usd',
      days: '21',
      interval: 'hourly',
    };

    fetchMarketChart(initialMarketChartQueryState);

    if (marketChartData) {
      const arr = marketChartData?.prices.map((el) => {
        return {
          date: moment(el[0]).format('MMM DD'),
          price: parseInt(el[1].toFixed(2)),
        };
      });

      // console.log('marketChartData', marketChartData);
      setPrices(arr);
    }
  }, [isMarketChartSuccess]);

  //----------------------------------
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
        {/* search input --------------- */}

        <Box
          sx={{
            background: theme.palette.background.paper,
            display: 'flex',
            borderRadius: '4px',
            flex: 1,
            border: `1px solid ${theme.palette.background.paper}`,
          }}
        >
          <InputBase
            sx={{ ml: 2, flex: 1 }}
            placeholder='Search'
            value={searchCoin}
            onChange={(e) => setSearchCoin(e.target.value)}
          />

          <IconButton type='button' sx={{ p: 1 }}>
            <SearchIcon />
          </IconButton>
        </Box>

        {/* selects ----------------- */}

        <FormControl variant='standard'>
          <MuiTooltip title='Currency' placement='top'>
            <Select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
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
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
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
              value={interval}
              onChange={(e) => setInterval(e.target.value)}
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
