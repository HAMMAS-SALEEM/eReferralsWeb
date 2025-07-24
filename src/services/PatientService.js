import axios from "../auth/axiosInstance";

const PatientService = {
  getPatients(params) {
    return axios.get("/v1/patients", { params });
  },

  createPatient(data) {
    return axios.post("/v1/patients", data);
  },

  getPatientById(id) {
    return axios.get(`/v1/patients/${id}`);
  },

  updatePatient(id, data) {
    return axios.put(`/v1/patients/${id}`, data);
  },

  partialUpdatePatient(id, data) {
    return axios.patch(`/v1/patients/${id}`, data);
  },

  deletePatient(id) {
    return axios.delete(`/v1/patients/${id}`);
  },
};

export default PatientService;
