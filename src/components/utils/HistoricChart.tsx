import { useCallback, useEffect, useMemo, useState } from 'react';
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
  Autocomplete,
  TextField,
  List,
  ListItem,
} from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';
import { BootstrapSelect } from '../../utils/styles';

import { useTheme } from '@mui/material/styles';
import { tokens } from '../../contexts/themeContext';
import { ICoin, IPrices } from '../../model/coinsTypes';

import {
  useLazyFetchMarketChartQuery,
  useLazySearchCoinQuery,
} from '../../store/features/coins/coinsApi';

//-------------------------

const HistoricChart = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [prices, setPrices] = useState<IPrices[]>([]);
  const [searchCoin, setSearchCoin] = useState<string>('');
  const [currency, setCurrency] = useState<string>('');
  const [period, setPeriod] = useState<string>('');
  const [interval, setInterval] = useState<string>('');
  const [coinsList, setCoinsList] = useState<ICoin[]>([]);
  const [coinsListModal, setCoinsListModal] = useState(false);
  const [currentCoin, setCurrentCoin] = useState<ICoin>();

  //------------ search

  const [
    searchCoins,
    {
      data: searchData,
      isLoading: searchLoading,
      isSuccess: searchSuccess,
      isError: searchIsError,
      error: searchError,
    },
  ] = useLazySearchCoinQuery();

  useEffect(() => {
    console.log('first');

    if (searchCoin.length > 2) {
      searchCoins(searchCoin);
      setCoinsListModal(true);
    }

    if (searchData?.coins) {
      console.log('searchData', searchData.coins);
      setCoinsList(searchData.coins);
    }
  }, [searchCoin, searchSuccess]);

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
    console.log('second');
    const initialMarketChartQueryState = {
      id: 'bitcoin',
      currency: 'usd',
      days: '21',
      interval: 'daily',
    };

    fetchMarketChart(initialMarketChartQueryState);

    if (marketChartData) {
      const arr = marketChartData.prices.map((el) => {
        return {
          date: moment(el[0]).format('MMM DD'),
          price: parseInt(el[1].toFixed(2)),
        };
      });

      setPrices(arr);
    }
  }, [isMarketChartSuccess]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('first');
  };

  const handleCoinChage = (coinData: ICoin) => {
    console.log('value', coinData);
    setCoinsListModal(false);
    setCoinsList([]);
    setSearchCoin('');
    setCurrentCoin(coinData);
  };

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
        <Box>{currentCoin?.symbol}</Box>

        {/* search input --------------- */}

        <Box
          component='form'
          onSubmit={handleSubmit}
          sx={{
            background: theme.palette.background.paper,
            display: 'flex',
            borderRadius: '4px',
            flex: 1,
            border: `1px solid ${theme.palette.background.paper}`,
            position: 'relative',
          }}
        >
          <InputBase
            sx={{ ml: 2, flex: 1 }}
            placeholder='Search coin'
            value={searchCoin}
            onChange={(e) => setSearchCoin(e.target.value)}
          />

          <IconButton type='submit' sx={{ p: 1 }} disabled={!searchCoin}>
            <SearchIcon />
          </IconButton>

          {coinsListModal && (
            <List
              sx={{
                position: 'absolute',
                top: '110%',
                background: colors.secondary.DEFAULT,
                width: '100%',
                borderRadius: '4px',
                zIndex: '10',
                opacity: '0.9',
                maxHeight: '400px',
                overflow: 'scroll',
              }}
            >
              {coinsList.map((el) => {
                return (
                  <ListItem
                    key={el.id}
                    sx={{
                      cursor: 'pointer',
                      ':hover': {
                        color: 'gray',
                      },
                    }}
                    onClick={() => handleCoinChage(el)}
                  >
                    {el.symbol}
                  </ListItem>
                );
              })}
            </List>
          )}
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

export default HistoricChart;
