import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { tokens } from '../../../contexts/themeContext';

import {
  Box,
  FormControl,
  IconButton,
  InputBase,
  MenuItem,
  Select,
  Tooltip as MuiTooltip,
  List,
  ListItem,
} from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';
import { BootstrapSelect } from '../../../utils/styles';
import SearchList from './SearchList';
import { ICoin } from '../../../model/coinsTypes';

interface IProps {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  // handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  currency: string;
  setCurrency: React.Dispatch<React.SetStateAction<string>>;
  days: string;
  setDays: React.Dispatch<React.SetStateAction<string>>;
  interval: string;
  setInterval: React.Dispatch<React.SetStateAction<string>>;
  // handleSubmit: (e: React.FormEvent) => void;
  showSearchList: boolean;
  setShowSearchList: React.Dispatch<React.SetStateAction<boolean>>;
  searchList: ICoin[] | undefined;
}

//----------------------
const HistoricChartHeader = (props: IProps) => {
  const {
    search,
    setSearch,
    // handleSearch,
    currency,
    setCurrency,
    days,
    setDays,
    interval,
    setInterval,
    // handleSubmit,
    showSearchList,
    searchList,
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
        // onSubmit={handleSubmit}
        sx={{
          background: theme.palette.background.paper,
          display: 'flex',
          borderRadius: '4px',
          flex: 1,
          border: `1px solid ${theme.palette.background.paper}`,
          position: 'relative',
        }}
      >
        <InputBase
          sx={{ ml: 2, flex: 1 }}
          placeholder='Search coin'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <IconButton type='submit' sx={{ p: 1 }} disabled={!search}>
          <SearchIcon />
        </IconButton>

        {showSearchList && <SearchList searchList={searchList} />}
      </Box>

      {/* selects ------------------------------------------------------- */}

      <FormControl variant='standard'>
        <MuiTooltip title='Currency' placement='top'>
          <Select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            input={<BootstrapSelect />}
            sx={{
              width: '100px',
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

      <FormControl variant='standard'>
        <MuiTooltip title='Period' placement='top'>
          <Select
            value={days}
            onChange={(e) => setDays(e.target.value)}
            input={<BootstrapSelect />}
            sx={{
              width: '100px',
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

      <FormControl variant='standard'>
        <MuiTooltip title='Interval' placement='top'>
          <Select
            value={interval}
            onChange={(e) => setInterval(e.target.value)}
            input={<BootstrapSelect />}
            sx={{
              width: '100px',
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
