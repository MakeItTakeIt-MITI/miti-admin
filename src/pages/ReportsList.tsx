import { useEffect, useState } from "react";
import { useUserStore } from "../store/useUserStore";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useReportsListHook } from "../hook/useReportsListHook";

import FlagIcon from "@mui/icons-material/Flag";
import FindInPageIcon from "@mui/icons-material/FindInPage";

import PaginationBtns from "../components/common/PaginationBtns";
import { ReportField } from "../interface/reports";
import Drawer from "../components/reports/Drawer";
import { useReportersListHook } from "../hook/useReportersListHook";

const ReportsList = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [gameId, setGameId] = useState<null | number>(null);
  const [reportId, setReportId] = useState<null | number>(null);
  const [reportStatus, setReportStatus] = useState("string");

  console.log(reportId);

  const { isLoggedIn, logout } = useUserStore();
  const navigate = useNavigate();

  const { data: reportsListData } = useReportsListHook(currentPage);
  const { data: reportersListData } = useReportersListHook(gameId);

  const endIndex = reportsListData?.data.end_index;

  const userSessionStorage = sessionStorage.getItem("accessToken");

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }

    if (!userSessionStorage) {
      logout();
    }
  }, [navigate, isLoggedIn, logout, userSessionStorage]);

  return (
    <section className="flex h-screen bg-[#f8f8f9] relative">
      {/*  */}
      {openDrawer && (
        <Drawer
          setOpenDrawer={setOpenDrawer}
          reportersListData={reportersListData}
          reportStatus={reportStatus}
        />
      )}
      {/*  */}

      <Sidebar />
      <div className="p-10 space-y-6 w-full">
        <div className=" bg-white rounded-[12px] p-4 flex items-center gap-2">
          <FlagIcon fontSize="large" />
          <h1 className="font-bold text-[28px]">신고 목록</h1>
        </div>

        <div className="bg-white rounded-[12px] p-4 min-h-[50rem] flex flex-col  justify-between ">
          <>
            <table
              style={{ tableLayout: "fixed" }}
              cellPadding="12"
              className="w-full h-full"
            >
              <thead>
                <tr className="">
                  <th>신고 ID</th>
                  <th>신고된 사용자 ID</th>
                  <th>경기 ID</th>
                  <th>카테고리</th>
                  <th>신고 상태</th>
                  <th>등록 시간</th>
                  <th>신고 상세</th>
                </tr>
              </thead>
              <tbody>
                {reportsListData?.data?.page_content.length >= 1 &&
                  reportsListData?.data?.page_content.map(
                    (page: ReportField) => (
                      <tr
                        key={page.id}
                        className=" border-b border-gray-200 text-center text-[14px] hover:bg-gray-100"
                      >
                        <td>{page.id}</td>
                        <td>{page.reportee}</td>
                        <td>{page.game}</td>

                        <td>
                          {page.category === "intentional_cheating" &&
                            "허위 경기 운영 "}
                          {page.category === "incorrect_information" &&
                            "정확한 경기 정보"}
                          {page.category === "etc" && "기타 신고 사유"}
                          {/* {page.category === "game" && "경기"}
                          {page.category === "settlement" && "정산"}
                          {page.category === "review" && "리뷰"}
                          {page.category === "report" && "신고"}
                          {page.category === "etc" && "기타"} */}
                        </td>
                        <td>
                          {page.report_status === "waiting" && "대기중"}

                          {page.report_status === "evidence_requested" &&
                            "관련 자료 요청 상태"}

                          {page.report_status === "investigation_in_progress" &&
                            "신고 처리중"}

                          {page.report_status === "concluded" &&
                            "신고 처리 완료"}
                        </td>
                        <td>
                          {page.created_at.slice(0, 10)} (
                          {page.created_at.slice(11, 16)})
                        </td>
                        <td>
                          <FindInPageIcon
                            sx={{ color: "gray" }}
                            onClick={() => {
                              setGameId(page.game);
                              setReportId(page.id);
                              setOpenDrawer(true);
                              setReportStatus(page.report_status);
                            }}
                            className="hover:cursor-pointer"
                          />
                        </td>
                      </tr>
                    )
                  )}
              </tbody>
            </table>
            <PaginationBtns
              spacing={2}
              count={endIndex}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </>
        </div>
      </div>
    </section>
  );
};

export default ReportsList;
