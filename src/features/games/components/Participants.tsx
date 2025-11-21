import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import { useGameParticipantsHook } from "../hooks/useGameParticipantsHook";
import { Button } from "../../../components/ui/button";

interface ParticipantsProps {
  gameId: number;
}

interface UserProfile {
  weight?: number;
  position?: string;
  role?: string;
}

interface User {
  id: number;
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
  const participants: Participant[] = data?.data || [];

  const [sortKey, setSortKey] = useState<
    "id" | "participation_status" | "nickname"
  >("id");
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
    // 국제번호(+82) 처리
    if (digits.startsWith("82")) {
      digits = "0" + digits.slice(2);
    }
    // 011/016 등 예전 식도 그대로 3-3-4 또는 3-4-4
    if (digits.length === 11) {
      // 3-4-4
      return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
    }
    if (digits.length === 10) {
      // 3-3-4
      return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
    }
    if (digits.length === 9) {
      // 2-3-4 (지역번호 가능)
      return `${digits.slice(0, 2)}-${digits.slice(2, 5)}-${digits.slice(5)}`;
    }
    return phone; // 기타는 원본 유지
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-300">
          참가자 {participants.length}명
        </span>
        <Button
          variant="secondary"
          type="button"
          className="h-8 px-3 text-xs bg-gray-700 text-gray-200"
          onClick={() => toggleSort("id")}
        >
          ID {sortKey === "id" && (asc ? "▲" : "▼")}
        </Button>
        <Button
          variant="secondary"
          type="button"
          className="h-8 px-3 text-xs bg-gray-700 text-gray-200"
          onClick={() => toggleSort("participation_status")}
        >
          상태 {sortKey === "participation_status" && (asc ? "▲" : "▼")}
        </Button>
        <Button
          variant="secondary"
          type="button"
          className="h-8 px-3 text-xs bg-gray-700 text-gray-200"
          onClick={() => toggleSort("nickname")}
        >
          닉네임 {sortKey === "nickname" && (asc ? "▲" : "▼")}
        </Button>
      </div>

      <div className="w-full overflow-x-auto rounded-lg border border-gray-700">
        <table className="min-w-[1100px] w-full text-sm">
          <thead className="bg-gray-800 text-gray-200">
            <tr className="text-left">
              <th className="px-4 py-3 font-medium">상세</th>
              <th className="px-4 py-3 font-medium">참가 상태</th>
              <th className="px-4 py-3 font-medium">참가 ID</th>
              <th className="px-4 py-3 font-medium">닉네임</th>
              <th className="px-4 py-3 font-medium">이메일</th>
              <th className="px-4 py-3 font-medium">생년월일</th>
              <th className="px-4 py-3 font-medium">연락처</th>
              <th className="px-4 py-3 font-medium">체중</th>
              <th className="px-4 py-3 font-medium">포지션</th>
              <th className="px-4 py-3 font-medium">역할</th>
            </tr>
          </thead>
          <tbody>
            {sorted.length === 0 && (
              <tr>
                <td
                  className="px-4 py-10 text-center text-gray-400"
                  colSpan={10}
                >
                  No results.
                </td>
              </tr>
            )}
            {sorted.map((p) => {
              const profile = p.user?.player_profile;
              return (
                <tr
                  key={p.id}
                  className="border-t border-gray-700 hover:bg-gray-800 transition-colors"
                >
                  <td className="px-4 py-2">
                    {p.user?.id ? (
                      <Link
                        to={`/users/detail?userId=${p.user.id}`}
                        className="text-blue-400 hover:underline text-xs flex items-center gap-1"
                      >
                        <PersonSearchIcon fontSize="small" />
                        보기
                      </Link>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td className="px-4 py-2">
                    <span className="inline-block rounded bg-gray-700 px-2 py-1 text-xs text-gray-200">
                      {p.participation_status || "-"}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-white">{p.id}</td>
                  <td className="px-4 py-2 text-gray-300">
                    {p.user?.nickname || "-"}
                  </td>
                  <td className="px-4 py-2 text-gray-300">
                    {p.user?.email || "-"}
                  </td>
                  <td className="px-4 py-2 text-gray-300">
                    {p.user?.birthday || "-"}
                  </td>
                  <td className="px-4 py-2 text-gray-300">
                    {formatKoreanPhone(p.user?.phone)}
                  </td>
                  <td className="px-4 py-2 text-gray-300">
                    {profile?.weight ?? "-"}
                  </td>
                  <td className="px-4 py-2 text-gray-300">
                    {profile?.position ?? "-"}
                  </td>
                  <td className="px-4 py-2 text-gray-300">
                    {profile?.role ?? "-"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
