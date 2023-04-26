import React, { useEffect } from 'react';
import { useLazyFetchTrendingQuery } from '../../store/features/coins/coinsApi';
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { tokens } from '../../contexts/themeContext';

const Trending = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [fetchTrending, { isLoading: isTrendingLoading, data: TrendingData }] =
    useLazyFetchTrendingQuery();

  useEffect(() => {
    fetchTrending();
  }, []);

  return (
    <Box
      sx={{
        background: colors.primary.DEFAULT,
        border: `1px solid ${colors.chartBoderColor}`,
        borderRadius: '12px',
        width: '250px',
      }}
    ></Box>
  );
};

export default Trending;
