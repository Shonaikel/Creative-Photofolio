import { useState } from "react";
import { useInView } from "../hooks/useInView";

type Category = "ALL" | "PORTRAIT" | "ABSTRACT" | "WEDDING" | "NATURE";

const categories: Category[] = ["ALL", "PORTRAIT", "ABSTRACT", "WEDDING", "NATURE"];

interface GalleryItem {
  src: string;
  category: Exclude<Category, "ALL">;
  colStart: number;
  height: number;
}

const galleryItems: GalleryItem[] = [
  { src: "/images/gallery-1.jpg",  category: "PORTRAIT", colStart: 1, height: 412 },
  { src: "/images/gallery-5.jpg",  category: "PORTRAIT", colStart: 1, height: 200 },
  { src: "/images/gallery-13.jpg", category: "PORTRAIT", colStart: 1, height: 200 },
  { src: "/images/gallery-25.jpg", category: "PORTRAIT", colStart: 1, height: 412 },
  { src: "/images/gallery-14.jpg", category: "NATURE",   colStart: 1, height: 200 },
  { src: "/images/gallery-20.jpg", category: "WEDDING",  colStart: 1, height: 513 },
  { src: "/images/gallery-9.jpg",  category: "PORTRAIT", colStart: 1, height: 523 },
  { src: "/images/carousel-yosemite.jpg", category: "NATURE",   colStart: 1, height: 412 },

  { src: "/images/gallery-2.jpg",  category: "NATURE",   colStart: 2, height: 412 },
  { src: "/images/gallery-6.jpg",  category: "NATURE",   colStart: 2, height: 412 },
  { src: "/images/gallery-12.jpg", category: "WEDDING",  colStart: 2, height: 200 },
  { src: "/images/gallery-18.jpg", category: "NATURE",   colStart: 2, height: 412 },
  { src: "/images/gallery-24.jpg", category: "WEDDING",  colStart: 2, height: 412 },
  { src: "/images/gallery-8.jpg",  category: "WEDDING",  colStart: 2, height: 412 },
  { src: "/images/gallery-11.jpg", category: "ABSTRACT", colStart: 2, height: 200 },
  { src: "/images/carousel-algarve.jpg",  category: "NATURE",   colStart: 2, height: 412 },

  { src: "/images/gallery-3.jpg",  category: "ABSTRACT", colStart: 3, height: 624 },
  { src: "/images/gallery-21.jpg", category: "PORTRAIT", colStart: 3, height: 412 },
  { src: "/images/gallery-17.jpg", category: "PORTRAIT", colStart: 3, height: 412 },
  { src: "/images/gallery-22.jpg", category: "NATURE",   colStart: 3, height: 624 },
  { src: "/images/gallery-16.jpg", category: "WEDDING",  colStart: 3, height: 412 },
  { src: "/images/carousel-alps.jpg",     category: "NATURE",   colStart: 3, height: 412 },

  { src: "/images/gallery-4.jpg",  category: "WEDDING",  colStart: 4, height: 412 },
  { src: "/images/gallery-7.jpg",  category: "ABSTRACT", colStart: 4, height: 200 },
  { src: "/images/gallery-10.jpg", category: "NATURE",   colStart: 4, height: 412 },
  { src: "/images/gallery-15.jpg", category: "ABSTRACT", colStart: 4, height: 412 },
  { src: "/images/gallery-19.jpg", category: "ABSTRACT", colStart: 4, height: 200 },
  { src: "/images/gallery-23.jpg", category: "ABSTRACT", colStart: 4, height: 412 },
  { src: "/images/gallery-26.jpg", category: "NATURE",   colStart: 4, height: 412 },
  { src: "/images/carousel-newyork.jpg",  category: "ABSTRACT", colStart: 4, height: 412 },
];

function distributeToColumns(items: GalleryItem[], colCount: number): GalleryItem[][] {
  const cols: GalleryItem[][] = Array.from({ length: colCount }, () => []);
  items.forEach((item, i) => {
    cols[i % colCount].push(item);
  });
  return cols;
}

