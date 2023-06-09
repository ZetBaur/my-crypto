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
import { coins } from '../../data/coins';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

import { useLazyFetchCoinsListQuery } from '../../store/features/coins/liveCoinWatchApi';

import {
  Box,
  CircularProgress,
  TablePagination,
  TableSortLabel,
  Tooltip,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../helpers/reduxHook';
import { ICoinsList } from '../../model/liveCoinWatchTypes';
import { checkPortfolio } from '../../helpers/checkPortfolio';
import {
  addToPortfolio,
  removeFromPortfolio,
  setCode,
} from '../../store/features/coins/coinsSlice';

const headCells = [
  { text: 'Portfolio', type: '' },
  { text: 'Coin', type: 'rank' },
  { text: 'Price', type: 'price' },
  { text: '24h', type: 'delta.day' },
  { text: 'Volume', type: 'volume' },
  { text: 'Mkt Cap', type: 'cap' },
  { text: 'Last 7 days', type: '' },
];

const formatValue = (value: number | null): number | null => {
  if (value) {
    let newValue = value.toString();
    return parseFloat(newValue.slice(0, newValue.length - 4));
  } else {
    return null;
  }
};

const formatPrice = (value: number) => {
  const price = formatValue(value);

  if (price) {
    const isZero = price < 1;

    return price.toLocaleString('fi-FI', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: isZero ? 5 : 2,
    });
  } else {
    return 'NA';
  }
};

const formattedPrice = (price: number) => {
  if (price) {
    const isZero = Math.abs(price) < 1;

    return price.toLocaleString('fi-FI', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: isZero ? 5 : 2,
    });
  }

  // return price;
};

const formatVolume = (value: number) => {
  if (!value) return 'NA';

  return value?.toLocaleString('fi-FI', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  });
};

const sortedColumns = (el: { text: string; type: string }) => {
  if (!el.type) return true;
};

const BasicTable = () => {
  const dispatch = useAppDispatch();
  const portfolio = useAppSelector((state) => state.coins.portfolio);
  const currency = useAppSelector((state) => state.coins.currency);
  const [directionsDay, setDirectionsDay] = useState<any>({});

  const [
    fetchCoinsList,
    {
      isError: isCoinsListError,
      isFetching: isCoinsListFetching,
      data: coinsListData,
    },
  ] = useLazyFetchCoinsListQuery();

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('ascending');
  const [sort, setSort] = useState('rank');

  const body = {
    currency,
    sort,
    order,
    offset: page * rowsPerPage,
    limit: rowsPerPage,
    meta: true,
  };

  useEffect(() => {
    fetchCoinsList(body);
  }, [sort, order, page, rowsPerPage]);

  const handleIconClick = (el: ICoinsList) => {
    const isInPortfolio = checkPortfolio(el.code, portfolio);

    !isInPortfolio
      ? dispatch(addToPortfolio(el.code))
      : dispatch(removeFromPortfolio(el.code));
  };

  const iconColor = (el: ICoinsList) => {
    const isInPortfolio = checkPortfolio(el.code, portfolio);
    return isInPortfolio ? 'blue' : 'black';
  };

  const handleCoinClick = (code: string) => {
    dispatch(setCode(code));
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleSort = (el: { text: string; type: string }) => {
    if (el.type) {
      setOrder(order === 'descending' ? 'ascending' : 'descending');
      setSort(el.type);
    }
  };

  return (
    <>
      <TablePagination
        component='div'
        rowsPerPageOptions={[5, 10, 25, 50]}
        count={Math.ceil(coins.length / rowsPerPage)}
        page={page}
        onPageChange={(event, value) => setPage(value)}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={(event) =>
          setRowsPerPage(parseInt(event.target.value))
        }
        sx={{
          display: 'flex',
          alignContent: 'flex-start',
          color: 'blue',
          '& .MuiSvgIcon-root': {
            fill: 'yellow',
          },
        }}
      />

      {!isCoinsListError && !isCoinsListFetching && coinsListData && (
        <TableContainer
          component={Paper}
          sx={{
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
                      active={el.type !== '' && sort === el.type}
                      direction='asc'
                      hideSortIcon={sortedColumns(el)}
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
              {coinsListData?.map((el) => (
                <TableRow
                  key={el.code}
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                  }}
                >
                  <TableCell component='th' scope='row' align='center'>
                    <Tooltip
                      title={
                        iconColor(el) === 'black'
                          ? 'Add to portfolio'
                          : 'Coin is added to portfolio'
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
                        onClick={() => handleCoinClick(el.code)}
                      >
                        {el.name}
                      </Box>
                    </Box>
                  </TableCell>

                  <TableCell>{formatPrice(el.rate)}</TableCell>

                  <TableCell
                    sx={{
                      color: directionsDay[el.code] > 0 ? 'green' : 'red',
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      {formattedPrice(directionsDay[el.code])}
                      {directionsDay[el.code] < 0 && (
                        <ArrowDropDownIcon
                          sx={{
                            color: 'red',
                          }}
                        />
                      )}

                      {directionsDay[el.code] > 0 && (
                        <ArrowDropUpIcon
                          sx={{
                            color: 'green',
                          }}
                        />
                      )}
                    </Box>
                  </TableCell>

                  <TableCell>{formatVolume(el.volume)}</TableCell>

                  <TableCell>{el.cap ? formatVolume(el.cap) : 'NA'}</TableCell>

                  <TableCell
                    sx={{
                      width: '200px',
                      height: '100px',
                    }}
                  >
                    <TableChart
                      coin={el.code}
                      directionsDay={directionsDay}
                      setDirectionsDay={setDirectionsDay}
                    />
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
          Server Error. Try later
        </Box>
      )}

      <TablePagination
        component='div'
        rowsPerPageOptions={[5, 10, 25, 50]}
        count={Math.ceil(coins.length / rowsPerPage)}
        page={page}
        onPageChange={(event, value) => setPage(value)}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={(event) =>
          setRowsPerPage(parseInt(event.target.value))
        }
        sx={{
          display: 'flex',
          alignContent: 'flex-start',
          color: 'blue',
          '& .MuiSvgIcon-root': {
            fill: 'yellow',
          },
        }}
      />
    </>
  );
};

export default BasicTable;
