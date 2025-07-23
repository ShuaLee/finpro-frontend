import { Box, Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

const LandingPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  // ✅ Redirect if user is logged in
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        flex: 1, // ✅ Ensures full height inside MainLayout
      }}
    >
      {/* Hero Section */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          py: { xs: 4, md: 6 },
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
          Manage your stocks, crypto, ETFs, and real estate seamlessly.
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

      {/* Features Section */}
      <Container sx={{ py: 10 }}>{/* Feature grid remains */}</Container>
    </Box>
  );
};

export default LandingPage;
