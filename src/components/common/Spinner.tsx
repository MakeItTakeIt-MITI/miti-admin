export const Spinner = () => {
  return (
    <section className="w-full min-h-screen p-8 flex items-center justify-center bg-black">
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 rounded-full border-4 border-t-transparent border-white animate-spin" />
        <div className="text-gray-300 text-sm">불러오는 중...</div>
      </div>
    </section>
  );
};
