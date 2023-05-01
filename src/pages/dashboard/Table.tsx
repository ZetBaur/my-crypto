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
import moment from 'moment';

import {
  useLazyFetchMarketsQuery,
  useFetchListQuery,
  useFetchMarketChartRangeQuery,
} from '../../store/features/coins/coinsApi';
import {
  Box,
  CircularProgress,
  TablePagination,
  TableSortLabel,
  Tooltip,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHook';
import { ICoinData, IMarkets } from '../../model/coinsTypes';
import { useCheckPortfolio } from '../../hooks/checkPortfolio';
import {
  addToPortfolio,
  removeFromPortfolio,
} from '../../store/features/coins/portfolioSlice';
import { setId } from '../../store/features/coins/marketChartSlice';
import TableChart from './TableChart';

export default function BasicTable() {
  const [fetchMarkets, { isError, isFetching, isSuccess, data }] =
    useLazyFetchMarketsQuery();
  const { data: listData } = useFetchListQuery();
  // const { data: marketChartRangeData } =
  //   useFetchMarketChartRangeQuery('bitcoin');

  // useEffect(() => {
  //   if (marketChartRangeData) console.log(marketChartRangeData);
  // });

  useFetchListQuery;
  const dispatch = useAppDispatch();
  const portfolio = useAppSelector((state) => state.portfolio.portfolio);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalPagesNumber, setTotalPagesNumber] = useState(100);
  const [order, setOrder] = useState('volume_desc');

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    if (listData) {
      setTotalPagesNumber(Math.ceil(listData?.length / rowsPerPage));
    }
  }, [listData]);

  useEffect(() => {
    const params = {
      page,
      rowsPerPage,
      order,
    };
    fetchMarkets(params);
  }, [page, rowsPerPage, order]);

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
    if (value === null) return 'NA';
    if (value === 0) return 0;

    const v = value.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    });
    // return v.slice(0, v.length - 8) + ' M';
    return v;
  };

  const formatMarketCap = (value: number) => {
    const v = value.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    });
    return v.slice(0, v.length - 12) + ' B';
  };

  const formatPrice = (value: number) => {
    if (!value) return 'NA';
    return value.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    });
  };

  const formatPriceChange = (value: number) => {
    if (value === null) return 'NA';
    return value.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 4,
    });
  };

  const formatPriceChangePercent = (value: number) => {
    if (value === null) return 'NA';
    return value.toFixed(2) + ' %';
  };

  const valueColor = (value: number) => {
    if (Math.sign(value) === -1) return 'red';
    if (Math.sign(value) === 1) return 'green';
  };

  const handleSort = (el: string) => {
    console.log('sort', el);
  };

  const sortedColumns = (el: string) => {
    if (el !== 'Coin' && el !== 'Market Cap' && el !== 'Volume') return true;
  };

  const headCells = [
    '',
    'Coin',
    'Price',
    '1h',
    '24h',
    'Volume',
    'Mkt Cap',
    'Last 7 days',
  ];
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
                    key={el}
                    sx={{
                      color: 'gray',
                    }}
                  >
                    <TableSortLabel
                      active={false} // If true, the label will have the active styling (should be true for the sorted column).
                      direction='asc'
                      // hideSortIcon={sortedColumns(el)} //	           Hide sort icon when active is false.
                      IconComponent={FilterListIcon}
                      onClick={() => handleSort(el)}
                      sx={{
                        fontSize: '13px',
                      }}
                    >
                      {el}
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
                        onClick={() => dispatch(setId(el.id))}
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

                  <TableCell>{formatVolume(el.total_volume)}</TableCell>

                  <TableCell>{formatVolume(el.market_cap)}</TableCell>

                  <TableCell
                    sx={{
                      width: '200px',
                      height: '100px',
                    }}
                  >
                    <TableChart coin={el.id} />
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
          }}
        >
          Server does not respond. Try later
        </Box>
      )}
    </>
  );
}
