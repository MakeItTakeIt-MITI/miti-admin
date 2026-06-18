import { useEffect, useMemo, useState } from "react";

interface CourtDetailsImgCardProps {
  gameDetailsData: {
    name: string;
    images: string[];
  };
}

const CourtDetailsImgCard = ({ gameDetailsData }: CourtDetailsImgCardProps) => {
  const images = useMemo(() => gameDetailsData.images ?? [], [gameDetailsData.images]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index >= images.length) setIndex(Math.max(0, images.length - 1));
  }, [images, index]);

  const prev = () => setIndex((i) => Math.max(0, i - 1));
  const next = () => setIndex((i) => Math.min(images.length - 1, i + 1));

  if (images.length === 0) {
    return (
      <div className="flex h-64 w-full flex-col items-center justify-center gap-2 bg-zinc-900 md:h-80">
        <svg
          className="size-10 text-zinc-700"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <p className="text-pretty text-sm text-zinc-500 font-medium">등록된 이미지가 없습니다</p>
      </div>
    );
  }

  return (
    <div className="relative w-full">
      {/* Main image */}
      <div className="relative h-64 w-full overflow-hidden bg-zinc-900 md:h-96">
        <img
          key={index}
          src={images[index]}
          alt={`${gameDetailsData.name} ${index + 1}`}
          className="h-full w-full object-cover"
        />

        {/* Prev */}
        {index > 0 && (
          <button
            onClick={prev}
            aria-label="이전 이미지"
            className="absolute left-3 top-1/2 -translate-y-1/2 flex size-9 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
          >
            <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        )}

        {/* Next */}
        {index < images.length - 1 && (
          <button
            onClick={next}
            aria-label="다음 이미지"
            className="absolute right-3 top-1/2 -translate-y-1/2 flex size-9 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
          >
            <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}

        {/* Counter */}
        {images.length > 1 && (
          <div className="absolute bottom-3 right-3 rounded-full bg-black/60 px-2.5 py-1 text-[11px] font-mono text-zinc-300">
            {index + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto bg-zinc-950 p-3">
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`이미지 ${i + 1} 보기`}
              className={`size-14 flex-shrink-0 overflow-hidden rounded border-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-zinc-500 transition-all ${
                i === index ? "border-white" : "border-transparent opacity-50 hover:opacity-90"
              }`}
            >
              <img src={src} alt={`썸네일 ${i + 1}`} className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CourtDetailsImgCard;
