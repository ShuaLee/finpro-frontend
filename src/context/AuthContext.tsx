import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import api from "../utils/api";

type SignupData = {
  email: string;
  password: string;
  isOver13: boolean;
};

type AuthContextType = {
  isAuthenticated: boolean;
  authChecked: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (data: SignupData) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  const ensureCSRFToken = async () => {
    try {
      await api.get("/auth/csrf/");
    } catch (err) {
      console.error("Failed to fetch CSRF token:", err);
    }
  };

  const checkAuth = async () => {
    try {
      const res = await api.get("/auth/status/");
      setIsAuthenticated(res.data.isAuthenticated);
    } catch (err: any) {
      if (err.response?.status === 401) {
        try {
          await ensureCSRFToken();
          await api.post("/auth/refresh/");
          const res = await api.get("/auth/status/");
          setIsAuthenticated(res.data.isAuthenticated);
        } catch (refreshError) {
          console.warn("Refresh failed during auth check", refreshError);
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }
    } finally {
      setAuthChecked(true);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return;
    const interval = setInterval(refreshTokens, 4 * 60 * 1000);
    return () => clearInterval(interval);
  }, [isAuthenticated]);

  const refreshTokens = async () => {
    try {
      await ensureCSRFToken();
      await api.post("/auth/refresh/");
      console.log("Tokens refreshed");
    } catch (error) {
      console.warn("Token refresh failed", error);
      setIsAuthenticated(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      await ensureCSRFToken();
      await api.post("/auth/login/", { email, password });
      setIsAuthenticated(true);
    } catch (err: any) {
      console.error("Login failed:", err.response?.data || err.message);
      throw new Error(err.response?.data?.detail || "Login failed");
    }
  };

  const signup = async (data: SignupData) => {
    try {
      await ensureCSRFToken();
      await api.post("/auth/signup/", {
        email: data.email,
        password: data.password,
        is_over_13: data.isOver13,
      });
      setIsAuthenticated(true);
    } catch (err: any) {
      console.error("Signup failed:", err.response?.data || err.message);
      throw new Error(err.response?.data?.detail || "Signup failed");
    }
  };

  const logout = async () => {
    try {
      await ensureCSRFToken();
      await api.post("/auth/logout/");
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      // ✅ Ensure state clears even if API fails
      setIsAuthenticated(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, authChecked, login, signup, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
