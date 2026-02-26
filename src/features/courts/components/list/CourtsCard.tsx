import { Link } from "react-router-dom";

interface CourtsCardProps {
  u: {
    id: number;
    name: string;
    address: string;
    address_detail: string | null;
    images: string[];
  };
}

const CourtsCard = ({ u }: CourtsCardProps) => {
  const getThumb = (images: string[] | undefined) =>
    images && images.length > 0 ? images[0] : "court placeholder";

  return (
    <article className="group overflow-hidden rounded-xl border border-gray-800 bg-gray-900/70 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-gray-700 hover:shadow-xl">
      <div className="relative aspect-square bg-gray-800">
        {u.images.length === 0 ? (
          <div className="flex h-full w-full items-center justify-center text-sm text-gray-500">
            이미지 없음
          </div>
        ) : (
          <img
            src={getThumb(u.images)}
            alt={u.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      <div className="flex flex-col gap-2 p-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="truncate text-sm font-semibold text-white">{u.name}</h3>
          <span className="rounded-md border border-gray-700 bg-gray-800 px-2 py-0.5 text-[10px] text-gray-300">
            ID {u.id}
          </span>
        </div>
        <p className="line-clamp-2 text-[11px] leading-relaxed text-gray-400">
          {u.address} {u.address_detail ?? ""}
        </p>
        <div className="pt-1">
          <Link
            to={`detail?courtId=${u.id}`}
            className="inline-flex items-center gap-1 text-xs font-medium text-blue-400 transition-colors hover:text-blue-300"
          >
            상세 보기
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </article>
  );
};

export default CourtsCard;
