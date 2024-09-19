import SportsBasketballIcon from "@mui/icons-material/SportsBasketball";
import { ReportDetailField } from "../../interface/reports";

interface GameDetailProp {
  gameDetailData: ReportDetailField;
}

const GameDetails = ({ gameDetailData }: GameDetailProp) => {
  return (
    <div className="border border-gray-200 relative w-full min-h-[12rem] flex flex-col justify-center gap-4 px-4 pt-8 pb-4 text-sm">
      {" "}
      <div className="flex  gap-1  bg-white absolute -top-5 left-2 w-30 h-10 border border-gray-200 p-2 rounded-sm items-center ">
        <SportsBasketballIcon />
        <h1 className=" font-bold text-xsm">경기 정보</h1>
      </div>
      <div className="flex items-center gap-10">
        <div className="flex flex-col  gap-1">
          <h2 className="text-gray-400">ID</h2>
          <h3>{gameDetailData?.game.id} </h3>
        </div>
        <div className="flex flex-col   gap-1">
          <h2 className="text-gray-400">진행상황</h2>
          <h3>{gameDetailData?.game.game_status} </h3>
        </div>
        <div className="flex flex-col   gap-1">
          <h2 className="text-gray-400">제목</h2>
          <h3>{gameDetailData?.game.title} </h3>
        </div>
        <div className="flex flex-col   gap-1">
          <h2 className="text-gray-400">최소 인원</h2>
          <h3>{gameDetailData?.game.min_invitation} </h3>
        </div>
        <div className="flex flex-col   gap-1">
          <h2 className="text-gray-400">최대 인원</h2>
          <h3>{gameDetailData?.game.max_invitation} </h3>
        </div>
      </div>
      <div className="flex items-center gap-10">
        <div className="flex flex-col  gap-1">
          <h2 className="text-gray-400">시작</h2>
          <div className="">
            <p> {gameDetailData?.game.startdate} </p>
            <p>({gameDetailData?.game.starttime})</p>
          </div>
        </div>
        <div className="flex flex-col   gap-1">
          <h2 className="text-gray-400">종료</h2>
          <div className="">
            <p> {gameDetailData?.game.enddate} </p>
            <p>({gameDetailData?.game.endtime})</p>
          </div>
        </div>
        <div className="flex flex-col   gap-1">
          <h2 className="text-gray-400">참여비</h2>
          <h3>{gameDetailData?.game.fee} </h3>
        </div>
        <div className="flex flex-col   gap-1">
          <h2 className="text-gray-400">기타</h2>
          <h3>{gameDetailData?.game.info} </h3>
        </div>
      </div>
    </div>
  );
};

export default GameDetails;
