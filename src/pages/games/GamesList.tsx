import { useEffect, useState } from "react";
import { useUserStore } from "../../store/useUserStore";
import { Link, useNavigate } from "react-router-dom";
// import Sidebar from "../components/Sidebar";
import PaginationBtns from "../../components/common/PaginationBtns";
// import SportsBasketballIcon from "@mui/icons-material/SportsBasketball";
import { useGamesListHook } from "../../hook/useGamesListHook";
import FeedIcon from "@mui/icons-material/Feed";
import { Game } from "../../interface/game";
import { PageLayout } from "../../features/common/PageLayout";

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
    <>
      <PageLayout>
        <div className="flex flex-col gap-2">
          <ul className="flex w-full  items-center  pt-2 pb-4">
            <li className="font-bold  w-[10%] text-center ">ID</li>
            <li className="font-bold  w-[35%] text-center ">제목</li>
            <li className="font-bold  w-[15%] text-center ">경기 상태</li>
            <li className="font-bold  w-[15%] text-center ">시작일</li>
            <li className="font-bold  w-[15%] text-center ">종료일</li>
            <li className="font-bold  w-[10%] text-center ">상세</li>
          </ul>
          <hr />
          {gameData?.map((game) => {
            return (
              <ul className="flex w-full  items-center text-sm   hover:bg-gray-200 h-[60px] ">
                <li className="font-semibold  w-[10%] text-center ">
                  {game.id}
                </li>
                <li className="font-semibold  w-[35%] text-center ">
                  {game.title}
                </li>
                <li className="font-semibold  w-[15%] text-center ">
                  {game.game_status}
                </li>
                <li className="font-semibold  w-[15%] text-center ">
                  {game.startdate.slice(0, 10)}
                </li>
                <li className="font-semibold  w-[15%] text-center ">
                  {game.enddate.slice(0, 10)}
                </li>
                <Link
                  to="123"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold  w-[10%] text-center "
                >
                  <FeedIcon sx={{ color: "gray" }} />
                </Link>
              </ul>
            );
          })}
        </div>
        <PaginationBtns
          spacing={2}
          count={endIndex}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </PageLayout>
      {/* <section className="min-h-screen bg-[#e6e5e5] pt-[6rem] py-[4rem]">
        <div className="w-[82rem]  mx-auto px-[8rem] space-y-8  ">
          <h1 className="font-semibold text-xl bg-[#fdfdfd] h-[4rem] flex items-center py-2 px-4 rounded-xl">
            경기 목록
          </h1>

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
                            <span className="text-red-500 font-[500]">
                              취소
                            </span>
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
      </section> */}
    </>
  );
};

export default GamesList;
