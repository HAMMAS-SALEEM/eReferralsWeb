// store/thunks/addPatient.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import PatientService from "../../services/PatientService";

const addPatient = createAsyncThunk(
  "patient/add",
  async (newPatientData, { rejectWithValue }) => {
    try {
      const response = await PatientService.createPatient(newPatientData);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue({ message: "Failed to add patient" });
    }
  }
);

export { addPatient };
