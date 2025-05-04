// import { useState } from "react";
// import { Link } from "react-router-dom";
// import { useReportsListHook } from "../hook/useReportsListHook";
import FeedIcon from "@mui/icons-material/Feed";

// import FindInPageIcon from "@mui/icons-material/FindInPage";

// import PaginationBtns from "../components/common/PaginationBtns";
// import { ReportField } from "../interface/reports";
import { PageLayout } from "../../features/common/PageLayout";
import { useReportsListHook } from "../../features/reports/hook/useReportsListHook";
import { Link } from "react-router-dom";
import { TableLayout } from "../../components/common/TableLayout";
import { useState } from "react";
import PaginationBtns from "../../components/common/PaginationBtns";

const ReportsList = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { data, isLoading } = useReportsListHook();
  const endIndex = data?.data.end_index;
  const reportList = data?.data.page_content;
  const headers = [
    "신고 ID",
    "reportee",
    "경기 ID",
    // "카테고리",
    "신고 상태",
    "접수일",
    "상세",
  ];
  const tableData =
    !isLoading && reportList?.status_code === 200
      ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
        reportList.map((report: any) => [
          report.id,
          report.reportee.nickname,
          report.game,
          report.report_status,
          report.created_at,
          <Link to={`${report.id}`} className="inline-block w-full text-center">
            <FeedIcon sx={{ color: "gray" }} />
          </Link>,
        ])
      : [];

  return (
    <>
      <PageLayout>
        <div className="flex flex-col gap-2 ">
          {data?.status_code === 200 ? (
            <TableLayout
              headers={headers}
              data={tableData}
              context="문의 내역이 없습니다!"
            />
          ) : (
            <h1 className="flex items-center justify-center font-bold">
              오류 발생
            </h1>
          )}
        </div>
        <PaginationBtns
          spacing={2}
          count={endIndex}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </PageLayout>
      {/* <PageLayout>
        <div className="flex flex-col text-center gap-2 ">
          <ul className="flex px-4 w-full  h-[4rem]  items-center    bg-white">
            <li className="font-bold w-[10%]  ">신고 ID</li>
            <li className="font-bold w-[10%]   ">reportee</li>
            <li className="font-bold w-[10%]   ">game ID</li>
            <li className="font-bold w-[20%]   ">category</li>
            <li className="font-bold  w-[20%]   ">report status</li>
            <li className="font-bold w-[20%]    ">created_at</li>
            <li className="font-bold w-[10%]    ">상세</li>
          </ul>

          <div className="flex flex-col gap-2 py-4 bg-white">
            {reportsData?.data.page_content.length === 0 && (
              <div className="h-full flex items-center justify-center">
                {" "}
                <h1 className="font-bold">신고 내역이 없습니다!</h1>{" "}
              </div>
            )}
            {reportsData?.data.page_content?.map((report: ReportsField) => {
              return (
                <ul className="flex px-4   items-center text-sm   hover:bg-gray-200 h-[60px] ">
                  <li className="font-bold w-[10%]  ">{report.id}</li>
                  <li className="font-bold w-[10%]   ">{report.reportee}</li>
                  <li className="font-bold w-[10%]   ">{report.game}</li>
                  <li className="font-bold w-[20%]   truncate">
                    {report.category}
                  </li>
                  <li className="font-bold  w-[20%]    truncate">
                    {report.report_status}
                  </li>
                  <li className="font-bold w-[20%]    ">{report.created_at}</li>
                  <li className="font-bold w-[10%]    ">
                    {" "}
                    <Link
                      to={`${report.id}`}
                      className="font-semibold  w-[10%]  "
                    >
                      <FeedIcon sx={{ color: "gray" }} />
                    </Link>
                  </li>
                </ul>
              );
            })}
          </div>
        </div>
      </PageLayout> */}
    </>

    // <section className="min-h-screen bg-[#e6e5e5] pt-[6rem] py-[4rem]">
    //   {/*  */}
    //   {/* {openDrawer && (
    //     <Drawer
    //       setOpenDrawer={setOpenDrawer}
    //       reportersListData={reportersListData}
    //       reportStatus={reportStatus}
    //     />
    //   )} */}
    //   {/*  */}

    //   <div className="w-[82rem]  mx-auto px-[8rem] space-y-8  ">
    //     <h1 className="font-bold text-xl bg-[#fdfdfd] h-[4rem] flex items-center py-2 px-4 rounded-xl">
    //       신고 목록
    //     </h1>

    //     <div className="bg-white rounded-[12px] p-4 min-h-[60rem] flex flex-col  justify-between ">
    //       <>
    //         <table
    //           style={{ tableLayout: "fixed" }}
    //           cellPadding="18"
    //           className="w-full h-full"
    //         >
    //           <thead>
    //             <tr className="">
    //               <th>신고 ID</th>
    //               <th>신고된 사용자 ID</th>
    //               <th>경기 ID</th>
    //               <th>카테고리</th>
    //               <th>신고 상태</th>
    //               <th>등록 시간</th>
    //               <th>신고 상세</th>
    //             </tr>
    //           </thead>
    //           <tbody>
    //             {reportsListData?.data?.page_content?.length >= 1 &&
    //               reportsListData?.data?.page_content.map(
    //                 (page: ReportField) => (
    //                   <tr
    //                     key={page.id}
    //                     className=" border-b border-gray-200 text-center text-[14px] hover:bg-gray-100"
    //                   >
    //                     <td>{page.id}</td>
    //                     <td>{page.reportee}</td>
    //                     <td>{page.game}</td>

    //                     <td>
    //                       {page.category === "intentional_cheating" &&
    //                         "허위 경기 운영 "}
    //                       {page.category === "incorrect_information" &&
    //                         "정확한 경기 정보"}
    //                       {page.category === "etc" && "기타 신고 사유"}
    //                       {/* {page.category === "game" && "경기"}
    //                       {page.category === "settlement" && "정산"}
    //                       {page.category === "review" && "리뷰"}
    //                       {page.category === "report" && "신고"}
    //                       {page.category === "etc" && "기타"} */}
    //                     </td>
    //                     <td
    //                       style={{
    //                         color:
    //                           page.report_status === "concluded"
    //                             ? "#e70606"
    //                             : "#000",
    //                       }}
    //                     >
    //                       {page.report_status === "waiting" && "대기중"}

    //                       {page.report_status === "evidence_requested" &&
    //                         "관련 자료 요청 상태"}

    //                       {page.report_status === "investigation_in_progress" &&
    //                         "신고 처리중"}

    //                       {page.report_status === "concluded" &&
    //                         "신고 처리 완료"}
    //                     </td>
    //                     <td>
    //                       {page.created_at.slice(0, 10)} (
    //                       {page.created_at.slice(11, 16)})
    //                     </td>
    //                     <td>
    //                       <Link to={`${page.game}/${page.id}`}>
    //                         <FindInPageIcon
    //                           sx={{ color: "gray" }}
    //                           className="hover:cursor-pointer"
    //                         />
    //                       </Link>
    //                     </td>
    //                   </tr>
    //                 )
    //               )}
    //           </tbody>
    //         </table>
    //         <PaginationBtns
    //           spacing={2}
    //           count={endIndex}
    //           currentPage={currentPage}
    //           setCurrentPage={setCurrentPage}
    //         />
    //       </>
    //     </div>
    //   </div>
    // </section>
  );
};

export default ReportsList;
