import { useEffect } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "../components/ui/table";
import { useUserStore } from "../store/useUserStore";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const UserList = () => {
  const { isLoggedIn } = useUserStore();
  //   const router = useRouter();
  const router = useNavigate();

  // const USERS = [
  //   {
  //     id: 1,
  //     name: "지원",
  //     email: "testuser123@miti.com",
  //     authorized: false,
  //     reports: 4,
  //   },
  //   {
  //     id: 2,
  //     name: "지원",
  //     email: "testuser123@miti.com",
  //     authorized: true,
  //     reports: 0,
  //   },
  //   {
  //     id: 3,
  //     name: "지원",
  //     email: "testuser123@miti.com",
  //     authorized: false,
  //     reports: 7,
  //   },
  //   {
  //     id: 4,
  //     name: "지원",
  //     email: "testuser123@miti.com",
  //     authorized: true,
  //     reports: 2,
  //   },
  // ];

  useEffect(() => {
    if (!isLoggedIn) {
      router("/");
    }
  }, [router, isLoggedIn]);

  return (
    <div className="flex h-screen ">
      <Sidebar />
      <section className="p-10 space-y-6 w-full bg-[#f8f8f9]">
        <h1 className="font-bold text-[36px]">회원 관리</h1>

        {/* <div className="px-[2em]">
          <Table className="">
            <TableHeader>
              <TableRow className="flex items-center justify-between">
                <TableHead className="w-[100px] flex justify-center">
                  아이디
                </TableHead>
                <TableHead className="w-[100px]">이름</TableHead>
                <TableHead className="w-[100px]">이메일</TableHead>
                <TableHead className="w-[100px] flex justify-center">
                  인증 상태
                </TableHead>
                <TableHead className="w-[100px] flex justify-center">
                  누적 신고 수
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {USERS.map((user) => (
                <TableRow
                  key={user.id}
                  className="flex items-center justify-between"
                >
                  <TableCell className="w-[100px] flex justify-center">
                    {user.id}
                  </TableCell>

                  <TableCell className="w-[100px]">{user.name}</TableCell>
                  <TableCell className="w-[100px]">{user.email}</TableCell>
                  <TableCell className="w-[100px] flex justify-center">
                    {user.authorized ? "인증됨" : "미인증"}
                  </TableCell>
                  <TableCell className="w-[100px] flex justify-center hover:underline">
                    {user.reports}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div> */}
      </section>
    </div>
  );
};

export default UserList;
