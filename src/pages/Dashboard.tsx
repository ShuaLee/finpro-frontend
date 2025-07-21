import MainLayout from "../layout/MainLayout";
import Grid from "@mui/material/Grid";
import { Paper, Typography } from "@mui/material";

const Dashboard = ({ darkMode }: { darkMode: boolean }) => {
  return (
    <MainLayout darkMode={darkMode}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Paper sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6">Main Content</Typography>
          </Paper>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6">Sidebar</Typography>
          </Paper>
        </Grid>
      </Grid>
    </MainLayout>
  );
};

export default Dashboard;
