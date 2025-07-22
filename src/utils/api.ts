import axios from "axios";

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

// ✅ Response Interceptor for Auth
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (!error.response) return Promise.reject(error);

    if (originalRequest.url?.includes("/auth/logout/")) {
      return Promise.reject(error); // don't retry logout
    }

    // ✅ If /auth/status/ returns 401, just resolve silently
    if (
      originalRequest.url?.includes("/auth/status/") &&
      error.response.status === 401
    ) {
      return Promise.reject(error); // no refresh attempt
    }

    // ✅ Handle refresh only for requests that need auth
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await axios.post(
          "http://localhost:8000/api/v1/auth/refresh/",
          {},
          { withCredentials: true }
        );
        return api(originalRequest);
      } catch {
        // ✅ Silent fail, just trigger logout state (no console.error spam)
        return Promise.reject(error);
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
