import { useState } from "react";
import { Link } from "react-router-dom";
// import Sidebar from "../components/Sidebar";
import PaginationBtns from "../../components/common/PaginationBtns";
// import SportsBasketballIcon from "@mui/icons-material/SportsBasketball";
import { useGamesListHook } from "../../hook/useGamesListHook";
import FeedIcon from "@mui/icons-material/Feed";
import { PageLayout } from "../../features/common/PageLayout";
import { TableLayout } from "../../components/common/TableLayout";
import { GameField } from "../../features/games/interface/game";

const GamesList = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  // const { data } = useUsersListHook(currentPage);
  const { data, isLoading } = useGamesListHook(currentPage);
  const endIndex = data?.data.end_index;
  const gameData = data?.data.page_content;
  const headers = ["ID", "제목", "경기 상태", "시작", "종료료", "상세"];

  const tableData =
    !isLoading && data?.status_code === 200
      ? gameData.map((game: GameField) => [
          game.id,
          game.title,
          game.game_status,
          `${game.startdate} ${game.starttime}`,
          `${game.enddate} ${game.endtime}`,
          <Link to={`${game.id}`} className="inline-block w-full text-center">
            <FeedIcon sx={{ color: "gray" }} />
          </Link>,
        ])
      : [];
  return (
    <>
      <PageLayout>
        <div className="flex flex-col gap-2 ">
          {data?.status_code === 200 ? (
            <TableLayout
              headers={headers}
              data={tableData}
              context="경기 내역이 없습니다!"
            />
          ) : (
            <h1 className="flex items-center justify-center font-bold">
              오류 발생
            </h1>
          )}
        </div>
        <PaginationBtns
          spacing={2}
          count={endIndex}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </PageLayout>
    </>
  );
};

export default GamesList;
