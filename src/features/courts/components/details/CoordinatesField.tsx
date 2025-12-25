import React from "react";

const CoordinatesField = ({ display }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-[11px]">
      <div className="text-gray-400">
        latitude:{" "}
        <span className="text-gray-200">{display.latitude ?? "-"}</span>
      </div>
      <div className="text-gray-400">
        longitude:{" "}
        <span className="text-gray-200">{display.longitude ?? "-"}</span>
      </div>
    </div>
  );
};

export default CoordinatesField;
