// store/thunks/markBookedReferral.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import ReferralService from "../../services/ReferralService";

export const markBookedReferral = createAsyncThunk(
  "referrals/markBookedReferral",
  async ({ id, requestData }) => {
    try {
      const response = await ReferralService.markReferralBooked(
        id,
        requestData
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.error || "Failed to mark Request as booked."
      );
    }
  }
);
