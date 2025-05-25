// import Sidebar from "../components/Sidebar";
// import PaymentIcon from "@mui/icons-material/Payment";

import { Link, useSearchParams } from "react-router-dom";
import { usePaymentsHook } from "../../features/settlements/hooks/usePaymentsHook";
// import { SettlementsField } from "../../features/settlements/interface/settlements";

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
import { SettlementsField } from "../../features/settlements/interface/settlements";

const Settlements = () => {
  // const { data: paymentsData } = usePaymentsListhook(currentPage);
  // const endIndex = paymentsData?.data.end_index;

  const [searchParams] = useSearchParams();
  const page = searchParams.get("page");
  const pageNow = page ? parseInt(page) : 1;

  // const { data: paymentDetailsData } = usePaymentDetailsHook(paymentId)
  const { data } = usePaymentsHook(pageNow);
  const endIndex = data?.data.end_index;
  const currentPage = data?.data?.current_index;

  const columns: ColumnDef<SettlementsField>[] = [
    {
      accessorKey: `id`,
      header: `ID`,
    },
    {
      accessorKey: "account",
      header: "계정",
    },
    {
      accessorKey: "transfer_status",
      header: "이체 상태",
    },
    {
      accessorKey: "amount",
      header: "금액",
    },
    {
      accessorKey: "account_bank",
      header: "은행",
    },

    {
      accessorKey: "account_holder",
      header: "예금주",
    },
    {
      accessorKey: "account_number",
      header: "계좌번호",
    },
    {
      accessorKey: "created_at",
      header: "생성일",
    },
    {
      accessorKey: "info",
      header: "상세",
      cell: ({ row }: { row: Row<SettlementsField> }) => (
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
        <h1 className="text-white font-bold text-2xl">정상금 요청 목록</h1>
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
  );
};

export default Settlements;
