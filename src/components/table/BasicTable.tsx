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

import {
  useLazyFetchCoinsListQuery,
  useFetchPlatformsAllQuery,
  useFetchCoinsSingleHistoryQuery,
} from '../../store/features/coinsFeature/coinsApi';

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
} from '../../store/features/coinsFeature/coinsSlice';
import { setId } from '../../store/features/coins/marketChartSlice';
import { ICoinData } from '../../model/coinsTypes';

// const start = new Date(
//   moment().subtract(el.value, 'days').format()
// ).getTime();

const headCells = [
  { text: 'Portfolio', type: '' },
  { text: 'Coin', type: 'name' },
  { text: 'Price', type: 'price' },
  { text: '1h', type: 'delta.hour' },
  { text: '24h', type: 'delta.day' },
  { text: 'Volume', type: 'volume' },
  { text: 'Mkt Cap', type: 'cap' },
  { text: 'Last 7 days', type: '' },
];

const BasicTable = () => {
  const dispatch = useAppDispatch();
  const portfolio = useAppSelector((state) => state.coins.portfolio);
  const currency = useAppSelector((state) => state.coins.currency);

  const [
    fetchCoinsList,
    {
      isError: isCoinsListError,
      isFetching: isCoinsListFetching,
      isSuccess: isCoinsListSuccess,
      data: coinsListData,
    },
  ] = useLazyFetchCoinsListQuery();

  //  const {data:singleHistoryData}= useFetchCoinsSingleHistoryQuery({
  // {
  //     code,
  //     currency,
  //     start,
  //     end,
  //     meta: true,
  //   };
  //  })

  const { data: platformsAllData } = useFetchPlatformsAllQuery();

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [totalCoins, setTotalCoins] = useState(100);

  const [order, setOrder] = useState('descending');
  const [sort, setSort] = useState('price');

  useEffect(() => {
    if (platformsAllData) setTotalCoins(platformsAllData?.length);
  }, [platformsAllData, rowsPerPage]);

  useEffect(() => {
    const body = {
      currency,
      sort,
      order,
      offset: page * rowsPerPage,
      limit: rowsPerPage,
      meta: true,
    };
    fetchCoinsList(body);
  }, [sort, order, page, rowsPerPage]);

  // useEffect(() => {
  //   console.log('coinsListData', coinsListData);
  // }, [coinsListData]);

  // const handleChangePage = (
  //   event: React.MouseEvent<HTMLButtonElement> | null,
  //   value: number
  // ) => {
  //   setPage(value);
  // };

  // const handleChangeRowsPerPage = (
  //   event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  // ) => {
  //   setRowsPerPage(parseInt(event.target.value));
  // };

  const handleIconClick = (el: ICoinsList) => {
    // const coinToAdd: ICoinData = {
    //   name: el.name,
    // };

    console.log(el);

    const isInPortfolio = useCheckPortfolio(el.code, portfolio);

    console.log(isInPortfolio);

    !isInPortfolio
      ? dispatch(addToPortfolio(el.code))
      : dispatch(removeFromPortfolio(el.code));
  };

  const iconColor = (el: ICoinsList) => {
    const isInPortfolio = useCheckPortfolio(el.code, portfolio);
    return isInPortfolio ? 'blue' : 'black';
  };

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

      return price.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: isZero ? 5 : 2,
      });
    } else {
      return 'NA';
    }
  };

  const formatPriceChangePercent = (change: number, price: number) => {
    let rate = formatValue(price);

    if (rate) {
      let percenChange = (change * 100) / rate;

      let isZero = percenChange < 1;

      return isZero
        ? percenChange.toFixed(4) + '%'
        : percenChange.toFixed(0) + '%';
    } else {
      return 'NA';
    }
  };

  const formatVolume = (value: number) => {
    if (!value) return 'NA';

    return value?.toLocaleString('fi-FI', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    });
  };

  const valueColor = (value: number) => {
    if (Math.sign(value) === -1) return 'red';
    if (Math.sign(value) === 1) return 'green';
  };

  const handleSort = (el: { text: string; type: string }) => {
    if (el.type) {
      setOrder(order === 'descending' ? 'ascending' : 'descending');
      setSort(el.type);
    }
  };

  const sortedColumns = (el: { text: string; type: string }) => {
    if (!el.type) return true;
  };

  //---------------------------------------
  // up 04a7b9 efced0 0569db c59651 748c94 ebe318 ecb434
  // down  fb4c61 6fb7e4 1c1464 fa9e32 2c7cf4 040404

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
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component='th' scope='row'>
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
                          onClick={() => dispatch(setId(el.name))}
                        >
                          {el.name}
                        </Box>
                      </Box>
                    </TableCell>

                    <TableCell>{formatPrice(el.rate)}</TableCell>

                    <TableCell
                      sx={{
                        // color: () => valueColor(el.delta.hour),
                        color: el.color,
                      }}
                    >
                      {formatPriceChangePercent(el.delta.hour, el.rate)}
                    </TableCell>

                    <TableCell
                      sx={{
                        // color: () => valueColor(el.delta.day),
                        color: el.color,
                      }}
                    >
                      {formatPriceChangePercent(el.delta.day, el.rate)}
                    </TableCell>

                    <TableCell>{formatVolume(el.volume)}</TableCell>

                    <TableCell>
                      {el.cap ? formatVolume(el.cap) : 'NA'}
                    </TableCell>

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

export default BasicTable;
