interface EditActionsButtonProps {
  isEditing: boolean;
  startEdit: () => void;
}

const EditActionsButton = ({
  isEditing,
  startEdit,
}: EditActionsButtonProps) => {
  return (
    <button
      type="button"
      onClick={startEdit}
      className={`${
        isEditing && "hidden"
      } text-[11px] px-3 py-2 rounded-md bg-gray-800 hover:bg-gray-700 text-gray-200`}
    >
      편집
    </button>
  );
};

export default EditActionsButton;
