import { createSlice } from '@reduxjs/toolkit';

const websocketSlice = createSlice({
  name: 'websocket',
  initialState: {
    socket: null,
  },
  reducers: {
    storeSocket: (state, action) => {
      state.socket = action.payload;
    },
  },
});

export const { storeSocket } = websocketSlice.actions;
export default websocketSlice.reducer;