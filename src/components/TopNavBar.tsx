import {
  AppBar,
  Box,
  Toolbar,
  Button,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

import logoLight from "../assets/logo-w.webp";
import logoDark from "../assets/logo-d.webp";
import { useState } from "react";

const navOptions = ["Home", "Portfolio", "Reports", "Settings", "Help"];

type Props = {
  onToggleDarkMode: () => void;
  darkMode: boolean;
};

const TopNavBar = ({ onToggleDarkMode, darkMode }: Props) => {
  const logo = darkMode ? logoDark : logoLight;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleToggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <>
      <AppBar
        position="static"
        elevation={0}
        sx={{ bgcolor: "background.default", color: "text.primary" }}
      >
        <Toolbar
          disableGutters
          sx={{
            minHeight: 64,
            px: 2,
            py: 3,
            display: "flex",
            justifyContent: "center", // centers the inner Box
          }}
        >
          <Box
            sx={{
              width: "100%",
              maxWidth: 1200,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {/* Logo */}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <img
                src={logo}
                alt="Logo"
                style={{
                  height: 38,
                  width: "auto",
                  display: "block",
                  marginTop: 5,
                }}
              />
            </Box>

            {/* Center Nav OR Hamburger */}
            {isMobile ? (
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={handleToggleDrawer}
                sx={{ ml: 2 }}
              >
                <MenuIcon />
              </IconButton>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  justifyContent: "center",
                  flex: 1,
                  alignItems: "center",
                }}
              >
                {navOptions.map((label) => (
                  <Button
                    key={label}
                    color="inherit"
                    sx={{
                      textTransform: "none",
                      fontSize: "1rem",
                      paddingY: 1,
                    }}
                  >
                    {label}
                  </Button>
                ))}
              </Box>
            )}

            {/* Theme Toggle */}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <IconButton onClick={onToggleDarkMode} color="inherit">
                {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer for mobile nav */}
      <Drawer anchor="left" open={drawerOpen} onClose={handleToggleDrawer}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={handleToggleDrawer}
          onKeyDown={handleToggleDrawer}
        >
          <List>
            {navOptions.map((label) => (
              <ListItemButton key={label}>
                <ListItemText primary={label} />
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default TopNavBar;
