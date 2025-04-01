import { Link, useParams } from "react-router-dom";
import { useGameDetailsDataHook } from "../features/games/hooks/useGameDetailsDataHook";
import { PageLayout } from "../features/common/PageLayout";
import { PageHeader } from "../features/common/PageHeader";
import { useState } from "react";
// import EditIcon from "@mui/icons-material/Edit";
// import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import { useGameParticipantsHook } from "../features/games/hooks/useGameParticipantsHook";
import { ParticipationStatus } from "../features/games/interface/game";
import FeedIcon from "@mui/icons-material/Feed";

/**
 * 
 * 
 * 경기 상세 조회 페이지
조회 정보
경기 정보 : id, 경기 상태, 제목, 참가비, 시작 일시, 종료 일시, 최소 모집 인원, 최대 모집 인원, 현재 모집 인원, 참가비, 모집 정보, 생성 일시
호스트 정보 : id, 이메일, 닉네임, 이름, 연락처
참가자 목록: id, 참가 상태, 참가자 정보(id, 이메일, 닉네임, 이름, 생년월일, 가입 수단, 연락처), 플레이어 프로필(성별, 체중, 신장, 포지션, 역할)
호스트 신고 목록 : id, 신고자 정보(id, 이메일, 닉네임, 이름, 생년월일, 가입수단, 연락처), 
피신고자 정보(id, 이메일, 닉네임, 이름, 생년월일, 가입수단, 연락처)
기능
경기 수정 : 최소 참여 인원, 최대 참여 인원, 모집 정보
경기 모집글 재작성 요청
경기 취소
 */

