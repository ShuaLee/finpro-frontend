import { Box } from "@mui/material";
import { useLocation } from "react-router-dom";
import TopNavBar from "../components/TopNavBar";
import MainLayout from "./MainLayout";

type AppLayoutProps = {
  darkMode: boolean;
  toggleDarkMode: () => void;
  isAuthenticated: boolean;
  children: React.ReactNode;
};

const AppLayout = ({
  darkMode,
  toggleDarkMode,
  isAuthenticated,
  children,
}: AppLayoutProps) => {
  const { pathname } = useLocation();

  let hideProfileAndMenu = false;
  let hideNavLinks = false;
  let centeredContent = false;

  if (pathname === "/login" || pathname === "/create-account") {
    hideProfileAndMenu = true;
    centeredContent = true;
  } else if (pathname === "/") {
    hideProfileAndMenu = true;
    hideNavLinks = true;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh", // ✅ Full height for app
      }}
    >
      <TopNavBar
        darkMode={darkMode}
        onToggleDarkMode={toggleDarkMode}
        hideProfileAndMenu={!isAuthenticated || hideProfileAndMenu}
        hideNavLinks={hideNavLinks}
      />
      <MainLayout darkMode={darkMode} centeredContent={centeredContent}>
        {children}
      </MainLayout>
    </Box>
  );
};

export default AppLayout;
