import { routes } from "@/lib/router/routes";
import { createGlobalStyles } from "@/styles/globalStyles";
import { Global } from "@emotion/react";
import { Route, Routes } from "react-router-dom";
import { ThemeStateProvider } from "../hooks/useTheme";
import { AboutPage } from "../pages/about";
import { BlogPage } from "../pages/blog";
import { TopPage } from "../pages/top";
import { Navigation } from "../sections/Navigation";

function App() {
  return (
    <>
      <ThemeStateProvider>
        <Global styles={createGlobalStyles} />
        <Navigation />
        <Routes>
          <Route path="/" element={<TopPage />} />
          <Route path={routes.about} element={<AboutPage />} />
          <Route path={routes.blog} element={<BlogPage />} />
        </Routes>
      </ThemeStateProvider>
    </>
  );
}

export default App;
