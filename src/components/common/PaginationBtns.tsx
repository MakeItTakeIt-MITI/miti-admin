import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const PaginationBtns = ({
  spacing,
  count,
  currentPage,
  setCurrentPage,
}: {
  spacing: number;
  count: number;
  currentPage: number;
  setCurrentPage: (arg: number) => void;
}) => {
  const handlePageChange = (_e: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  return (
    <div className="flex justify-center">
      <Stack spacing={spacing}>
        <Pagination
          count={count}
          style={{
            color: "#000",
          }}
          page={currentPage}
          onChange={handlePageChange}
          disabled={count === 0}
        />
      </Stack>
    </div>
  );
};

export default PaginationBtns;
