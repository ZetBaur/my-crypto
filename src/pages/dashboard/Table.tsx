import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import StarIcon from '@mui/icons-material/Star';
import FilterListIcon from '@mui/icons-material/FilterList';
import TableChart from './TableChart';

import {
  useLazyFetchMarketsQuery,
  useFetchListQuery,
} from '../../store/features/coins/coinsApi';

import {
  Box,
  CircularProgress,
  TablePagination,
  TableSortLabel,
  Tooltip,
} from '@mui/material';

import { useAppDispatch, useAppSelector } from '../../helpers/reduxHook';
import { IMarkets } from '../../model/coinsTypes';
import { useCheckPortfolio } from '../../helpers/checkPortfolio';

import {
  addToPortfolio,
  removeFromPortfolio,
} from '../../store/features/coins/portfolioSlice';

import { setId } from '../../store/features/coins/marketChartSlice';
import { setCurrentCoin } from '../../store/features/coins/currentCoinSlice';

//------------------------------------------------------------------------------

const BasicTable = () => {
  const [fetchMarkets, { isError, isFetching, isSuccess, data }] =
    useLazyFetchMarketsQuery();

  const { data: listData } = useFetchListQuery();

  const dispatch = useAppDispatch();
  const portfolio = useAppSelector((state) => state.portfolio.portfolio);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalPagesNumber, setTotalPagesNumber] = useState(100);
  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState('market_cap_desc');

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    // page === 0 ? setPage(2) : setPage(newPage);

    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value));
  };

  useEffect(() => {
    if (listData) {
      console.log('listData');
      setTotalPagesNumber(Math.ceil(listData?.length / rowsPerPage));
    }
  }, [listData]);

  useEffect(() => {
    const params = {
      page,
      rowsPerPage,
      order: orderBy,
    };
    fetchMarkets(params);
  }, [page, rowsPerPage, orderBy]);

  const handleIconClick = (el: IMarkets) => {
    // const coinToAdd: ICoinData = {
    //   id: el.id,
    //   symbol: el.symbol,
    //   name: el.name,
    //   image: el.image,
    // };
    const isInPortfolio = useCheckPortfolio(el.id, portfolio);

    !isInPortfolio
      ? dispatch(addToPortfolio(el))
      : dispatch(removeFromPortfolio(el));
  };

  const iconColor = (el: IMarkets) => {
    const isInPortfolio = useCheckPortfolio(el.id, portfolio);
    return isInPortfolio ? 'blue' : 'black';
  };

  const formatValue = (value: number | undefined) => {
    if (value === null) return 'NA';
    if (value === 0) return 0;

    return value.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    });
  };

  const formatPrice = (value: number | undefined) => {
    if (!value) return 'NA';
    const isZero = value < 1;
    return value.toLocaleString('fi-FI', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: isZero ? 2 : 0,
    });
  };

  const formatPriceChangePercent = (value: number | undefined) => {
    if (value === null) return 'NA';
    return value.toFixed(2) + ' %';
  };

  const valueColor = (value: number | undefined) => {
    if (Math.sign(value) === -1) return 'red';
    if (Math.sign(value) === 1) return 'green';
  };

  const handleSort = (el: { text: string; type: string }) => {
    if (el.type) {
      setOrder(order === 'asc' ? 'desc' : 'asc');
      setOrderBy(el.type + '_' + order);
    }
  };

  const sortingColumns = (el: { text: string; type: string }) => {
    if (!el.type) return true;
  };

  const headCells = [
    { text: 'Portfolio', type: '' },
    { text: 'Coin', type: 'id' },
    { text: 'Price', type: 'price' },
    { text: '1h', type: '' },
    { text: '24h', type: '' },
    { text: 'Volume', type: 'volume' },
    { text: 'Mkt Cap', type: 'market_cap' },
    { text: 'Last 7 days', type: '' },
  ];

  const handleCoinClick = (el: IMarkets) => {
    dispatch(setId(el.id));
    dispatch(setCurrentCoin(el));
  };

  //---------------------------------------

  return (
    <>
      <TablePagination
        component='div'
        count={totalPagesNumber}
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

      {!isError && !isFetching && isSuccess && data && (
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
                    key={el.text}
                    sx={{
                      color: 'gray',
                      '& .MuiSvgIcon-root': {
                        marginLeft: '8px',
                      },
                    }}
                  >
                    <TableSortLabel
                      active={el.type !== '' && orderBy.includes(el.type)}
                      direction='asc'
                      hideSortIcon={sortingColumns(el)} //	           Hide sort icon when active is false.
                      IconComponent={FilterListIcon}
                      onClick={() => handleSort(el)}
                      sx={{
                        fontSize: '13px',
                        ':hover': {
                          color: el.type !== '' ? 'white' : 'gray',
                          cursor: el.type !== '' ? 'pointer' : 'default',
                        },
                      }}
                    >
                      {el.text}
                    </TableSortLabel>
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
                      color: () =>
                        valueColor(el.price_change_percentage_1h_in_currency),
                    }}
                  >
                    {formatPriceChangePercent(
                      el.price_change_percentage_1h_in_currency
                    )}
                  </TableCell>

                  <TableCell
                    sx={{
                      color: () => valueColor(el.price_change_percentage_24h),
                    }}
                  >
                    {formatPriceChangePercent(el.price_change_percentage_24h)}
                  </TableCell>

                  <TableCell>{formatValue(el.total_volume)}</TableCell>

                  <TableCell>{formatValue(el.market_cap)}</TableCell>

                  <TableCell
                    sx={{
                      width: '200px',
                      height: '100px',
                    }}
                  >
                    <TableChart coin={el.symbol.toUpperCase()} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {isFetching && (
        <Box
          sx={{
            height: '300px',
            background: '#222222',
            border: `1px solid '#222222'`,
            borderRadius: '4px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '0 !important',
          }}
        >
          <CircularProgress
            sx={{
              zIndex: '10',
              color: 'blue',
            }}
          />
        </Box>
      )}

      {isError && (
        <Box
          sx={{
            height: '300px',
            background: '#222222',
            border: `1px solid '#222222'`,
            borderRadius: '4px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '0 !important',
          }}
        >
          Server does not respond. Try later
        </Box>
      )}
    </>
  );
};

export default BasicTable;
