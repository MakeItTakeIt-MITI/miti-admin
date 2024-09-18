import { useEffect, useState } from "react";
import { useUserStore } from "../store/useUserStore";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useReportsListHook } from "../hook/useReportsListHook";

import FlagIcon from "@mui/icons-material/Flag";

import PaginationBtns from "../components/common/PaginationBtns";
import { ReportField } from "../interface/reports";
import PlagiarismIcon from "@mui/icons-material/Plagiarism";
const ReportCategories = () => {
  const { isLoggedIn } = useUserStore();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [expanded, setExpanded] = useState<number | null>(null);

  const { data: reportsListData } = useReportsListHook(currentPage);

  const endIndex = reportsListData?.data.end_index;

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [navigate, isLoggedIn]);

  const handleChange = (panel: number) => {
    setExpanded(expanded === panel ? null : panel); // Toggle between opening/closing the accordion
  };
  return (
    <section className="flex h-screen bg-[#f8f8f9]">
      <Sidebar />
      <div className="p-10 space-y-6 w-full">
        <div className=" bg-white rounded-[12px] p-4 flex items-center gap-2">
          <FlagIcon fontSize="large" />
          <h1 className="font-bold text-[28px]">신고 목록</h1>
        </div>

        <div className="bg-white rounded-[12px] p-4 min-h-[40rem] flex flex-col  justify-between ">
          {/* {reportsListData?.data.page_content >= 1 ? ( */}
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
                      <PlagiarismIcon />
                    </td>
                  </tr>
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
          {/* ) : (
            <h1 className="flex items-center justify-center font-bold text-xl">
              사용자 목록이 없습니다.
            </h1>
          )} */}
          {/* <div className=""> */}
          {/* {reportsListData?.data.page_content.map((page: ReportField) => {
              return (
                <Accordion
                  key={page.id}
                  expanded={expanded === page.id}
                  onChange={() => handleChange(page.id)}
                >
                  <AccordionSummary
                    aria-controls="panel1-content"
                    expandIcon={<ExpandMoreIcon />}
                    id="panel1-header"
                  >
                    <div
                      style={{
                        display: "flex",
                        gap: "20px",
                      }}
                    >
                      <span> {page.id}</span>
                      <span> {page.category}</span>
                      <span> {page.report_status}</span>
                    </div>
                  </AccordionSummary>

                  <AccordionDetails>
                    <p className="bg-gray-200 p-4">
                      {" "}
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Suspendisse malesuada lacus ex, sit amet blandit leo
                      lobortis eget.
                    </p>
                  </AccordionDetails>
                </Accordion>
              );
            })} */}
          {/* </div> */}

          {/* <PaginationBtns
            spacing={2}
            count={endIndex}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          /> */}
        </div>
      </div>
    </section>
  );
};

export default ReportCategories;
