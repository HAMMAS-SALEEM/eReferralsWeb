// store/thunks/fetchReferrals.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import ReferralService from "../../services/ReferralService";

const fetchReferrals = createAsyncThunk(
  "referrals/fetch",
  async ({
    limit,
    offset,
    search,
    includeArchived,
    ordering,
    referralType,
    statusParam,
    formattedDOB,
    referralsClinic,
  } = {}) => {
    const params = new URLSearchParams();

    if (includeArchived) params.append("include_archived", "true");
    if (limit) params.append("limit", limit);
    if (offset) params.append("offset", offset);
    if (search) params.append("search", search);
    if (ordering) params.append("ordering", ordering);
    if (referralsClinic === "onlyMine") params.append("from_me", true);

    if (referralType) {
      if (referralType.includes("RADIOLOGY"))
        params.append("type", "RADIOLOGY");
      if (referralType.includes("PATHOLOGY"))
        params.append("type", "PATHOLOGY");
    }

    if (statusParam) {
      const statuses = statusParam.split(",");
      statuses.forEach((status) => params.append("status", status));
    }

    if (formattedDOB && formattedDOB !== "NaN-NaN-NaN") {
      params.append("patient__birth_date", formattedDOB);
    }

    const queryString = params.toString();
    const response = await ReferralService.getReferrals(
      queryString ? { params: queryString } : undefined
    );
    return response.data;
  }
);

export default fetchReferrals;
