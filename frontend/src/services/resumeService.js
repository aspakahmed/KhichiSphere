import api from "./api";

/**
 * Upload Resume
 * Backend Endpoint:
 * POST /resume/upload
 */
export const uploadResume = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await api.post("/resume/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

/**
 * Get Resume Analysis
 * Backend Endpoint:
 * GET /resume/analysis/{resumeId}
 */
export const getResumeAnalysis = async (resumeId) => {
  const response = await api.get(`/resume/analysis/${resumeId}`);
  return response.data;
};

/**
 * Get Resume List (Future Ready)
 */
export const getResumeHistory = async () => {
  const response = await api.get("/resume");
  return response.data;
};

/**
 * Delete Resume (Future Ready)
 */
export const deleteResume = async (resumeId) => {
  const response = await api.delete(`/resume/${resumeId}`);
  return response.data;
};