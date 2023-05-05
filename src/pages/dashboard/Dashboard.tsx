import { Box, CircularProgress, Backdrop, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { tokens } from '../../contexts/themeContext';

import Chart from './Chart';
import Trending from './Trending';
import Table from './Table';
import TableLiveCoin from './TableLiveCoin';

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Stack spacing={4}>
      <Box
        sx={{
          display: 'flex',
          gap: '1rem',
        }}
      >
        <Chart />
        <Trending />
      </Box>

      {/* <TableLiveCoin /> */}

      <Table />
    </Stack>
  );
};

export default Dashboard;
