import { Box } from '@mui/material';
import Global from './Global';
import MarketCap from './MarketCap';

const CoinInfo = () => {
  return (
    <Box
      sx={{
        // width: '250px',
        // background: 'black',
        // padding: '1rem',
        // borderRadius: '4px',
        display: 'flex',
      }}
    >
      <MarketCap />
    </Box>
  );
};

export default CoinInfo;
