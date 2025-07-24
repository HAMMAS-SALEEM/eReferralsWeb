import axios from "../auth/axiosInstance";

const ReferralService = {
  getReferrals(params) {
    let url = "/v1/referrals";

    // Build the query parameters
    const queryParams = new URLSearchParams(params).toString();

    // Add the query parameters to the URL
    if (queryParams) {
      url += `?${queryParams}`;
    }

    return axios.get(url);
  },

  getReferralById(id) {
    return axios.get(`/v1/referrals/${id}`);
  },

  createReferral(data) {
    return axios.post("/v1/referrals", data);
  },

  updateReferral(id, data) {
    return axios.put(`/v1/referrals/${id}`, data);
  },

  partialUpdateReferral(id, data) {
    return axios.patch(`/v1/referrals/${id}`, data);
  },

  deleteReferral(id) {
    return axios.delete(`/v1/referrals/${id}`);
  },

  sendReferral(id, data) {
    return axios.post(`/v1/referrals/${id}/actions/send`, data);
  },

  markReferralCompleted(id, data) {
    return axios.post(`/v1/referrals/${id}/actions/mark-completed`, data);
  },

  downloadReferralPdf(id) {
    return axios.get(`/v1/referrals/${id}/files/pdf`, {
      responseType: "blob", // Important for binary data
    });
  },

  downloadReferralReportPdf(id) {
    return axios.get(`/v1/referrals/${id}/files/report-pdf`, {
      responseType: "blob", // Important for binary data
    });
  },

  cloneReferral(id) {
    return axios.post(`/v1/referrals/${id}/actions/clone`);
  },

  archiveReferral(id) {
    return axios.post(`/v1/referrals/${id}/actions/archive`);
  },

  unarchiveReferral(id) {
    return axios.post(`/v1/referrals/${id}/actions/unarchive`);
  },

  markReferralAsSent: (id) =>
    axios.post(`/v1/referrals/${id}/actions/mark-sent`),

  getReferralHistoryById: (id) => axios.get(`/v1/referrals/${id}/history`),
};

export default ReferralService;
