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
  Tooltip,
} from '@mui/material';
import { coinList } from '../../data/coinList';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHook';
import {
  setId,
  setVsCurrency,
} from '../../store/features/coins/marketChartSlice';

import {
  setCurrentCoin,
  addToPortfolio,
  removeFromPortfolio,
} from '../../store/features/coinsFeature/coinsSlice';

import SelectPeriod from './SelectPeriod';
import StarIcon from '@mui/icons-material/Star';

import Period from './Period';
import { useCheckPortfolio } from '../../hooks/checkPortfolio';

const ChartHeader = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const code = useAppSelector((state) => state.coins.code);
  const currency = useAppSelector((state) => state.coins.currency);
  const start = useAppSelector((state) => state.coins.start);
  const end = useAppSelector((state) => state.coins.end);
  const currentCoin = useAppSelector((state) => state.coins.currentCoin);
  const portfolio = useAppSelector((state) => state.coins.portfolio);

  const dispatch = useAppDispatch();

  const isInPortfolio = useCheckPortfolio(currentCoin.code, portfolio);

  const iconColor = () => {
    return isInPortfolio ? 'blue' : 'gray';
  };

  const handleIconClick = () => {
    isInPortfolio
      ? dispatch(removeFromPortfolio(currentCoin.code))
      : dispatch(addToPortfolio(currentCoin.code));
  };

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
        <Tooltip
          title={
            iconColor() === 'gray'
              ? 'Add to portfolio'
              : 'Coin is added to portfolio'
          }
          placement='left'
        >
          <StarIcon
            sx={{
              cursor: 'pointer',
              color: () => iconColor(),
            }}
            onClick={handleIconClick}
          />
        </Tooltip>

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
            src={currentCoin?.webp64}
            alt={currentCoin?.name}
          />

          <span>{currentCoin?.name}</span>
        </Box>
      </Box>

      <Period />
    </Box>
  );
};

export default ChartHeader;
