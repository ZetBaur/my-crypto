import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { IPayload } from '../marketOverview/MarketOverview';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import {
  IHistoricCoinPrices,
  IHistory,
  IOverviewHistory,
} from '../../model/liveCoinWatchTypes';
import moment from 'moment';
import { useAppSelector } from '../../helpers/reduxHook';

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
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'end',
          justifyContent: 'space-between',
          fontSize: '13px',
        }}
      >
        <Box>{`${label}`}</Box>
        <Box>{`$${v}`}</Box>
      </Box>
    );
  }

  return null;
};

interface IProps {
  overview: string;
}

const OverviewCharts = ({ overview }: IProps) => {
  const [prices, setPrices] = useState<IHistoricCoinPrices[]>();

  const currentCoin = useAppSelector((state) => state.coins.currentCoin);

  const CustomLegend = () => {
    if (overview === 'cap') {
      return <Box>Market Cap</Box>;
    } else if (overview === 'volume') {
      return <Box>Volume</Box>;
    } else if (overview === 'liquidity') {
      return <Box>Liquidity</Box>;
    } else if (overview === 'btcDominance') {
      return <Box>Btc Dominance</Box>;
    }
    return null;
  };

  useEffect(() => {
    const arr = currentCoin?.history?.map((el: IHistory) => {
      return {
        date: moment(el.date).format('MMM DD'),
        // @ts-ignore
        price: el[overview]?.toFixed(5),
      };
    });

    setPrices(arr);
  }, [currentCoin]);

  return (
    <Box
      sx={{
        width: '200px',
        height: '80px',
        background: 'black',
        borderRadius: '4px',
        padding: '4px',
      }}
    >
      <ResponsiveContainer width='99%' height='99%'>
        <AreaChart width={500} height={300} data={prices} syncId='anyId'>
          <XAxis dataKey='date' hide={true} />

          <YAxis
            domain={
              overview !== 'liquidity' ? ['dataMin', 'dataMax'] : undefined
            }
            tickSize={0}
            hide={true}
          />

          <Tooltip
            cursor={false}
            contentStyle={{
              color: '#fff',
            }}
            wrapperStyle={{
              outline: 'none',
              width: '100%',
              height: '100%',
              padding: '0 8px 4px 8px',
            }}
            position={{ x: 0, y: 0 }}
            content={<PriceTooltip payload={[]} label={''} />}
          />

          <Legend
            verticalAlign='top'
            iconSize={0}
            content={<CustomLegend />}
            wrapperStyle={{
              fontSize: '13px',
              paddingBottom: '8px',
            }}
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
  );
};

export default OverviewCharts;
