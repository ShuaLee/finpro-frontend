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