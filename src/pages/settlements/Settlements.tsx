import { useSearchParams } from "react-router-dom";
import { usePaymentsHook } from "../../features/settlements/hooks/usePaymentsHook";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
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
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../components/ui/sheet";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";

import { Button } from "../../components/ui/button";
import { useTransferRequestDetails } from "../../features/settlements/hooks/useTransferRequestDetails.tsx";
import useEditTransferStatus from "../../features/settlements/hooks/useEditTransferStatus.tsx";

const Settlements = () => {
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page");
  const pageNow = page ? parseInt(page) : 1;

  const [settlementId, setSettlementId] = useState<null | number>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const { data } = usePaymentsHook(pageNow);
  const endIndex = data?.data.end_index;
  const currentPage = data?.data?.current_index;

  const { data: settlementDetailsData } =
    useTransferRequestDetails(settlementId);

  const [statusValue, setStatusValue] = useState(
    settlementDetailsData?.data.transfer_status
  );

  const { mutate } = useEditTransferStatus(settlementId);

  const handleSubmitPaymentStatus = () => {
    const data = { transfer_status: statusValue };
    mutate(data, {
      onSuccess: () => {
        alert("Payment status updated successfully!");
      },
      onError: (error) => {
        console.error("Failed to update payment status:", error);
        alert("Failed to update payment status.");
      },
    });
  };

  const handleSetSettlementId = (id: number | null) => {
    console.log("Setting settlementId:", id);
    setSettlementId(id);
    setIsSheetOpen(true);
  };

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
      cell: ({ row }) => (
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger onClick={() => handleSetSettlementId(row.original.id)}>
            <button className="flex items-center justify-center">
              <NotepadText />
            </button>
          </SheetTrigger>
          <SheetContent className="bg-[#1f2937] space-y-4">
            <SheetHeader>
              <SheetTitle className="text-white text-xl font-bold space-y-1">
                <span>정상금 상세 정보 ({settlementDetailsData?.data.id})</span>
                <hr />
              </SheetTitle>
            </SheetHeader>
            <SheetDescription className="text-white flex flex-col justify-between gap-8">
              <ul className="space-y-4">
                {Object.keys(settlementDetailsData?.data || {}).map((key) => (
                  <li key={key} className="">
                    {key}: {settlementDetailsData?.data[key]}
                  </li>
                ))}
              </ul>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue
                    placeholder={settlementDetailsData?.data.transfer_status}
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="completed">
                    <button
                      onClick={() => setStatusValue("completed")}
                      type="button"
                    >
                      completed
                    </button>
                  </SelectItem>
                  <SelectItem value="waiting">
                    {" "}
                    <button
                      onClick={() => setStatusValue("waiting")}
                      type="button"
                    >
                      waiting
                    </button>
                  </SelectItem>
                  <SelectItem value="decline">
                    {" "}
                    <button
                      onClick={() => setStatusValue("decline")}
                      type="button"
                    >
                      decline
                    </button>
                  </SelectItem>
                </SelectContent>
              </Select>
              <Button
                onClick={handleSubmitPaymentStatus}
                variant={"destructive"}
                size={"lg"}
                className="w-full"
              >
                이체 상태 적용하기
              </Button>
            </SheetDescription>
          </SheetContent>
        </Sheet>

        // </button>
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
