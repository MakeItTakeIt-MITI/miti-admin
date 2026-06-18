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
import TeamsList from "./pages/teams/TeamsList.tsx";
import TeamDetails from "./pages/teams/TeamDetails.tsx";
import CourtDetails from "./pages/courts/CourtDetails.tsx";
import { ReportDetails } from "./pages/reports/ReportDetails.tsx";
import CouponsPage from "./pages/coupons/CouponsPage.tsx";
import NotificationsList from "./pages/notifications/NotificationsList.tsx";
import NotificationCreate from "./pages/notifications/NotificationCreate.tsx";
import NotificationDetail from "./pages/notifications/NotificationDetail.tsx";
import PopupsList from "./pages/popups/PopupsList.tsx";
import PopupCreate from "./pages/popups/PopupCreate.tsx";
import PopupDetail from "./pages/popups/PopupDetail.tsx";
import AdvertisementCreate from "./pages/popups/AdvertisementCreate.tsx";
import AdvertisementDetail from "./pages/popups/AdvertisementDetail.tsx";
import ReviewsList from "./pages/reviews/ReviewsList.tsx";
import ReviewDetails from "./pages/reviews/ReviewDetails.tsx";

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
        path: "teams",
        children: [
          { path: "", element: <TeamsList /> },
          { path: "detail", element: <TeamDetails /> },
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
      {
        path: "reviews",
        children: [
          { path: "", element: <ReviewsList /> },
          { path: "detail", element: <ReviewDetails /> },
        ],
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
      {
        path: "coupons",
        children: [{ path: "", element: <CouponsPage /> }],
      },
      {
        path: "notifications",
        children: [
          { path: "", element: <NotificationsList /> },
          { path: "create", element: <NotificationCreate /> },
          { path: ":id", element: <NotificationDetail /> },
        ],
      },
      {
        path: "popups",
        children: [
          { path: "", element: <PopupsList /> },
          { path: "create", element: <PopupCreate /> },
          { path: "detail", element: <PopupDetail /> },
          { path: "advertisements/create", element: <AdvertisementCreate /> },
          { path: "advertisements/detail", element: <AdvertisementDetail /> },
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
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="dark"
      />
    </QueryClientProvider>
  </StrictMode>,
);
