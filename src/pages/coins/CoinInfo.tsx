import { Box } from '@mui/material';
import Global from './Global';
import MarketCap from './MarketCap';

const CoinInfo = () => {
  return (
    <Box
      sx={{
        display: 'flex',
      }}
    >
      <MarketCap />
    </Box>
  );
};

export default CoinInfo;
