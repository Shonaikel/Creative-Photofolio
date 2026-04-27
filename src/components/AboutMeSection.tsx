import { useInView } from "../hooks/useInView";

const stats = [
  { icon: "/images/icon-camera.svg", value: "500+", label: "Projects Completed" },
  { icon: "/images/icon-award.svg", value: "15", label: "Awards Won" },
  { icon: "/images/icon-clients.svg", value: "200+", label: "Happy Clients" },
  { icon: "/images/icon-globe.svg", value: "25", label: "Countries Visited" },
];

export default function AboutMeSection() {
  const [ref, inView] = useInView();

  return (
    <section id="about" className="relative w-full bg-[var(--bg-page)]">
      <div className="container-custom py-12 md:py-16 lg:py-[80px]">
        <div ref={ref} className="flex flex-col md:flex-row gap-8 md:gap-[32px] lg:gap-[64px]">
          <div className={`relative w-full md:w-[44%] lg:w-[48%] xl:w-[608px] shrink-0 md:flex md:flex-col anim-fade-left ${inView ? "in-view" : ""}`}>
            <div className="relative w-full aspect-[611/600] md:aspect-auto md:flex-1 md:min-h-0 rounded-[18px] overflow-hidden">
              <img
                src="/images/about-photo.jpg"
                alt="Jennie Rodriguez"
                className="absolute left-0 w-full h-[153%] object-cover pointer-events-none top-[-31%]"
              />
              <div className="absolute inset-0 rounded-[18px] photo-fade-overlay" />
            </div>

            <div className="relative -mt-20 mx-4 sm:mx-6 md:mx-8 rounded-[14px] border border-solid px-4 sm:px-6 py-5 flex flex-col gap-[8px] z-10 bg-[var(--bg-card-overlay)] border-[var(--border-color)] shadow-[var(--overlay-card-shadow)]">
              <p className="font-inter font-bold text-[20px] md:text-[24px] leading-[32px] text-[var(--text-heading)]">
                Jennie Rodriguez
              </p>
              <p className="font-inter font-semibold text-[14px] md:text-[16px] leading-[24px] text-[var(--accent)]">
                Creative Photographer &amp; Visual Artist
              </p>
              <p className="font-inter font-normal text-[13px] md:text-[14px] leading-[20px] max-w-[425px] text-[var(--text-body)]">
                Capturing moments that tell stories. Based in New York, working
                worldwide.
              </p>
            </div>
          </div>

          <div
            className={`flex flex-col gap-6 md:gap-8 lg:gap-[32px] flex-1 anim-fade-right ${inView ? "in-view" : ""}`}
            style={{ transitionDelay: inView ? "150ms" : "0ms" }}
          >
            <div className="relative">
              <p className="font-inter font-semibold text-[13px] md:text-[14px] leading-[20px] tracking-[0.7px] text-[var(--accent)]">
                ABOUT ME
              </p>
              <p className="mt-2">
                <span className="font-inter font-bold text-[24px] sm:text-[28px] md:text-[32px] xl:text-[36px] leading-[1.15] text-[var(--text-heading)]">
                  Turning Vision Into{" "}
                </span>
                <span className="font-inter font-bold text-[24px] sm:text-[28px] md:text-[32px] xl:text-[36px] leading-[1.15] text-[var(--accent)]">
                  Reality
                </span>
              </p>
              <div className="mt-4 w-[60px] md:w-[80px] h-[4px] rounded-full bg-[var(--accent)]" />
            </div>

            <div className="flex flex-col gap-4">
              <p className="font-inter font-normal text-[14px] md:text-[15px] xl:text-[16px] leading-[24px] md:leading-[26px] text-[var(--text-body)]">
                With over 10 years of experience in photography and visual
                storytelling, I specialize in capturing the essence of people,
                places, and moments. My work is driven by a passion for creativity
                and a commitment to excellence.
              </p>
              <p className="font-inter font-normal text-[14px] md:text-[15px] xl:text-[16px] leading-[24px] md:leading-[26px] text-[var(--text-body)]">
                Every project is an opportunity to create something unique and
                meaningful. I believe in the power of visual communication to
                inspire, connect, and transform perspectives.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 md:gap-4 xl:gap-6">
              {stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className={`relative w-full h-[120px] sm:h-[130px] md:h-[140px] xl:h-[150px] rounded-[10px] border border-solid bg-[var(--bg-card)] border-[var(--border-color)] anim-fade-up ${inView ? "in-view" : ""}`}
                  style={{ transitionDelay: inView ? `${200 + i * 80}ms` : "0ms" }}
                >
                  <img
                    src={stat.icon}
                    alt=""
                    className="absolute top-4 left-4 md:top-[24px] md:left-[24px] w-[24px] h-[24px] md:w-[28px] md:h-[28px]"
                  />
                  <p className="absolute top-[50px] md:top-[64px] left-4 md:left-[24px] font-inter font-bold text-[22px] sm:text-[26px] xl:text-[30px] leading-[36px] text-[var(--text-heading)]">
                    {stat.value}
                  </p>
                  <p className="absolute top-[82px] md:top-[104px] left-4 md:left-[24px] font-inter font-normal text-[12px] md:text-[14px] leading-[20px] text-[var(--text-body)]">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
