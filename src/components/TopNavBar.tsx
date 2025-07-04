import {
  Box,
  Typography,
  Menu,
  MenuItem,
  Button,
} from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import { useState } from 'react';
import { getStaticNavButtonStyle } from '../styles/navButtonStyles';

const TopNavBar = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setMenuOpen(true); // set to true when opened
  };

  const handleClose = () => {
    setAnchorEl(null);
    setMenuOpen(false); // set to false when closed
  };

  const firstName = "John";

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
      {/* Breadcrumbs */}
      <Typography variant="subtitle1" fontWeight={500}>
        Dashboard / Reports
      </Typography>

      {/* Dropdown */}
      <Box>
        <Button
          onClick={handleOpen}
          endIcon={<ExpandMore />}
          sx={getStaticNavButtonStyle(menuOpen)} // pass true if selected
        >
          Hello, {firstName}!
        </Button>

        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <MenuItem onClick={handleClose}>Settings</MenuItem>
          <MenuItem onClick={handleClose}>Logout</MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};

export default TopNavBar;