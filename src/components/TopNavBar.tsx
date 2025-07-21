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
  Menu,
  MenuItem,
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
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const logo = darkMode ? logoDark : logoLight;

  const handleDrawerToggle = () => setDrawerOpen((prev) => !prev);

  const handleProfileMenuOpen = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    handleMenuClose();
    await logout();
    navigate("/"); // Redirect after logout
  };

  return (
    <>
      <AppBar
        position={position}
        elevation={0}
        sx={{
          bgcolor: "background.default",
          color: "text.primary",
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <Toolbar
          sx={{
            height: 80,
            px: { xs: 2, sm: 4 },
          }}
        >
          {/* ✅ Center content with max width */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              maxWidth: "1200px",
              margin: "0 auto",
            }}
          >
            {/* Logo */}
            <Box
              sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
              onClick={() => navigate("/")}
            >
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

                {/* Custom Buttons or Profile/Menu */}
                {customRightButtons ? (
                  customRightButtons
                ) : isMobile ? (
                  <IconButton color="inherit" onClick={handleDrawerToggle}>
                    <MenuIcon />
                  </IconButton>
                ) : (
                  <>
                    <IconButton color="inherit" onClick={handleProfileMenuOpen}>
                      <AccountCircleIcon />
                    </IconButton>
                    {/* Dropdown Menu */}
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={handleMenuClose}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right",
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                    >
                      <MenuItem onClick={() => navigate("/profile")}>
                        Profile
                      </MenuItem>
                      <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </Menu>
                  </>
                )}
              </Box>
            )}
          </Box>
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
            <ListItemButton onClick={() => navigate("/profile")}>
              <ListItemText primary="Profile" />
            </ListItemButton>
            <ListItemButton onClick={handleLogout}>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default TopNavBar;
