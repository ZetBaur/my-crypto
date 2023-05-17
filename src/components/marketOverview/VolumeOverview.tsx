import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { IPayload } from './MarketOverview';
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
  IOverviewHistory,
} from '../../model/liveCoinWatchTypes';
import moment from 'moment';

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

const CustomLegend = () => {
  return <Box>Volume</Box>;
};

interface IProps {
  data: IOverviewHistory[] | undefined;
}

const VolumeOverview = ({ data }: IProps) => {
  const [prices, setPrices] = useState<IHistoricCoinPrices[]>();

  useEffect(() => {
    const arr = data?.map((el: IOverviewHistory) => {
      return {
        date: moment(el.date).format('MMM DD'),
        price: el.volume.toFixed(5),
      };
    });

    setPrices(arr);
  }, [data]);
  return (
    <Box
      sx={{
        width: '230px',
        height: '100px',
        background: 'black',
        borderRadius: '4px',
        padding: '4px',
      }}
    >
      <ResponsiveContainer width='99%' height='99%'>
        <BarChart width={500} height={300} data={prices}>
          <XAxis dataKey='date' hide={true} />

          <YAxis domain={['dataMin', 'dataMax']} tickSize={0} hide={true} />

          <Tooltip
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

          <Bar
            // type='monotone'
            dataKey='price'
            fill='#FFAF2C'
            animationDuration={500}
            // barSize={1}
          />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default VolumeOverview;
