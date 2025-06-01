import { Link, useSearchParams } from "react-router-dom";
import { useGamesListHook } from "../../hook/useGamesListHook";
import { GameField } from "../../features/games/interface/game";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  Row,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { NotepadText } from "lucide-react";
import { PaginationWithLinks } from "../../components/common/PaginationWithLinks";
import SearchField from "../../components/common/SearchField";
import { Badge } from "../../components/ui/badge";

const GamesList = () => {
  // const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page");
  const pageNow = page ? parseInt(page) : 1;
  // const { data } = useUsersListHook(currentPage);
  const { data } = useGamesListHook(pageNow);
  const endIndex = data?.data.end_index;
  const currentPage = data?.data?.current_index;

  const columns: ColumnDef<GameField>[] = [
    {
      accessorKey: `id`,
      header: `ID`,
    },
    {
      accessorKey: "title",
      header: "제목",
    },
    {
      accessorKey: "game_status",
      header: "경기 상태",
      cell: ({ row }: { row: Row<GameField> }) => {
        const status = row.original.game_status;
        let statusElement;
        switch (status) {
          case "open":
            statusElement = <Badge variant={"secondary"}>모집중</Badge>;
            break;
          case "closed":
            statusElement = (
              <Badge variant={"destructive"}>모집완료(마감)</Badge>
            );
            break;
          case "canceled":
            statusElement = <Badge variant={"destructive"}>경기취소</Badge>;
            break;
          case "completed":
            statusElement = (
              <Badge variant={"outline"} className="text-white">
                경기 완료
              </Badge>
            );
            break;
          default:
            statusElement = <span className="text-red-400">알 수 없음</span>;
        }
        return <span>{statusElement}</span>;
      },
    },
    {
      accessorKey: "num_of_participations",
      header: "참여 인원",
    },
    {
      accessorKey: "min_invitation",
      header: "최소 인원",
    },
    {
      accessorKey: "max_invitation",
      header: "최대 인원",
    },
    {
      accessorKey: "startdate",
      header: "시작일",
    },
    {
      accessorKey: "starttime",
      header: "시간 시간",
    },

    {
      accessorKey: "enddate",
      header: "종료일",
    },
    {
      accessorKey: "endtime",
      header: "종료 시간",
    },

    {
      accessorKey: "fee",
      header: "참여비",
    },
    {
      accessorKey: "info",
      header: "상세",
      cell: ({ row }: { row: Row<GameField> }) => (
        <Link to={`detail?gameId=${row.original.id}&tab=gameInfo`}>
          <NotepadText />
        </Link>
      ),
    },
  ];

  const table = useReactTable({
    data: data?.data.page_content || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    enableRowSelection: true,
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <>
      <section className="w-full  p-8  flex flex-col justify-between bg-black">
        <div className="space-y-4">
          <h1 className="text-white font-bold text-2xl">경기 목록</h1>
          <SearchField />
          <Table className=" ">
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <PaginationWithLinks
          page={currentPage}
          pageSize={5}
          totalCount={endIndex}
        />
      </section>
    </>
  );
};

export default GamesList;
