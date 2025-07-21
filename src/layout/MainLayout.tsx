import { Box } from "@mui/material";
import type { ReactNode } from "react";

type MainLayoutProps = {
  children: ReactNode;
  darkMode: boolean;
  centeredContent?: boolean;
};

const MainLayout = ({
  children,
  darkMode,
  centeredContent = false,
}: MainLayoutProps) => {
  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        background: darkMode
          ? "linear-gradient(135deg, #1e1e1e, #2c2c2c)"
          : "linear-gradient(135deg, #f8f9fa, #e9ecef)",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "1200px",
          margin: "0 auto",
          px: { xs: 2, sm: 3 },
          flex: 1, // ✅ Fill available height
          display: centeredContent ? "flex" : "block",
          alignItems: centeredContent ? "center" : "initial",
          justifyContent: centeredContent ? "center" : "initial",
          ...(centeredContent ? {} : { py: 3 }),
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default MainLayout;
