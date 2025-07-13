import type { Theme } from "@mui/material/styles";
import { lighten, darken } from "@mui/system";

const getActiveBackground = (theme: Theme) => {
  const base = theme.palette.background.default;
  return theme.palette.mode === "dark" ? lighten(base, 0.5) : darken(base, 0.3); // slightly less dark for better feel
};

export const getNavButtonStyle = (theme: Theme) => ({
  borderRadius: theme.spacing(1),
  height: theme.spacing(6.25),
  minWidth: theme.spacing(5),
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  justifyContent: "center",
  transition: "background-color 0.2s ease",
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:active": {
    backgroundColor: getActiveBackground(theme), // 👈 the key part
  },
});

export const getMenuItemStyle = (theme: Theme) => ({
  borderRadius: theme.spacing(1),
  height: theme.spacing(6.25),
  fontSize: "0.95rem",
  transition: "background-color 0.2s ease",
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:active": {
    backgroundColor: getActiveBackground(theme),
  },
});
