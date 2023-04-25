import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { tokens } from '../../../contexts/themeContext';
import { currencies } from '../../../data/currencies';

import {
  Box,
  FormControl,
  MenuItem,
  Select,
  Tooltip as MuiTooltip,
  Autocomplete,
  TextField,
} from '@mui/material';

import { ICoin, ICurrentCoin } from '../../../model/coinsTypes';
import { coinList } from '../../../data/coinList';

interface IProps {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  currency: string;
  setCurrency: React.Dispatch<React.SetStateAction<string>>;
  days: string;
  setDays: React.Dispatch<React.SetStateAction<string>>;
  interval: string;
  setInterval: React.Dispatch<React.SetStateAction<string>>;
  currentCoin: ICurrentCoin | undefined;
  setCurrentCoin: React.Dispatch<
    React.SetStateAction<ICurrentCoin | undefined>
  >;
  handleCurrentCurrency: (currency: string | null) => void;
}

//----------------------

const HistoricChartHeader = (props: IProps) => {
  const {
    search,
    setSearch,
    currency,
    setCurrency,
    days,
    setDays,
    interval,
    setInterval,
    currentCoin,
    setCurrentCoin,
    handleCurrentCurrency,
  } = props;

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box
      sx={{
        padding: '1rem 1rem 1rem 2rem',
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
          onChange={(event: any, newValue) => handleCurrentCurrency(newValue)}
          sx={{
            background: '#000000',
          }}
          renderInput={(params) => (
            <TextField
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              {...params}
              placeholder='Search Coin'
            />
          )}
        />
      </Box>

      {/* selects ------------------------------------------------------- */}

      <FormControl size='small' variant='outlined'>
        <MuiTooltip title='Currency' placement='top'>
          <Select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
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
        </MuiTooltip>
      </FormControl>

      <FormControl size='small' variant='outlined'>
        <MuiTooltip title='Period' placement='top'>
          <Select
            value={days}
            onChange={(e) => setDays(e.target.value)}
            sx={{
              width: '100px',
              '& .MuiSvgIcon-root': {
                fill: 'yellow',
              },
            }}
          >
            <MenuItem value=''>
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </MuiTooltip>
      </FormControl>

      <FormControl size='small' variant='outlined'>
        <MuiTooltip title='Interval' placement='top'>
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
            <MenuItem value=''>
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </MuiTooltip>
      </FormControl>
    </Box>
  );
};

export default HistoricChartHeader;
