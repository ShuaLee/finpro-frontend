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
  Menu,
  MenuItem,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import logoLight from "../assets/logo-w.webp";
import logoDark from "../assets/logo-d.webp";
import { useState } from "react";

const navOptions = ["Home", "Portfolio", "Reports", "Settings", "Help"];
const profileOptions = ["Profile", "Settings", "Logout"];

type Props = {
  onToggleDarkMode: () => void;
  darkMode: boolean;
};

const TopNavBar = ({ onToggleDarkMode, darkMode }: Props) => {
  const logo = darkMode ? logoDark : logoLight;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);

  const handleToggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const navButtonStyle = {
    borderRadius: 2,
    height: "50px",
    minWidth: 40,
    paddingX: 2,
    justifyContent: "center",
  };

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{ bgcolor: "background.default", color: "text.primary" }}
      >
        <Toolbar
          disableGutters
          sx={{
            height: 100,
            px: 2,
            py: 2,
            display: "flex",
            justifyContent: "center",
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
                  marginTop: 0,
                }}
              />
            </Box>

            {/* Nav Links */}
            {!isMobile && (
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  alignItems: "center",
                  ml: 4,
                  flexGrow: 1,
                }}
              >
                {navOptions.map((label) => (
                  <Button
                    key={label}
                    color="inherit"
                    sx={{
                      ...navButtonStyle,
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

            {/* Right controls: menu (mobile) OR profile dropdown */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              {isMobile ? (
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  onClick={handleToggleDrawer}
                  sx={{ ...navButtonStyle }}
                >
                  <MenuIcon />
                </IconButton>
              ) : (
                <IconButton
                  sx={{ ...navButtonStyle }}
                  color="inherit"
                  onClick={handleMenuOpen}
                >
                  <AccountCircleIcon />
                </IconButton>
              )}
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer for mobile */}
      <Drawer anchor="left" open={drawerOpen} onClose={handleToggleDrawer}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={handleToggleDrawer}
          onKeyDown={handleToggleDrawer}
        >
          {/* Theme toggle */}
          <Box
            sx={{
              px: 2,
              py: 1.5,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span>Theme</span>
            <IconButton
              onClick={onToggleDarkMode}
              color="inherit"
              disableRipple
              disableTouchRipple
              size="small"
              sx={{
                width: 40,
                height: 40,
                borderRadius: 2,
                transition: "background-color 0.2s ease",
                "&:hover": { backgroundColor: "action.hover" },
              }}
            >
              {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Box>

          <Divider sx={{ my: 1 }} />

          {/* Nav options */}
          <List>
            {navOptions.map((label) => (
              <ListItemButton key={label}>
                <ListItemText primary={label} />
              </ListItemButton>
            ))}
          </List>

          <Divider sx={{ my: 1 }} />

          {/* Profile options */}
          <List>
            {profileOptions.map((label) => (
              <ListItemButton key={label}>
                <ListItemText primary={label} />
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* Profile dropdown in full screen */}
      {!isMobile && (
        <Menu
          anchorEl={anchorEl}
          open={menuOpen}
          onClose={handleMenuClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          disableScrollLock
          PaperProps={{
            sx: {
              mt: 1,
              px: 2,
              py: 1,
              borderRadius: 2,
              boxShadow: 4,
              minWidth: 180,
              backgroundColor: "background.paper",
            },
          }}
        >
          {/* Theme Row */}
          <Box
            sx={{
              px: 2,
              py: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              pointerEvents: "none",
            }}
          >
            <span style={{ pointerEvents: "none" }}>Theme</span>
            <IconButton
              onClick={onToggleDarkMode}
              color="inherit"
              disableRipple
              disableTouchRipple
              size="small"
              sx={{
                pointerEvents: "auto",
                width: 40,
                height: 40,
                borderRadius: 2,
                transition: "background-color 0.2s ease",
                "&:hover": {
                  backgroundColor: "action.hover",
                },
              }}
            >
              {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Box>

          <Divider sx={{ my: 1 }} />

          {profileOptions.map((label) => (
            <MenuItem
              key={label}
              onClick={handleMenuClose}
              disableRipple
              disableTouchRipple
              sx={{
                borderRadius: 2,
                height: 50,
                fontSize: "0.95rem",
              }}
            >
              {label}
            </MenuItem>
          ))}
        </Menu>
      )}
    </>
  );
};

export default TopNavBar;
