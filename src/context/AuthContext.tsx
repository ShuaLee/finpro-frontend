import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../utils/api";
import { registerLogout } from "../utils/logoutHandler";

type AuthContextType = {
  isAuthenticated: boolean;
  isProfileComplete: boolean;
  authChecked: boolean;
  setProfileComplete: (value: boolean) => void;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isProfileComplete, setProfileComplete] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  // ✅ Register global logout handler
  useEffect(() => {
    registerLogout(logout);
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
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

    checkAuth();
  }, []);

  const logout = async () => {
    try {
      await api.post("/auth/logout/");
    } catch (error) {
      console.warn("Logout API failed (already logged out?):", error);
    } finally {
      setIsAuthenticated(false);
      setProfileComplete(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, isProfileComplete, authChecked, setProfileComplete, logout }}
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
