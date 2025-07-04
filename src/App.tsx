import { Text } from "@chakra-ui/react";
import DashboardLayout from "./components/DashboardLayout";

function App() {
  return (
    <DashboardLayout
      topbarContent={<Text fontWeight="bold">Dashboard / Reports</Text>}
    >
      <Text>Main content goes here</Text>
    </DashboardLayout>
  );
}

export default App;
