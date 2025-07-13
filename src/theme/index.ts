import { createTheme } from "@mui/material/styles";

// Shared component overrides
const baseComponents = {
  MuiButtonBase: {
    defaultProps: {
      disableRipple: true, // disables ripple for all base buttons
    },
  },
  MuiButton: {
    defaultProps: {
      disableRipple: true,
    },
  },
  MuiIconButton: {
    defaultProps: {
      disableRipple: true,
    },
  },
  MuiMenuItem: {
    defaultProps: {
      disableRipple: true,
    },
  },
  MuiListItemButton: {
    defaultProps: {
      disableRipple: true,
    },
  },
};

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#f5f5f5",
      paper: "#ffffff",
    },
  },
  components: baseComponents,
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#121212",
      paper: "#1e1e1e",
    },
  },
  components: baseComponents,
});
