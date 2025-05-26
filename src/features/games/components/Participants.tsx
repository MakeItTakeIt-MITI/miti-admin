import { Link } from "react-router-dom";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import { useGameParticipantsHook } from "../hooks/useGameParticipantsHook";

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
} from "../../../components/ui/table";

interface ParticipantsProps {
  gameId: number;
}

interface UserProfile {
  weight?: number;
  position?: string;
  role?: string;
}

interface User {
  nickname?: string;
  email?: string;
  birthday?: string;
  phone?: string;
  player_profile?: UserProfile;
}

interface Participant {
  id: string;
  participation_status?: string;
  user?: User;
}

export const Participants = ({ gameId }: ParticipantsProps) => {
  const { data: gameParticipantsData } = useGameParticipantsHook(gameId);

  const columns: ColumnDef<Participant>[] = [
    {
      accessorKey: "info",
      header: "상세",
      cell: ({ row }: { row: Row<Participant> }) => (
        <Link to={`/users/detail?userId=${row.original.id}`}>
          <PersonSearchIcon />
        </Link>
      ),
    },
    {
      accessorKey: `participation_status`,
      header: `참가 상태`,
    },
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      header: "닉네임",
      accessorFn: (row) => row.user?.nickname,
      id: "userNickname",
      cell: (info) => info.getValue(),
    },
    {
      header: "이메일",
      accessorFn: (row) => row.user?.email,
      id: "userEmail",
      cell: (info) => info.getValue(),
    },
    {
      header: "생년월일",
      accessorFn: (row) => row.user?.birthday,
      id: "userBirthday",
      cell: (info) => info.getValue(),
    },

    {
      header: "연라처",
      accessorFn: (row) => row.user?.phone,
      id: "userPhone",
      cell: (info) => info.getValue(),
    },
    {
      header: "체중",
      accessorFn: (row) => row.user?.player_profile?.weight,
      id: "userWeight",
      cell: (info) => info.getValue() ?? "null",
    },
    {
      header: "포지션",
      accessorFn: (row) => row.user?.player_profile?.position,
      id: "userPosition",
      cell: (info) => info.getValue() ?? "null",
    },
    {
      header: "역할",
      accessorFn: (row) => row.user?.player_profile?.role,
      id: "userRole",
      cell: (info) => info.getValue() ?? "null",
    },
  ];

  const table = useReactTable({
    data: gameParticipantsData?.data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    enableRowSelection: true,
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <>
      <Table className="bg-gray-800">
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
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
};
