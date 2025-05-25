import { Link, useSearchParams } from "react-router-dom";
import { useUsersListHook } from "../../hook/useUsersListHook";

import PersonSearchIcon from "@mui/icons-material/PersonSearch";

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
import { UserField } from "../../interface/users";
import { PaginationWithLinks } from "../../components/common/PaginationWithLinks";
import SearchField from "../../components/common/SearchField";

const UserList = () => {
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page");
  const pageNow = page ? parseInt(page) : 1;

  const { data } = useUsersListHook(pageNow);
  const currentPage = data?.data?.current_index;
  const endIndex = data?.data?.end_index;

  const columns: ColumnDef<UserField>[] = [
    {
      accessorKey: `id`,
      header: `ID`,
      cell: ({ row }) => (
        <Link to={`${row.original.id}`}>{row.getValue("id")}</Link>
      ),
    },
    {
      accessorKey: "signup_method",
      header: "가임수단",
    },
    {
      accessorKey: "nickname",
      header: "닉네임",
    },
    {
      accessorKey: "birthday",
      header: "생년월일",
    },
    {
      accessorKey: "email",
      header: "이메일",
    },

    {
      accessorKey: "phone",
      header: "전화번호",
    },
    {
      accessorKey: "info",
      header: "상세",
      cell: ({ row }: { row: Row<UserField> }) => (
        <Link to={`${row.original.id}`}>
          <PersonSearchIcon />
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
        <h1 className="text-white font-bold text-2xl">회원 목록</h1>
        <SearchField />
        <Table>
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

export default UserList;
