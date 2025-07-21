import { useAuth } from "../context/AuthContext";
import LandingPage from "./LandingPage";
import Dashboard from "./Dashboard";
import { CircularProgress, Box } from "@mui/material";

type HomeProps = {
  darkMode: boolean;
};

const Home = ({ darkMode }: HomeProps) => {
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

  return isAuthenticated ? (
    <Dashboard darkMode={darkMode} />
  ) : (
    <LandingPage darkMode={darkMode} />
  );
};

export default Home;
