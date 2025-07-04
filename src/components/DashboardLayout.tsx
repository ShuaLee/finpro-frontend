import { Box, Paper } from '@mui/material';
import SideNavBar from './SideNavBar';

const SIDEBAR_WIDTH = 220;
const SPACING = 8; // px — reduced spacing

type DashboardLayoutProps = {
  children: React.ReactNode;
};

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        bgcolor: '#e9ebf0',
        position: 'relative',
      }}
    >
      {/* Sidebar */}
      <Box
        sx={{
          width: SIDEBAR_WIDTH,
          bgcolor: '#e9ebf0',
          p: 2,
        }}
      >
        <SideNavBar />
      </Box>

      {/* Floating Main Section */}
      <Paper
        elevation={0} // removes shadow
        sx={{
          position: 'absolute',
          top: `${SPACING}px`,
          bottom: `${SPACING}px`,
          right: `${SPACING}px`,
          left: `${SIDEBAR_WIDTH + SPACING}px`,
          bgcolor: 'white',
          borderRadius: 3,
          border: '1px solid',
          borderColor: 'grey.300',
          p: 4,
          overflow: 'auto',
        }}
      >
        {children}
      </Paper>
    </Box>
  );
};

export default DashboardLayout;