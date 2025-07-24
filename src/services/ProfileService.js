// services/ProfileService.js
import axios from "../auth/axiosInstance";

const ProfileService = {};

// Get Profile
ProfileService.getProfile = function () {
  return axios.get("/v1/account/profile");
};

// Update Profile (PUT)
ProfileService.updateProfile = function (data) {
  return axios.put("/v1/account/profile", data);
};

// Partial Update Profile (PATCH)
ProfileService.patchProfile = function (data) {
  return axios.patch("/v1/account/profile", data);
};

export default ProfileService;
