import { Box, CircularProgress, Backdrop, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { tokens } from '../../contexts/themeContext';

import Chart from './Chart';
import BasicTable from './BasicTable';
import Global from './Global';
import CoinInfo from './CoinInfo';
import ApexChart from './ApexChart';

const Coins = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Stack spacing={4}>
      <Box
        sx={{
          display: 'flex',
          // flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <Chart />
        {/* <ApexChart /> */}
        <Global />
      </Box>
    </Stack>
  );
};

export default Coins;
