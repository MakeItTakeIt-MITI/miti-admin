import { useMemo } from "react";
import { Reports } from "../../features/games/components/Reports";
import { Participants } from "../../features/games/components/Participants";
import { useGameDetailsPage } from "../../features/games/hooks/useGameDetailsPage";
import { GameInfo } from "../../features/games/components/GameInfo";
import { TeamScheduleInfo } from "../../features/games/components/TeamScheduleInfo";
import { Link } from "react-router-dom";

const validateDateTime = (
  sDate: string,
  sTime: string,
  eDate: string,
  eTime: string,
): { startInPast: boolean; endBeforeStart: boolean } => {
  const now = new Date();
  const start = sDate && sTime ? new Date(`${sDate}T${sTime}`) : null;
  const end = eDate && eTime ? new Date(`${eDate}T${eTime}`) : null;
  return {
    startInPast: start ? start <= now : false,
    endBeforeStart: start && end ? end <= start : false,
  };
};

const GameDetails = () => {
  const {
    gameId,
    gameType,
    tab,
    data,
    teamData,
    showEditContainer,
    // Individual game edit
    minPlayers,
    maxPlayers,
    gameInfo,
    hostId,
    startDate,
    startTime,
    endDate,
    endTime,
    setMinPlayers,
    setMaxPlayers,
    setGameInfo,
    setHostId,
    setStartDate,
    setStartTime,
    setEndDate,
    setEndTime,
    handleSubmitUpdate,
    // Team schedule edit
    teamContent,
    teamMaxInvitation,
    teamMemberFee,
    teamIsExternalAllowed,
    teamMinInvitation,
    teamFee,
    teamInfo,
    teamStartDate,
    teamStartTime,
    teamEndDate,
    teamEndTime,
    setTeamContent,
    setTeamMaxInvitation,
    setTeamMemberFee,
    setTeamIsExternalAllowed,
    setTeamMinInvitation,
    setTeamFee,
    setTeamInfo,
    setTeamStartDate,
    setTeamStartTime,
    setTeamEndDate,
    setTeamEndTime,
    handleSubmitTeamUpdate,
    // Common
    handleDisplayEditContainer,
    handleSetTab,
  } = useGameDetailsPage();

  const isTeamGame = gameType === "team_game";

  // Individual game datetime validation
  const gameDateTime = useMemo(
    () => validateDateTime(startDate, startTime, endDate, endTime),
    [startDate, startTime, endDate, endTime],
  );

  // Team schedule datetime validation
  const teamDateTime = useMemo(
    () => validateDateTime(teamStartDate, teamStartTime, teamEndDate, teamEndTime),
    [teamStartDate, teamStartTime, teamEndDate, teamEndTime],
  );

  const gameFormInvalid = minPlayers >= maxPlayers || gameDateTime.startInPast || gameDateTime.endBeforeStart;
  const teamFormInvalid = teamDateTime.startInPast || teamDateTime.endBeforeStart;

  const tabs = isTeamGame
    ? [
        { key: "scheduleInfo", label: "일정 정보" },
        { key: "participants", label: "참가자" },
      ]
    : [
        { key: "gameInfo", label: "경기 정보" },
        { key: "participants", label: "참가자" },
        { key: "hostReportInfo", label: "신고 내역" },
      ];

  return (
    <>
      {/* Edit modal — only for individual game type */}
      {!isTeamGame && showEditContainer && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm"
          onClick={(e) => e.target === e.currentTarget && handleDisplayEditContainer()}
        >
          <div className="relative w-[480px] rounded-2xl bg-zinc-900 border border-zinc-800 shadow-2xl">
            {/* Modal header */}
            <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-zinc-800">
              <div>
                <h2 className="text-sm font-semibold text-white">경기 정보 수정</h2>
                <p className="text-[11px] text-zinc-500 mt-0.5">Game ID: {gameId}</p>
              </div>
              <button
                onClick={handleDisplayEditContainer}
                type="button"
                className="flex items-center justify-center w-7 h-7 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal body */}
            <div className="px-6 py-5 space-y-5 max-h-[80vh] overflow-y-auto" style={{ scrollbarWidth: "thin", scrollbarColor: "#3f3f46 transparent" }}>
              {(minPlayers >= maxPlayers || gameDateTime.startInPast || gameDateTime.endBeforeStart) && (
                <div className="space-y-2">
                  {minPlayers >= maxPlayers && (
                    <div className="flex items-center gap-2 rounded-lg bg-red-500/10 border border-red-500/20 px-3 py-2.5">
                      <svg className="w-3.5 h-3.5 text-red-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                      </svg>
                      <p className="text-xs text-red-400">최소 인원은 최대 인원보다 작아야 합니다</p>
                    </div>
                  )}
                  {gameDateTime.startInPast && (
                    <div className="flex items-center gap-2 rounded-lg bg-red-500/10 border border-red-500/20 px-3 py-2.5">
                      <svg className="w-3.5 h-3.5 text-red-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                      </svg>
                      <p className="text-xs text-red-400">시작 일시는 현재 시점 이후여야 합니다</p>
                    </div>
                  )}
                  {gameDateTime.endBeforeStart && (
                    <div className="flex items-center gap-2 rounded-lg bg-red-500/10 border border-red-500/20 px-3 py-2.5">
                      <svg className="w-3.5 h-3.5 text-red-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                      </svg>
                      <p className="text-xs text-red-400">종료 일시는 시작 일시 이후여야 합니다</p>
                    </div>
                  )}
                </div>
              )}

              {/* Host */}
              <div className="space-y-1.5">
                <label htmlFor="host_id" className="block text-[11px] font-medium text-zinc-400 uppercase tracking-wider">
                  호스트 ID
                </label>
                <input
                  id="host_id"
                  type="number"
                  value={hostId}
                  onChange={(e) => setHostId(Number(e.target.value))}
                  className="w-full h-9 rounded-lg bg-zinc-800 border border-zinc-700 px-3 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>

              <div className="border-t border-zinc-800/60" />

              {/* Date / Time */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="start_date" className="block text-[11px] font-medium text-zinc-400 uppercase tracking-wider">
                    시작 날짜
                  </label>
                  <input
                    id="start_date"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full h-9 rounded-lg bg-zinc-800 border border-zinc-700 px-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="start_time" className="block text-[11px] font-medium text-zinc-400 uppercase tracking-wider">
                    시작 시간
                  </label>
                  <input
                    id="start_time"
                    type="time"
                    step="600"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full h-9 rounded-lg bg-zinc-800 border border-zinc-700 px-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="end_date" className="block text-[11px] font-medium text-zinc-400 uppercase tracking-wider">
                    종료 날짜
                  </label>
                  <input
                    id="end_date"
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full h-9 rounded-lg bg-zinc-800 border border-zinc-700 px-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="end_time" className="block text-[11px] font-medium text-zinc-400 uppercase tracking-wider">
                    종료 시간
                  </label>
                  <input
                    id="end_time"
                    type="time"
                    step="600"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="w-full h-9 rounded-lg bg-zinc-800 border border-zinc-700 px-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                </div>
              </div>

              <div className="border-t border-zinc-800/60" />

              {/* Capacity */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="min_players" className="block text-[11px] font-medium text-zinc-400 uppercase tracking-wider">
                    최소 인원
                  </label>
                  <input
                    id="min_players"
                    type="number"
                    placeholder={String(data?.data.min_invitation ?? "")}
                    value={minPlayers}
                    onChange={(e) => setMinPlayers(Number(e.target.value))}
                    className="w-full h-9 rounded-lg bg-zinc-800 border border-zinc-700 px-3 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="max_players" className="block text-[11px] font-medium text-zinc-400 uppercase tracking-wider">
                    최대 인원
                  </label>
                  <input
                    id="max_players"
                    type="number"
                    placeholder={String(data?.data.max_invitation ?? "")}
                    value={maxPlayers}
                    onChange={(e) => setMaxPlayers(Number(e.target.value))}
                    className="w-full h-9 rounded-lg bg-zinc-800 border border-zinc-700 px-3 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                </div>
              </div>

              <div className="border-t border-zinc-800/60" />

              {/* Game info */}
              <div className="space-y-1.5">
                <label htmlFor="game_info" className="block text-[11px] font-medium text-zinc-400 uppercase tracking-wider">
                  경기 안내
                </label>
                <textarea
                  id="game_info"
                  value={gameInfo}
                  placeholder={data?.data.info ?? "경기 안내 내용을 입력하세요"}
                  onChange={(e) => setGameInfo(e.target.value)}
                  rows={6}
                  className="w-full rounded-lg bg-zinc-800 border border-zinc-700 px-3 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none leading-relaxed"
                />
              </div>
            </div>

            {/* Modal footer */}
            <div className="px-6 pb-5 flex gap-3">
              <button
                type="button"
                onClick={handleDisplayEditContainer}
                className="flex-1 h-9 rounded-lg border border-zinc-700 text-zinc-400 text-sm font-medium hover:text-white hover:border-zinc-600 transition-colors"
              >
                취소
              </button>
              <button
                type="submit"
                onClick={handleSubmitUpdate}
                disabled={gameFormInvalid}
                className="flex-1 h-9 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-500 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                수정하기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit modal — team schedule (game type only) */}
      {isTeamGame && showEditContainer && teamData?.schedule_type === "game" && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm"
          onClick={(e) => e.target === e.currentTarget && handleDisplayEditContainer()}
        >
          <div className="relative w-[520px] rounded-2xl bg-zinc-900 border border-zinc-800 shadow-2xl">
            {/* Modal header */}
            <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-zinc-800">
              <div>
                <h2 className="text-sm font-semibold text-white">일정 정보 수정</h2>
                <p className="text-[11px] text-zinc-500 mt-0.5">Schedule ID: {gameId}</p>
              </div>
              <button
                onClick={handleDisplayEditContainer}
                type="button"
                className="flex items-center justify-center w-7 h-7 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal body */}
            <div className="px-6 py-5 space-y-5 max-h-[80vh] overflow-y-auto" style={{ scrollbarWidth: "thin", scrollbarColor: "#3f3f46 transparent" }}>
              {/* Datetime validation errors */}
              {(teamDateTime.startInPast || teamDateTime.endBeforeStart) && (
                <div className="space-y-2">
                  {teamDateTime.startInPast && (
                    <div className="flex items-center gap-2 rounded-lg bg-red-500/10 border border-red-500/20 px-3 py-2.5">
                      <svg className="w-3.5 h-3.5 text-red-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                      </svg>
                      <p className="text-xs text-red-400">시작 일시는 현재 시점 이후여야 합니다</p>
                    </div>
                  )}
                  {teamDateTime.endBeforeStart && (
                    <div className="flex items-center gap-2 rounded-lg bg-red-500/10 border border-red-500/20 px-3 py-2.5">
                      <svg className="w-3.5 h-3.5 text-red-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                      </svg>
                      <p className="text-xs text-red-400">종료 일시는 시작 일시 이후여야 합니다</p>
                    </div>
                  )}
                </div>
              )}

              {/* Date / Time */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="team_start_date" className="block text-[11px] font-medium text-zinc-400 uppercase tracking-wider">
                    시작 날짜
                  </label>
                  <input
                    id="team_start_date"
                    type="date"
                    value={teamStartDate}
                    onChange={(e) => setTeamStartDate(e.target.value)}
                    className="w-full h-9 rounded-lg bg-zinc-800 border border-zinc-700 px-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="team_start_time" className="block text-[11px] font-medium text-zinc-400 uppercase tracking-wider">
                    시작 시간
                  </label>
                  <input
                    id="team_start_time"
                    type="time"
                    step="600"
                    value={teamStartTime}
                    onChange={(e) => setTeamStartTime(e.target.value)}
                    className="w-full h-9 rounded-lg bg-zinc-800 border border-zinc-700 px-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="team_end_date" className="block text-[11px] font-medium text-zinc-400 uppercase tracking-wider">
                    종료 날짜
                  </label>
                  <input
                    id="team_end_date"
                    type="date"
                    value={teamEndDate}
                    onChange={(e) => setTeamEndDate(e.target.value)}
                    className="w-full h-9 rounded-lg bg-zinc-800 border border-zinc-700 px-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="team_end_time" className="block text-[11px] font-medium text-zinc-400 uppercase tracking-wider">
                    종료 시간
                  </label>
                  <input
                    id="team_end_time"
                    type="time"
                    step="600"
                    value={teamEndTime}
                    onChange={(e) => setTeamEndTime(e.target.value)}
                    className="w-full h-9 rounded-lg bg-zinc-800 border border-zinc-700 px-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                </div>
              </div>

              <div className="border-t border-zinc-800/60" />

              {/* Capacity */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="team_min_invitation" className="block text-[11px] font-medium text-zinc-400 uppercase tracking-wider">
                    최소 인원
                  </label>
                  <input
                    id="team_min_invitation"
                    type="number"
                    value={teamMinInvitation}
                    onChange={(e) => setTeamMinInvitation(Number(e.target.value))}
                    className="w-full h-9 rounded-lg bg-zinc-800 border border-zinc-700 px-3 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="team_max_invitation" className="block text-[11px] font-medium text-zinc-400 uppercase tracking-wider">
                    최대 인원
                  </label>
                  <input
                    id="team_max_invitation"
                    type="number"
                    value={teamMaxInvitation}
                    onChange={(e) => setTeamMaxInvitation(Number(e.target.value))}
                    className="w-full h-9 rounded-lg bg-zinc-800 border border-zinc-700 px-3 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                </div>
              </div>

              <div className="border-t border-zinc-800/60" />

              {/* Fees */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="team_member_fee" className="block text-[11px] font-medium text-zinc-400 uppercase tracking-wider">
                    팀원 참가비
                  </label>
                  <input
                    id="team_member_fee"
                    type="number"
                    value={teamMemberFee}
                    onChange={(e) => setTeamMemberFee(Number(e.target.value))}
                    className="w-full h-9 rounded-lg bg-zinc-800 border border-zinc-700 px-3 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="team_fee" className="block text-[11px] font-medium text-zinc-400 uppercase tracking-wider">
                    게스트 참가비
                  </label>
                  <input
                    id="team_fee"
                    type="number"
                    value={teamFee}
                    onChange={(e) => setTeamFee(Number(e.target.value))}
                    className="w-full h-9 rounded-lg bg-zinc-800 border border-zinc-700 px-3 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                </div>
              </div>

              <div className="border-t border-zinc-800/60" />

              {/* Guest settings */}
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={teamIsExternalAllowed}
                  onChange={(e) => setTeamIsExternalAllowed(e.target.checked)}
                  className="w-4 h-4 rounded border-zinc-600 bg-zinc-800 text-blue-500 focus:ring-blue-500 focus:ring-offset-0"
                />
                <span className="text-xs text-zinc-300">게스트 모집 허용</span>
              </label>

              <div className="border-t border-zinc-800/60" />

              {/* Text content */}
              <div className="space-y-1.5">
                <label htmlFor="team_content" className="block text-[11px] font-medium text-zinc-400 uppercase tracking-wider">
                  상세 내용
                </label>
                <textarea
                  id="team_content"
                  value={teamContent}
                  onChange={(e) => setTeamContent(e.target.value)}
                  placeholder="경기 상세 설명을 입력하세요"
                  rows={4}
                  className="w-full rounded-lg bg-zinc-800 border border-zinc-700 px-3 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none leading-relaxed"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="team_info" className="block text-[11px] font-medium text-zinc-400 uppercase tracking-wider">
                  게스트 안내
                </label>
                <textarea
                  id="team_info"
                  value={teamInfo}
                  onChange={(e) => setTeamInfo(e.target.value)}
                  placeholder="게스트 안내 내용을 입력하세요"
                  rows={4}
                  className="w-full rounded-lg bg-zinc-800 border border-zinc-700 px-3 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none leading-relaxed"
                />
              </div>
            </div>

            {/* Modal footer */}
            <div className="px-6 pb-5 flex gap-3">
              <button
                type="button"
                onClick={handleDisplayEditContainer}
                className="flex-1 h-9 rounded-lg border border-zinc-700 text-zinc-400 text-sm font-medium hover:text-white hover:border-zinc-600 transition-colors"
              >
                취소
              </button>
              <button
                type="submit"
                onClick={handleSubmitTeamUpdate}
                disabled={teamFormInvalid}
                className="flex-1 h-9 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-500 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                수정하기
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col min-h-screen bg-black">
        {/* Page header */}
        <header className="sticky top-0 z-10 bg-zinc-950/95 backdrop-blur border-b border-zinc-800">
          <div className="px-8 py-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Link
                to="/games"
                className="flex items-center gap-1 text-zinc-500 hover:text-zinc-300 transition-colors text-xs"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                목록
              </Link>
              <span className="text-zinc-700">/</span>
              <div className="flex items-center gap-2">
                <span
                  className={`inline-flex rounded px-2 py-0.5 text-[11px] font-medium ${
                    isTeamGame
                      ? "bg-violet-500/10 text-violet-400 ring-1 ring-inset ring-violet-500/20"
                      : "bg-sky-500/10 text-sky-400 ring-1 ring-inset ring-sky-500/20"
                  }`}
                >
                  {isTeamGame ? "팀전" : "개인전"}
                </span>
                <span className="text-sm font-semibold text-white">#{gameId}</span>
              </div>
            </div>
          </div>

          {/* Tab bar */}
          <div className="px-8 flex items-center gap-6 border-t border-zinc-800/60" role="tablist">
            {tabs.map((t) => {
              const active = tab === t.key;
              return (
                <button
                  key={t.key}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => handleSetTab(t.key as typeof tab)}
                  className={`relative py-3 text-xs font-medium transition-colors ${
                    active ? "text-white" : "text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  {t.label}
                  {active && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 rounded-t-full" />
                  )}
                </button>
              );
            })}
          </div>
        </header>

        {/* Tab content */}
        <main className="flex-1 px-8 py-6">
          {isTeamGame ? (
            <>
              {tab === "scheduleInfo" && <TeamScheduleInfo data={teamData} handleDisplayEditContainer={handleDisplayEditContainer} />}
              {tab === "participants" && (
                <Participants gameId={gameId} gameType="team_game" />
              )}
            </>
          ) : (
            <>
              {tab === "gameInfo" && (
                <GameInfo
                  data={data?.data}
                  handleDisplayEditContainer={handleDisplayEditContainer}
                />
              )}
              {tab === "participants" && <Participants gameId={gameId} gameType="game" />}
              {tab === "hostReportInfo" && <Reports gameId={gameId} />}
            </>
          )}
        </main>
      </div>
    </>
  );
};

export default GameDetails;
