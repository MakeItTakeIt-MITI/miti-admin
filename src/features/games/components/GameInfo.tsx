import { Button } from "../../../components/ui/button";
import { GameField } from "../interface/game";

interface GameInfoProps {
  data: GameField;
  handleDisplayEditContainer: () => void;
}

export const GameInfo = ({
  data,
  handleDisplayEditContainer,
}: GameInfoProps) => {
  return (
    <article className="bg-gray-800 text-white min-h-screen">
      <div className="flex items-center justify-between h-32 px-6 ">
        <h1 className="text-2xl font-semibold ">{data?.data.title}</h1>
        <Button
          variant={"secondary"}
          type="button"
          onClick={handleDisplayEditContainer}
          size={"lg"}
        >
          경기 정보 수정
        </Button>
      </div>

      <hr className="bg-white " />
      {/* GAME INFO CONTAINER */}
      <div className="h-32 flex items-center">
        <ul className="flex items-center gap-10 p-8">
          <li>
            <h4 className="font-bold">경기 ID </h4>
            <p className="text-gray-500">{data?.data.id}</p>
          </li>
          <li>
            <h4 className="font-bold">경기 시작</h4>
            <p className="text-gray-500">
              {data?.data.startdate} ({data?.data.starttime.slice(0, 5)})
            </p>
          </li>
          <li>
            <h4 className="font-bold">경기 종료</h4>
            <p className="text-gray-500">
              {data?.data.enddate} ({data?.data.endtime.slice(0, 5)})
            </p>
          </li>

          <li>
            <h4 className="font-bold">경기 상태</h4>
            <p className="text-gray-500">{data?.data.game_status}</p>
          </li>
          <li>
            <h4 className="font-bold">참가비</h4>
            <p className="text-gray-500">{data?.data.fee}</p>
          </li>

          <li>
            <h4 className="font-bold">최소 인원</h4>
            <p className="text-gray-500">{data?.data.min_invitation}</p>
          </li>

          <li>
            <h4 className="font-bold">최대 인원</h4>
            <p className="text-gray-500">{data?.data.max_invitation}</p>
          </li>

          <li>
            <h4 className="font-bold">현재 모집 인원</h4>
            <p className="text-gray-500">{data?.data.num_of_participations}</p>
          </li>
          <li>
            <h4 className="font-bold">경기 생성일</h4>
            <p className="text-gray-500">
              {data?.data.created_at.slice(0, 10)}
            </p>
          </li>
        </ul>
      </div>
      <hr className="bg-white " />
      {/* COURT INFO CONTAINER */}
      <div className="h-32 flex items-center">
        <ul className="flex items-center gap-10 p-8">
          <li>
            <h4 className="font-bold">코트 ID </h4>
            <p className="text-gray-500">{data?.data.court.id}</p>
          </li>
          <li>
            {" "}
            <h4 className="font-bold">주소</h4>
            <p className="text-gray-500">{data?.data.court.address} </p>
          </li>
          <li>
            {" "}
            <h4 className="font-bold">상세 주소</h4>
            <p className="text-gray-500">{data?.data.court.name}</p>
          </li>
        </ul>
      </div>
      <hr className="bg-white " />

      {/* GAME DETAIELD INFO */}
      <div
        style={{ scrollbarWidth: "thin" }}
        className="space-y-4 p-8  overflow-y-auto"
      >
        <p style={{ whiteSpace: "pre-line" }}> {data?.data.info}</p>
      </div>
    </article>
  );
};
