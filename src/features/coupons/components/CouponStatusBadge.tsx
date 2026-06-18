import { CouponStatus } from "../interface/coupons";

const STATUS_MAP: Record<CouponStatus, { label: string; className: string }> = {
  active: {
    label: "활성",
    className: "bg-emerald-600/20 text-emerald-300 ring-1 ring-inset ring-emerald-500/30",
  },
  pending: {
    label: "미발급",
    className: "bg-gray-600/20 text-gray-300 ring-1 ring-inset ring-gray-500/30",
  },
  reserved: {
    label: "예약됨",
    className: "bg-amber-600/20 text-amber-300 ring-1 ring-inset ring-amber-500/30",
  },
  used: {
    label: "사용완료",
    className: "bg-blue-600/20 text-blue-300 ring-1 ring-inset ring-blue-500/30",
  },
  disabled: {
    label: "비활성",
    className: "bg-rose-600/20 text-rose-300 ring-1 ring-inset ring-rose-500/30",
  },
  expired: {
    label: "만료",
    className: "bg-gray-700/30 text-gray-500 ring-1 ring-inset ring-gray-600/30",
  },
};

interface CouponStatusBadgeProps {
  status: CouponStatus;
}

const CouponStatusBadge = ({ status }: CouponStatusBadgeProps) => {
  const { label, className } = STATUS_MAP[status] ?? {
    label: status,
    className: "bg-gray-600/20 text-gray-300 ring-1 ring-inset ring-gray-500/30",
  };

  return (
    <span className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-medium ${className}`}>
      {label}
    </span>
  );
};

export default CouponStatusBadge;
