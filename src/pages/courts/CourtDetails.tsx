import { Link } from "react-router-dom";
import CourtDetailsImgCard from "../../features/courts/components/details/CourtDetailsImgCard";
import CourtDetailsContainer from "../../features/courts/components/details/CourtDetailsContainer";
import EditActionsButton from "../../features/courts/components/details/EditActionsButton";
import CoordinatesField from "../../features/courts/components/details/CoordinatesField";
import { useCourtsDetailPage } from "../../features/courts/hooks/useCourtsDetailPage";
import UpdateDetailsForm from "../../features/courts/components/details/UpdateDetailsForm";
import { Spinner } from "../../components/common/Spinner";

export default function CourtDetails() {
  const {
    gameDetailsData,
    startEdit,
    cancelEdit,
    isLoading,
    isEditing,
    saveEdit,
    onChangeSaveImageHandler,
    uploadImgToNaverHandler,
    file,
    uploadImgPending,
  } = useCourtsDetailPage();

  if (isLoading || uploadImgPending) return <Spinner />;

  if (!gameDetailsData) {
    return (
      <div className="flex min-h-dvh flex-col items-center justify-center gap-3 bg-black">
        <p className="text-pretty text-sm text-gray-500">경기장 정보를 불러올 수 없습니다.</p>
        <Link to="/courts" className="text-xs text-blue-400 hover:text-blue-300">
          목록으로 돌아가기
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-dvh bg-black">
      {/* Sticky nav */}
      <header className="sticky top-0 z-10 flex items-center justify-between border-b border-white/5 bg-black/90 px-6 py-3 backdrop-blur-sm">
        <nav className="flex items-center gap-2 text-[11px]" aria-label="경로">
          <Link to="/courts" className="text-gray-500 hover:text-gray-300">
            경기장
          </Link>
          <span className="text-gray-700" aria-hidden="true">
            /
          </span>
          <span className="tabular-nums text-gray-400">{gameDetailsData.id}</span>
        </nav>
        <EditActionsButton isEditing={isEditing} startEdit={startEdit} />
      </header>

      <main className="mx-auto max-w-4xl px-6 pb-16 pt-6">
        {/* Hero image */}
        <div className="mb-6 overflow-hidden rounded-xl border border-white/5">
          <CourtDetailsImgCard gameDetailsData={gameDetailsData} />
        </div>

        {/* Name + address */}
        <div className="mb-6 px-1">
          <h1 className="text-balance text-2xl font-bold text-white">
            {gameDetailsData.name ?? "이름 없음"}
          </h1>
          <p className="text-pretty mt-1.5 text-sm text-gray-400">
            {gameDetailsData.address}
            {gameDetailsData.address_detail && (
              <>
                {" "}
                · <span className="text-gray-500">{gameDetailsData.address_detail}</span>
              </>
            )}
          </p>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {/* Info / edit form — 2/3 */}
          <div className="rounded-xl border border-white/5 bg-gray-900/50 p-5 lg:col-span-2">
            <p className="mb-4 text-[11px] font-medium uppercase text-gray-600">경기장 정보</p>
            {!isEditing ? (
              <CourtDetailsContainer gameDetailsData={gameDetailsData} isEditing={isEditing} />
            ) : (
              <UpdateDetailsForm
                gameDetailsData={gameDetailsData}
                saveEdit={saveEdit}
                cancelEdit={cancelEdit}
                file={file}
                onChangeSaveImageHandler={onChangeSaveImageHandler}
                uploadImgToNaverHandler={uploadImgToNaverHandler}
              />
            )}
          </div>

          {/* Coordinates sidebar — 1/3 */}
          <div className="rounded-xl border border-white/5 bg-gray-900/50 p-5">
            <p className="mb-4 text-[11px] font-medium uppercase text-gray-600">위치 좌표</p>
            <CoordinatesField gameDetailsData={gameDetailsData} />
          </div>
        </div>
      </main>
    </div>
  );
}
