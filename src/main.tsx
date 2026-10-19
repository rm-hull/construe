import { ErrorFallback } from "@rm-hull/chakra-error-fallback";
import React from "react";
import { createRoot } from "react-dom/client";
import { ErrorBoundary } from "react-error-boundary";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "@/components/ui/provider";
import { getLocale } from "./utils/locale";
import { fetchWordList } from "./hooks/useWordList";
import App from "./App";

const container = document.getElementById("root");
if (container == null) {
  throw new Error("The #root element wasn't found");
}

const root = createRoot(container);
const queryClient = new QueryClient();

const locale = getLocale();
queryClient.prefetchQuery(["words", locale], () => fetchWordList(locale));

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <Provider>
        <BrowserRouter basename="/construe">
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <App />
          </ErrorBoundary>
        </BrowserRouter>
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>
);
