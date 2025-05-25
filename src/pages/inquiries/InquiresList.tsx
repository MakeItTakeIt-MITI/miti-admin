import { useInquiriesListHook } from "../../features/inquries/hooks/useInquiriesListHook";
import { Link, useSearchParams } from "react-router-dom";
import { InquiryDataField } from "../../features/inquries/interface/inquries";

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

const InquiresList = () => {
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page");
  const pageNow = page ? parseInt(page) : 1;

  const { data } = useInquiriesListHook(pageNow);
  const currentPage = data?.data?.current_index;

  const endIndex = data?.data.end_index;

  const columns: ColumnDef<InquiryDataField>[] = [
    {
      accessorKey: `id`,
      header: `문의 ID`,
    },
    {
      accessorKey: "user",
      header: "사용자 ID",
    },
    {
      accessorKey: "title",
      header: "제목",
    },
    {
      accessorKey: "num_of_answers",
      header: "답변 갯수",
    },
    {
      accessorKey: "created_at",
      header: "생성일",
    },

    {
      accessorKey: "modified_at",
      header: "수정일",
    },

    {
      accessorKey: "info",
      header: "상세",
      cell: ({ row }: { row: Row<InquiryDataField> }) => (
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
        <h1 className="text-white font-bold text-2xl">유저 문의 목록</h1>
        <SearchField />
        <Table className=" overflow-y-auto  text-white">
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
    // <>
    //   <PageLayout>
    //     <div className="flex flex-col gap-2 ">
    //       {data?.status_code === 200 ? (
    //         <TableLayout
    //           headers={headers}
    //           data={tableData}
    //           context="신고 내역이 없습니다!"
    //         />
    //       ) : (
    //         <h1 className="flex items-center justify-center font-bold">
    //           오류 발생
    //         </h1>
    //       )}
    //     </div>
    //     <PaginationBtns
    //       spacing={2}
    //       count={endIndex}
    //       currentPage={currentPage}
    //       setCurrentPage={setCurrentPage}
    //     />
    //   </PageLayout>
    // </>
  );
};

export default InquiresList;
