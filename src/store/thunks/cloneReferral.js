// store/thunks/cloneReferral.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import ReferralService from "../../services/ReferralService";

export const cloneReferral = createAsyncThunk(
  "referrals/cloneReferral",
  async ({ id, requestData }) => {
    try {
      const response = await ReferralService.cloneReferral(id, requestData);
      return response.data;
    } catch (error) {
      toast.error(
        error.message || "An error occurred while cloning the Request."
      );
      throw new Error(
        error.response?.data?.error || "Failed to clone Request."
      );
    }
  }
);
