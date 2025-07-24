import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const changePassword = createAsyncThunk(
  "changePassword/changePassword",
  async (
    { currentPassword, newPassword, repeatNewPassword },
    { rejectWithValue }
  ) => {
    try {
      const accessToken = localStorage.getItem("access_token");

      if (!accessToken) {
        throw new Error("Access token is not available.");
      }

      const trimmedAccessToken = accessToken.trim();

      // Ensure no trailing slash in the base URL
      const baseURL = process.env.VIRTUAL_HOST?.replace(/\/$/, "");
      const endpoint = "/api/v1/account/change-password";

      const url = `${baseURL}${endpoint}`; // Correctly concatenate base URL and endpoint

      const config = {
        headers: {
          Authorization: `Bearer ${trimmedAccessToken}`,
          "Content-Type": "application/json",
        },
      };

      const body = {
        current_password: currentPassword,
        new_password: newPassword,
        repeat_new_password: repeatNewPassword,
      };

      const response = await axios.put(url, body, config);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.new_password || "Failed to change password"
      );
    }
  }
);
