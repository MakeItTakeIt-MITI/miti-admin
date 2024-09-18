import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const PaginationBtns = ({
  spacing,
  count,
  currentPage,
  setCurrentPage,
  fetchNextPage,
  hasNextPage,
}: {
  spacing: number;
  count: number;
  currentPage: number;
  setCurrentPage: (arg: number) => void;
}) => {
  const handlePageChange = (e: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
    if (value > currentPage) {
      fetchNextPage({ pageParam: value });
    }
  };

  return (
    <div className="flex justify-center">
      <Stack spacing={spacing}>
        <Pagination
          count={count}
          color="primary"
          page={currentPage}
          onChange={handlePageChange}
          // disabled={!hasNextPage}
        />
      </Stack>
    </div>
  );
};

export default PaginationBtns;
