import { useTheme } from '@mui/material/styles';
import { tokens } from '../../contexts/themeContext';
import { currencies } from '../../data/currencies';
import {
  Box,
  FormControl,
  MenuItem,
  Select,
  Autocomplete,
  TextField,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';
import { coinList } from '../../data/coinList';

import { useAppDispatch, useAppSelector } from '../../hooks/reduxHook';
import {
  setId,
  setDays,
  setVsCurrency,
  setInterval,
} from '../../store/features/coins/coinsSlice';
import SelectPeriod from './SelectPeriod';

const HistoricChartHeader = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const id = useAppSelector((state) => state.coins.id);
  const vsCurrency = useAppSelector((state) => state.coins.vsCurrency);
  const days = useAppSelector((state) => state.coins.days);
  const interval = useAppSelector((state) => state.coins.interval);
  const currentCoin = useAppSelector((state) => state.coins.currentCoin);
  const dispatch = useAppDispatch();

  return (
    <Box
      sx={{
        padding: '1rem',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          gap: '1rem',
          alignItems: 'center',
          marginBottom: '1rem',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: colors.secondary.DEFAULT,
            borderRadius: '4px',
            padding: '8px 16px',
          }}
        >
          <img src={currentCoin?.image} alt={currentCoin?.symbol} />
          <span>{currentCoin?.name}</span>
        </Box>

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
            options={coinList
              .map((option) => option.id)
              .filter((item) => item.length < 11)}
            value={id}
            onChange={(event, newCoin: string | null) =>
              dispatch(setId(newCoin))
            }
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
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <SelectPeriod type='period' />
        <SelectPeriod />
      </Box>
    </Box>
  );
};

export default HistoricChartHeader;
