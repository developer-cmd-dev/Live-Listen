import { useState } from "react"

import { w3cwebsocket } from "websocket";

export const useSocket = (webSocketUrl: string) => {
  const [socket] = useState(() => new w3cwebsocket(webSocketUrl));
  return socket;
};

