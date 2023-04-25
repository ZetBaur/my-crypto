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

import { Box, CircularProgress } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { tokens } from '../../../contexts/themeContext';
import { ICurrentCoin, IPrices } from '../../../model/coinsTypes';

import {
  // useFetchMarketChartQuery,
  useLazyFetchCoinByIdQuery,
  useLazyFetchMarketChartQuery,
  useFetchMarketChartQuery,
} from '../../../store/features/coins/coinsApi';

//--------------------------------------------------------------------
const HistoricChart = () => {
  console.log('render');

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  //------- states -----------
  const [prices, setPrices] = useState<IPrices[] | undefined>([]); // chart

  const [id, setId] = useState<string | null>('bitcoin');
  const [vsCurrency, setVsCurrency] = useState('USD');
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
  const [fetchCoinById, { isLoading: isCoinByIdLoading, data: coinByIdData }] =
    useLazyFetchCoinByIdQuery();

  const [
    fetchMarketChart,
    { isLoading: isChartLoading, data: marketChartData },
  ] = useLazyFetchMarketChartQuery();

  useEffect(() => {
    const params = {
      id,
      vsCurrency,
      days,
      interval,
    };

    if (id) {
      fetchMarketChart(params); // fetch chart
      fetchCoinById(id); // for current coin data
    }
  }, [id]);

  useEffect(() => {
    const arr = marketChartData?.prices.map((el) => {
      return {
        date: moment(el[0]).format('MMM DD'),
        // price: Math.round(el[1]),
        price: el[1].toFixed(5),
      };
    });

    console.log('arr', arr);

    setPrices(arr);
  }, [marketChartData]);

  useEffect(() => {
    setCurrentCoin(coinByIdData);
  }, [coinByIdData]);

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
        vsCurrency={vsCurrency}
        setVsCurrency={setVsCurrency}
        days={days}
        setDays={setDays}
        interval={interval}
        setInterval={setInterval}
        currentCoin={currentCoin}
        setCurrentCoin={setCurrentCoin}
        // handleSearchCoin={handleSearchCoin}
        id={id}
        setId={setId}
        // newCoin={newCoin}
        // setNewCoin={newCoin}

        // showSearchList={showSearchList}
        // setShowSearchList={setShowSearchList}
        // searchList={searchList}
      />

      {isChartLoading && (
        <Box sx={{ display: 'flex' }}>
          <CircularProgress />
        </Box>
      )}

      {marketChartData && (
        <Box
          sx={{
            width: '100%',
            height: '500px',
            padding: '1rem 1rem 0 1rem',
          }}
        >
          <ResponsiveContainer width='100%' height='100%'>
            <AreaChart width={500} height={300} data={prices}>
              <CartesianGrid
                strokeDasharray='3'
                vertical={false}
                // horizontalFill={['#555555', '#444444']}
                // fillOpacity={0.2}
                stroke='gray'
              />

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
                tickCount={7}
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
      )}
    </Box>
  );
};

export default HistoricChart;
