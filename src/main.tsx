import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Auth from "./pages/Auth.tsx";
import Dashboard from "./pages/Dashboard.tsx";
const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { element: <Auth />, path: "/" },
      { element: <Dashboard />, path: "/dashboard" },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      <RouterProvider router={router}></RouterProvider>
    </QueryClientProvider>
    <App />
  </StrictMode>
);
