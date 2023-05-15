import { Box } from '@mui/material';
import CoinOverview from '../components/coinOverview/CoinOverview';
import BasicTable from '../components/table/BasicTable';

const Coins = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <CoinOverview />
      <BasicTable />
    </Box>
  );
};

export default Coins;
