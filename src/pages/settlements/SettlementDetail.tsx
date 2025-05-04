import { useParams } from "react-router-dom";
import { usePaymentsDetailHook } from "../../features/settlements/hooks/usePaymentsDetailHook";
import { useState } from "react";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import useEditPaymentStatusHook from "../../features/settlements/hooks/useEditPaymentStatusHook";

export const SettlementDetail = () => {
  const [displayStatus, setDisplayStatus] = useState(false);

  const { requestId } = useParams();
  const settlementIdNum = Number(requestId);
  const { data: settlementData } = usePaymentsDetailHook(settlementIdNum);

  const { mutate } = useEditPaymentStatusHook(settlementIdNum);

  const [statusValue, setStatusValue] = useState(
    settlementData?.data.transfer_status
  );

  const handleSubmitPaymentStatus = () => {
    const data = { transfer_status: statusValue };
    mutate(data, {
      onSuccess: () => {
        alert("Payment status updated successfully!");
      },
      onError: (error) => {
        console.error("Failed to update payment status:", error);
        alert("Failed to update payment status.");
      },
    });
  };

  const tableHeaders = [
    "ID", // id
    "계정", // account
    "이체 상태", // transfer_status
    "금액", // amount
    "은행", // account_bank
    "예금주", // account_holder
    "계좌번호", // account_number
    "생성일", // created_at
  ];
  const status = [
    { key: "completed", label: "이체 완료" },
    { key: "waiting", label: "대기중" },
    { key: "declined", label: "이체거절" },
  ];

  const handleToggleStatusList = () => setDisplayStatus(!displayStatus);
  return (
    <>
      <div className="relative gap-4 text-sm h-[100px] bg-white flex items-center justify-end px-4">
        <button
          type="button"
          onClick={handleToggleStatusList}
          className={` bg-blue-600 relative w-[300px] h-[40px]  text-white rounded-lg`}
        >
          <span>
            {" "}
            {statusValue === "completed" && "이체 완료"}{" "}
            {statusValue === "waiting" && "대기중"}{" "}
            {statusValue === "declined" && "이체거절"}
            <KeyboardArrowDownIcon />
          </span>

          {displayStatus && (
            <ul className="absolute space-y-4 py-4 left-0 right-0 top-[40px] w-full  bg-gray-100 text-black">
              {status.map((item) => (
                <li
                  key={item.key}
                  onClick={() => setStatusValue(item.key)}
                  className="hover:bg-blue-100 h-12 flex items-center justify-center cursor-pointer"
                >
                  {item.label}
                </li>
              ))}
            </ul>
          )}
        </button>
        <button
          type="button"
          onClick={handleSubmitPaymentStatus}
          className="w-[100px] h-[40px] bg-blue-600 text-white rounded-lg"
        >
          저장
        </button>
      </div>
      {/* <PageHeader title={`정산 상세 (${settlementIdNum})`} /> */}

      <table className=" table-fixed w-full border-collapse ">
        <thead>
          <tr className="bg-white h-[72px] ">
            {tableHeaders.map((header, i) => (
              <th key={i} className="text-center px-2">
                {header}
              </th>
            ))}{" "}
          </tr>
        </thead>
        <tbody>
          <tr className=" h-[72px] hover:bg-gray-100 text-sm bg-white">
            {Object.keys(settlementData?.data || {}).map((key) => (
              <td key={key} className="text-center px-2">
                {settlementData?.data[key]}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </>
  );
};
