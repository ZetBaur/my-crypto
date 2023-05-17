import { Box } from '@mui/material';
import CoinOverview from '../components/coinOverview/CoinOverview';
import BasicTable from '../components/table/BasicTable';
import MarketOverview from '../components/marketOverview/MarketOverview';

const Coins = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <CoinOverview />
      <MarketOverview />
      <BasicTable />
    </Box>
  );
};

export default Coins;
