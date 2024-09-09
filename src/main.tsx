import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Auth from "./pages/Auth.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import UserList from "./pages/UserList.tsx";
import ReportDetail from "./pages/ReportDetail.tsx";
const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { element: <Auth />, path: "/" },
      { element: <Dashboard />, path: "/dashboard" },
      { element: <UserList />, path: "/users" },
      {
        path: "/reports",
        children: [
          // { path: "categories", element: <Reports /> },
          { path: ":id", element: <ReportDetail /> },
          // { path: "guest", element: <ReportedGuests /> },
        ],
      },
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
