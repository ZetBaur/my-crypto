import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHook';
import { IHistoricCoinPrices, IHistory } from '../../model/liveCoinWatchTypes';
import moment from 'moment';
import { useTheme } from '@mui/material/styles';
import { tokens } from '../../contexts/themeContext';

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

const CustomTooltip = ({
  payload,
  label,
}: {
  payload: IPayload[];
  label: string;
}) => {
  if (payload && payload.length) {
    console.log('payload', payload);
    return <p className='label'>{`${label}    Cap: ${payload[0].value}B`}</p>;
  }

  return null;
};

const MarketCap = () => {
  const theme = useTheme();

  const colors = tokens(theme.palette.mode);

  const dispatch = useAppDispatch();

  const currentCoin = useAppSelector((state) => state.coins.currentCoin);
  const [prices, setPrices] = useState<{ date: string; cap: string }[]>();

  useEffect(() => {
    if (currentCoin) {
      const arr = currentCoin.history?.map((el: IHistory) => {
        const cap = el.cap.toString();
        const c = cap.slice(0, cap.length - 9);

        return {
          date: moment(el.date).format('MMM DD YYYY'),
          cap: c,
        };
      });

      console.log('arr', arr);

      setPrices(arr);
    }
  }, [currentCoin]);

  return (
    <Box
      sx={{
        flex: '1',
      }}
    >
      <Box
        sx={{
          height: '30px',
          padding: '1rem',
        }}
      >
        Market Cap
      </Box>

      <Box
        sx={{
          height: '100px',
        }}
      >
        <ResponsiveContainer width='100%' height='100%'>
          <AreaChart width={500} height={300} data={prices}>
            <XAxis
              dataKey='date'
              axisLine={false}
              tickLine={false}
              style={{ fontSize: '10px' }}
              hide={true}
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
                background: 'transparent',
                color: '#fff',
                borderRadius: '5px',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
              }}
              wrapperStyle={{
                outline: 'none',
              }}
              position={{ x: 10, y: 50 }}
              content={<CustomTooltip payload={[]} label={''} />}
            />

            <Area
              type='monotone'
              dataKey='cap'
              stroke='blue'
              activeDot={{ r: 8 }}
              strokeWidth='2'
              dot={false}
              fill='blue'
              animationDuration={500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};

export default MarketCap;
