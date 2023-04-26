import { Box, CircularProgress, Backdrop } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { tokens } from '../../contexts/themeContext';

import Chart from './Chart';
import Trending from './Trending';

//--------------------------------------------------------------------
const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  //------------------------------------------------------------

  return (
    <Box
      sx={{
        display: 'flex',
        gap: '1rem',
      }}
    >
      <Chart />

      <Trending />
    </Box>
  );
};

export default Dashboard;
