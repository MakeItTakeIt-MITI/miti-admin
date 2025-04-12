import { useParams } from "react-router-dom";
import { useGameDetailsDataHook } from "../../features/games/hooks/useGameDetailsDataHook";
import { PageLayout } from "../../features/common/PageLayout";
import { PageHeader } from "../../features/common/PageHeader";
import { useState } from "react";
// import EditIcon from "@mui/icons-material/Edit";
// import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import { HostInfo } from "../../features/games/components/HostInfo";
import { Reports } from "../../features/games/components/Reports";
import { Participants } from "../../features/games/components/Participants";
import { usePatchGameDetailsHook } from "../../features/games/hooks/usePatchGameDetailsHook";

import CloseIcon from "@mui/icons-material/Close";

const GameDetails = () => {
  const { id } = useParams();
  const gameId = Number(id);
  const { data } = useGameDetailsDataHook(gameId);

  const { mutate } = usePatchGameDetailsHook(gameId);

  const handleDisplayEditContainer = () =>
    setShowEditContainer(!showEditContainer);

  const [minPlayers, setMinPlayers] = useState<number>(
    data?.data.min_invitation
  );
  const [maxPlayers, setMaxPlayers] = useState<number>(
    data?.data.max_invitation
  );
  const [gameInfo, setGameInfo] = useState(data?.data.info);
  const [showEditContainer, setShowEditContainer] = useState(false);

  /**
 * mutate({
  min_invitation: 5,
  max_invitation: 10,
  info: "Updated game info",
});
 */

  const [activeTab, setActiveTab] = useState<
    "game" | "host" | "participants" | "reports"
  >("game");

  const handleChangeTab = (
    select: "game" | "host" | "participants" | "reports"
  ) => setActiveTab(select);

  const handleSubmitUpdate = () => {
    mutate(
      {
        min_invitation: minPlayers,
        max_invitation: maxPlayers,
        info: gameInfo,
      },
      {
        onSuccess: () => {
          setShowEditContainer(false);
        },
      }
    );
  };

  return (
    <>
      {showEditContainer && (
        <div className=" fixed top-0 right-0 bottom-0 left-0  bg-[#0000004b] z-99 flex items-center justify-center">
          <div className="absolute bg-white flex flex-col justify-between h-[800px] w-[500px] p-6 rounded-lg">
            <button
              onClick={handleDisplayEditContainer}
              className="absolute right-4 top-4"
              type="button"
            >
              <CloseIcon />
            </button>
            <div className="text-center space-y-4">
              <h1 className="text-center font-bold text-lg">경기 정보 수정</h1>
              {minPlayers >= maxPlayers && (
                <p className="text-sm text-red-600">
                  최소 인원은 최대 인원보다 작아야 합니다.
                </p>
              )}
            </div>
            {/* <hr /> */}
            <div className="flex flex-col gap-4 text-sm  ">
              <div className="flex flex-col gap-1">
                <label htmlFor="min_players " className="text-sm">
                  최소 인원
                </label>
                <input
                  id="min_players"
                  type="number"
                  placeholder={data?.data.min_invitation}
                  value={minPlayers}
                  onChange={(e) => setMinPlayers(Number(e.target.value))}
                  className="border-2 h-10 rounded-lg px-2"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="max_players" className="text-sm">
                  최대 인원
                </label>
                <input
                  id="max_players"
                  type="number"
                  placeholder={data?.data.max_invitation}
                  value={maxPlayers}
                  onChange={(e) => setMaxPlayers(Number(e.target.value))}
                  className="border-2 h-10 rounded-lg px-2"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="game_info" className="text-sm">
                  경기 정보
                </label>
                <textarea
                  id="game_info"
                  value={gameInfo}
                  placeholder={data?.data.info}
                  onChange={(e) => setGameInfo(e.target.value)}
                  className="border-2 w-full h-[300px] rounded-lg p-4 overflow-y-auto"
                  style={{ resize: "none" }}
                />
              </div>
            </div>
            <button
              type="submit"
              onClick={handleSubmitUpdate}
              disabled={minPlayers >= maxPlayers}
              className={`w-full h-10 ${
                minPlayers >= maxPlayers
                  ? "bg-gray-200 text-gray-400"
                  : " bg-blue-600 text-white"
              }  rounded-lg  font-semibold`}
            >
              수정하기
            </button>
          </div>
        </div>
      )}

      <PageHeader title="경기 상세 정보 " />

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
              호스트 정보
            </li>
            <li
              onClick={() => handleChangeTab("reports")}
              style={{
                backgroundColor: activeTab === "reports" ? "#fff" : "#f5f5f5",
              }}
              className="cursor-pointer w-[170px] h-10 border border-gray-300 bg-white flex items-center  py-2 px-2 text-md rounded-tr-2xl font-semibold"
            >
              호스트 신고 정보
            </li>
          </ul>
          {activeTab === "game" && (
            <>
              <div className="flex items-center justify-between px-6 py-2 h-[8rem] bg-white">
                <h1 className="text-2xl font-semibold ">
                  [5:5]미티 픽업게임 3파전 토요일
                </h1>
                <button
                  type="button"
                  onClick={handleDisplayEditContainer}
                  className="border hover:brightness-105  bg-gray-200 border-gray-400 rounded-lg w-[200px] h-[45px] flex items-center justify-center gap-2"
                >
                  경기 정보 수정
                </button>
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
                      <button type="button"></button>
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
                </div>
              </div>

              {/* 모집 정보 */}
              <div
                style={{ scrollbarWidth: "thin" }}
                className="space-y-4 px-4 py-2 bg-white  overflow-y-auto"
              >
                <h2 className="text-lg font-bold">경기 정보</h2>
                <hr />
                <p style={{ whiteSpace: "pre-line" }}> {data?.data.info}</p>
              </div>
            </>
          )}
          {/* 참가자 목록: id, 참가 상태, 참가자 정보(id, 이메일, 닉네임, 이름, 생년월일, 가입 수단, 연락처), 플레이어 프로필(성별, 체중, 신장, 포지션, 역할) */}

          {activeTab === "participants" && <Participants gameId={gameId} />}

          {activeTab === "host" && <HostInfo data={data?.data?.host} />}
          {activeTab === "reports" && <Reports gameId={gameId} />}
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
