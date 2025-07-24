// store/thunks/markRecalledReferral.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import ReferralService from "../../services/ReferralService";

export const markRecalledReferral = createAsyncThunk(
  "referrals/markRecalledReferral",
  async ({ id, requestData }) => {
    try {
      const response = await ReferralService.markReferralRecalled(
        id,
        requestData
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.error || "Failed to mark Request as recalled."
      );
    }
  }
);
