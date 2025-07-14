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

  const isAuthPage = path === "/login" || path === "/create-account";
  const minimalTopNav = isAuthPage;

  // ⏳ Wait for auth check before rendering anything
  if (!authChecked) return null;

  return (
    <>
      <TopNavBar
        darkMode={darkMode}
        onToggleDarkMode={toggleDarkMode}
        hideNavLinks={false}
        hideProfileAndMenu={minimalTopNav}
        customRightButtons={minimalTopNav ? <></> : undefined}
      />

      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Dashboard />
            ) : (
              <LandingPage
                darkMode={darkMode}
                onToggleDarkMode={toggleDarkMode}
              />
            )
          }
        />
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/" replace /> : <Login />}
        />
        <Route
          path="/create-account"
          element={
            isAuthenticated ? <Navigate to="/" replace /> : <CreateAccount />
          }
        />
        {/* fallback */}
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
