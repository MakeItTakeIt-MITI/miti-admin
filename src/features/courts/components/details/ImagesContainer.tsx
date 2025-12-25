const ImagesContainer = ({ isEditing, display, removeImage }) => {
  return (
    <div className="w-full space-y-2 ">
      <span className="text-[11px] text-gray-400">이미지</span>
      <div className="flex flex-wrap gap-2">
        {(display.images && display.images.length > 0
          ? display.images
          : []
        )?.map((url, i) => (
          <div key={i} className="relative">
            <img
              src={url}
              alt={`img-${i}`}
              className="h-16 w-16 object-cover rounded border border-gray-700"
            />
            {isEditing && (
              <button
                type="button"
                onClick={() => removeImage(i)}
                className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-rose-600 text-white text-xs"
                aria-label="remove"
              >
                ×
              </button>
            )}
          </div>
        ))}
      </div>

      {isEditing && (
        <div className="flex items-center gap-2">
          <label className="h-9 inline-flex items-center px-3 rounded-md bg-gray-700 hover:bg-gray-600 text-xs text-gray-100 cursor-pointer">
            파일 선택
            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              // onChange={(e) => handleFilesAdd(e.target.files)}
            />
          </label>
          <span className="text-[11px] text-gray-500">여러 장 선택 가능</span>
        </div>
      )}
    </div>
  );
};

export default ImagesContainer;
