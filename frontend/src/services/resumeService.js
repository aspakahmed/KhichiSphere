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
export const getResumeAnalysis = async () => {
  const response = await api.get("/resume/analysis");
  return response.data;
};

// TODO(backend): add resume history and deletion endpoints before exposing
// those actions. The current API supports only the user's current resume.
