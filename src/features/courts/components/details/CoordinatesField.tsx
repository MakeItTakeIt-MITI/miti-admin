interface CoordinatesFieldProps {
  gameDetailsData: {
    latitude?: number;
    longitude?: number;
  };
}

const CoordinatesField = ({ gameDetailsData }: CoordinatesFieldProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-[11px]">
      <div className="text-gray-400">
        latitude:{" "}
        <span className="text-gray-200">{gameDetailsData.latitude ?? "-"}</span>
      </div>
      <div className="text-gray-400">
        longitude:{" "}
        <span className="text-gray-200">
          {gameDetailsData.longitude ?? "-"}
        </span>
      </div>
    </div>
  );
};

export default CoordinatesField;
