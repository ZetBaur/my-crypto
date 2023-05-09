import { useContext, useEffect, useState } from 'react';
import {
  Box,
  IconButton,
  useTheme,
  Toolbar,
  InputBase,
  Autocomplete,
  TextField,
  FormControl,
  Select,
  MenuItem,
} from '@mui/material';
import { ColorModeContext, tokens } from '../../contexts/themeContext';
import MenuIcon from '@mui/icons-material/Menu';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import SearchIcon from '@mui/icons-material/Search';
// import { coinList } from '../../data/coinList';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHook';
import {
  setId,
  setVsCurrency,
} from '../../store/features/coins/marketChartSlice';
import { currencies } from '../../data/currencies';
import { useFetchPlatformsAllQuery } from '../../store/features/coinsFeature/coinsApi';
import { setCode } from '../../store/features/coinsFeature/coinsSlice';
import { getUniqueElements } from '../../hooks/getUniqueElements';

interface IProps {
  open: boolean;
  handleDrawerOpen: () => void;
}

const AppHeader = ({ open, handleDrawerOpen }: IProps) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const dispatch = useAppDispatch();
  const code = useAppSelector((state) => state.coins.code);
  // const name = useAppSelector((state) => state.coins.code);

  const vsCurrency = useAppSelector((state) => state.marketChart.vsCurrency);
  const [coins, setCoins] = useState<string[]>([]);
  const { data: coinsList } = useFetchPlatformsAllQuery();

  useEffect(() => {
    if (coinsList) {
      const newArr = getUniqueElements(coinsList, 'name');
      setCoins(newArr?.map((el: { name: string }) => el.name));
    }
  }, [coinsList]);

  return (
    <Toolbar>
      {!open && (
        <IconButton
          size='large'
          edge='start'
          color='inherit'
          aria-label='menu'
          // sx={{ mr: 2 }}
          onClick={handleDrawerOpen}
        >
          <MenuIcon />
        </IconButton>
      )}

      <Box
        component='form'
        sx={{
          background: theme.palette.background.paper,
          display: 'flex',
          borderRadius: '4px',
          flex: 1,
          marginRight: '1rem',
        }}
      >
        <Autocomplete
          size='small'
          fullWidth
          freeSolo
          options={coins}
          value={code}
          onChange={(event, newCoin: string | null) => {
            console.log(newCoin);

            dispatch(setCode(newCoin));
          }}
          sx={{
            background: '#000000',
          }}
          renderInput={(params) => (
            <TextField {...params} placeholder='Search Coin' />
          )}
        />
      </Box>

      <FormControl size='small' variant='outlined'>
        <Select
          value={vsCurrency}
          onChange={(e) => dispatch(setVsCurrency(e.target.value))}
          sx={{
            width: '100px',
            '& .MuiSvgIcon-root': {
              fill: 'yellow',
            },
          }}
        >
          {currencies.map((el) => {
            return (
              <MenuItem key={el.code} value={el.code}>
                <Box
                  sx={{
                    display: 'flex',
                    gap: '8px',
                  }}
                >
                  <Box
                    sx={{
                      color: '#4688E4',
                    }}
                  >
                    {el.symbolNative}
                  </Box>

                  <Box>{el.code}</Box>
                </Box>
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>

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
export default AppHeader;
