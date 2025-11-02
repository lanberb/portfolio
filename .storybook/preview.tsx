import type { Preview } from "@storybook/react";
import React from "react";
import { Global } from "@emotion/react";
import { BrowserRouter } from "react-router-dom";
import { I18nStateProvider } from "../src/components/hooks/useI18n";
import { ThemeStateProvider } from "../src/components/hooks/useTheme";
import { createGlobalStyles } from "../src/styles/globalStyles";
import { themeKeyMap } from "../src/styles/theme";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <BrowserRouter>
        <I18nStateProvider>
          <ThemeStateProvider>
            <Global styles={createGlobalStyles(themeKeyMap.light)} />
            <Story />
          </ThemeStateProvider>
        </I18nStateProvider>
      </BrowserRouter>
    ),
  ],
};

export default preview;