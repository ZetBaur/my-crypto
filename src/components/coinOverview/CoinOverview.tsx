import { Box, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { tokens } from '../../contexts/themeContext';

import Chart from './MainChart';
import Global from '../Global';
import SmallChart from './SmallChart';
import CoinInfo from './CoinInfo';

const CoinOverview = () => {
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
            gap: '8px',
          }}
        >
          {/* <Global /> */}

          <CoinInfo />

          <SmallChart overview='cap' />
          <SmallChart overview='liquidity' />
        </Box>
      </Box>
    </Stack>
  );
};

export default CoinOverview;
