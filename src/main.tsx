import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Auth from "./pages/Auth.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import UserList from "./pages/UserList.tsx";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Settlements from "./pages/Settlements.tsx";
import ReportsList from "./pages/ReportsList.tsx";
import GamesList from "./pages/GamesList.tsx";
import PrivateInquiriesList from "./pages/PrivateInquiriesList.tsx";
import GameDetails from "./pages/GameDetails.tsx";
import ReportDetails from "./pages/ReportDetails.tsx";

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
          { path: "category", element: <ReportsList /> },
          {
            path: "category/:reported_game_id/:report_id",
            element: <ReportDetails />,
          },
        ],
      },
      {
        path: "settlements",
        children: [{ path: "list", element: <Settlements /> }],
      },
      {
        path: "games",
        children: [
          { path: "list", element: <GamesList /> },
          { path: ":id", element: <GameDetails /> },
        ],
      },
      {
        path: "support",
        children: [{ path: "list", element: <PrivateInquiriesList /> }],
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
  </StrictMode>
);
