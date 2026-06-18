interface EditActionsButtonProps {
  isEditing: boolean;
  startEdit: () => void;
}

const EditActionsButton = ({ isEditing, startEdit }: EditActionsButtonProps) => {
  return (
    <button
      type="button"
      onClick={startEdit}
      className={`${
        isEditing ? "hidden" : ""
      } text-[11px] px-3.5 py-1.5 rounded-lg border border-zinc-700 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 font-medium transition-colors`}
    >
      편집
    </button>
  );
};

export default EditActionsButton;
