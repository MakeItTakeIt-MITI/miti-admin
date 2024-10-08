import { useEffect, useState } from "react";
import { useUserStore } from "../store/useUserStore";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import PaginationBtns from "../components/common/PaginationBtns";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import { usePrivateInquiriesHook } from "../hook/usePrivateInquiriesHook";
import { PrivateInquiryField } from "../interface/support";
import FeedIcon from "@mui/icons-material/Feed";
import InquiryDetail from "../components/inquiries/InquiryDetail";

const PrivateInquiriesList = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [displayModal, setDisplayModal] = useState(false);
  const [inquiryId, setInquiryId] = useState<null | number>(null);

  const { isLoggedIn, logout } = useUserStore();
  const navigate = useNavigate();

  const { data } = usePrivateInquiriesHook(currentPage);

  const endIndex = data?.data.end_index;
  const privateInquriyData = data?.data.page_content;

  const userSessionStorage = sessionStorage.getItem("accessToken");

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }

    if (!userSessionStorage) {
      logout();
    }
  }, [navigate, isLoggedIn, logout, userSessionStorage]);

  return (
    <section className="flex h-screen bg-[#f8f8f9] relative">
      {displayModal && (
        <InquiryDetail
          setDisplayModal={setDisplayModal}
          inquiryId={inquiryId}
        />
      )}
      <Sidebar />
      <div className="p-10 space-y-6 w-full">
        <div className=" bg-white rounded-[12px] p-4 flex items-center gap-2">
          <SupportAgentIcon fontSize="large" />
          <h1 className="font-bold text-[28px]">익명 문의 목록</h1>
        </div>

        <div className="bg-white rounded-[12px] p-4 min-h-[40rem]  flex flex-col justify-between  ">
          {privateInquriyData?.length >= 1 ? (
            <>
              <table
                style={{ tableLayout: "fixed" }}
                cellPadding="10"
                className="w-full h-full"
              >
                <thead>
                  <tr className="">
                    <th>ID</th>
                    <th>제목</th>
                    <th>생성일</th>
                    <th>상세 정보</th>
                  </tr>
                </thead>
                <tbody>
                  {privateInquriyData?.map((inquiry: PrivateInquiryField) => (
                    <tr
                      key={inquiry.id}
                      className=" border-b border-gray-200 text-center text-[14px] hover:bg-gray-100"
                    >
                      <td>{inquiry.id}</td>
                      <td>{inquiry.title}</td>
                      <td>
                        {inquiry.created_at.slice(0, 10)} (
                        {inquiry.created_at.slice(11, 16)})
                      </td>
                      <td
                        onClick={() => {
                          setDisplayModal(true);
                          setInquiryId(inquiry.id);
                        }}
                      >
                        <FeedIcon
                          sx={{ color: "gray" }}
                          className="cursor-pointer"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <PaginationBtns
                spacing={2}
                count={endIndex}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            </>
          ) : (
            <h1 className="flex items-center justify-center font-bold text-xl">
              익명 문의가 없습니다.
            </h1>
          )}
        </div>
      </div>
    </section>
  );
};

export default PrivateInquiriesList;
