//wss://ws-api.binance.com:443/ws-api/v3
//wss://ws-api.livecoinwatch.com/socket.io/?EIO=3&transport=websocket
//wss://stream.binance.com:9443/ws/ethusdt@trade

import React, { useState, useRef, useEffect, useCallback } from 'react';

const AppWs = () => {
  const [isPaused, setIsPaused] = useState(false);
  const [data, setData] = useState(null);
  const [status, setStatus] = useState('');
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!isPaused) {
      ws.current = new WebSocket(
        'wss://ws-api.livecoinwatch.com/socket.io/?EIO=3&transport=websocket'
      );
      ws.current.onopen = () => setStatus('Соединение открыто');
      ws.current.onclose = () => setStatus('Соединение закрыто');

      gettingData();
    }

    return () => {
      if (ws.current) ws.current.close();
    };
  }, [ws, isPaused]);

  const gettingData = useCallback(() => {
    if (!ws.current) return;

    ws.current.onmessage = (e) => {
      // console.log(JSON.parse(e.data));

      if (isPaused) return;

      // const message = JSON.parse(e.data);
      // setData(message);
      setData(e.data);
    };
  }, [isPaused]);

  const handleConnect = () => {
    if (ws.current) ws.current.close();

    setIsPaused(!isPaused);
  };

  return (
    <>
      {!!data && (
        <div>
          <div>
            <h2>{status}</h2>
            <p>{`event: ${data}`}</p>
          </div>
          <button onClick={handleConnect}>
            {!isPaused ? 'Остановить соединение' : 'Открыть соединение'}
          </button>
        </div>
      )}
    </>
  );
};

export default AppWs;
