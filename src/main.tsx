import React from "react";
import { createRoot } from "react-dom/client";
import { ErrorBoundary } from "react-error-boundary";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { ErrorFallback } from "./components/ErrorBoundary";
import { Provider } from "@/components/ui/provider";

const container = document.getElementById("root");
if (container == null) {
  throw new Error("The #root element wasn't found");
}

const root = createRoot(container);
const queryClient = new QueryClient();

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
