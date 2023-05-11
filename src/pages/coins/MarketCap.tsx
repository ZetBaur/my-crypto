import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import {
  Area,
  AreaChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHook';
import { IHistory } from '../../model/liveCoinWatchTypes';
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
    const v = parseInt(payload[0].value).toLocaleString('fi-FI');
    return (
      <Box
        sx={{
          display: 'flex',
          gap: '60px',
        }}
      >
        <Box>{`${label}`}</Box>
        <Box>{`${v}B`}</Box>
      </Box>
    );
  }
  return null;
};

const CustomLegend = () => {
  return <Box>Market Cap</Box>;
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
        const history = el.cap.toString();

        return {
          date: moment(el.date).format('MMM DD YYYY'),
          cap: history.slice(0, history.length - 9),
        };
      });

      setPrices(arr);
    }
  }, [currentCoin]);

  return (
    <Box
      sx={{
        // height: '100px',
        flex: '1',
        width: '250px',
        background: 'black',
        borderRadius: '4px',
        padding: '1rem',
      }}
    >
      <ResponsiveContainer width='100%' height='100%'>
        <AreaChart width={500} height={300} data={prices}>
          <XAxis dataKey='date' hide={true} />

          <YAxis domain={['dataMin', 'dataMax']} tickSize={0} hide={true} />

          <Tooltip
            contentStyle={{
              background: 'transparent',
              color: '#fff',
            }}
            wrapperStyle={{
              outline: 'none',
            }}
            position={{ x: 10, y: 70 }}
            content={<CustomTooltip payload={[]} label={''} />}
          />

          <Legend verticalAlign='top' iconSize={0} content={<CustomLegend />} />

          <Area
            type='monotone'
            dataKey='cap'
            activeDot={{ r: 4 }}
            strokeWidth='0'
            dot={false}
            fill='gray'
            animationDuration={500}
          />
        </AreaChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default MarketCap;
