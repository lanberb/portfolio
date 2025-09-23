import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";

const main = () => {
  const root = document.getElementById("root");

  if (root == null) {
    throw new Error("Root Element could not be found.");
  }

  createRoot(root).render(
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>,
  );
};

main();
