import { Link } from "react-router-dom";
import CourtDetailsImgCard from "../../features/courts/components/details/CourtDetailsImgCard";
import CourtDetailsContainer from "../../features/courts/components/details/CourtDetailsContainer";
import EditActionsButton from "../../features/courts/components/details/EditActionsButton";
import CoordinatesField from "../../features/courts/components/details/CoordinatesField";
import { useCourtsDetailPage } from "../../features/courts/hooks/useCourtsDetailPage";

import UpdateDetailsForm from "../../features/courts/components/details/UpdateDetailsForm";

export default function CourtDetails() {
  const {
    gameDetailsData,
    startEdit,
    cancelEdit,
    isEditing,
    saveEdit,
    onChangeSaveImageHandler,
    uploadImgToNaverHandler,
    file,
    uploadImgPending,
  } = useCourtsDetailPage();

  if (!gameDetailsData) {
    return (
      <div className="w-full p-8 text-white">
        경기장 정보를 불러오는 중입니다...
      </div>
    );
  }

  // NCP 이미지 업로드 로딩 화면
  if (uploadImgPending) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-t-transparent border-white rounded-full animate-spin" />
          <div className="text-sm text-white">이미지 업로드 중...</div>
        </div>
      </div>
    );
  }

  return (
    <section className="w-full p-8 flex flex-col gap-6 bg-black">
      <div className="flex items-center justify-between">
        <h1 className="text-white font-bold text-2xl">
          경기장 상세 - ID ({gameDetailsData?.id})
        </h1>

        <Link to="/courts" className="text-xs text-gray-400 hover:text-white">
          목록으로
        </Link>
      </div>

      {/* Image card */}
      <div className="group rounded-lg overflow-hidden border py-2 border-gray-800 bg-gray-900">
        <CourtDetailsImgCard gameDetailsData={gameDetailsData} />

        <div className="p-4 flex flex-col items-start gap-3">
          {!isEditing ? (
            <CourtDetailsContainer
              gameDetailsData={gameDetailsData}
              isEditing={isEditing}
              // draft={draft}
            />
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

          <CoordinatesField gameDetailsData={gameDetailsData} />

          <EditActionsButton isEditing={isEditing} startEdit={startEdit} />
        </div>
      </div>
    </section>
  );
}
