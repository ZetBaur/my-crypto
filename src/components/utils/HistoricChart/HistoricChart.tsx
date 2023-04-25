import { useEffect, useState } from 'react';
import moment from 'moment';

import Header from './Header';

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { tokens } from '../../../contexts/themeContext';
import { ICurrentCoin, IPrices } from '../../../model/coinsTypes';

import {
  useFetchMarketChartQuery,
  useLazyFetchCoinByIdQuery,
  useLazyFetchMarketChartQuery,
} from '../../../store/features/coins/coinsApi';

//--------------------------------------------------------------------
const HistoricChart = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  //------- states -----------
  const [prices, setPrices] = useState<IPrices[] | undefined>([]);

  // const [search, setSearch] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [days, setDays] = useState('13');
  const [interval, setInterval] = useState('daily');

  const [currentCoin, setCurrentCoin] = useState<ICurrentCoin | undefined>({
    id: 'bitcoin',
    name: 'Bitcoin',
    symbol: 'btc',
    image: {
      large:
        'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579',
      small:
        'https://assets.coingecko.com/coins/images/1/small/bitcoin.png?1547033579',
      thumb:
        'https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png?1547033579',
    },
  });

  //----------fetch chart -------

  // const { data: marketChartData } = useFetchMarketChartQuery(
  //   initialMarketChartQueryState
  // );

  const [
    fetchMarketChart,
    { isLoading: areReposLoading, data: lazyMarketChartData },
  ] = useLazyFetchMarketChartQuery();

  useEffect(() => {
    const initialMarketChartQueryState = {
      id: 'bitcoin',
      currency: 'usd',
      days: '21',
      interval: 'hourly',
    };

    fetchMarketChart(initialMarketChartQueryState);

    console.log('lazyMarketChartData', lazyMarketChartData);

    const arr = lazyMarketChartData?.prices.map((el) => {
      return {
        date: moment(el[0]).format('MMM DD'),
        price: Math.round(el[1]),
      };
    });

    setPrices(arr);
  }, [lazyMarketChartData]);

  // useEffect(() => {
  //   const arr = marketChartData?.prices.map((el) => {
  //     return {
  //       date: moment(el[0]).format('MMM DD'),
  //       price: Math.round(el[1]),
  //     };
  //   });

  //   setPrices(arr);
  // }, [marketChartData]);

  // ------- fetch coin by id ---------

  const [fetchCoinById, { isLoading: isCoinByIdLoading, data: coinById }] =
    useLazyFetchCoinByIdQuery();

  const handleSearchCoin = (currency: string | null) => {
    console.log('currency', currency);

    if (currency) fetchCoinById(currency);

    // const newCurrentCoin = setCurrentCoin();

    // setSearch('');
  };

  useEffect(() => {
    if (coinById) setCurrentCoin(coinById);
  }, [coinById]);

  //------------------------------------------------------------
  return (
    <Box
      sx={{
        background: colors.primary.DEFAULT,
        border: `1px solid ${colors.chartBoderColor}`,
        borderRadius: '12px',
      }}
    >
      <Header
        // search={search}
        // setSearch={setSearch}
        currency={currency}
        setCurrency={setCurrency}
        days={days}
        setDays={setDays}
        interval={interval}
        setInterval={setInterval}
        currentCoin={currentCoin}
        setCurrentCoin={setCurrentCoin}
        handleSearchCoin={handleSearchCoin}

        // showSearchList={showSearchList}
        // setShowSearchList={setShowSearchList}
        // searchList={searchList}
      />

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
