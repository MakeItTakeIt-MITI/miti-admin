import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Auth from "./pages/Auth.tsx";
import UserList from "./pages/users/UserList.tsx";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import TransferStatus from "./pages/settlements/TransferStatus.tsx";
import ReportsList from "./pages/reports/ReportsList.tsx";
import GamesList from "./pages/games/GamesList.tsx";
import UserInquriesList from "./pages/inquiries/UserInquriesList.tsx";
import GameDetails from "./pages/games/GameDetails.tsx";
import NotFound from "./pages/NotFound.tsx";
import GamePayments from "./pages/GamePayments.tsx";
import { UserDetails } from "./pages/users/UserDetails.tsx";
import { InquiryDetails } from "./pages/inquiries/InquiryDetails.tsx";
import PrivateRoute from "./pages/PrivateRoute.tsx";
import Home from "./pages/Home.tsx";
import PrivateInquires from "./pages/inquiries/PrivateInquires.tsx";
import PrivateInquiryDetails from "./pages/inquiries/PrivateInquiryDetails.tsx";
import CourtsList from "./pages/courts/CourtsList.tsx";
import CourtDetails from "./pages/courts/CourtDetails.tsx";
import { ReportDetails } from "./pages/reports/ReportDetails.tsx";

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
        path: "courts",
        children: [
          { path: "", element: <CourtsList /> },
          { path: "detail", element: <CourtDetails /> },
        ],
      },
      {
        path: "/reports",
        children: [
          { path: "", element: <ReportsList /> },
          { path: "detail", element: <ReportDetails /> },
        ],
      },
      {
        path: "settlements",
        children: [{ path: "", element: <TransferStatus /> }],
      },
      { path: "payments", element: <GamePayments /> },
      {
        path: "inquiry",
        children: [
          { path: "", element: <UserInquriesList /> },
          { path: ":id", element: <InquiryDetails /> },
        ],
      },
      {
        path: "anonymous-inquiry",
        children: [
          { path: "", element: <PrivateInquires /> },
          { path: ":inquiryId", element: <PrivateInquiryDetails /> },
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
      <RouterProvider router={router} />
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="dark"
      />
    </QueryClientProvider>
  </StrictMode>
);
