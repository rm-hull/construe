import { ChakraProvider, ColorModeScript, createLocalStorageManager } from "@chakra-ui/react";
import React from "react";
import { createRoot } from "react-dom/client";
import { ErrorBoundary } from "react-error-boundary";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import ErrorFallback from "./components/ErrorBoundary";
import { theme } from "./theme";

const container = document.getElementById("root");
if (container == null) {
  throw new Error("The #root element wasn't found");
}

const root = createRoot(container);
const manager = createLocalStorageManager("construe.color-mode");
const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
    <ColorModeScript storageKey="maps.color-mode" />
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <ChakraProvider theme={theme} colorModeManager={manager}>
        <BrowserRouter basename="/construe">
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <App />
          </ErrorBoundary>
        </BrowserRouter>
      </ChakraProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
