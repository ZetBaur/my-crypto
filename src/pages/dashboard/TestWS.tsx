import { useCallback, useEffect, useMemo, useRef } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';

export default function App() {
  const socketUrl = 'wss://stream.binance.com:9443/ws/etheeur@trade';

  const { sendJsonMessage, lastJsonMessage, readyState } =
    useWebSocket(socketUrl);

  const messageHistory = useRef<MessageEvent[]>([]);

  messageHistory.current = useMemo(
    () => messageHistory.current.concat(lastJsonMessage ?? []),
    [lastJsonMessage]
  );

  useEffect(() => {
    console.log(lastJsonMessage);
  }, [lastJsonMessage]);

  const handleClickSendMessage = useCallback(
    () =>
      sendJsonMessage({
        method: 'SUBSCRIBE',
        params: ['dogeaud@ticker'],
        id: 1,
      }),
    [sendJsonMessage]
  );

  const handleClickUnSendMessage = useCallback(
    () =>
      sendJsonMessage({
        method: 'UNSUBSCRIBE',
        params: ['dogeaud@ticker'],
        id: 1,
      }),
    [sendJsonMessage]
  );

  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];

  return (
    <div className='App'>
      <button
        onClick={handleClickSendMessage}
        disabled={readyState !== ReadyState.OPEN}
      >
        Subscribe
      </button>
      <button
        onClick={handleClickUnSendMessage}
        disabled={readyState !== ReadyState.OPEN}
      >
        Unsubscribe
      </button>
      <span>The WebSocket is currently {connectionStatus}</span>
      {lastJsonMessage ? (
        <span>
          Last message: {JSON.stringify(lastJsonMessage.data, null, 4)}
        </span>
      ) : null}
      <ul>
        {messageHistory.current.map((message, idx) => (
          <span key={idx}>{JSON.stringify(message.data, null, 4)}</span>
        ))}
      </ul>
    </div>
  );
}
