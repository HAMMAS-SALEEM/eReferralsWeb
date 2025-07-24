// store/thunks/addReferrals.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import ReferralService from "../../services/ReferralService";

export const addReferrals = createAsyncThunk(
  "referrals/addReferrals",
  async (requestData) => {
    try {
      const response = await ReferralService.createReferral(requestData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || "Failed to add Request.");
    }
  }
);
