import { useFetchTrendingQuery } from '../../store/features/coins/coinsApi';
import { Box, CircularProgress, Tooltip } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { useTheme } from '@mui/material/styles';
import { tokens } from '../../contexts/themeContext';
import { ICoinData, ITrendingCoin } from '../../model/coinsTypes';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHook';
import { setId } from '../../store/features/coins/marketChartSlice';
import { useCheckPortfolio } from '../../hooks/checkPortfolio';
import {
  addToPortfolio,
  removeFromPortfolio,
} from '../../store/features/coins/portfolioSlice';

const Trending = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const portfolio = useAppSelector((state) => state.portfolio.portfolio);
  const dispatch = useAppDispatch();

  const {
    isLoading: isTrendingLoading,
    isFetching: isTrendingFetching,
    isError: isTrendingError,
    data: TrendingData,
  } = useFetchTrendingQuery();

  const handleCoinClick = (el: ITrendingCoin) => {
    dispatch(setId(el.item.id));
  };

  const handleIconClick = async (el: ITrendingCoin) => {
    const coinToAdd: ICoinData = {
      id: el.item.id,
      symbol: el.item.symbol,
      name: el.item.name,
      image: el.item.thumb,
      inPortfolio: false,
    };

    const isInPortfolio = useCheckPortfolio(el.item.id, portfolio);

    !isInPortfolio
      ? dispatch(addToPortfolio(coinToAdd))
      : dispatch(removeFromPortfolio(coinToAdd));
  };

  const iconColor = (el: ITrendingCoin) => {
    // const isInPortfolio = portfolio.some((item) => el.item.id === item.id);

    const isInPortfolio = useCheckPortfolio(el.item.id, portfolio);

    return isInPortfolio ? 'blue' : 'black';
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

      {(isTrendingLoading || isTrendingFetching) && (
        <CircularProgress
          sx={{
            position: 'absolute',
            top: '40%',
            left: '45%',
            zIndex: '10',
            color: 'blue',
          }}
        />
      )}

      {isTrendingError && 'Server does not respond. Try later'}

      {TrendingData?.coins.map((el: ITrendingCoin) => (
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
          <Tooltip
            title={
              iconColor(el) === 'black'
                ? 'Add to portfolio'
                : 'Remove from pertfolio'
            }
            placement='left'
          >
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
