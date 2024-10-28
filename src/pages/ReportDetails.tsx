import { useParams } from "react-router-dom";
import { useReportersListHook } from "../hook/useReportersListHook";
import { useState } from "react";
import { useReportDetailsHook } from "../hook/useReportDetailsHook";
import { Button } from "@mui/material";
import MessageIcon from "@mui/icons-material/Message";
import { useDismissUserReportHook } from "../hook/useDismissUserReportHook";
import { usePenalizeGameHook } from "../hook/usePenalizeGameHook";

const ReportDetails = () => {
  const { reported_game_id, report_id } = useParams();
  const gameId = Number(reported_game_id);
  const reportId = Number(report_id);

  const { data } = useReportersListHook(gameId);
  const { data: reportDetailsData } = useReportDetailsHook(gameId, reportId);
  const { mutate: mutateDismiss } = useDismissUserReportHook();
  const { mutate: mutatePenalize } = usePenalizeGameHook();

  const [displayContext, setDisplayContext] = useState(false);
  const [context, setContext] = useState("");
  //   const reportType = ["기각", "정지", "경고"];
  const [list, setList] = useState(false);
  const [displayReportBox, setDisplayReportBox] = useState(false);
  const [reportType, setReportType] = useState("");
  const [refundPayment, setRefundPayment] = useState<boolean | undefined>(
    undefined
  );
  const [suspendDays, setSuspendDays] = useState<null | number>(null);

  const handleToggleList = () => setList(!list);

  const handleDisplayContext = (input: string) => {
    setDisplayContext(true);
    setContext(input);
  };

  const handleCloseDisplayText = () => setDisplayContext(false);

  const handleDisplayReportBox = (type: string) => {
    setReportType(type);
    setDisplayReportBox(true);
  };
  const handleCloseReportBox = () => setDisplayReportBox(false);

  const handleSubmitReport = () => {
    if (reportType === "dismiss") {
      mutateDismiss(reportDetailsData?.data.game.id);
      handleCloseReportBox();
      console.log("기각");
    } else if (reportType === "warning") {
      const data = {
        penalty: "warning",
        duration: null,
        refund_participation_payment: refundPayment,
      };

      mutatePenalize({ gameId: reportDetailsData?.data.game.id, data });
      handleCloseReportBox();
      console.log("경고");
    } else if (reportType === "suspend") {
      const data = {
        penalty: "suspend",
        duration: suspendDays,
        refund_participation_payment: undefined,
      };

      mutatePenalize({ gameId: reportDetailsData?.data.game.id, data });
      handleCloseReportBox();
      console.log("정지");
    }
  };

  return (
    <section className=" min-h-screen bg-[#e6e5e5] pt-[6rem] py-[4rem]">
      {/*  신고 내용 */}
      {displayContext && (
        <aside
          onClick={handleCloseDisplayText}
          className="z-[999]  fixed right-0 top-0 bottom-0 left-0 h-full w-full bg-gray-800 bg-opacity-70  flex items-center justify-center"
        >
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="rounded-xl bg-white w-[40rem] h-[30rem] border-2 p-6 text-sm flex flex-col justify-between gap-4"
          >
            <p className="overflow-y-auto"> {context}</p>
            <Button
              type="button"
              onClick={handleCloseDisplayText}
              variant="contained"
              color="primary"
            >
              닫기
            </Button>
          </div>
        </aside>
      )}
      {/* 신고처리 모달 */}
      {displayReportBox && (
        <aside className="z-[999999]  fixed right-0 top-0 bottom-0 left-0 h-full w-full bg-gray-800 bg-opacity-70  flex items-center justify-center">
          {" "}
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="rounded-xl bg-white w-[20rem] min-h-[10rem] border-2 p-6 text-sm flex flex-col justify-between gap-4"
          >
            <p className="font-bold">
              {reportType === "dismiss"
                ? "신고를 기각하시겠습니까?"
                : reportType === "warning"
                ? "호스트에게 경고를 보내시겠습니까?"
                : "호스트를 정지하시겠습니까?"}
            </p>
            {/* 정지 시, 기간 설정 */}
            {reportType === "suspend" && (
              <input
                type="number"
                placeholder="정지 일수를 입력해 주세요."
                onChange={(e) => {
                  const value = e.target.value;
                  setSuspendDays(value ? Number(value) : null);
                }}
                className="h-full w-full flex items-center justify-center border border-gray-200 p-2 rounded-lg"
              />
            )}
            {/* 경고 시, 환불 여부 */}
            {reportType === "warning" && (
              <div className="space-y-2 w-full">
                <h2 className="font-medium text-gray-700 underline">
                  환불 여부
                </h2>
                <select
                  className="p-1 h-[2rem] w-full text-sm border border-gray-200 cursor-pointer"
                  value={refundPayment ? "yes" : "no"}
                  onChange={(e) => {
                    const selectedValue = e.target.value;
                    setRefundPayment(selectedValue === "yes");
                  }}
                >
                  <option value="yes">환불 해드리겠습니다</option>
                  <option value="no">환불 안하겠습니다</option>
                </select>
              </div>
            )}
            <div className="flex items-center justify-center gap-2">
              <Button
                type="button"
                onClick={handleSubmitReport}
                variant="contained"
                color="error"
              >
                확인
              </Button>
              <Button
                type="button"
                onClick={handleCloseReportBox}
                variant="contained"
                color="primary"
              >
                닫기
              </Button>
            </div>
          </div>
        </aside>
      )}

      <div className="w-[82rem]  mx-auto px-[8rem] space-y-8  ">
        <h2 className="text-xl font-bold">신고된 호스트의 정보</h2>
        <div className=" bg-[#fdfdfd] h-[6rem] py-4 px-4 rounded-xl flex items-center justify-between">
          <table
            style={{ tableLayout: "fixed" }}
            cellPadding="0"
            className="w-full h-full "
          >
            <thead>
              <tr className="text-sm">
                <th className="py-2 text-left">아이디</th>
                <th className="py-2 text-left w-[250px]">이메일</th>
                <th className="py-2 text-left">닉네임</th>
                <th className="py-2 text-left">이름</th>
                <th className="py-2 text-left">정지기간</th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-sm">
                <td>{reportDetailsData?.data.reportee.id}</td>
                <td className="truncate">
                  {reportDetailsData?.data.reportee.email}
                </td>
                <td>{reportDetailsData?.data.reportee.nickname} </td>
                <td>{reportDetailsData?.data.reportee.name}</td>
                <td>{reportDetailsData?.data.reportee.suspended_until}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="text-xl font-bold space-y-4">
          <span> 신고 상태 </span>
          <span className="text-sm text-bold text-gray-500">
            ( {reportDetailsData?.data.report_status === "waiting" && "대기중"}
            {reportDetailsData?.data.report_status === "evidence_requested" &&
              "관련 자료 요청 상태"}
            {reportDetailsData?.data.report_status ===
              "investigation_in_progress" && "신고 처리중"}
            {reportDetailsData?.data.report_status === "concluded" &&
              "신고 처리 완료"}
            )
          </span>
          <p className="text-sm text-gray-500">
            *호스트에 대한 신고 내용을 충분히 확인하시고, 해당 호스트에 대한
            경고, 정지, 또는 기각 처리를 해주시기 바랍니다.
          </p>
          <p className="text-sm text-gray-500">
            *신고 처리가 완료된 경기는 수정이 불가능합니다.
          </p>
        </div>
        <div className=" bg-[#fdfdfd] h-[6rem] py-4 px-4 rounded-xl flex items-center justify-center gap-3">
          {" "}
          <Button
            variant="contained"
            color="primary"
            style={{
              height: "50px",
              width: "50%",
            }}
            disabled={
              reportDetailsData?.data.report_status === "concluded"
                ? true
                : false
            }
            onClick={() => handleDisplayReportBox("dismiss")}
          >
            호스트에 대한 신고를 기각합니다
          </Button>{" "}
          <Button
            variant="contained"
            color="warning"
            style={{
              height: "50px",
              width: "50%",
              zIndex: "0",
            }}
            disabled={
              reportDetailsData?.data.report_status === "concluded"
                ? true
                : false
            }
            onClick={() => handleDisplayReportBox("warning")}
          >
            호스트에게 경고를 주겠습니다{" "}
          </Button>{" "}
          <Button
            variant="contained"
            color="error"
            style={{
              height: "50px",
              width: "50%",
            }}
            disabled={
              reportDetailsData?.data.report_status === "concluded"
                ? true
                : false
            }
            onClick={() => handleDisplayReportBox("suspend")}
          >
            호스트를 정지시키겠습니다
          </Button>{" "}
        </div>
        {/* 신고자 목록 */}
        <h2 className="text-xl font-bold">
          신고자 목록 ({data?.data.reports.length})
        </h2>
        <div
          style={{
            scrollbarWidth: "thin",
          }}
          className="bg-[#fdfdfd] h-[20rem] overflow-y-auto py-4 px-4 rounded-xl"
        >
          <table
            style={{ tableLayout: "fixed" }}
            cellPadding="6"
            className="w-full "
          >
            {data?.data.reports.map(
              (report: {
                id: number;
                reportee: string;
                category: string;
                report_status: string;
                created_at: string;
                content: string;
              }) => {
                return (
                  <>
                    <thead className="h-[3rem]">
                      <tr className="text-sm py-4 border-b border-gray-200">
                        <th className="">신고 ID</th>
                        <th className=" ">신고자 ID</th>
                        <th className=" ">신고 주제</th>
                        <th className=" ">신고 상태</th>
                        <th className=" ">등록일</th>
                        <th className=" ">신고 내용</th>
                      </tr>
                    </thead>

                    <tbody className="space-y-2 ">
                      <tr className="text-sm text-center border-b border-gray-200">
                        <td className="">{report.id}</td>
                        <td>{report.reportee}</td>

                        <td>
                          <td>{report.category}</td>
                        </td>
                        <td>{report.report_status}</td>
                        <td>{report.created_at.slice(0, 10)}</td>
                        <td>
                          <button
                            type="button"
                            onClick={() => {
                              handleDisplayContext(report.content);
                            }}
                          >
                            <MessageIcon />
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </>
                );
              }
            )}
          </table>
        </div>
        <h2 className="text-xl font-bold">경기 정보</h2>
        <div className=" bg-[#fdfdfd] py-4 px-4 rounded-xl flex items-center justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <h1 className="font-bold text-lg ">{data?.data.title}</h1>
              <h1 className="font-semibold text-sm ">
                ({" "}
                {data?.data.game_status === "canceled" && (
                  <span className="text-red-500 font-[500]">취소</span>
                )}{" "}
                {data?.data.game_status === "open" && "모집중"}{" "}
                {data?.data.game_status === "closed" && "모집 마감"}{" "}
                {data?.data.game_status === "completed" && "진행 완료"} )
              </h1>
            </div>
          </div>
          <div className=" flex flex-col gap-2">
            <button
              onClick={handleToggleList}
              type="button"
              className="relative"
            ></button>
          </div>
        </div>
        {/* second */}
        <div className="bg-[#fdfdfd] py-4 px-4 rounded-xl">
          <table
            style={{ tableLayout: "fixed" }}
            cellPadding="0"
            className="w-full h-full"
          >
            <thead>
              <tr className="text-sm">
                <th className="py-2 text-left">아이디</th>
                <th className="py-2 text-left">시작</th>
                <th className="py-2 text-left">종료</th>
                <th className="py-2 text-left">최소 인원</th>
                <th className="py-2 text-left">최대 인원</th>
                <th className="py-2 text-left">참여비</th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-sm">
                <td>{data?.data.id}</td>
                <td>
                  {data?.data.startdate} ({data?.data.starttime.slice(0, 5)}){" "}
                </td>
                <td>
                  {data?.data.enddate} ({data?.data.endtime.slice(0, 5)}){" "}
                </td>
                <td>{data?.data.min_invitation}</td>
                <td>{data?.data.max_invitation}</td>
                <td>{data?.data.fee}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div
          style={{
            scrollbarWidth: "thin",
          }}
          className="bg-[#fdfdfd] h-[20rem] overflow-y-auto py-4 px-4 rounded-xl space-y-2"
        >
          <h1 className="font-bold ">기타 정보</h1>
          <p className="text-md"> {data?.data.info} </p>
        </div>
        <h2 className="text-xl font-bold">코트 정보</h2>
        <div className="bg-[#fdfdfd] py-4 px-4 rounded-xl">
          <table
            style={{ tableLayout: "fixed" }}
            cellPadding="0"
            className="w-full h-full"
          >
            <thead>
              <tr className="text-sm">
                <th className="py-2 text-left">아이디</th>
                <th className="py-2 text-left w-[300px]">주소</th>
                <th className="py-2 text-left">경도</th>
                <th className="py-2 text-left">위도</th>
                <th className="py-2 text-left">코트 이름</th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-sm">
                <td>{data?.data.court.id}</td>
                <td>
                  {data?.data.court.address} {data?.data.court.address_detail}
                </td>

                <td>{data?.data.court.latitude}</td>
                <td>{data?.data.court.longitude}</td>
                <td>{data?.data.court.name}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default ReportDetails;
