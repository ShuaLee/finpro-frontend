import { useState, useMemo } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { lightTheme, darkTheme } from './theme';
import TopNavBar from './components/TopNavBar';
import Dashboard from './pages/Dashboard';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const theme = useMemo(() => (darkMode ? darkTheme : lightTheme), [darkMode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <TopNavBar onToggleDarkMode={() => setDarkMode(!darkMode)} darkMode={darkMode} />
      <Dashboard />
    </ThemeProvider>
  );
}

export default App;
