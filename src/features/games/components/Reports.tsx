import { useHostReportDetailsHook } from "../hooks/useHostReportDetailsHook";
import { HostReportField } from "../interface/host_reports";

interface ReportsProps {
  gameId: number;
}

export const Reports = ({ gameId }: ReportsProps) => {
  const { data: hostReportList } = useHostReportDetailsHook(gameId);

  //   d, 이메일, 닉네임, 이름, 생년월일, 가입수단, 연락처
  const headers = ["신고 ID", "신고 사유 ID", "신고 상태"];
  const userHeaders = [
    "ID",
    "이메일",
    "닉네임",
    "이름",
    "생년월일",
    "가입수단",
    "연락처",
  ];

  return (
    <>
      {hostReportList?.data.length == 0 && (
        <div className="flex items-center text-2xl justify-center font-bold h-screen text-white  bg-[#1f2937]">
          호스트 신고 내역이 없습니다!
        </div>
      )}
      {hostReportList?.status_code === 200 &&
        hostReportList?.data.map((hostReport: HostReportField) => (
          <table
            key={hostReport.id}
            className="table-fixed w-full border-collapse mb-10 text-white  bg-[#1f2937] p-2 rounded-lg"
          >
            <thead>
              <tr className=" h-[48px]">
                {headers.map((header, i) => (
                  <th key={i} className="text-center px-2 ">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="border-b-2">
              <tr className="h-[48px] text-sm">
                <td className="text-center px-2 ">{hostReport.id}</td>
                <td className="text-center px-2 ">
                  {hostReport.report_reason}
                </td>
                <td className="text-center px-2 ">
                  {hostReport.report_status}
                </td>
              </tr>
            </tbody>

            <thead>
              <tr className=" h-[48px]">
                <th colSpan={userHeaders.length}>신고자 정보</th>
              </tr>
              <tr className="h-[48px]">
                {userHeaders.map((header, i) => (
                  <th key={i} className="text-center px-2 ">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="border-b-2">
              <tr className="h-[48px] text-sm">
                {Object.values(hostReport.reporter).map((val, i) => (
                  <td key={i} className="text-center px-2  truncate">
                    {val}
                  </td>
                ))}
              </tr>
            </tbody>

            <thead>
              <tr className=" h-[48px]">
                <th colSpan={userHeaders.length}>피신고자 정보</th>
              </tr>
              <tr className="h-[48px]">
                {userHeaders.map((header, i) => (
                  <th key={i} className="text-center px-2 ">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="h-[48px] text-sm">
                {Object.values(hostReport.reportee).map((val, i) => (
                  <td key={i} className="text-center px-2  truncate">
                    {val}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        ))}
    </>
  );
};
