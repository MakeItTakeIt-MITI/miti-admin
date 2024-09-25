import PendingIcon from "@mui/icons-material/Pending"; // 참고 디자인
import { ReportDetailField } from "../../interface/reports";

interface ReportDetailProp {
  gameDetailData: ReportDetailField;
}
const ReportDetailContainer = ({ gameDetailData }: ReportDetailProp) => {
  return (
    <div className="border border-gray-200 relative w-full min-h-[12rem] flex flex-col gap-4 px-4 py-6">
      <div className="flex  gap-1  bg-white absolute -top-5 left-2 w-30 h-10 border border-gray-200 p-2 rounded-sm items-center ">
        <PendingIcon />
        <h1 className="text-sm font-bold">신고 내용</h1>
      </div>
      <div className="w-full h-full   flex flex-col gap-4 text-sm">
        <div className="">
          <h2 className="text-gray-400">카테고리</h2>
          <h3>{gameDetailData?.category}</h3>
        </div>
        <div className="h-[6rem] overflow-y-auto">
          <h2 className="text-gray-400">신고 내용</h2>
          <h3>{gameDetailData?.content} lorem200</h3>
        </div>
      </div>
    </div>
  );
};

export default ReportDetailContainer;
