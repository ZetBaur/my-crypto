import { useTheme } from '@mui/material/styles';
import { tokens } from '../../contexts/themeContext';
import { Box, Chip, Typography } from '@mui/material';
import { IPublicCompanies } from '../../model/coinsTypes';

import { useLazyFetchPublicCompaniesQuery } from '../../store/features/coins/coinsApi';
import { useEffect } from 'react';

const PublicCompanies = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [
    fetchPublicCompanies,
    { isLoading: isPublicCompaniesLoading, data: publicCompanies },
  ] = useLazyFetchPublicCompaniesQuery();

  useEffect(() => {
    fetchPublicCompanies(id);
  }, []);

  useEffect(() => {
    console.log('publicCompaniesData', publicCompanies);
  }, [publicCompanies]);

  return (
    <Box
      sx={{
        width: '300px',
        background: colors.primary.DEFAULT,
        border: `1px solid ${colors.chartBoderColor}`,
        borderRadius: '12px',
        padding: '1rem',
      }}
    >
      <Typography variant='h6' gutterBottom>
        h5. Heading
      </Typography>

      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '4px',
        }}
      >
        <Chip label='Chip Outlined' variant='outlined' />
        <Chip label='Chip Outlined' variant='outlined' />
        <Chip label='Chip Outlined' variant='outlined' />
        <Chip label='Chip Outlined' variant='outlined' />
        <Chip label='Chip Outlined' variant='outlined' />
      </Box>
    </Box>
  );
};

export default PublicCompanies;
