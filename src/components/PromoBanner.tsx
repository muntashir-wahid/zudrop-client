import { useEffect, useState } from "react";

type Slide = {
  title: string;
  description: string;
  image: string;
  alt: string;
};

const slides: Slide[] = [
  {
    title: "Clean lines, live drops",
    description: "Minimal styling and fresh stock, updated in real time.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/a/ae/An_Adidas_shoe.jpg",
    alt: "White Adidas sneaker with three stripes",
  },
  {
    title: "Classic silhouettes",
    description:
      "Simple, familiar sneakers that keep the focus on the product.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/a/a8/A_classic_Black_pair_of_Converse_All_Stars_resting_on_the_Black_%26_White_Ed._Shoebox_%281998-2002%29.JPG",
    alt: "Pair of black Converse high-top sneakers on a shoebox",
  },
  {
    title: "Built for everyday wear",
    description: "A practical carousel for the latest drops and stock changes.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/7/7a/Shoes_sport-right.png",
    alt: "Beige athletic sneaker on a white background",
  },
];

const AUTOPLAY_MS = 5000;

export default function PromoBanner() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) {
      return;
    }

    const interval = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % slides.length);
    }, AUTOPLAY_MS);

    return () => window.clearInterval(interval);
  }, [isPaused]);

  return (
    <section
      className="overflow-hidden rounded-3xl border border-[#e5dfd6] bg-white shadow-[0_10px_24px_rgba(17,24,39,0.06)]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Featured sneaker banner"
    >
      <div className="relative h-65 sm:h-80">
        <div
          className="flex h-full transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {slides.map((slide) => (
            <div key={slide.title} className="relative h-full min-w-full">
              <img
                src={slide.image}
                alt={slide.alt}
                className="h-full w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/15" />

              <div className="absolute inset-x-4 bottom-4 sm:inset-x-6 sm:bottom-6">
                <div className="max-w-xl rounded-2xl border border-white/40 bg-white/90 p-4 shadow-lg backdrop-blur-sm sm:p-5">
                  <p className="mb-1 text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">
                    Featured sneakers
                  </p>
                  <h2 className="text-lg font-bold tracking-tight text-slate-900 sm:text-xl">
                    {slide.title}
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {slide.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="absolute bottom-4 right-4 flex items-center gap-2">
          {slides.map((slide, index) => (
            <button
              key={slide.title}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`h-2.5 rounded-full border transition-all duration-200 ${
                index === activeIndex
                  ? "w-7 border-slate-900 bg-slate-900"
                  : "w-2.5 border-white/70 bg-white/80"
              }`}
              aria-label={`Show slide ${index + 1}`}
              aria-pressed={index === activeIndex}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
