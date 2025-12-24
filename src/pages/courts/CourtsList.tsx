import { Link } from "react-router-dom";
import SearchField from "../../components/common/SearchField";
// import { useCourtsPage } from "../../features/courts/hooks/useCourtsPage";

export default function CourtsList() {
  // const { courtsListData } = useCourtsPage();
  const rows = [
    {
      id: 1,
      name: "더모스트 베스킷볼 동탄오산점",
      address: "경기 오산시 동부대로568번길 87-15",
      address_detail: null,
      images: [],
    },
    {
      id: 2,
      name: "더모스트 베스킷볼 분당수지점",
      address: "경기 용인시 수지구 동천로 417-1",
      address_detail: null,
      images: [],
    },
    {
      id: 3,
      name: "퀀텀바스켓볼 강남도산",
      address: "서울 강남구 언주로168길 32",
      address_detail: null,
      images: [],
    },
    {
      id: 4,
      name: "퀀텀바스켓볼 강서등촌",
      address: "서울 강서구 공항대로45길 63",
      address_detail: null,
      images: [],
    },
    {
      id: 5,
      name: "퀀텀바스켓볼 인천논현",
      address: "인천 남동구 논고개로 61",
      address_detail: null,
      images: [],
    },
  ];

  const getThumb = (images: string[] | undefined) =>
    images && images.length > 0 ? images[0] : "court placeholder";

  return (
    <section className="w-full p-8 flex flex-col gap-6 bg-black">
      <div className="space-y-4">
        <h1 className="text-white font-bold text-2xl">경기장 목록</h1>
        <SearchField paramKey={"search"} />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {rows.map((u) => (
          <div
            key={u.id}
            className="group rounded-lg overflow-hidden border border-gray-800 bg-gray-900"
          >
            <div className="aspect-square bg-gray-800">
              <img
                src={getThumb(u.images as any)}
                alt={u.name}
                className="h-full w-full object-cover transition-transform duration-300 "
              />
            </div>

            <div className="p-3 flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-white truncate">
                  {u.name}
                </h3>
                <span className="text-[10px] text-gray-400">ID {u.id}</span>
              </div>
              <p className="text-[11px] text-gray-300 line-clamp-2">
                {u.address} {u.address_detail ?? ""}
              </p>
              <div>
                <Link
                  to={`detail?courtId=${u.id}`}
                  className="text-blue-400 hover:text-blue-300 text-xs"
                >
                  상세 보기
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
