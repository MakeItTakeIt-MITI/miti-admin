import { useEffect } from "react";
import { useUserStore } from "../store/useUserStore";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useReportDetailsHook } from "../hook/useReportDetailsHook";

const ReportDetail = () => {
  const { isLoggedIn } = useUserStore();
  const navigate = useNavigate();
  const { id } = useParams();
  const paramId = Number(id);
  const { data } = useReportDetailsHook(paramId);
  const reportDetailData = data?.data;

  console.log(reportDetailData);
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [navigate, isLoggedIn]);
  return (
    <div className="flex h-screen bg-[#f8f8f9]">
      <Sidebar />
      <section className="p-10 space-y-6 w-full">
        <h1 className="font-bold text-[36px]">
          {/* {reportDetailData.subcategory === "game_hosting_report" && (
            <>경기 운영 상세 정보</>
          )} */}
          {reportDetailData?.subcategory}
        </h1>
        {/* <Chart /> */}
        <div>
          <p
            dangerouslySetInnerHTML={{ __html: `${reportDetailData?.content}` }}
          />
        </div>
      </section>
    </div>
  );
};

export default ReportDetail;
