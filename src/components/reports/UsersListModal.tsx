/* eslint-disable @typescript-eslint/no-explicit-any */
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import CloseIcon from "@mui/icons-material/Close";
import SportsBasketballIcon from "@mui/icons-material/SportsBasketball";
import CalendarViewDayIcon from "@mui/icons-material/CalendarViewDay";
import GroupIcon from "@mui/icons-material/Group";

const UsersListModal = ({ setOpenModal, reportersListData }: any) => {
  console.log(reportersListData);
  return (
    <aside
      onClick={() => setOpenModal(false)}
      className="z-[999] fixed right-0 top-0 bottom-0 left-0 h-full w-full bg-gray-800 bg-opacity-70"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          transition: "transform 0.3s ease-in-out",
          transform: "translateX(0)",
        }}
        className="absolute top-0 right-0 bottom-0 bg-white w-[85rem] drawer-closing   space-y-4"
      >
        {/* header */}
        <div className="flex justify-between p-4 border-b border-gray-400">
          <div className="flex items-center gap-2">
            <ErrorOutlineIcon />
            <h1 className="font-bold ">신고자 목록 조회</h1>
          </div>

          <div onClick={() => setOpenModal(false)} className="cursor-pointer">
            <CloseIcon />
          </div>
        </div>

        <div className="flex flex-row-reverse gap-4 p-6">
          {/* Users list */}
          <div className="border border-gray-200 relative w-full min-h-[6rem] flex flex-col  gap-4 px-4 pt-8 pb-4 text-sm">
            {" "}
            {/* 신고자 목록 */}
            <div className="flex  gap-1  bg-white absolute -top-5 left-2 w-30 h-10 border border-gray-200 p-2 rounded-sm items-center ">
              <GroupIcon />
              <h1 className=" font-bold text-xsm">신고자 목룍</h1>
            </div>
            <div className="flex gap-10">
              <div className="flex flex-col  gap-1">
                <h2 className="text-gray-400">신고자</h2>
                {/* <h3>{reportersListData?.data.court.id} </h3> */}
              </div>
              <div className="flex flex-col  gap-1">
                <h2 className="text-gray-400">신고된 사용자 아이디</h2>
                {/* <h3>{reportersListData?.data.court.address} </h3> */}
              </div>
              <div className="flex flex-col  gap-1">
                <h2 className="text-gray-400">카테고리</h2>
                {/* <h3>{reportersListData?.data.court.address_detail} </h3> */}
              </div>
              <div className="flex flex-col  gap-1">
                <h2 className="text-gray-400">내용</h2>
                {/* <h3>{reportersListData?.data.court.name} </h3> */}
              </div>
              <div className="flex flex-col  gap-1">
                <h2 className="text-gray-400">신고 상태</h2>
                {/* <h3>{reportersListData?.data.court.name} </h3> */}
              </div>
              <div className="flex flex-col  gap-1">
                <h2 className="text-gray-400">신고 등록일</h2>
                {/* <h3>{reportersListData?.data.court.name} </h3> */}
              </div>
            </div>
          </div>

          {/* ----- */}

          <div className="flex flex-col gap-8 w-full ">
            {/* game details */}
            <div className="border border-gray-200 relative w-full min-h-[12rem] flex flex-col  justify-center gap-4 px-4 pt-8 pb-4 text-sm">
              {" "}
              <div className="flex  gap-1  bg-white absolute -top-5 left-2 w-30 h-10 border border-gray-200 p-2 rounded-sm items-center ">
                <SportsBasketballIcon />
                <h1 className=" font-bold text-xsm">경기 정보</h1>
              </div>
              <div className="flex items-center gap-10">
                <div className="flex flex-col  gap-1">
                  <h2 className="text-gray-400">ID</h2>
                  <h3>{reportersListData?.data.id} </h3>
                </div>
                <div className="flex flex-col   gap-1">
                  <h2 className="text-gray-400">진행상황</h2>
                  <h3>{reportersListData?.data.game_status} </h3>
                </div>
                <div className="flex flex-col   gap-1">
                  <h2 className="text-gray-400">제목</h2>
                  <h3>{reportersListData?.data.title} </h3>
                </div>
                <div className="flex flex-col   gap-1">
                  <h2 className="text-gray-400">최소 인원</h2>
                  <h3>{reportersListData?.data.min_invitation} </h3>
                </div>
                <div className="flex flex-col   gap-1">
                  <h2 className="text-gray-400">최대 인원</h2>
                  <h3>{reportersListData?.data.max_invitation} </h3>
                </div>
              </div>
              <div className="flex items-center gap-10">
                <div className="flex flex-col  gap-1">
                  <h2 className="text-gray-400">시작</h2>
                  <div className="">
                    <p> {reportersListData?.data.startdate} </p>
                    <p>({reportersListData?.data.starttime})</p>
                  </div>
                </div>
                <div className="flex flex-col   gap-1">
                  <h2 className="text-gray-400">종료</h2>
                  <div className="">
                    <p> {reportersListData?.data.enddate} </p>
                    <p>({reportersListData?.data.endtime})</p>
                  </div>
                </div>
                <div className="flex flex-col   gap-1">
                  <h2 className="text-gray-400">참여비</h2>
                  <h3>{reportersListData?.data.fee} </h3>
                </div>
                <div className="flex flex-col   gap-1">
                  <h2 className="text-gray-400">기타</h2>
                  <h3>{reportersListData?.data.info} </h3>
                </div>
              </div>
            </div>
            {/* courts */}
            <div className="border border-gray-200 relative w-full min-h-[6rem] flex flex-col  gap-4 px-4 pt-8 pb-4 text-sm">
              {" "}
              <div className="flex  gap-1  bg-white absolute -top-5 left-2 w-30 h-10 border border-gray-200 p-2 rounded-sm items-center ">
                <CalendarViewDayIcon />
                <h1 className=" font-bold text-xsm">코트 정보</h1>
              </div>
              <div className="flex gap-10">
                <div className="flex flex-col  gap-1">
                  <h2 className="text-gray-400">ID</h2>
                  <h3>{reportersListData?.data.court.id} </h3>
                </div>
                <div className="flex flex-col  gap-1">
                  <h2 className="text-gray-400">주소</h2>
                  <h3>{reportersListData?.data.court.address} </h3>
                </div>
                <div className="flex flex-col  gap-1">
                  <h2 className="text-gray-400">상세 주소</h2>
                  <h3>{reportersListData?.data.court.address_detail} </h3>
                </div>
                <div className="flex flex-col  gap-1">
                  <h2 className="text-gray-400">코트 이름</h2>
                  <h3>{reportersListData?.data.court.name} </h3>
                </div>
              </div>
            </div>

            {/* <CourtDetails reportersListData=.data{tersListData} } */}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default UsersListModal;
