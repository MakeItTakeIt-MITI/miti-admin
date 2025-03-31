import { useState } from "react";
import { Link } from "react-router-dom";
import { useUsersListHook } from "../../hook/useUsersListHook";
import PaginationBtns from "../../components/common/PaginationBtns";

import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import { PageLayout } from "../../features/common/PageLayout";
import { PageHeader } from "../../features/common/PageHeader";
const UserList = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { data, isLoading } = useUsersListHook(currentPage);

  const endIndex = data?.data.end_index;
  const userData = data?.data.page_content;

  return (
    <>
      <PageHeader title="회원 목록" />
      <PageLayout>
        <div className="flex flex-col gap-2">
          <ul className="flex w-full  items-center h-[4rem] bg-white">
            <li className="font-bold  w-[10%] text-center ">ID</li>
            <li className="font-bold  w-[10%] text-center ">가입수단</li>
            <li className="font-bold  w-[15%] text-center ">닉네임</li>
            <li className="font-bold  w-[25%] text-center ">이메일</li>
            <li className="font-bold  w-[10%] text-center ">생년월일</li>
            <li className="font-bold  w-[20%] text-center ">연락처</li>
            <li className="font-bold  w-[10%] text-center ">상세</li>
          </ul>
          <hr />
          <div className="flex flex-col gap-2 py-4 bg-white">
            {!isLoading && data?.status_code === 200 ? (
              userData?.map(
                (user: {
                  id: number;
                  signup_method: string;
                  nickname: string;
                  email: string;
                  birthday: string;
                  phone: string;
                }) => {
                  return (
                    <ul className="flex w-full  items-center text-sm hover:bg-gray-200 h-[60px] ">
                      <li className="w-[10%] text-center ">{user.id}</li>
                      <li className="w-[10%] text-center ">
                        {user.signup_method}
                      </li>
                      <li className="w-[15%] text-center truncate ">
                        {user.nickname}
                      </li>
                      <li className="w-[25%] text-center  truncate">
                        {user.email}
                      </li>

                      <li className="w-[10%] text-center  ">{user.birthday}</li>
                      <li className="w-[20%] text-center  ">{user.phone}</li>

                      <Link to={`${user.id}`} className="w-[10%] text-center">
                        <PersonSearchIcon />
                      </Link>
                    </ul>
                  );
                }
              )
            ) : (
              <h1 className="flex items-center justify-center font-bold">
                오류 발생
              </h1>
            )}
          </div>
        </div>
        <PaginationBtns
          spacing={2}
          count={endIndex}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </PageLayout>
    </>
  );
};

export default UserList;
