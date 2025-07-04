import { Provider } from "@/components/ui/provider";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ColorModeProvider } from "./components/ui/color-mode.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ColorModeProvider>
      <Provider>
        <App />
      </Provider>
    </ColorModeProvider>
  </StrictMode>
);
