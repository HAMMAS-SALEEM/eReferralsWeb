// store/thunks/updateProfile.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import ProfileService from "../../services/ProfileService";

const updateProfile = createAsyncThunk(
  "services/updateProfile",
  async ({ doctor, organisation }) => {
    try {
      const response = await ProfileService.updateProfile({
        doctor,
        organisation,
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        throw error.response.data; // Throw only the data part of the error
      } else {
        throw new Error("An unexpected error occurred.");
      }
    }
  }
);

export { updateProfile };
