import { useSearchParams } from "react-router-dom";
import { useTransferStatusesPage } from "../../features/transactions/hooks/useTransactionsPage";
import { useTransactionDetailsContainer } from "../../features/transactions/hooks/useTransactionDetailsContainer";
import { useTeamTransferStatusesPage } from "../../features/transactions/hooks/useTeamTransactionsPage";
import { useTeamTransactionDetailsContainer } from "../../features/transactions/hooks/useTeamTransactionDetailsContainer";
import NextPageLoader from "../../features/common/NextPageLoader.tsx";
import { cn } from "../../lib/utils";
import type { TransferStatus as TStatus } from "../../features/transactions/interface/settlements";

type Tab = "personal" | "team";

const TRANSFER_BADGE: Record<TStatus, { label: string; cls: string }> = {
  waiting: {
    label: "대기",
    cls: "bg-amber-500/10 text-amber-400 ring-1 ring-inset ring-amber-500/25",
  },
  completed: {
    label: "완료",
    cls: "bg-emerald-500/10 text-emerald-400 ring-1 ring-inset ring-emerald-500/25",
  },
  declined: {
    label: "거절",
    cls: "bg-red-500/10 text-red-400 ring-1 ring-inset ring-red-500/25",
  },
};

const COLS_PERSONAL = ["ID", "계정", "이체 상태", "금액", "은행", "예금주", "계좌번호", "생성일", ""];
const COLS_TEAM = ["ID", "계정", "이체 상태", "금액", "은행", "예금주", "계좌번호", "생성일", ""];

