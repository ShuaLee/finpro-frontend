import { Box, Paper } from '@mui/material';
import SideNavBar from './SideNavBar';

const SIDEBAR_WIDTH = 220;
const SPACING = 8;

type DashboardLayoutProps = {
  children: React.ReactNode;
};

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        height: '100vh', // 🔒 full height, no page scroll
        bgcolor: '#e9ebf0',
      }}
    >
      {/* Sidebar */}
      <Box
        sx={{
          width: SIDEBAR_WIDTH,
          bgcolor: '#e9ebf0',
          p: 2,
          flexShrink: 0, // prevent resizing
        }}
      >
        <SideNavBar />
      </Box>

      {/* Right container (holds the floating panel) */}
      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'stretch',
          p: `${SPACING}px`,
        }}
      >
        {/* Floating Scrollable Panel */}
        <Paper
          elevation={0}
          sx={{
            width: '100%',
            maxWidth: '1200px',
            borderRadius: 3,
            border: '1px solid',
            borderColor: 'grey.300',
            bgcolor: 'white',
            p: 4,
            overflow: 'auto',
          }}
        >
          {children}
        </Paper>
      </Box>
    </Box>
  );
};

export default DashboardLayout;
