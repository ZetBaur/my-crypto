import { useContext } from 'react';
import {
  Box,
  IconButton,
  useTheme,
  Toolbar,
  InputBase,
  Autocomplete,
  TextField,
} from '@mui/material';
import { ColorModeContext, tokens } from '../../contexts/themeContext';
import MenuIcon from '@mui/icons-material/Menu';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import SearchIcon from '@mui/icons-material/Search';
import { coinList } from '../../data/coinList';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHook';
import {
  setId,
  setVsCurrency,
} from '../../store/features/coins/marketChartSlice';

interface IProps {
  open: boolean;
  handleDrawerOpen: () => void;
}

const Header = ({ open, handleDrawerOpen }: IProps) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const dispatch = useAppDispatch();
  const id = useAppSelector((state) => state.marketChart.id);
  const vsCurrency = useAppSelector((state) => state.marketChart.vsCurrency);

  return (
    <Toolbar>
      {!open && (
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
      )}

      {/* <Box
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
      </Box> */}

      <Box
        component='form'
        sx={{
          background: theme.palette.background.paper,
          display: 'flex',
          borderRadius: '4px',
          flex: 1,
        }}
      >
        <Autocomplete
          size='small'
          fullWidth
          freeSolo
          options={coinList.map((option) => option.id)}
          value={id}
          onChange={(event, newCoin: string | null) => dispatch(setId(newCoin))}
          sx={{
            background: '#000000',
          }}
          renderInput={(params) => (
            <TextField {...params} placeholder='Search Coin' />
          )}
        />
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
  );
};
export default Header;
