import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { getCSRFToken } from "../utils/csrf";

type SignupData = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  birthDate: string;
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
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authChecked, setAuthChecked] = useState<boolean>(false);

  // 🔐 Check initial auth on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth/status/", {
          method: "GET",
          credentials: "include", // this sends cookies
        });

        if (!res.ok) throw new Error("Not authenticated");

        const json = await res.json();
        console.log("AuthContext → Auth status response:", json);
        setIsAuthenticated(json.isAuthenticated); // assuming it's always true for valid cookie
      } catch (err) {
        console.error("AuthContext → Error checking auth:", err);
        setIsAuthenticated(false);
      } finally {
        setAuthChecked(true);
      }
    };

    checkAuth();
  }, []);

  // 🔁 Refresh token every 4 minutes
  useEffect(() => {
    if (!isAuthenticated) return;

    const interval = setInterval(async () => {
      try {
        const res = await fetch("/api/auth/refresh/", {
          method: "POST",
          credentials: "include",
          headers: {
            "X-CSRFToken": getCSRFToken() ?? "",
          },
        });

        if (!res.ok) {
          console.warn("AuthContext → Token refresh failed");
          setIsAuthenticated(false);
        } else {
          console.log("AuthContext → Token successfully refreshed");
        }
      } catch (err) {
        console.error("AuthContext → Error refreshing token:", err);
        setIsAuthenticated(false);
      }
    }, 4 * 60 * 1000);

    return () => clearInterval(interval);
  }, [isAuthenticated]);

  // 🔐 Login
  const login = async (email: string, password: string) => {
    const res = await fetch("/api/auth/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": getCSRFToken() ?? "",
      },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) throw new Error("Login failed");

    setIsAuthenticated(true);
  };

  // 📝 Signup
  const signup = async (data: SignupData) => {
    const res = await fetch("/api/auth/signup-complete/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept-Language": navigator.language || "en",
        "X-CSRFToken": getCSRFToken() ?? "",
      },
      credentials: "include",
      body: JSON.stringify({
        email: data.email,
        password: data.password,
        first_name: data.firstName,
        last_name: data.lastName,
        birth_date: data.birthDate,
      }),
    });

    if (!res.ok) throw new Error("Signup failed");

    setIsAuthenticated(true);
  };

  // 🚪 Logout
  const logout = async () => {
    await fetch("/api/auth/logout/", {
      method: "POST",
      headers: {
        "X-CSRFToken": getCSRFToken() ?? "",
      },
      credentials: "include",
    });

    setIsAuthenticated(false);
    window.location.href = "/"; // force reload to landing page
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        authChecked,
        login,
        signup,
        logout,
      }}
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
