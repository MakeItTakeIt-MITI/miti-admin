export const TABLE_STYLES = {
  container: "w-full overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-950",
  table: "w-full text-xs",
  head: "border-b border-zinc-800 bg-zinc-900/50 text-zinc-300",
  headerRow: "text-left",
  headerCell: "px-4 py-3 text-[10px] font-semibold text-zinc-500 uppercase tracking-wider whitespace-nowrap",
  bodyRow: "border-t border-zinc-800/50 hover:bg-zinc-900/70 transition-colors group",
  bodyCell: "px-4 py-3 text-zinc-300",
  primaryCell: "px-4 py-3 text-white font-mono",
  emptyCell: "px-4 py-20 text-center text-zinc-500 text-sm",
} as const;
