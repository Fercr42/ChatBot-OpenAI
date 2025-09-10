import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ChatComponent } from "./module/chat.component.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ChatComponent />
  </StrictMode>
);
