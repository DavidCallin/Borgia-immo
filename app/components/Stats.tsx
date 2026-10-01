"use client";
import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

const stats = [
  { to: 4, key: "services" },
  { to: 5, key: "cities" },
  { to: 2, key: "countries" },
  { to: 10, key: "biens" },
];

function Counter({ to }: { to: number }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          const t0 = performance.now();
          const tick = (t: number) => {
            const p = Math.min((t - t0) / 1400, 1);
            setVal(Math.round(to * p));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.15 }
    );
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, [to]);

  return <span ref={ref}>{val}</span>;
}

export default function Stats() {
  const t = useTranslations("stats");

  return (
    <section className="stats">
      <div className="wrap stats-grid">
        {stats.map((s, i) => (
          <div key={i} className="rv">
            <div className="sn">+ <Counter to={s.to} /></div>
            <div className="sl">{t(s.key as any)}</div>
          </div>
        ))}
      </div>
    </section>
  );
}