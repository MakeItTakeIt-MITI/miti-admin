import { useTransferStatusesPage } from "../../features/transactions/hooks/useTransactionsPage.ts";
import { useTransactionDetailsContainer } from "../../features/transactions/hooks/useTransactionDetailsContainer.ts";
import NextPageLoader from "../../features/common/NextPageLoader.tsx";

export default function TransferStatus() {
  const { hasNextPage, fetchNextPage, rows } = useTransferStatusesPage();

  const {
    openId,
    setOpenId,
    handleClose,
    detailData,
    formatPhone,
    badgeCls,
    statusValue,
    setStatusValue,
    // editTransferStatus,
    handleUpdateStatus,
  } = useTransactionDetailsContainer();

  return (
    <section className="w-full p-8 flex flex-col gap-4 bg-black relative">
      <div className="space-y-4">
        <h1 className="text-white font-bold text-2xl">정산금 요청 목록</h1>
      </div>

      <div className="w-full overflow-x-auto rounded-lg border border-gray-700">
        <table className="min-w-[1000px] w-full text-xs">
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
            {rows.map((r: any) => {
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
                      onClick={() => setOpenId(r.id)}
                      className="text-blue-400 hover:underline text-xs"
                    >
                      보기
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div
        className={`fixed inset-0 z-50 transition-opacity duration-300 ${
          openId !== null
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={handleClose}
      >
        <div className="absolute inset-0 bg-black/55 backdrop-blur-sm" />
      </div>

      <div
        className={`fixed top-0 right-0 h-full max-h-screen w-[460px] md:w-[520px] bg-black  border-r border-gray-800 shadow-2xl z-50 flex flex-col transition-transform duration-300 ease-out ${
          openId !== null ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between px-6 py-5 border-b border-gray-800">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold leading-tight text-white">
              정산 상세 ID({detailData?.id ?? "-"})
            </h2>
            {detailData && (
              <span
                className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${badgeCls(
                  detailData.transfer_status
                )}`}
              >
                {detailData.transfer_status}
              </span>
            )}
          </div>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-white transition"
            type="button"
            aria-label="Close panel"
          >
            <span>x</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-8 text-xs scrollbar-thin scrollbar-track-gray-900 scrollbar-thumb-gray-700">
          {!detailData && (
            <div className="text-gray-400 text-center py-24">
              항목을 선택하세요.
            </div>
          )}

          {detailData && (
            <>
              {/* 기본 정보 */}
              <section className="space-y-3">
                <h3 className="text-xs font-semibold text-gray-200">
                  기본 정보
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-gray-400">금액</span>
                    <span className="text-gray-200 font-medium">
                      {detailData.amount
                        ? `${detailData.amount.toLocaleString()}원`
                        : "-"}
                    </span>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-gray-400">생성일</span>
                    <span className="text-gray-300">
                      {detailData.created_at
                        ? new Date(detailData.created_at).toLocaleString()
                        : "-"}
                    </span>
                  </div>
                </div>
              </section>

              {/* 계좌 정보 */}
              <section className="space-y-3">
                <h3 className="text-xs font-semibold text-gray-200">
                  계좌 정보
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-gray-400">은행</span>
                    <span className="text-gray-300">
                      {detailData.account_bank || "-"}
                    </span>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-gray-400">예금주</span>
                    <span className="text-gray-300">
                      {detailData.account_holder || "-"}
                    </span>
                  </div>
                  <div className="col-span-2 flex flex-col gap-0.5">
                    <span className="text-gray-400">계좌번호</span>
                    <span className="text-gray-300">
                      {detailData.account_number || "-"}
                    </span>
                  </div>
                </div>
              </section>

              {/* 계정 상세 */}

              <section className="space-y-3">
                <h3 className="text-xs font-semibold text-gray-200">
                  계정 상세
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-gray-400">계정 ID</span>
                    <span className="text-gray-300">
                      {detailData.account.id}
                    </span>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-gray-400">타입</span>
                    <span className="text-gray-300">
                      {detailData.account.account_type}
                    </span>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-gray-400">잔액</span>
                    <span className="text-gray-200 font-medium">
                      {detailData.account.balance
                        ? `${detailData.account.balance.toLocaleString()}원`
                        : "-"}
                    </span>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-gray-400">포인트</span>
                    <span className="text-gray-300">
                      {detailData.account.point}
                    </span>
                  </div>
                  <div className="col-span-2 flex flex-col gap-0.5">
                    <span className="text-gray-400">상태</span>
                    <span className="text-gray-300">
                      {detailData.account.status}
                    </span>
                  </div>
                </div>
              </section>

              {/* 사용자 정보 */}
              {detailData.account?.user && (
                <section className="space-y-3">
                  <h3 className="text-xs font-semibold text-gray-200">
                    사용자 정보
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-gray-400">ID</span>
                      <span className="text-gray-300">
                        {detailData.account.user.id}
                      </span>
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-gray-400">닉네임</span>
                      <span className="text-gray-300">
                        {detailData.account.user.nickname}
                      </span>
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-gray-400">이름</span>
                      <span className="text-gray-300">
                        {detailData.account.user.name}
                      </span>
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-gray-400">이메일</span>
                      <span className="text-gray-300">
                        {detailData.account.user.email}
                      </span>
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-gray-400">연락처</span>
                      <span className="text-gray-300">
                        {formatPhone(detailData.account.user.phone)}
                      </span>
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-gray-400">생년월일</span>
                      <span className="text-gray-300">
                        {detailData.account.user.birthday}
                      </span>
                    </div>
                    <div className="col-span-2 flex flex-col gap-0.5">
                      <span className="text-gray-400">가입수단</span>
                      <span className="text-gray-300">
                        {detailData.account.user.signup_method}
                      </span>
                    </div>
                  </div>
                </section>
              )}
              <section className="space-y-2">
                <h3 className="text-xs font-semibold text-gray-200">
                  이체 상태 변경
                </h3>
                <select
                  // value={statusValue}
                  onChange={(e) => setStatusValue(e.target.value)}
                  className="w-full h-9 rounded-md bg-gray-700 border border-gray-600 text-xs text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="waiting">waiting</option>
                  <option value="completed">completed</option>
                  <option value="declined">declined</option>
                </select>
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2 text-[11px] text-gray-400">
                    현재 상태:
                    <span
                      className={`inline-flex rounded-full px-2 py-0.5 font-medium ${badgeCls(
                        detailData?.transfer_status
                      )}`}
                    >
                      {detailData?.transfer_status}
                    </span>
                  </div>
                  <button
                    type="button"
                    // handleUpdateStatus from hook
                    onClick={() =>
                      handleUpdateStatus(
                        statusValue as "completed" | "pending" | "declined"
                      )
                    }
                    className="h-8 px-3 text-[11px] font-medium bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    상태 저장
                  </button>
                </div>
              </section>
            </>
          )}
        </div>

        {/* Footer actions*/}
        <div className="px-6 py-4 border-t border-gray-800 text-right">
          <button
            type="button"
            onClick={handleClose}
            className="rounded-md bg-gray-700 hover:bg-gray-600 text-xs px-4 py-2 text-gray-200 transition"
          >
            닫기
          </button>
        </div>
      </div>
      <NextPageLoader hasNextPage={hasNextPage} fetchNextPage={fetchNextPage} />
    </section>
  );
}
