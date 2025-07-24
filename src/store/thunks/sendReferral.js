// store/thunks/sendReferral.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import ReferralService from "../../services/ReferralService";

export const sendReferral = createAsyncThunk(
  "referrals/sendReferral",
  async ({ id, requestData }) => {
    try {
      const response = await ReferralService.sendReferral(id, requestData);
      return response.data;
    } catch (error) {
      toast.error(
        error.message || "An error occurred while sending the Request."
      );
      throw new Error(
        error.response?.data?.error || "Failed to send Request."
      );
    }
  }
);
