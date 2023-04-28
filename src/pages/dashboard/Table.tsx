import { useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import StarIcon from '@mui/icons-material/Star';

import { useLazyFetchMarketsQuery } from '../../store/features/coins/coinsApi';
import { Tooltip } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHook';
import { ICoinData, IMarkets } from '../../model/coinsTypes';
import { useCheckPortfolio } from '../../hooks/checkPortfolio';
import {
  addToPortfolio,
  removeFromPortfolio,
} from '../../store/features/coins/portfolioSlice';

const headCells = ['', 'Coin', 'Price', '24h', '% 24h', 'Volume'];

export default function BasicTable() {
  const [fetchMarkets, { data }] = useLazyFetchMarketsQuery();
  const dispatch = useAppDispatch();
  const portfolio = useAppSelector((state) => state.portfolio.portfolio);

  useEffect(() => {
    const params = {
      vsCurrency: 'usd',
      page: 1,
      perPage: 10,
    };
    fetchMarkets(params);
  }, []);

  useEffect(() => {
    console.log('data', data);
  }, [data]);

  const handleIconClick = (el: IMarkets) => {
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
      }}
    >
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            {headCells.map((el) => (
              <TableCell key={el}>{el}</TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {data?.map((el: IMarkets) => (
            <TableRow
              key={el.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component='th' scope='row'>
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
              </TableCell>
              <TableCell>{el.name}</TableCell>
              <TableCell>{el.current_price}</TableCell>
              <TableCell>{el.price_change_24h}</TableCell>
              <TableCell>{el.price_change_percentage_24h}</TableCell>
              <TableCell>{el.total_volume}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
