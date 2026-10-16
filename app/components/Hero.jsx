"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { WHATSAPP } from "@/lib/contact";

// Photos du hero : à placer dans public/images/hero/ (indépendantes du JSON des biens).
// Pour ajouter ou retirer une diapositive, modifie simplement cette liste.
const slides = [
  {
    src: "/images/hero/hero-7.jpg",
    label: { fr: "Villa contemporaine — Cotonou", en: "Contemporary villa — Cotonou" },
  },
  {
    src: "/images/hero/hero-8.jpg",
    label: { fr: "Appartement standing — Wologuèdè", en: "Upscale apartment — Wologuèdè" },
  },
  // {
  //   src: "/images/hero/hero-3.jpg",
  //   label: { fr: "Terrain viabilisé — Calavi", en: "Serviced plot — Calavi" },
  // },
  // {
  //   src: "/images/hero/hero-4.jpg",
  //   label: { fr: "Terrain viabilisé — Calavi", en: "Serviced plot — Calavi" },
  // },
  // {
  //   src: "/images/hero/hero-5.jpg",
  //   label: { fr: "Terrain viabilisé — Calavi", en: "Serviced plot — Calavi" },
  // },
  // {
  //   src: "/images/hero/hero-6.jpg",
  //   label: { fr: "Terrain viabilisé — Calavi", en: "Serviced plot — Calavi" },
  // },
];

export default function Hero() {
  const lang = useLocale() === "en" ? "en" : "fr";
  const t = useTranslations("hero");
  const whatsappHref = `https://wa.me/${WHATSAPP}`;
  const [i, setI] = useState(0);

  useEffect(() => {
    if (slides.length < 2) return;
    const t = setInterval(() => setI((p) => (p + 1) % slides.length), 5500);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="top">
      <div className="slides">
        {slides.map((s, idx) => (
          <div
            key={s.src}
            className={`slide ${idx === i ? "on" : ""}`}
            aria-hidden={idx !== i}
          >
            <Image
              src={s.src}
              alt={s.label[lang]}
              fill
              sizes="100vw"
              priority={idx === 0}
            />
          </div>
        ))}
      </div>

      <div className="hero wrap">
        <span className="eyebrow up d1">{t("eyebrow")}</span>
        <h1 className="up d2">{t("title")}</h1>
        <p className="up d3">
          {t("subtitle")}
        </p>
        <div className="hero-btns up d4">
          <a
            className="btn"
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("heroCta.book")}
          </a>
          <a className="btn ghost" href="#biens">
            {t("heroCta.view")}
          </a>
        </div>
        <div className="chips up d5">
          <span><b>4</b> {t("chip1")}</span>
          <span><b>5</b> {t("chip2")}</span>
          <span><b>2</b> {t("chip3")}</span>
        </div>
      </div>

      {/* <span className="slide-cap">{slides[i].label[lang]}</span> */}

      <a
        href="#biens"
        className="scroll-cue"
        aria-label={lang === "en" ? "Scroll down" : "Défiler vers le bas"}
      />

      <div className="dots">
        {slides.map((s, idx) => (
          <button
            key={s.src}
            className={idx === i ? "on" : ""}
            onClick={() => setI(idx)}
            aria-label={`Slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}