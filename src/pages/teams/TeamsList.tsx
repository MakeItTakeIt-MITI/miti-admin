import { Users } from "lucide-react";
import SearchField from "../../components/common/SearchField";
import { Spinner } from "../../components/common/Spinner";
import NextPageLoader from "../../features/common/NextPageLoader";
import TeamsCard from "../../features/teams/components/list/TeamsCard";
import { TEAM_STATUS_OPTIONS } from "../../features/teams/constants/teams";
import { useTeamsPage } from "../../features/teams/hooks/useTeamsPage";

const TeamsList = () => {
  const { rows, hasNextPage, fetchNextPage, status, setStatus, isLoading } = useTeamsPage();

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {/* Page header */}
      <header className="sticky top-0 z-10 bg-zinc-950/95 backdrop-blur border-b border-zinc-800">
        <div className="px-8 py-4 flex items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="h-7 w-0.5 rounded-full bg-blue-500" />
            <div>
              <h1 className="text-sm font-semibold text-white tracking-tight leading-none">
                팀 관리
              </h1>
              <p className="text-[11px] text-zinc-500 mt-1">등록된 전체 팀 및 동호회 정보 관리</p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-zinc-900 border border-zinc-800 px-3 py-1.5 text-xs font-mono text-zinc-400">
            {rows.length}
            <span className="text-zinc-600">개</span>
          </span>
        </div>

        {/* Filter bar */}
        <div className="px-8 py-2.5 border-t border-zinc-800/60 flex items-center gap-3 flex-wrap">
          <SearchField paramKey="search" />

          <div className="flex items-center gap-1">
            {TEAM_STATUS_OPTIONS.map((opt) => {
              const isActive = opt.value === "" ? !status : status === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() =>
                    setStatus(opt.value === "" ? null : status === opt.value ? null : opt.value)
                  }
                  className={`h-7 px-3 rounded-md text-[11px] font-medium transition-all ${
                    isActive
                      ? "bg-blue-600 text-white shadow-sm"
                      : "bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700"
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-8 py-6 flex flex-col gap-6">
        {/* Loading */}
        {isLoading && rows.length === 0 && (
          <div className="flex justify-center py-20">
            <Spinner />
          </div>
        )}

        {/* Empty state */}
        {!isLoading && rows.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900">
              <Users className="h-7 w-7 text-zinc-500" />
            </div>
            <p className="text-sm text-zinc-400">팀이 없습니다</p>
            {status && (
              <button
                onClick={() => setStatus(null)}
                className="mt-3 text-xs text-blue-400 hover:text-blue-300 transition-colors"
              >
                전체 보기
              </button>
            )}
          </div>
        )}

        {/* Cards grid */}
        {rows.length > 0 && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {rows.map((t) => (
              <TeamsCard key={t.id} team={t} />
            ))}
          </div>
        )}

        {/* Load more */}
        {hasNextPage && !isLoading && (
          <div className="flex justify-center pt-2">
            <NextPageLoader hasNextPage={hasNextPage} fetchNextPage={fetchNextPage} />
          </div>
        )}
      </main>
    </div>
  );
};

export default TeamsList;
