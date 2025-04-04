import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Add TypeScript declaration for the custom property
declare global {
  interface Window {
    __REPLIT_APP_LOADED__?: boolean;
  }
}

// Add debugging info to console
console.log("NumberLaunch application starting...");
console.log("Environment:", import.meta.env.MODE);
console.log("Base URL:", import.meta.env.BASE_URL);

// Mount React app
const root = createRoot(document.getElementById("root")!);
root.render(<App />);

// Add global info for web application feedback tool
window.__REPLIT_APP_LOADED__ = true;
