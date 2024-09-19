import CalendarViewDayIcon from "@mui/icons-material/CalendarViewDay";
import { ReportDetailField } from "../../interface/reports";

interface CourtDetailProp {
  gameDetailData: ReportDetailField;
}

const CourtDetails = ({ gameDetailData }: CourtDetailProp) => {
  console.log(gameDetailData);
  return (
    <div className="border border-gray-200 relative w-full min-h-[12rem] flex flex-col  gap-4 px-4 pt-8 pb-4 text-sm">
      {" "}
      <div className="flex  gap-1  bg-white absolute -top-5 left-2 w-30 h-10 border border-gray-200 p-2 rounded-sm items-center ">
        {/* <h2 className="text-gray-400">ID</h2>
      <h3>{gameDetailData?.game.id} </h3> */}

        <CalendarViewDayIcon />
        <h1 className=" font-bold text-xsm">코트 정보</h1>
      </div>
      <div className="flex gap-10">
        <div className="flex flex-col  gap-1">
          <h2 className="text-gray-400">ID</h2>
          <h3>{gameDetailData?.game.court.id} </h3>
        </div>
        <div className="flex flex-col  gap-1">
          <h2 className="text-gray-400">주소</h2>
          <h3>{gameDetailData?.game.court.address} </h3>
        </div>
        <div className="flex flex-col  gap-1">
          <h2 className="text-gray-400">상세 주소</h2>
          <h3>{gameDetailData?.game.court.address_detail} </h3>
        </div>
        <div className="flex flex-col  gap-1">
          <h2 className="text-gray-400">코트 이름</h2>
          <h3>{gameDetailData?.game.court.name} </h3>
        </div>
      </div>
    </div>
  );
};

export default CourtDetails;
