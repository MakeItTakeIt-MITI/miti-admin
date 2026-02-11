import { useMemo } from "react";
import SearchField from "../../components/common/SearchField";
import useUsersPage from "../../features/users/hooks/useUsersPage";
import { Link } from "react-router-dom";
import NextPageLoader from "../../features/common/NextPageLoader";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";

import { Badge } from "../..//components/ui/badge";
import { Button } from "../../components/ui/button";

const UserList = () => {
  const { usersDataPage, hasNextPage, fetchNextPage } = useUsersPage();

  const rows = useMemo(() => {
    if (!usersDataPage) return [];
    if (Array.isArray(usersDataPage)) return usersDataPage;

    return usersDataPage;
  }, [usersDataPage]);

  return (
    <section className="w-full  p-8  flex flex-col gap-4 bg-black">
      <div className="space-y-4">
        <h1 className="text-white font-bold text-2xl">회원 목록</h1>
        <SearchField paramKey={"search"} />
      </div>

      {/* table */}
      <div className="w-full overflow-x-auto rounded-lg border border-gray-700">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>이메일</TableHead>
              <TableHead>닉네임</TableHead>
              <TableHead>이름</TableHead>
              <TableHead>생년월일</TableHead>
              <TableHead>가입수단</TableHead>
              <TableHead>전화번호</TableHead>
              <TableHead className=" text-white text-right">상세</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.length > 0 ? (
              rows.map((u) => (
                <TableRow key={u.id}>
                  <TableCell className="font-medium">{u.id}</TableCell>
                  <TableCell>{u.email}</TableCell>
                  <TableCell>{u.nickname}</TableCell>
                  <TableCell>{u.name || "-"}</TableCell>
                  <TableCell>{u.birthday || "-"}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{u.signup_method || "-"}</Badge>
                  </TableCell>
                  <TableCell>{u.phone || "-"}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="link" asChild className="p-0  text-white">
                      <Link to={`detail?userId=${u.id}`}>보기</Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center">
                  결과가 없습니다.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <NextPageLoader hasNextPage={hasNextPage} fetchNextPage={fetchNextPage} />
    </section>
  );
};

export default UserList;
