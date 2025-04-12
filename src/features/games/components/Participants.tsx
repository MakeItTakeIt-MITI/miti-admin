import { ParticipationStatus } from "../interface/game";
import { Link } from "react-router-dom";
import { TableLayout } from "../../../components/common/TableLayout";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import { useGameParticipantsHook } from "../hooks/useGameParticipantsHook";

interface ParticipantsProps {
  gameId: number;
}

export const Participants = ({ gameId }: ParticipantsProps) => {
  const { data: gameParticipantsData } = useGameParticipantsHook(gameId);

  const headers = [
    "상세",
    "참가 상태",
    "ID",
    "닉네임",
    "이메일",
    "생년월일",
    "연락처",
    "채중",
    "신장",
    "포지션",
    "역할",
  ];

  const tableData =
    gameParticipantsData?.status_code === 200
      ? gameParticipantsData?.data.map((player: ParticipationStatus) => [
          <Link
            to={`/users/${player.id}`}
            className="inline-block w-full text-center"
          >
            <PersonSearchIcon />
          </Link>,
          player.participation_status,
          player.user.id,
          player.user.nickname,
          player.user.email,
          player.user.birthday,
          player.user.phone,
          `${player.user.player_profile.weight} kg`,
          `${player.user.player_profile.height} cm`,
          player.user.player_profile.position,
          player.user.player_profile.role,
        ])
      : [];
  return (
    <>
      <TableLayout
        headers={headers}
        data={tableData}
        context="참여중인 사용자가 없습니다!"
      />
    </>
  );
};
