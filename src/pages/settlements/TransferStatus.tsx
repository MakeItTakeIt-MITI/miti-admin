import { useSearchParams } from "react-router-dom";
import { useTransferStatusesPage } from "../../features/transactions/hooks/useTransactionsPage";
import { useTransactionDetailsContainer } from "../../features/transactions/hooks/useTransactionDetailsContainer";
import { useTeamTransferStatusesPage } from "../../features/transactions/hooks/useTeamTransactionsPage";
import { useTeamTransactionDetailsContainer } from "../../features/transactions/hooks/useTeamTransactionDetailsContainer";
import NextPageLoader from "../../features/common/NextPageLoader.tsx";
import { TABLE_STYLES } from "../../components/common/tableStyles";
import { cn } from "../../lib/utils";

type Tab = "personal" | "team";

export default function TransferStatus() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = (searchParams.get("tab") as Tab) ?? "personal";

  const setTab = (tab: Tab) => setSearchParams({ tab });

  return (
    <section className="w-full p-8 flex flex-col gap-4 bg-black relative">
      <div className="space-y-4">
        <h1 className="text-white font-bold text-2xl text-balance">정산금 요청 목록</h1>
      </div>

      <div className="flex gap-1 border-b border-gray-700">
        {(["personal", "team"] as const).map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setTab(tab)}
            className={cn(
              "px-4 py-2 text-sm font-medium transition-colors",
              activeTab === tab
                ? "border-b-2 border-blue-500 text-white"
                : "text-gray-400 hover:text-gray-200",
            )}
          >
            {tab === "personal" ? "개인" : "팀"}
          </button>
        ))}
      </div>

      {activeTab === "personal" ? <PersonalTab /> : <TeamTab />}
    </section>
  );
}

