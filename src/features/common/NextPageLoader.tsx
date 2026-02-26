interface NextPageLoaderProps {
  hasNextPage: boolean | undefined;
  fetchNextPage: () => void;
}

const NextPageLoader = ({ hasNextPage, fetchNextPage }: NextPageLoaderProps) => {
  return (
    <div className="flex items-center justify-center w-full">
      <button
        type="button"
        disabled={!hasNextPage}
        onClick={() => hasNextPage && fetchNextPage()}
        className="px-6 py-2 text-sm  rounded-lg bg-white text-black border border-gray-300 hover:bg-gray-100 transition disabled:opacity-40"
      >
        더 보기
      </button>
    </div>
  );
};

export default NextPageLoader;
