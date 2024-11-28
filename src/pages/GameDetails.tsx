import { useParams } from "react-router-dom";
import { useGameDetailsDataHook } from "../hook/useGameDetailsDataHook";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const GameDetails = () => {
  const { id } = useParams();
  const gameId = Number(id);
  const { data } = useGameDetailsDataHook(gameId);
  console.log(data);
  return (
    <section
      style={{
        scrollbarWidth: "thin",
        scrollbarColor: "#555",
      }}
      className="min-h-screen bg-[#e6e5e5] pt-[6rem] py-[4rem]"
    >
      <div className="w-[100rem]  mx-auto px-[8rem] space-y-8  ">
        {/* top */}
        <div className="flex items-center justify-between ">
          <div className="space-y-1">
            <h1 className="text-3xl font-semibold ">
              [5:5]미티 픽업게임 3파전 토요일
            </h1>
            <span>9269707802352</span>
          </div>
          <div className="flex gap-4 items-center">
            {/* <button className="w-[12rem] h-[3rem] border border-gray-100 bg-green-600 text-white rounded-xl">
              모집중
            </button>
            <button className="w-[12rem] h-[3rem] border border-gray-100 bg-gray-600 text-white rounded-xl">
              모집 마감
            </button>
            <button className="w-[12rem] h-[3rem] border border-gray-100 bg-blue-600 text-white rounded-xl">
              경기 종료
            </button> */}
            <button className="w-[12rem] h-[2.5rem] border border-gray-100 bg-red-600 text-white rounded-[10px]">
              경기 취소
            </button>
          </div>
        </div>
        {/* second */}
        <div className="w-full h-[12rem] bg-white rounded-xl py-4 px-8  flex flex-col gap-4 shadow-md">
          <div className="flex items-center flex-wrap gap-10">
            <div className="flex flex-col gap-1">
              <h4 className="font-bold">경기 시작</h4>
              <p className="text-gray-500">2024.11.05</p>
            </div>
            <div className="flex flex-col gap-1">
              <h4 className="font-bold">경기 종료</h4>
              <p className="text-gray-500">2024.12.12</p>
            </div>
            <div className="flex flex-col gap-1">
              <h4 className="font-bold">경기 상태</h4>
              <p className="text-gray-500">모집중</p>
            </div>
            <div className="flex flex-col gap-1">
              <h4 className="font-bold">참여비</h4>
              <p className="text-gray-500">10,000</p>
            </div>
            <div className="flex flex-col gap-1">
              <h4 className="font-bold">참여인원</h4>
              <p className="text-gray-500">12/18</p>
            </div>
            <div className="flex flex-col gap-1">
              <h4 className="font-bold">경기 생성일</h4>
              <p className="text-gray-500">2024.15.22</p>
            </div>
          </div>

          {/* address */}
          <div className="flex flex-col gap-1">
            <h4 className="font-bold">경기장 주소</h4>
            <div className="text-gray-500 flex gap-1 ">
              <p>서울특별지 회기동 777-4 MITI 팔라스 </p>{" "}
              <button type="button">
                <ContentCopyIcon fontSize="small" />
              </button>
            </div>
          </div>
        </div>
        {/* info */}
        <div className="shadow-md w-full h-[8rem] overflow-y-auto bg-white text-gray-500 rounded-xl py-4 px-8  flex flex-col gap-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam quod
          explicabo odit officia deserunt fugit illum id amet earum?
          Consequatur? Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Eos voluptatum beatae voluptas? Ab reiciendis optio consectetur
          temporibus! Incidunt, fugit cumque dolores doloremque, nam nihil
          voluptatum sequi inventore numquam, nulla tenetur?
        </div>

        {/* host info */}
        <div className="w-full min-h-[8rem] bg-white rounded-xl p-4 border-[4px] border-t-red-600 ">
          <table
            style={{ tableLayout: "fixed" }}
            cellPadding="6"
            className="w-full h-full "
          >
            <thead>
              <tr className="text-sm font-bold">
                <th>호스트 ID</th>
                <th>닉네임</th>
                <th>이름</th>
                <th>이메일</th>
                <th>가입 방법</th>
                <th>기타</th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-center text-sm text-gray-500">
                <td>2</td>
                <td>MITI</td>
                <td>이지원</td>
                <td>test01@testmiti.miti</td>
                <td>카카오톡</td>
                <td>—</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* players list */}
        <div className="w-full min-h-[45rem] bg-white rounded-xl p-4 border-[4px] border-t-blue-600 overflow-y-auto">
          <table
            style={{ tableLayout: "fixed" }}
            cellPadding="16"
            className="w-full h-full text-sm "
          >
            <thead>
              <tr className="">
                <th>ID</th>
                <th>닉네임</th>
                <th>이름</th>
                <th>이메일</th>
                <th>가입 방법</th>
                <th>결제 상태</th>
                <th>기타</th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-center text-sm text-gray-500">
                <td>22</td>
                <td>MITI</td>
                <td>이지원</td>
                <td>test01@testmiti.miti</td>
                <td>카카오톡</td>
                <td>이체 완료</td>
                <td>신고 기록 있는 사용자</td>
              </tr>{" "}
              <tr className="text-center text-sm text-gray-500">
                <td>16</td>
                <td>SPAM</td>
                <td>재완</td>
                <td>test01@.miti</td>
                <td>애플</td>
                <td>이체 완료</td>
                <td>-</td>
              </tr>{" "}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default GameDetails;
