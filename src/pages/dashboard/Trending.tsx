import { useEffect, useState } from 'react';
import { useLazyFetchTrendingQuery } from '../../store/features/coins/coinsApi';
import { Box, Tooltip } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { useTheme } from '@mui/material/styles';
import { tokens } from '../../contexts/themeContext';
import { ITrending, ITrendingCoin } from '../../model/coinsTypes';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHook';
import {
  setId,
  addToPortfolio,
  removeFromPortfolio,
} from '../../store/features/coins/coinsSlice';
import { useLazyFetchCoinByIdQuery } from '../../store/features/coins/coinsApi';

const Trending = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [trendingCoins, setTrendingCoins] = useState<ITrending>();
  const portfolio = useAppSelector((state) => state.coins.portfolio);

  const dispatch = useAppDispatch();
  const [fetchTrending, { isLoading: isTrendingLoading, data: TrendingData }] =
    useLazyFetchTrendingQuery();
  const [fetchCoinById, { isLoading: isCoinByIdLoading, data: coinByIdData }] =
    useLazyFetchCoinByIdQuery();

  useEffect(() => {
    fetchTrending();
  }, []);

  useEffect(() => {
    if (TrendingData) setTrendingCoins(TrendingData);
  }, [TrendingData]);

  const handleCoinClick = (el: ITrendingCoin) => {
    dispatch(setId(el.item.id));
  };

  const handleIconClick = async (el: ITrendingCoin) => {
    await fetchCoinById(el.item.id);
  };

  useEffect(() => {
    if (coinByIdData) {
      const isInPortfolio = portfolio.some((el) => {
        return el.id === coinByIdData?.id;
      });

      !isInPortfolio
        ? dispatch(addToPortfolio(coinByIdData))
        : removeFromPortfolio(coinByIdData);
    }
  }, [coinByIdData]);

  const iconColor = (el: ITrendingCoin) => {
    const inP = portfolio.some((item) => el.item.id === item.id);
    return inP ? 'blue' : 'gray';
  };

  return (
    <Box
      sx={{
        background: colors.primary.DEFAULT,
        border: `1px solid ${colors.chartBoderColor}`,
        borderRadius: '12px',
        width: '250px',
        padding: '1rem',
      }}
    >
      <Box
        sx={{
          textAlign: 'center',
          marginBottom: '1rem',
          fontWeight: '600',
          color: colors.blue,
        }}
      >
        Top 7 Trending
      </Box>

      {trendingCoins?.coins.map((el) => (
        <Box
          key={el.item.id}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            background: colors.secondary.DEFAULT,
            marginBottom: '1rem',
            padding: '8px 1rem',
            borderRadius: '4px',
          }}
        >
          <Tooltip title='Add to portfolio' placement='left'>
            <StarIcon
              onClick={() => handleIconClick(el)}
              sx={{
                cursor: 'pointer',
                color: () => iconColor(el),
              }}
            />
          </Tooltip>

          <Box
            sx={{
              cursor: 'pointer',
              flex: '1',
              ':hover': {
                color: 'gray',
              },
            }}
            onClick={() => handleCoinClick(el)}
          >
            {el.item.name}
          </Box>

          <img src={el.item.thumb} alt={el.item.name} />
        </Box>
      ))}
    </Box>
  );
};

export default Trending;
