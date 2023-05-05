import React, { useState, useCallback, useEffect } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';

const Binance = () => {
  const [socketUrl, setSocketUrl] = useState(
    'wss://ws-api.livecoinwatch.com/socket.io/?EIO=3&transport=websocket'
  );

  // 'wss://stream.binance.com:9443/ws/btcusd@trade'
  // 'wss://ws-api.livecoinwatch.com/socket.io/?EIO=3&transport=websocket'
  const [messageHistory, setMessageHistory] = useState([]);

  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);

  useEffect(() => {
    if (lastMessage !== null) {
      console.log('lastMessage', lastMessage);
      setMessageHistory((prev) => prev.concat(lastMessage));
      console.log('messageHistory', messageHistory);
    }
  }, [lastMessage, setMessageHistory, messageHistory]);

  const handleClickChangeSocketUrl = useCallback(
    () => setSocketUrl('wss://demos.kaazing.com/echo'),
    []
  );

  const handleClickSendMessage = useCallback(() => sendMessage('Hello'), []);

  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];

  return (
    <div>
      <button onClick={handleClickChangeSocketUrl}>
        Click Me to change Socket Url
      </button>
      <button
        onClick={handleClickSendMessage}
        disabled={readyState !== ReadyState.OPEN}
      >
        Click Me to send 'Hello'
      </button>
      <span>The WebSocket is currently {connectionStatus}</span>
      {lastMessage ? <span>Last message: {lastMessage.data}</span> : null}
      <ul>
        {messageHistory.map((message, idx) => (
          <span key={idx}>{message ? message.data : null}</span>
        ))}
      </ul>
    </div>
  );
};

export default Binance;
