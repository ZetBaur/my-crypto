import { useEffect } from 'react';
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
  CircularProgress,
} from '@mui/material';
import { coinsList } from '../../data/coinsList';
import { useAppDispatch, useAppSelector } from '../../helpers/reduxHook';
import {
  setId,
  setVsCurrency,
} from '../../store/features/coins/marketChartSlice';
import SelectPeriod from './SelectPeriod';
import SelectInterval from './SelectInterval';
// import { useLazyFetchCoinByIdQuery } from '../../store/features/coins/coinsApi';
import { setCurrentCoin } from '../../store/features/coins/currentCoinSlice';

const ChartHeader = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const id = useAppSelector((state) => state.marketChart.id);
  const vsCurrency = useAppSelector((state) => state.marketChart.vsCurrency);
  const currentCoin = useAppSelector((state) => state.currentCoin.currentCoin);
  const dispatch = useAppDispatch();

  // const [fetchCoinById, { data: coinByIdData }] = useLazyFetchCoinByIdQuery();

  // useEffect(() => {
  //   if (id) fetchCoinById(id);
  // }, [id]);

  // useEffect(() => {
  //   const newCurrentCoin = {
  //     id: coinByIdData?.id,
  //     symbol: coinByIdData?.symbol,
  //     name: coinByIdData?.name,
  //     image: coinByIdData?.image.thumb,
  //   };
  //   dispatch(setCurrentCoin(newCurrentCoin));
  // }, [coinByIdData]);

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
            gap: '1rem',
            background: colors.secondary.DEFAULT,
            borderRadius: '4px',
            padding: '8px 16px',
            position: 'relative',
          }}
        >
          <img
            width={25}
            height={25}
            src={currentCoin?.image}
            alt={currentCoin?.symbol}
          />

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
            options={coinList.map((option) => option.id)}
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
        <SelectPeriod />
        <SelectInterval />
      </Box>
    </Box>
  );
};

export default ChartHeader;
