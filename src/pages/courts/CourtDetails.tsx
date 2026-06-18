import { Link } from "react-router-dom";
import CourtDetailsImgCard from "../../features/courts/components/details/CourtDetailsImgCard";
import CourtDetailsContainer from "../../features/courts/components/details/CourtDetailsContainer";
import EditActionsButton from "../../features/courts/components/details/EditActionsButton";
import CoordinatesField from "../../features/courts/components/details/CoordinatesField";
import { useCourtsDetailPage } from "../../features/courts/hooks/useCourtsDetailPage";
import UpdateDetailsForm from "../../features/courts/components/details/UpdateDetailsForm";
import { Spinner } from "../../components/common/Spinner";

export default function CourtDetails() {
  const { gameDetailsData, startEdit, cancelEdit, isLoading, isEditing, saveEdit } =
    useCourtsDetailPage();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        <Spinner />
      </div>
    );
  }

  if (!gameDetailsData) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-black text-white">
        <p className="text-sm text-zinc-500 font-medium">경기장 정보를 불러올 수 없습니다.</p>
        <Link
          to="/courts"
          className="h-9 px-4 flex items-center justify-center rounded-lg border border-zinc-700 text-zinc-400 text-xs font-medium hover:text-white hover:border-zinc-650 transition-colors"
        >
          목록으로 돌아가기
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {/* Sticky nav */}
      <header className="sticky top-0 z-10 bg-zinc-950/95 backdrop-blur border-b border-zinc-800">
        <div className="px-8 py-4 flex items-center justify-between gap-4">
          <nav className="flex items-center gap-2 text-xs font-mono" aria-label="경로">
            <Link to="/courts" className="text-zinc-500 hover:text-zinc-350 transition-colors">
              경기장 목록
            </Link>
            <span className="text-zinc-700" aria-hidden="true">
              /
            </span>
            <span className="text-zinc-300 font-semibold">#{gameDetailsData.id}</span>
          </nav>
          <div className="flex items-center gap-2">
            <Link
              to="/courts"
              className="h-9 px-4 flex items-center justify-center rounded-lg border border-zinc-700 text-zinc-400 text-xs font-medium hover:text-white hover:border-zinc-650 transition-colors"
            >
              목록으로
            </Link>
            <EditActionsButton isEditing={isEditing} startEdit={startEdit} />
          </div>
        </div>
      </header>

      <main className="flex-1 px-8 py-6 max-w-5xl w-full mx-auto space-y-6">
        {/* Hero image */}
        <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950">
          <CourtDetailsImgCard gameDetailsData={gameDetailsData} />
        </div>

        {/* Name + address */}
        <div className="space-y-1.5 px-1">
          <h1 className="text-2xl font-bold text-white tracking-tight">
            {gameDetailsData.name ?? "이름 없음"}
          </h1>
          <p className="text-sm text-zinc-400 font-mono">
            {gameDetailsData.address}
            {gameDetailsData.address_detail && (
              <>
                {" "}
                · <span className="text-zinc-500">{gameDetailsData.address_detail}</span>
              </>
            )}
          </p>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {/* Info / edit form — 2/3 */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-6 lg:col-span-2 space-y-4">
            <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 pb-3 border-b border-zinc-800/80">
              경기장 세부 정보
            </p>
            {!isEditing ? (
              <CourtDetailsContainer gameDetailsData={gameDetailsData} isEditing={isEditing} />
            ) : (
              <UpdateDetailsForm
                gameDetailsData={gameDetailsData}
                saveEdit={saveEdit}
                cancelEdit={cancelEdit}
              />
            )}
          </div>

          {/* Coordinates sidebar — 1/3 */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-6 space-y-4 h-fit">
            <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 pb-3 border-b border-zinc-800/80">
              위치 좌표
            </p>
            <CoordinatesField gameDetailsData={gameDetailsData} />
          </div>
        </div>
      </main>
    </div>
  );
}
