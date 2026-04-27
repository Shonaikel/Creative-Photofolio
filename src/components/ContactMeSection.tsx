import { useInView } from "../hooks/useInView";

export default function ContactMeSection() {
  const [ref, inView] = useInView();

  return (
    <section id="contact" className="relative w-full bg-[var(--bg-page)]">
      <div className="container-custom py-12 md:py-16 lg:py-[80px]">
        <div ref={ref} className="flex flex-col md:flex-row w-full gap-10 md:gap-8 lg:gap-[46px] items-start">
          <div className={`relative w-full md:w-[50%] lg:w-[612px] lg:shrink-0 anim-fade-left ${inView ? "in-view" : ""}`}>
            <p className="font-inter font-bold text-[28px] md:text-[32px] xl:text-[36px] leading-[40px] text-[var(--accent)]">
              Contact Me
            </p>

            <div className="mt-6 md:mt-8 lg:mt-[34px] flex flex-col gap-4 lg:gap-[24px]">
              <p className="font-inter font-bold text-[32px] sm:text-[40px] md:text-[46px] xl:text-[53px] leading-[1.1] text-[var(--text-heading)]">
                Transforming <span className="text-[var(--accent)]">Ideas</span>
              </p>
              <p className="font-inter font-bold text-[32px] sm:text-[40px] md:text-[46px] xl:text-[53px] leading-[1.1] text-[var(--text-heading)]">
                Into Meaningful Reality
              </p>
            </div>

            <p className="mt-6 md:mt-8 lg:mt-[40px] font-inter font-normal text-[14px] md:text-[15px] xl:text-[16px] leading-[24px] md:leading-[26px] max-w-[600px] text-[var(--text-body)]">
              Every great project starts with an idea. I work closely with you to
              understand your vision and turn your concepts into compelling
              visuals, crafted with creativity and precision. From the first
              sketch to the final result, my goal is to deliver work that not
              only meets your expectations, but exceeds them.
            </p>

            <button className="mt-6 md:mt-8 lg:mt-[34px] block w-[80%] sm:w-[277px] mx-auto md:mx-0 h-[48px] md:h-[52px] rounded-[25px] bg-[var(--accent-cta)] font-inter font-medium text-[14px] leading-[20px] text-white tracking-[0.7px] uppercase cursor-pointer hover:opacity-90 transition-opacity">
              SEND MESSAGE
            </button>
          </div>

          <div
            className={`relative w-[90%] mx-auto md:w-full md:mx-0 md:flex-1 lg:max-w-[670px] aspect-[670/560] md:mt-[72px] lg:mt-0 anim-fade-right ${inView ? "in-view" : ""}`}
            style={{ transitionDelay: inView ? "150ms" : "0ms" }}
          >
            <div className="absolute left-[3.73%] top-[4.82%] w-[52.84%] h-[88.57%] rounded-[18px] overflow-hidden shadow-[0_4px_4px_0_rgba(0,0,0,0.5)]">
              <img
                src="/images/contact-photo-1.jpg"
                alt="Photographer at work"
                className="absolute inset-0 w-full h-full object-cover pointer-events-none brightness-[0.55]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />
            </div>

            <div className="absolute left-[40.7%] top-0 w-[59.70%] h-[94.64%] rounded-[18px] overflow-hidden">
              <img
                src="/images/contact-photo-2.jpg"
                alt="Photographer portrait"
                className="absolute inset-0 w-full h-full object-cover pointer-events-none brightness-[0.8]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
