import { useInView } from "../hooks/useInView";

const socialLinks = [
  { icon: "/images/icon-instagram.svg", label: "Instagram", href: "#" },
  { icon: "/images/icon-linkedin.svg", label: "LinkedIn", href: "#" },
  { icon: "/images/icon-twitter.svg", label: "Twitter", href: "#" },
  { icon: "/images/icon-dribbble.svg", label: "Dribbble", href: "#" },
];

export default function Footer() {
  const [ref, inView] = useInView({ threshold: 0.2 });

  return (
    <footer className="relative w-full border-t border-solid bg-[var(--bg-footer)] border-[var(--border-color)]">
      <div ref={ref} className={`container-custom pt-8 md:pt-[49px] pb-8 md:pb-[48px] anim-fade-up ${inView ? "in-view" : ""}`}>
        <div className="flex flex-col gap-8 md:gap-[32px]">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 md:gap-4">

            {/* Name + tagline */}
            <div className="flex flex-col gap-1 items-center md:items-start">
              <p className="font-inter font-bold text-[20px] md:text-[24px] leading-[32px] text-[var(--text-heading)]">
                Jennie Rodga
              </p>
              <p className="font-inter font-normal text-[13px] md:text-[14px] leading-[20px] text-[var(--text-body)]">
                Photographer :)
              </p>
            </div>

            {/* Social icons */}
            <div className="flex justify-center gap-3 md:gap-[16px]">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-[36px] h-[36px] md:w-[40px] md:h-[40px] rounded-full flex items-center justify-center transition-opacity hover:opacity-80 bg-[var(--bg-social)]"
                  aria-label={social.label}
                >
                  <img
                    src={social.icon}
                    alt=""
                    className="w-[16px] h-[16px] md:w-[18px] md:h-[18px]"
                  />
                </a>
              ))}
            </div>

            {/* Contact info */}
            <div className="flex flex-col gap-1 items-center md:items-end">
              <p className="font-inter font-normal text-[13px] md:text-[14px] leading-[20px] text-[var(--text-heading)]">
                www.Jenrodga.com
              </p>
              <p className="font-inter font-normal text-[13px] md:text-[14px] leading-[20px] text-[var(--text-body)]">
                Jenrodga@example.com
              </p>
              <p className="font-inter font-normal text-[13px] md:text-[14px] leading-[20px] text-[var(--text-body)]">
                Based in New York
              </p>
            </div>
          </div>

          <div className="border-t border-solid pt-6 md:pt-[33px] border-[var(--border-color)]">
            <p className="font-inter font-normal text-[11px] md:text-[12px] leading-[16px] text-center text-[var(--text-body)]">
              © 2026 Jennie Rodga Photography. All rights reserved.
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
}
