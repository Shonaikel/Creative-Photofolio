import { useRef, useState } from "react";

const carouselImages = [
  { src: "/images/carousel-alps.jpg", label: "ALPS - SWITZERLAND" },
  { src: "/images/carousel-yosemite.jpg", label: "YOSEMITE - USA" },
  { src: "/images/carousel-newyork.jpg", label: "NEW YORK - TIME SQUARE" },
  { src: "/images/carousel-algarve.jpg", label: "ALGARVE - PORTUGAL" },
  { src: "/images/carousel-serengeti.jpg", label: "SERENGETI - TANZANIA" },
  { src: "/images/carousel-tokyo.jpg", label: "TOKYO - JAPAN" },
];

export default function TopWorksSection() {
  const [activeIndex, setActiveIndex] = useState(2);
  const [direction, setDirection] = useState<"next" | "prev">("prev");
  const blocked = useRef(false);
  const touchStartX = useRef<number | null>(null);

  const total = carouselImages.length;
  const active = carouselImages[activeIndex];

  const navigate = (newIndex: number, dir: "next" | "prev") => {
    if (blocked.current) return;
    blocked.current = true;
    setDirection(dir);
    setActiveIndex(newIndex);
    setTimeout(() => { blocked.current = false; }, 620);
  };

  const handlePrev = () => navigate((activeIndex - 1 + total) % total, "prev");
  const handleNext = () => navigate((activeIndex + 1) % total, "next");

  const handleClickSlide = (i: number, delta: number) => {
    if (delta === 0) return;
    navigate(i, delta > 0 ? "next" : "prev");
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    touchStartX.current = null;
  };

  const getDelta = (i: number) => {
    const raw = i - activeIndex;
    if (direction === "next") {
      return ((raw + 3 + total * 10) % total) - 3;
    }
    return ((raw + 2 + total * 10) % total) - 2;
  };

  return (
    <section className="relative w-full h-[480px] sm:h-[540px] md:h-[600px] lg:h-[660px] xl:h-[720px] 2xl:h-[760px] overflow-hidden">

      {/* Background blur */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="carousel-blur absolute top-[12.12%] right-[-40.9%] bottom-[10%] left-[-19.18%] blur-[50px] [mask-image:linear-gradient(to_bottom,transparent,black_30%,black_70%,transparent)] [-webkit-mask-image:linear-gradient(to_bottom,transparent,black_70%,black_70%,transparent)]">
          <img
            src="/images/carousel-bg-blur.png"
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="relative w-full h-full pt-[32px] md:pt-[44px] lg:pt-[56px] px-4 sm:px-6 md:px-8 lg:px-[44px]">
        <div
          className="carousel-stage relative w-full h-[360px] sm:h-[420px] md:h-[460px] lg:h-[520px] xl:h-[580px] 2xl:h-[620px]"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >

          {/* Slides */}
          {carouselImages.map((img, i) => {
            const delta = getDelta(i);
            const isCenter = delta === 0;
            const isVisible = Math.abs(delta) <= 2;

            return (
              <div
                key={i}
                data-delta={delta}
                onClick={() => handleClickSlide(i, delta)}
                className={`carousel-item group ${!isCenter && isVisible ? "cursor-pointer" : ""}`}
              >
                <img
                  src={img.src}
                  alt={img.label}
                  className={`absolute inset-0 w-full h-full object-cover pointer-events-none transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    isCenter
                      ? "group-hover:scale-[1.08]"
                      : isVisible
                      ? "group-hover:scale-[1.05]"
                      : ""
                  }`}
                />
                {isVisible && (
                  <div
                    className={`absolute inset-0 transition-colors duration-300 ${
                      isCenter
                        ? "bg-black/10 group-hover:bg-black/35"
                        : Math.abs(delta) === 1
                        ? "bg-black/30 group-hover:bg-black/15"
                        : "bg-black/55 group-hover:bg-black/35"
                    }`}
                  />
                )}
              </div>
            );
          })}

          {/* Text overlay — shifted slightly left */}
          <div
            key={activeIndex}
            className="carousel-text-overlay absolute inset-0 flex flex-col items-center justify-center z-[35] pointer-events-none"
          >
            <div className="-translate-x-8 md:-translate-x-29">
              <p className="font-inter font-bold text-[20px] sm:text-[28px] md:text-[38px] lg:text-[48px] text-white tracking-[0.9px] whitespace-nowrap drop-shadow-lg">
                {active.label.split(" - ")[0]}
              </p>

              <div className="flex items-center gap-2 mt-2 opacity-90">
                <div className="w-[16px] sm:w-[24px] md:w-[35px] h-[1px] bg-white" />
                <p className="font-inter text-[13px] sm:text-[18px] md:text-[26px] lg:text-[34px] text-white whitespace-nowrap drop-shadow-lg">
                  {active.label.includes(" - ") ? `- ${active.label.split(" - ")[1]}` : ""}
                </p>
              </div>

              <p className="font-inter italic text-[11px] sm:text-[12px] md:text-[14px] lg:text-[15px] text-white mt-2 opacity-75 drop-shadow-lg">
                Let your dreams come true
              </p>
            </div>
          </div>

          {/* Nav buttons */}
          <button
            onClick={handlePrev}
            aria-label="Previous slide"
            className="carousel-btn-prev size-[42px] md:size-[48px] rounded-full bg-white/10 flex items-center justify-center hover:bg-white/25 z-40"
          >
            <svg width="24" height="24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18L9 12L15 6" />
            </svg>
          </button>

          <button
            onClick={handleNext}
            aria-label="Next slide"
            className="carousel-btn-next size-[42px] md:size-[48px] rounded-full bg-white/10 flex items-center justify-center hover:bg-white/25 z-40"
          >
            <svg width="24" height="24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18L15 12L9 6" />
            </svg>
          </button>

        </div>
      </div>
    </section>
  );
}
