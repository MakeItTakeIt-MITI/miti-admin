import { Button } from "../../../components/ui/button";
interface GameDetailField {
  id: number;
  game_status: string;
  title: string;
  startdate: string;
  starttime: string;
  enddate: string;
  endtime: string;
  min_invitation: number;
  max_invitation: number;
  num_of_participations: number;
  fee: number;
  created_at: string;
  info: string;
  host: {
    id: number;
    email: string;
    nickname: string;
    name: string;
    birthday: string;
    signup_method: string;
    phone: string;
  };
  court: {
    id: number;
    name: string;
    address: string;
    address_detail: string | null;
  };
}

interface GameInfoProps {
  data: GameDetailField;
  handleDisplayEditContainer: () => void;
}

export const GameInfo = ({
  data,
  handleDisplayEditContainer,
}: GameInfoProps) => {
  return (
    <article className="bg-gray-800 text-white min-h-screen">
      <div className="flex items-center justify-between h-32 px-6 ">
        <h1 className="text-2xl font-semibold ">{data?.title}</h1>
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

      {/* HOST INFO CONTAINER */}
      <div className="h-32 flex items-center">
        <ul className="flex items-center gap-10 p-8">
          <li>
            <h4 className="font-bold">호스트 ID </h4>
            <p className="text-gray-500">{data?.host.id}</p>
          </li>
          <li>
            {" "}
            <h4 className="font-bold">이름</h4>
            <p className="text-gray-500">{data?.host.name} </p>
          </li>
          <li>
            {" "}
            <h4 className="font-bold">닉네임</h4>
            <p className="text-gray-500">{data?.host.nickname}</p>
          </li>
          <li>
            {" "}
            <h4 className="font-bold">이메일</h4>
            <p className="text-gray-500">{data?.host.email}</p>
          </li>
          <li>
            {" "}
            <h4 className="font-bold">생년월일</h4>
            <p className="text-gray-500">{data?.host.birthday}</p>
          </li>
          <li>
            {" "}
            <h4 className="font-bold">연락처</h4>
            <p className="text-gray-500">{data?.host.phone}</p>
          </li>
        </ul>
      </div>
      <hr className="bg-white " />

      {/* GAME INFO CONTAINER */}
      <div className="h-32 flex items-center">
        <ul className="flex items-center gap-10 p-8">
          <li>
            <h4 className="font-bold">경기 ID </h4>
            <p className="text-gray-500">{data?.id}</p>
          </li>
          <li>
            <h4 className="font-bold">경기 시작</h4>
            <p className="text-gray-500">
              {data?.startdate} ({data?.starttime.slice(0, 5)})
            </p>
          </li>
          <li>
            <h4 className="font-bold">경기 종료</h4>
            <p className="text-gray-500">
              {data?.enddate} ({data?.endtime.slice(0, 5)})
            </p>
          </li>

          <li>
            <h4 className="font-bold">경기 상태</h4>
            <p className="text-gray-500">{data?.game_status}</p>
          </li>
          <li>
            <h4 className="font-bold">참가비</h4>
            <p className="text-gray-500">{data?.fee}</p>
          </li>

          <li>
            <h4 className="font-bold">최소 인원</h4>
            <p className="text-gray-500">{data?.min_invitation}</p>
          </li>

          <li>
            <h4 className="font-bold">최대 인원</h4>
            <p className="text-gray-500">{data?.max_invitation}</p>
          </li>

          <li>
            <h4 className="font-bold">현재 모집 인원</h4>
            <p className="text-gray-500">{data?.num_of_participations}</p>
          </li>
          <li>
            <h4 className="font-bold">경기 생성일</h4>
            <p className="text-gray-500">{data?.created_at.slice(0, 10)}</p>
          </li>
        </ul>
      </div>
      <hr className="bg-white " />
      {/* COURT INFO CONTAINER */}
      <div className="h-32 flex items-center">
        <ul className="flex items-center gap-10 p-8">
          <li>
            <h4 className="font-bold">코트 ID </h4>
            <p className="text-gray-500">{data?.court.id}</p>
          </li>
          <li>
            {" "}
            <h4 className="font-bold">주소</h4>
            <p className="text-gray-500">{data?.court.address} </p>
          </li>
          <li>
            {" "}
            <h4 className="font-bold">상세 주소</h4>
            <p className="text-gray-500">{data?.court.name}</p>
          </li>
        </ul>
      </div>
      <hr className="bg-white " />

      {/* GAME DETAIELD INFO */}
      <div
        style={{ scrollbarWidth: "thin" }}
        className="space-y-4 p-8  overflow-y-auto"
      >
        <p style={{ whiteSpace: "pre-line" }}> {data?.info}</p>
      </div>
    </article>
  );
};