const GameDetails = () => {
  const { id } = useParams();
  const gameId = Number(id);
  const { data } = useGameDetailsDataHook(gameId);
  const { data: gameParticipantsData } = useGameParticipantsHook(gameId);
  console.log(gameParticipantsData?.data);

  const [activeTab, setActiveTab] = useState<
    "game" | "host" | "participants" | "reports"
  >("game");

  // const [expandedItems, setExpandedItems] = useState<{
  //   [key: number]: boolean;
  // }>({});

  const handleChangeTab = (
    select: "game" | "host" | "participants" | "reports"
  ) => setActiveTab(select);

  // const toggleExpand = (index: number) => {
  //   setExpandedItems((prev) => ({
  //     ...prev,
  //     [index]: !prev[index],
  //   }));
  // };

  return (
    <>
      <PageHeader title="경기 상세 정보 " />
      {/* <PageHeader title="경기 상세 " /> */}

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
              경기 정보
            </li>
            <li
              onClick={() => handleChangeTab("participants")}
              style={{
                backgroundColor:
                  activeTab === "participants" ? "#fff" : "#f5f5f5",
              }}
              className="cursor-pointer w-[170px] h-10 border border-gray-300 bg-white flex items-center  py-2 px-2 text-md rounded-tr-2xl font-semibold"
            >
              참가자 목록
            </li>
            <li
              onClick={() => handleChangeTab("host")}
              style={{
                backgroundColor: activeTab === "host" ? "#fff" : "#f5f5f5",
              }}
              className="cursor-pointer w-[170px] h-10 border border-gray-300 bg-white flex items-center  py-2 px-2 text-md rounded-tr-2xl font-semibold"
            >
              호스트/신고 정보
            </li>
          </ul>
          {activeTab === "game" && (
            <>
              <div className="flex items-center justify-between px-6 py-2 h-[8rem] bg-white">
                <h1 className="text-2xl font-semibold ">
                  [5:5]미티 픽업게임 3파전 토요일
                </h1>

                {/* 기능 actions */}
                {/* <button
                  type="button"
                  className="bg-blue-500 text-white w-40 h-10   text-md font-bold rounded-md "
                >
                  Actions
                </button> */}
              </div>

              <hr className="bg-gray-400 rounded-xl" />

              {/* 경기 정보 : id, 경기 상태, 제목, 참가비, 시작 일시, 종료 일시, 최소 모집 인원, 최대 모집 인원, 현재 모집 인원, 참가비, 모집 정보, 생성 일시 */}

              <div className="space-y-8 py-2 px-4 bg-white flex items-center h-[6rem] rounded-md">
                <div className="flex items-center flex-wrap gap-10 ">
                  <div className="flex flex-col gap-1">
                    <h4 className="font-bold">경기 ID </h4>
                    <p className="text-gray-500">{data?.data.id}</p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h4 className="font-bold">경기 시작</h4>
                    <p className="text-gray-500">
                      {data?.data.startdate} ({data?.data.starttime.slice(0, 5)}
                      )
                    </p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h4 className="font-bold">경기 종료</h4>
                    <p className="text-gray-500">
                      {data?.data.enddate} ({data?.data.endtime.slice(0, 5)})
                    </p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h4 className="font-bold">경기 상태</h4>
                    <p className="text-gray-500">{data?.data.game_status}</p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h4 className="font-bold">참가비</h4>
                    <p className="text-gray-500">{data?.data.fee}</p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h4 className="font-bold">최소 인원</h4>
                    <div className="text-gray-500 ">
                      <span>{data?.data.min_invitation}</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h4 className="font-bold">최대 인원</h4>
                    <p className="text-gray-500">{data?.data.max_invitation}</p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h4 className="font-bold">현재 모집 인원</h4>
                    <p className="text-gray-500">
                      {data?.data.num_of_participations}
                    </p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h4 className="font-bold">경기 생성일</h4>
                    <p className="text-gray-500">
                      {data?.data.created_at.slice(0, 10)}
                    </p>
                  </div>
                </div>
              </div>

              {/* 코트 정보 */}
              <div className="space-y-8 py-2 px-4 bg-white flex items-center h-[6rem] rounded-md">
                <div className="flex items-center flex-wrap gap-10 ">
                  <div className="flex flex-col gap-1">
                    <h4 className="font-bold">코트 ID </h4>
                    <p className="text-gray-500">{data?.data.court.id}</p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h4 className="font-bold">주소</h4>
                    <p className="text-gray-500">{data?.data.court.address} </p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h4 className="font-bold">상세 주소</h4>
                    <p className="text-gray-500">{data?.data.court.name}</p>
                  </div>
                  {/* <div className="flex flex-col gap-1">
                    <h4 className="font-bold">latitude</h4>
                    <p className="text-gray-500">37.51252152151</p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h4 className="font-bold">longitude</h4>
                    <p className="text-gray-500">127.241512515</p>
                  </div> */}
                </div>
              </div>

              {/* 모집 정보 */}
              <p
                style={{ scrollbarWidth: "thin" }}
                className="flex justify-between px-4 py-2 bg-white h-[20rem] overflow-y-auto"
              >
                {data?.data.info}
              </p>
            </>
          )}
          {/* 참가자 목록: id, 참가 상태, 참가자 정보(id, 이메일, 닉네임, 이름, 생년월일, 가입 수단, 연락처), 플레이어 프로필(성별, 체중, 신장, 포지션, 역할) */}

          {activeTab === "participants" && (
            <>
              <div className="flex flex-col gap-2  bg-white">
                <ul className="flex w-full  items-center  py-4">
                  <li className="font-bold  w-[10%] text-center ">참가 상태</li>
                  <li className="font-bold  w-[10%] text-center ">ID</li>
                  <li className="font-bold  w-[15%] text-center ">닉네임</li>
                  <li className="font-bold  w-[25%] text-center ">이메일</li>
                  <li className="font-bold  w-[10%] text-center ">생년월일</li>
                  <li className="font-bold  w-[20%] text-center ">연락처</li>
                  <li className="font-bold  w-[10%] text-center ">
                    프로필 상세
                  </li>
                </ul>{" "}
              </div>{" "}
              <div className="space-y-2  ">
                {gameParticipantsData?.data.length === 0 ? (
                  <h1 className="flex justify-center items-center">
                    경기에 참여자가 없습니다.
                  </h1>
                ) : (
                  gameParticipantsData?.data.map(
                    (participant: ParticipationStatus) => (
                      <div key={participant.id} className="w-full border">
                        <ul
                          className={`bg-white  flex w-full h-[42px] items-center  text-sm     transition-all duration-300 

                   `}
                        >
                          <li className="w-[10%] text-center">
                            {participant.participation_status}
                          </li>

                          <li className="w-[10%] text-center">
                            {participant.user.id}
                          </li>
                          <li className="w-[15%] text-center truncate">
                            {participant.user.nickname}
                          </li>
                          <li className="w-[25%] text-center truncate">
                            {participant.user.email}
                          </li>
                          <li className="w-[10%] text-center">
                            {participant.user.birthday}
                          </li>
                          <li className="w-[20%] text-center">
                            {participant.user.phone}
                          </li>
                          <li className="w-[10%] text-center">
                            <Link to={`/users/${participant.user.id}`}>
                              <FeedIcon />
                            </Link>
                          </li>
                        </ul>
                        {/* 성별, 체중, 신장, 포지션, 역할 */}

                        <div className="bg-white h-[62px] flex items-center gap-12 underline px-6  text-sm">
                          {/* <p className="font-bold text-lg">🏀 프로필 정보</p> */}
                          <div>
                            <span className="">nickname </span>:{" "}
                            {participant.user.nickname}
                          </div>
                          <div>
                            체중:{" "}
                            {participant.user.player_profile.weight === null
                              ? "비공개"
                              : participant.user.player_profile.weight}
                          </div>
                          <div>
                            신장:{" "}
                            {participant.user.player_profile.height === null
                              ? "비공개"
                              : participant.user.player_profile.height}
                          </div>
                          <div>
                            포지션:{" "}
                            {participant.user.player_profile.position === null
                              ? "비공개"
                              : participant.user.player_profile.position}
                          </div>
                          <div>
                            역할:{" "}
                            {participant.user.player_profile.role === null
                              ? "비공개"
                              : participant.user.player_profile.role}
                          </div>
                        </div>
                      </div>
                    )
                  )
                )}
              </div>
            </>
          )}

          {/* 호스트 정보 : id, 이메일, 닉네임, 이름, 연락처 */}
          {activeTab === "host" && (
            <>
              <div className="flex flex-col gap-1  bg-white">
                <ul className="flex w-full  items-center  py-4">
                  <li className="font-bold  w-[10%] text-center ">호스트 ID</li>
                  <li className="font-bold  w-[10%] text-center ">이름</li>
                  <li className="font-bold  w-[15%] text-center ">닉네임</li>
                  <li className="font-bold  w-[25%] text-center ">이메일</li>
                  <li className="font-bold  w-[10%] text-center ">생년월일</li>
                  <li className="font-bold  w-[20%] text-center ">연락처</li>
                </ul>{" "}
                <ul className="flex w-full  items-center text-sm   h-[60px] ">
                  <li className="  w-[10%] text-center ">
                    {data?.data.host.id}
                  </li>
                  <li className="  w-[10%] text-center ">
                    {" "}
                    {data?.data.host.name}
                  </li>
                  <li className="  w-[15%] text-center ">
                    {" "}
                    {data?.data.host.nickname}
                  </li>
                  <li className="  w-[25%] text-center ">
                    {data?.data.host.email}
                  </li>
                  <li className="  w-[10%] text-center ">
                    {" "}
                    {data?.data.host.birthday}
                  </li>
                  <li className="  w-[20%] text-center ">
                    {" "}
                    {data?.data.host.phone}
                  </li>
                </ul>{" "}
              </div>{" "}
              {/* 호스트 신고 정보
신고 정보 - 신고 고유 id,  신고 사유 id, 신고 상태
신고자 정보 - id, 이메익, 닉네임, 이름, 연락처 */}
              {/* <h1 className="flex flex-col items-center justify-center text-lg  h-[60px] font-bold  bg-white ">
                🚨 호스트 신고 정보
              </h1> */}
              <div className="flex flex-col items-center justify-center gap-2  bg-white h-[140px]">
                <h1 className="font-bold text-center text-lg">
                  🚨 호스트 신고 정보
                </h1>
                <ul className="flex w-full  items-center  ">
                  <li className="font-bold  w-[10%] text-center ">신고 ID</li>
                  <li className="font-bold  w-[10%] text-center ">
                    신고 사유 ID
                  </li>
                  <li className="font-bold  w-[15%] text-center ">신고 상태</li>
                </ul>{" "}
                <ul className="flex w-full  items-center  ">
                  <li className="font-semibold text-sm  w-[10%] text-center ">
                    -
                  </li>
                  <li className="font-semibold text-sm  w-[10%] text-center ">
                    -
                  </li>
                  <li className="font-semibold text-sm  w-[15%] text-center ">
                    -
                  </li>
                </ul>{" "}
              </div>
              {/* 신고자 정보  - id, 이메익, 닉네임, 이름, 연락처 */}
              <div className="flex flex-col items-center justify-center gap-2  bg-white h-[80px]">
                <ul className="flex w-full  items-center  ">
                  <li className="font-bold  w-[10%] text-center ">신고자 ID</li>
                  <li className="font-bold  w-[10%] text-center ">이름</li>
                  <li className="font-bold  w-[15%] text-center ">닉네임</li>
                  <li className="font-bold  w-[25%] text-center ">이메일</li>

                  <li className="font-bold  w-[20%] text-center ">연락처</li>
                </ul>{" "}
                <ul className="flex w-full  items-center  ">
                  <li className="font-semibold text-sm  w-[10%] text-center ">
                    -
                  </li>
                  <li className="font-semibold text-sm  w-[10%] text-center ">
                    -
                  </li>
                  <li className="font-semibold text-sm  w-[15%] text-center ">
                    -
                  </li>
                  <li className="font-semibold text-sm  w-[25%] text-center ">
                    -
                  </li>

                  <li className="font-semibold text-sm  w-[20%] text-center ">
                    -
                  </li>
                </ul>{" "}
              </div>
            </>
          )}
        </div>

        {/* 
        기능
경기 수정 : 최소 참여 인원, 최대 참여 인원, 모집 정보
경기 모집글 재작성 요청
경기 취소 */}
      </PageLayout>
    </>
  );
};

export default GameDetails;
