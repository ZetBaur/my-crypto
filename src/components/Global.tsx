import { Box, Typography, CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import { useFetchGlobalQuery } from '../store/features/coins/coinGeckoApi';

interface IProps {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
  index: number;
  value: number;
}

const COLORS = [
  'blue',
  'green',
  'brown',
  'gray',
  'red',
  'orange',
  'gray',
  'green',
  'blue',
  'brown',
];

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  value,
}: IProps) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill='white'
      textAnchor={value < 6 ? 'start' : 'middle'}
      dominantBaseline='central'
      style={{
        fontSize: '13px',
      }}
    >
      {`${value.toFixed(0)}%`}
    </text>
  );
};

const Global = () => {
  const [pieData, setPieData] = useState<{ name: string; value: number }[]>();
  const { isError, isFetching, isSuccess, data } = useFetchGlobalQuery();

  useEffect(() => {
    if (data) {
      const d: { name: string; value: number }[] = [];

      Object.entries(data.data.market_cap_percentage).forEach(
        ([key, value]) => {
          d.push({
            name: key,
            value,
          });
        }
      );

      setPieData(
        d.filter(
          (el) =>
            el.name === 'btc' ||
            el.name === 'eth' ||
            el.name === 'usdt' ||
            el.name === 'bnb'
        )
      );
    }
  }, [data]);

  return (
    <Box
      sx={{
        background: 'black',
        padding: '1rem',
        borderRadius: '4px',
        // minHeight: '300px',
      }}
    >
      <Typography component='h4' textAlign='center'>
        Dominance
      </Typography>
      <Typography component='h4' textAlign='center' fontSize={13}>
        Based on market cap %
      </Typography>

      {!isError && !isFetching && isSuccess && data && (
        <Box
          sx={{
            background: 'black',
            width: '200px',
            height: '200px',
          }}
        >
          <ResponsiveContainer width='100%' height='100%'>
            <PieChart width={200} height={200}>
              <Pie
                data={pieData}
                cx='50%'
                cy='50%'
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={80}
                fill='#8884d8'
                dataKey='value'
                animationDuration={300}
              >
                {pieData &&
                  pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
              </Pie>

              <Legend
                iconType='circle'
                iconSize={4}
                formatter={(value, entry, index) => value.toUpperCase()}
                wrapperStyle={{
                  fontSize: '13px',
                  fontWeight: 'bold',
                }}
                layout='horizontal'
              />
            </PieChart>
          </ResponsiveContainer>
        </Box>
      )}

      {isFetching && (
        <Box
          sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CircularProgress />
        </Box>
      )}

      {isError && (
        <Box
          sx={{
            width: '100%',
            height: '100%',
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

export default Global;
