import { Box, Text } from "@chakra-ui/react";
import NavBar from "../components/NavBar";

type DashboardLayoutProps = {
  children: React.ReactNode;
  topbarContent?: React.ReactNode;
};

const SIDEBAR_WIDTH = 240;

export default function DashboardLayout({
  children,
  topbarContent,
}: DashboardLayoutProps) {
  return (
    <Box display="flex" bg="gray.100" minH="100vh">
      {/* Sidebar */}
      <Box
        position="fixed"
        top="0"
        left="0"
        width={`${SIDEBAR_WIDTH}px`}
        height="100vh"
        bg="white"
        borderRight="1px solid"
        borderColor="gray.300"
        p="4"
        zIndex={1000}
      >
        <NavBar />
      </Box>

      <Box ml={`${SIDEBAR_WIDTH}px`}>
        {/* Topbar - Fixed at top of page, aligned right of sidebar */}
        <Box
          position="fixed"
          top="0"
          left={`${SIDEBAR_WIDTH}px`}
          right="0"
          height="64px"
          bg="white"
          borderBottom="1px solid"
          borderColor="gray.300"
          display="flex"
          alignItems="center"
          px="6"
          zIndex={900}
        >
          {topbarContent ?? <Text fontWeight="bold">Topbar</Text>}
        </Box>

        {/* Main content */}
        <Box pt="64px">{children}</Box>
      </Box>
    </Box>
  );
}
