import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const PaginationBtns = ({
  spacing,
  count,
}: {
  spacing: number;
  count: number;
}) => {
  return (
    <div className="flex justify-center">
      <Stack spacing={spacing}>
        <Pagination count={count} color="primary" />
      </Stack>
    </div>
  );
};

export default PaginationBtns;
