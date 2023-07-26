export const storeWebSocket = (socket) => {
    return {
      type: 'STORE_WEBSOCKET',
      payload: socket,
    };
  };