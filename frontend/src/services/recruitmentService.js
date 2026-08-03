import api from "./api";

export const getCompanies = async () => {
  const response = await api.get("/recruitment/companies");
  return Array.isArray(response.data) ? response.data : [];
};

export const getCandidates = async () => {
  const response = await api.get("/recruitment/candidates");
  return Array.isArray(response.data) ? response.data : [];
};
