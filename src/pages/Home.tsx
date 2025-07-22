import { useAuth } from "../context/AuthContext";
import LandingPage from "./LandingPage";
import Dashboard from "./Dashboard";
import { CircularProgress, Box } from "@mui/material";

const Home = () => {
  const { isAuthenticated, authChecked } = useAuth();

  if (!authChecked) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "80vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return isAuthenticated ? <Dashboard /> : <LandingPage />;
};

export default Home;
