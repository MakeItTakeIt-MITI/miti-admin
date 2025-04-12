// import EditCalendarIcon from "@mui/icons-material/EditCalendar";
// import { useState } from "react";

// import PaginationBtns from "../components/common/PaginationBtns";
// import { useGamePaymentsListHook } from "../hook/useReceiptListHook";
import { PageHeader } from "../features/common/PageHeader";
// import { PageLayout } from "../features/common/PageLayout";
// import { TableLayout } from "../components/common/TableLayout";
// import PaginationBtns from "../components/common/PaginationBtns";
// import { Link } from "react-router-dom";
// import DateBox from "../components/common/DateBox";

const GamePayments = () => {
  // const [setDisplayFilter] = useState(false);

  // const date = new Date();
  // const thisMonth = date.getMonth() + 1;
  // const thisYear = date.getFullYear();

  // const [year, setYear] = useState(thisYear);
  // const [month, setMonth] = useState(thisMonth);
  // const [currentPage, setCurrentPage] = useState<number>(1);

  // const [displayList, setDisplayList] = useState(false);

  // const { data } = useGamePaymentsListHook(currentPage, year, month);

  // const monthlyPayment = data?.data?.monthly_payment;
  // const paymentList = data?.data?.page_content;
  // const endIndex = data?.data.end_index;

  // // const handleSetDate = () => {
  // //   setYear(year);
  // //   setMonth(month);
  // // };

  // const handleDisplayList = () => setDisplayList(!displayList);
  // // const handleDisplayFilter = () => setDisplayFilter(true);

  // const currentYear = new Date().getFullYear();
  // const currentMonth = new Date().getMonth() + 1;

  // const months = [
  //   "1월",
  //   "2월",
  //   "3월",
  //   "4월",
  //   "5월",
  //   "6월",
  //   "7월",
  //   "8월",
  //   "9월",
  //   "10월",
  //   "11월",
  //   "12월",
  // ];

  // const headers = [""];
  return (
    <>
      <PageHeader title="결제완료 목록" />

      {/* <PageLayout>
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
      </PageLayout> */}
      {/* 
      <PageLayout>
        <div className="flex justify-end w-full relative">
          <div
            onMouseLeave={() => {
              setTimeout(() => {
                setDisplayList(false);
              }, 100);
            }}
            onClick={handleDisplayList}
            className="bg-gray-400 text-white w-60 rounded-md h-10 flex items-center justify-center cursor-pointer"
          >
            {" "}
            <span>
              {currentYear}년 {currentMonth}월
            </span>
            {displayList && (
              <ul
                style={{
                  scrollbarWidth: "thin",
                }}
                className="absolute w-60 bg-white text-gray-800 space-y-2  top-10 px-2 py-4  right-0 h-[20rem] overflow-y-auto"
              >
                {months.map((date) => (
                  <li className="hover:bg-gray-200 h-8 flex items-center justify-center">
                    2025년 {date}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </PageLayout> */}
    </>
    // <section className="min-h-screen bg-[#e6e5e5] pt-[6rem] py-[4rem] overflow-hidden">
    //   {/* {displayFilter && (
    //     <DateBox setOpen={handleDisplayFilter} open={true} userId={1} />
    //   )} */}
    //   <div className="w-full  mx-auto px-[10rem] space-y-8  ">
    //     <div className=" bg-[#fdfdfd] h-[4rem] flex items-center justify-between py-2 px-8 rounded-xl">
    //       <h1 className="text-xl font-bold "> 결제완료 목록</h1>
    //       <div className="flex items-center gap-[5px] text-md font-semibold">
    //         <button type="button" onClick={handleSetDate}>
    //           {" "}
    //           <EditCalendarIcon fontSize="medium" />
    //         </button>
    //         <div> {year}년</div>
    //         <div>{month}월</div>
    //       </div>
    //     </div>
    //     <div className=" bg-[#fdfdfd]  mx-auto px-2 rounded-2xl p-4">
    //       <table style={{ tableLayout: "fixed" }} cellPadding="10" className="">
    //         <thead className="border-b border-gray-400 ">
    //           <tr className="">
    //             <th>년도</th>
    //             <th>월</th>
    //             <th>총 금액</th>
    //             <th>비과세 금액</th>
    //             <th>취소된 총 금액</th>
    //             <th>취소된 비과세 금액</th>
    //             <th>결제 건수</th>
    //           </tr>
    //         </thead>
    //         <tbody>
    //           <tr className="  text-center text-[15px] ">
    //             <td>{monthlyPayment?.year}년</td>
    //             <td>{monthlyPayment?.month}월</td>
    //             <td>
    //               {monthlyPayment?.total_amount.toLocaleString("ko-KR", {
    //                 style: "currency",
    //                 currency: "KRW",
    //               })}
    //             </td>
    //             <td>
    //               {monthlyPayment?.tax_free_amount.toLocaleString("ko-KR", {
    //                 style: "currency",
    //                 currency: "KRW",
    //               })}
    //             </td>
    //             <td>
    //               {monthlyPayment?.canceled_total_amount.toLocaleString(
    //                 "ko-KR",
    //                 {
    //                   style: "currency",
    //                   currency: "KRW",
    //                 }
    //               )}
    //             </td>
    //             <td>
    //               {monthlyPayment?.canceled_tax_free_amount.toLocaleString(
    //                 "ko-KR",
    //                 {
    //                   style: "currency",
    //                   currency: "KRW",
    //                 }
    //               )}
    //             </td>
    //             <td>{monthlyPayment?.num_of_payments}</td>
    //           </tr>
    //         </tbody>
    //       </table>
    //     </div>

    //     <div className=" bg-[#fdfdfd] h-[45rem] w-full flex items-center justify-between py-4 px-4 rounded-xl overflow-x-scroll">
    //       {paymentList?.length >= 1 ? (
    //         <>
    //           <table
    //             style={{ tableLayout: "fixed" }}
    //             cellPadding="24"
    //             className="h-full"
    //           >
    //             <thead className="">
    //               <tr className="">
    //                 <th>ID</th>
    //                 <th>상태</th>
    //                 <th>item_type</th>
    //                 <th>item_name</th>
    //                 <th>payment_method</th>
    //                 <th>total_amount</th>
    //                 <th>tax_free_amount</th>
    //                 <th>canceled_total_amount</th>
    //                 <th>canceled_tax_free_amount</th>
    //                 <th>cancelation_reason</th>
    //                 <th>approved_at</th>
    //                 <th>canceled_at </th>
    //               </tr>
    //             </thead>
    //             <tbody>
    //               {paymentList?.map((payment: any) => (
    //                 <tr
    //                   key={payment?.id}
    //                   className=" border-b border-gray-200 text-center text-[14px] hover:bg-gray-100"
    //                 >
    //                   <td>{payment?.id}</td>
    //                   <td>{payment?.status}</td>
    //                   <td>{payment?.item_type}</td>
    //                   <td>{payment?.item_name}</td>
    //                   <td>{payment?.payment_method}</td>
    //                   <td>
    //                     {payment?.total_amount.toLocaleString("ko-KR", {
    //                       style: "currency",
    //                       currency: "KRW",
    //                     })}
    //                   </td>
    //                   <td>
    //                     {payment?.tax_free_amount.toLocaleString("ko-KR", {
    //                       style: "currency",
    //                       currency: "KRW",
    //                     })}
    //                   </td>
    //                   <td>{payment?.canceled_total_amount}</td>
    //                   <td>{payment?.canceled_tax_free_amount}</td>
    //                   <td>{payment?.cancelation_reason}</td>
    //                   <td>{payment?.approved_at}</td>
    //                   <td>{payment?.canceled_at}</td>
    //                 </tr>
    //               ))}
    //             </tbody>
    //           </table>
    //         </>
    //       ) : null}
    //     </div>
    //     <PaginationBtns
    //       spacing={2}
    //       count={data?.data.end_index}
    //       currentPage={currentPage}
    //       setCurrentPage={setCurrentPage}
    //     />
    //   </div>
    // </section>
  );
};

export default GamePayments;
