import { StrictMode } from "react";
import { hydrateRoot, createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";

const main = () => {
  const root = document.getElementById("root");

  if (root == null) {
    throw new Error("Root Element could not be found.");
  }

  const appElement = (
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>
  );

  // SSRされたHTMLがある場合はhydrate、ない場合は通常のrender
  if (root.hasChildNodes()) {
    hydrateRoot(root, appElement);
  } else {
    createRoot(root).render(appElement);
  }
};

main();