function PersonalTab() {
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
    handleUpdateStatus,
  } = useTransactionDetailsContainer();

  return (
    <>
      <div className={TABLE_STYLES.container}>
        <table className={`min-w-[1000px] ${TABLE_STYLES.table}`}>
          <thead className={TABLE_STYLES.head}>
            <tr className={TABLE_STYLES.headerRow}>
              <th className={TABLE_STYLES.headerCell}>ID</th>
              <th className={TABLE_STYLES.headerCell}>계정</th>
              <th className={TABLE_STYLES.headerCell}>이체 상태</th>
              <th className={TABLE_STYLES.headerCell}>금액</th>
              <th className={TABLE_STYLES.headerCell}>은행</th>
              <th className={TABLE_STYLES.headerCell}>예금주</th>
              <th className={TABLE_STYLES.headerCell}>계좌번호</th>
              <th className={TABLE_STYLES.headerCell}>생성일</th>
              <th className={TABLE_STYLES.headerCell}>상세</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && (
              <tr>
                <td colSpan={9} className={TABLE_STYLES.emptyCell}>
                  결과가 없습니다.
                </td>
              </tr>
            )}
            {rows.map((r) => {
              const statusCls = badgeCls(r.transfer_status);
              return (
                <tr key={r.id} className={TABLE_STYLES.bodyRow}>
                  <td className={TABLE_STYLES.primaryCell}>{r.id}</td>
                  <td className={TABLE_STYLES.bodyCell}>{r.account}</td>
                  <td className={TABLE_STYLES.bodyCell}>
                    <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium tabular-nums ${statusCls}`}>
                      {r.transfer_status}
                    </span>
                  </td>
                  <td className={`${TABLE_STYLES.bodyCell} tabular-nums`}>
                    {r.amount ? `${r.amount.toLocaleString()}원` : "-"}
                  </td>
                  <td className={TABLE_STYLES.bodyCell}>{r.account_bank || "-"}</td>
                  <td className={TABLE_STYLES.bodyCell}>{r.account_holder || "-"}</td>
                  <td className={TABLE_STYLES.bodyCell}>{r.account_number || "-"}</td>
                  <td className={`${TABLE_STYLES.bodyCell} tabular-nums`}>
                    {r.created_at ? new Date(r.created_at).toLocaleString() : "-"}
                  </td>
                  <td className={TABLE_STYLES.bodyCell}>
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

      <DetailPanelOverlay openId={openId} handleClose={handleClose} />

      <div
        className={cn(
          "fixed top-0 right-0 h-dvh w-[460px] md:w-[520px] bg-black border-l border-gray-800 shadow-2xl z-50 flex flex-col transition-transform duration-300 ease-out",
          openId !== null ? "translate-x-0" : "translate-x-full",
        )}
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between px-6 py-5 border-b border-gray-800">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold leading-tight text-white text-balance">
              정산 상세 ID({detailData?.id ?? "-"})
            </h2>
            {detailData && (
              <span className={cn("inline-flex rounded-full px-3 py-1 text-xs font-medium", badgeCls(detailData.transfer_status))}>
                {detailData.transfer_status}
              </span>
            )}
          </div>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-white transition"
            type="button"
            aria-label="패널 닫기"
          >
            <span>✕</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-8 text-xs">
          {!detailData && (
            <div className="text-gray-400 text-center py-24">항목을 선택하세요.</div>
          )}

          {detailData && (
            <>
              <section className="space-y-3">
                <h3 className="text-xs font-semibold text-gray-200">기본 정보</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-gray-400">금액</span>
                    <span className="text-gray-200 font-medium tabular-nums">
                      {detailData.amount ? `${detailData.amount.toLocaleString()}원` : "-"}
                    </span>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-gray-400">생성일</span>
                    <span className="text-gray-300 tabular-nums">
                      {detailData.created_at ? new Date(detailData.created_at).toLocaleString() : "-"}
                    </span>
                  </div>
                </div>
              </section>

              <section className="space-y-3">
                <h3 className="text-xs font-semibold text-gray-200">계좌 정보</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-gray-400">은행</span>
                    <span className="text-gray-300">{detailData.account_bank || "-"}</span>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-gray-400">예금주</span>
                    <span className="text-gray-300">{detailData.account_holder || "-"}</span>
                  </div>
                  <div className="col-span-2 flex flex-col gap-0.5">
                    <span className="text-gray-400">계좌번호</span>
                    <span className="text-gray-300 tabular-nums">{detailData.account_number || "-"}</span>
                  </div>
                </div>
              </section>

              <section className="space-y-3">
                <h3 className="text-xs font-semibold text-gray-200">계정 상세</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-gray-400">계정 ID</span>
                    <span className="text-gray-300 tabular-nums">{detailData.account.id}</span>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-gray-400">타입</span>
                    <span className="text-gray-300">{detailData.account.account_type}</span>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-gray-400">잔액</span>
                    <span className="text-gray-200 font-medium tabular-nums">
                      {detailData.account.balance != null
                        ? `${detailData.account.balance.toLocaleString()}원`
                        : "-"}
                    </span>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-gray-400">포인트</span>
                    <span className="text-gray-300 tabular-nums">{detailData.account.point}</span>
                  </div>
                  <div className="col-span-2 flex flex-col gap-0.5">
                    <span className="text-gray-400">상태</span>
                    <span className="text-gray-300">{detailData.account.status}</span>
                  </div>
                </div>
              </section>

              {detailData.account?.user && (
                <section className="space-y-3">
                  <h3 className="text-xs font-semibold text-gray-200">사용자 정보</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-gray-400">ID</span>
                      <span className="text-gray-300 tabular-nums">{detailData.account.user.id}</span>
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-gray-400">닉네임</span>
                      <span className="text-gray-300">{detailData.account.user.nickname}</span>
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-gray-400">이름</span>
                      <span className="text-gray-300">{detailData.account.user.name}</span>
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-gray-400">이메일</span>
                      <span className="text-gray-300">{detailData.account.user.email}</span>
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-gray-400">연락처</span>
                      <span className="text-gray-300 tabular-nums">
                        {formatPhone(detailData.account.user.phone)}
                      </span>
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-gray-400">생년월일</span>
                      <span className="text-gray-300 tabular-nums">{detailData.account.user.birthday}</span>
                    </div>
                    <div className="col-span-2 flex flex-col gap-0.5">
                      <span className="text-gray-400">가입수단</span>
                      <span className="text-gray-300">{detailData.account.user.signup_method}</span>
                    </div>
                  </div>
                </section>
              )}

              <section className="space-y-2">
                <h3 className="text-xs font-semibold text-gray-200">이체 상태 변경</h3>
                <select
                  value={statusValue}
                  onChange={(e) => setStatusValue(e.target.value)}
                  className="w-full h-9 rounded-md bg-gray-700 border border-gray-600 text-xs text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-600 px-2"
                >
                  <option value="waiting">waiting</option>
                  <option value="completed">completed</option>
                  <option value="declined">declined</option>
                </select>
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2 text-[11px] text-gray-400">
                    현재 상태:
                    <span className={cn("inline-flex rounded-full px-2 py-0.5 font-medium", badgeCls(detailData.transfer_status))}>
                      {detailData.transfer_status}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleUpdateStatus(statusValue as "completed" | "waiting" | "declined")}
                    className="h-8 px-3 text-[11px] font-medium rounded bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    상태 저장
                  </button>
                </div>
              </section>
            </>
          )}
        </div>

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
    </>
  );
}

function TeamTab() {
  const { hasNextPage, fetchNextPage, rows } = useTeamTransferStatusesPage();
  const {
    openId,
    setOpenId,
    handleClose,
    detailData,
    badgeCls,
    statusValue,
    setStatusValue,
    handleUpdateStatus,
  } = useTeamTransactionDetailsContainer();

  return (
    <>
      <div className={TABLE_STYLES.container}>
        <table className={`min-w-[1000px] ${TABLE_STYLES.table}`}>
          <thead className={TABLE_STYLES.head}>
            <tr className={TABLE_STYLES.headerRow}>
              <th className={TABLE_STYLES.headerCell}>ID</th>
              <th className={TABLE_STYLES.headerCell}>계정</th>
              <th className={TABLE_STYLES.headerCell}>이체 상태</th>
              <th className={TABLE_STYLES.headerCell}>금액</th>
              <th className={TABLE_STYLES.headerCell}>은행</th>
              <th className={TABLE_STYLES.headerCell}>예금주</th>
              <th className={TABLE_STYLES.headerCell}>계좌번호</th>
              <th className={TABLE_STYLES.headerCell}>생성일</th>
              <th className={TABLE_STYLES.headerCell}>상세</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && (
              <tr>
                <td colSpan={9} className={TABLE_STYLES.emptyCell}>
                  결과가 없습니다.
                </td>
              </tr>
            )}
            {rows.map((r) => {
              const statusCls = badgeCls(r.transfer_status);
              return (
                <tr key={r.id} className={TABLE_STYLES.bodyRow}>
                  <td className={TABLE_STYLES.primaryCell}>{r.id}</td>
                  <td className={TABLE_STYLES.bodyCell}>{r.account}</td>
                  <td className={TABLE_STYLES.bodyCell}>
                    <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium tabular-nums ${statusCls}`}>
                      {r.transfer_status}
                    </span>
                  </td>
                  <td className={`${TABLE_STYLES.bodyCell} tabular-nums`}>
                    {r.amount ? `${r.amount.toLocaleString()}원` : "-"}
                  </td>
                  <td className={TABLE_STYLES.bodyCell}>{r.account_bank || "-"}</td>
                  <td className={TABLE_STYLES.bodyCell}>{r.account_holder || "-"}</td>
                  <td className={TABLE_STYLES.bodyCell}>{r.account_number || "-"}</td>
                  <td className={`${TABLE_STYLES.bodyCell} tabular-nums`}>
                    {r.created_at ? new Date(r.created_at).toLocaleString() : "-"}
                  </td>
                  <td className={TABLE_STYLES.bodyCell}>
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

      <DetailPanelOverlay openId={openId} handleClose={handleClose} />

      <div
        className={cn(
          "fixed top-0 right-0 h-dvh w-[460px] md:w-[520px] bg-black border-l border-gray-800 shadow-2xl z-50 flex flex-col transition-transform duration-300 ease-out",
          openId !== null ? "translate-x-0" : "translate-x-full",
        )}
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between px-6 py-5 border-b border-gray-800">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold leading-tight text-white text-balance">
              팀 정산 상세 ID({detailData?.id ?? "-"})
            </h2>
            {detailData && (
              <span className={cn("inline-flex rounded-full px-3 py-1 text-xs font-medium", badgeCls(detailData.transfer_status))}>
                {detailData.transfer_status}
              </span>
            )}
          </div>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-white transition"
            type="button"
            aria-label="패널 닫기"
          >
            <span>✕</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-8 text-xs">
          {!detailData && (
            <div className="text-gray-400 text-center py-24">항목을 선택하세요.</div>
          )}

          {detailData && (
            <>
              <section className="space-y-3">
                <h3 className="text-xs font-semibold text-gray-200">기본 정보</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-gray-400">금액</span>
                    <span className="text-gray-200 font-medium tabular-nums">
                      {detailData.amount ? `${detailData.amount.toLocaleString()}원` : "-"}
                    </span>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-gray-400">생성일</span>
                    <span className="text-gray-300 tabular-nums">
                      {detailData.created_at ? new Date(detailData.created_at).toLocaleString() : "-"}
                    </span>
                  </div>
                </div>
              </section>

              <section className="space-y-3">
                <h3 className="text-xs font-semibold text-gray-200">계좌 정보</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-gray-400">은행</span>
                    <span className="text-gray-300">{detailData.account_bank || "-"}</span>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-gray-400">예금주</span>
                    <span className="text-gray-300">{detailData.account_holder || "-"}</span>
                  </div>
                  <div className="col-span-2 flex flex-col gap-0.5">
                    <span className="text-gray-400">계좌번호</span>
                    <span className="text-gray-300 tabular-nums">{detailData.account_number || "-"}</span>
                  </div>
                </div>
              </section>

              <section className="space-y-3">
                <h3 className="text-xs font-semibold text-gray-200">팀 계좌 상세</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-gray-400">계좌 ID</span>
                    <span className="text-gray-300 tabular-nums">{detailData.account.id}</span>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-gray-400">상태</span>
                    <span className="text-gray-300">{detailData.account.status}</span>
                  </div>
                  <div className="col-span-2 flex flex-col gap-0.5">
                    <span className="text-gray-400">잔액</span>
                    <span className="text-gray-200 font-medium tabular-nums">
                      {detailData.account.balance != null
                        ? `${detailData.account.balance.toLocaleString()}원`
                        : "-"}
                    </span>
                  </div>
                </div>
              </section>

              <section className="space-y-3">
                <h3 className="text-xs font-semibold text-gray-200">팀 정보</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-gray-400">팀 ID</span>
                    <span className="text-gray-300 tabular-nums">{detailData.account.team.id}</span>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-gray-400">팀명</span>
                    <span className="text-gray-300">{detailData.account.team.name}</span>
                  </div>
                  <div className="col-span-2 flex flex-col gap-0.5">
                    <span className="text-gray-400">상태</span>
                    <span className="text-gray-300">{detailData.account.team.status}</span>
                  </div>
                </div>
              </section>

              <section className="space-y-2">
                <h3 className="text-xs font-semibold text-gray-200">이체 상태 변경</h3>
                <select
                  value={statusValue}
                  onChange={(e) => setStatusValue(e.target.value)}
                  className="w-full h-9 rounded-md bg-gray-700 border border-gray-600 text-xs text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-600 px-2"
                >
                  <option value="waiting">waiting</option>
                  <option value="completed">completed</option>
                  <option value="declined">declined</option>
                </select>
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2 text-[11px] text-gray-400">
                    현재 상태:
                    <span className={cn("inline-flex rounded-full px-2 py-0.5 font-medium", badgeCls(detailData.transfer_status))}>
                      {detailData.transfer_status}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleUpdateStatus(statusValue as "completed" | "waiting" | "declined")}
                    className="h-8 px-3 text-[11px] font-medium rounded bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    상태 저장
                  </button>
                </div>
              </section>
            </>
          )}
        </div>

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
    </>
  );
}

function DetailPanelOverlay({
  openId,
  handleClose,
}: {
  openId: number | null;
  handleClose: () => void;
}) {
  return (
    <div
      className={cn(
        "fixed inset-0 z-40 transition-opacity duration-300",
        openId !== null ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
      )}
      onClick={handleClose}
    >
      <div className="absolute inset-0 bg-black/55 backdrop-blur-sm" />
    </div>
  );
}
