import { Global } from "@emotion/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createGlobalStyles } from "@/components/styles/globalStyles";
import { routes } from "@/util/routes";
import { I18nStateProvider } from "../../hooks/useI18n";
import { ThemeStateProvider } from "../../hooks/useTheme";
import { ConnectedCreateStickerDialog } from "../modules/CreateStickerDialog";
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
            <ConnectedCreateStickerDialog />
            <Routes>
              <Route path="/" element={<TopPage />} />
              <Route path={routes.about} element={<AboutPage />} />
              <Route path={routes.blog} element={<BlogPage />} />
            </Routes>
            <GlobalNavigation />
          </ThemeStateProvider>
        </I18nStateProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
