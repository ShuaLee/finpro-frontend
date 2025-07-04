import {
  Box,
  Button,
  Stack,
  Menu,
  MenuItem,
} from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import { useState } from 'react';
import logo from '../assets/logo.webp';

const SideNavBar = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  return (
    <Stack
      direction="column"
      sx={{
        height: '100%',
        width: '100%',
        px: 2,
        py: 1,
        spacing: 1,
      }}
    >
      {/* Logo */}
      <Box
        height="64px"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Box
          component="img"
          src={logo}
          alt="Logo"
          sx={{ height: '40px', objectFit: 'contain' }}
        />
      </Box>

      {/* Buttons */}
      <Button
        variant="text"
        sx={{ justifyContent: 'flex-start', width: '100%' }}
      >
        Dashboard
      </Button>

      {/* Portfolios Dropdown */}
      <Button
        variant="text"
        endIcon={<ExpandMore />}
        onClick={handleOpen}
        sx={{ justifyContent: 'space-between', width: '100%' }}
      >
        Portfolios
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        PaperProps={{
          sx: {
            width: '100%',
            mt: '-8px',
          },
        }}
      >
        <MenuItem onClick={handleClose}>Stock Portfolio</MenuItem>
        <MenuItem onClick={handleClose}>Precious Metals</MenuItem>
        <MenuItem onClick={handleClose}>Crypto Portfolio</MenuItem>
        <MenuItem onClick={handleClose}>Add New...</MenuItem>
      </Menu>

      <Button
        variant="text"
        sx={{ justifyContent: 'flex-start', width: '100%' }}
      >
        Settings
      </Button>
    </Stack>
  );
};

export default SideNavBar;