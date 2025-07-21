import { Routes, Route, Navigate } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import { useAuth } from "./context/AuthContext";

import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import type { JSX } from "react";

type Props = { darkMode: boolean };

const AppRoutes = ({ darkMode }: Props) => {
  const { isAuthenticated, authChecked } = useAuth();

  if (!authChecked) {
    return (
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Routes>
      <Route
        path="/"
        element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <LandingPage darkMode={darkMode} />}
      />
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login darkMode={darkMode} />}
      />

      <Route
        path="/dashboard"
        element={<ProtectedRoute isAuthenticated={isAuthenticated}><Dashboard darkMode={darkMode} /></ProtectedRoute>}
      />
      <Route
        path="/home"
        element={<ProtectedRoute isAuthenticated={isAuthenticated}><Home darkMode={darkMode} /></ProtectedRoute>}
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

const ProtectedRoute = ({ isAuthenticated, children }: { isAuthenticated: boolean; children: JSX.Element }) => {
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default AppRoutes;
