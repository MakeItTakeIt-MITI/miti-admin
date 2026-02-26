import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useGameParticipantsHook } from "../hooks/useGameParticipantsHook";
import { TABLE_STYLES } from "../../../components/common/tableStyles";

interface ParticipantsProps {
  gameId: number;
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
  id: string;
  participation_status?: string;
  user?: User;
}

export const Participants = ({ gameId }: ParticipantsProps) => {
  const { data } = useGameParticipantsHook(gameId);
  const participants = useMemo<Participant[]>(() => data?.data ?? [], [data?.data]);

  const [sortKey, setSortKey] = useState<"id" | "participation_status" | "nickname">("id");
  const [asc, setAsc] = useState(true);

  const toggleSort = (key: typeof sortKey) => {
    if (sortKey === key) setAsc((v) => !v);
    else {
      setSortKey(key);
      setAsc(true);
    }
  };

  const sorted = useMemo(() => {
    const arr = [...participants];
    arr.sort((a, b) => {
      const va =
        sortKey === "nickname"
          ? a.user?.nickname || ""
          : sortKey === "participation_status"
            ? a.participation_status || ""
            : a.id;
      const vb =
        sortKey === "nickname"
          ? b.user?.nickname || ""
          : sortKey === "participation_status"
            ? b.participation_status || ""
            : b.id;
      if (va < vb) return asc ? -1 : 1;
      if (va > vb) return asc ? 1 : -1;
      return 0;
    });
    return arr;
  }, [participants, sortKey, asc]);

  const formatKoreanPhone = (phone?: string) => {
    if (!phone) return "-";
    let digits = phone.replace(/\D/g, "");
    if (digits.startsWith("82")) {
      digits = "0" + digits.slice(2);
    }
    if (digits.length === 11) {
      return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
    }
    if (digits.length === 10) {
      return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
    }
    if (digits.length === 9) {
      return `${digits.slice(0, 2)}-${digits.slice(2, 5)}-${digits.slice(5)}`;
    }
    return phone;
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <span className="text-xs text-gray-300">참가자 {participants.length}명</span>
        <button
          type="button"
          className="h-8 px-3 text-xs bg-gray-700 hover:bg-gray-600 text-gray-200 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
          onClick={() => toggleSort("id")}
        >
          ID {sortKey === "id" && (asc ? "▲" : "▼")}
        </button>
        <button
          type="button"
          className="h-8 px-3 text-xs bg-gray-700 hover:bg-gray-600 text-gray-200 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
          onClick={() => toggleSort("participation_status")}
        >
          상태 {sortKey === "participation_status" && (asc ? "▲" : "▼")}
        </button>
        <button
          type="button"
          className="h-8 px-3 text-xs bg-gray-700 hover:bg-gray-600 text-gray-200 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
          onClick={() => toggleSort("nickname")}
        >
          닉네임 {sortKey === "nickname" && (asc ? "▲" : "▼")}
        </button>
      </div>

      <div className={TABLE_STYLES.container}>
        <table className={`min-w-[1100px] ${TABLE_STYLES.table}`}>
          <thead className={TABLE_STYLES.head}>
            <tr className={TABLE_STYLES.headerRow}>
              <th className={TABLE_STYLES.headerCell}>상세</th>
              <th className={TABLE_STYLES.headerCell}>참가 상태</th>
              <th className={TABLE_STYLES.headerCell}>참가 ID</th>
              <th className={TABLE_STYLES.headerCell}>닉네임</th>
              <th className={TABLE_STYLES.headerCell}>이메일</th>
              <th className={TABLE_STYLES.headerCell}>생년월일</th>
              <th className={TABLE_STYLES.headerCell}>연락처</th>
              <th className={TABLE_STYLES.headerCell}>실명</th>
              <th className={TABLE_STYLES.headerCell}>신장</th>
              <th className={TABLE_STYLES.headerCell}>체중</th>
            </tr>
          </thead>
          <tbody>
            {sorted.length === 0 && (
              <tr>
                <td className={TABLE_STYLES.emptyCell} colSpan={10}>
                  참가자가 없습니다.
                </td>
              </tr>
            )}
            {sorted.map((p) => {
              const profile = p.user?.player_profile;
              return (
                <tr key={p.id} className={TABLE_STYLES.bodyRow}>
                  <td className={TABLE_STYLES.bodyCell}>
                    {p.user?.id ? (
                      <Link
                        to={`/users/detail?userId=${p.user.id}`}
                        className="text-blue-400 hover:text-blue-300 hover:underline text-xs inline-flex items-center gap-1"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                        보기
                      </Link>
                    ) : (
                      <span className="text-gray-500">-</span>
                    )}
                  </td>
                  <td className={TABLE_STYLES.bodyCell}>
                    <span className="inline-block rounded bg-gray-700 px-2 py-1 text-xs text-gray-200">
                      {p.participation_status || "-"}
                    </span>
                  </td>
                  <td className={TABLE_STYLES.primaryCell}>{p.id}</td>
                  <td className={TABLE_STYLES.bodyCell}>{p.user?.nickname || "-"}</td>
                  <td className={TABLE_STYLES.bodyCell}>{p.user?.email || "-"}</td>
                  <td className={TABLE_STYLES.bodyCell}>{p.user?.birthday || "-"}</td>
                  <td className={TABLE_STYLES.bodyCell}>{formatKoreanPhone(p.user?.phone)}</td>
                  <td className={TABLE_STYLES.bodyCell}>{p.user?.name ?? "-"}</td>
                  <td className={TABLE_STYLES.bodyCell}>{profile?.height ?? "-"}</td>
                  <td className={TABLE_STYLES.bodyCell}>{profile?.weight ?? "-"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
