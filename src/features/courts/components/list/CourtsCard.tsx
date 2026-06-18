import { Link } from "react-router-dom";

interface CourtsCardProps {
  u: {
    id: number;
    name: string | null;
    address: string;
    address_detail: string | null;
    images: string[];
  };
}

const CourtsCard = ({ u }: CourtsCardProps) => {
  const thumb = u.images.length > 0 ? u.images[0] : null;

  return (
    <Link
      to={`detail?courtId=${u.id}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl bg-zinc-900/40 border border-zinc-800 shadow-xl transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:border-zinc-700"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-zinc-900">
        {thumb ? (
          <img
            src={thumb}
            alt={u.name ?? "경기장"}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <svg
              className="h-10 w-10 text-zinc-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}

        {/* Persistent bottom gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent" />

        {/* ID badge */}
        <div className="absolute top-3 right-3 rounded-full bg-zinc-950/75 backdrop-blur-sm border border-zinc-800 px-2.5 py-0.5 text-[10px] font-mono text-zinc-300">
          #{u.id}
        </div>

        {/* Image count */}
        {u.images.length > 1 && (
          <div className="absolute top-3 left-3 flex items-center gap-1 rounded-full bg-zinc-950/75 backdrop-blur-sm border border-zinc-800 px-2 py-0.5 text-[10px] text-zinc-300 font-mono">
            <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                clipRule="evenodd"
              />
            </svg>
            {u.images.length}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col gap-1.5 p-4">
        <h3 className="truncate text-sm font-semibold text-white leading-tight">
          {u.name ?? "이름 없음"}
        </h3>
        <p className="text-[11px] text-zinc-500 leading-relaxed line-clamp-1 font-mono">
          {u.address}
          {u.address_detail ? ` · ${u.address_detail}` : ""}
        </p>
        <div className="mt-1.5 flex items-center gap-1 text-[11px] font-semibold text-zinc-400 transition-colors group-hover:text-white">
          상세 보기
          <svg
            className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  );
};

export default CourtsCard;
