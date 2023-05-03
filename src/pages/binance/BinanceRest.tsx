//wss://ws-api.binance.com:443/ws-api/v3

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useLazyFetchAggTradesQuery } from '../../store/features/binance/binanceApi';

const AppWs = () => {
  //   const [isPaused, setIsPaused] = useState(false);
  //   const [data, setData] = useState(null);
  //   const [status, setStatus] = useState('');
  const [fetchAggTrades, { data: aggTradeData }] = useLazyFetchAggTradesQuery();

  useEffect(() => {
    fetchAggTrades();
  }, []);

  useEffect(() => {
    console.log(aggTradeData);
  }, [aggTradeData]);

  return <>{<div>Binance Rest</div>}</>;
};

export default AppWs;
