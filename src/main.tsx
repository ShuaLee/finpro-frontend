import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

import { ThemeProvider, CssBaseline } from '@mui/material';
import { createTheme } from '@mui/material/styles';


const theme = createTheme({
  palette: {
    mode: 'light', // Change to 'dark' if needed
    background: {
      default: '#f8f9fa',
    },
    text: {
      primary: '#212121',
    },
  },
  typography: {
    fontFamily: `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif`,
    fontWeightRegular: 300,
    fontWeightMedium: 400,
    fontWeightBold: 500,
    // Increase base sizes slightly
    fontSize: 15, // default is 14
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </StrictMode>
);