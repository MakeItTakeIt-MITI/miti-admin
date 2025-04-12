import { useHostReportDetailsHook } from "../hooks/useHostReportDetailsHook";

interface ReportsProps {
  gameId: number;
}

export const Reports = ({ gameId }: ReportsProps) => {
  const { data: hostReportList } = useHostReportDetailsHook(gameId);
  //   const hostReportList = {
  //     status_code: 200,
  //     message: "OK",
  //     data: [
  //       {
  //         id: 1,
  //         report_reason: 1,
  //         game: 6,
  //         report_status: "waiting",
  //         created_at: "2025-01-15T12:59:06.345217+09:00",
  //         reportee: {
  //           id: 1,
  //           email: "invent819@naver.com",
  //           nickname: "test",
  //           name: "김정현",
  //           birthday: "1996-01-09",
  //           signup_method: "email",
  //           phone: "01076362116",
  //         },
  //         reporter: {
  //           id: 2,
  //           email: "testuser1@makeittakeit.kr",
  //           nickname: "testuser1",
  //           name: "테스트유저",
  //           birthday: "2000-01-01",
  //           signup_method: "email",
  //           phone: "01083382165",
  //         },
  //       },

  //       {
  //         id: 1,
  //         report_reason: 1,
  //         game: 6,
  //         report_status: "waiting",
  //         created_at: "2025-01-15T12:59:06.345217+09:00",
  //         reportee: {
  //           id: 1,
  //           email: "invent819@naver.com",
  //           nickname: "test",
  //           name: "김정현",
  //           birthday: "1996-01-09",
  //           signup_method: "email",
  //           phone: "01076362116",
  //         },
  //         reporter: {
  //           id: 2,
  //           email: "testuser1@makeittakeit.kr",
  //           nickname: "testuser1",
  //           name: "테스트유저",
  //           birthday: "2000-01-01",
  //           signup_method: "email",
  //           phone: "01083382165",
  //         },
  //       },
  //       {
  //         id: 1,
  //         report_reason: 1,
  //         game: 6,
  //         report_status: "waiting",
  //         created_at: "2025-01-15T12:59:06.345217+09:00",
  //         reportee: {
  //           id: 1,
  //           email: "invent819@naver.com",
  //           nickname: "test",
  //           name: "김정현",
  //           birthday: "1996-01-09",
  //           signup_method: "email",
  //           phone: "01076362116",
  //         },
  //         reporter: {
  //           id: 2,
  //           email: "testuser1@makeittakeit.kr",
  //           nickname: "testuser1",
  //           name: "테스트유저",
  //           birthday: "2000-01-01",
  //           signup_method: "email",
  //           phone: "01083382165",
  //         },
  //       },
  //     ],
  //   };
  /***

        */

  //   d, 이메일, 닉네임, 이름, 생년월일, 가입수단, 연락처
  const headers = ["신고 ID", "신고 사유 ID", "신고 상태"];
  const userHeaders = [
    "ID",
    "이메일",
    "닉네임",
    "이름",
    "생년월일",
    "가입수단",
    "연락처",
  ];

  return (
    <>
      {hostReportList?.data.length == 0 && (
        <p className="text-center p-10 font-bold">
          호스트 신고 내역이 없습니다!
        </p>
      )}
      {hostReportList?.status_code === 200 &&
        hostReportList?.data.map((hostReport) => (
          <table
            key={hostReport.id}
            className="table-fixed w-full border-collapse mb-10  bg-white p-2 rounded-lg"
          >
            <thead>
              <tr className=" h-[48px]">
                {headers.map((header, i) => (
                  <th key={i} className="text-center px-2 ">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="border-b-2">
              <tr className="h-[48px] text-sm">
                <td className="text-center px-2 ">{hostReport.id}</td>
                <td className="text-center px-2 ">
                  {hostReport.report_reason}
                </td>
                <td className="text-center px-2 ">
                  {hostReport.report_status}
                </td>
              </tr>
            </tbody>

            <thead>
              <tr className=" h-[48px]">
                <th colSpan={userHeaders.length}>신고자 정보</th>
              </tr>
              <tr className="h-[48px]">
                {userHeaders.map((header, i) => (
                  <th key={i} className="text-center px-2 ">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="border-b-2">
              <tr className="h-[48px] text-sm">
                {Object.values(hostReport.reporter).map((val, i) => (
                  <td key={i} className="text-center px-2  truncate">
                    {val}
                  </td>
                ))}
              </tr>
            </tbody>

            <thead>
              <tr className=" h-[48px]">
                <th colSpan={userHeaders.length}>피신고자 정보</th>
              </tr>
              <tr className="h-[48px]">
                {userHeaders.map((header, i) => (
                  <th key={i} className="text-center px-2 ">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="h-[48px] text-sm">
                {Object.values(hostReport.reportee).map((val, i) => (
                  <td key={i} className="text-center px-2  truncate">
                    {val}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        ))}
    </>
  );
};
