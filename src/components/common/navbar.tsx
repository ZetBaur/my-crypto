import { Box, useTheme } from '@mui/material';
import { tokens } from '../../theme';

const Navbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box
      component='aside'
      sx={{
        borderRight: `1px solid ${colors.borderColor}`,
        padding: '1rem',
        minHeight: '100vh',
      }}
    >
      Navbar Navbar
    </Box>
  );
};

export default Navbar;
