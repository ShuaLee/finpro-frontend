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
import Home from "./pages/Home";
import Login from "./pages/Login";
import CreateAccount from "./pages/CreateAccount";
import NotFoundPage from "./pages/NotFoundPage";
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
  const navigate = useNavigate();

  if (!authChecked) return null;

  const path = location.pathname;
  const isLandingPage = path === "/";

  return (
    <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <TopNavBar
        darkMode={darkMode}
        onToggleDarkMode={toggleDarkMode}
        hideNavLinks={!isAuthenticated}
        hideProfileAndMenu={!isAuthenticated}
        customRightButtons={
          !isAuthenticated && isLandingPage ? (
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

      <Routes>
        <Route path="/" element={<Home darkMode={darkMode} />} />
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Home darkMode={darkMode} />
            ) : (
              <Login darkMode={darkMode} />
            )
          }
        />
        <Route
          path="/create-account"
          element={
            isAuthenticated ? (
              <Home darkMode={darkMode} />
            ) : (
              <CreateAccount darkMode={darkMode} />
            )
          }
        />
        <Route path="*" element={<NotFoundPage darkMode={darkMode} />} />
      </Routes>
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
        <Box
          sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
        >
          <AppRoutes
            darkMode={darkMode}
            toggleDarkMode={() => setDarkMode((prev) => !prev)}
          />
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
