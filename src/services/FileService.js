import axios from "../auth/axiosInstance";

const FileService = {
  uploadFile(file) {
    const formData = new FormData();
    formData.append("file", file);

    return axios.post("/v1/files", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  deleteFile(fileId) {
    return axios.delete(`/v1/files/${fileId}`);
  },

  downloadReportPdf(referralId) {
    return axios.get(`/v1/referrals/${referralId}/files/report-pdf`, {
      responseType: "blob",
    });
  },

  getFileById(fileId) {
    return axios.get(`/v1/files/${fileId}`, {
      responseType: 'blob',
    });
  },
};

export default FileService;
