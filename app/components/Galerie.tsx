"use client";
import { useMemo, useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import {
  properties,
  CATEGORY_ORDER,
  categoryKey,
  copyOf,
  type CategoryKey,
} from "@/lib/biens";

const PAGE = 12;

type Tile = { src: string; slug: string; title: string; n: number; cat: CategoryKey };

export default function Galerie() {
  const t = useTranslations("galerie");
  const tb = useTranslations("biens");
  const locale = useLocale();
  const [f, setF] = useState<"all" | CategoryKey>("all");
  const [shown, setShown] = useState(PAGE);

  // Toutes les photos de tous les biens, en alternant les biens :
  // la 1re photo de chaque bien d'abord, puis la 2e, etc.
  const tiles = useMemo<Tile[]>(() => {
    const maxN = Math.max(0, ...properties.map((p) => p.images.length));
    const out: Tile[] = [];
    for (let i = 0; i < maxN; i++) {
      for (const p of properties) {
        const src = p.images[i];
        if (!src) continue;
        out.push({
          src,
          slug: p.slug,
          title: copyOf(p, locale).title,
          n: i + 1,
          cat: categoryKey(p),
        });
      }
    }
    return out;
  }, [locale]);

  const categories = useMemo(
    () => CATEGORY_ORDER.filter((k) => properties.some((p) => categoryKey(p) === k)),
    [],
  );

  const filtered = f === "all" ? tiles : tiles.filter((x) => x.cat === f);
  const visible = filtered.slice(0, shown);

  const choose = (k: "all" | CategoryKey) => {
    setF(k);
    setShown(PAGE);
  };

  return (
    <section id="galerie">
      <div className="wrap">
        <div className="head rv">
          <span className="eyebrow">{t("eyebrow")}</span>
          <h2>{t("title")}</h2>
          <p>{t("subtitle")}</p>
        </div>

        <div className="filters rv" role="group" aria-label={tb("categoryLabel")}>
          {(["all", ...categories] as const).map((k) => (
            <button
              key={k}
              type="button"
              className={f === k ? "on" : undefined}
              aria-pressed={f === k}
              onClick={() => choose(k)}
            >
              {tb(`categories.${k}`)}
            </button>
          ))}
        </div>

        <div className="gal rv">
          {visible.map((it) => (
            <Link
              key={`${it.slug}-${it.n}`}
              href={`/biens/${it.slug}`}
              className="g"
              aria-label={it.title}
            >
              <Image
                src={it.src}
                alt={`${it.title} (${it.n})`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 900px) 50vw, 270px"
              />
              <span className="cap">{it.title}</span>
            </Link>
          ))}
        </div>

        {shown < filtered.length && (
          <button
            type="button"
            className="btn ghost more"
            onClick={() => setShown((n) => n + PAGE)}
          >
            {t("more")}
          </button>
        )}
      </div>
    </section>
  );
}