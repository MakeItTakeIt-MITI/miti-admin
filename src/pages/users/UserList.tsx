import { useState } from "react";
import { Link } from "react-router-dom";
import { useUsersListHook } from "../../hook/useUsersListHook";
import PaginationBtns from "../../components/common/PaginationBtns";

import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import { PageLayout } from "../../features/common/PageLayout";
import { TableLayout } from "../../components/common/TableLayout";
import { UsersField } from "../../features/users/interface/users";

const UserList = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { data, isLoading } = useUsersListHook(currentPage);

  const endIndex = data?.data.end_index;
  const userData = data?.data.page_content;

  const headers = [
    "ID",
    "가입수단",
    "닉네임",
    "이메일",
    "생년월일",
    "연락처",
    "상세",
  ];

  const tableData =
    !isLoading && data?.status_code === 200
      ? userData.map((user: UsersField) => [
          user.id,
          user.signup_method,
          user.nickname,
          user.email,
          user.birthday,
          user.phone,
          <Link to={`${user.id}`}>
            <PersonSearchIcon />
          </Link>,
        ])
      : [];

  return (
    <PageLayout>
      <div className="flex flex-col gap-2">
        {data?.status_code === 200 ? (
          <TableLayout
            headers={headers}
            data={tableData}
            context="가입한 사용자가 없습니다!"
          />
        ) : (
          <h1 className="flex items-center justify-center font-bold">
            오류 발생
          </h1>
        )}
      </div>
      <PaginationBtns
        spacing={2}
        count={endIndex}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </PageLayout>
  );
};

export default UserList;
