import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  patientDetails: null,
};

const patientSlice = createSlice({
  name: 'patient',
  initialState,
  reducers: {
    setPatientDetails: (state, action) => {
      state.patientDetails = action.payload;
    },
  },
});

export const { setPatientDetails } = patientSlice.actions;
export default patientSlice.reducer;
