import { useEffect, useState } from "react";
import { useUserStore } from "../store/useUserStore";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useReportsListHook } from "../hook/useReportsListHook";

import FlagIcon from "@mui/icons-material/Flag";

import PaginationBtns from "../components/common/PaginationBtns";
import { ReportField } from "../interface/reports";
import PlagiarismIcon from "@mui/icons-material/Plagiarism";
import Drawer from "../components/reports/Drawer";
import { useReportDetailsHook } from "../hook/useReportDetailsHook";
const ReportCategories = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [reportId, setReportId] = useState<null | number>(null);

  const { isLoggedIn } = useUserStore();
  const navigate = useNavigate();

  const { data: reportsListData } = useReportsListHook(currentPage);
  const { data: reportDetailsData } = useReportDetailsHook(reportId);

  const endIndex = reportsListData?.data.end_index;

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [navigate, isLoggedIn]);

  return (
    <section className="flex h-screen bg-[#f8f8f9] relative">
      {openDrawer && (
        <Drawer
          setOpenDrawer={setOpenDrawer}
          reportDetailsData={reportDetailsData}
        />
      )}
      <Sidebar />
      <div className="p-10 space-y-6 w-full">
        <div className=" bg-white rounded-[12px] p-4 flex items-center gap-2">
          <FlagIcon fontSize="large" />
          <h1 className="font-bold text-[28px]">신고 목록</h1>
        </div>

        <div className="bg-white rounded-[12px] p-4 min-h-[40rem] flex flex-col  justify-between ">
          <>
            <table
              style={{ tableLayout: "fixed" }}
              cellPadding="10"
              className="w-full h-full"
            >
              <thead>
                <tr className="">
                  <th>사용자 ID</th>
                  <th>신고자 ID</th>
                  <th>경기 ID</th>
                  <th>카테고리</th>
                  <th>신고 상태</th>
                  <th>등록 시간</th>
                  <th>상세</th>
                </tr>
              </thead>
              <tbody>
                {reportsListData?.data.page_content.map((page: ReportField) => (
                  <>
                    <tr
                      key={page.id}
                      className=" border-b border-gray-200 text-center text-[14px] hover:bg-gray-100"
                    >
                      <td>{page.id}</td>
                      <td>{page.reportee}</td>
                      <td>{page.game}</td>
                      <td>{page.category}</td>
                      <td>{page.report_status}</td>
                      <td>
                        {page.created_at.slice(0, 10)} (
                        {page.created_at.slice(11, 16)})
                      </td>
                      <td>
                        <PlagiarismIcon
                          onClick={() => {
                            setReportId(page.id);
                            setOpenDrawer(true);
                          }}
                          className="hover:cursor-pointer"
                        />
                      </td>
                    </tr>
                  </>
                ))}
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

export default ReportCategories;
