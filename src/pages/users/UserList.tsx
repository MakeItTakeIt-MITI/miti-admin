import SearchField from "../../components/common/SearchField";
import useUsersPage from "../../features/users/hooks/useUsersPage";
import { Link } from "react-router-dom";
import NextPageLoader from "../../features/common/NextPageLoader";
import { Spinner } from "../../components/common/Spinner";

const COLS = [
  { label: "ID", w: "w-20 text-center" },
  { label: "이메일", w: "" },
  { label: "닉네임", w: "w-44" },
  { label: "이름", w: "w-32" },
  { label: "생년월일", w: "w-36 text-center" },
  { label: "가입수단", w: "w-32 text-center" },
  { label: "전화번호", w: "w-44 text-center" },
  { label: "", w: "w-14" },
];

const UserList = () => {
  const { hasNextPage, fetchNextPage, rows, isLoading } = useUsersPage();

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {/* Page header */}
      <header className="sticky top-0 z-10 bg-zinc-950/95 backdrop-blur border-b border-zinc-800">
        <div className="px-8 py-4 flex items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="h-7 w-0.5 rounded-full bg-blue-500" />
            <div>
              <h1 className="text-sm font-semibold text-white tracking-tight leading-none">
                회원 목록
              </h1>
              <p className="text-[11px] text-zinc-500 mt-1">등록된 전체 회원 정보 조회 및 관리</p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-zinc-900 border border-zinc-800 px-3 py-1.5 text-xs font-mono text-zinc-400">
            {rows.length}
            <span className="text-zinc-600">명</span>
          </span>
        </div>

        {/* Filter bar */}
        <div className="px-8 py-2.5 border-t border-zinc-800/60 flex items-center gap-3 flex-wrap">
          <SearchField paramKey="search" />
        </div>
      </header>

      {/* Table */}
      <main className="flex-1 px-8 py-6 flex flex-col gap-4">
        <div className="rounded-xl border border-zinc-800 overflow-hidden bg-zinc-950">
          <div className="overflow-x-auto">
            <table className="min-w-[1000px] w-full text-xs">
              <thead>
                <tr className="border-b border-zinc-800 bg-zinc-900/50">
                  {COLS.map(({ label, w }) => (
                    <th
                      key={label}
                      className={`${w} px-4 py-3 text-left text-[10px] font-medium text-zinc-600 uppercase tracking-widest whitespace-nowrap`}
                    >
                      {label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.length === 0 && (
                  <tr>
                    <td colSpan={8} className="px-4 py-20 text-center text-zinc-600 text-sm">
                      검색 결과가 없습니다
                    </td>
                  </tr>
                )}
                {rows.map((u) => (
                  <tr
                    key={u.id}
                    className="border-t border-zinc-800/50 hover:bg-zinc-900/70 transition-colors group"
                  >
                    {/* ID */}
                    <td className="px-4 py-3 font-mono text-zinc-500 text-center tabular-nums">
                      {u.id}
                    </td>

                    {/* Email */}
                    <td className="px-4 py-3 text-zinc-200 font-medium">{u.email}</td>

                    {/* Nickname */}
                    <td className="px-4 py-3 text-zinc-300">{u.nickname || "—"}</td>

                    {/* Name */}
                    <td className="px-4 py-3 text-zinc-300">{u.name || "—"}</td>

                    {/* Birthday */}
                    <td className="px-4 py-3 text-zinc-500 text-center font-mono">
                      {u.birthday || "—"}
                    </td>

                    {/* Signup Method */}
                    <td className="px-4 py-3 text-center">
                      <span className="inline-flex rounded px-2 py-0.5 text-[11px] font-medium bg-zinc-800 text-zinc-300 ring-1 ring-inset ring-zinc-700/50">
                        {u.signup_method || "—"}
                      </span>
                    </td>

                    {/* Phone Number */}
                    <td className="px-4 py-3 text-zinc-400 text-center font-mono">
                      {u.phone || "—"}
                    </td>

                    {/* Detail Link */}
                    <td className="px-4 py-3">
                      <Link
                        to={`detail?userId=${u.id}`}
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
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {hasNextPage && (
          <div className="flex justify-center pt-2">
            <NextPageLoader hasNextPage={hasNextPage} fetchNextPage={fetchNextPage} />
          </div>
        )}
      </main>
    </div>
  );
};

export default UserList;
