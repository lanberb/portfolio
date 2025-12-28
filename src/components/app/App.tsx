import { Global } from "@emotion/react";
import { StrictMode } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GlobalCanvasProvider } from "@/components/hooks/useGlobalCanvas";
import { I18nStateProvider } from "@/components/hooks/useI18n";
import { ThemeStateProvider } from "@/components/hooks/useTheme";
import { GlobalCanvas } from "@/components/modules/GlobalCanvas";
import { GlobalFootprintDialog } from "@/components/modules/GlobalFootprintDialog";
import { GlobalNavigation } from "@/components/modules/GlobalNavigation";
import { Page as BlogPage } from "@/components/pages/blog";
import { Page as TopPage } from "@/components/pages/top";
import { createGlobalStyles } from "@/components/styles/globalStyles";
import { routes } from "@/util/routes";
import { ErrorBoundary } from "./ErrorBoundary";

function App() {
  return (
    <StrictMode>
      <ErrorBoundary fallback={<div>Something went wrong.</div>}>
        <BrowserRouter>
          <I18nStateProvider>
            <ThemeStateProvider>
              <GlobalCanvasProvider>
                <Global styles={createGlobalStyles} />
                <GlobalCanvas />
                <GlobalNavigation />
                <GlobalFootprintDialog />

                <Routes>
                  <Route path={routes.top} element={<TopPage />} />
                  <Route path={routes.blog} element={<BlogPage />} />
                </Routes>
              </GlobalCanvasProvider>
            </ThemeStateProvider>
          </I18nStateProvider>
        </BrowserRouter>
      </ErrorBoundary>
    </StrictMode>
  );
}

export default App;
