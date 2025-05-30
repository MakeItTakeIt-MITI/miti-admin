import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Auth from "./pages/Auth.tsx";
import UserList from "./pages/users/UserList.tsx";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import TransferStatus from "./pages/settlements/TransferStatus.tsx";
import ReportsList from "./pages/reports/ReportsList.tsx";
import GamesList from "./pages/games/GamesList.tsx";
import UserInquriesList from "./pages/inquiries/UserInquriesList.tsx";
import GameDetails from "./pages/games/GameDetails.tsx";
import ReportDetails from "./pages/ReportDetails.tsx";
import NotFound from "./pages/NotFound.tsx";
import GamePayments from "./pages/GamePayments.tsx";
import { UserDetails } from "./pages/users/UserDetails.tsx";
import { InquiryDetails } from "./pages/inquiries/InquiryDetails.tsx";
import PrivateRoute from "./pages/PrivateRoute.tsx";
import Home from "./pages/Home.tsx";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  { element: <Auth />, path: "/login" },
  {
    element: <PrivateRoute />,
    path: "/",
    children: [
      { element: <Home />, path: "" },
      {
        path: "/users",
        children: [
          { path: ``, element: <UserList /> },
          { path: "detail", element: <UserDetails /> },
        ],
      },
      {
        path: "games",
        children: [
          { path: "", element: <GamesList /> },
          { path: "detail", element: <GameDetails /> },
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
        children: [{ path: "", element: <TransferStatus /> }],
      },
      { path: "payments", element: <GamePayments /> },
      {
        path: "support",
        children: [
          { path: "", element: <UserInquriesList /> },
          { path: ":id", element: <InquiryDetails /> },
        ],
      },
    ],
  },
  { path: "*", element: <NotFound /> },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <RouterProvider router={router}></RouterProvider>
    </QueryClientProvider>
  </StrictMode>
);
