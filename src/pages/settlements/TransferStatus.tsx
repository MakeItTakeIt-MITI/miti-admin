// import { useSearchParams } from "react-router-dom";

// import { useTransferRequestDetails } from "../../features/settlements/hooks/useTransferRequestDetails.tsx";
// import useEditTransferStatus from "../../features/settlements/hooks/useEditTransferStatus.tsx";
import { useMemo, useState } from "react";
import { useGetTransferRequests } from "../../features/settlements/hooks/useGetTransferRequests.tsx";
import SearchField from "../../components/common/SearchField.tsx";

export default function TransferStatus() {
  // const [searchParams] = useSearchParams();
  // const search = searchParams.get("search");

  // const [settlementId, setSettlementId] = useState<null | number>(null);
  const [_isSheetOpen] = useState(false);

  const {
    data,
    hasNextPage,
    hasPreviousPage,
    fetchNextPage,
    fetchPreviousPage,
    // isLoading,
  } = useGetTransferRequests("completed");

  const transferRequestData = data?.pages?.flatMap((page) => page?.data?.items);

  // const { data: settlementDetailsData } =
  //   useTransferRequestDetails(settlementId);

  // const [statusValue, setStatusValue] = useState(
  //   settlementDetailsData?.data.transfer_status
  // );

  // const { mutate } = useEditTransferStatus(settlementId);

  // const handleSubmitPaymentStatus = () => {
  //   const data = { transfer_status: statusValue };
  //   mutate(data, {
  //     onSuccess: () => {
  //       alert("Payment status updated successfully!");
  //     },
  //     onError: (error) => {
  //       console.error("Failed to update payment status:", error);
  //       alert("Failed to update payment status.");
  //     },
  //   });
  // };

  // const handleSetSettlementId = (id: number | null) => {
  //   console.log("Setting settlementId:", id);
  //   setSettlementId(id);
  //   setIsSheetOpen(true);
  // };

  const rows = useMemo(() => {
    if (!transferRequestData) return [];
    if (Array.isArray(transferRequestData)) return transferRequestData;

    return transferRequestData;
  }, [transferRequestData]);

  return (
    <section className="w-full  p-8  flex flex-col gap-4 bg-black">
      <div className="space-y-4">
        <h1 className="text-white font-bold text-2xl">정상금 요청 목록</h1>
        <SearchField paramKey={"search"} />
      </div>

      <div className="flex items-center justify-center gap-3">
        <button
          type="button"
          disabled={!hasPreviousPage}
          onClick={() => hasPreviousPage && fetchPreviousPage()}
          className="px-4 py-1.5 rounded-lg bg-white text-black border border-gray-300 hover:bg-gray-100 transition disabled:opacity-40"
        >
          이전
        </button>
        <button
          type="button"
          disabled={!hasNextPage}
          onClick={() => hasNextPage && fetchNextPage()}
          className="px-4 py-1.5 rounded-lg bg-white text-black border border-gray-300 hover:bg-gray-100 transition disabled:opacity-40"
        >
          다음
        </button>
      </div>

      <div className="w-full overflow-x-auto rounded-lg border border-gray-700">
        <table className="min-w-[1000px] w-full text-sm">
          <thead className="bg-gray-800 text-gray-200">
            <tr className="text-left">
              <th className="px-4 py-3 font-medium">ID</th>
              <th className="px-4 py-3 font-medium">계정</th>
              <th className="px-4 py-3 font-medium">이체 상태</th>
              <th className="px-4 py-3 font-medium">금액</th>
              <th className="px-4 py-3 font-medium">은행</th>
              <th className="px-4 py-3 font-medium">예금주</th>
              <th className="px-4 py-3 font-medium">계좌번호</th>
              <th className="px-4 py-3 font-medium">생성일</th>
              <th className="px-4 py-3 font-medium">상세</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && (
              <tr>
                <td
                  colSpan={9}
                  className="px-4 py-10 text-center text-gray-400"
                >
                  결과가 없습니다.
                </td>
              </tr>
            )}
            {/* {rows.map((r: any) => {
              const statusCls =
                r.transfer_status === "completed"
                  ? "bg-emerald-600/20 text-emerald-300 ring-1 ring-inset ring-emerald-500/30"
                  : r.transfer_status === "waiting"
                  ? "bg-amber-600/20 text-amber-300 ring-1 ring-inset ring-amber-500/30"
                  : "bg-rose-600/20 text-rose-300 ring-1 ring-inset ring-rose-500/30";
              return (
                <tr
                  key={r.id}
                  className="border-t border-gray-700 hover:bg-gray-800 transition-colors"
                >
                  <td className="px-4 py-2 text-white">{r.id}</td>
                  <td className="px-4 py-2 text-gray-300">{r.account}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${statusCls}`}
                    >
                      {r.transfer_status}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-gray-300">
                    {r.amount ? `${r.amount.toLocaleString()}원` : "-"}
                  </td>
                  <td className="px-4 py-2 text-gray-300">
                    {r.account_bank || "-"}
                  </td>
                  <td className="px-4 py-2 text-gray-300">
                    {r.account_holder || "-"}
                  </td>
                  <td className="px-4 py-2 text-gray-300">
                    {r.account_number || "-"}
                  </td>
                  <td className="px-4 py-2 text-gray-300">
                    {r.created_at
                      ? new Date(r.created_at).toLocaleString()
                      : "-"}
                  </td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleSetSettlementId(r.id)}
                      className="text-blue-400 hover:underline text-xs"
                    >
                      보기
                    </button>
                  </td>
                </tr>
              );
            })} */}
          </tbody>
        </table>
      </div>
    </section>
  );
}
