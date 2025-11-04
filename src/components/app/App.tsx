import { Global } from "@emotion/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GlobalNavigation } from "@/components/modules/GlobalNavigation";
import { ConnectedTopCreateStickerDialog } from "@/components/modules/TopCreateStickerDialog";
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
    <ErrorBoundary fallback={<div>Something went wrong.</div>}>
      <BrowserRouter>
        <I18nStateProvider>
          <ThemeStateProvider>
            <Global styles={createGlobalStyles} />
            <ConnectedTopCreateStickerDialog />
            <Routes>
              <Route
                path={routes.top}
                element={<TopPage />}
              />
              <Route path={routes.about} element={<AboutPage />} />
              <Route path={routes.blog} element={<BlogPage />} />
              <Route path={routes.hello} element={<HelloPage />} />
            </Routes>
            <GlobalNavigation />
          </ThemeStateProvider>
        </I18nStateProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
