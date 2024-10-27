import { useParams } from "react-router-dom";
import { useGameDetailsDataHook } from "../hook/useGameDetailsDataHook";

const GameDetails = () => {
  const { id } = useParams();
  const gameId = Number(id);
  const { data } = useGameDetailsDataHook(gameId);
  console.log(data);
  return <section></section>;
};

export default GameDetails;
