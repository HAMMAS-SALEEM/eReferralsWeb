import { createAsyncThunk } from "@reduxjs/toolkit";
import ProfileService from "../../services/ProfileService";

const fetchProfile = createAsyncThunk(
  "auth/fetchProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await ProfileService.getProfile();
      console.log("Profile fetched successfully:", response.data);
      return { data: response.data, status: response.status };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export { fetchProfile };
