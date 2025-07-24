import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { MainDataProvider } from "./context/MainContext.jsx";
import { store } from "./store";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import posthog from "posthog-js";

// Only initialize PostHog in production environment
if (import.meta.env.PROD) {
  posthog.init("phc_MtqSmGA6SjoVvMu7KrCMGEyKpOoo2GtCY6bGk9wKUTy", {
    api_host: "https://us.i.posthog.com",
    person_profiles: "identified_only", // or 'always' to create profiles for anonymous users as well
  });
}

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Provider store={store}>
        <MainDataProvider>
          <App />
        </MainDataProvider>
      </Provider>
    </BrowserRouter>
  </QueryClientProvider>
);
