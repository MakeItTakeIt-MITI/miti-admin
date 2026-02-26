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
    <div key={u.id} className="group rounded-lg overflow-hidden border border-gray-800 bg-black  ">
      <div className="aspect-square bg-gray-800">
        {u.images.length === 0 ? (
          <div className="h-full w-full flex items-center justify-center text-gray-600">
            이미지 없음
          </div>
        ) : (
          <img
            src={getThumb(u.images)}
            alt={u.name}
            className="h-full w-full object-cover transition-transform duration-300 "
          />
        )}
      </div>

      <div className="p-3 flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-white truncate">{u.name}</h3>
          <span className="text-[10px] text-gray-400">ID {u.id}</span>
        </div>
        <p className="text-[11px] text-gray-300 line-clamp-2">
          {u.address} {u.address_detail ?? ""}
        </p>
        <div>
          <Link to={`detail?courtId=${u.id}`} className="text-blue-400 hover:text-blue-300 text-xs">
            상세 보기
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourtsCard;
