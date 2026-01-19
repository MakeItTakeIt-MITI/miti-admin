import { useEffect, useState } from "react";

interface UpdateDetailsFormProps {
  gameDetailsData: any;
  cancelEdit: () => void;
  saveEdit: (data: any) => void;
  file?: FileList | null;
  onChangeSaveImageHandler?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  uploadImgToNaverHandler?: () => void;
}

const UpdateDetailsForm = ({
  gameDetailsData,
  cancelEdit,
  saveEdit,
  file,
  onChangeSaveImageHandler,
  uploadImgToNaverHandler,
}: UpdateDetailsFormProps) => {
  console.log(file ? file[0] : null);

  const [formState, setFormState] = useState({
    name: "",
    // address: "",
    // address_detail: "",
    info: "",
  });

  useEffect(() => {
    if (!gameDetailsData) return;

    setFormState({
      name: gameDetailsData.name,
      // address: gameDetailsData.address,
      // address_detail: gameDetailsData.address_detail,
      info: gameDetailsData.info,
    });
  }, [gameDetailsData]);

  const inputCls =
    "h-9 rounded-md bg-gray-800 border border-gray-700 px-3 text-xs text-gray-200 outline-none disabled:opacity-80";
  const textareaCls =
    "rounded-md bg-gray-800 border border-gray-700 p-3 text-xs text-gray-200 outline-none disabled:opacity-80";

  return (
    <form className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3">
      <label className="flex flex-col gap-1">
        <span className="text-[11px] text-gray-400">경기장 이름</span>
        <input
          value={formState.name}
          onChange={(e) => setFormState({ ...formState, name: e.target.value })}
          className={inputCls}
          placeholder={gameDetailsData?.name ?? ""}
        />
      </label>
      {/* 주소 */}
      <label className="flex flex-col gap-1 sm:col-span-2">
        <span className="text-[11px] text-gray-400">주소</span>
        <input
          disabled
          // value={formState.address}
          // onChange={(e) =>
          //   setFormState({ ...formState, address: e.target.value })
          // }
          className={inputCls}
          placeholder={gameDetailsData?.address ?? ""}
        />
      </label>
      {/* 상세 주소 */}
      <label className="flex flex-col gap-1 sm:col-span-2">
        <span className="text-[11px] text-gray-400">상세 주소</span>
        <input
          // value={formState.address_detail}
          // onChange={(e) =>
          //   setFormState({ ...formState, address_detail: e.target.value })
          // }
          disabled
          className={inputCls}
          placeholder={gameDetailsData?.address_detail ?? ""}
        />
      </label>
      {/* 정보 */}
      <label className="flex flex-col gap-1 sm:col-span-2">
        <span className="text-[11px] text-gray-400">정보</span>
        <textarea
          rows={4}
          value={formState.info}
          onChange={(e) => setFormState({ ...formState, info: e.target.value })}
          className={textareaCls}
          placeholder={gameDetailsData?.info ?? ""}
        />
      </label>
      {/* imaages upload */}
      <label className="flex flex-col gap-2 sm:col-span-2">
        <span className="text-[11px] text-gray-400">이미지 업로드</span>

        <div className="flex items-center gap-3">
          <label className="inline-flex items-center px-3 h-9 rounded-md bg-gray-700 hover:bg-gray-600 text-xs text-gray-100 cursor-pointer">
            파일 선택
            <input
              type="file"
              accept="image/png"
              onChange={onChangeSaveImageHandler}
              className="hidden"
            />
          </label>

          <div className="text-[11px] text-gray-400">선택된 파일 없음</div>
        </div>

        <div className="flex flex-wrap gap-2 mt-3">
          {/* 썸네일 프리뷰가 있으면 여기에 렌더링 */}
          {file && file.length > 0 && (
            <img
              src={URL.createObjectURL(file[0])}
              alt="Selected Preview"
              className="w-20 h-20 object-cover rounded-md border border-gray-700"
            />
          )}
        </div>
      </label>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={uploadImgToNaverHandler}
          className="text-[11px] px-3 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white"
        >
          NCP 업로드 테스트
        </button>
        <button
          type="button"
          onClick={() => saveEdit(formState)}
          className="text-[11px] px-3 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white"
        >
          저장
        </button>
        <button
          type="button"
          onClick={cancelEdit}
          className="text-[11px] px-3 py-2 rounded-md bg-red-600 hover:bg-red-700 text-white"
        >
          취소
        </button>
      </div>
    </form>
  );
};

export default UpdateDetailsForm;
