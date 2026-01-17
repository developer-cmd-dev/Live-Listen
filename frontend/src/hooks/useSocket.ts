import { useEffect, useRef, useState } from "react"

import { w3cwebsocket } from "websocket";

export const useSocket = (webSocketUrl: string) => {
  const socketRef = useRef<w3cwebsocket|null>(null);
  const [connected,setConnected]=useState(false);

  useEffect(()=>{
    const socket = new w3cwebsocket(webSocketUrl);
    socketRef.current=socket;
    socket.onopen = () => {
      console.log('ws open')
      setConnected(true);
    };

    socket.onclose = () => {
      console.log("WS CLOSED");
      setConnected(false);
    };

    socket.onerror = (e) => {
      console.error("WS ERROR", e);
    };

    return()=>socket.close()

  },[webSocketUrl])

  return {socket:socketRef.current,connected};
};

