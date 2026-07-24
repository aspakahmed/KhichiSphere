import api from "./api";

export const getJobs = async () => {
  const response = await api.get("/jobs");
  return response.data;
};

export const getJobById = async (jobId) => {
  const response = await api.get(`/jobs/${jobId}`);
  return response.data;
};

export const createJob = async (data) => {
  const response = await api.post("/jobs", data);
  return response.data;
};

export const deleteJob = async (jobId) => {
  const response = await api.delete(`/jobs/${jobId}`);
  return response.data;
};