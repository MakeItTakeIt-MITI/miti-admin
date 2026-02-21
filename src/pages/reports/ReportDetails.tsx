import { Spinner } from "../../components/common/Spinner";
import { ReportActionModal } from "../../features/reports/components/ReportActionModal";
import { useReportDetailsPage } from "../../features/reports/hook/useReportDetailsPage";

export const ReportDetails = () => {
  const {
    statusLabel,
    typeLabel,
    statusBadge,
    typeBadge,
    report,
    isLoading,
    navigate,
    isModalOpen,
    handleToggleApproveModal,
    handleToggleDismissModal,
    reportType,
    setIsModalOpen,
    handleDismissReport,
  } = useReportDetailsPage();
  if (isLoading) {
    return <Spinner />;
  }

  if (!report) {
    return (
      <section className="w-full min-h-screen p-8 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 mb-4">신고를 찾을 수 없습니다</p>
          <button
            onClick={() => navigate("/reports")}
            className="px-4 py-2 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors"
          >
            목록으로 돌아가기
          </button>
        </div>
      </section>
    );
  }

  if (
    isModalOpen === "approve" ||
    isModalOpen === "dismiss" ||
    isModalOpen !== null
  ) {
    return (
      <ReportActionModal
        isModalOpen={isModalOpen}
        reportType={reportType}
        setIsModalOpen={setIsModalOpen}
        handleDismissReport={handleDismissReport}
      />
    );
  }

  return (
    <section className="w-full min-h-screen p-8 bg-gray-950">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/reports")}
              className="flex items-center justify-center w-10 h-10 rounded-lg border border-gray-700 bg-gray-900 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <div>
              <h1 className="text-2xl font-bold text-white">
                {typeLabel(report.report_type)} 상세
              </h1>
              <p className="text-sm text-gray-400 mt-1">
                신고 ID: #{report.id}
              </p>
            </div>
          </div>
        </div>

        {/* Actions - 최상단 */}
        <div className="flex items-center justify-end gap-3 bg-gray-900 border border-gray-800 rounded-lg p-4">
          <div className="flex flex-col items-center">
            <span className="text-xs text-gray-400 mb-1">현재 상태</span>
            <span
              className={`inline-flex rounded-full px-3 py-1.5 text-xs font-medium ${statusBadge(
                report.report_status
              )}`}
            >
              {statusLabel(report.report_status)}
            </span>
          </div>
          <button
            type="button"
            className="px-4 py-2 bg-blue-700 hover:bg-blue-600 text-gray-100 rounded-lg text-sm font-medium transition-colors w-[120px]"
            onClick={handleToggleDismissModal}
          >
            신고 기각
          </button>
          <button
            type="button"
            className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-900/20 rounded-lg text-sm font-medium transition-colors w-[120px]"
            onClick={handleToggleApproveModal}
          >
            신고 인정
          </button>
        </div>

        {/* Reporter & Reportee Info - 좌우 배치 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Reporter Info - 신고자 */}
          <div className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden">
            <div className="border-b border-gray-800 bg-gray-800/50 px-6 py-4">
              <h2 className="text-lg font-semibold text-white">신고자 정보</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-gray-400">
                    닉네임
                  </label>
                  <p className="text-sm text-white">
                    {report.reporter?.nickname || "-"}
                  </p>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-gray-400">
                    이메일
                  </label>
                  <p className="text-sm text-white">
                    {report.reporter?.email || "-"}
                  </p>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-gray-400">
                    이름
                  </label>
                  <p className="text-sm text-white">
                    {report.reporter?.name || "-"}
                  </p>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-gray-400">
                    전화번호
                  </label>
                  <p className="text-sm text-white">
                    {report.reporter?.phone || "-"}
                  </p>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-gray-400">
                    생년월일
                  </label>
                  <p className="text-sm text-white">
                    {report.reporter?.birthday || "-"}
                  </p>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-gray-400">
                    가입 방법
                  </label>
                  <p className="text-sm text-white">
                    {report.reporter?.signup_method || "-"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Reportee Info - 피신고자 */}
          <div className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden">
            <div className="border-b border-gray-800 bg-gray-800/50 px-6 py-4">
              <h2 className="text-lg font-semibold text-white">
                피신고자 정보
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-gray-400">
                    닉네임
                  </label>
                  <p className="text-sm text-white">
                    {report.reportee?.nickname || "-"}
                  </p>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-gray-400">
                    이메일
                  </label>
                  <p className="text-sm text-white">
                    {report.reportee?.email || "-"}
                  </p>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-gray-400">
                    이름
                  </label>
                  <p className="text-sm text-white">
                    {report.reportee?.name || "-"}
                  </p>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-gray-400">
                    전화번호
                  </label>
                  <p className="text-sm text-white">
                    {report.reportee?.phone || "-"}
                  </p>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-gray-400">
                    생년월일
                  </label>
                  <p className="text-sm text-white">
                    {report.reportee?.birthday || "-"}
                  </p>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-gray-400">
                    가입 방법
                  </label>
                  <p className="text-sm text-white">
                    {report.reportee?.signup_method || "-"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Info Card - 신고 정보 (하단으로 이동) */}
        <div className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden">
          <div className="border-b border-gray-800 bg-gray-800/50 px-6 py-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">신고 정보</h2>
            <div className="flex items-center gap-3">
              <span
                className={`inline-flex rounded-full px-3 py-1.5 text-xs font-medium ${typeBadge(
                  report.report_type
                )}`}
              >
                {typeLabel(report.report_type)}
              </span>
              <span
                className={`inline-flex rounded-full px-3 py-1.5 text-xs font-medium ${statusBadge(
                  report.report_status
                )}`}
              >
                {statusLabel(report.report_status)}
              </span>
            </div>
          </div>
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="text-xs font-medium text-gray-400">
                  신고 유형
                </label>
                <p className="text-sm text-white">
                  {typeLabel(report.report_type)}
                </p>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-gray-400">
                  신고 일시
                </label>
                <p className="text-sm text-white">
                  {new Date(report.created_at).toLocaleString("ko-KR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-400">
                신고 사유
              </label>
              <p className="text-sm text-white">
                {report.report_reason || "-"}
              </p>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-400">
                신고 내용
              </label>
              <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700 min-h-[120px]">
                <p className="text-sm text-gray-300 whitespace-pre-wrap leading-relaxed">
                  {report.content || "내용 없음"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="flex items-center justify-start">
          <button
            onClick={() => navigate("/reports")}
            className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg text-sm font-medium transition-colors border border-gray-700"
          >
            목록으로
          </button>
        </div>
      </div>
    </section>
  );
};
