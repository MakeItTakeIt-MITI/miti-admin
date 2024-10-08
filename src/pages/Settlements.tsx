import { useEffect, useState } from "react";
import { useUserStore } from "../store/useUserStore";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import PaymentIcon from "@mui/icons-material/Payment";
import PaginationBtns from "../components/common/PaginationBtns";

import PostAddIcon from "@mui/icons-material/PostAdd";
import { usePaymentsListhook } from "../hook/usePaymentsListhook";
import { TransferField } from "../interface/payment";
import Drawer from "../components/settlements/Drawer";
import { usePaymentDetailsHook } from "../hook/usePaymentDetailsHook";

const Settlements = () => {
  const { isLoggedIn, logout } = useUserStore();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [paymentId, setPaymentId] = useState<null | number>(null);
  const [openDrawer, setOpenDrawer] = useState(false);

  const { data: paymentsData } = usePaymentsListhook(1);
  const endIndex = paymentsData?.data.end_index;

  const { data: paymentDetailsData } = usePaymentDetailsHook(paymentId);

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
    <section className="flex h-screen bg-[#f8f8f9]">
      {openDrawer && (
        <Drawer
          paymentDetailsData={paymentDetailsData}
          setOpenDrawer={setOpenDrawer}
        />
      )}
      <Sidebar />
      <div className="p-10 space-y-6 w-full">
        <div className=" bg-white rounded-[12px] p-4 flex items-center gap-2">
          <PaymentIcon fontSize="large" />

          <h1 className="font-bold text-[28px]">정산금 목록</h1>
        </div>
        <div className="bg-white rounded-[12px] p-4 min-h-[40rem] flex flex-col  justify-between ">
          <>
            <table
              style={{ tableLayout: "fixed" }}
              cellPadding="10"
              className="w-full h-full"
            >
              <thead>
                <tr className="">
                  <th>ID</th>
                  <th>은행</th>
                  <th>예금주</th>
                  <th>금액</th>
                  <th>계좌번호</th>
                  <th>이체 상태</th>
                  <th>생성일</th>
                  <th>이체 완료일 </th>
                  <th>상세정보</th>
                </tr>
              </thead>
              <tbody className="">
                {/* {reportsListData?.data.page_content.map((page: ReportField) => ( */}
                {paymentsData?.data.page_content.length >= 1 &&
                  paymentsData?.data.page_content.map(
                    (payment: TransferField) => {
                      return (
                        <tr
                          key={payment.id}
                          className="border-b border-gray-200 text-center text-[14px] hover:bg-gray-100 "
                        >
                          {" "}
                          <td>{payment.id}</td>
                          <td>{payment.account_bank}</td>
                          <td>{payment.account_holder}</td>
                          <td>
                            {payment.amount.toLocaleString("ko-KR", {
                              style: "currency",
                              currency: "KRW",
                            })}
                          </td>
                          <td>{payment.account_number}1</td>
                          <td>
                            {payment?.transfer_status === "waiting" && "대기중"}
                            {payment?.transfer_status === "completed" && "완료"}
                            {payment?.transfer_status === "declined" && (
                              <span className="text-red-500">거부됨</span>
                            )}
                          </td>
                          <td>{payment.created_at.slice(0, 10)}</td>
                          <td>
                            {payment.transferred_at === null
                              ? "이체 내역 없음"
                              : `${
                                  payment.transferred_at.slice(0, 10) +
                                  " " +
                                  payment.transferred_at.slice(11, 16)
                                }`}
                          </td>
                          <td>
                            <PostAddIcon
                              onClick={() => {
                                setOpenDrawer(true);
                                setPaymentId(payment.id);
                              }}
                              className="cursor-pointer"
                            />
                          </td>
                        </tr>
                      );
                    }
                  )}

                {/* ))} */}
              </tbody>
            </table>
            <PaginationBtns
              spacing={2}
              count={endIndex}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </>
        </div>{" "}
      </div>
    </section>
  );
};

export default Settlements;
