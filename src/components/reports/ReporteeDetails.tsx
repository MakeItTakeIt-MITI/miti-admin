import { Button } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { ReportDetailField } from "../../interface/reports";

interface ReporteeDetailProp {
  gameDetailData: ReportDetailField;
}
const ReporteeDetails = ({ gameDetailData }: ReporteeDetailProp) => {
  return (
    <div className="w-[35%] flex flex-col gap-6  ">
      <div className="flex gap-2 items-center">
        <PersonIcon />
        <h1 className="text-sm font-bold">신고자 정보</h1>
      </div>
      <div className="flex flex-col space-y-2 text-sm">
        <div className="space-y-1">
          <h2 className="text-gray-400 ">아이디</h2>
          <p className="">{gameDetailData?.reportee.id}</p>
        </div>
        <hr />
        <div className="space-y-1">
          <h2 className="text-gray-400 ">이메일</h2>
          <p className=" truncate">{gameDetailData?.reportee.email}</p>
        </div>{" "}
        <hr />
        <div className="space-y-1">
          <h2 className="text-gray-400 ">닉네임</h2>
          <p className="">{gameDetailData?.reportee.nickname}</p>
        </div>{" "}
        <hr />
        <div className="space-y-1">
          <h2 className="text-gray-400 ">이름</h2>
          <p className="">{gameDetailData?.reportee.name}</p>
        </div>
        <hr />
        <div className="space-y-1">
          <h2 className="text-gray-400 ">정지 상태</h2>

          <p className="">
            {gameDetailData?.reportee.suspended_until === null
              ? "정지된 사용자 아닙니다."
              : gameDetailData?.reportee.suspended_until}
          </p>
        </div>
      </div>
      <Button variant="contained" color="error">
        신고 기각
      </Button>
    </div>
  );
};

export default ReporteeDetails;
