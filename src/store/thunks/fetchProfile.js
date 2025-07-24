import { createAsyncThunk } from "@reduxjs/toolkit";
import ProfileService from "../../services/ProfileService";

const fetchProfile = createAsyncThunk(
  "auth/fetchProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await ProfileService.getProfile();
      return { data: response.data, status: response.status };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export { fetchProfile };
