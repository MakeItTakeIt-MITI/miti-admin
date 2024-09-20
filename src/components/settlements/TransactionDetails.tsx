import { Chip } from "@mui/material";

const TransactionDetails = () => {
  return (
    <div className=" p-4  border border-gray-200 rounded-xl space-y-2">
      <div className="flex items-center justify-between w-full ">
        <h2 className="text-sm  text-gray-400">정산금 아이디</h2>
        <h3 className="text-sm">1</h3>
      </div>
      <div className="flex items-center justify-between w-full ">
        <h2 className="text-sm  text-gray-400">은행</h2>
        <h3 className="text-sm">KOOMIN</h3>
      </div>
      <div className="flex items-center justify-between w-full ">
        <h2 className="text-sm  text-gray-400">계좌번호</h2>
        <h3 className="text-sm">100205135242</h3>
      </div>
      <div className="flex items-center justify-between w-full ">
        <h2 className="text-sm  text-gray-400">예금주</h2>
        <h3 className="text-sm">미티미티</h3>
      </div>
      <div className="flex items-center justify-between w-full ">
        <h2 className="text-sm  text-gray-400">금액</h2>
        <h3 className="text-sm">₩20,000</h3>
      </div>
      <div className="flex items-center justify-between w-full ">
        <h2 className="text-sm  text-gray-400">생성일</h2>
        <h3 className="text-sm">2024-12-14</h3>
      </div>
      <div className="flex items-center justify-between w-full ">
        <h2 className="text-sm  text-gray-400">이체 완료일</h2>
        <h3 className="text-sm"> 내역 없음</h3>
      </div>
      <div className="flex items-center justify-between w-full ">
        <h2 className="text-sm  text-gray-400">이체 상태</h2>
        {/* <h3 className="text-sm">이체 내역 없음</h3> */}
        <Chip label="waiting" color="primary" />
      </div>
      <div className="flex items-center justify-between w-full ">
        <h2 className="text-sm  text-gray-400">이체 상태</h2>
        {/* <h3 className="text-sm">이체 내역 없음</h3> */}
        <Chip label="completed" color="success" />
      </div>
      <div className="flex items-center justify-between w-full ">
        <h2 className="text-sm  text-gray-400">이체 상태</h2>
        {/* <h3 className="text-sm">이체 내역 없음</h3> */}
        <Chip label="declined" color="error" />
      </div>
    </div>
  );
};

export default TransactionDetails;
