import { useEffect, useState } from 'react';
import moment from 'moment';
import ChartHeader from './ChartHeader';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Box, CircularProgress } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { tokens } from '../../contexts/themeContext';
import { useAppDispatch, useAppSelector } from '../../helpers/reduxHook';
import { useLazyFetchCoinsSingleHistoryQuery } from '../../store/features/coinsFeature/coinsApi';
import { IHistoricCoinPrices, IHistory } from '../../model/liveCoinWatchTypes';
import { setCurrentCoin } from '../../store/features/coinsFeature/coinsSlice';

interface IPayload {
  chartType: string | undefined;
  color: string;
  dataKey: string;
  fill: string;
  fillOpacity: number;
  formatter: Function | undefined;
  name: string;
  payload: { cap: string; date: string };
  stroke: string;
  strokeWidth: string;
  type: string | undefined;
  unit: string | undefined;
  value: string;
}

const PriceTooltip = ({
  payload,
  label,
}: {
  payload: IPayload[];
  label: string;
}) => {
  if (payload && payload.length) {
    const v = parseInt(payload[0].value).toLocaleString('fi-FI');

    return (
      <Box
        sx={{
          background: 'black',
          padding: '4px 8px',
          borderRadius: '4px',
        }}
      >
        <Box>{`${label}`}</Box>
        <Box>{`Price: ${v}`}</Box>
      </Box>
    );
  }

  return null;
};

const CustomTooltip = ({ payload }: { payload: IPayload[]; label: string }) => {
  if (payload && payload.length) {
    const v = parseInt(payload[0].value).toLocaleString('fi-FI');
    return <Box>{`Volume: ${v}`}</Box>;
  }
  return null;
};

const Chart = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const dispatch = useAppDispatch();

  const code = useAppSelector((state) => state.coins.code);
  const currency = useAppSelector((state) => state.coins.currency);
  const start = useAppSelector((state) => state.coins.start);
  const end = useAppSelector((state) => state.coins.end);

  const [prices, setPrices] = useState<IHistoricCoinPrices[]>();

  const [fetchChart, { isError, isFetching, isSuccess, data }] =
    useLazyFetchCoinsSingleHistoryQuery();

  const params = {
    code,
    currency,
    start,
    end,
    meta: true,
  };

  useEffect(() => {
    fetchChart(params);
  }, [currency, code, start]);

  useEffect(() => {
    if (data) {
      const arr = data.history?.map((el: IHistory) => {
        return {
          date: moment(el.date).format('MMM DD'),
          price: el.rate.toFixed(5),
          volume: el.volume,
        };
      });
      dispatch(setCurrentCoin(data));
      setPrices(arr);
    }
  }, [data]);

  return (
    <Box
      sx={{
        background: colors.primary.DEFAULT,
        border: `1px solid ${colors.chartBoderColor}`,
        borderRadius: '4px',
        flex: '1',
        display: 'flex',
        flexDirection: 'column',
        padding: '1rem 1rem 0 1rem',
      }}
    >
      <ChartHeader />

      {!isError && !isFetching && isSuccess && data && (
        <Box
          sx={{
            flex: '1',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Box
            sx={{
              flex: '1',
            }}
          >
            <ResponsiveContainer width='99%' height='99%'>
              <AreaChart width={500} height={300} data={prices} syncId='anyId'>
                <CartesianGrid
                  strokeDasharray='3'
                  vertical={false}
                  stroke={colors.secondary.DEFAULT}
                />

                <XAxis
                  dataKey='date'
                  axisLine={false}
                  tickLine={false}
                  tick={false}
                  style={{ fontSize: '10px' }}
                />

                <YAxis
                  axisLine={false}
                  tickLine={false}
                  type='number'
                  domain={['dataMin', 'dataMax']}
                  style={{ fontSize: '10px' }}
                  tickCount={7}
                  hide={true}
                />

                <Tooltip
                  contentStyle={{
                    background: '#000000',
                    color: '#fff',
                    borderRadius: '5px',
                  }}
                  wrapperStyle={{
                    outline: 'none',
                  }}
                  content={<PriceTooltip payload={[]} label={''} />}
                />

                <Area
                  type='monotone'
                  dataKey='price'
                  stroke='#FFAF2C'
                  activeDot={{ r: 4 }}
                  strokeWidth='1'
                  dot={false}
                  fill='#FFAF2C'
                  animationDuration={500}
                />
              </AreaChart>
            </ResponsiveContainer>
          </Box>

          <Box
            sx={{
              height: '100px',
            }}
          >
            <ResponsiveContainer width='99%' height='99%'>
              <BarChart width={500} height={300} data={prices} syncId='anyId'>
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
                  hide={true}
                />

                <Tooltip
                  position={{ x: 0, y: -20 }}
                  cursor={false}
                  wrapperStyle={{
                    outline: 'none',
                  }}
                  content={<CustomTooltip payload={[]} label={''} />}
                />

                <Bar dataKey='volume' fill='#FFAF2C' animationDuration={500} />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </Box>
      )}

      {isFetching && (
        <Box
          sx={{
            height: '400px',
            background: colors.primary.DEFAULT,
            border: `1px solid ${colors.chartBoderColor}`,
            borderRadius: '4px',
            flex: '1',
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
      )}

      {isError && (
        <Box
          sx={{
            background: colors.primary.DEFAULT,
            height: '400px',
            border: `1px solid ${colors.chartBoderColor}`,
            borderRadius: '4px',
            flex: '1',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          Server does not respond. Try later
        </Box>
      )}
    </Box>
  );
};

export default Chart;
