import { useEffect, useState } from "react";

interface CourtDetailsImgCardProps {
  gameDetailsData: {
    name: string;
    images: string[];
  };
}

const CourtDetailsImgCard = ({ gameDetailsData }: CourtDetailsImgCardProps) => {
  const images = gameDetailsData.images ?? [];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index >= images.length) {
      setIndex(Math.max(0, images.length - 1));
    }
  }, [images, index]);

  const prev = () => setIndex((i) => Math.max(0, i - 1));
  const next = () => setIndex((i) => Math.min(images.length - 1, i + 1));
  const go = (i: number) => setIndex(i);

  return (
    <div className="w-[600px] mx-auto h-[360px]">
      {images.length === 0 ? (
        <div className="border border-[#fff] h-full flex flex-col items-center justify-center py-20 text-center">
          <p className="text-gray-500 text-sm">등록된 이미지가 없습니다.</p>
        </div>
      ) : (
        <div className="h-full w-full relative">
          {/* MAIN img */}
          <img
            src={images[index]}
            alt={`${gameDetailsData.name}-${index}`}
            className="h-full w-full object-cover transition-transform duration-300 rounded"
          />

          {/* Left/ Right Buttons */}
          <button
            onClick={prev}
            disabled={index === 0}
            aria-label="previous"
            className={`absolute left-2 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full bg-black/50 text-white flex items-center justify-center ${
              index === 0
                ? "opacity-40 cursor-not-allowed"
                : "hover:bg-black/60"
            }`}
          >
            ‹
          </button>
          <button
            onClick={next}
            disabled={index === images.length - 1}
            aria-label="next"
            className={`absolute right-2 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full bg-black/50 text-white flex items-center justify-center ${
              index === images.length - 1
                ? "opacity-40 cursor-not-allowed"
                : "hover:bg-black/60"
            }`}
          >
            ›
          </button>

          {/* thumbmails on center/bottom */}
          <div className="absolute left-1/2 -translate-x-1/2 bottom-3 w-[92%]">
            <div className="flex items-center justify-center gap-2 overflow-x-auto pb-1">
              {images.map((src, i) => (
                <button
                  key={i}
                  onClick={() => go(i)}
                  className={`h-14 w-20 flex-shrink-0 rounded overflow-hidden border-2 ${
                    i === index ? "border-blue-500" : "border-transparent"
                  } focus:outline-none`}
                >
                  <img
                    src={src}
                    alt={`thumb-${i}`}
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default CourtDetailsImgCard;
