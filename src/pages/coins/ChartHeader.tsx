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
import { coinList } from '../../data/coinList';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHook';
import {
  setId,
  setVsCurrency,
} from '../../store/features/coins/marketChartSlice';
import SelectPeriod from './SelectPeriod';
import StarIcon from '@mui/icons-material/Star';

import { setCurrentCoin } from '../../store/features/coins/currentCoinSlice';
import Period from './Period';

const ChartHeader = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const id = useAppSelector((state) => state.marketChart.id);
  const vsCurrency = useAppSelector((state) => state.marketChart.vsCurrency);
  const currentCoin = useAppSelector((state) => state.currentCoin.currentCoin);
  const dispatch = useAppDispatch();

  return (
    <Box
      sx={{
        display: 'flex',
        gap: '1rem',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '1rem',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          gap: '1rem',
          alignItems: 'center',
        }}
      >
        <StarIcon
          sx={{
            cursor: 'pointer',
            // color: () => iconColor(el),
          }}
        />

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
      </Box>

      <Period />
    </Box>
  );
};

export default ChartHeader;
