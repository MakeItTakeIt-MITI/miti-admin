import { Button } from "../../../components/ui/button";
interface GameDetailField {
  id: number;
  game_status: string;
  title: string;
  startdate: string;
  starttime: string;
  enddate: string;
  endtime: string;
  min_invitation: number;
  max_invitation: number;
  num_of_participations: number;
  fee: number;
  created_at: string;
  info: string;
  host: {
    id: number;
    email: string;
    nickname: string;
    name: string;
    birthday: string;
    signup_method: string;
    phone: string;
  };
  court: {
    id: number;
    name: string;
    address: string;
    address_detail: string | null;
  };
}

interface GameInfoProps {
  data: GameDetailField;
  handleDisplayEditContainer: () => void;
}

const statusClass = (s: string) =>
  s === "completed"
    ? "bg-emerald-600/20 text-emerald-300 ring-1 ring-inset ring-emerald-500/30"
    : s === "pending"
    ? "bg-amber-600/20 text-amber-300 ring-1 ring-inset ring-amber-500/30"
    : "bg-blue-600/20 text-blue-300 ring-1 ring-inset ring-blue-500/30";
export const GameInfo = ({
  data,
  handleDisplayEditContainer,
}: GameInfoProps) => {
  const capacityPct =
    data?.max_invitation > 0
      ? Math.min(
          100,
          Math.round((data?.num_of_participations / data?.max_invitation) * 100)
        )
      : 0;
  return (
    <article className="bg-gray-800 text-white rounded-lg border border-gray-700 overflow-hidden">
      {/* Header */}
      <div className="flex flex-col gap-3 p-6 bg-gradient-to-r from-gray-800 to-gray-700">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl font-semibold">{data.title}</h1>
            <div className="flex items-center gap-3">
              <span
                className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${statusClass(
                  data.game_status
                )}`}
              >
                {data.game_status}
              </span>
              <span className="text-xs text-gray-400">
                생성일: {data.created_at.slice(0, 10)}
              </span>
            </div>
          </div>
          <Button
            variant="secondary"
            type="button"
            onClick={handleDisplayEditContainer}
            size="sm"
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            경기 정보 수정
          </Button>
        </div>
        {/* Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-gray-300">
            <span>
              모집 현황 {data.num_of_participations}/{data.max_invitation}
            </span>
            <span>{capacityPct}%</span>
          </div>
          <div className="h-2 w-full bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 transition-all"
              style={{ width: `${capacityPct}%` }}
            />
          </div>
        </div>
      </div>

      {/* Grid Sections */}
      <div className="p-6 space-y-8">
        {/* Host / Court / Game meta */}
        <div className="grid gap-6 md:grid-cols-3">
          {/* Host */}
          <div className="rounded-lg border border-gray-700 bg-gray-900 p-4 space-y-3">
            <h2 className="text-sm font-semibold tracking-wide text-gray-200">
              호스트 정보
            </h2>
            <ul className="space-y-1 text-xs text-gray-300">
              <li>
                <span className="font-medium text-gray-400">ID:</span>{" "}
                {data.host.id}
              </li>
              <li>
                <span className="font-medium text-gray-400">이름:</span>{" "}
                {data.host.name}
              </li>
              <li>
                <span className="font-medium text-gray-400">닉네임:</span>{" "}
                {data.host.nickname}
              </li>
              <li>
                <span className="font-medium text-gray-400">이메일:</span>{" "}
                {data.host.email}
              </li>
              <li>
                <span className="font-medium text-gray-400">생년월일:</span>{" "}
                {data.host.birthday}
              </li>
              <li>
                <span className="font-medium text-gray-400">연락처:</span>{" "}
                {data.host.phone}
              </li>
            </ul>
          </div>

          {/* Court */}
          <div className="rounded-lg border border-gray-700 bg-gray-900 p-4 space-y-3">
            <h2 className="text-sm font-semibold tracking-wide text-gray-200">
              코트 정보
            </h2>
            <ul className="space-y-1 text-xs text-gray-300">
              <li>
                <span className="font-medium text-gray-400">코트 ID:</span>{" "}
                {data.court.id}
              </li>
              <li>
                <span className="font-medium text-gray-400">주소:</span>{" "}
                {data.court.address}
              </li>
              <li>
                <span className="font-medium text-gray-400">상세 주소:</span>{" "}
                {data.court.name}
              </li>
            </ul>
          </div>

          {/* Game Metrics */}
          <div className="rounded-lg border border-gray-700 bg-gray-900 p-4 space-y-3">
            <h2 className="text-sm font-semibold tracking-wide text-gray-200">
              경기 메타
            </h2>
            <ul className="space-y-1 text-xs text-gray-300">
              <li>
                <span className="font-medium text-gray-400">경기 ID:</span>{" "}
                {data.id}
              </li>
              <li>
                <span className="font-medium text-gray-400">시작:</span>{" "}
                {data.startdate} ({data.starttime.slice(0, 5)})
              </li>
              <li>
                <span className="font-medium text-gray-400">종료:</span>{" "}
                {data.enddate} ({data.endtime.slice(0, 5)})
              </li>
              <li>
                <span className="font-medium text-gray-400">참가비:</span>{" "}
                {data.fee ? `${data.fee.toLocaleString()}원` : "무료"}
              </li>
              <li>
                <span className="font-medium text-gray-400">최소/최대:</span>{" "}
                {data.min_invitation}/{data.max_invitation}
              </li>
              <li>
                <span className="font-medium text-gray-400">현재 인원:</span>{" "}
                {data.num_of_participations}
              </li>
            </ul>
          </div>
        </div>

        {/* Detailed Info */}
        <div className="rounded-lg border border-gray-700 bg-gray-900 p-5">
          <h2 className="text-sm font-semibold tracking-wide mb-3 text-gray-200">
            상세 정보
          </h2>
          <div
            className="text-sm leading-relaxed whitespace-pre-line max-h-[320px] overflow-y-auto scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-gray-600 pr-1"
            style={{ scrollbarWidth: "thin" }}
          >
            {data.info || "상세 정보가 없습니다."}
          </div>
        </div>
      </div>
    </article>
  );
};
