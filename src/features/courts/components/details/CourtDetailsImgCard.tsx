interface CourtDetailsImgCardProps {
  gameDetailsData: {
    name: string;
    images: string[];
  };
}

const CourtDetailsImgCard = ({ gameDetailsData }: CourtDetailsImgCardProps) => {
  if (gameDetailsData.images.length === 0) {
  }
  return (
    <div className="w-[600px] mx-auto  h-[360px]">
      {gameDetailsData.images.length === 0 ? (
        <div className="border border-[#fff] h-full flex flex-col items-center justify-center py-20 text-center">
          <p className="text-gray-500 text-sm">등록된 이미지가 없습니다.</p>
        </div>
      ) : (
        <img
          src={gameDetailsData.images[0]}
          alt={gameDetailsData.name}
          className="h-full w-full object-cover transition-transform duration-300 "
        />
      )}
    </div>
  );
};
export default CourtDetailsImgCard;
