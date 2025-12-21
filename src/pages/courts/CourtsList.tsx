import SearchField from "../../components/common/SearchField";
import { useCourtsPage } from "../../features/courts/hooks/useCourtsPage";

export default function CourtsList() {
  const { rows, courtsListData } = useCourtsPage();
  console.log(rows);
  console.log(courtsListData, "courtsListData");
  return (
    <section className="w-full  p-8  flex flex-col gap-4 bg-black">
      <div className="space-y-4">
        <h1 className="text-white font-bold text-2xl">경기장 목록</h1>
        <SearchField paramKey={"search"} />
      </div>
    </section>
  );
}
