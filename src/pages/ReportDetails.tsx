import { useState } from "react";
import { PageHeader } from "../features/common/PageHeader";
import { PageLayout } from "../features/common/PageLayout";

const ReportDetails = () => {
  const [activeTab, setActiveTab] = useState<"game" | "reporters">("game");

  const handleChangeTab = (select: "game" | "reporters") =>
    setActiveTab(select);

  return (
    <>
      {/* 게스트 신고 상세 조회 페이지
      
      사용 API
경기 정보 : 관리자 - 경기 정보 상세 조회 API
참가 정보 : 관리자 - 참가 상세 조회 API
해당 참여 전체 신고 목록 정보 : 관리자 - 참가 신고 목록 조회 API*/}
      <PageHeader title="신고 상세" />
      <PageLayout>
        <div className="flex flex-col gap-4 ">
          <ul className="flex items-center justify-start gap-1 ">
            <li
              onClick={() => handleChangeTab("game")}
              style={{
                backgroundColor: activeTab === "game" ? "#fff" : "#f5f5f5",
              }}
              className="cursor-pointer w-[170px] h-10 border border-gray-300 flex items-center  py-2 px-2 text-md rounded-tr-2xl font-semibold"
            >
              경기/참여 정보
            </li>
            <li
              onClick={() => handleChangeTab("reporters")}
              style={{
                backgroundColor: activeTab === "reporters" ? "#fff" : "#f5f5f5",
              }}
              className="cursor-pointer w-[170px] h-10 border border-gray-300 bg-white flex items-center  py-2 px-2 text-md rounded-tr-2xl font-semibold"
            >
              신고 참가자 목록
            </li>
          </ul>

          {activeTab === "game" && (
            <>
              <div className="flex items-center justify-between px-6 py-2 h-[8rem] bg-white">
                <div className="space-y-2">
                  <h1 className="text-2xl font-semibold ">
                    [5:5]미티 픽업게임 3파전 토요일
                  </h1>
                </div>
                <h2 className=" text-red-600 text-xl font-bold  ">경기 취소</h2>
              </div>

              <hr className="bg-gray-400 rounded-xl" />

              {/* 경기 정보 : id, 경기 상태, 제목, 참가비, 시작 일시, 종료 일시, 최소 모집 인원, 최대 모집 인원, 현재 모집 인원, 참가비, 모집 정보, 생성 일시 */}

              <div className="space-y-8 py-2 px-4 bg-white flex items-center h-[6rem] rounded-md">
                <div className="flex items-center flex-wrap gap-10 ">
                  <div className="flex flex-col gap-1">
                    <h4 className="font-bold">경기 ID </h4>
                    <p className="text-gray-500">215215</p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h4 className="font-bold">경기 시작</h4>
                    <p className="text-gray-500">2024.11.05 (16:00)</p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h4 className="font-bold">경기 종료</h4>
                    <p className="text-gray-500">2024.12.12 (18:00)</p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h4 className="font-bold">경기 상태</h4>
                    <p className="text-gray-500">취소</p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h4 className="font-bold">참가비</h4>
                    <p className="text-gray-500">10,000</p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h4 className="font-bold">최소 인원</h4>
                    <p className="text-gray-500">12</p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h4 className="font-bold">최대 인원</h4>
                    <p className="text-gray-500">18</p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h4 className="font-bold">현재 모집 인원</h4>
                    <p className="text-gray-500">14</p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h4 className="font-bold">경기 생성일</h4>
                    <p className="text-gray-500">2024.15.22</p>
                  </div>
                </div>
              </div>

              {/* 코트 정보 */}
              <div className="space-y-8 py-2 px-4 bg-white flex items-center h-[6rem] rounded-md">
                <div className="flex items-center flex-wrap gap-10 ">
                  <div className="flex flex-col gap-1">
                    <h4 className="font-bold">코트 ID </h4>
                    <p className="text-gray-500">215215</p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h4 className="font-bold">주소</h4>
                    <p className="text-gray-500">
                      울 동대문구 경희대로 1 (회기동)
                    </p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h4 className="font-bold">상세 주소</h4>
                    <p className="text-gray-500">miti at ku</p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h4 className="font-bold">latitude</h4>
                    <p className="text-gray-500">37.51252152151</p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h4 className="font-bold">longitude</h4>
                    <p className="text-gray-500">127.241512515</p>
                  </div>
                </div>
              </div>

              {/* 모집 정보 */}
              <p
                style={{ scrollbarWidth: "thin" }}
                className="flex justify-between px-4 py-2 bg-white h-[20rem] overflow-y-auto"
              >
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Eveniet, eos? Deserunt facilis suscipit, delectus numquam beatae
                harum quaerat, dolor eos esse ratione ad quam at, ducimus culpa
                assumenda rerum blanditiis! Lorem ipsum dolor, sit amet
                consectetur adipisicing elit. Laborum, adipisci. lorem100
              </p>
            </>
          )}

          {activeTab === "reporters" && (
            <>
              <div className="flex flex-col gap-2  bg-white">
                <ul className="flex w-full  items-center  py-4">
                  <li className="font-bold  w-[10%] text-center ">신고 ID</li>
                  <li className="font-bold  w-[10%] text-center ">신고자 ID</li>
                  {/* <li className="font-bold  w-[15%] text-center ">피신고자</li> */}
                  <li className="font-bold  w-[20%] text-center ">경기 ID</li>
                  <li className="font-bold  w-[10%] text-center ">
                    신고 카테고리
                  </li>
                  <li className="font-bold  w-[10%] text-center ">신고 내용</li>
                  <li className="font-bold  w-[10%] text-center ">신고 상태</li>
                  <li className="font-bold  w-[15%] text-center ">신고 일시</li>
                </ul>{" "}
              </div>{" "}
              <div className="flex flex-col gap-2 py-4 bg-white">
                {/* {reportees.map((participant, index) => (
                  <div key={participant.id} className="w-full">
                    <ul className="flex w-full  text-sm  transition-all duration-300 ">
                      <li className="w-[10%] text-center">{participant.id}</li>
                      <li className="w-[10%] text-center">
                        {participant.reportee}
                      </li>
                      <li className="w-[15%] text-center truncate">
                        {participant.game}
                      </li>
                      <li className="w-[20%] text-center truncate">
                        {participant.category}
                      </li>
                      <li className="w-[10%] text-center">
                        {participant.content}
                      </li>
                      <li className="w-[10%] text-center">
                        {participant.report_status}
                      </li>
                      <li className="w-[10%] text-center">
                        {participant.created_at}
                      </li>{" "} */}
                {/* <li className="w-[15%] text-center">
                        {participant.created_at}
                      </li> */}
                {/* <li className="w-[10%] text-center">
                        <button onClick={() => toggleExpand(index)}>
                          <KeyboardDoubleArrowDownIcon
                            className={`transition-transform duration-300 ${
                              expandedItems[index] ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                      </li> */}
                {/* </ul> */}
                {/* 성별, 체중, 신장, 포지션, 역할 */}
                {/* {expandedItems[index] && (
                      <>
                        <div className="p-4 my-2 bg-white w-[800px] mx-auto flex flex-col justify-center items-center">
                          <p className="font-bold text-lg">🏀 프로필 정보</p>
                          <div>성별: {participant.nickname}</div>
                          <div>체중: 86kg</div>
                          <div>신장: 188cm</div>
                          <div>포지션: Position</div>
                          <div>역할: Role</div>
                        </div>
                        <hr />
                      </>
                    )} */}
                {/* </div>
                ))} */}
              </div>
            </>
          )}
        </div>
      </PageLayout>
    </>
  );
};

export default ReportDetails;
