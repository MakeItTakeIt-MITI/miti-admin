import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Auth from "./pages/Auth.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import UserList from "./pages/UserList.tsx";
import ReportsCategory from "./pages/ReportsCategory.tsx";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ReportDetail from "./pages/ReportDetail.tsx";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { element: <Auth />, path: "/" },
      { element: <Dashboard />, path: "/dashboard/main" },
      { element: <UserList />, path: "/users/list" },
      {
        path: "/reports",
        children: [
          { path: "category", element: <ReportsCategory /> },
          { path: "category/:id", element: <ReportDetail /> },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <RouterProvider router={router}></RouterProvider>
    </QueryClientProvider>
    <App />
  </StrictMode>
);
