import { Box, Typography } from '@mui/material';
import SideNavBar from "./SideNavBar";

type DashboardLayoutProps = {
  children: React.ReactNode;
  topbarContent?: React.ReactNode;
};

const SIDEBAR_WIDTH = 240;

export default function DashboardLayout({
  children,
  topbarContent,
}: DashboardLayoutProps) {
  return (
    <Box sx={{ display: 'flex', bgcolor: 'grey.100', minHeight: '100vh' }}>
      {/* Sidebar */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: `${SIDEBAR_WIDTH}px`,
          height: '100vh',
          bgcolor: 'white',
          borderRight: '1px solid',
          borderColor: 'grey.300',
          p: 0,
          zIndex: 1000,
        }}
      >
        <SideNavBar />
      </Box>

      <Box sx={{ marginLeft: `${SIDEBAR_WIDTH}px`, width: '100%' }}>
        {/* Topbar */}
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: `${SIDEBAR_WIDTH}px`,
            right: 0,
            height: '64px',
            bgcolor: 'white',
            borderBottom: '1px solid',
            borderColor: 'grey.300',
            display: 'flex',
            alignItems: 'center',
            px: 6,
            zIndex: 900,
          }}
        >
          {topbarContent ?? <Typography fontWeight="bold">Topbar</Typography>}
        </Box>

        {/* Main content */}
        <Box sx={{ pt: '64px' }}>{children}</Box>
      </Box>
    </Box>
  );
}
