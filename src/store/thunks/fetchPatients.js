// store/thunks/fetchPatients.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import PatientService from "../../services/PatientService";

const fetchPatients = createAsyncThunk("patient/fetch", async (searchTerm) => {
  try {
    const response = await PatientService.getPatients({ search: searchTerm });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch patients."
    );
  }
});

export { fetchPatients };
