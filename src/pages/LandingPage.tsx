import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

type LandingPageProps = {
  darkMode: boolean;
  onToggleDarkMode: () => void;
};

const LandingPage = ({ darkMode }: LandingPageProps) => {
  const navigate = useNavigate();

  const handleCreateAccount = () => navigate("/create-account");
  const handleLogin = () => navigate("/login");

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        overflowX: "hidden",
      }}
    >
      {/* ✅ Hero Section */}
      <Box
        sx={{
          minHeight: "90vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          px: 2,
          background: darkMode
            ? "linear-gradient(135deg, #1e1e1e, #2c2c2c)"
            : "linear-gradient(135deg, #f8f9fa, #e9ecef)",
        }}
      >
        <Typography variant="h2" fontWeight="bold" gutterBottom>
          Track All Your Investments in One Place
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{ maxWidth: 600, mb: 4 }}
        >
          Manage your stocks, crypto, ETFs, and real estate seamlessly. Get
          insights, automate reports, and stay ahead.
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <Button
            variant="contained"
            size="large"
            sx={{ px: 4, py: 1.2, fontSize: "1.1rem", borderRadius: 2 }}
            onClick={handleCreateAccount}
          >
            Get Started
          </Button>
          <Button
            variant="outlined"
            size="large"
            sx={{ px: 4, py: 1.2, fontSize: "1.1rem", borderRadius: 2 }}
            onClick={handleLogin}
          >
            Log In
          </Button>
        </Box>
      </Box>

      {/* ✅ Feature Sections */}
      <Container sx={{ py: 8 }}>
        {/* Feature 1 */}
        <Grid container spacing={6} alignItems="center" sx={{ mb: 10 }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              Your Entire Portfolio in One Dashboard
            </Typography>
            <Typography color="text.secondary" mb={3}>
              Connect your brokerage, crypto wallets, and bank accounts.
              Visualize your net worth in real-time.
            </Typography>
            <Button variant="text" size="large" onClick={handleCreateAccount}>
              Start Tracking →
            </Button>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              component="img"
              src="https://via.placeholder.com/600x400"
              alt="Portfolio Overview"
              sx={{ width: "100%", borderRadius: 3, boxShadow: 3 }}
            />
          </Grid>
        </Grid>

        {/* Feature 2 */}
        <Grid
          container
          spacing={6}
          alignItems="center"
          sx={{ mb: 10 }}
          direction="row-reverse"
        >
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              Advanced Insights & Analytics
            </Typography>
            <Typography color="text.secondary" mb={3}>
              AI-powered performance tracking. Understand trends, risk exposure,
              and optimize your investments.
            </Typography>
            <Button variant="text" size="large" onClick={handleCreateAccount}>
              Learn More →
            </Button>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              component="img"
              src="https://via.placeholder.com/600x400"
              alt="Analytics"
              sx={{ width: "100%", borderRadius: 3, boxShadow: 3 }}
            />
          </Grid>
        </Grid>

        {/* Feature 3 */}
        <Grid container spacing={6} alignItems="center" sx={{ mb: 10 }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              Bank-Level Security & Privacy
            </Typography>
            <Typography color="text.secondary" mb={3}>
              Your data is encrypted and never shared. Two-factor authentication
              keeps your account safe.
            </Typography>
            <Button variant="text" size="large" onClick={handleCreateAccount}>
              Get Started →
            </Button>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              component="img"
              src="https://via.placeholder.com/600x400"
              alt="Security"
              sx={{ width: "100%", borderRadius: 3, boxShadow: 3 }}
            />
          </Grid>
        </Grid>
      </Container>

      {/* ✅ Final CTA Section */}
      <Box
        sx={{
          py: 8,
          textAlign: "center",
          background: darkMode
            ? "linear-gradient(135deg, #121212, #1f1f1f)"
            : "linear-gradient(135deg, #f1f3f6, #e2e6ea)",
        }}
      >
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Ready to Take Control of Your Investments?
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 4 }}>
          Join thousands of smart investors who trust FinPro.
        </Typography>
        <Button
          variant="contained"
          size="large"
          sx={{ px: 5, py: 1.4, fontSize: "1.2rem", borderRadius: 2 }}
          onClick={handleCreateAccount}
        >
          Create Account
        </Button>
      </Box>
    </Box>
  );
};

export default LandingPage;
