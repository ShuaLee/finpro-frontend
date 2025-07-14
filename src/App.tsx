import { useMemo, useState } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import { lightTheme, darkTheme } from "./theme";
import TopNavBar from "./components/TopNavBar";
import Dashboard from "./pages/Dashboard";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import CreateAccount from "./pages/CreateAccount";
import NotFoundPage from "./pages/NotFoundPage";
import { useAuth } from "./context/AuthContext";

const Home = ({
  darkMode,
  toggleDarkMode,
}: {
  darkMode: boolean;
  toggleDarkMode: () => void;
}) => {
  const { isAuthenticated, authChecked } = useAuth();

  if (!authChecked) return null;

  return isAuthenticated ? (
    <Dashboard />
  ) : (
    <LandingPage darkMode={darkMode} onToggleDarkMode={toggleDarkMode} />
  );
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

  const isAuthPage = path === "/login" || path === "/create-account";

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
        <Route
          path="/"
          element={<Home darkMode={darkMode} toggleDarkMode={toggleDarkMode} />}
        />
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Home darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
            ) : (
              <Login />
            )
          }
        />
        <Route
          path="/create-account"
          element={
            isAuthenticated ? (
              <Home darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
            ) : (
              <CreateAccount />
            )
          }
        />
        <Route path="*" element={<NotFoundPage />} />
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
