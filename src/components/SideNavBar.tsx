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
import { getNavButtonStyles } from '../styles/navButtonStyles';

type NavSection = 'dashboard' | 'investments' | 'settings';

const SideNavBar = () => {
  const [open, setOpen] = useState(false);

  // Temporarily hard-coded, cast as NavSection to fix TS error
  const current = 'dashboard' as NavSection;

  const toggleOpen = () => setOpen((prev) => !prev);

  return (
    <Stack
      direction="column"
      sx={{
        height: '100%',
        width: '100%',
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
        sx={getNavButtonStyles(current === 'dashboard')}
        startIcon={<SpaceDashboardOutlined />}
      >
        Dashboard
      </Button>

      {/* Investments */}
      <Button
        variant="text"
        sx={getNavButtonStyles(current === 'investments')}
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
          <Button variant="text" sx={getNavButtonStyles()}>
            Stock Portfolio
          </Button>
          <Button variant="text" sx={getNavButtonStyles()}>
            Precious Metals
          </Button>
          <Button variant="text" sx={getNavButtonStyles()}>
            Crypto Portfolio
          </Button>
          <Button variant="text" sx={getNavButtonStyles()}>
            Add New...
          </Button>
        </Stack>
      </Collapse>

      {/* Settings */}
      <Button
        variant="text"
        sx={getNavButtonStyles(current === 'settings')}
        startIcon={<SettingsOutlined />}
      >
        Settings
      </Button>
    </Stack>
  );
};

export default SideNavBar;