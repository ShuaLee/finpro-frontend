import { useMemo, useState } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import { lightTheme, darkTheme } from "./theme";
import TopNavBar from "./components/TopNavBar";
import Dashboard from "./pages/Dashboard";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import CreateAccount from "./pages/CreateAccount";
import { useAuth } from "./context/AuthContext";

const RootRedirect = () => {
  const { isAuthenticated } = useAuth();
  return <Navigate to={isAuthenticated ? "/dashboard" : "/landing"} replace />;
};

const AppRoutes = ({
  darkMode,
  toggleDarkMode,
}: {
  darkMode: boolean;
  toggleDarkMode: () => void;
}) => {
  const { isAuthenticated, authChecked } = useAuth();
  const location = useLocation();
  const path = location.pathname;

  if (!authChecked) return null;

  const isAuthPage =
    path === "/login" || path === "/create-account" || path === "/landing";

  return (
    <>
      <TopNavBar
        darkMode={darkMode}
        onToggleDarkMode={toggleDarkMode}
        hideNavLinks={false}
        hideProfileAndMenu={isAuthPage}
        customRightButtons={isAuthPage ? <></> : undefined}
      />

      <Routes>
        <Route path="/" element={<RootRedirect />} />

        <Route
          path="/landing"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <LandingPage
                darkMode={darkMode}
                onToggleDarkMode={toggleDarkMode}
              />
            )
          }
        />

        <Route
          path="/dashboard"
          element={
            isAuthenticated ? <Dashboard /> : <Navigate to="/landing" replace />
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

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const theme = useMemo(() => (darkMode ? darkTheme : lightTheme), [darkMode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AppRoutes
          darkMode={darkMode}
          toggleDarkMode={() => setDarkMode((prev) => !prev)}
        />
      </Router>
    </ThemeProvider>
  );
}

export default App;
