import { Typography } from '@mui/material';
import DashboardLayout from './components/DashboardLayout';

function App() {
  return (
    <DashboardLayout
      topbarContent={
        <Typography fontWeight="bold">Dashboard / Reports</Typography>
      }
    >
      <Typography>Main content goes here</Typography>
    </DashboardLayout>
  );
}

export default App;