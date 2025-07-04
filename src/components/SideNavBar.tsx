import {
  Box,
  Button,
  Stack,
  Collapse,
} from '@mui/material';
import {
  AccountBalanceWalletOutlined,
  ExpandMore,
  SpaceDashboardOutlined,
  SettingsOutlined,
} from '@mui/icons-material';
import { useState } from 'react';
import logo from '../assets/logo.webp';

type NavSection = 'dashboard' | 'investments' | 'settings';

const SideNavBar = () => {
  const [open, setOpen] = useState(false);

  // Temporarily hard-coded, cast as NavSection to fix TS error
  const current = 'dashboard' as NavSection;

  const toggleOpen = () => setOpen((prev) => !prev);

  const navButtonStyles = (active: boolean = false) => ({
    justifyContent: 'flex-start',
    width: '100%',
    pl: 3,
    color: active ? '#212121' : '#424242', // readable dark gray
    borderRadius: '8px',
    textTransform: 'none',
    fontWeight: active ? 500 : 400,
    backgroundColor: active ? '#f1f3f5' : 'transparent', // Dark gray when active
    '&:hover': {
      backgroundColor: active ? '#f1f3f5' : '#f1f3f5',
    },
    '&::before': active
    ? {
        content: '""',
        position: 'absolute',
        left: 8,
        top: 5,
        bottom: 5,
        width: '4px',
        backgroundColor: '#212121',
        borderRadius: '4px',
      }
    : {},
  });

  return (
    <Stack
      direction="column"
      sx={{
        height: '100%',
        width: '100%',
        px: 2,
        py: 1,
      }}
      spacing={1}
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
          sx={{ height: '140px', objectFit: 'contain' }}
        />
      </Box>

      {/* Dashboard */}
      <Button
        variant="text"
        sx={navButtonStyles(current === 'dashboard')}
        startIcon={<SpaceDashboardOutlined />}
      >
        Dashboard
      </Button>

      {/* Investments */}
      <Button
        variant="text"
        sx={navButtonStyles(current === 'investments')}
        endIcon={
          <ExpandMore
            sx={{
              transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: '0.3s',
              ml: 'auto',
            }}
          />
        }
        onClick={toggleOpen}
        startIcon={<AccountBalanceWalletOutlined />}
      >
        Investments
      </Button>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <Stack pl={2} gap={0.5}>
          <Button variant="text" sx={navButtonStyles()}>
            Stock Portfolio
          </Button>
          <Button variant="text" sx={navButtonStyles()}>
            Precious Metals
          </Button>
          <Button variant="text" sx={navButtonStyles()}>
            Crypto Portfolio
          </Button>
          <Button variant="text" sx={navButtonStyles()}>
            Add New...
          </Button>
        </Stack>
      </Collapse>

      {/* Settings */}
      <Button
        variant="text"
        sx={navButtonStyles(current === 'settings')}
        startIcon={<SettingsOutlined />}
      >
        Settings
      </Button>
    </Stack>
  );
};

export default SideNavBar;