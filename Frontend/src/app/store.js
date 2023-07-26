import { configureStore } from '@reduxjs/toolkit';
import patientReducer from '../features/patientReducer';
import websocketReducers from '../features/reducers/websocketReducers';
import thunk from 'redux-thunk';

const store = configureStore({
  reducer: {
    patient: patientReducer,
    webSocket : websocketReducers,
  },
  middleware: [thunk],
});

export default store;