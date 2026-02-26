import { useSearchParams } from "react-router-dom";
import { useGameDetailsDataHook } from "../../features/games/hooks/useGameDetailsDataHook";
import { useState } from "react";
import { Reports } from "../../features/games/components/Reports";
import { Participants } from "../../features/games/components/Participants";
import { usePatchGameDetailsHook } from "../../features/games/hooks/usePatchGameDetailsHook";

import { GameInfo } from "../../features/games/components/GameInfo";

const GameDetails = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const gameId = searchParams.get("gameId");
  const tab = searchParams.get("tab");

  // FETCH GAME INFO
  const { data } = useGameDetailsDataHook(Number(gameId));
  // PATCH GAME INFO
  const { mutate } = usePatchGameDetailsHook(Number(gameId));

  const handleDisplayEditContainer = () => setShowEditContainer(!showEditContainer);

  const [minPlayers, setMinPlayers] = useState<number>(data?.data.min_invitation);
  const [maxPlayers, setMaxPlayers] = useState<number>(data?.data.max_invitation);
  const [gameInfo, setGameInfo] = useState(data?.data.info);
  const [showEditContainer, setShowEditContainer] = useState(false);

  const handleSetTab = (selected: "gameInfo" | "participants" | "hostReportInfo") => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set("tab", selected);
      return params;
    });
  };

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
      },
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
              x
            </button>
            <div className="text-center space-y-4">
              <h1 className="text-center font-bold text-lg">경기 정보 수정</h1>
              {minPlayers >= maxPlayers && (
                <p className="text-xs text-red-600">최소 인원은 최대 인원보다 작아야 합니다.</p>
              )}
            </div>
            {/* <hr /> */}
            <div className="flex flex-col gap-4 text-xs  ">
              <div className="flex flex-col gap-1">
                <label htmlFor="min_players " className="text-xs">
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
                <label htmlFor="max_players" className="text-xs">
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
                <label htmlFor="game_info" className="text-xs">
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
                minPlayers >= maxPlayers ? "bg-gray-200 text-gray-400" : " bg-blue-600 text-white"
              }  rounded-lg  font-semibold`}
            >
              수정하기
            </button>
          </div>
        </div>
      )}

      <section className="px-4 pt-4 w-full">
        <div className="flex flex-col gap-4">
          {/* Tabs styled similar to GamesList table header */}
          <div
            className="rounded-lg border border-gray-700 overflow-hidden bg-gray-900/60"
            role="tablist"
          >
            <div className="grid grid-cols-3">
              {[
                { key: "gameInfo", label: "경기 정보" },
                { key: "participants", label: "참가자 목록" },
                { key: "hostReportInfo", label: "호스트 신고 정보" },
              ].map((t) => {
                const active = tab === t.key;
                return (
                  <button
                    key={t.key}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() =>
                      handleSetTab(t.key as "gameInfo" | "participants" | "hostReportInfo")
                    }
                    className={`px-4 py-3 text-xs font-semibold flex items-center justify-center transition-colors
                      ${
                        active
                          ? "bg-gray-800 text-white"
                          : "bg-gray-700/40 text-gray-300 hover:bg-gray-700"
                      }`}
                  >
                    <span className="flex items-center gap-2">
                      {t.label}
                      {active && <span className="inline-block h-2 w-2 rounded-full bg-blue-500" />}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tab content container */}
          <div className="rounded-lg border border-gray-700 bg-gray-800 p-6">
            {tab === "gameInfo" && (
              <GameInfo data={data?.data} handleDisplayEditContainer={handleDisplayEditContainer} />
            )}
            {tab === "participants" && <Participants gameId={Number(gameId)} />}
            {tab === "hostReportInfo" && <Reports gameId={Number(gameId)} />}
          </div>
        </div>
      </section>
    </>
  );
};

export default GameDetails;
