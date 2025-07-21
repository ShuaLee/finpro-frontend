import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layout/MainLayout";

const NotFoundPage = ({ darkMode }: { darkMode: boolean }) => {
  const navigate = useNavigate();

  return (
    <MainLayout darkMode={darkMode}>
      <Box
        sx={{
          minHeight: "70vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          py: 8,
        }}
      >
        <Typography
          variant="h1"
          fontWeight="bold"
          sx={{ fontSize: { xs: "6rem", md: "8rem" }, mb: 2 }}
        >
          404
        </Typography>
        <Typography variant="h5" gutterBottom>
          Page Not Found
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          The page you’re looking for doesn’t exist or has been moved.
        </Typography>
        <Button
          variant="contained"
          size="large"
          sx={{ px: 4, py: 1.2, fontSize: "1rem" }}
          onClick={() => navigate("/")}
        >
          Go to Home
        </Button>
      </Box>
    </MainLayout>
  );
};

export default NotFoundPage;
