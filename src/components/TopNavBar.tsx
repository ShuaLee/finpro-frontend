import { AppBar, Box, Toolbar, Button, IconButton } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import logo from '../assets/logo-w.webp';

const navOptions = ['Home', 'Portfolio', 'Reports', 'Settings', 'Help'];

type Props = {
  onToggleDarkMode: () => void;
  darkMode: boolean;
};

const TopNavBar = ({ onToggleDarkMode, darkMode }: Props) => {
  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{ bgcolor: 'background.default', color: 'text.primary' }}
    >
      <Toolbar
        disableGutters
        sx={{
          minHeight: 64,
          px: 2,
          py: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Logo */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <img
            src={logo}
            alt="Logo"
            style={{
              height: 38,
              width: 'auto',
              display: 'block',
              marginTop: 5,
            }}
          />
        </Box>

        {/* Center Nav */}
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flex: 1 }}>
          {navOptions.map((label) => (
            <Button
              key={label}
              color="inherit"
              sx={{ textTransform: 'none', fontSize: '1rem', paddingY: 1 }}
            >
              {label}
            </Button>
          ))}
        </Box>

        {/* Toggle Button */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton onClick={onToggleDarkMode} color="inherit">
            {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TopNavBar;
