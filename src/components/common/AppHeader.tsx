import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import { Box, IconButton, useTheme } from '@mui/material';
import { useContext, useEffect, useRef, useState } from 'react';
import { ColorModeContext, tokens } from '../../theme';
import InputBase from '@mui/material/InputBase';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import SearchIcon from '@mui/icons-material/Search';

interface IProps {
  open: boolean;
  handleDrawerOpen: () => void;
  drawerWidth: number;
}

const Header = ({ open, handleDrawerOpen, drawerWidth }: IProps) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const component = useRef<HTMLDivElement | null>(null);
  const [componentWith, setComponentWith] = useState('100%');

  useEffect(() => {
    console.log('component', component.current?.clientWidth + 'px');
    console.log('first', drawerWidth);

    component.current.

    let shrinkedWidth = `${component?.current?.clientWidth - drawerWidth}px`;

    console.log(shrinkedWidth);

    setComponentWith(open ? `${shrinkedWidth}` : '100%');
  }, [open]);

  return (
    <AppBar
      ref={component}
      sx={{
        width: { componentWith },
      }}
    >
      <Toolbar>
        <IconButton
          size='large'
          edge='start'
          color='inherit'
          aria-label='menu'
          sx={{ mr: 2 }}
          onClick={handleDrawerOpen}
        >
          <MenuIcon />
        </IconButton>

        <Box
          sx={{
            background: colors.secondary.DEFAULT,
            display: 'flex',
            borderRadius: '4px',
            flex: 1,
            border: `1px solid ${colors.borderColor}`,
            marginRight: '1rem',
          }}
        >
          <InputBase sx={{ ml: 2, flex: 1 }} placeholder='Search' />

          <IconButton type='button' sx={{ p: 1 }}>
            <SearchIcon />
          </IconButton>
        </Box>

        <Box display='flex'>
          <IconButton onClick={colorMode.toggleColorMode}>
            {theme.palette.mode === 'dark' ? (
              <DarkModeOutlinedIcon />
            ) : (
              <LightModeOutlinedIcon />
            )}
          </IconButton>

          <IconButton>
            <NotificationsOutlinedIcon />
          </IconButton>

          <IconButton>
            <SettingsOutlinedIcon />
          </IconButton>

          <IconButton>
            <PersonOutlinedIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
export default Header;
