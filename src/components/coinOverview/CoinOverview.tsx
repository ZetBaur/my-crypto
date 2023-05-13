import { Box, CircularProgress, Backdrop, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { tokens } from '../../contexts/themeContext';

import Chart from './Chart';
import BasicTable from '../table/BasicTable';
import Global from './Global';
import MarketCap from './MarketCap';

import { coins } from '../../data/coins';
import { getUniqueElements } from '../../hooks/getUniqueElements';

const Coins = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Stack spacing={2}>
      <Box
        sx={{
          display: 'flex',
          gap: '1rem',
        }}
      >
        <Chart />

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          <Global />
          <MarketCap />
        </Box>
      </Box>
    </Stack>
  );
};

export default Coins;
