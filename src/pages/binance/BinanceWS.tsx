//wss://ws-api.binance.com:443/ws-api/v3

import React, { useState, useRef, useEffect, useCallback } from 'react';

interface ICoinusdt {
  E: number;
  M: boolean;
  T: number;
  a: number;
  b: number;
  e: string;
  m: boolean;
  p: string;
  q: string;
  s: string;
  t: number;
}

const initialState = {
  E: null,
  M: null,
  T: null,
  a: null,
  b: null,
  e: null,
  m: null,
  p: null,
  q: null,
  s: null,
  t: null,
};

const AppWs = () => {
  const [isPaused, setIsPaused] = useState(false);
  const [data, setData] = useState(null);
  const [status, setStatus] = useState('');
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!isPaused) {
      ws.current = new WebSocket(
        'wss://stream.binance.com:9443/ws/btcusdt@trade'
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
      console.log(JSON.parse(e.data));

      if (isPaused) return;

      const message = JSON.parse(e.data);
      setData(message);
    };
  }, [isPaused]);

  const handleConnect = () => {
    if (ws.current) {
      ws.current.close();
    }
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
