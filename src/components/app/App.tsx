import { Global } from "@emotion/react";
import { StrictMode } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GlobalBackgroundCanvas } from "@/components/modules/GlobalBackgroundCanvas";
import { GlobalCreateStickerDialog } from "@/components/modules/GlobalCreateStickerDialog";
import { GlobalNavigation } from "@/components/modules/GlobalNavigation";
import { AboutPage } from "@/components/pages/about";
import { BlogPage } from "@/components/pages/blog";
import { HelloPage } from "@/components/pages/hello";
import { TopPage } from "@/components/pages/top";
import { createGlobalStyles } from "@/components/styles/globalStyles";
import { I18nStateProvider } from "@/hooks/useI18n";
import { ThemeStateProvider } from "@/hooks/useTheme";
import { routes } from "@/util/routes";
import { ErrorBoundary } from "./ErrorBoundary";

function App() {
  return (
    <StrictMode>
      <ErrorBoundary fallback={<div>Something went wrong.</div>}>
        <BrowserRouter>
          <I18nStateProvider>
            <ThemeStateProvider>
              <Global styles={createGlobalStyles} />
              <GlobalBackgroundCanvas />
              <GlobalNavigation />
              <GlobalCreateStickerDialog />

              <Routes>
                <Route path={routes.top} element={<TopPage />} />
                <Route path={routes.about} element={<AboutPage />} />
                <Route path={routes.blog} element={<BlogPage />} />
                <Route path={routes.hello} element={<HelloPage />} />
              </Routes>
            </ThemeStateProvider>
          </I18nStateProvider>
        </BrowserRouter>
      </ErrorBoundary>
    </StrictMode>
  );
}

export default App;
