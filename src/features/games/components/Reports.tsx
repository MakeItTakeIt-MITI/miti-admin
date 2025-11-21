import { useHostReportDetailsHook } from "../hooks/useHostReportDetailsHook";
import { HostReportField } from "../interface/host_reports";

interface ReportsProps {
  gameId: number;
}

const statusBadge = (s: string) =>
  s === "completed"
    ? "bg-emerald-600/20 text-emerald-300 ring-1 ring-inset ring-emerald-500/30"
    : s === "waiting"
    ? "bg-amber-600/20 text-amber-300 ring-1 ring-inset ring-amber-500/30"
    : "bg-rose-600/20 text-rose-300 ring-1 ring-inset ring-rose-500/30";

const formatKoreanPhone = (phone?: string) => {
  if (!phone) return "-";
  let digits = phone.replace(/\D/g, "");
  if (digits.startsWith("82")) digits = "0" + digits.slice(2);
  if (digits.length === 11)
    return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
  if (digits.length === 10)
    return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
  if (digits.length === 9)
    return `${digits.slice(0, 2)}-${digits.slice(2, 5)}-${digits.slice(5)}`;
  return phone;
};

const userHeaders = [
  "ID",
  "이메일",
  "닉네임",
  "이름",
  "생년월일",
  "가입수단",
  "연락처",
];

export const Reports = ({ gameId }: ReportsProps) => {
  const { data: hostReportList } = useHostReportDetailsHook(gameId);

  if (!hostReportList || hostReportList.data.length === 0)
    return (
      <div className="flex items-center justify-center rounded-lg border border-gray-700 bg-gray-800 p-12 text-white text-lg font-semibold">
        호스트 신고 내역이 없습니다.
      </div>
    );

  return (
    <div className="flex flex-col gap-8">
      {hostReportList.status_code === 200 &&
        hostReportList.data.map((hostReport: HostReportField) => {
          const reporter = hostReport.reporter;
          const reportee = hostReport.reportee;
          return (
            <div
              key={hostReport.id}
              className="rounded-lg border border-gray-700 bg-gray-800 overflow-hidden"
            >
              {/* Header summary */}
              <div className="flex flex-col gap-4 p-6 bg-gradient-to-r from-gray-800 to-gray-700">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <h2 className="text-xl font-semibold">
                      신고 ID #{hostReport.id}
                    </h2>
                    <div className="flex items-center gap-3 text-xs text-gray-300">
                      <span className="inline-flex gap-2 items-center">
                        사유 ID: {hostReport.report_reason}
                      </span>
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${statusBadge(
                          hostReport.report_status
                        )}`}
                      >
                        {hostReport.report_status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tables */}
              <div className="p-6 space-y-6">
                {/* Reporter */}
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold text-gray-200">
                    신고자 정보
                  </h3>
                  <div className="w-full overflow-x-auto rounded-lg border border-gray-700">
                    <table className="min-w-[900px] w-full text-xs">
                      <thead className="bg-gray-900 text-gray-200">
                        <tr className="text-left">
                          {userHeaders.map((h) => (
                            <th key={h} className="px-4 py-2 font-medium">
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-t border-gray-700 hover:bg-gray-800 transition-colors">
                          <td className="px-4 py-2 text-white">
                            {reporter.id}
                          </td>
                          <td className="px-4 py-2 text-gray-300">
                            {reporter.email}
                          </td>
                          <td className="px-4 py-2 text-gray-300">
                            {reporter.nickname}
                          </td>
                          <td className="px-4 py-2 text-gray-300">
                            {reporter.name}
                          </td>
                          <td className="px-4 py-2 text-gray-300">
                            {reporter.birthday}
                          </td>
                          <td className="px-4 py-2">
                            <span className="inline-block rounded bg-gray-700 px-2 py-1 text-[10px] text-gray-200">
                              {reporter.signup_method || "-"}
                            </span>
                          </td>
                          <td className="px-4 py-2 text-gray-300">
                            {formatKoreanPhone(reporter.phone)}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Reportee */}
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold text-gray-200">
                    피신고자 정보
                  </h3>
                  <div className="w-full overflow-x-auto rounded-lg border border-gray-700">
                    <table className="min-w-[900px] w-full text-xs">
                      <thead className="bg-gray-900 text-gray-200">
                        <tr className="text-left">
                          {userHeaders.map((h) => (
                            <th key={h} className="px-4 py-2 font-medium">
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-t border-gray-700 hover:bg-gray-800 transition-colors">
                          <td className="px-4 py-2 text-white">
                            {reportee.id}
                          </td>
                          <td className="px-4 py-2 text-gray-300">
                            {reportee.email}
                          </td>
                          <td className="px-4 py-2 text-gray-300">
                            {reportee.nickname}
                          </td>
                          <td className="px-4 py-2 text-gray-300">
                            {reportee.name}
                          </td>
                          <td className="px-4 py-2 text-gray-300">
                            {reportee.birthday}
                          </td>
                          <td className="px-4 py-2">
                            <span className="inline-block rounded bg-gray-700 px-2 py-1 text-[10px] text-gray-200">
                              {reportee.signup_method || "-"}
                            </span>
                          </td>
                          <td className="px-4 py-2 text-gray-300">
                            {formatKoreanPhone(reportee.phone)}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};
