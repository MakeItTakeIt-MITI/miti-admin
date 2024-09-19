import { ReportDetailField } from "../../interface/reports";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import CloseIcon from "@mui/icons-material/Close";
// 참고 디자인

import ReporteeDetails from "./ReporteeDetails";
import ReportDetailContainer from "./ReportDetailContainer";
import GameDetails from "./GameDetails";
import CourtDetails from "./CourtDetails";
// https://cdn1.dronahq.com/wp-content/uploads/2023/08/Bill-Details-1024x512.png

const Drawer = ({
  setOpenDrawer,
  reportDetailsData,
}: {
  setOpenDrawer: (arg: boolean) => void;
  reportDetailsData: {
    status_code: number;
    message: string;
    data: ReportDetailField;
  };
}) => {
  const gameDetailData = reportDetailsData?.data;

  return (
    <aside
      onClick={() => setOpenDrawer(false)}
      className="z-[999] fixed right-0 top-0 bottom-0 left-0 h-full w-full bg-gray-800 bg-opacity-70"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          transition: "transform 0.3s ease-in-out",
          transform: "translateX(0)",
        }}
        className="absolute top-0 right-0 bottom-0 bg-white w-[70rem] drawer-closing   space-y-4"
      >
        <div className="flex justify-between p-4 border-b border-gray-400">
          <div className="flex items-center gap-2">
            <ErrorOutlineIcon />
            <h1 className="font-bold ">신고 상세 정보</h1>
          </div>

          {/* change to button later */}
          <div onClick={() => setOpenDrawer(false)} className="cursor-pointer">
            <CloseIcon />
          </div>
        </div>
        {/* details */}
        <div className="flex gap-4 px-6 py-2 w-full h-full">
          {/* left container */}
          <ReporteeDetails
            gameDetailData={gameDetailData}
            setOpenDrawer={setOpenDrawer}
          />
          <hr className="w-[1px] h-screen bg-gray-200" />
          {/* right container */}
          <div className="flex flex-col gap-8 w-full">
            <ReportDetailContainer gameDetailData={gameDetailData} />
            {/* <hr /> */}
            <GameDetails gameDetailData={gameDetailData} />
            <CourtDetails gameDetailData={gameDetailData} />
          </div>{" "}
        </div>
      </div>
    </aside>
  );
};

export default Drawer;
