import React, { useEffect } from 'react';

const BinanceTest = () => {
  useEffect(() => {
    var binanceSocket = new WebSocket('wss://ws-api.binance.com:443/ws-api/v3');

    console.log(binanceSocket);
  }, []);
  return <div>BinanceTest</div>;
};

export default BinanceTest;
