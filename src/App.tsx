import { useState, useMemo } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { BrowserRouter as Router } from "react-router-dom";
import { lightTheme, darkTheme } from "./theme";
import AppRoutes from "./AppRoutes";

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const theme = useMemo(() => (darkMode ? darkTheme : lightTheme), [darkMode]);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AppRoutes darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      </Router>
    </ThemeProvider>
  );
}
