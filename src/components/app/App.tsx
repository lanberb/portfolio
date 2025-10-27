import { createGlobalStyles } from "@/styles/globalStyles";
import { routes } from "@/util/routes";
import { Global } from "@emotion/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { I18nStateProvider } from "../hooks/useI18n";
import { ThemeStateProvider } from "../hooks/useTheme";
import { ConnectedCreateStickerDialog } from "../modules/CreateStickerDialog";
import { GlobalCanvas } from "../modules/GlobalCanvas";
import { GlobalNavigation } from "../modules/GlobalNavigation";
import { AboutPage } from "../pages/about";
import { BlogPage } from "../pages/blog";
import { TopPage } from "../pages/top";
import { ErrorBoundary } from "./ErrorBoundary";

function App() {
  return (
    <ErrorBoundary fallback={<div>Something went wrong.</div>}>
      <BrowserRouter>
        <I18nStateProvider>
          <ThemeStateProvider>
            <Global styles={createGlobalStyles} />
            <GlobalCanvas />
            <GlobalNavigation />
            <ConnectedCreateStickerDialog />
            <Routes>
              <Route path="/" element={<TopPage />} />
              <Route path={routes.about} element={<AboutPage />} />
              <Route path={routes.blog} element={<BlogPage />} />
            </Routes>
          </ThemeStateProvider>
        </I18nStateProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
