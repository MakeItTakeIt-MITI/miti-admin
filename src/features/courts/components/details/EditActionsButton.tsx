import React from "react";

const EditActionsButton = ({ isEditing, startEdit, saveEdit, cancelEdit }) => {
  return (
    <div className="mt-2 flex items-center gap-2">
      {!isEditing ? (
        <button
          type="button"
          onClick={startEdit}
          className="text-[11px] px-3 py-2 rounded-md bg-gray-800 hover:bg-gray-700 text-gray-200"
        >
          편집
        </button>
      ) : (
        <>
          <button
            type="button"
            onClick={saveEdit}
            className="text-[11px] px-3 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white"
          >
            저장
          </button>
          <button
            type="button"
            onClick={cancelEdit}
            className="text-[11px] px-3 py-2 rounded-md bg-gray-700 hover:bg-gray-600 text-gray-100"
          >
            취소
          </button>
        </>
      )}
    </div>
  );
};

export default EditActionsButton;
