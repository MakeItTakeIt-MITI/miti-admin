import { ReportersListField, ReportField } from "../../interface/reports";
import GroupIcon from "@mui/icons-material/Group";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
interface ReporteeDetailProp {
  gameDetailData: ReportersListField;
  setOpenDrawer: (arg: boolean) => void;
}
const ReportersList = ({ gameDetailData }: ReporteeDetailProp) => {
  // const [];
  return (
    <div className="w-[80%] flex flex-col gap-4  ">
      <div className="flex gap-2 items-center">
        <GroupIcon />
        <h1 className="text-sm font-bold">
          신고자 목록 ({gameDetailData?.reports.length})
        </h1>
      </div>
      {/* <hr /> */}
      <div
        style={{
          scrollbarWidth: "thin",
        }}
        className="flex flex-col space-y-4 text-sm overflow-y-auto p-2 max-h-[55rem]"
      >
        {gameDetailData?.reports.map((reporter: ReportField) => {
          return (
            <div className="relative flex items-center gap-4 border  hover:bg-gray-100 border-gray-200 px-4 py-6 rounded-lg  ">
              <div className="absolute gap-4  -top-2 -left-1 w-[14rem] h-6 bg-white flex items-center px-2  border border-gray-200">
                <span> ID: {reporter.id}</span>{" "}
                <span className="text-[13px]">
                  등록일: {reporter.created_at.slice(0, 10)}
                </span>
              </div>
              <AccountBoxIcon fontSize="medium" />
              <div className="flex flex-col gap-2 text-sm w-full">
                {" "}
                {/* <span className="font-bold">ID</span> <span>{reporter.id}</span> */}
                <h2>{reporter.category}</h2>
                <h3>{reporter.report_status}</h3>
              </div>

              <p
                style={{
                  scrollbarWidth: "thin",
                }}
                className="overflow-y-auto h-[5rem] w-full text-sm"
              >
                {reporter.content}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ReportersList;
