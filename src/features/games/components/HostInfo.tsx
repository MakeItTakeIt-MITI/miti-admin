export const HostInfo = ({ data }) => {
  const headers = ["ID", "이름", "닉네임", "이메일", "생년월일", "연락처"];

  return (
    <>
      <table className=" table-fixed w-full border-collapse ">
        <thead>
          <tr className="bg-white h-[60px] ">
            {headers.map((header, i) => (
              <th key={i} className="text-center px-2">
                {header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data !== undefined && (
            <tr className="h-[60px] bg-white  text-sm text-center">
              <td>{data.id}</td>
              <td>{data.name}</td>
              <td>{data.nickname}</td>
              <td>{data.email}</td>
              <td>{data.birthday}</td>
              <td>{data.phone}</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};
