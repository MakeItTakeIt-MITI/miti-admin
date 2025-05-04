import { useState } from "react";

import PaginationBtns from "../../components/common/PaginationBtns";
import { useInquiriesListHook } from "../../features/inquries/hooks/useInquiriesListHook";
import FeedIcon from "@mui/icons-material/Feed";
import { PageLayout } from "../../features/common/PageLayout";
import { Link } from "react-router-dom";
import { InquiryDataField } from "../../features/inquries/interface/inquries";
import { TableLayout } from "../../components/common/TableLayout";

const InquiresList = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { data, isLoading } = useInquiriesListHook(currentPage);

  const endIndex = data?.data.end_index;
  const privateInquriyData = data?.data.page_content;

  const headers = [
    "문의 ID",
    "사용자 ID",
    "제목",
    "답변 개수",
    "생성일",
    "수정일",
    "상세",
  ];
  const tableData =
    !isLoading && data?.status_code === 200
      ? privateInquriyData.map((inquiry: InquiryDataField) => [
          inquiry.id,
          inquiry.user,
          inquiry.title,
          inquiry.num_of_answers,
          inquiry.created_at,
          inquiry.modified_at,
          <Link
            to={`${inquiry.id}`}
            className="inline-block w-full text-center"
          >
            <FeedIcon sx={{ color: "gray" }} />
          </Link>,
        ])
      : [];

  return (
    <>
      <PageLayout>
        <div className="flex flex-col gap-2 ">
          {data?.status_code === 200 ? (
            <TableLayout
              headers={headers}
              data={tableData}
              context="신고 내역이 없습니다!"
            />
          ) : (
            <h1 className="flex items-center justify-center font-bold">
              오류 발생
            </h1>
          )}
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
