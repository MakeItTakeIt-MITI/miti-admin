import { Spinner } from "../../components/common/Spinner";
import { ReportActionModal } from "../../features/reports/components/ReportActionModal";
import {
  useReportDetailsPage,
  STATUS_LABEL,
  TYPE_LABEL,
  STATUS_BADGE,
  TYPE_BADGE,
} from "../../features/reports/hook/useReportDetailsPage";
import { ReportDetail, ReportStatus, ReportType } from "../../features/reports/interface/reports";

const Field = ({ label, value }: { label: string; value?: string | number | null }) => (
  <div className="space-y-1">
    <label className="text-xs font-medium text-gray-400">{label}</label>
    <p className="text-sm text-white">{value ?? "-"}</p>
  </div>
);

const Card = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden">
    <div className="border-b border-gray-800 bg-gray-800/50 px-6 py-4">
      <h2 className="text-lg font-semibold text-white">{title}</h2>
    </div>
    <div className="p-6 space-y-4">{children}</div>
  </div>
);

const ReportTypeDetail = ({ report }: { report: ReportDetail }) => {
  switch (report.report_type) {
    case "host_report":
      if (!report.game) return null;
      return (
        <Card title="관련 경기 정보">
          <div className="grid grid-cols-2 gap-4">
            <Field label="경기 ID" value={`#${report.game.id}`} />
            <Field label="경기 상태" value={report.game.game_status} />
            <Field label="제목" value={report.game.title} />
            <Field label="참가비" value={report.game.fee ? `${report.game.fee.toLocaleString()}원` : "-"} />
            <Field label="시작" value={`${report.game.startdate} ${report.game.starttime}`} />
            <Field label="종료" value={`${report.game.enddate} ${report.game.endtime}`} />
            <Field label="최소 인원" value={report.game.min_invitation} />
            <Field label="최대 인원" value={report.game.max_invitation} />
            <Field label="참가 인원" value={report.game.num_of_participations} />
          </div>
        </Card>
      );

    case "guest_report":
      if (!report.participation) return null;
      return (
        <Card title="관련 참가 정보">
          <div className="grid grid-cols-2 gap-4">
            <Field label="참가 ID" value={`#${report.participation.id}`} />
            <Field label="참가 상태" value={report.participation.participation_status} />
            <Field label="경기 제목" value={report.participation.game.title} />
            <Field label="경기 상태" value={report.participation.game.game_status} />
            <Field label="시작" value={`${report.participation.game.startdate} ${report.participation.game.starttime}`} />
            <Field label="종료" value={`${report.participation.game.enddate} ${report.participation.game.endtime}`} />
          </div>
          {report.participation.user.player_profile && (
            <>
              <hr className="border-gray-700" />
              <p className="text-xs font-medium text-gray-400">선수 프로필</p>
              <div className="grid grid-cols-2 gap-4">
                <Field label="레벨" value={report.participation.user.player_profile.level} />
                <Field label="포지션" value={report.participation.user.player_profile.positions.join(", ")} />
                <Field label="키" value={`${report.participation.user.player_profile.height}cm`} />
                <Field label="몸무게" value={`${report.participation.user.player_profile.weight}kg`} />
              </div>
            </>
          )}
        </Card>
      );

    case "post_report":
      if (!report.post) return null;
      return (
        <Card title="관련 게시글 정보">
          <div className="grid grid-cols-2 gap-4">
            <Field label="게시글 ID" value={`#${report.post.id}`} />
            <Field label="카테고리" value={report.post.category} />
            <Field label="제목" value={report.post.title} />
            <Field label="작성자" value={report.post.writer.nickname} />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-400">본문</label>
            <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700 min-h-[80px]">
              <p className="text-sm text-gray-300 whitespace-pre-wrap leading-relaxed">{report.post.content}</p>
            </div>
          </div>
          {report.post.images.length > 0 && (
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-400">첨부 이미지 ({report.post.images.length})</label>
              <div className="flex flex-wrap gap-2">
                {report.post.images.map((url, i) => (
                  <a key={i} href={url} target="_blank" rel="noreferrer" className="text-xs text-blue-400 hover:underline">
                    이미지 {i + 1}
                  </a>
                ))}
              </div>
            </div>
          )}
        </Card>
      );

    case "team_schedule_host_report":
      if (!report.team_schedule) return null;
      return (
        <Card title="관련 팀 일정 정보">
          <div className="grid grid-cols-2 gap-4">
            <Field label="일정 ID" value={`#${report.team_schedule.id}`} />
            <Field label="일정 상태" value={report.team_schedule.status} />
            <Field label="제목" value={report.team_schedule.title} />
            <Field label="팀명" value={report.team_schedule.team.name} />
            <Field label="주최자" value={report.team_schedule.host.nickname} />
            <Field label="최대 인원" value={report.team_schedule.max_invitation} />
            <Field label="시작" value={`${report.team_schedule.startdate} ${report.team_schedule.starttime}`} />
            {report.team_schedule.enddate && (
              <Field label="종료" value={`${report.team_schedule.enddate} ${report.team_schedule.endtime}`} />
            )}
            {report.team_schedule.fee != null && (
              <Field label="참가비" value={`${report.team_schedule.fee.toLocaleString()}원`} />
            )}
            {report.team_schedule.court && (
              <Field label="코트" value={`${report.team_schedule.court.name} (${report.team_schedule.court.address})`} />
            )}
            {report.team_schedule.place_name && (
              <Field label="장소" value={`${report.team_schedule.place_name} (${report.team_schedule.place_address})`} />
            )}
          </div>
        </Card>
      );

    case "user_report":
    default:
      return null;
  }
};

