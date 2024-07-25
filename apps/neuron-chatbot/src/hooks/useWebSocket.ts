import { useEffect, useRef, useState } from "react";

export default function useWebsocket(url: string) {
  const ws = useRef<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState<any | null>(null);

  useEffect(() => {
    const socket = new WebSocket(url);

    if (!socket) return;

    ws.current = socket;

    ws.current!.onopen = () => {
      console.log("Connected to WebSocket server");
      setIsConnected(true);
    };

    ws.current!.onerror = (err: any) => {
      console.error("WebSocket error:", err);
      setError(err);
    };

    ws.current.onmessage = (data) => {
      // console.log(data);
      onMessage(data.data);
    };

    ws.current!.onclose = () => {
      console.log("Disconnected from WebSocket server");
      setIsConnected(false);
    };
  }, [url]);

  const onMessage = (data: string) => {
    const parsedData = JSON.parse(data);
    setData(parsedData);
  };

  const sendMessage = (message: any) => {
    if (ws.current?.readyState !== WebSocket.OPEN) return;
    if (ws.current && ws.current?.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify(message));
    } else {
      console.error("WebSocket is not open");
    }
  };

  return { sendMessage, isConnected, error, data };
}
