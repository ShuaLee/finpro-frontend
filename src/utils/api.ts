import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api/v1",
  withCredentials: true,
  xsrfCookieName: "csrftoken", // Django default
  xsrfHeaderName: "X-CSRFToken",
});

// Attach CSRF token manually for POST, PUT, PATCH, DELETE
api.interceptors.request.use((config) => {
  if (["post", "put", "patch", "delete"].includes(config.method || "")) {
    const csrfToken = getCookie("csrftoken");
    if (csrfToken) {
      config.headers["X-CSRFToken"] = csrfToken;
    }
  }
  return config;
});

function getCookie(name: string): string | null {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()!.split(";").shift()!;
  return null;
}

export default api;