export const ReportDetails = () => {
  const { report, isLoading, navigate, isModalOpen, setIsModalOpen, handleDismissReport, handlePenalizeReport } =
    useReportDetailsPage();

  if (isLoading) return <Spinner />;

  if (!report) {
    return (
      <section className="w-full min-h-screen p-8 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 mb-4">신고를 찾을 수 없습니다</p>
          <button
            onClick={() => navigate("/reports")}
            className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg text-sm"
          >
            목록으로 돌아가기
          </button>
        </div>
      </section>
    );
  }

  const isConcluded = report.status === "concluded";

  return (
    <>
      {isModalOpen && (
        <ReportActionModal
          isModalOpen={isModalOpen}
          reportType={report.report_type as ReportType}
          setIsModalOpen={setIsModalOpen}
          handleDismissReport={handleDismissReport}
          handlePenalizeReport={handlePenalizeReport}
        />
      )}

      <section className="w-full min-h-screen p-8 bg-gray-950">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/reports")}
              className="flex items-center justify-center w-10 h-10 rounded-lg border border-gray-700 bg-gray-900 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div>
              <h1 className="text-2xl font-bold text-white">
                {TYPE_LABEL[report.report_type as ReportType] ?? report.report_type} 상세
              </h1>
              <p className="text-sm text-gray-400 mt-1">신고 ID: #{report.id}</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between bg-gray-900 border border-gray-800 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <span
                className={`inline-flex rounded-full px-3 py-1.5 text-xs font-medium ${
                  TYPE_BADGE[report.report_type as ReportType] ?? "bg-gray-600/20 text-gray-300"
                }`}
              >
                {TYPE_LABEL[report.report_type as ReportType] ?? report.report_type}
              </span>
              <span
                className={`inline-flex rounded-full px-3 py-1.5 text-xs font-medium ${
                  STATUS_BADGE[report.status as ReportStatus] ?? "bg-gray-600/20 text-gray-300"
                }`}
              >
                {STATUS_LABEL[report.status as ReportStatus] ?? report.status}
              </span>
            </div>
            {!isConcluded && (
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen("dismiss")}
                  className="px-4 py-2 bg-blue-700 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  신고 기각
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen("approve")}
                  className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  신고 인정
                </button>
              </div>
            )}
            {isConcluded && (
              <span className="text-sm text-gray-500">처리 완료된 신고입니다</span>
            )}
          </div>

          {/* 신고자 / 피신고자 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card title="신고자 정보">
              <Field label="닉네임" value={report.reporter?.nickname} />
              <Field label="이메일" value={report.reporter?.email} />
              <Field label="이름" value={report.reporter?.name} />
              <Field label="전화번호" value={report.reporter?.phone} />
              <Field label="생년월일" value={report.reporter?.birthday} />
              <Field label="가입 방법" value={report.reporter?.signup_method} />
            </Card>
            <Card title="피신고자 정보">
              <Field label="닉네임" value={report.reportee?.nickname} />
              <Field label="이메일" value={report.reportee?.email} />
              <Field label="이름" value={report.reportee?.name} />
              <Field label="전화번호" value={report.reportee?.phone} />
              <Field label="생년월일" value={report.reportee?.birthday} />
              <Field label="가입 방법" value={report.reportee?.signup_method} />
            </Card>
          </div>

          {/* 신고 정보 */}
          <Card title="신고 정보">
            <div className="grid grid-cols-2 gap-6">
              <Field label="신고 사유" value={report.report_reason} />
              <Field
                label="신고 일시"
                value={new Date(report.created_at).toLocaleString("ko-KR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-400">신고 내용</label>
              <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700 min-h-[120px]">
                <p className="text-sm text-gray-300 whitespace-pre-wrap leading-relaxed">
                  {report.content || "내용 없음"}
                </p>
              </div>
            </div>
          </Card>

          {/* report_type별 추가 정보 */}
          <ReportTypeDetail report={report} />

          {/* Bottom Navigation */}
          <div>
            <button
              onClick={() => navigate("/reports")}
              className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg text-sm font-medium border border-gray-700"
            >
              목록으로
            </button>
          </div>
        </div>
      </section>
    </>
  );
};
