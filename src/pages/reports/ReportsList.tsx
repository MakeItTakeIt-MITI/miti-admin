import { useReportsListHook } from "../../features/reports/hook/useReportsListHook";
import { Link, useSearchParams } from "react-router-dom";

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
import SearchField from "../../components/common/SearchField";
import { ReportsField } from "../../features/reports/interface/reports";
import { NotepadText } from "lucide-react";
import { PaginationWithLinks } from "../../components/common/PaginationWithLinks";

const ReportsList = () => {
  // const [currentPage, setCurrentPage] = useState<number>(1);

  const [searchParams] = useSearchParams();
  const page = searchParams.get("page");
  const pageNow = page ? parseInt(page) : 1;

  const { data } = useReportsListHook(pageNow);
  const currentPage = data?.data?.current_index;

  const endIndex = data?.data.end_index;

  const columns: ColumnDef<ReportsField>[] = [
    {
      accessorKey: `participation_id`,
      header: `참가 ID`,
    },
    {
      accessorKey: "game_id",
      header: "경기 ID",
    },
    {
      accessorKey: "game_status",
      header: "경기 상태",
    },
    {
      accessorKey: "game_title",
      header: "경기 재목",
    },
    {
      accessorKey: "startdate",
      header: "경기 시작일",
    },
    {
      accessorKey: "starttime",
      header: "경기 시작 시간",
    },

    {
      accessorKey: "email",
      header: "피신고자 이메일",
    },
    {
      accessorKey: "nickname",
      header: "피신고자 닉네임",
    },
    {
      accessorKey: "name",
      header: "피신고자 이름",
    },
    {
      accessorKey: "phone",
      header: "피신고자 연락처",
    },
    {
      accessorKey: "num_of_guest_reports",
      header: "신고 개수",
    },
    {
      accessorKey: "info",
      header: "상세",
      cell: ({ row }: { row: Row<ReportsField> }) => (
        <Link to={`${row.original.id}`}>
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
    <section className="w-full  p-8  flex flex-col justify-between bg-black">
      <div className="space-y-4">
        <h1 className="text-white font-bold text-2xl">신고 목록</h1>
        {/* <SearchField /> */}
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
  );
};

export default ReportsList;
