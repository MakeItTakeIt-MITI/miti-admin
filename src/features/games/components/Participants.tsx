import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useGameParticipantsHook } from "../hooks/useGameParticipantsHook";
import { useTeamScheduleParticipationsHook } from "../hooks/query/useTeamScheduleParticipationsHook";

interface ParticipantsProps {
  gameId: number;
  gameType: "game" | "team_game";
}

interface UserProfile {
  gender: string;
  height: number;
  weight?: number;
  position?: string;
  role?: string;
}

interface User {
  id: number;
  name: string;
  nickname?: string;
  email?: string;
  birthday?: string;
  phone?: string;
  player_profile?: UserProfile;
}

interface Participant {
  id: string | number;
  participation_status?: string;
  status?: string;
  is_external?: boolean;
  is_settled?: boolean;
  user?: User;
}

type SortKey = "id" | "status" | "nickname";

const statusLabelMap: Record<string, string> = {
  requested: "요청",
  confirmed: "확정",
  canceled: "취소",
  withdrawn: "철회",
};

const statusCls: Record<string, string> = {
  confirmed: "bg-emerald-500/10 text-emerald-400 ring-1 ring-inset ring-emerald-500/20",
  requested: "bg-blue-500/10 text-blue-400 ring-1 ring-inset ring-blue-500/20",
  canceled: "bg-red-500/10 text-red-400 ring-1 ring-inset ring-red-500/20",
  withdrawn: "bg-zinc-500/10 text-zinc-500 ring-1 ring-inset ring-zinc-500/20",
};

const formatPhone = (phone?: string) => {
  if (!phone) return "—";
  let d = phone.replace(/\D/g, "");
  if (d.startsWith("82")) d = "0" + d.slice(2);
  if (d.length === 11) return `${d.slice(0, 3)}-${d.slice(3, 7)}-${d.slice(7)}`;
  if (d.length === 10) return `${d.slice(0, 3)}-${d.slice(3, 6)}-${d.slice(6)}`;
  return phone;
};

