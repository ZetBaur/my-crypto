import React from 'react';
import { useTheme } from '@mui/material/styles';
import { tokens } from '../../../contexts/themeContext';

import {
  Box,
  FormControl,
  MenuItem,
  Select,
  Tooltip as MuiTooltip,
  Autocomplete,
  TextField,
} from '@mui/material';

import { ICoin } from '../../../model/coinsTypes';
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
  showSearchList: boolean;
  setShowSearchList: React.Dispatch<React.SetStateAction<boolean>>;
  searchList: ICoin[] | undefined;
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
      <Box>{'BTC'}</Box>

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
          options={coinList.map((option) => option.name)}
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
