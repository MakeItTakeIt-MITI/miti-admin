import { useSearchParams } from "react-router-dom";
import { useCouponsPage } from "../../features/coupons/hooks/useCouponsPage";
import NextPageLoader from "../../features/common/NextPageLoader";
import CouponStatusBadge from "../../features/coupons/components/CouponStatusBadge";
import { Coupon, CouponStatus } from "../../features/coupons/interface/coupons";
import { TABLE_STYLES } from "../../components/common/tableStyles";

const STATUS_OPTIONS: { value: CouponStatus; label: string }[] = [
  { value: "active", label: "활성" },
  { value: "pending", label: "미발급" },
  { value: "reserved", label: "예약됨" },
  { value: "used", label: "사용완료" },
  { value: "disabled", label: "비활성" },
  { value: "expired", label: "만료" },
];

const formatDate = (value: string | null) => {
  if (!value) return "—";
  return new Date(value).toLocaleString("ko-KR", { timeZone: "Asia/Seoul" });
};

const CouponsList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentStatus = searchParams.get("status") ?? "";

  const { rows, hasNextPage, fetchNextPage } = useCouponsPage();

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const next = new URLSearchParams(searchParams);
    if (value) {
      next.set("status", value);
    } else {
      next.delete("status");
    }
    setSearchParams(next);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <select
          value={currentStatus}
          onChange={handleStatusChange}
          className="bg-zinc-900 text-zinc-300 text-xs border border-zinc-800 rounded-lg px-3 h-8 focus:outline-none focus:ring-1 focus:ring-zinc-700"
        >
          <option value="">전체 상태</option>
          {STATUS_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div className={TABLE_STYLES.container}>
        <div className="overflow-x-auto">
          <table className={`min-w-[1000px] ${TABLE_STYLES.table}`}>
            <thead className={TABLE_STYLES.head}>
              <tr className={TABLE_STYLES.headerRow}>
                <th className={`${TABLE_STYLES.headerCell} w-20`}>ID</th>
                <th className={TABLE_STYLES.headerCell}>코드</th>
                <th className={`${TABLE_STYLES.headerCell} w-28 text-center`}>상태</th>
                <th className={`${TABLE_STYLES.headerCell} w-24 text-center`}>정책 ID</th>
                <th className={`${TABLE_STYLES.headerCell} w-24 text-center`}>사용자 ID</th>
                <th className={`${TABLE_STYLES.headerCell} w-44`}>발급일</th>
                <th className={`${TABLE_STYLES.headerCell} w-44`}>유효 시작</th>
                <th className={`${TABLE_STYLES.headerCell} w-44`}>유효 종료</th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 && (
                <tr>
                  <td colSpan={8} className={TABLE_STYLES.emptyCell}>
                    결과가 없습니다.
                  </td>
                </tr>
              )}
              {rows.map((coupon: Coupon) => (
                <tr key={coupon.id} className={TABLE_STYLES.bodyRow}>
                  <td className={TABLE_STYLES.primaryCell}>{coupon.id}</td>
                  <td className={`${TABLE_STYLES.bodyCell} font-mono text-zinc-100 tracking-wider`}>
                    {coupon.code}
                  </td>
                  <td className={`${TABLE_STYLES.bodyCell} text-center`}>
                    <CouponStatusBadge status={coupon.status} />
                  </td>
                  <td className={`${TABLE_STYLES.bodyCell} text-center font-mono text-zinc-400`}>
                    #{coupon.policy}
                  </td>
                  <td className={`${TABLE_STYLES.bodyCell} text-center font-mono text-zinc-400`}>
                    {coupon.user ? `#${coupon.user}` : "—"}
                  </td>
                  <td className={`${TABLE_STYLES.bodyCell} font-mono text-zinc-400`}>
                    {formatDate(coupon.issued_at)}
                  </td>
                  <td className={`${TABLE_STYLES.bodyCell} font-mono text-zinc-400`}>
                    {formatDate(coupon.valid_from)}
                  </td>
                  <td className={`${TABLE_STYLES.bodyCell} font-mono text-zinc-400`}>
                    {coupon.valid_until
                      ? new Date(coupon.valid_until).toLocaleDateString("ko-KR", {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                        })
                      : "—"}
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
    </div>
  );
};

export default CouponsList;
