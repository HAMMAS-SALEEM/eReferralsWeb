// store/thunks/deleteReferral.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import ReferralService from "../../services/ReferralService";

export const deleteReferral = createAsyncThunk(
  "referrals/deleteReferral",
  async (id) => {
    try {
      await ReferralService.deleteReferral(id);
      return id;
    } catch (error) {
      throw new Error(
        error.response?.data?.error || "Failed to delete Request."
      );
    }
  }
);
