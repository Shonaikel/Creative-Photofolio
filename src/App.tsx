import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import TopWorksSection from "./components/TopWorksSection";
import AboutMeSection from "./components/AboutMeSection";
import GallerySection from "./components/GallerySection";
import ContactMeSection from "./components/ContactMeSection";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="relative w-full mx-auto overflow-hidden pt-[64px] md:pt-[80px]">
      <Header />
      <HeroSection />
      <TopWorksSection />
      <AboutMeSection />
      <GallerySection />
      <ContactMeSection />
      <Footer />
    </div>
  );
}

export default App;
