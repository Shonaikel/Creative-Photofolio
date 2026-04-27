import { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext";

const NAV_LINKS = ["Home", "About", "Gallery", "Contact"];

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("home");
  const [clickedLink, setClickedLink] = useState<string | null>(null);

  useEffect(() => {
    const sectionIds = NAV_LINKS.map((l) => l.toLowerCase());
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActiveSection(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const handleLinkClick = (link: string) => {
    setClickedLink(link);
    setMenuOpen(false);
    window.setTimeout(() => setClickedLink(null), 350);
  };

  const linkColor = (link: string) => {
    const isActive = activeSection === link.toLowerCase();
    const clicked = clickedLink === link ? "nav-click-anim" : "";
    return isActive
      ? `text-[var(--accent)] [text-shadow:var(--hover-nav-glow)] ${clicked}`
      : `text-[var(--text-nav)] ${clicked}`;
  };

  return (
    <>
      {/* Header bar — always on top */}
      <header className="fixed top-0 left-0 right-0 z-[70] w-full border-b border-solid backdrop-blur-md bg-[var(--bg-header)] border-[var(--border-color)]">
        <div className="container-custom">
          <div className="flex items-center justify-between h-[64px] md:h-[80px]">
            <a
              href="#home"
              onClick={(e) => { e.preventDefault(); handleLinkClick("Home"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              className="font-inter font-bold text-[18px] md:text-[20px] leading-[28px] text-[var(--text-heading)] transition-all duration-300 hover:text-[var(--hover-title-color)] hover:[text-shadow:var(--hover-title-glow)]"
            >
              JenRodga
            </a>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-8 lg:gap-[48px]">
              {NAV_LINKS.map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  onClick={() => handleLinkClick(link)}
                  className={`font-inter font-semibold text-[14px] leading-[20px] transition-all duration-300 hover:text-[var(--hover-nav-color)] hover:[text-shadow:var(--hover-nav-glow)] ${linkColor(link)}`}
                >
                  {link}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-4">
              {/* Theme toggle */}
              <button
                onClick={toggleTheme}
                className="relative w-[48px] h-[24px] rounded-full bg-[var(--accent)] cursor-pointer flex items-center transition-all duration-300 shrink-0"
                aria-label="Toggle theme"
              >
                <span
                  className={`absolute w-[16px] h-[16px] bg-white rounded-full transition-all duration-300 ${
                    isDark ? "left-[28px]" : "left-[4px]"
                  }`}
                />
              </button>

              {/* Hamburger / X */}
              <button
                onClick={() => setMenuOpen((v) => !v)}
                className="md:hidden w-8 h-8 flex items-center justify-center cursor-pointer"
                aria-label="Toggle menu"
              >
                {menuOpen ? (
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="var(--text-heading)" strokeWidth="2" strokeLinecap="round">
                    <path d="M4 4L16 16M16 4L4 16" />
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="var(--text-heading)" strokeWidth="2" strokeLinecap="round">
                    <path d="M3 6h14M3 10h14M3 14h14" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={() => setMenuOpen(false)}
        className={`md:hidden fixed inset-0 z-[55] bg-black/50 transition-opacity duration-300 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Left drawer */}
      <nav
        aria-label="Mobile navigation"
        className={`md:hidden fixed top-0 left-0 h-full w-[75%] max-w-[280px] z-[60] flex flex-col bg-[var(--bg-page)] border-r border-solid border-[var(--border-color)] pt-[64px] transition-transform duration-300 ease-in-out ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {NAV_LINKS.map((link, i) => (
          <a
            key={link}
            href={`#${link.toLowerCase()}`}
            onClick={() => handleLinkClick(link)}
            className={`flex items-center justify-between px-6 py-4 font-inter font-semibold text-[15px] transition-all duration-300 hover:text-[var(--hover-nav-color)] hover:[text-shadow:var(--hover-nav-glow)] border-solid border-[var(--border-color)] ${
              i < NAV_LINKS.length - 1 ? "border-b" : ""
            } ${linkColor(link)}`}
          >
            <span>{link}</span>
            <svg
              width="16" height="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 4L10 8L6 12" />
            </svg>
          </a>
        ))}
      </nav>
    </>
  );
}
