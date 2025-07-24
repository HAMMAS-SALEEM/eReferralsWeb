// services/AuthService.js
import axios from "../auth/axiosInstance";

const AuthService = {
  login(data) {
    return axios.post("/auth/token/obtain", data);
  },

  getProfile() {
    return axios.get("/v1/account/profile");
  },

  refreshToken(refreshToken) {
    return axios.post("/auth/token/refresh", { refresh: refreshToken });
  },

  logout(refreshToken) {
    return axios.post("/auth/token/blacklist", { refresh: refreshToken });
  },
};

export default AuthService;
