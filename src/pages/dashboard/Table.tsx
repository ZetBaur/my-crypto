import React, { useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useLazyFetchCoinMarketsQuery } from '../../store/features/coins/coinsApi';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHook';
import { setCoinMarkets } from '../../store/features/coins/coinsSlice';

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

export default function DenseTable() {
  const coinMarkets = useAppSelector((state) => state.coins.coinMarkets);
  const dispatch = useAppDispatch();

  const [
    fetchMarkets,
    { isSuccess: coinMarketsSuccess, data: coinsMarketsData },
  ] = useLazyFetchCoinMarketsQuery();

  useEffect(() => {
    const params = {
      vsCurrency: 'usd',
      perPage: 13,
    };
    fetchMarkets(params);
  }, []);

  useEffect(() => {
    console.log(coinsMarketsData);
    dispatch(setCoinMarkets(coinsMarketsData));
    console.log(coinMarkets);
  }, [coinMarketsSuccess]);

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
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align='right'>Calories</TableCell>
            <TableCell align='right'>Fat&nbsp;(g)</TableCell>
            <TableCell align='right'>Carbs&nbsp;(g)</TableCell>
            <TableCell align='right'>Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component='th' scope='row'>
                {row.name}
              </TableCell>
              <TableCell align='right'>{row.calories}</TableCell>
              <TableCell align='right'>{row.fat}</TableCell>
              <TableCell align='right'>{row.carbs}</TableCell>
              <TableCell align='right'>{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
