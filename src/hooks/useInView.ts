import { useEffect, useRef, useState } from "react";

export function useInView(options?: { threshold?: number; delay?: number }) {
  const { threshold = 0.12, delay = 0 } = options ?? {};
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let tid: ReturnType<typeof setTimeout>;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          tid = setTimeout(() => setInView(true), delay);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => { observer.disconnect(); clearTimeout(tid); };
  }, [threshold, delay]);

  return [ref, inView] as const;
}
