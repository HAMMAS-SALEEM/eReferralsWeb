// services/ServiceProviderService.js
import axios from "../auth/axiosInstance";

const ServiceProviderService = {
  getServiceProviders(params) {
    return axios.get("/v1/services", { params });
  },

  favouriteService(serviceId) {
    return axios.post(`/v1/services/${serviceId}/actions/favourite`);
  },

  unfavouriteService(serviceId) {
    return axios.post(`/v1/services/${serviceId}/actions/unfavourite`);
  },
};

export default ServiceProviderService;
