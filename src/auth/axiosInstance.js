import axios from "axios";
import AuthService from "../services/AuthService";

const service = axios.create({
  baseURL: "https://dev.erequests.com.au/api",
  timeout: 60000,
});

let isRefreshing = false;
let requestQueue = [];

const processQueue = (error, token = null) => {
  requestQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  requestQueue = [];
};

const isTokenExpired = (token) => {
  if (!token) return true;
  try {
    const decodedToken = JSON.parse(atob(token.split(".")[1]));
    const expiryTime = decodedToken.exp * 1000;
    return new Date().getTime() > expiryTime;
  } catch (e) {
    return true;
  }
};

service.interceptors.request.use(
  async (config) => {
    let token = localStorage.getItem("access_token");

    if (
      token &&
      isTokenExpired(token) &&
      !config.url.includes("/refresh") &&
      !config.url.includes("/obtain")
    ) {
      if (!isRefreshing) {
        isRefreshing = true;
        try {
          const refreshToken = localStorage.getItem("refresh_token");
          if (!refreshToken) throw new Error("No refresh token available");

          if (isTokenExpired(refreshToken)) {
            throw new Error("Refresh token is invalid or expired");
          }

          const response = await AuthService.refreshToken(refreshToken);
          const { access, refresh } = response.data;

          token = access;
          localStorage.setItem("access_token", access);
          localStorage.setItem("refresh_token", refresh);

          processQueue(null, access);
        } catch (err) {
          processQueue(err, null);
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          window.location.href = "/login"; // Redirect to login page
          return Promise.reject(err);
        } finally {
          isRefreshing = false;
        }
      } else {
        return new Promise((resolve, reject) => {
          requestQueue.push({ resolve, reject });
        })
          .then((token) => {
            config.headers["Authorization"] = `Bearer ${token}`;
            return config;
          })
          .catch((err) => Promise.reject(err));
      }
    }

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response.status === 401 &&
      originalRequest.url.includes("/obtain")
    ) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      return Promise.reject(error);
    }

    if (
      (error.response.status === 401 || error.response.status === 403) &&
      !originalRequest._retry
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          requestQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers["Authorization"] = `Bearer ${token}`;
            return service(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      return new Promise((resolve, reject) => {
        const refreshToken = localStorage.getItem("refresh_token");
        if (!refreshToken) {
          isRefreshing = false;
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          processQueue(new Error("No refresh token available"), null);
          window.location.href = "/login"; // Redirect to login page
          return reject(new Error("No refresh token available"));
        }

        AuthService.refreshToken(refreshToken)
          .then((response) => {
            const { access, refresh } = response.data;
            localStorage.setItem("access_token", access);
            localStorage.setItem("refresh_token", refresh);

            service.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${access}`;
            originalRequest.headers["Authorization"] = `Bearer ${access}`;
            processQueue(null, access);
            resolve(service(originalRequest));
          })
          .catch((err) => {
            processQueue(err, null);
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            window.location.href = "/login"; // Redirect to login page
            reject(err);
          })
          .finally(() => {
            isRefreshing = false;
          });
      });
    }

    return Promise.reject(error);
  }
);

export default service;
