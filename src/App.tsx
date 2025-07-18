import { useMemo, useState } from "react";
import { ThemeProvider, CssBaseline, Box, Button } from "@mui/material";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate,
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
  const navigate = useNavigate();
  const path = location.pathname;

  if (!authChecked) return null;

  const isAuthPage = path === "/login" || path === "/create-account";
  const isLandingPage = path === "/";

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* ✅ Sticky Navbar */}
      <TopNavBar
        darkMode={darkMode}
        onToggleDarkMode={toggleDarkMode}
        position="sticky"
        hideNavLinks={isLandingPage || isAuthPage}
        hideProfileAndMenu={isAuthPage}
        customRightButtons={
          isLandingPage ? (
            <>
              <Button onClick={() => navigate("/login")} color="inherit">
                Log In
              </Button>
              <Button
                onClick={() => navigate("/create-account")}
                color="inherit"
                variant="outlined"
                sx={{ ml: 1 }}
              >
                Create Account
              </Button>
            </>
          ) : undefined
        }
      />

      {/* ✅ Main Content */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          background: darkMode
            ? "linear-gradient(135deg, #1e1e1e, #2c2c2c)"
            : "linear-gradient(135deg, #f8f9fa, #e9ecef)",
        }}
      >
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
      </Box>
    </Box>
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
