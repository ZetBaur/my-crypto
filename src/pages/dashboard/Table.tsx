import { useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useLazyFetchMarketsQuery } from '../../store/features/coins/coinsApi';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHook';
import { setMarkets } from '../../store/features/coins/marketsSlice';
import StarIcon from '@mui/icons-material/Star';
import { useCheckPortfolio } from '../../hooks/checkPortfolio';
import { setId } from '../../store/features/coins/marketChartSlice';
import { ICoinData, IMarkets } from '../../model/coinsTypes';
import {
  addToPortfolio,
  removeFromPortfolio,
} from '../../store/features/coins/portfolioSlice';
import { Tooltip } from '@mui/material';

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

console.log(rows);

export default function MarketsTable() {
  const markets = useAppSelector((state) => state.markets.markets);
  const dispatch = useAppDispatch();
  const portfolio = useAppSelector((state) => state.portfolio.portfolio);

  const [
    fetchMarkets,
    { isError: isMarketsError, isSuccess: isMarketsSuccess, data: marketsData },
  ] = useLazyFetchMarketsQuery();

  useEffect(() => {
    const params = {
      vsCurrency: 'usd',
      perPage: 10,
    };
    fetchMarkets(params);
  }, []);

  useEffect(() => {
    console.log(marketsData);
    dispatch(setMarkets(marketsData));
    console.log(markets);
    console.log(marketsData);
  }, [isMarketsSuccess]);

  const handleCoinClick = (el: IMarkets) => {
    dispatch(setId(el.id));
  };

  const handleIconClick = async (el: IMarkets) => {
    const coinToAdd: ICoinData = {
      id: el.id,
      symbol: el.symbol,
      name: el.name,
      image: el.image,
    };

    const isInPortfolio = useCheckPortfolio(el.id, portfolio);

    !isInPortfolio
      ? dispatch(addToPortfolio(coinToAdd))
      : dispatch(removeFromPortfolio(coinToAdd));
  };

  const iconColor = (el: IMarkets) => {
    const isInPortfolio = useCheckPortfolio(el.id, portfolio);

    return isInPortfolio ? 'blue' : 'black';
  };

  return (
    <TableContainer
      component={Paper}
      sx={{
        padding: '1rem',
        background: 'black',
        borderRadius: '12px',
      }}
    >
      <Table sx={{ minWidth: 650 }} size='small' aria-label='a dense table'>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>Coin</TableCell>
            <TableCell align='right'>Price</TableCell>
            <TableCell align='right'>24h</TableCell>
            <TableCell align='right'>% 24h</TableCell>
            <TableCell align='right'>Volume</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {marketsData?.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align='right'>
                <Tooltip
                  title={
                    iconColor(row) === 'black'
                      ? 'Add to portfolio'
                      : 'Remove from pertfolio'
                  }
                  placement='left'
                >
                  <StarIcon
                    onClick={() => handleIconClick(row)}
                    sx={{
                      cursor: 'pointer',
                      color: () => iconColor(row),
                    }}
                  />
                </Tooltip>
              </TableCell>

              <TableCell component='th' scope='row'>
                {row.name}
              </TableCell>
              <TableCell align='right'>{row.current_price}</TableCell>
              <TableCell align='right'>{row.price_change_24h}</TableCell>
              <TableCell align='right'>
                {row.price_change_percentage_24h}
              </TableCell>
              <TableCell align='right'>{row.total_volume}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
