import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Auth from "./pages/Auth.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import UserList from "./pages/users/UserList.tsx";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Settlements from "./pages/settlements/Settlements.tsx";
import ReportsList from "./pages/reports/ReportsList.tsx";
import GamesList from "./pages/games/GamesList.tsx";
import InquiresList from "./pages/inquiries/InquiresList.tsx";
import GameDetails from "./pages/games/GameDetails.tsx";
import ReportDetails from "./pages/ReportDetails.tsx";
import NotFound from "./pages/NotFound.tsx";
import GamePayments from "./pages/GamePayments.tsx";
import { UserDetails } from "./pages/users/UserDetails.tsx";
import { InquiryDetails } from "./pages/inquiries/InquiryDetails.tsx";
import { SettlementDetail } from "./pages/settlements/SettlementDetail.tsx";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { element: <Auth />, path: "/" },
      { element: <Dashboard />, path: "/dashboard" },
      {
        path: "/users",
        children: [
          { path: "", element: <UserList /> },
          { path: ":userId", element: <UserDetails /> },
        ],
      },
      {
        path: "/reports",
        children: [
          { path: "", element: <ReportsList /> },
          {
            path: ":reportId",
            element: <ReportDetails />,
          },
        ],
      },
      {
        path: "settlements",
        children: [
          { path: "", element: <Settlements /> },
          { path: ":requestId", element: <SettlementDetail /> },
        ],
      },
      {
        path: "games",
        children: [
          { path: "", element: <GamesList /> },
          { path: ":id", element: <GameDetails /> },
        ],
      },
      {
        path: "support",
        children: [
          { path: "", element: <InquiresList /> },
          { path: ":id", element: <InquiryDetails /> },
        ],
      },
      { path: "payments", element: <GamePayments /> },
      { path: "*", element: <NotFound /> },
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
