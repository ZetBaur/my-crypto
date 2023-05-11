import { Box } from '@mui/material';
import Global from './Global';
import MarketCap from './MarketCap';
import Volume from './Volume';

const CoinInfo = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        gap: '1rem',
      }}
    >
      <MarketCap />
      <Volume />
    </Box>
  );
};

export default CoinInfo;
