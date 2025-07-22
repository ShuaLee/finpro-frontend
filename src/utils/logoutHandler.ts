import api from "./api";

export const logout = async () => {
  try {
    await api.post("/auth/logout/");
  } catch (error: any) {
    if (error.response?.status === 401) {
      // Silent, user already logged out
      return;
    }
  }
};
