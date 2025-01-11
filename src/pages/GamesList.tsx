import { useEffect, useState } from "react";
import { useUserStore } from "../store/useUserStore";
import { Link, useNavigate } from "react-router-dom";
// import Sidebar from "../components/Sidebar";
import PaginationBtns from "../components/common/PaginationBtns";
// import SportsBasketballIcon from "@mui/icons-material/SportsBasketball";
import { useGamesListHook } from "../hook/useGamesListHook";
import FeedIcon from "@mui/icons-material/Feed";
import { Game } from "../interface/game";

const GamesList = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { isLoggedIn, logout } = useUserStore();
  const navigate = useNavigate();

  // const { data } = useUsersListHook(currentPage);
  const { data } = useGamesListHook(currentPage);
  const endIndex = data?.data.end_index;
  const gameData = data?.data.page_content;

  const userSessionStorage = sessionStorage.getItem("accessToken");

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }

    if (!userSessionStorage) {
      logout();
    }
  }, [navigate, isLoggedIn, logout, userSessionStorage]);

  return (
    <section className="min-h-screen bg-[#e6e5e5] pt-[6rem] py-[4rem]">
      {/* <Sidebar /> */}
      <div className="w-[82rem]  mx-auto px-[8rem] space-y-8  ">
        <h1 className="font-bold text-xl bg-[#fdfdfd] h-[4rem] flex items-center py-2 px-4 rounded-xl">
          경기 목록
        </h1>
        {/* <div className=" bg-white rounded-[12px] p-4 flex items-center gap-2">
          <SportsBasketballIcon fontSize="large" />
          <h1 className="font-bold text-[28px]">경기 목록</h1>
        </div> */}

        <div className="bg-white rounded-[12px] p-4 min-h-[50rem] flex flex-col justify-between  space-y-6  ">
          {gameData?.length >= 1 ? (
            <>
              <table
                style={{ tableLayout: "fixed" }}
                cellPadding="16"
                className="w-full h-full"
              >
                <thead>
                  <tr className="">
                    <th>ID</th>
                    <th>상태</th>
                    <th>제목</th>
                    <th>시작</th>
                    <th>종료</th>
                    <th>상세</th>
                  </tr>
                </thead>
                <tbody>
                  {gameData?.map((game: Game) => (
                    <tr
                      key={game.id}
                      className=" border-b border-gray-200 text-center text-[14px] hover:bg-gray-100"
                    >
                      <td>{game.id}</td>
                      <td>
                        {game.game_status === "canceled" && (
                          <span className="text-red-500 font-[500]">취소</span>
                        )}{" "}
                        {game.game_status === "open" && "모집중"}{" "}
                        {game.game_status === "closed" && "모집 마감"}{" "}
                        {game.game_status === "completed" && "진행 완료"}{" "}
                      </td>
                      <td>{game.title}</td>
                      <td>{game.startdate.slice(0, 10)}</td>
                      <td>{game.enddate.slice(0, 10)}</td>
                      <td>
                        <Link target="_blank" to={`/games/${game.id}`}>
                          <FeedIcon sx={{ color: "gray" }} />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <PaginationBtns
                spacing={2}
                count={endIndex}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            </>
          ) : (
            <h1 className="flex items-center justify-center font-bold text-xl">
              경기 목록이 없습니다.
            </h1>
          )}
        </div>
      </div>
    </section>
  );
};

export default GamesList;
