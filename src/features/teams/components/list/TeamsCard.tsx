import { Users } from "lucide-react";
import { TeamMeta } from "../../../../interface/team";
import { TEAM_STATUS_BADGE, TEAM_LEVEL_LABEL } from "../../constants/teams";
import { Link } from "react-router-dom";

interface TeamsCardProps {
  team: TeamMeta;
}

const TeamsCard = ({ team }: TeamsCardProps) => {
  const badge = TEAM_STATUS_BADGE[team.status];

  return (
    <Link
      to={`detail?teamId=${team.id}`}
      className="group relative flex flex-col overflow-hidden rounded-xl bg-zinc-950 border border-zinc-800 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-zinc-750"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-zinc-900">
        {team.image ? (
          <img
            src={team.image}
            alt={team.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <Users className="h-10 w-10 text-zinc-700" />
          </div>
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />

        {/* Status badge — top-left */}
        {badge && (
          <div
            className={`absolute top-3 left-3 rounded px-2 py-0.5 text-[10px] font-semibold ${badge.cls}`}
          >
            {badge.label}
          </div>
        )}

        {/* Level badge — top-right */}
        <div className="absolute top-3 right-3 rounded bg-black/60 backdrop-blur-sm border border-zinc-800 px-2 py-0.5 text-[10px] font-mono text-zinc-400">
          {TEAM_LEVEL_LABEL[team.level] ?? team.level}
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-col gap-1.5 p-4">
        <h3 className="truncate text-sm font-semibold text-zinc-200 leading-tight group-hover:text-white transition-colors">
          {team.name}
        </h3>
        <div className="flex items-center gap-2 text-[11px] text-zinc-500 font-medium font-mono">
          <span>{team.city_name}</span>
          <span className="text-zinc-700">·</span>
          <span className="flex items-center gap-1">
            <Users className="h-3 w-3" />
            {team.num_of_members}명
          </span>
        </div>
        {team.introduction && (
          <p className="text-[11px] text-zinc-500 leading-relaxed line-clamp-2 mt-1">
            {team.introduction}
          </p>
        )}
      </div>
    </Link>
  );
};

export default TeamsCard;
