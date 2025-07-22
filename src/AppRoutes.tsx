import { Routes, Route, Navigate } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import { useAuth } from "./context/AuthContext";

import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import CreateAccount from "./pages/CreateAccount";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import AppLayout from "./layout/AppLayout";

type Props = { darkMode: boolean; toggleDarkMode: () => void };

const AppRoutes = ({ darkMode, toggleDarkMode }: Props) => {
  const { isAuthenticated, authChecked } = useAuth();

  if (!authChecked) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <AppLayout
      darkMode={darkMode}
      toggleDarkMode={toggleDarkMode}
      isAuthenticated={isAuthenticated}
    >
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <LandingPage />
            )
          }
        />
        <Route
          path="/login"
          element={
            isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />
          }
        />
        <Route
          path="/create-account"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <CreateAccount />
            )
          }
        />
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? <Dashboard /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/home"
          element={
            isAuthenticated ? <Home /> : <Navigate to="/login" replace />
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppLayout>
  );
};

export default AppRoutes;