export default function GallerySection() {
  const [activeCategory, setActiveCategory] = useState<Category>("ALL");
  const [ref, inView] = useInView({ threshold: 0.08 });

  const filteredItems =
    activeCategory === "ALL"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

  const desktopColumns =
    activeCategory === "ALL"
      ? [1, 2, 3, 4].map((col) => galleryItems.filter((item) => item.colStart === col))
      : distributeToColumns(filteredItems, 4);

  const tabletColumns = distributeToColumns(filteredItems, 3);
  const mobileColumns = distributeToColumns(filteredItems, 2);

  return (
    <section id="gallery" className="relative w-full bg-[var(--bg-page)]">
      <div ref={ref} className={`container-custom pt-10 md:pt-[64px] pb-8 md:pb-[48px] anim-fade-up ${inView ? "in-view" : ""}`}>
        <div className="flex items-center justify-start sm:justify-center gap-2 sm:gap-3 md:gap-[16px] mb-8 md:mb-[48px] overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 sm:px-5 md:px-[24px] h-[36px] md:h-[42px] rounded-full font-inter font-semibold text-[13px] md:text-[16px] leading-[24px] border border-solid cursor-pointer transition-all duration-200 whitespace-nowrap shrink-0 ${
                  isActive
                    ? "bg-[var(--accent)] border-[var(--accent)] text-white"
                    : "bg-transparent border-[var(--border-color)] text-[var(--text-body)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {filteredItems.length === 0 ? (
          <p className="text-center py-16 font-inter text-[var(--text-body)]">
            No images in this category.
          </p>
        ) : (
          <>
            <div key={`m-${activeCategory}`} className="flex gap-2 sm:gap-3 md:hidden">
              {mobileColumns.map((colItems, colIndex) => (
                <div key={colIndex} className="flex flex-col gap-2 sm:gap-3 flex-1">
                  {colItems.map((item, rowIndex) => (
                    <div
                      key={`m-${activeCategory}-${colIndex}-${rowIndex}`}
                      className="gallery-item relative w-full rounded-[8px] overflow-hidden group"
                      style={{
                        height: `${Math.round(item.height * 0.45)}px`,
                        animationDelay: `${(colIndex + rowIndex * 2) * 40}ms`,
                      }}
                    >
                      <img
                        src={item.src}
                        alt=""
                        className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>

            <div key={`t-${activeCategory}`} className="hidden md:flex lg:hidden gap-3">
              {tabletColumns.map((colItems, colIndex) => (
                <div key={colIndex} className="flex flex-col gap-3 flex-1">
                  {colItems.map((item, rowIndex) => (
                    <div
                      key={`t-${activeCategory}-${colIndex}-${rowIndex}`}
                      className="gallery-item relative w-full rounded-[10px] overflow-hidden group"
                      style={{
                        height: `${Math.round(item.height * 0.65)}px`,
                        animationDelay: `${(colIndex + rowIndex * 3) * 40}ms`,
                      }}
                    >
                      <img
                        src={item.src}
                        alt=""
                        className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                    </div>
                  ))}
                </div>
              ))}
            </div>

            <div key={`d-${activeCategory}`} className="hidden lg:flex gap-3 xl:gap-[12px]">
              {desktopColumns.map((colItems, colIndex) => (
                <div key={colIndex} className="flex flex-col gap-3 xl:gap-[12px] flex-1">
                  {colItems.map((item, rowIndex) => (
                    <div
                      key={`d-${activeCategory}-${colIndex}-${rowIndex}`}
                      className="gallery-item relative w-full rounded-[10px] overflow-hidden group"
                      style={{
                        height: `${item.height}px`,
                        animationDelay: `${(colIndex + rowIndex * 4) * 35}ms`,
                      }}
                    >
                      <img
                        src={item.src}
                        alt=""
                        className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
