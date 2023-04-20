import { Outlet } from 'react-router-dom';
import { Navbar, Header } from '../components';
import { Box, useTheme } from '@mui/material';
import { tokens } from '../theme';

const MainLayout = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box
      sx={{
        display: 'flex',
        background: colors.primary.DEFAULT,
      }}
    >
      <Navbar />

      <Box
        sx={{
          flex: '1',
        }}
      >
        <Header />

        <Box
          component='main'
          sx={{
            background: colors.content.DEFAULT,
            height: '100%',
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default MainLayout;
