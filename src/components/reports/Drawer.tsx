import { ReportersListField } from "../../interface/reports";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import CloseIcon from "@mui/icons-material/Close";
// 참고 디자인

import GameDetails from "./GameDetails";
import CourtDetails from "./CourtDetails";
import ReportersList from "./ReportersList";
import { Button } from "@mui/material";
import { useDismissUserReportHook } from "../../hook/useDismissUserReportHook";
import { usePenalizeGameHook } from "../../hook/usePenalizeGameHook";
import { useState } from "react";
// https://cdn1.dronahq.com/wp-content/uploads/2023/08/Bill-Details-1024x512.png

const Drawer = ({
  setOpenDrawer,
  reportersListData,
  reportStatus,
}: {
  setOpenDrawer: (arg: boolean) => void;
  reportersListData: {
    status_code: number;
    message: string;
    data: ReportersListField;
  };
  reportStatus: string;
}) => {
  const [suspendDays, setSuspendDays] = useState<null | number | string>(1);
  const gameDetailData = reportersListData?.data;

  const { mutate } = useDismissUserReportHook();
  const { mutate: penalizeGame } = usePenalizeGameHook();

  const handleDismissReport = () => {
    mutate(gameDetailData.id);
  };

  const handlePenalizeGame = (
    type: "suspend" | "warning",
    period: number | null
  ) => {
    const data = { penalty: type, duration: period };
    penalizeGame({ gameId: gameDetailData.id, data });
  };

  return (
    <aside
      onClick={() => setOpenDrawer(false)}
      className="z-[999] fixed right-0 top-0 bottom-0 left-0 h-full w-full bg-gray-800 bg-opacity-70"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        style={{
          transition: "transform 0.3s ease-in-out",
          transform: "translateX(0)",
        }}
        className="absolute top-0 right-0 bottom-0 bg-white w-[85rem] drawer-closing   space-y-4"
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
        <div className="flex gap-4 px-6 py-2 w-full  overflow-y-scroll ">
          {/* left container */}
          <ReportersList
            gameDetailData={gameDetailData}
            setOpenDrawer={setOpenDrawer}
          />
          <hr className="w-[1px] h-screen bg-gray-200" />
          {/* right container */}
          <div className="flex flex-col gap-8 w-full py-3">
            {/* <hr /> */}
            <GameDetails gameDetailData={gameDetailData} />
            <CourtDetails gameDetailData={gameDetailData} />

            {reportStatus === "concluded" ? (
              <h1 className="text-center font-bold text-green-600 ">
                신가처리가 이미 완료 되었어요.
              </h1>
            ) : (
              <div className="flex flex-col gap-4">
                <h2 className="text-md  font-bold ">
                  *호스트에 대한 신고 내용을 충분히 확인하시고, 해당 호스트에
                  대한 경고, 정지, 또는 기각 처리를 해주시기 바랍니다.
                </h2>
                <div className="flex flex-col items-center gap-6">
                  <Button
                    variant="contained"
                    color="primary"
                    style={{
                      height: "50px",
                      width: "50%",
                    }}
                    onClick={handleDismissReport}
                  >
                    호스트에 대한 신고를 기각합니다
                  </Button>
                  <Button
                    variant="contained"
                    color="warning"
                    onClick={() => {
                      handlePenalizeGame("warning", null);
                    }}
                    style={{
                      height: "50px",
                      width: "50%",
                    }}
                  >
                    호스트에게 경고를 주겠습니다
                  </Button>
                  <div className="w-full flex flex-col items-center gap-2">
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => {
                        const suspendDaysToNum = Number(suspendDays);
                        handlePenalizeGame("suspend", suspendDaysToNum);
                      }}
                      style={{
                        height: "50px",
                        width: "50%",
                      }}
                    >
                      호스트를 정지시키겠습니다
                    </Button>

                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        placeholder="0"
                        onChange={(e) => setSuspendDays(e.target.value)}
                        className="h-full w-[80px] flex items-center justify-center border border-gray-200 p-2 rounded-lg"
                      />
                      <p className="text-sm font-[500]">
                        *정지 일수를 입력해 주세요.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>{" "}
        </div>
      </div>
    </aside>
  );
};

export default Drawer;
