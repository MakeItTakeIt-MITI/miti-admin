import SearchField from "../../components/common/SearchField";
import useUsersPage from "../../features/users/hooks/useUsersPage";
import { Link } from "react-router-dom";
import NextPageLoader from "../../features/common/NextPageLoader";
import { Spinner } from "../../components/common/Spinner";

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
      <div className="w-full overflow-x-auto rounded-lg border border-gray-700">
        <table className="min-w-[900px] w-full text-xs">
          <thead className="bg-gray-800 text-gray-200">
            <tr className="text-left">
              <th className="px-4 py-3 font-medium">ID</th>
              <th className="px-4 py-3 font-medium">이메일</th>
              <th className="px-4 py-3 font-medium">닉네임</th>
              <th className="px-4 py-3 font-medium">이름</th>
              <th className="px-4 py-3 font-medium">생년월일</th>
              <th className="px-4 py-3 font-medium">가입수단</th>
              <th className="px-4 py-3 font-medium">전화번호</th>
              <th className="px-4 py-3 font-medium">상세</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((u) => (
              <tr
                key={u.id}
                className="border-t border-gray-700 hover:bg-gray-800 transition-colors"
              >
                <td className="px-4 py-2 text-white">{u.id}</td>
                <td className="px-4 py-2 text-gray-300">{u.email}</td>
                <td className="px-4 py-2 text-gray-300">{u.nickname}</td>
                <td className="px-4 py-2 text-gray-300">{u.name || "-"}</td>
                <td className="px-4 py-2 text-gray-300">{u.birthday || "-"}</td>
                <td className="px-4 py-2">
                  <span className="inline-block rounded bg-gray-700 px-2 py-1 text-xs text-gray-200">
                    {u.signup_method || "-"}
                  </span>
                </td>
                <td className="px-4 py-2 text-gray-300">{u.phone || "-"}</td>
                <td className="px-4 py-2">
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
