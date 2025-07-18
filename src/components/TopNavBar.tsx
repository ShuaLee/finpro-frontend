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
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import logoLight from "../assets/logo-w.webp";
import logoDark from "../assets/logo-d.webp";

type Props = {
  onToggleDarkMode: () => void;
  darkMode: boolean;
  customRightButtons?: React.ReactNode;
  hideNavLinks?: boolean;
  hideProfileAndMenu?: boolean;
  position?: "sticky" | "fixed" | "static";
};

const navOptions = ["Home", "Portfolio", "Reports", "Settings"];
const profileOptions = ["Profile", "Settings", "Logout"];

const TopNavBar = ({
  onToggleDarkMode,
  darkMode,
  customRightButtons,
  hideNavLinks = false,
  hideProfileAndMenu = false,
  position = "sticky",
}: Props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const logo = darkMode ? logoDark : logoLight;

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const handleDrawerToggle = () => setDrawerOpen((prev) => !prev);

  return (
    <>
      <AppBar
        position={position}
        elevation={0}
        sx={{
          bgcolor: "background.default",
          color: "text.primary",
          zIndex: theme.zIndex.appBar,
        }}
      >
        <Toolbar
          sx={{
            height: 80,
            display: "flex",
            justifyContent: "space-between",
            px: { xs: 2, sm: 4 },
          }}
        >
          {/* Logo */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <img src={logo} alt="Logo" style={{ height: 36 }} />
          </Box>

          {/* Desktop Navigation */}
          {!hideNavLinks && !isMobile && (
            <Box sx={{ display: "flex", gap: 3 }}>
              {navOptions.map((label) => (
                <Button
                  key={label}
                  color="inherit"
                  onClick={() => navigate(`/${label.toLowerCase()}`)}
                  sx={{ textTransform: "none", fontSize: "1rem" }}
                >
                  {label}
                </Button>
              ))}
            </Box>
          )}

          {/* Right Side */}
          {!hideProfileAndMenu && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              {/* Dark Mode Toggle */}
              <IconButton onClick={onToggleDarkMode} color="inherit">
                {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>

              {/* Custom Buttons or Account Menu */}
              {customRightButtons ? (
                customRightButtons
              ) : isMobile ? (
                <IconButton color="inherit" onClick={handleDrawerToggle}>
                  <MenuIcon />
                </IconButton>
              ) : (
                <IconButton color="inherit" onClick={() => navigate("/profile")}>
                  <AccountCircleIcon />
                </IconButton>
              )}
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer anchor="right" open={drawerOpen} onClose={handleDrawerToggle}>
        <Box sx={{ width: 250, p: 2 }}>
          <Divider />
          <List>
            {navOptions.map((label) => (
              <ListItemButton
                key={label}
                onClick={() => {
                  navigate(`/${label.toLowerCase()}`);
                  handleDrawerToggle();
                }}
              >
                <ListItemText primary={label} />
              </ListItemButton>
            ))}
          </List>
          <Divider sx={{ my: 2 }} />
          <List>
            {profileOptions.map((option) => (
              <ListItemButton
                key={option}
                onClick={() => {
                  if (option === "Logout") handleLogout();
                  else navigate(`/${option.toLowerCase()}`);
                  handleDrawerToggle();
                }}
              >
                <ListItemText primary={option} />
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default TopNavBar;
