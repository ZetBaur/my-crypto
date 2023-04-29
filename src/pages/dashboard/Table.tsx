import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import StarIcon from '@mui/icons-material/Star';

import { useLazyFetchMarketsQuery } from '../../store/features/coins/coinsApi';
import {
  Box,
  CircularProgress,
  TablePagination,
  Tooltip,
  Typography,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHook';
import { ICoinData, IMarkets } from '../../model/coinsTypes';
import { useCheckPortfolio } from '../../hooks/checkPortfolio';
import {
  addToPortfolio,
  removeFromPortfolio,
} from '../../store/features/coins/portfolioSlice';
import { setId } from '../../store/features/coins/marketChartSlice';

const headCells = [
  '',
  'Coin',
  'Price / $',
  'Price change 24h / $',
  'Price change % 24h',
  'Volume / $',
];

export default function BasicTable() {
  const [fetchMarkets, { isError, isFetching, data }] =
    useLazyFetchMarketsQuery();
  const dispatch = useAppDispatch();
  const portfolio = useAppSelector((state) => state.portfolio.portfolio);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    console.log('page', page);

    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    const params = {
      page,
      rowsPerPage,
    };
    fetchMarkets(params);
  }, [page, rowsPerPage]);

  useEffect(() => {
    console.log('data', data);
  }, [data]);

  const handleCoinClick = (el: IMarkets) => {
    dispatch(setId(el.id));
  };

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

  const formatVolume = (value: number) => {
    const v = value.toLocaleString('en-US', {
      currency: 'USD',
      maximumFractionDigits: 0,
    });

    return v.slice(0, v.length - 8) + ' M';
  };

  const formatPrice = (value: number) => {
    const v = value.toLocaleString('en-US', {
      currency: 'USD',
      maximumFractionDigits: 2,
    });
    return v;
  };

  const formatPriceChange = (value: number) => {
    return value.toFixed(4);
  };

  const formatPriceChangePercent = (value: number) => {
    return value.toFixed(2);
  };

  const valueColor = (value: number) => {
    return Math.sign(value) === -1 ? 'red' : 'green';
  };

  return (
    <>
      <TablePagination
        component='div'
        count={100}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{
          display: 'flex',
          alignContent: 'flex-start',
          color: 'blue',
          '& .MuiSvgIcon-root': {
            fill: 'yellow',
          },
        }}
      />

      {isError && (
        <Box
          sx={{
            textAlign: 'center',
          }}
        >
          Server does not respond. Please try later
        </Box>
      )}

      {isFetching && (
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

      {!isError && (
        <TableContainer
          component={Paper}
          sx={{
            padding: '1rem',
            marginTop: '0 !important',
          }}
        >
          <Table sx={{ minWidth: 650 }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                {headCells.map((el) => (
                  <TableCell
                    key={el}
                    sx={{
                      color: 'gray',
                    }}
                  >
                    {el}
                  </TableCell>
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
                  <TableCell>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                      }}
                    >
                      <img
                        width='24'
                        height='24'
                        src={el.image}
                        alt={el.name}
                      />
                      <Box
                        sx={{
                          ':hover': {
                            color: 'gray',
                            cursor: 'pointer',
                          },
                        }}
                        onClick={() => handleCoinClick(el)}
                      >
                        {el.name}
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>{formatPrice(el.current_price)}</TableCell>
                  <TableCell
                    sx={{
                      color: () => valueColor(el.price_change_24h),
                    }}
                  >
                    {formatPriceChange(el.price_change_24h)}
                  </TableCell>
                  <TableCell
                    sx={{
                      color: () => valueColor(el.price_change_24h),
                    }}
                  >
                    {formatPriceChangePercent(el.price_change_percentage_24h)}
                  </TableCell>
                  <TableCell>{formatVolume(el.total_volume)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
}
