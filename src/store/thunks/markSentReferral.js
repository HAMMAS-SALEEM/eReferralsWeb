// store/thunks/markSentReferral.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import ReferralService from "../../services/ReferralService";

export const markSentReferral = createAsyncThunk(
  "referrals/markSentReferral",
  async ({ id, requestData }) => {
    try {
      const response = await ReferralService.markReferralSent(id, requestData);
      return response.data;
    } catch (error) {
      toast.error(
        error.message || "An error occurred while marking the Request as sent."
      );
      throw new Error(
        error.response?.data?.error || "Failed to mark Request as sent."
      );
    }
  }
);
