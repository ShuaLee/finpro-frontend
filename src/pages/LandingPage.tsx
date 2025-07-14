import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import TopNavBar from "../components/TopNavBar"; // adjust path as needed

const LandingPage = ({
  darkMode,
  onToggleDarkMode,
}: {
  darkMode: boolean;
  onToggleDarkMode: () => void;
}) => {
  const navigate = useNavigate();

  return (
    <>
      <TopNavBar
        darkMode={darkMode}
        onToggleDarkMode={onToggleDarkMode}
        hideNavLinks
        customRightButtons={
          <>
            <Button onClick={() => navigate("/login")} color="inherit">
              Log In
            </Button>
            <Button
              onClick={() => navigate("/create-account")}
              color="inherit"
              variant="outlined"
            >
              Create Account
            </Button>
          </>
        }
      />

      <Box
        sx={{
          width: "100%",
          minHeight: "calc(100vh - 100px)",
          bgcolor: "background.default",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: 2,
          py: 4,
        }}
      >
        <Box sx={{ maxWidth: 600, textAlign: "center" }}>
          <Typography variant="h3" gutterBottom>
            Welcome to FinPro
          </Typography>
          <Typography variant="h6" color="text.secondary" paragraph>
            Your personalized investment tracking platform. Sign up to manage
            your portfolio and get insights.
          </Typography>
          <Box
            sx={{ mt: 4, display: "flex", justifyContent: "center", gap: 2 }}
          >
            <Button
              variant="contained"
              onClick={() => navigate("/create-account")}
            >
              Get Started
            </Button>
            <Button variant="outlined" onClick={() => navigate("/login")}>
              Log In
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default LandingPage;
