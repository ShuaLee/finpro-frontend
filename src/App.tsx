import { Typography, Divider, Box } from '@mui/material';
import DashboardLayout from './components/DashboardLayout';

function App() {
  return (
    <DashboardLayout>
      <Typography variant="h4" gutterBottom>
        Main Section
      </Typography>
      <Divider sx={{ mb: 2 }} />

      {[...Array(60)].map((_, i) => (
        <Box key={i} mb={3}>
          <Typography variant="h6">Subsection {i + 1}</Typography>
          <Typography variant="body2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In volutpat, erat eu sodales laoreet, 
            lacus justo posuere turpis, sed hendrerit nunc purus ut mi. Nulla facilisi. Integer gravida 
            tincidunt odio, nec porttitor neque.
          </Typography>
        </Box>
      ))}
    </DashboardLayout>
  );
}

export default App;
