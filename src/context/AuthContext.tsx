import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../utils/api";

type AuthContextType = {
  isAuthenticated: boolean;
  isProfileComplete: boolean;
  authChecked: boolean;
  setProfileComplete: (value: boolean) => void;
  login: (email: string, password: string) => Promise<void>;
  signup: (data: {
    email: string;
    password: string;
    isOver13: boolean;
  }) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isProfileComplete, setProfileComplete] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  const refreshAuthStatus = async () => {
    try {
      const res = await api.get("/auth/status/");
      setIsAuthenticated(res.data.is_authenticated);
      setProfileComplete(res.data.is_profile_complete);
    } catch {
      setIsAuthenticated(false);
      setProfileComplete(false);
    } finally {
      setAuthChecked(true);
    }
  };

  useEffect(() => {
    refreshAuthStatus();
  }, []);

  const login = async (email: string, password: string) => {
    await api.post("/auth/login/", { email, password });
    await refreshAuthStatus(); // ✅ Refresh after login
  };

  const signup = async (data: {
    email: string;
    password: string;
    isOver13: boolean;
  }) => {
    await api.post("/auth/signup/", {
      email: data.email,
      password: data.password,
      is_over_13: data.isOver13,
    });
    await refreshAuthStatus(); // ✅ Refresh after signup
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout/");
    } catch {
      // Silent fail
    } finally {
      setIsAuthenticated(false);
      setProfileComplete(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isProfileComplete,
        authChecked,
        setProfileComplete,
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
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
