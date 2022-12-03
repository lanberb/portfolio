import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Loading } from "./pages/loading";

const container = document.querySelector("#root")!;
const root = createRoot(container);

const RoutingMap: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Loading />} path="/" />
      </Routes>
    </BrowserRouter>
  );
};

root.render(
  <React.StrictMode>
    <RoutingMap />
  </React.StrictMode>
);
