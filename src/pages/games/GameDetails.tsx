import { useSearchParams } from "react-router-dom";
import { useGameDetailsDataHook } from "../../features/games/hooks/useGameDetailsDataHook";
import { useState } from "react";
import { HostInfo } from "../../features/games/components/HostInfo";
import { Reports } from "../../features/games/components/Reports";
import { Participants } from "../../features/games/components/Participants";
import { usePatchGameDetailsHook } from "../../features/games/hooks/usePatchGameDetailsHook";

import CloseIcon from "@mui/icons-material/Close";

import { Button } from "../../components/ui/button";

const GameDetails = () => {
  const [searchParams] = useSearchParams();
  const gameId = searchParams.get("gameId");

  const { data } = useGameDetailsDataHook(Number(gameId));

  const { mutate } = usePatchGameDetailsHook(Number(gameId));

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
            <Button
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
            </Button>
          </div>
        </div>
      )}

      <section className="pt-2 w-full">
        <div className="flex flex-col  ">
          <ul className="flex items-center justify-start gap-1 ">
            <li
              onClick={() => handleChangeTab("game")}
              style={{
                backgroundColor: activeTab === "game" ? "#ffffff" : "#f5f5f5",
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
            <article className="bg-gray-800 text-white">
              <div className="flex items-center justify-between h-32 px-6 ">
                <h1 className="text-2xl font-semibold ">{data?.data.title}</h1>
                <Button
                  variant={"secondary"}
                  type="button"
                  onClick={handleDisplayEditContainer}
                  size={"lg"}
                >
                  경기 정보 수정
                </Button>
              </div>

              <hr className="bg-white " />
              {/* GAME INFO CONTAINER */}
              <div className="h-32 flex items-center">
                <ul className="flex items-center gap-10 p-8">
                  <li>
                    <h4 className="font-bold">경기 ID </h4>
                    <p className="text-gray-500">{data?.data.id}</p>
                  </li>
                  <li>
                    <h4 className="font-bold">경기 시작</h4>
                    <p className="text-gray-500">
                      {data?.data.startdate} ({data?.data.starttime.slice(0, 5)}
                      )
                    </p>
                  </li>
                  <li>
                    <h4 className="font-bold">경기 종료</h4>
                    <p className="text-gray-500">
                      {data?.data.enddate} ({data?.data.endtime.slice(0, 5)})
                    </p>
                  </li>

                  <li>
                    <h4 className="font-bold">경기 상태</h4>
                    <p className="text-gray-500">{data?.data.game_status}</p>
                  </li>
                  <li>
                    <h4 className="font-bold">참가비</h4>
                    <p className="text-gray-500">{data?.data.fee}</p>
                  </li>

                  <li>
                    <h4 className="font-bold">최소 인원</h4>
                    <p className="text-gray-500">{data?.data.min_invitation}</p>
                  </li>

                  <li>
                    <h4 className="font-bold">최대 인원</h4>
                    <p className="text-gray-500">{data?.data.max_invitation}</p>
                  </li>

                  <li>
                    <h4 className="font-bold">현재 모집 인원</h4>
                    <p className="text-gray-500">
                      {data?.data.num_of_participations}
                    </p>
                  </li>
                  <li>
                    <h4 className="font-bold">경기 생성일</h4>
                    <p className="text-gray-500">
                      {data?.data.created_at.slice(0, 10)}
                    </p>
                  </li>
                </ul>
              </div>
              <hr className="bg-white " />
              {/* COURT INFO CONTAINER */}
              <div className="h-32 flex items-center">
                <ul className="flex items-center gap-10 p-8">
                  <li>
                    <h4 className="font-bold">코트 ID </h4>
                    <p className="text-gray-500">{data?.data.court.id}</p>
                  </li>
                  <li>
                    {" "}
                    <h4 className="font-bold">주소</h4>
                    <p className="text-gray-500">{data?.data.court.address} </p>
                  </li>
                  <li>
                    {" "}
                    <h4 className="font-bold">상세 주소</h4>
                    <p className="text-gray-500">{data?.data.court.name}</p>
                  </li>
                </ul>
              </div>
              <hr className="bg-white " />

              {/* GAME DETAIELD INFO */}
              <div
                style={{ scrollbarWidth: "thin" }}
                className="space-y-4 p-8  overflow-y-auto"
              >
                <p style={{ whiteSpace: "pre-line" }}> {data?.data.info}</p>
              </div>
            </article>
          )}

          {activeTab === "participants" && (
            <Participants gameId={Number(gameId)} />
          )}

          {activeTab === "host" && <HostInfo data={data?.data?.host} />}
          {activeTab === "reports" && <Reports gameId={Number(gameId)} />}
        </div>
      </section>
    </>
  );
};

export default GameDetails;
