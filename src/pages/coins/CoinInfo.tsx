import { Box } from '@mui/material';
import React from 'react';
import Global from './Global';

const CoinInfo = () => {
  return (
    <Box
      sx={{
        width: '250px',
        background: 'black',
        padding: '1rem',
        borderRadius: '4px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Global />
    </Box>
  );
};

export default CoinInfo;
