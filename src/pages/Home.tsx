// src/pages/Home.tsx
import { useAuth } from "../context/AuthContext";
import LandingPage from "./LandingPage";
import Dashboard from "./Dashboard";

const Home = ({
  darkMode,
  onToggleDarkMode,
}: {
  darkMode: boolean;
  onToggleDarkMode: () => void;
}) => {
  const { isAuthenticated, authChecked } = useAuth();

  if (!authChecked) return null; // or a spinner

  return isAuthenticated ? (
    <Dashboard />
  ) : (
    <LandingPage darkMode={darkMode} onToggleDarkMode={onToggleDarkMode} />
  );
};

export default Home;
