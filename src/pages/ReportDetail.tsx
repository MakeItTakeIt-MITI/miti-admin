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
  const { data: reportDetailData } = useReportDetailsHook(paramId);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [navigate, isLoggedIn]);
  return (
    <div className="flex h-screen bg-[#f8f8f9]">
      <Sidebar />
      <section className="p-10 space-y-6 w-full">
        <h1 className="font-bold text-[18px] bg-white rounded-[12px] p-4">
          대시보드 &#8594; 신고 목록 &#8594; 신고 상세 정보
        </h1>
        {/* <Chart /> */}
        <div className="bg-white rounded-[12px] p-4 min-h-[30rem] flex flex-col gap-4">
          <h2 className="font-bold text-[18px]">
            {reportDetailData?.data.category} -{" "}
            {reportDetailData?.data.subcategory}
          </h2>
          <hr />
          <p
            dangerouslySetInnerHTML={{
              __html: `${reportDetailData?.data.content}`,
            }}
          />
        </div>

        <div>
          {/* <p
            dangerouslySetInnerHTML={{ __html: `${reportDetailData?.content}` }}
          /> */}
        </div>
      </section>
    </div>
  );
};

export default ReportDetail;
