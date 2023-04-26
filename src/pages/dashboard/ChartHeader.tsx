import React, { SyntheticEvent, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { tokens } from '../../contexts/themeContext';
import { currencies } from '../../data/currencies';

import {
  Box,
  FormControl,
  MenuItem,
  Select,
  Tooltip as MuiTooltip,
  Autocomplete,
  TextField,
} from '@mui/material';

import { ICoin, ICurrentCoin } from '../../model/coinsTypes';
import { coinList } from '../../data/coinList';

import { useAppDispatch, useAppSelector } from '../../hooks/reduxHook';
import {
  setId,
  setDays,
  setVsCurrency,
  setInterval,
} from '../../store/features/coins/coinsSlice';

interface IProps {
  // search: string;
  // setSearch: React.Dispatch<React.SetStateAction<string>>;
  // vsCurrency: string;
  // setVsCurrency: React.Dispatch<React.SetStateAction<string>>;
  // days: string;
  // setDays: React.Dispatch<React.SetStateAction<string>>;
  // interval: string;
  // setInterval: React.Dispatch<React.SetStateAction<string>>;
  // currentCoin: ICurrentCoin | undefined;
  // setCurrentCoin: React.Dispatch<
  //   React.SetStateAction<ICurrentCoin | undefined>
  // >;
  // handleSearchCoin: (currency: string | null) => void;
  // id: string | null;
  // setId: React.Dispatch<React.SetStateAction<string | null>>;
  // newCoin: string;
  // setNewCoin: React.Dispatch<React.SetStateAction<string>>;
  reduxSetId: (id: string | null) => void;
}

//----------------------

const HistoricChartHeader = () => {
  // const {
  //   search,
  //   setSearch,
  //   vsCurrency,
  //   setVsCurrency,
  //   days,
  //   setDays,
  //   interval,
  //   setInterval,
  //   currentCoin,
  //   setCurrentCoin,
  //   handleSearchCoin,
  //   id,
  //   setId,
  //   newCoin,
  //   setNewCoin,
  //   reduxSetId,
  // } = props;

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const id = useAppSelector((state) => state.coins.id);
  const vsCurrency = useAppSelector((state) => state.coins.vsCurrency);
  const days = useAppSelector((state) => state.coins.days);
  const interval = useAppSelector((state) => state.coins.interval);
  const prices = useAppSelector((state) => state.coins.prices);
  const currentCoin = useAppSelector((state) => state.coins.currentCoin);

  const dispatch = useAppDispatch();

  return (
    <Box
      sx={{
        padding: '1rem',
        display: 'flex',
        gap: '1rem',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          minWidth: '100px',
          marginRight: '1 rem',
          background: colors.secondary.DEFAULT,
          borderRadius: '4px',
          padding: '8px 16px',
        }}
      >
        <img src={currentCoin?.image.thumb} alt={currentCoin?.symbol} />
        <span>{currentCoin?.name}</span>
      </Box>

      {/* search input ----------------------------------------------------------- */}

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
            <TextField
              // value={search}
              // onChange={(e) => setSearch(e.target.value)}
              {...params}
              placeholder='Search Coin'
            />
          )}
        />
      </Box>

      {/* selects ------------------------------------------------------- */}

      <FormControl size='small' variant='outlined'>
        <Select
          value={vsCurrency}
          onChange={(e) => setVsCurrency(e.target.value)}
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

      <FormControl size='small' variant='outlined'>
        <Select
          value={days}
          onChange={(e) => setDays(e.target.value)}
          sx={{
            minWidth: '120px',
            '& .MuiSvgIcon-root': {
              fill: 'yellow',
            },
          }}
        >
          {/* <MenuItem value=''>
            <em>None</em>
          </MenuItem> */}
          <MenuItem value='1'>Last Day</MenuItem>
          <MenuItem value='7'>Last Week</MenuItem>
          <MenuItem value='30'>Last Month</MenuItem>
          <MenuItem value='90'>Last 3 Months</MenuItem>
          <MenuItem value='180' disabled={interval === 'hourly'}>
            Last 6 Months
          </MenuItem>
          <MenuItem value='360' disabled={interval === 'hourly'}>
            Last year
          </MenuItem>
        </Select>
      </FormControl>

      <FormControl size='small' variant='outlined'>
        <Select
          value={interval}
          onChange={(e) => setInterval(e.target.value)}
          sx={{
            width: '100px',
            '& .MuiSvgIcon-root': {
              fill: 'yellow',
            },
          }}
        >
          <MenuItem value='hourly'>Hourly</MenuItem>
          <MenuItem value='daily' disabled={days === '180' || days === '360'}>
            Dayly
          </MenuItem>
          {/* <MenuItem value={30}>Thirty</MenuItem> */}
        </Select>
      </FormControl>
    </Box>
  );
};

export default HistoricChartHeader;