export const Participants = ({ gameId, gameType }: ParticipantsProps) => {
  const { data: gameData } = useGameParticipantsHook(gameType === "game" ? gameId : 0);
  const { data: teamData } = useTeamScheduleParticipationsHook(
    gameType === "team_game" ? gameId : 0,
  );

  const participants = useMemo<Participant[]>(() => {
    if (gameType === "game") return gameData?.data ?? [];
    return Array.isArray(teamData) ? teamData : (teamData?.data ?? []);
  }, [gameType, gameData, teamData]);

  const [sortKey, setSortKey] = useState<SortKey>("id");
  const [asc, setAsc] = useState(true);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setAsc((v) => !v);
    else {
      setSortKey(key);
      setAsc(true);
    }
  };

  const resolveStatus = (p: Participant) => p.participation_status ?? p.status ?? "";

  const sorted = useMemo(() => {
    return [...participants].sort((a, b) => {
      const va =
        sortKey === "nickname"
          ? a.user?.nickname || ""
          : sortKey === "status"
            ? resolveStatus(a)
            : a.id;
      const vb =
        sortKey === "nickname"
          ? b.user?.nickname || ""
          : sortKey === "status"
            ? resolveStatus(b)
            : b.id;
      if (va < vb) return asc ? -1 : 1;
      if (va > vb) return asc ? 1 : -1;
      return 0;
    });
  }, [participants, sortKey, asc]);

  const SortBtn = ({ k, label }: { k: SortKey; label: string }) => (
    <button
      type="button"
      onClick={() => toggleSort(k)}
      className={`h-7 px-3 rounded-md text-[11px] font-medium transition-all flex items-center gap-1 ${
        sortKey === k
          ? "bg-zinc-800 text-zinc-200 border border-zinc-700"
          : "text-zinc-500 hover:text-zinc-300 border border-transparent"
      }`}
    >
      {label}
      <span className="text-zinc-600 text-[10px] w-2 text-center">
        {sortKey === k ? (asc ? "↑" : "↓") : ""}
      </span>
    </button>
  );

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex items-center justify-between gap-4">
        <span className="inline-flex items-center gap-1.5 rounded-lg bg-zinc-900 border border-zinc-800 px-3 py-1.5 text-xs font-mono text-zinc-400">
          {participants.length}
          <span className="text-zinc-600">명</span>
        </span>
        <div className="flex items-center gap-1">
          <span className="text-[11px] text-zinc-600 mr-1">정렬</span>
          <SortBtn k="id" label="ID" />
          <SortBtn k="status" label="상태" />
          <SortBtn k="nickname" label="닉네임" />
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-zinc-800 overflow-hidden bg-zinc-950">
        <div className="overflow-x-auto">
          <table className="min-w-[1100px] w-full text-xs">
            <thead>
              <tr className="border-b border-zinc-800 bg-zinc-900/50">
                {[
                  "참가 ID",
                  "상태",
                  ...(gameType === "team_game" ? ["구분", "정산"] : []),
                  "닉네임",
                  "실명",
                  "이메일",
                  "생년월일",
                  "연락처",
                  "신장",
                  "체중",
                  "",
                ].map((h) => (
                  <th
                    key={h}
                    className="px-4 py-3 text-left text-[10px] font-medium text-zinc-600 uppercase tracking-widest whitespace-nowrap"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sorted.length === 0 && (
                <tr>
                  <td
                    colSpan={gameType === "team_game" ? 12 : 10}
                    className="px-4 py-16 text-center text-zinc-600 text-sm"
                  >
                    참가자가 없습니다
                  </td>
                </tr>
              )}
              {sorted.map((p) => {
                const profile = p.user?.player_profile;
                const statusVal = resolveStatus(p);
                return (
                  <tr
                    key={p.id}
                    className="border-t border-zinc-800/50 hover:bg-zinc-900/60 transition-colors"
                  >
                    <td className="px-4 py-3 font-mono text-zinc-500 tabular-nums">{p.id}</td>

                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex rounded px-2 py-0.5 text-[11px] font-medium ${
                          statusCls[statusVal] ?? "bg-zinc-800 text-zinc-400"
                        }`}
                      >
                        {statusLabelMap[statusVal] ?? statusVal}
                      </span>
                    </td>

                    {gameType === "team_game" && (
                      <>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-flex rounded px-2 py-0.5 text-[11px] font-medium ${
                              p.is_external
                                ? "bg-violet-500/10 text-violet-400 ring-1 ring-inset ring-violet-500/20"
                                : "bg-zinc-800 text-zinc-500"
                            }`}
                          >
                            {p.is_external ? "게스트" : "팀원"}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-flex rounded px-2 py-0.5 text-[11px] font-medium ${
                              p.is_settled
                                ? "bg-emerald-500/10 text-emerald-400 ring-1 ring-inset ring-emerald-500/20"
                                : "bg-zinc-800 text-zinc-600"
                            }`}
                          >
                            {p.is_settled ? "완료" : "미완료"}
                          </span>
                        </td>
                      </>
                    )}

                    <td className="px-4 py-3 text-zinc-300">{p.user?.nickname || "—"}</td>
                    <td className="px-4 py-3 text-zinc-300">{p.user?.name || "—"}</td>
                    <td className="px-4 py-3 text-zinc-500 max-w-[160px] truncate">
                      {p.user?.email || "—"}
                    </td>
                    <td className="px-4 py-3 text-zinc-500 tabular-nums font-mono">
                      {p.user?.birthday || "—"}
                    </td>
                    <td className="px-4 py-3 text-zinc-400 tabular-nums whitespace-nowrap">
                      {formatPhone(p.user?.phone)}
                    </td>
                    <td className="px-4 py-3 text-zinc-500 tabular-nums font-mono">
                      {profile?.height ? `${profile.height}cm` : "—"}
                    </td>
                    <td className="px-4 py-3 text-zinc-500 tabular-nums font-mono">
                      {profile?.weight ? `${profile.weight}kg` : "—"}
                    </td>
                    <td className="px-4 py-3">
                      {p.user?.id ? (
                        <Link
                          to={`/users/detail?userId=${p.user.id}`}
                          className="inline-flex items-center gap-0.5 text-[11px] font-medium text-zinc-500 hover:text-blue-400 transition-colors"
                        >
                          보기
                          <svg
                            className="w-3 h-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      ) : (
                        <span className="text-zinc-700">—</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
