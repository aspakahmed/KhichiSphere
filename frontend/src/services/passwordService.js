import api from "./api";

// TODO(backend): implement these auth endpoints. Centralizing them keeps the
// recovery UI ready for the API without altering its routing or components.
export const requestPasswordReset = async (email) => (await api.post("/auth/forgot-password", { email })).data;
export const resetPassword = async ({ token, password }) => (await api.post("/auth/reset-password", { token, password })).data;
