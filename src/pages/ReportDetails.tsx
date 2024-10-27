import { useParams } from "react-router-dom";
import { useReportersListHook } from "../hook/useReportersListHook";
import { useState } from "react";

const ReportDetails = () => {
  const { id } = useParams();
  const gameId = Number(id);
  const { data } = useReportersListHook(gameId);

  //   const reportType = ["기각", "정지", "경고"];
  const [list, setList] = useState(false);

  const handleToggleList = () => setList(!list);

  return (
    <section className="min-h-screen bg-[#e6e5e5] pt-[6rem] py-[4rem]">
      <div className="w-[82rem]  mx-auto px-[8rem] space-y-8  ">
        <h2 className="text-xl font-bold">경기 정보</h2>
        <div className=" bg-[#fdfdfd] py-4 px-4 rounded-xl flex items-center justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <h1 className="font-bold text-lg ">{data?.data.title}</h1>
              <h1 className="font-semibold text-sm ">
                ({" "}
                {data?.data.game_status === "canceled" && (
                  <span className="text-red-500 font-[500]">취소</span>
                )}{" "}
                {data?.data.game_status === "open" && "모집중"}{" "}
                {data?.data.game_status === "closed" && "모집 마감"}{" "}
                {data?.data.game_status === "completed" && "진행 완료"} )
              </h1>
            </div>
            <p className="text-sm text-gray-500 ">{data?.data.id}</p>
          </div>
          <div className=" flex flex-col gap-2">
            <button type="button">신고 상태</button>
            <button
              onClick={handleToggleList}
              type="button"
              className="relative"
            >
              {/* {reportType[0]} */}

              {/* {list && (
                <ul className="absolute top-full bottom-0  bg-gray-400 h-[8rem] w-[10rem] text-start p-4 space-y-2">
                  {reportType.map((type, i) => (
                    <li key={i}>{type}</li>
                  ))}
                </ul>
              )} */}
            </button>
          </div>
        </div>
        {/* second */}
        <div className="bg-[#fdfdfd] py-4 px-4 rounded-xl">
          <table
            style={{ tableLayout: "fixed" }}
            cellPadding="0"
            className="w-full h-full"
          >
            <thead>
              <tr className="text-sm">
                <th className="py-2 text-left">아이디</th>
                <th className="py-2 text-left">시작</th>
                <th className="py-2 text-left">종료</th>
                <th className="py-2 text-left">최소 인원</th>
                <th className="py-2 text-left">최대 인원</th>
                <th className="py-2 text-left">참여비</th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-sm">
                <td>{data?.data.id}</td>
                <td>
                  {data?.data.startdate} ({data?.data.starttime.slice(0, 5)}){" "}
                </td>
                <td>
                  {data?.data.enddate} ({data?.data.endtime.slice(0, 5)}){" "}
                </td>
                <td>{data?.data.min_invitation}</td>
                <td>{data?.data.max_invitation}</td>
                <td>{data?.data.fee}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div
          style={{
            scrollbarWidth: "thin",
          }}
          className="bg-[#fdfdfd] h-[20rem] overflow-y-auto py-4 px-4 rounded-xl space-y-2"
        >
          <h1 className="font-bold ">기타 정보</h1>
          <p className="text-md"> {data?.data.info} </p>
        </div>
        <h2 className="text-xl font-bold">코트 정보</h2>
        <div className="bg-[#fdfdfd] py-4 px-4 rounded-xl">
          <table
            style={{ tableLayout: "fixed" }}
            cellPadding="0"
            className="w-full h-full"
          >
            <thead>
              <tr className="text-sm">
                <th className="py-2 text-left">아이디</th>
                <th className="py-2 text-left w-[300px]">주소</th>
                <th className="py-2 text-left">경도</th>
                <th className="py-2 text-left">위도</th>
                <th className="py-2 text-left">코트 이름</th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-sm">
                <td>{data?.data.court.id}</td>
                <td>
                  {data?.data.court.address} {data?.data.court.address_detail}
                </td>

                <td>{data?.data.court.latitude}</td>
                <td>{data?.data.court.longitude}</td>
                <td>{data?.data.court.name}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <h2 className="text-xl font-bold">신고자 목록</h2>
        <div
          style={{
            scrollbarWidth: "thin",
          }}
          className="bg-[#fdfdfd] h-[20rem] overflow-y-auto py-4 px-4 rounded-xl space-y-2"
        ></div>
      </div>
    </section>
  );
};

export default ReportDetails;
