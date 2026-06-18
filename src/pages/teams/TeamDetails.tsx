import { useSearchParams, Link } from "react-router-dom";
import { useTeamDetail } from "../../features/teams/hooks/query/useTeamDetail";
import { Spinner } from "../../components/common/Spinner";
import { TEAM_STATUS_BADGE, TEAM_LEVEL_LABEL } from "../../features/teams/constants/teams";
import { TABLE_STYLES } from "../../components/common/tableStyles";
import { Users, Shield, Landmark, MapPin, User, Info, ArrowLeft } from "lucide-react";
import { useState } from "react";

const MEMBER_ROLE_LABEL: Record<string, string> = {
  owner: "구단주",
  manager: "매니저",
  member: "일반멤버",
};

const MEMBER_STATUS_BADGE: Record<string, { label: string; cls: string }> = {
  pending: {
    label: "대기중",
    cls: "bg-amber-500/10 text-amber-400 ring-1 ring-inset ring-amber-500/20",
  },
  active: {
    label: "활동중",
    cls: "bg-emerald-500/10 text-emerald-400 ring-1 ring-inset ring-emerald-500/20",
  },
  inactive: {
    label: "비활성",
    cls: "bg-zinc-500/15 text-zinc-400 ring-1 ring-inset ring-zinc-500/15",
  },
  suspended: {
    label: "정지",
    cls: "bg-rose-500/10 text-rose-400 ring-1 ring-inset ring-rose-500/20",
  },
  banned: { label: "추방", cls: "bg-red-500/10 text-red-400 ring-1 ring-inset ring-red-500/20" },
  withdrawn: {
    label: "탈퇴",
    cls: "bg-zinc-500/10 text-zinc-500 ring-1 ring-inset ring-zinc-500/20",
  },
};

const formatKoreanPhone = (phone?: string) => {
  if (!phone) return "—";
  let digits = phone.replace(/\D/g, "");
  if (digits.startsWith("82")) digits = "0" + digits.slice(2);
  if (digits.length === 11) return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
  if (digits.length === 10) return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
  return phone;
};

