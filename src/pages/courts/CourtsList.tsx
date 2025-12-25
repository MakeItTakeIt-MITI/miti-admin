import SearchField from "../../components/common/SearchField";
import CourtsCard from "../../features/courts/components/list/CourtsCard";
// import { useCourtsPage } from "../../features/courts/hooks/useCourtsPage";

export default function CourtsList() {
  // const { courtsListData } = useCourtsPage();
  const rows = [
    {
      id: 1,
      name: "더모스트 베스킷볼 동탄오산점",
      address: "경기 오산시 동부대로568번길 87-15",
      address_detail: null,
      images: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5MhGCLYLiozykJFRw8HwlL9VF9CA9Wnu7Vw&s",
      ],
    },
    {
      id: 2,
      name: "더모스트 베스킷볼 분당수지점",
      address: "경기 용인시 수지구 동천로 417-1",
      address_detail: null,
      images: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5MhGCLYLiozykJFRw8HwlL9VF9CA9Wnu7Vw&s",
      ],
    },
    {
      id: 3,
      name: "퀀텀바스켓볼 강남도산",
      address: "서울 강남구 언주로168길 32",
      address_detail: null,
      images: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5MhGCLYLiozykJFRw8HwlL9VF9CA9Wnu7Vw&s",
      ],
    },
    {
      id: 4,
      name: "퀀텀바스켓볼 강서등촌",
      address: "서울 강서구 공항대로45길 63",
      address_detail: null,
      images: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5MhGCLYLiozykJFRw8HwlL9VF9CA9Wnu7Vw&s",
      ],
    },
    {
      id: 5,
      name: "퀀텀바스켓볼 인천논현",
      address: "인천 남동구 논고개로 61",
      address_detail: null,
      images: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5MhGCLYLiozykJFRw8HwlL9VF9CA9Wnu7Vw&s",
      ],
    },
  ];

  return (
    <section className="w-full p-8 flex flex-col gap-6 bg-black">
      <div className="space-y-4">
        <h1 className="text-white font-bold text-2xl">경기장 목록</h1>
        <SearchField paramKey={"search"} />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {rows.map((u) => (
          <CourtsCard u={u} />
        ))}
      </div>
    </section>
  );
}
