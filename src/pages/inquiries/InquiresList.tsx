import { useState } from "react";

import PaginationBtns from "../../components/common/PaginationBtns";
import { useInquiriesListHook } from "../../features/inquries/hooks/useInquiriesListHook";
import FeedIcon from "@mui/icons-material/Feed";
import { PageLayout } from "../../features/common/PageLayout";
import { PageHeader } from "../../features/common/PageHeader";
import { Link } from "react-router-dom";
import { InquiryDataField } from "../../features/inquries/interface/inquries";

const InquiresList = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { data } = useInquiriesListHook(currentPage);

  const endIndex = data?.data.end_index;
  const privateInquriyData = data?.data.page_content;

  return (
    <>
      <PageHeader title="문의 목록" />
      <PageLayout>
        <div className="flex flex-col gap-2 ">
          {/* 문의 고유 번호, 유저 고유 번호, 제목, 답변 개수, 생성 일시 */}
          <ul className="flex w-full  h-[4rem]  items-center    bg-white">
            <li className="font-bold  w-[10%] text-center ">문의 ID</li>
            <li className="font-bold  w-[10%] text-center ">사용자 ID</li>
            <li className="font-bold  w-[25%] text-center ">제목</li>
            <li className="font-bold  w-[15%] text-center ">답변 개수</li>
            <li className="font-bold  w-[20%] text-center ">생성 일시</li>
            <li className="font-bold  w-[10%] text-center ">수정 일시</li>
            <li className="font-bold  w-[10%] text-center ">상세</li>
          </ul>
          <hr />
          <div className="flex flex-col gap-2 py-4 bg-white">
            {privateInquriyData?.map((inquiry: InquiryDataField) => {
              return (
                <ul className="flex w-full  items-center text-sm   hover:bg-gray-200 h-[60px] ">
                  <li className="font-semibold w-[10%] text-center ">
                    {inquiry.id}
                  </li>
                  <li className="font-semibold truncate  w-[10%] text-center ">
                    {inquiry.user}
                  </li>
                  <li className="font-semibold  w-[25%] text-center truncate">
                    {inquiry.title}
                  </li>
                  <li className="font-semibold  w-[15%] text-center ">
                    {inquiry.num_of_answers}
                  </li>
                  <li className="font-semibold  w-[20%] text-center  truncate">
                    {inquiry.created_at.slice(0, 10)} (
                    {inquiry.created_at.slice(11, 16)})
                  </li>
                  <li className="font-semibold truncate  w-[10%] text-center ">
                    {inquiry.modified_at.slice(0, 10)} (
                    {inquiry.modified_at.slice(11, 16)})
                  </li>
                  <li className="font-semibold  w-[10%] text-center ">
                    {" "}
                    <Link to={`${inquiry.id}`}>
                      <FeedIcon sx={{ color: "gray" }} />
                    </Link>
                  </li>
                </ul>
              );
            })}
          </div>
        </div>
        <PaginationBtns
          spacing={2}
          count={endIndex}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </PageLayout>
    </>
  );
};

export default InquiresList;
