import SearchField from "../../components/common/SearchField";
import useUsersPage from "../../features/users/hooks/useUsersPage";
import { Link } from "react-router-dom";
import NextPageLoader from "../../features/common/NextPageLoader";
import { Spinner } from "../../components/common/Spinner";
import { TABLE_STYLES } from "../../components/common/tableStyles";

const UserList = () => {
  const { hasNextPage, fetchNextPage, rows, isLoading } = useUsersPage();

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <section className="w-full  p-8  flex flex-col gap-4 bg-black">
      <div className="space-y-4">
        <h1 className="text-white font-bold text-2xl">회원 목록</h1>
        <SearchField paramKey={"search"} />
      </div>

      {/* table */}
      <div className={TABLE_STYLES.container}>
        <table className={`min-w-[900px] ${TABLE_STYLES.table}`}>
          <thead className={TABLE_STYLES.head}>
            <tr className={TABLE_STYLES.headerRow}>
              <th className={TABLE_STYLES.headerCell}>ID</th>
              <th className={TABLE_STYLES.headerCell}>이메일</th>
              <th className={TABLE_STYLES.headerCell}>닉네임</th>
              <th className={TABLE_STYLES.headerCell}>이름</th>
              <th className={TABLE_STYLES.headerCell}>생년월일</th>
              <th className={TABLE_STYLES.headerCell}>가입수단</th>
              <th className={TABLE_STYLES.headerCell}>전화번호</th>
              <th className={TABLE_STYLES.headerCell}>상세</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((u) => (
              <tr key={u.id} className={TABLE_STYLES.bodyRow}>
                <td className={TABLE_STYLES.primaryCell}>{u.id}</td>
                <td className={TABLE_STYLES.bodyCell}>{u.email}</td>
                <td className={TABLE_STYLES.bodyCell}>{u.nickname}</td>
                <td className={TABLE_STYLES.bodyCell}>{u.name || "-"}</td>
                <td className={TABLE_STYLES.bodyCell}>{u.birthday || "-"}</td>
                <td className={TABLE_STYLES.bodyCell}>
                  <span className="inline-block rounded bg-gray-700 px-2 py-1 text-xs text-gray-200">
                    {u.signup_method || "-"}
                  </span>
                </td>
                <td className={TABLE_STYLES.bodyCell}>{u.phone || "-"}</td>
                <td className={TABLE_STYLES.bodyCell}>
                  <Link to={`detail?userId=${u.id}`} className="text-blue-400 hover:underline">
                    보기
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <NextPageLoader hasNextPage={hasNextPage} fetchNextPage={fetchNextPage} />
    </section>
  );
};

export default UserList;
