interface CoordinatesFieldProps {
  gameDetailsData: {
    latitude?: number;
    longitude?: number;
  };
}

const CoordinatesField = ({ gameDetailsData }: CoordinatesFieldProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
      <div className="text-zinc-500">
        위도 (latitude):{" "}
        <span className="text-zinc-300 font-semibold">{gameDetailsData.latitude ?? "—"}</span>
      </div>
      <div className="text-zinc-500">
        경도 (longitude):{" "}
        <span className="text-zinc-300 font-semibold">{gameDetailsData.longitude ?? "—"}</span>
      </div>
    </div>
  );
};

export default CoordinatesField;
