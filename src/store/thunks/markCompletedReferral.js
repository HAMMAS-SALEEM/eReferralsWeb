// store/thunks/markCompletedReferral.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import ReferralService from "../../services/ReferralService";

export const markCompletedReferral = createAsyncThunk(
  "referrals/markCompletedReferral",
  async ({ id, requestData }) => {
    try {
      const response = await ReferralService.markReferralCompleted(
        id,
        requestData
      );
      return response.data;
    } catch (error) {
      toast.error(
        error.message ||
          "An error occurred while marking the Request as completed."
      );
      throw new Error(
        error.response?.data?.error ||
          "Failed to mark refeRequestrral as completed."
      );
    }
  }
);
