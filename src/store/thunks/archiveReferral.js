// store/thunks/archiveReferral.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import ReferralService from "../../services/ReferralService";

export const archiveReferral = createAsyncThunk(
  "referrals/archiveReferral",
  async ({ id, requestData }) => {
    try {
      const response = await ReferralService.archiveReferral(id, requestData);
      return response.data;
    } catch (error) {
      toast.error(
        error.message || "An error occurred while archiving the Request."
      );
      throw new Error(
        error.response?.data?.error || "Failed to archive Request."
      );
    }
  }
);
