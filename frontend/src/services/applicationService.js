import api from "./api";

export const applyToJob = async (jobId) => {
  const response = await api.post(`/applications/apply/${jobId}`);
  return response.data;
};

export const getMyApplications = async () => {
  const response = await api.get("/applications/my");
  return response.data;
};

export const getApplications = async () => {
  const response = await api.get("/applications");
  return response.data;
};

export const updateApplicationStatus = async (
  applicationId,
  status
) => {
  const response = await api.patch(
    `/applications/${applicationId}/status`,
    { status }
  );

  return response.data;
};