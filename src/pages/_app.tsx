import { CanvasContext } from "@/components/hooks/useCanvas";
import { ThemeStateProvider } from "@/components/hooks/useTheme";
import { Box } from "@/components/unit/Box";
import { Canvas } from "@/components/unit/Canvas";
import type { AppProps } from "next/app";
import { useRef } from "react";

const App = ({ Component, pageProps }: AppProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  return (
    <ThemeStateProvider>
      <CanvasContext.Provider value={canvasRef}>
        <Canvas ref={canvasRef} position="absolute" zIndex={9999} />
        <Box position="relative" zIndex={0}>
          <Component {...pageProps} />
        </Box>
      </CanvasContext.Provider>
    </ThemeStateProvider>
  );
};

export default App;
