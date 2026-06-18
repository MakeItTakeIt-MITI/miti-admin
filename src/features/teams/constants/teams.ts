export const TEAM_STATUS_OPTIONS = [
  { value: "", label: "전체" },
  { value: "created", label: "생성" },
  { value: "active", label: "활동중" },
  { value: "suspended", label: "정지" },
  { value: "inactive", label: "비활성" },
  { value: "deleted", label: "삭제" },
] as const;

export const TEAM_STATUS_BADGE: Record<string, { label: string; cls: string }> = {
  created: {
    label: "생성",
    cls: "bg-gray-500/10 text-gray-400 ring-1 ring-inset ring-gray-500/25",
  },
  active: {
    label: "활동중",
    cls: "bg-emerald-500/10 text-emerald-400 ring-1 ring-inset ring-emerald-500/25",
  },
  suspended: {
    label: "정지",
    cls: "bg-red-500/10 text-red-400 ring-1 ring-inset ring-red-500/25",
  },
  inactive: {
    label: "비활성",
    cls: "bg-amber-500/10 text-amber-400 ring-1 ring-inset ring-amber-500/25",
  },
  deleted: {
    label: "삭제",
    cls: "bg-zinc-500/10 text-zinc-500 ring-1 ring-inset ring-zinc-500/25",
  },
};

export const TEAM_LEVEL_LABEL: Record<string, string> = {
  rookie: "루키",
  division6: "6부",
  division5: "5부",
  division4: "4부",
  division3: "3부",
  elite: "엘리트",
};
