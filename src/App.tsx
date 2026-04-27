import { useEffect, useState } from "react";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import TopWorksSection from "./components/TopWorksSection";
import AboutMeSection from "./components/AboutMeSection";
import GallerySection from "./components/GallerySection";
import ContactMeSection from "./components/ContactMeSection";
import Footer from "./components/Footer";

function PageLoader() {
  return (
    <div className="page-loader fixed inset-0 z-[300] bg-[var(--bg-page)] flex flex-col items-center justify-center gap-5 pointer-events-none">
      <p className="page-loader-text">Photofolio</p>
      <div className="w-[120px] h-[2px] bg-[var(--border-color)] rounded-full overflow-hidden">
        <div className="page-loader-bar h-full bg-[var(--accent)] rounded-full" />
      </div>
    </div>
  );
}

function App() {
  const [loaderVisible, setLoaderVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoaderVisible(false), 1500);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      {loaderVisible && <PageLoader />}
      <div className="relative w-full mx-auto overflow-hidden pt-[64px] md:pt-[80px]">
        <Header />
        <HeroSection />
        <TopWorksSection />
        <AboutMeSection />
        <GallerySection />
        <ContactMeSection />
        <Footer />
      </div>
    </>
  );
}

export default App;
