// store/thunks/editPatient.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import PatientService from "../../services/PatientService";

const editPatient = createAsyncThunk(
  "patient/edit",
  async ({ patientId, updatedPatientData }, { rejectWithValue }) => {
    try {
      const response = await PatientService.updatePatient(
        patientId,
        updatedPatientData
      );
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue({ message: "Failed to update patient" });
    }
  }
);

export { editPatient };
