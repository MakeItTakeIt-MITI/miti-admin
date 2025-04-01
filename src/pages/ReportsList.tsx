import { useState } from "react";
import { Link } from "react-router-dom";
import { useReportsListHook } from "../hook/useReportsListHook";
import FeedIcon from "@mui/icons-material/Feed";

import FindInPageIcon from "@mui/icons-material/FindInPage";

import PaginationBtns from "../components/common/PaginationBtns";
import { ReportField } from "../interface/reports";
import { PageLayout } from "../features/common/PageLayout";
import { PageHeader } from "../features/common/PageHeader";
// import Drawer from "../components/reports/Drawer";
// import { useReportersListHook } from "../hook/useReportersListHook";

const ReportsList = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  // const [openDrawer, setOpenDrawer] = useState(false);
  // const [gameId, setGameId] = useState<null | number>(null);
  // const [reportId, setReportId] = useState<null | number>(null);
  // const [reportStatus, setReportStatus] = useState("string");

  // console.log(reportId);

  const { data: reportsListData } = useReportsListHook(currentPage);
  // const { data: reportersListData } = useReportersListHook(gameId);

  const endIndex = reportsListData?.data.end_index;

  const fakeGameData = [
    {
      participantId: "P12345",
      gameId: "G98765",
      gameStatus: "진행 중",
      title: "[5대5] 신안은핼ㅇ 농구 친선 경기",
      startDate: "2025-03-10",
      reportedUser: "김철수",
      reportedUserContact: "010-1234-5678",
    },
    {
      participantId: "P67890",
      gameId: "G54321",
      gameStatus: "완료",
      title: "스트릿 농구 대회",
      startDate: "2025-03-05",
      reportedUser: "이영희",
      reportedUserContact: "010-9876-5432",
    },
  ];

  return (
    <>
      <PageHeader title="신고 목록" />
      <PageLayout>
        {/* 조회 정보(렌더링 정보)
        신고 관련 요약 정보 - 참가 고유 번호, 경기 고유 번호, 경기 상태, 경기 제목, 시작일, 경기 시작 시간, 피신고자 이름, 피신고자 연락처 */}

        <div className="flex flex-col gap-2 ">
          <ul className="flex w-full  h-[4rem]  items-center    bg-white">
            <li className="font-bold w-[10%] text-center ">참가 ID</li>
            <li className="font-bold  w-[10%]  text-center ">경기 ID</li>
            <li className="font-bold w-[10%]  text-center ">경기 상태</li>
            <li className="font-bold w-[20%]  text-center ">제목</li>
            <li className="font-bold w-[15%]  text-center ">시작일</li>
            <li className="font-bold  w-[10%]  text-center ">피신고자</li>
            <li className="font-bold w-[10%]   text-center ">
              피신고자 연락처
            </li>
            <li className="font-bold w-[10%]   text-center ">상세</li>
          </ul>

          <div className="flex flex-col gap-2 py-4 bg-white">
            {fakeGameData?.map((game) => {
              return (
                <ul className="flex w-full  items-center text-sm   hover:bg-gray-200 h-[60px] ">
                  <li className=" w-[10%] text-center ">
                    {game.participantId}
                  </li>
                  <li className="  w-[10%]  text-center ">{game.gameId}</li>
                  <li className=" w-[10%]  text-center ">{game.gameStatus}</li>
                  <li className=" w-[20%]  text-center truncate ">
                    {game.title}
                  </li>
                  <li className=" w-[15%]  text-center ">{game.startDate}</li>
                  <li className="  w-[10%]  text-center ">
                    {game.reportedUser}
                  </li>
                  <li className=" w-[10%]   text-center ">
                    {game.reportedUserContact}
                  </li>
                  <Link
                    to="123"
                    className="font-semibold  w-[10%] text-center "
                  >
                    <FeedIcon sx={{ color: "gray" }} />
                  </Link>
                </ul>
              );
            })}
          </div>
        </div>
      </PageLayout>
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