export default function TransferStatus() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = (searchParams.get("tab") as Tab) ?? "personal";
  const setTab = (tab: Tab) => setSearchParams({ tab });

  return (
    <div className="flex flex-col min-h-screen bg-black">
      {/* Page header */}
      <header className="sticky top-0 z-10 bg-zinc-950/95 backdrop-blur border-b border-zinc-800">
        <div className="px-8 py-4 flex items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="h-7 w-0.5 rounded-full bg-emerald-500" />
            <div>
              <h1 className="text-sm font-semibold text-white tracking-tight leading-none">
                정산금 요청 목록
              </h1>
              <p className="text-[11px] text-zinc-500 mt-1">개인 · 팀 이체 요청 관리</p>
            </div>
          </div>
        </div>

        {/* Tab bar */}
        <div className="px-8 flex items-center gap-6 border-t border-zinc-800/60" role="tablist">
          {(["personal", "team"] as const).map((tab) => {
            const active = activeTab === tab;
            return (
              <button
                key={tab}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setTab(tab)}
                className={`relative py-3 text-xs font-medium transition-colors ${
                  active ? "text-white" : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                {tab === "personal" ? "개인" : "팀"}
                {active && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500 rounded-t-full" />
                )}
              </button>
            );
          })}
        </div>
      </header>

      <main className="flex-1 px-8 py-6 flex flex-col gap-4">
        {activeTab === "personal" ? (
          <PersonalTab cols={COLS_PERSONAL} />
        ) : (
          <TeamTab cols={COLS_TEAM} />
        )}
      </main>
    </div>
  );
}

function TransferBadge({ status }: { status: TStatus }) {
  const badge = TRANSFER_BADGE[status] ?? { label: status, cls: "bg-zinc-800 text-zinc-400" };
  return (
    <span className={`inline-flex items-center rounded px-2 py-0.5 text-[11px] font-medium ${badge.cls}`}>
      {badge.label}
    </span>
  );
}

function PersonalTab({ cols }: { cols: string[] }) {
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
      <div className="rounded-xl border border-zinc-800 overflow-hidden bg-zinc-950">
        <div className="overflow-x-auto">
          <table className="min-w-[1000px] w-full text-xs">
            <thead>
              <tr className="border-b border-zinc-800 bg-zinc-900/50">
                {cols.map((label) => (
                  <th
                    key={label}
                    className="px-4 py-3 text-left text-[10px] font-medium text-zinc-600 uppercase tracking-widest whitespace-nowrap"
                  >
                    {label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 && (
                <tr>
                  <td colSpan={cols.length} className="px-4 py-20 text-center text-zinc-600 text-sm">
                    결과가 없습니다
                  </td>
                </tr>
              )}
              {rows.map((r) => (
                <tr
                  key={r.id}
                  className="border-t border-zinc-800/50 hover:bg-zinc-900/70 transition-colors group"
                >
                  <td className="px-4 py-3 font-mono text-zinc-600 tabular-nums">{r.id}</td>
                  <td className="px-4 py-3 text-zinc-400 font-mono tabular-nums">{r.account}</td>
                  <td className="px-4 py-3">
                    <TransferBadge status={r.transfer_status} />
                  </td>
                  <td className="px-4 py-3 tabular-nums whitespace-nowrap">
                    {r.amount != null ? (
                      <span className="text-zinc-200">
                        {r.amount.toLocaleString()}
                        <span className="text-zinc-600 ml-0.5">원</span>
                      </span>
                    ) : (
                      <span className="text-zinc-600">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-zinc-400">{r.account_bank || "—"}</td>
                  <td className="px-4 py-3 text-zinc-300">{r.account_holder || "—"}</td>
                  <td className="px-4 py-3 font-mono text-zinc-500 tabular-nums">{r.account_number || "—"}</td>
                  <td className="px-4 py-3 text-zinc-500 tabular-nums whitespace-nowrap">
                    {r.created_at ? new Date(r.created_at).toLocaleString("ko-KR") : "—"}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => setOpenId(r.id)}
                      className="inline-flex items-center gap-0.5 text-[11px] font-medium text-zinc-500 hover:text-emerald-400 transition-colors"
                    >
                      보기
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {hasNextPage && (
        <div className="flex justify-center pt-2">
          <NextPageLoader hasNextPage={hasNextPage} fetchNextPage={fetchNextPage} />
        </div>
      )}

      <DetailPanelOverlay openId={openId} handleClose={handleClose} />

      {/* Detail slide-in panel */}
      <div
        className={cn(
          "fixed top-0 right-0 h-dvh w-[460px] md:w-[520px] bg-zinc-950 border-l border-zinc-800 shadow-2xl z-50 flex flex-col transition-transform duration-300 ease-out",
          openId !== null ? "translate-x-0" : "translate-x-full",
        )}
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between px-6 py-5 border-b border-zinc-800">
          <div className="space-y-3">
            <h2 className="text-sm font-semibold text-white">
              정산 상세
              <span className="ml-2 font-mono text-zinc-500">#{detailData?.id ?? "—"}</span>
            </h2>
            {detailData && <TransferBadge status={detailData.transfer_status} />}
          </div>
          <button
            onClick={handleClose}
            type="button"
            aria-label="패널 닫기"
            className="flex items-center justify-center w-7 h-7 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 text-xs">
          {!detailData ? (
            <div className="text-zinc-600 text-center py-24">항목을 선택하세요.</div>
          ) : (
            <>
              <DetailSection title="기본 정보">
                <DetailRow label="금액">
                  <span className="text-zinc-200 font-medium tabular-nums">
                    {detailData.amount != null ? `${detailData.amount.toLocaleString()}원` : "—"}
                  </span>
                </DetailRow>
                <DetailRow label="생성일">
                  <span className="text-zinc-300 tabular-nums">
                    {detailData.created_at ? new Date(detailData.created_at).toLocaleString("ko-KR") : "—"}
                  </span>
                </DetailRow>
              </DetailSection>

              <DetailSection title="계좌 정보">
                <DetailRow label="은행">
                  <span className="text-zinc-300">{detailData.account_bank || "—"}</span>
                </DetailRow>
                <DetailRow label="예금주">
                  <span className="text-zinc-300">{detailData.account_holder || "—"}</span>
                </DetailRow>
                <DetailRow label="계좌번호" full>
                  <span className="text-zinc-300 font-mono tabular-nums">{detailData.account_number || "—"}</span>
                </DetailRow>
              </DetailSection>

              <DetailSection title="계정 상세">
                <DetailRow label="계정 ID">
                  <span className="text-zinc-300 font-mono tabular-nums">{detailData.account.id}</span>
                </DetailRow>
                <DetailRow label="타입">
                  <span className="text-zinc-300">{detailData.account.account_type}</span>
                </DetailRow>
                <DetailRow label="잔액">
                  <span className="text-zinc-200 font-medium tabular-nums">
                    {detailData.account.balance != null
                      ? `${detailData.account.balance.toLocaleString()}원`
                      : "—"}
                  </span>
                </DetailRow>
                <DetailRow label="포인트">
                  <span className="text-zinc-300 tabular-nums">{detailData.account.point}</span>
                </DetailRow>
                <DetailRow label="상태" full>
                  <span className="text-zinc-300">{detailData.account.status}</span>
                </DetailRow>
              </DetailSection>

              {detailData.account?.user && (
                <DetailSection title="사용자 정보">
                  <DetailRow label="ID">
                    <span className="text-zinc-300 font-mono tabular-nums">{detailData.account.user.id}</span>
                  </DetailRow>
                  <DetailRow label="닉네임">
                    <span className="text-zinc-300">{detailData.account.user.nickname}</span>
                  </DetailRow>
                  <DetailRow label="이름">
                    <span className="text-zinc-300">{detailData.account.user.name}</span>
                  </DetailRow>
                  <DetailRow label="이메일" full>
                    <span className="text-zinc-300">{detailData.account.user.email}</span>
                  </DetailRow>
                  <DetailRow label="연락처">
                    <span className="text-zinc-300 font-mono tabular-nums">
                      {formatPhone(detailData.account.user.phone)}
                    </span>
                  </DetailRow>
                  <DetailRow label="생년월일">
                    <span className="text-zinc-300 tabular-nums">{detailData.account.user.birthday}</span>
                  </DetailRow>
                  <DetailRow label="가입수단" full>
                    <span className="text-zinc-300">{detailData.account.user.signup_method}</span>
                  </DetailRow>
                </DetailSection>
              )}

              <StatusUpdateSection
                statusValue={statusValue}
                setStatusValue={setStatusValue}
                currentStatus={detailData.transfer_status}
                badgeCls={badgeCls}
                onUpdate={() =>
                  handleUpdateStatus(statusValue as "completed" | "waiting" | "declined")
                }
              />
            </>
          )}
        </div>

        <div className="px-6 py-4 border-t border-zinc-800 flex justify-end">
          <button
            type="button"
            onClick={handleClose}
            className="h-8 px-4 rounded-lg border border-zinc-700 text-zinc-400 text-xs font-medium hover:text-white hover:border-zinc-600 transition-colors"
          >
            닫기
          </button>
        </div>
      </div>
    </>
  );
}

function TeamTab({ cols }: { cols: string[] }) {
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
      <div className="rounded-xl border border-zinc-800 overflow-hidden bg-zinc-950">
        <div className="overflow-x-auto">
          <table className="min-w-[1000px] w-full text-xs">
            <thead>
              <tr className="border-b border-zinc-800 bg-zinc-900/50">
                {cols.map((label) => (
                  <th
                    key={label}
                    className="px-4 py-3 text-left text-[10px] font-medium text-zinc-600 uppercase tracking-widest whitespace-nowrap"
                  >
                    {label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 && (
                <tr>
                  <td colSpan={cols.length} className="px-4 py-20 text-center text-zinc-600 text-sm">
                    결과가 없습니다
                  </td>
                </tr>
              )}
              {rows.map((r) => (
                <tr
                  key={r.id}
                  className="border-t border-zinc-800/50 hover:bg-zinc-900/70 transition-colors group"
                >
                  <td className="px-4 py-3 font-mono text-zinc-600 tabular-nums">{r.id}</td>
                  <td className="px-4 py-3 text-zinc-400 font-mono tabular-nums">{r.account}</td>
                  <td className="px-4 py-3">
                    <TransferBadge status={r.transfer_status} />
                  </td>
                  <td className="px-4 py-3 tabular-nums whitespace-nowrap">
                    {r.amount != null ? (
                      <span className="text-zinc-200">
                        {r.amount.toLocaleString()}
                        <span className="text-zinc-600 ml-0.5">원</span>
                      </span>
                    ) : (
                      <span className="text-zinc-600">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-zinc-400">{r.account_bank || "—"}</td>
                  <td className="px-4 py-3 text-zinc-300">{r.account_holder || "—"}</td>
                  <td className="px-4 py-3 font-mono text-zinc-500 tabular-nums">{r.account_number || "—"}</td>
                  <td className="px-4 py-3 text-zinc-500 tabular-nums whitespace-nowrap">
                    {r.created_at ? new Date(r.created_at).toLocaleString("ko-KR") : "—"}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => setOpenId(r.id)}
                      className="inline-flex items-center gap-0.5 text-[11px] font-medium text-zinc-500 hover:text-emerald-400 transition-colors"
                    >
                      보기
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {hasNextPage && (
        <div className="flex justify-center pt-2">
          <NextPageLoader hasNextPage={hasNextPage} fetchNextPage={fetchNextPage} />
        </div>
      )}

      <DetailPanelOverlay openId={openId} handleClose={handleClose} />

      {/* Team detail slide-in panel */}
      <div
        className={cn(
          "fixed top-0 right-0 h-dvh w-[460px] md:w-[520px] bg-zinc-950 border-l border-zinc-800 shadow-2xl z-50 flex flex-col transition-transform duration-300 ease-out",
          openId !== null ? "translate-x-0" : "translate-x-full",
        )}
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between px-6 py-5 border-b border-zinc-800">
          <div className="space-y-3">
            <h2 className="text-sm font-semibold text-white">
              팀 정산 상세
              <span className="ml-2 font-mono text-zinc-500">#{detailData?.id ?? "—"}</span>
            </h2>
            {detailData && <TransferBadge status={detailData.transfer_status} />}
          </div>
          <button
            onClick={handleClose}
            type="button"
            aria-label="패널 닫기"
            className="flex items-center justify-center w-7 h-7 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 text-xs">
          {!detailData ? (
            <div className="text-zinc-600 text-center py-24">항목을 선택하세요.</div>
          ) : (
            <>
              <DetailSection title="기본 정보">
                <DetailRow label="금액">
                  <span className="text-zinc-200 font-medium tabular-nums">
                    {detailData.amount != null ? `${detailData.amount.toLocaleString()}원` : "—"}
                  </span>
                </DetailRow>
                <DetailRow label="생성일">
                  <span className="text-zinc-300 tabular-nums">
                    {detailData.created_at ? new Date(detailData.created_at).toLocaleString("ko-KR") : "—"}
                  </span>
                </DetailRow>
              </DetailSection>

              <DetailSection title="계좌 정보">
                <DetailRow label="은행">
                  <span className="text-zinc-300">{detailData.account_bank || "—"}</span>
                </DetailRow>
                <DetailRow label="예금주">
                  <span className="text-zinc-300">{detailData.account_holder || "—"}</span>
                </DetailRow>
                <DetailRow label="계좌번호" full>
                  <span className="text-zinc-300 font-mono tabular-nums">{detailData.account_number || "—"}</span>
                </DetailRow>
              </DetailSection>

              <DetailSection title="팀 계좌 상세">
                <DetailRow label="계좌 ID">
                  <span className="text-zinc-300 font-mono tabular-nums">{detailData.account.id}</span>
                </DetailRow>
                <DetailRow label="상태">
                  <span className="text-zinc-300">{detailData.account.status}</span>
                </DetailRow>
                <DetailRow label="잔액" full>
                  <span className="text-zinc-200 font-medium tabular-nums">
                    {detailData.account.balance != null
                      ? `${detailData.account.balance.toLocaleString()}원`
                      : "—"}
                  </span>
                </DetailRow>
              </DetailSection>

              <DetailSection title="팀 정보">
                <DetailRow label="팀 ID">
                  <span className="text-zinc-300 font-mono tabular-nums">{detailData.account.team.id}</span>
                </DetailRow>
                <DetailRow label="팀명">
                  <span className="text-zinc-300">{detailData.account.team.name}</span>
                </DetailRow>
                <DetailRow label="상태" full>
                  <span className="text-zinc-300">{detailData.account.team.status}</span>
                </DetailRow>
              </DetailSection>

              <StatusUpdateSection
                statusValue={statusValue}
                setStatusValue={setStatusValue}
                currentStatus={detailData.transfer_status}
                badgeCls={badgeCls}
                onUpdate={() =>
                  handleUpdateStatus(statusValue as "completed" | "waiting" | "declined")
                }
              />
            </>
          )}
        </div>

        <div className="px-6 py-4 border-t border-zinc-800 flex justify-end">
          <button
            type="button"
            onClick={handleClose}
            className="h-8 px-4 rounded-lg border border-zinc-700 text-zinc-400 text-xs font-medium hover:text-white hover:border-zinc-600 transition-colors"
          >
            닫기
          </button>
        </div>
      </div>
    </>
  );
}

function DetailSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-2.5">
      <h3 className="text-[10px] font-semibold text-zinc-600 uppercase tracking-widest">{title}</h3>
      <div className="rounded-lg border border-zinc-800 bg-zinc-900/40 overflow-hidden">
        <div className="grid grid-cols-2 divide-x divide-zinc-800">{children}</div>
      </div>
    </section>
  );
}

function DetailRow({
  label,
  full,
  children,
}: {
  label: string;
  full?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("flex flex-col gap-0.5 px-3 py-2.5 border-b border-zinc-800 last:border-b-0", full && "col-span-2")}>
      <span className="text-[10px] text-zinc-600 uppercase tracking-wider">{label}</span>
      <div className="text-xs">{children}</div>
    </div>
  );
}

function StatusUpdateSection({
  statusValue,
  setStatusValue,
  currentStatus,
  badgeCls,
  onUpdate,
}: {
  statusValue: string;
  setStatusValue: (v: string) => void;
  currentStatus: TStatus;
  badgeCls: (s: string) => string;
  onUpdate: () => void;
}) {
  return (
    <section className="space-y-2.5">
      <h3 className="text-[10px] font-semibold text-zinc-600 uppercase tracking-widest">이체 상태 변경</h3>
      <div className="rounded-lg border border-zinc-800 bg-zinc-900/40 p-3 space-y-3">
        <select
          value={statusValue}
          onChange={(e) => setStatusValue(e.target.value)}
          className="w-full h-8 rounded-lg bg-zinc-800 border border-zinc-700 px-2.5 text-xs text-zinc-300 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
        >
          <option value="waiting">waiting</option>
          <option value="completed">completed</option>
          <option value="declined">declined</option>
        </select>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[10px] text-zinc-500">
            현재
            <span className={cn("inline-flex rounded px-2 py-0.5 text-[10px] font-medium", badgeCls(currentStatus))}>
              {currentStatus}
            </span>
          </div>
          <button
            type="button"
            onClick={onUpdate}
            className="h-7 px-3 text-[11px] font-medium rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition-colors"
          >
            저장
          </button>
        </div>
      </div>
    </section>
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
