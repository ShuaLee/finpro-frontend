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
  Paper,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import logoLight from "../assets/logo-w.webp";
import logoDark from "../assets/logo-d.webp";

import { getNavButtonStyle, getMenuItemStyle } from "../theme/buttonStyles.ts";
import { useState, useRef, useEffect } from "react";

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
  const [menuOpen, setMenuOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const handleToggleDrawer = () => setDrawerOpen(!drawerOpen);
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    const target = event.currentTarget as HTMLButtonElement;

    // Toggle if already open and same button
    if (anchorRef.current === target && menuOpen) {
      setMenuOpen(false);
    } else {
      anchorRef.current = target;
      setMenuOpen(true);
    }
  };
  const handleMenuClose = () => setMenuOpen(false);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        menuRef.current &&
        !menuRef.current.contains(target) &&
        anchorRef.current &&
        !anchorRef.current.contains(target)
      ) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          bgcolor: "background.default",
          color: "text.primary",
          zIndex: theme.zIndex.appBar + 1,
        }}
      >
        <Toolbar
          disableGutters
          sx={{
            height: 100,
            px: 2,
            py: 2,
            justifyContent: "center",
            position: "relative",
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
                    onClick={handleMenuClose}
                    sx={{
                      ...getNavButtonStyle(theme),
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

            {/* Right controls */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              {isMobile ? (
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  onClick={handleToggleDrawer}
                  sx={getNavButtonStyle(theme)}
                >
                  <MenuIcon />
                </IconButton>
              ) : (
                <IconButton
                  ref={anchorRef}
                  component="button"
                  color="inherit"
                  onClick={handleMenuOpen}
                  sx={getNavButtonStyle(theme)}
                >
                  <AccountCircleIcon />
                </IconButton>
              )}
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Spacer below fixed navbar */}
      <Box sx={{ mt: "100px" }} />

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

          <List>
            {navOptions.map((label) => (
              <ListItemButton key={label} sx={getMenuItemStyle(theme)}>
                <ListItemText primary={label} />
              </ListItemButton>
            ))}
          </List>

          <Divider sx={{ my: 1 }} />

          <List>
            {profileOptions.map((label) => (
              <ListItemButton key={label} sx={getMenuItemStyle(theme)}>
                <ListItemText primary={label} />
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* Fixed dropdown menu */}
      {!isMobile &&
        menuOpen &&
        anchorRef.current &&
        (() => {
          const rect = anchorRef.current.getBoundingClientRect();
          const top = rect.bottom + 8;
          const left = rect.right - 180;

          return (
            <Box
              ref={menuRef}
              sx={{
                position: "fixed",
                top,
                left,
                zIndex: theme.zIndex.appBar + 2,
              }}
            >
              <Paper
                sx={{
                  px: 2,
                  py: 1,
                  borderRadius: 2,
                  boxShadow: 4,
                  minWidth: 180,
                  backgroundColor: "background.paper",
                }}
              >
                <Box
                  sx={{
                    px: 2,
                    py: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span style={{ pointerEvents: "none" }}>Theme</span>
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleDarkMode();
                    }}
                    color="inherit"
                    size="small"
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: 2,
                      transition: "background-color 0.2s ease",
                      "&:hover": {
                        backgroundColor: theme.palette.action.hover,
                      },
                    }}
                  >
                    {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
                  </IconButton>
                </Box>

                <Divider sx={{ my: 1 }} />

                {profileOptions.map((label) => (
                  <Box
                    key={label}
                    onClick={handleMenuClose}
                    sx={{
                      px: 2,
                      py: 1,
                      cursor: "pointer",
                      borderRadius: 1,
                      "&:hover": {
                        backgroundColor: theme.palette.action.hover,
                      },
                    }}
                  >
                    {label}
                  </Box>
                ))}
              </Paper>
            </Box>
          );
        })()}
    </>
  );
};

export default TopNavBar;
