// store/thunks/editReferral.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import ReferralService from "../../services/ReferralService";

const editReferral = createAsyncThunk(
  "referrals/edit",
  async ({ referralId, updatedReferralData }) => {
    try {
      const response = await ReferralService.patchReferral(
        referralId,
        updatedReferralData
      );
      return response.data;
    } catch (error) {
      throw new Error("Failed to update Request");
    }
  }
);

export { editReferral };
