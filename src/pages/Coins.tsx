import { Box } from '@mui/material';
import CoinOverview from '../components/coinOverview/CoinOverview';
import BasicTable from '../components/table/BasicTable';
import { useEffect, useRef } from 'react';

const Coins = () => {
  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, []);

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
