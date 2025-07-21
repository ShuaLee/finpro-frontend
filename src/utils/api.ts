import axios from "axios";
import { logoutHandler } from "./logoutHandler";

const api = axios.create({
  baseURL: "http://localhost:8000/api/v1",
  withCredentials: true,
  xsrfCookieName: "csrftoken",
  xsrfHeaderName: "X-CSRFToken",
});

// ✅ Attach CSRF token for unsafe methods
api.interceptors.request.use((config) => {
  if (["post", "put", "patch", "delete"].includes(config.method || "")) {
    const csrfToken = getCookie("csrftoken");
    if (csrfToken) {
      config.headers["X-CSRFToken"] = csrfToken;
    }
  }
  return config;
});

// ✅ Handle 401 with refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // ✅ Prevent loop for logout
    if (originalRequest.url?.includes("/auth/logout/")) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await axios.post(
          "http://localhost:8000/api/v1/auth/refresh/",
          {},
          { withCredentials: true }
        );
        return api(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        logoutHandler(); // ✅ Trigger logout
      }
    }

    return Promise.reject(error);
  }
);

function getCookie(name: string): string | null {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()!.split(";").shift()!;
  return null;
}

export default api;
