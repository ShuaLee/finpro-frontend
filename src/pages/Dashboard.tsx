import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const Dashboard = () => {
  return (
    <Box sx={{ flexGrow: 1, height: '100vh', p: 2 }}>
      <Grid container spacing={2}>
        {/* Left Column - 2/3 width */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6">Left Column (2/3)</Typography>
            {/* Add content here */}
          </Paper>
        </Grid>

        {/* Right Column - 1/3 width */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6">Right Column (1/3)</Typography>
            {/* Add sidebar or content here */}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;


