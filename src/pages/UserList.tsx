import { useEffect, useState } from "react";
import { useUserStore } from "../store/useUserStore";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useUsersListHook } from "../hook/useUsersListHook";
import PaginationBtns from "../components/common/PaginationBtns";
import { UserField } from "../interface/users";
import { Button } from "@mui/material";
import SuspendModal from "../components/common/SuspendModal";
import GroupIcon from "@mui/icons-material/Group";

const UserList = () => {
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { isLoggedIn } = useUserStore();
  const navigate = useNavigate();

  const { data } = useUsersListHook(currentPage);
  console.log(data);
  const endIndex = data?.data.end_index;
  const userData = data?.data.page_content;

  // console.lodata);
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [navigate, isLoggedIn]);

  return (
    <section className="flex h-screen bg-[#f8f8f9] relative">
      {open && <SuspendModal setOpen={setOpen} open={open} userId={userId} />}
      <Sidebar />
      <div className="p-10 space-y-6 w-full">
        <div className=" bg-white rounded-[12px] p-4 flex items-center gap-2">
          <GroupIcon fontSize="large" />
          <h1 className="font-bold text-[28px]">회원 관리</h1>
        </div>

        <div className="bg-white rounded-[12px] p-4 min-h-[30rem]  space-y-6  ">
          {userData?.length >= 1 ? (
            <>
              <table
                style={{ tableLayout: "fixed" }}
                cellPadding="10"
                className="w-full h-full"
              >
                <thead>
                  <tr className="">
                    <th>아이디</th>
                    <th>이메일</th>
                    <th>닉네임</th>
                    <th>이름</th>
                    <th>가입 방법</th>
                    <th>정지상태</th>
                  </tr>
                </thead>
                <tbody>
                  {userData?.map((user: UserField) => (
                    <tr
                      key={user.id}
                      className=" border-b border-gray-200 text-center text-[14px] hover:bg-gray-100"
                    >
                      <td>{user.id}</td>

                      <td>{user.email}</td>
                      <td>{user.nickname}</td>
                      <td>{user.name}</td>
                      <td>{user.signup_method}</td>
                      <td>
                        {user.suspended_until === null ? (
                          <div
                            onClick={() => {
                              setUserId(user.id);
                              setOpen(true);
                            }}
                            className="flex justify-center"
                          >
                            <p className="bg-[#dd0000b1] text-white font-bold py-1 border-2  rounded-lg w-20 hover:opacity-85 cursor-pointer">
                              정지하기
                            </p>
                          </div>
                        ) : (
                          <Button disabled>{user.suspended_until} 만료</Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <PaginationBtns
                spacing={2}
                count={endIndex}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            </>
          ) : (
            <h1 className="flex items-center justify-center font-bold text-xl">
              사용자 목록이 없습니다.
            </h1>
          )}
        </div>
      </div>
    </section>
  );
};

export default UserList;
