import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import { useState } from "react";

import PaginationBtns from "../components/common/PaginationBtns";
import { useGamePaymentsListHook } from "../hook/useReceiptListHook";
// import { Link } from "react-router-dom";
// import DateBox from "../components/common/DateBox";

const GamePayments = () => {
  // const [setDisplayFilter] = useState(false);

  const date = new Date();
  const thisMonth = date.getMonth() + 1;
  const thisYear = date.getFullYear();

  const [year, setYear] = useState(thisYear);
  const [month, setMonth] = useState(thisMonth);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { data } = useGamePaymentsListHook(currentPage, year, month);

  const monthlyPayment = data?.data?.monthly_payment;
  const paymentList = data?.data?.page_content;

  const handleSetDate = () => {
    setYear(year);
    setMonth(month);
  };

  // const handleDisplayFilter = () => setDisplayFilter(true);

  return (
    <section className="min-h-screen bg-[#e6e5e5] pt-[6rem] py-[4rem] overflow-hidden">
      {/* {displayFilter && (
        <DateBox setOpen={handleDisplayFilter} open={true} userId={1} />
      )} */}
      <div className="w-full  mx-auto px-[10rem] space-y-8  ">
        <div className=" bg-[#fdfdfd] h-[4rem] flex items-center justify-between py-2 px-8 rounded-xl">
          <h1 className="text-xl font-bold "> 결제완료 목록</h1>
          <div className="flex items-center gap-[5px] text-md font-semibold">
            <button type="button" onClick={handleSetDate}>
              {" "}
              <EditCalendarIcon fontSize="medium" />
            </button>
            <div> {year}년</div>
            <div>{month}월</div>
          </div>
        </div>
        <div className=" bg-[#fdfdfd]  mx-auto px-2 rounded-2xl p-4">
          <table style={{ tableLayout: "fixed" }} cellPadding="10" className="">
            <thead className="border-b border-gray-400 ">
              <tr className="">
                <th>년도</th>
                <th>월</th>
                <th>총 금액</th>
                <th>비과세 금액</th>
                <th>취소된 총 금액</th>
                <th>취소된 비과세 금액</th>
                <th>결제 건수</th>
              </tr>
            </thead>
            <tbody>
              <tr className="  text-center text-[15px] ">
                <td>{monthlyPayment?.year}년</td>
                <td>{monthlyPayment?.month}월</td>
                <td>
                  {monthlyPayment?.total_amount.toLocaleString("ko-KR", {
                    style: "currency",
                    currency: "KRW",
                  })}
                </td>
                <td>
                  {monthlyPayment?.tax_free_amount.toLocaleString("ko-KR", {
                    style: "currency",
                    currency: "KRW",
                  })}
                </td>
                <td>
                  {monthlyPayment?.canceled_total_amount.toLocaleString(
                    "ko-KR",
                    {
                      style: "currency",
                      currency: "KRW",
                    }
                  )}
                </td>
                <td>
                  {monthlyPayment?.canceled_tax_free_amount.toLocaleString(
                    "ko-KR",
                    {
                      style: "currency",
                      currency: "KRW",
                    }
                  )}
                </td>
                <td>{monthlyPayment?.num_of_payments}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className=" bg-[#fdfdfd] h-[45rem] w-full flex items-center justify-between py-4 px-4 rounded-xl overflow-x-scroll">
          {paymentList?.length >= 1 ? (
            <>
              <table
                style={{ tableLayout: "fixed" }}
                cellPadding="24"
                className="h-full"
              >
                <thead className="">
                  <tr className="">
                    <th>ID</th>
                    <th>상태</th>
                    <th>item_type</th>
                    <th>item_name</th>
                    <th>payment_method</th>
                    <th>total_amount</th>
                    <th>tax_free_amount</th>
                    <th>canceled_total_amount</th>
                    <th>canceled_tax_free_amount</th>
                    <th>cancelation_reason</th>
                    <th>approved_at</th>
                    <th>canceled_at </th>
                  </tr>
                </thead>
                <tbody>
                  {paymentList?.map((payment: any) => (
                    <tr
                      key={payment?.id}
                      className=" border-b border-gray-200 text-center text-[14px] hover:bg-gray-100"
                    >
                      <td>{payment?.id}</td>
                      <td>{payment?.status}</td>
                      <td>{payment?.item_type}</td>
                      <td>{payment?.item_name}</td>
                      <td>{payment?.payment_method}</td>
                      <td>
                        {payment?.total_amount.toLocaleString("ko-KR", {
                          style: "currency",
                          currency: "KRW",
                        })}
                      </td>
                      <td>
                        {payment?.tax_free_amount.toLocaleString("ko-KR", {
                          style: "currency",
                          currency: "KRW",
                        })}
                      </td>
                      <td>{payment?.canceled_total_amount}</td>
                      <td>{payment?.canceled_tax_free_amount}</td>
                      <td>{payment?.cancelation_reason}</td>
                      <td>{payment?.approved_at}</td>
                      <td>{payment?.canceled_at}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          ) : null}
        </div>
        <PaginationBtns
          spacing={2}
          count={data?.data.end_index}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </section>
  );
};

export default GamePayments;
