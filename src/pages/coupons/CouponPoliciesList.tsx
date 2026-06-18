import { useCouponPoliciesPage } from "../../features/coupons/hooks/useCouponPoliciesPage";
import NextPageLoader from "../../features/common/NextPageLoader";
import { CouponPolicy, DiscountType, ItemType } from "../../features/coupons/interface/coupons";
import { TABLE_STYLES } from "../../components/common/tableStyles";

const ITEM_TYPE_LABEL: Record<ItemType, string> = {
  participation_fee: "개인 참가비",
  team_schedule_fee: "팀 일정 참가비",
  guest_fee: "게스트 참가비",
};

const DISCOUNT_TYPE_LABEL: Record<DiscountType, string> = {
  fixed: "고정 금액",
  percent: "비율",
};

const formatDiscountValue = (policy: CouponPolicy) => {
  if (policy.discount_type === "fixed") {
    return `₩${policy.discount_value.toLocaleString()}`;
  }
  return `${policy.discount_value}%`;
};

const CouponPoliciesList = () => {
  const { rows, hasNextPage, fetchNextPage } = useCouponPoliciesPage();

  return (
    <div className="flex flex-col gap-4">
      <div className={TABLE_STYLES.container}>
        <div className="overflow-x-auto">
          <table className={`min-w-[900px] ${TABLE_STYLES.table}`}>
            <thead className={TABLE_STYLES.head}>
              <tr className={TABLE_STYLES.headerRow}>
                <th className={`${TABLE_STYLES.headerCell} w-20`}>ID</th>
                <th className={TABLE_STYLES.headerCell}>정책명</th>
                <th className={`${TABLE_STYLES.headerCell} w-36 text-center`}>할인 대상</th>
                <th className={`${TABLE_STYLES.headerCell} w-36 text-center`}>할인 방식</th>
                <th className={`${TABLE_STYLES.headerCell} w-32`}>할인 값</th>
                <th className={`${TABLE_STYLES.headerCell} w-44`}>최대 할인 금액</th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 && (
                <tr>
                  <td colSpan={6} className={TABLE_STYLES.emptyCell}>
                    결과가 없습니다.
                  </td>
                </tr>
              )}
              {rows.map((policy: CouponPolicy) => (
                <tr key={policy.id} className={TABLE_STYLES.bodyRow}>
                  <td className={TABLE_STYLES.primaryCell}>{policy.id}</td>
                  <td className={`${TABLE_STYLES.bodyCell} text-zinc-100 font-semibold`}>
                    {policy.name}
                  </td>
                  <td className={`${TABLE_STYLES.bodyCell} text-center`}>
                    <span className="inline-flex rounded px-2 py-0.5 text-[11px] font-semibold bg-violet-950/60 border border-violet-900/60 text-violet-300">
                      {ITEM_TYPE_LABEL[policy.target_item_type] ?? policy.target_item_type}
                    </span>
                  </td>
                  <td className={`${TABLE_STYLES.bodyCell} text-center`}>
                    <span
                      className={`inline-flex rounded px-2 py-0.5 text-[11px] font-semibold border ${
                        policy.discount_type === "fixed"
                          ? "bg-sky-950/60 border-sky-900/60 text-sky-300"
                          : "bg-orange-950/60 border-orange-900/60 text-orange-300"
                      }`}
                    >
                      {DISCOUNT_TYPE_LABEL[policy.discount_type]}
                    </span>
                  </td>
                  <td className={`${TABLE_STYLES.bodyCell} text-zinc-200 font-mono font-semibold`}>
                    {formatDiscountValue(policy)}
                  </td>
                  <td className={`${TABLE_STYLES.bodyCell} text-zinc-400 font-mono`}>
                    {policy.max_discount_amount
                      ? `₩${policy.max_discount_amount.toLocaleString()}`
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

export default CouponPoliciesList;
