import { routes } from "@/lib/router/routes";
import { createGlobalStyles } from "@/styles/globalStyles";
import { Global } from "@emotion/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { I18nStateProvider } from "../hooks/useI18n";
import { ThemeStateProvider } from "../hooks/useTheme";
import { ConnectedFootprintDialog } from "../modules/FootprintDialog";
import { GlobalCanvas } from "../modules/GlobalCanvas";
import { GlobalNavigation } from "../modules/GlobalNavigation";
import { AboutPage } from "../pages/about";
import { BlogPage } from "../pages/blog";
import { TopPage } from "../pages/top";

function App() {
  return (
    <BrowserRouter>
      <I18nStateProvider>
        <ThemeStateProvider>
          <Global styles={createGlobalStyles} />
          <GlobalCanvas />
          <GlobalNavigation />
          <ConnectedFootprintDialog />
          <Routes>
            <Route path="/" element={<TopPage />} />
            <Route path={routes.about} element={<AboutPage />} />
            <Route path={routes.blog} element={<BlogPage />} />
          </Routes>
        </ThemeStateProvider>
      </I18nStateProvider>
    </BrowserRouter>
  );
}

export default App;
