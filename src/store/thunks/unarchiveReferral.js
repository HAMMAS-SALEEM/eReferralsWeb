// store/thunks/unarchiveReferral.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import ReferralService from "../../services/ReferralService";

export const unarchiveReferral = createAsyncThunk(
  "referrals/unarchiveReferral",
  async ({ id, requestData }) => {
    try {
      const response = await ReferralService.unarchiveReferral(id, requestData);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.error || "Failed to unarchive Request."
      );
    }
  }
);
