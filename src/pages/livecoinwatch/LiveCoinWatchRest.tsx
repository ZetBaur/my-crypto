// import React, { useEffect } from 'react';
// import { useFetchOverviewHistoryQuery } from '../../store/features/livecoinwatch/liveCoinWatchApi';
// import moment from 'moment';

// const LiveCoinWatchRest = () => {
//   const { data } = useFetchOverviewHistoryQuery({
//     currency: 'USD',
//     code: 'BTC',
//     start: new Date(moment().subtract(7, 'days').calendar()).getTime(),
//     end: Date.now(),
//     meta: true,
//   });

//   useEffect(() => {
//     console.log('data', data);
//   }, [data]);

//   return <div>LiveCoinWatchRest</div>;
// };

// export default LiveCoinWatchRest;
