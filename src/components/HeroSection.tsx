import { useInView } from "../hooks/useInView";

export default function HeroSection() {
  const year = new Date().getFullYear();
  const [ref, inView] = useInView({ delay: 1400 });

  return (
    <section id="home" className="relative w-full overflow-hidden">
      <div className="container-custom px-6 md:px-10 lg:px-16 py-3 md:py-5 lg:py-[48px]">
        <div ref={ref} className="max-w-[1100px] mx-auto flex flex-col md:flex-row items-start justify-between gap-3 md:gap-16 lg:gap-15">

          {/* LEFT: all decorative elements as a single scalable SVG */}
          <div className={`w-full md:w-[55%] px-4 md:px-0 anim-fade-left ${inView ? "in-view" : ""}`}>
            <svg
              viewBox="0 0 480 350"
              width="100%"
              className="block h-auto"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* "Graphic" vertical label — centered beside Port */}
              <text
                x="-147" y="95"
                transform="rotate(-90, 18, 95)"
                fontFamily="Inter, sans-serif"
                fontWeight="300"
                fontSize="13"
                letterSpacing="5.6"
                fill="var(--text-heading)"
                textAnchor="middle"
              >Creative</text>

              {/* Port */}
              <text
                x="0" y="162"
                fontFamily="'Space Grotesk', sans-serif"
                fontWeight="700"
                fontSize="200"
                letterSpacing="1"
                fill="var(--accent)"
              >Port</text>

              {/* Star — right side of Port row */}
              <image href="/images/star-vector.svg" x="400" y="90" width="55" height="66" />

              {/* folio — offset right to match original ml-[45px] at lg */}
              <text
                x="34" y="308"
                fontFamily="'Space Grotesk', sans-serif"
                fontWeight="700"
                fontSize="200"
                letterSpacing="1"
                fill="var(--accent)"
              >folio</text>

              {/* "Designer" vertical label — centered beside folio */}
              <text
                x="45" y="246"
                transform="rotate(-90, 35, 248)"
                fontFamily="Inter, sans-serif"
                fontWeight="300"
                fontSize="13"
                letterSpacing="5.6"
                fill="var(--text-heading)"
                textAnchor="middle"
              >Photography</text>

              {/* Year version — bottom-right of the composition */}
              <text
                x="330" y="330"
                fontFamily="Inter, sans-serif"
                fontWeight="400"
                fontSize="20"
                fill="var(--text-version)"
              >{year} Version.</text>

              {/* Decorative masking rect — covers folio/star overlap at large sizes */}
              <rect
                x="225" y="136"
                width="75" height="20"
                transform="rotate(-30, 309, 162)"
                fill="var(--bg-page)"
              />
            </svg>
          </div>

          {/* RIGHT: Jennie heading + bio */}
          <div
            className={`w-full md:w-auto flex flex-col max-w-[450px] my-auto anim-fade-right ${inView ? "in-view" : ""}`}
            style={{ transitionDelay: inView ? "150ms" : "0ms" }}
          >
            <p className="font-playfair font-semibold italic text-[48px] sm:text-[64px] md:text-[56px] lg:text-[80px] xl:text-[105px] leading-[1] whitespace-nowrap text-[var(--jennie-color)]">
              Jennie
            </p>
            <p className="mt-4 lg:mt-6 xl:mt-[32px] font-inter text-[14px] md:text-[13px] lg:text-[15px] xl:text-[16px] leading-[22px] lg:leading-[26px] max-w-[447px] text-[var(--text-body)] opacity-90">
              I am a professional freelance photographer specializing in creative, lifestyle, and commercial work. I bring a versatile
              approach, a strong artistic vision, and a keen eye for detail to every project. Passionate about storytelling through imagery, I
              collaborate closely with brands and creatives to craft polished, engaging, and visually compelling content that truly connects with audiences.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
