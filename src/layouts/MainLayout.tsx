import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { AppHeader, Navbar } from '../components';
import { Outlet } from 'react-router-dom';

const drawerWidth = 240;

export default function PersistentDrawerLeft() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      <Navbar
        open={open}
        handleDrawerClose={handleDrawerClose}
        drawerWidth={drawerWidth}
      />

      <Box
        sx={{
          flex: '1',
        }}
      >
        <AppHeader
          open={open}
          handleDrawerOpen={handleDrawerOpen}
          drawerWidth={drawerWidth}
        />

        <Outlet />
      </Box>
    </Box>
  );
}
