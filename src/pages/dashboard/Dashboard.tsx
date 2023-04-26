import { useEffect, useState } from 'react';
import moment from 'moment';

// import Header from '../../Header';

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { Box, CircularProgress, Backdrop } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { tokens } from '../../contexts/themeContext';
import { ICurrentCoin, IPrices } from '../../model/coinsTypes';

import {
  // useFetchMarketChartQuery,
  useLazyFetchCoinByIdQuery,
  useLazyFetchMarketChartQuery,
  useFetchMarketChartQuery,
  useLazyFetchPublicCompaniesQuery,
  useLazyFetchTrendingQuery,
} from '../../store/features/coins/coinsApi';
import Chart from './Chart';
// import PublicCompanies from './PublicCompanies';

//--------------------------------------------------------------------
const Dashboard = () => {
  console.log('render');

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  //------- states -----------
  const [prices, setPrices] = useState<IPrices[] | undefined>([]); // chart

  const [id, setId] = useState<string | null>('bitcoin');
  const [vsCurrency, setVsCurrency] = useState('USD');
  const [days, setDays] = useState('1');
  const [interval, setInterval] = useState('hourly');

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
    {
      isFetching: isChartFetching,
      isLoading: isChartLoading,
      data: marketChartData,
    },
  ] = useLazyFetchMarketChartQuery();

  const [
    fetchPublicCompanies,
    { isLoading: isPublicCompaniesLoading, data: publicCompaniesData },
  ] = useLazyFetchPublicCompaniesQuery();

  const [fetchTrending, { isLoading: isTrendingLoading, data: trendingData }] =
    useLazyFetchTrendingQuery();

  useEffect(() => {
    const params = {
      id,
      vsCurrency,
      days,
      interval,
    };
    if (id) fetchMarketChart(params); // fetch chart
  }, [id, vsCurrency, days, interval]);

  useEffect(() => {
    fetchCoinById(id); //          current coin data
    fetchPublicCompanies(id); //   piblic companies
  }, [id]);

  useEffect(() => {
    const arr = marketChartData?.prices.map((el) => {
      return {
        date: moment(el[0]).format('MMM DD'),
        price: el[1].toFixed(5),
      };
    });
    setPrices(arr);
  }, [marketChartData]);

  useEffect(() => {
    setCurrentCoin(coinByIdData);
  }, [coinByIdData]);

  useEffect(() => {
    console.log('publicCompaniesData', publicCompaniesData);
  }, [publicCompaniesData]);

  //------------------------------------------------------------

  return (
    <Box
      sx={{
        display: 'flex',
        gap: '1rem',
      }}
    >
      <Chart />

      {/* <PublicCompanies publicCompaniesData={publicCompaniesData} /> */}
    </Box>
  );
};

export default Dashboard;
