import { useLocation, useNavigate } from "react-router-dom";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "../../ui/pagination";

interface CursorPaginationProps {
  nextCursor?: string | null;
  prevCursor?: string | null;
  hasMore: boolean;
  cursorSearchParam?: string;
}

export function CursorPagination({
  nextCursor,
  prevCursor,
  hasMore,
  cursorSearchParam = "cursor",
}: CursorPaginationProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;
  const searchParams = new URLSearchParams(location.search);

  const buildLink = (cursor: string | null) => {
    const newParams = new URLSearchParams(searchParams.toString());

    if (cursor) newParams.set(cursorSearchParam, cursor);
    else newParams.delete(cursorSearchParam);

    return `${pathname}?${newParams.toString()}`;
  };

  return (
    <Pagination>
      <PaginationContent>
        {/* PREVIOUS */}
        <PaginationItem>
          <PaginationPrevious
            href={prevCursor ? buildLink(prevCursor) : undefined}
            aria-disabled={!prevCursor}
            className={!prevCursor ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>

        {/* NEXT */}
        <PaginationItem>
          <PaginationNext
            href={hasMore && nextCursor ? buildLink(nextCursor) : undefined}
            aria-disabled={!hasMore}
            className={!hasMore ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
