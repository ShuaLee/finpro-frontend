import type { Theme } from "@mui/material/styles";

export const getNavButtonStyle = (theme: Theme) => ({
  borderRadius: theme.spacing(1), // e.g. 4px
  height: theme.spacing(6.25), // 50px
  minWidth: theme.spacing(5), // 40px
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  justifyContent: "center",
  transition: "background-color 0.2s ease",
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
});

export const getMenuItemStyle = (theme: Theme) => ({
  borderRadius: theme.spacing(1),
  height: theme.spacing(6.25), // 50px
  fontSize: "0.95rem",
  transition: "background-color 0.2s ease",
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
});
