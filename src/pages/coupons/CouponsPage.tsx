import { useState, useRef, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import CouponsList from "./CouponsList";
import CouponPoliciesList from "./CouponPoliciesList";
import { useCreateCoupon } from "../../features/coupons/hooks/mutation/useCreateCoupon";
import { useCreateCouponPolicy } from "../../features/coupons/hooks/mutation/useCreateCouponPolicy";
import { CreateCouponPayload, CreateCouponPolicyPayload } from "../../features/coupons/api/coupons";
import { CouponPolicy, DiscountType, ItemType } from "../../features/coupons/interface/coupons";
import { useCouponPoliciesList } from "../../features/coupons/hooks/query/useCouponPoliciesList";
import { useUsersListHook } from "../../features/users/hooks/query/useUsersListHook";
import { UsersField } from "../../features/users/interface/users";

type Tab = "coupons" | "policies";

const TABS: { key: Tab; label: string }[] = [
  { key: "coupons", label: "쿠폰 목록" },
  { key: "policies", label: "쿠폰 정책 목록" },
];

const ITEM_TYPE_LABEL: Record<string, string> = {
  participation_fee: "개인 참가비",
  team_schedule_fee: "팀 일정 참가비",
  guest_fee: "게스트 참가비",
};

const DISCOUNT_TYPE_LABEL: Record<string, string> = {
  fixed: "고정 금액",
  percent: "비율",
};

interface PolicySelectProps {
  value: number | null;
  onChange: (policy: CouponPolicy) => void;
}

const PolicySelect = ({ value, onChange }: PolicySelectProps) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  const { data, isFetching } = useCouponPoliciesList();
  const allPolicies: CouponPolicy[] = data?.pages.flatMap((page) => page?.data?.items ?? []) ?? [];

  const filtered = query
    ? allPolicies.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()))
    : allPolicies;

  const selected = allPolicies.find((p) => p.id === value) ?? null;

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        setQuery("");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      {/* 트리거 */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={`w-full h-9 rounded-lg bg-zinc-900 border px-3 text-sm text-left flex items-center justify-between gap-2 transition-colors ${
          open ? "border-zinc-500 ring-1 ring-zinc-500" : "border-zinc-800 hover:border-zinc-700"
        }`}
      >
        {selected ? (
          <span className="text-white truncate">{selected.name}</span>
        ) : (
          <span className="text-zinc-500">정책을 선택하세요</span>
        )}
        <svg
          className={`w-4 h-4 text-zinc-500 shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* 드롭다운 패널 */}
      {open && (
        <div className="absolute z-10 mt-1 w-full rounded-lg bg-zinc-900 border border-zinc-850 shadow-xl overflow-hidden">
          {/* 검색 */}
          <div className="p-2 border-b border-zinc-855">
            <input
              autoFocus
              type="text"
              placeholder="정책명 검색..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full h-8 rounded-md bg-zinc-950 border border-zinc-850 px-3 text-xs text-white placeholder:text-zinc-650 focus:outline-none focus:ring-1 focus:ring-zinc-700"
            />
          </div>

          {/* 목록 */}
          <ul className="max-h-52 overflow-y-auto">
            {isFetching && filtered.length === 0 && (
              <li className="px-3 py-6 text-center text-xs text-zinc-500">불러오는 중...</li>
            )}
            {!isFetching && filtered.length === 0 && (
              <li className="px-3 py-6 text-center text-xs text-zinc-500">검색 결과가 없습니다.</li>
            )}
            {filtered.map((policy) => (
              <li key={policy.id}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(policy);
                    setOpen(false);
                    setQuery("");
                  }}
                  className={`w-full px-3 py-2.5 text-left hover:bg-zinc-800 transition-colors flex items-start gap-3 ${
                    value === policy.id ? "bg-zinc-800/60" : ""
                  }`}
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-white truncate">{policy.name}</p>
                    <p className="text-[10px] text-zinc-500 mt-0.5">
                      #{policy.id} ·{" "}
                      {ITEM_TYPE_LABEL[policy.target_item_type] ?? policy.target_item_type} ·{" "}
                      {DISCOUNT_TYPE_LABEL[policy.discount_type]}{" "}
                      {policy.discount_type === "fixed"
                        ? `₩${policy.discount_value.toLocaleString()}`
                        : `${policy.discount_value}%`}
                    </p>
                  </div>
                  {value === policy.id && (
                    <svg
                      className="w-3.5 h-3.5 text-zinc-350 shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth={2.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

interface UserSelectProps {
  value: UsersField | null;
  onChange: (user: UsersField | null) => void;
}

const UserSelect = ({ value, onChange }: UserSelectProps) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [committedQuery, setCommittedQuery] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  const { data, isFetching } = useUsersListHook(committedQuery);
  const users: UsersField[] = data?.pages.flatMap((page) => page?.data?.items ?? []) ?? [];

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSearch = () => {
    if (query.trim()) {
      setCommittedQuery(query.trim());
      setOpen(true);
    }
  };

  return (
    <div ref={ref} className="space-y-2">
      {/* 검색 입력 */}
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="이름, 닉네임, 이메일로 검색"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSearch();
            }
          }}
          onFocus={() => {
            if (users.length > 0) setOpen(true);
          }}
          className="flex-1 h-9 rounded-lg bg-zinc-900 border border-zinc-800 px-3 text-sm text-white placeholder:text-zinc-650 focus:outline-none focus:ring-1 focus:ring-zinc-700 focus:border-zinc-700 transition-colors"
        />
        <button
          type="button"
          onClick={handleSearch}
          className="h-9 px-3 rounded-lg bg-zinc-800 hover:bg-zinc-750 text-zinc-350 text-xs font-medium transition-colors border border-zinc-800 hover:border-zinc-700 shrink-0"
        >
          검색
        </button>
      </div>

      {/* 선택된 유저 표시 */}
      {value && (
        <div className="rounded-lg bg-zinc-900/60 border border-zinc-800 px-3 py-2 flex items-center justify-between gap-2">
          <div className="min-w-0">
            <p className="text-xs text-white truncate">
              {value.name || value.nickname}{" "}
              <span className="text-zinc-500">@{value.nickname}</span>
            </p>
            <p className="text-[10px] text-zinc-500 mt-0.5">
              #{value.id} · {value.email}
            </p>
          </div>
          <button
            type="button"
            onClick={() => onChange(null)}
            className="text-zinc-600 hover:text-zinc-400 shrink-0"
          >
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      {/* 결과 드롭다운 */}
      {open && (
        <div className="relative z-10">
          <div className="absolute w-full rounded-lg bg-zinc-900 border border-zinc-800 shadow-xl overflow-hidden">
            <ul className="max-h-48 overflow-y-auto">
              {isFetching && (
                <li className="px-3 py-6 text-center text-xs text-zinc-500">검색 중...</li>
              )}
              {!isFetching && users.length === 0 && committedQuery && (
                <li className="px-3 py-6 text-center text-xs text-zinc-500">
                  검색 결과가 없습니다.
                </li>
              )}
              {users.map((user) => (
                <li key={user.id}>
                  <button
                    type="button"
                    onClick={() => {
                      onChange(user);
                      setOpen(false);
                    }}
                    className={`w-full px-3 py-2.5 text-left hover:bg-zinc-800 transition-colors flex items-start gap-3 ${
                      value?.id === user.id ? "bg-zinc-800/60" : ""
                    }`}
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-white truncate">
                        {user.name || user.nickname}{" "}
                        <span className="text-zinc-500">@{user.nickname}</span>
                      </p>
                      <p className="text-[10px] text-zinc-500 mt-0.5">
                        #{user.id} · {user.email}
                      </p>
                    </div>
                    {value?.id === user.id && (
                      <svg
                        className="w-3.5 h-3.5 text-zinc-350 shrink-0 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth={2.5}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

interface IssueCouponModalProps {
  onClose: () => void;
}

const IssueCouponModal = ({ onClose }: IssueCouponModalProps) => {
  const [selectedPolicy, setSelectedPolicy] = useState<CouponPolicy | null>(null);
  const [selectedUser, setSelectedUser] = useState<UsersField | null>(null);
  const [form, setForm] = useState<{ valid_from: string; valid_until: string }>({
    valid_from: "",
    valid_until: "",
  });

  const { mutate, isPending } = useCreateCoupon(onClose);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPolicy) return;
    const payload: CreateCouponPayload = { policy: selectedPolicy.id };
    if (selectedUser) payload.user = selectedUser.id;
    if (form.valid_from) payload.valid_from = new Date(form.valid_from).toISOString();
    if (form.valid_until) payload.valid_until = form.valid_until;
    mutate(payload);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-[480px] rounded-2xl bg-zinc-950 border border-zinc-800 shadow-2xl">
        <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-zinc-800">
          <div>
            <h2 className="text-sm font-semibold text-white">쿠폰 발급</h2>
            <p className="text-[11px] text-zinc-500 mt-0.5">특정 사용자에게 쿠폰을 발급합니다.</p>
          </div>
          <button
            onClick={onClose}
            className="flex items-center justify-center w-7 h-7 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="px-6 py-5 space-y-4">
            <div className="space-y-1.5">
              <label className="block text-[11px] font-medium text-zinc-400 uppercase tracking-wider">
                쿠폰 정책 <span className="text-red-400">*</span>
              </label>
              <PolicySelect value={selectedPolicy?.id ?? null} onChange={setSelectedPolicy} />
              {selectedPolicy && (
                <div className="rounded-lg bg-zinc-900 border border-zinc-800 px-3 py-2 flex items-center gap-2">
                  <span className="text-[10px] text-zinc-500">
                    #{selectedPolicy.id} · {ITEM_TYPE_LABEL[selectedPolicy.target_item_type]} ·{" "}
                    {DISCOUNT_TYPE_LABEL[selectedPolicy.discount_type]}{" "}
                    {selectedPolicy.discount_type === "fixed"
                      ? `₩${selectedPolicy.discount_value.toLocaleString()}`
                      : `${selectedPolicy.discount_value}%`}
                  </span>
                </div>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="block text-[11px] font-medium text-zinc-400 uppercase tracking-wider">
                사용자{" "}
                <span className="text-zinc-650 normal-case">(미선택 시 미발급 상태로 생성)</span>
              </label>
              <UserSelect value={selectedUser} onChange={setSelectedUser} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-[11px] font-medium text-zinc-400 uppercase tracking-wider">
                  유효 시작일시
                </label>
                <input
                  type="datetime-local"
                  value={form.valid_from}
                  onChange={(e) => setForm((prev) => ({ ...prev, valid_from: e.target.value }))}
                  className="w-full h-9 rounded-lg bg-zinc-900 border border-zinc-800 px-3 text-sm text-white placeholder:text-zinc-650 focus:outline-none focus:ring-1 focus:ring-zinc-700 focus:border-zinc-700 transition-colors"
                />
              </div>
              <div className="space-y-1.5">
                <label className="block text-[11px] font-medium text-zinc-400 uppercase tracking-wider">
                  유효 종료일
                </label>
                <input
                  type="date"
                  value={form.valid_until}
                  onChange={(e) => setForm((prev) => ({ ...prev, valid_until: e.target.value }))}
                  className="w-full h-9 rounded-lg bg-zinc-900 border border-zinc-800 px-3 text-sm text-white placeholder:text-zinc-650 focus:outline-none focus:ring-1 focus:ring-zinc-700 focus:border-zinc-700 transition-colors"
                />
              </div>
            </div>
          </div>

          <div className="px-6 pb-5 flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 h-9 rounded-lg border border-zinc-700 text-zinc-400 text-sm font-medium hover:text-white hover:border-zinc-650 transition-colors"
            >
              취소
            </button>
            <button
              type="submit"
              disabled={isPending || !selectedPolicy}
              className="flex-1 h-9 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 text-sm font-semibold hover:bg-zinc-800 hover:text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {isPending ? "발급 중..." : "발급하기"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

interface CreatePolicyModalProps {
  onClose: () => void;
}

const ITEM_TYPE_OPTIONS: { value: ItemType; label: string }[] = [
  { value: "participation_fee", label: "개인 참가비" },
  { value: "team_schedule_fee", label: "팀 일정 참가비" },
  { value: "guest_fee", label: "게스트 참가비" },
];

const CreatePolicyModal = ({ onClose }: CreatePolicyModalProps) => {
  const [form, setForm] = useState<{
    name: string;
    target_item_type: ItemType;
    discount_type: DiscountType;
    discount_value: string;
    max_discount_amount: string;
  }>({
    name: "",
    target_item_type: "participation_fee",
    discount_type: "fixed",
    discount_value: "",
    max_discount_amount: "",
  });

  const { mutate, isPending } = useCreateCouponPolicy(onClose);

  const isPercent = form.discount_type === "percent";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload: CreateCouponPolicyPayload = {
      name: form.name,
      target_item_type: form.target_item_type,
      discount_type: form.discount_type,
      discount_value: Number(form.discount_value),
    };
    if (isPercent && form.max_discount_amount) {
      payload.max_discount_amount = Number(form.max_discount_amount);
    }
    mutate(payload);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-[480px] rounded-2xl bg-zinc-950 border border-zinc-800 shadow-2xl">
        <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-zinc-800">
          <div>
            <h2 className="text-sm font-semibold text-white">쿠폰 정책 등록</h2>
            <p className="text-[11px] text-zinc-500 mt-0.5">새로운 쿠폰 할인 정책을 등록합니다.</p>
          </div>
          <button
            onClick={onClose}
            className="flex items-center justify-center w-7 h-7 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="px-6 py-5 space-y-4">
            <div className="space-y-1.5">
              <label className="block text-[11px] font-medium text-zinc-400 uppercase tracking-wider">
                정책명 <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                required
                maxLength={32}
                placeholder="정책 이름을 입력하세요 (최대 32자)"
                value={form.name}
                onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                className="w-full h-9 rounded-lg bg-zinc-900 border border-zinc-800 px-3 text-sm text-white placeholder:text-zinc-650 focus:outline-none focus:ring-1 focus:ring-zinc-700 focus:border-zinc-700 transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-[11px] font-medium text-zinc-400 uppercase tracking-wider">
                할인 대상 <span className="text-red-400">*</span>
              </label>
              <select
                value={form.target_item_type}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, target_item_type: e.target.value as ItemType }))
                }
                className="w-full h-9 rounded-lg bg-zinc-900 border border-zinc-800 px-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-zinc-700 focus:border-zinc-700 transition-colors"
              >
                {ITEM_TYPE_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-[11px] font-medium text-zinc-400 uppercase tracking-wider">
                  할인 방식 <span className="text-red-400">*</span>
                </label>
                <select
                  value={form.discount_type}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      discount_type: e.target.value as DiscountType,
                      max_discount_amount: "",
                    }))
                  }
                  className="w-full h-9 rounded-lg bg-zinc-900 border border-zinc-800 px-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-zinc-700 focus:border-zinc-700 transition-colors"
                >
                  <option value="fixed">고정 금액</option>
                  <option value="percent">비율</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] font-medium text-zinc-400 uppercase tracking-wider">
                  할인 값 <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    required
                    min={1}
                    placeholder={isPercent ? "예: 10" : "예: 1000"}
                    value={form.discount_value}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, discount_value: e.target.value }))
                    }
                    className="w-full h-9 rounded-lg bg-zinc-900 border border-zinc-800 pl-3 pr-8 text-sm text-white placeholder:text-zinc-650 focus:outline-none focus:ring-1 focus:ring-zinc-700 focus:border-zinc-700 transition-colors"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-500">
                    {isPercent ? "%" : "₩"}
                  </span>
                </div>
              </div>
            </div>

            {isPercent && (
              <div className="space-y-1.5">
                <label className="block text-[11px] font-medium text-zinc-400 uppercase tracking-wider">
                  최대 할인 금액 <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    required
                    min={1}
                    placeholder="예: 5000"
                    value={form.max_discount_amount}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, max_discount_amount: e.target.value }))
                    }
                    className="w-full h-9 rounded-lg bg-zinc-900 border border-zinc-800 pl-3 pr-8 text-sm text-white placeholder:text-zinc-650 focus:outline-none focus:ring-1 focus:ring-zinc-700 focus:border-zinc-700 transition-colors"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-500">
                    ₩
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="px-6 pb-5 flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 h-9 rounded-lg border border-zinc-700 text-zinc-400 text-sm font-medium hover:text-white hover:border-zinc-650 transition-colors"
            >
              취소
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="flex-1 h-9 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 text-sm font-semibold hover:bg-zinc-800 hover:text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {isPending ? "등록 중..." : "등록하기"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const CouponsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const tab = (searchParams.get("tab") as Tab) ?? "coupons";

  const [issueOpen, setIssueOpen] = useState(false);
  const [policyOpen, setPolicyOpen] = useState(false);

  const handleTabChange = (key: Tab) => {
    const next = new URLSearchParams(searchParams);
    next.set("tab", key);
    next.delete("status");
    setSearchParams(next);
  };

  return (
    <>
      {issueOpen && <IssueCouponModal onClose={() => setIssueOpen(false)} />}
      {policyOpen && <CreatePolicyModal onClose={() => setPolicyOpen(false)} />}

      <div className="flex flex-col min-h-screen bg-black text-white">
        {/* 페이지 헤더 */}
        <header className="sticky top-0 z-10 bg-zinc-950/95 backdrop-blur border-b border-zinc-800">
          <div className="px-8 py-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="h-7 w-0.5 rounded-full bg-blue-500" />
              <div>
                <h1 className="text-sm font-semibold text-white tracking-tight leading-none">
                  쿠폰 관리
                </h1>
                <p className="text-[11px] text-zinc-500 mt-1">할인 쿠폰 발급 및 쿠폰 정책 관리</p>
              </div>
            </div>

            {tab === "coupons" && (
              <button
                onClick={() => setIssueOpen(true)}
                className="h-9 px-4 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-semibold hover:bg-zinc-800 hover:text-white transition-colors"
              >
                + 쿠폰 발급
              </button>
            )}
            {tab === "policies" && (
              <button
                onClick={() => setPolicyOpen(true)}
                className="h-9 px-4 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-semibold hover:bg-zinc-800 hover:text-white transition-colors"
              >
                + 정책 등록
              </button>
            )}
          </div>

          {/* 탭 바 */}
          <div className="px-8 flex items-center gap-6 border-t border-zinc-800/60" role="tablist">
            {TABS.map((t) => {
              const active = tab === t.key;
              return (
                <button
                  key={t.key}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => handleTabChange(t.key)}
                  className={`relative py-3 text-xs font-medium transition-colors ${
                    active ? "text-white" : "text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  {t.label}
                  {active && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-zinc-400 rounded-t-full" />
                  )}
                </button>
              );
            })}
          </div>
        </header>

        {/* 탭 컨텐츠 */}
        <main className="flex-1 px-8 py-6">
          {tab === "coupons" && <CouponsList />}
          {tab === "policies" && <CouponPoliciesList />}
        </main>
      </div>
    </>
  );
};

export default CouponsPage;
