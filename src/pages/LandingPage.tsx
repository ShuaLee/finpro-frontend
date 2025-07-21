import { Box, Button, Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layout/MainLayout";

type LandingPageProps = {
  darkMode: boolean;
};

const LandingPage = ({ darkMode }: LandingPageProps) => {
  const navigate = useNavigate();

  return (
    <MainLayout darkMode={darkMode}>
      {/* ✅ Hero Section */}
      <Box
        sx={{
          minHeight: "70vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          py: 6,
        }}
      >
        <Typography
          variant="h2"
          fontWeight="bold"
          gutterBottom
          sx={{ fontSize: { xs: "2rem", md: "3rem" } }}
        >
          Track All Your Investments in One Place
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{ maxWidth: 700, mx: "auto", mb: 4 }}
        >
          Manage your stocks, crypto, ETFs, and real estate seamlessly. Get
          insights, automate reports, and stay ahead of the market.
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
            onClick={() => navigate("/create-account")}
          >
            Get Started
          </Button>
          <Button
            variant="outlined"
            size="large"
            sx={{ px: 4, py: 1.2, fontSize: "1.1rem", borderRadius: 2 }}
            onClick={() => navigate("/login")}
          >
            Log In
          </Button>
        </Box>
      </Box>

      {/* ✅ Features Section */}
      <Container sx={{ py: 10 }}>
        {/* Feature 1 */}
        <Grid container spacing={6} sx={{ mb: 10 }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              All Your Accounts in One Dashboard
            </Typography>
            <Typography color="text.secondary" mb={3}>
              Connect your brokerage accounts, crypto wallets, and bank
              accounts. Visualize your net worth in real-time.
            </Typography>
            <Button
              variant="text"
              size="large"
              onClick={() => navigate("/create-account")}
            >
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
        <Grid container spacing={6} sx={{ mb: 10 }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              component="img"
              src="https://via.placeholder.com/600x400"
              alt="Analytics"
              sx={{ width: "100%", borderRadius: 3, boxShadow: 3 }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              AI Insights & Performance Analytics
            </Typography>
            <Typography color="text.secondary" mb={3}>
              Leverage advanced AI-powered analytics to optimize your portfolio.
              Understand trends, risks, and potential growth areas.
            </Typography>
            <Button
              variant="text"
              size="large"
              onClick={() => navigate("/create-account")}
            >
              Learn More →
            </Button>
          </Grid>
        </Grid>

        {/* Feature 3 */}
        <Grid container spacing={6}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              Bank-Level Security
            </Typography>
            <Typography color="text.secondary" mb={3}>
              Your data is encrypted and stored with industry-leading security
              standards. Enable two-factor authentication for added protection.
            </Typography>
            <Button
              variant="text"
              size="large"
              onClick={() => navigate("/create-account")}
            >
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
          Join thousands of investors already using our platform.
        </Typography>
        <Button
          variant="contained"
          size="large"
          sx={{ px: 5, py: 1.4, fontSize: "1.2rem", borderRadius: 2 }}
          onClick={() => navigate("/create-account")}
        >
          Create Account
        </Button>
      </Box>
    </MainLayout>
  );
};

export default LandingPage;