export default function TeamDetails() {
  const [searchParams] = useSearchParams();
  const teamIdStr = searchParams.get("teamId");
  const teamId = teamIdStr ? Number(teamIdStr) : null;

  const { data: teamData, isLoading } = useTeamDetail(teamId);
  const [imgIndex, setImgIndex] = useState(0);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        <Spinner />
      </div>
    );
  }

  if (!teamData) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-black text-white">
        <p className="text-sm text-zinc-500 font-medium">
          팀 정보를 불러올 수 없거나 존재하지 않는 팀입니다.
        </p>
        <Link
          to="/teams"
          className="h-9 px-4 flex items-center justify-center rounded-lg border border-zinc-700 text-zinc-400 text-xs font-medium hover:text-white hover:border-zinc-650 transition-colors"
        >
          목록으로 돌아가기
        </Link>
      </div>
    );
  }

  const badge = TEAM_STATUS_BADGE[teamData.status];
  const images = teamData.images ?? [];

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {/* Sticky nav */}
      <header className="sticky top-0 z-10 bg-zinc-950/95 backdrop-blur border-b border-zinc-800">
        <div className="px-8 py-4 flex items-center justify-between gap-4">
          <nav className="flex items-center gap-2 text-xs font-mono" aria-label="경로">
            <Link to="/teams" className="text-zinc-500 hover:text-zinc-350 transition-colors">
              팀 목록
            </Link>
            <span className="text-zinc-700" aria-hidden="true">
              /
            </span>
            <span className="text-zinc-300 font-semibold">#{teamData.id}</span>
          </nav>
          <Link
            to="/teams"
            className="h-9 px-4 flex items-center justify-center rounded-lg border border-zinc-700 text-zinc-400 text-xs font-medium hover:text-white hover:border-zinc-650 transition-colors gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            목록으로
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-8 py-6 max-w-6xl w-full mx-auto space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left / Span 2: Basic Info & Introductions */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title Block */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-6 flex flex-col gap-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2 flex-wrap">
                  {badge && (
                    <span
                      className={`inline-flex rounded px-2 py-0.5 text-[11px] font-semibold ${badge.cls}`}
                    >
                      {badge.label}
                    </span>
                  )}
                  <span className="inline-flex rounded px-2 py-0.5 text-[11px] font-semibold bg-zinc-900 border border-zinc-800 text-zinc-400 font-mono">
                    레벨: {TEAM_LEVEL_LABEL[teamData.level] ?? teamData.level}
                  </span>
                  <span className="inline-flex rounded px-2 py-0.5 text-[11px] font-semibold bg-zinc-900 border border-zinc-800 text-zinc-400 font-mono">
                    생성일:{" "}
                    {teamData.created_at ? new Date(teamData.created_at).toLocaleDateString() : "—"}
                  </span>
                </div>
                <h1 className="text-2xl font-bold text-white tracking-tight">{teamData.name}</h1>
                {teamData.introduction && (
                  <p className="text-sm text-zinc-400 whitespace-pre-line leading-relaxed border-t border-zinc-900 pt-3">
                    {teamData.introduction}
                  </p>
                )}
              </div>
            </div>

            {/* Images Slideshow */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-6 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5" />팀 갤러리 ({images.length})
              </h3>
              {images.length > 0 ? (
                <div className="space-y-3">
                  <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg bg-zinc-950 border border-zinc-850">
                    <img
                      src={images[imgIndex]}
                      alt={`팀 이미지 ${imgIndex + 1}`}
                      className="h-full w-full object-cover transition-all"
                    />
                    {images.length > 1 && (
                      <div className="absolute bottom-3 right-3 rounded-full bg-black/60 px-2.5 py-1 text-[10px] font-mono text-zinc-300">
                        {imgIndex + 1} / {images.length}
                      </div>
                    )}
                  </div>
                  {images.length > 1 && (
                    <div className="flex gap-2 overflow-x-auto pb-1">
                      {images.map((src, i) => (
                        <button
                          key={i}
                          onClick={() => setImgIndex(i)}
                          className={`size-14 flex-shrink-0 overflow-hidden rounded-md border-2 transition-all ${
                            i === imgIndex
                              ? "border-white"
                              : "border-transparent opacity-50 hover:opacity-90"
                          }`}
                        >
                          <img
                            src={src}
                            alt={`썸네일 ${i + 1}`}
                            className="h-full w-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex h-36 items-center justify-center rounded-lg border border-dashed border-zinc-800 bg-zinc-950/45 text-xs text-zinc-500 font-mono">
                  등록된 갤러리 이미지가 없습니다.
                </div>
              )}
            </div>
          </div>

          {/* Right / Sidebar: Plan & Meta / Owner */}
          <div className="space-y-6">
            {/* Owner Details */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-6 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 flex items-center gap-1.5 pb-2.5 border-b border-zinc-800/80">
                <User className="w-3.5 h-3.5" />
                구단주 정보
              </h3>
              {teamData.owner ? (
                <div className="space-y-2.5 text-xs font-mono">
                  <div className="flex justify-between">
                    <span className="text-zinc-500">ID:</span>
                    <span className="text-zinc-200">#{teamData.owner.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">이름:</span>
                    <span className="text-zinc-200 font-semibold">
                      {teamData.owner.name || "—"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">닉네임:</span>
                    <span className="text-zinc-200">{teamData.owner.nickname || "—"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">이메일:</span>
                    <span className="text-zinc-200">{teamData.owner.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">연락처:</span>
                    <span className="text-zinc-200">{formatKoreanPhone(teamData.owner.phone)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">가입경로:</span>
                    <span className="text-zinc-250 uppercase">{teamData.owner.signup_method}</span>
                  </div>
                </div>
              ) : (
                <p className="text-zinc-650 text-xs font-mono">구단주 정보가 누락되었습니다.</p>
              )}
            </div>

            {/* Plan Info */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-6 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 flex items-center gap-1.5 pb-2.5 border-b border-zinc-800/80">
                <Shield className="w-3.5 h-3.5" />
                가입 요금제 플랜
              </h3>
              {teamData.plan ? (
                <div className="space-y-2.5 text-xs font-mono">
                  <div className="flex justify-between">
                    <span className="text-zinc-500">플랜명:</span>
                    <span className="text-emerald-400 font-semibold">{teamData.plan.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">최대 정원:</span>
                    <span className="text-zinc-200">{teamData.plan.max_members}명</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">최대 매니저:</span>
                    <span className="text-zinc-200">{teamData.plan.max_mangers}명</span>
                  </div>
                </div>
              ) : (
                <div className="text-zinc-500 text-xs font-mono flex items-center gap-1.5">
                  <Landmark className="w-3.5 h-3.5" />
                  플랜 미가입 (기본 한도 적용)
                </div>
              )}
            </div>

            {/* Location Region */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-6 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 flex items-center gap-1.5 pb-2.5 border-b border-zinc-800/80">
                <MapPin className="w-3.5 h-3.5" />
                연고 도시 정보
              </h3>
              {teamData.city ? (
                <div className="space-y-2.5 text-xs font-mono">
                  <div className="flex justify-between">
                    <span className="text-zinc-500">도시 코드:</span>
                    <span className="text-zinc-200 uppercase">{teamData.city.code}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">도시명:</span>
                    <span className="text-zinc-200">{teamData.city.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">위경도:</span>
                    <span className="text-zinc-400 text-[10px]">
                      {Number(teamData.city.latitude).toFixed(4)},{" "}
                      {Number(teamData.city.longitude).toFixed(4)}
                    </span>
                  </div>
                </div>
              ) : (
                <p className="text-zinc-650 text-xs font-mono">도시 정보가 없습니다.</p>
              )}
            </div>
          </div>
        </div>

        {/* Full Members List Table */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-zinc-400" />
            <h2 className="text-sm font-semibold text-white tracking-tight">
              팀 멤버 이력 및 상태 ({teamData.memberships?.length ?? 0}명)
            </h2>
          </div>
          <div className={TABLE_STYLES.container}>
            <div className="overflow-x-auto">
              <table className={`min-w-[1000px] ${TABLE_STYLES.table}`}>
                <thead className={TABLE_STYLES.head}>
                  <tr className={TABLE_STYLES.headerRow}>
                    <th className={`${TABLE_STYLES.headerCell} w-20`}>멤버십 ID</th>
                    <th className={`${TABLE_STYLES.headerCell} w-20`}>유저 ID</th>
                    <th className={TABLE_STYLES.headerCell}>이름/닉네임</th>
                    <th className={TABLE_STYLES.headerCell}>이메일</th>
                    <th className={`${TABLE_STYLES.headerCell} w-32`}>연락처</th>
                    <th className={`${TABLE_STYLES.headerCell} w-24 text-center`}>직책</th>
                    <th className={`${TABLE_STYLES.headerCell} w-24 text-center`}>상태</th>
                    <th className={`${TABLE_STYLES.headerCell} w-32`}>포지션 / 피지컬</th>
                    <th className={`${TABLE_STYLES.headerCell} w-28`}>가입 날짜</th>
                  </tr>
                </thead>
                <tbody>
                  {teamData.memberships && teamData.memberships.length > 0 ? (
                    teamData.memberships.map((membership) => {
                      const roleBadge =
                        membership.role === "owner"
                          ? "bg-violet-500/10 text-violet-400 ring-1 ring-inset ring-violet-500/20"
                          : membership.role === "manager"
                            ? "bg-sky-500/10 text-sky-400 ring-1 ring-inset ring-sky-500/20"
                            : "bg-zinc-800 text-zinc-400";
                      const statusBadge = MEMBER_STATUS_BADGE[membership.status];

                      return (
                        <tr key={membership.id} className={TABLE_STYLES.bodyRow}>
                          <td className={TABLE_STYLES.primaryCell}>#{membership.id}</td>
                          <td className={`${TABLE_STYLES.bodyCell} font-mono`}>
                            #{membership.user.id}
                          </td>
                          <td className={TABLE_STYLES.bodyCell}>
                            <div className="flex flex-col">
                              <span className="font-semibold text-zinc-200">
                                {membership.user.name || "—"}
                              </span>
                              <span className="text-[10px] text-zinc-500 font-mono">
                                {membership.user.nickname || "—"}
                              </span>
                            </div>
                          </td>
                          <td className={`${TABLE_STYLES.bodyCell} font-mono text-zinc-300`}>
                            {membership.user.email}
                          </td>
                          <td className={`${TABLE_STYLES.bodyCell} font-mono text-zinc-400`}>
                            {formatKoreanPhone(membership.user.phone)}
                          </td>
                          <td className={`${TABLE_STYLES.bodyCell} text-center`}>
                            <span
                              className={`inline-flex rounded px-1.5 py-0.5 text-[10px] font-semibold ${roleBadge}`}
                            >
                              {MEMBER_ROLE_LABEL[membership.role] ?? membership.role}
                            </span>
                          </td>
                          <td className={`${TABLE_STYLES.bodyCell} text-center`}>
                            {statusBadge && (
                              <span
                                className={`inline-flex rounded px-1.5 py-0.5 text-[10px] font-semibold ${statusBadge.cls}`}
                              >
                                {statusBadge.label}
                              </span>
                            )}
                          </td>
                          <td
                            className={`${TABLE_STYLES.bodyCell} font-mono text-[11px] text-zinc-450`}
                          >
                            {membership.user.player_profile ? (
                              <div className="flex flex-col gap-0.5 leading-snug">
                                <span className="text-zinc-350 uppercase">
                                  포지션: {membership.user.player_profile.position || "—"}
                                </span>
                                <span>
                                  피지컬:{" "}
                                  {membership.user.player_profile.height
                                    ? `${membership.user.player_profile.height}cm`
                                    : "—"}{" "}
                                  /{" "}
                                  {membership.user.player_profile.weight
                                    ? `${membership.user.player_profile.weight}kg`
                                    : "—"}
                                </span>
                              </div>
                            ) : (
                              "—"
                            )}
                          </td>
                          <td className={`${TABLE_STYLES.bodyCell} font-mono text-zinc-400`}>
                            {membership.created_at || "—"}
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={9} className={TABLE_STYLES.emptyCell}>
                        팀에 소속된 멤버 정보가 존재하지 않습니다.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
