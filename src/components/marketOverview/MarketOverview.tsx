import React, { useEffect } from 'react';
import { useLazyFetchOverviewHistoryQuery } from '../../store/features/coinsFeature/coinsApi';
import { useAppDispatch, useAppSelector } from '../../helpers/reduxHook';
import { getDate } from '../../helpers/getDate';
import moment from 'moment';

const MarketOverview = () => {
  const currency = useAppSelector((state) => state.coins.currency);

  const [fetchOverviewHistory, { data }] = useLazyFetchOverviewHistoryQuery();

  const body = {
    currency,
    start: getDate(30, 'days'),
    end: Date.parse(moment().format('LL')),
  };

  useEffect(() => {
    if (data) console.log(data);
  }, [data]);
  return <div>MarketOverview</div>;
};

export default MarketOverview;
