import { Chip } from "@mui/material";
import { TransferField } from "../../interface/payment";

interface TransactionDetails {
  paymentDetailsData: TransferField;
}

const TransactionDetails = ({ paymentDetailsData }: TransactionDetails) => {
  return (
    <div className=" p-4  border border-gray-200 rounded-xl space-y-2">
      <div className="flex items-center justify-between w-full ">
        <h2 className="text-sm  text-gray-400">정산금 아이디</h2>
        <h3 className="text-sm">{paymentDetailsData?.id}</h3>
      </div>
      <div className="flex items-center justify-between w-full ">
        <h2 className="text-sm  text-gray-400">은행</h2>
        <h3 className="text-sm">{paymentDetailsData?.account_bank}</h3>
      </div>
      <div className="flex items-center justify-between w-full ">
        <h2 className="text-sm  text-gray-400">계좌번호</h2>
        <h3 className="text-sm">{paymentDetailsData?.account_number}</h3>
      </div>
      <div className="flex items-center justify-between w-full ">
        <h2 className="text-sm  text-gray-400">예금주</h2>
        <h3 className="text-sm">{paymentDetailsData?.account_holder}</h3>
      </div>
      <div className="flex items-center justify-between w-full ">
        <h2 className="text-sm  text-gray-400">금액</h2>
        <h3 className="text-sm">{paymentDetailsData?.amount}</h3>
      </div>
      <div className="flex items-center justify-between w-full ">
        <h2 className="text-sm  text-gray-400">생성일</h2>
        <h3 className="text-sm">
          {paymentDetailsData?.created_at.slice(0, 10)}{" "}
          {paymentDetailsData?.created_at.slice(11, 16)}
        </h3>
      </div>
      <div className="flex items-center justify-between w-full ">
        <h2 className="text-sm  text-gray-400">이체 완료일</h2>
        <h3 className="text-sm">
          {paymentDetailsData?.transferred_at === null
            ? "이체 미완료"
            : paymentDetailsData?.transferred_at.slice(0, 10)}
        </h3>
      </div>
      <div className="flex items-center justify-between w-full ">
        <h2 className="text-sm  text-gray-400">이체 상태</h2>
        {/* <h3 className="text-sm">이체 내역 없음</h3> */}
        {paymentDetailsData?.transfer_status === "waiting" && (
          <Chip label="대기중" color="warning" />
        )}
        {paymentDetailsData?.transfer_status === "completed" && (
          <Chip label="완료" color="primary" />
        )}
        {paymentDetailsData?.transfer_status === "declined" && (
          <Chip label="거부됨" color="error" />
        )}
      </div>
    </div>
  );
};

export default TransactionDetails;
