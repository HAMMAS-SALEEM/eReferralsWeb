import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {};

// Slice
const patientSlice1 = createSlice({
  name: "patient",
  initialState,
  reducers: {
    setPatient: (_, action) => {
      return action.payload;
    },
    clearPatient: () => {
      return {};
    },
    updatePatient: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setPatient, updatePatient, clearPatient } =
  patientSlice1.actions;
export default patientSlice1.reducer;
