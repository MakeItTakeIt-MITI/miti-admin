interface CourtDetailsImgCardProps {
  idx: number;
  imgs: string[];
  display: {
    name: string;
  };
  prev: () => void;
  next: () => void;
}

const CourtDetailsImgCard = ({
  idx,
  imgs,
  display,
  prev,
  next,
}: CourtDetailsImgCardProps) => {
  return (
    <div className="relative bg-gray-800 w-full max-w-md mx-auto aspect-[4/3]">
      <img
        src={imgs[idx]}
        alt={display.name}
        className="h-full w-full object-cover transition-transform duration-300 "
      />
      {imgs.length > 1 && (
        <>
          <button
            type="button"
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70"
            aria-label="Previous image"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70"
            aria-label="Next image"
          >
            ›
          </button>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
            {imgs.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 w-1.5 rounded-full ${
                  i === idx ? "bg-white" : "bg-white/40"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
export default CourtDetailsImgCard;
