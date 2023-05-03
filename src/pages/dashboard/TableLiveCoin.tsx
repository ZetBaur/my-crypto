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
  useLazyFetchCoinsListQuery,
  useFetchPlatformsAllQuery,
} from '../../store/features/livecoinwatch/liveCoinWatchApi';

import {
  Box,
  CircularProgress,
  TablePagination,
  TableSortLabel,
  Tooltip,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHook';
import { ICoinsList } from '../../model/liveCoinWatchTypes';
import { useCheckPortfolio } from '../../hooks/checkPortfolio';
import {
  addToPortfolio,
  removeFromPortfolio,
} from '../../store/features/coins/portfolioSlice';
import { setId } from '../../store/features/coins/marketChartSlice';
import { ICoinData } from '../../model/coinsTypes';

const TableLiveCoin = () => {
  const dispatch = useAppDispatch();
  const portfolio = useAppSelector((state) => state.portfolio.portfolio);

  //=================================================

  const [
    fetchCoinsList,
    {
      isError: isCoinsListError,
      isFetching: isCoinsListFetching,
      isSuccess: isCoinsListSuccess,
      data: coinsListData,
    },
  ] = useLazyFetchCoinsListQuery();

  const { data: platformsAllData } = useFetchPlatformsAllQuery();

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [totalPagesNumber, setTotalPagesNumber] = useState(100);

  const [order, setOrder] = useState('descending');
  const [sort, setSort] = useState('price');

  useEffect(() => {
    if (platformsAllData)
      setTotalPagesNumber(platformsAllData.length / rowsPerPage);
  }, [platformsAllData]);

  useEffect(() => {
    const body = {
      currency: 'USD',
      sort,
      order,
      offset: (page - 1) * rowsPerPage,
      limit: rowsPerPage,
      meta: true,
    };
    fetchCoinsList(body);
  }, [sort, order, page, rowsPerPage]);

  useEffect(() => {
    console.log('coinsListData', coinsListData);
  }, [coinsListData]);

  //=================================================

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    value: number
  ) => {
    setPage(value);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value));
  };

  useEffect(() => {
    if (platformsAllData) {
      setTotalPagesNumber(Math.ceil(platformsAllData?.length / rowsPerPage));
    }
  }, [platformsAllData]);

  const handleIconClick = (el: ICoinsList) => {
    const coinToAdd: ICoinData = {
      name: el.name,
    };
    const isInPortfolio = useCheckPortfolio(el.name, portfolio);

    !isInPortfolio
      ? dispatch(addToPortfolio(coinToAdd))
      : dispatch(removeFromPortfolio(coinToAdd));
  };

  const iconColor = (el: ICoinsList) => {
    const isInPortfolio = useCheckPortfolio(el.name, portfolio);
    return isInPortfolio ? 'blue' : 'black';
  };

  const formatValue = (value: number) => {
    if (value === null) return 'NA';
    if (value === 0) return 0;

    return value.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    });
  };

  const formatPrice = (value: number) => {
    if (!value) return 'NA';
    return value.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
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

  const handleSort = (el: { text: string; type: string }) => {
    if (order === el.type + '_desc') {
      setOrder(el.type + '_asc');
    } else if (order !== el.type + '_desc') {
      setOrder(el.type + '_desc');
    }
  };

  const sortedColumns = (el: { text: string; type: string }) => {
    if (!el.type) return true;
  };

  const headCells = [
    { text: 'Portfolio', type: '' },
    { text: 'Coin', type: 'name' },
    { text: 'Price', type: 'rate' },
    { text: '1h', type: 'hour' },
    { text: '24h', type: 'day' },
    { text: 'Volume', type: 'volume' },
    { text: 'Mkt Cap', type: 'cap' },
    { text: 'Last 7 days', type: '' },
  ];
  //---------------------------------------

  return (
    <>
      <TablePagination
        component='div'
        rowsPerPageOptions={[5, 10, { value: -1, label: 'All' }]}
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

      {!isCoinsListError &&
        !isCoinsListFetching &&
        isCoinsListSuccess &&
        coinsListData && (
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
                          // fill: 'blue',
                          marginLeft: '8px',
                        },
                      }}
                    >
                      <TableSortLabel
                        active={false} // If true, the label will have the active styling (should be true for the sorted column).
                        direction='asc'
                        hideSortIcon={sortedColumns(el)} //	           Hide sort icon when active is false.
                        IconComponent={FilterListIcon}
                        onClick={() => handleSort(el)}
                        sx={{
                          fontSize: '13px',
                        }}
                      >
                        {el.text}
                      </TableSortLabel>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {coinsListData?.map((el) => (
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
                          src={el.webp64}
                          alt={el.name}
                        />
                        <Box
                          sx={{
                            ':hover': {
                              color: 'gray',
                              cursor: 'pointer',
                            },
                          }}
                          onClick={() => dispatch(setId(el.name))}
                        >
                          {el.name}
                        </Box>
                      </Box>
                    </TableCell>

                    <TableCell>{el.rate}</TableCell>

                    <TableCell
                      sx={{
                        color: () => valueColor(el.delta.hour),
                      }}
                    >
                      {el.delta.hour}
                    </TableCell>

                    <TableCell
                      sx={{
                        color: () => valueColor(el.delta.day),
                      }}
                    >
                      {el.delta.day}
                    </TableCell>

                    <TableCell>{el.volume}</TableCell>

                    <TableCell>{el.cap}</TableCell>

                    <TableCell
                      sx={{
                        width: '200px',
                        height: '100px',
                      }}
                    >
                      <TableChart coin={el.code} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

      {isCoinsListFetching && (
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

      {isCoinsListError && (
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

export default TableLiveCoin;
