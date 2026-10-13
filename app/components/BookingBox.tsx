"use client";
import { useState, type CSSProperties } from "react";
import { useLocale, useTranslations } from "next-intl";
import { WHATSAPP } from "@/lib/contact";

const MIN = 1;
const MAX = 30;
const MAJOR = new Set([1, 5, 10, 15, 20, 25, 30]);
const NIGHTS = Array.from({ length: MAX - MIN + 1 }, (_, i) => MIN + i);

type Props = { title: string; amount: number; note?: string; url: string };

export default function BookingBox({ title, amount, note, url }: Props) {
  const t = useTranslations("biens");
  const locale = useLocale();
  const [nights, setNights] = useState(MIN);

  // Espaces normaux (pas insécables) pour un message WhatsApp propre.
  const fmt = (n: number) =>
    new Intl.NumberFormat(locale === "fr" ? "fr-FR" : "en-US")
      .format(n)
      .replace(/[\u202f\u00a0]/g, " ");

  const total = amount * nights;
  const message = t("booking.message", { title, count: nights, price: fmt(total), url });
  const href = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`;
  const pct = `${((nights - MIN) / (MAX - MIN)) * 100}%`;

  return (
    <div className="book">
      <div>
        <span className="price">{fmt(amount)} FCFA</span> {t("units.night")}
      </div>
      {note ? <p className="am">{note}</p> : null}

      <label className="book-label" htmlFor="nights">
        {t("booking.label")}
      </label>
      <output className="book-nights" htmlFor="nights">
        {t("booking.nights", { count: nights })}
      </output>

      <div className="range-wrap">
        <input
          id="nights"
          type="range"
          className="range"
          min={MIN}
          max={MAX}
          step={1}
          value={nights}
          onChange={(e) => setNights(Number(e.target.value))}
          aria-valuetext={t("booking.nights", { count: nights })}
          style={{ "--pct": pct } as CSSProperties}
        />
        <div className="ticks" aria-hidden="true">
          {NIGHTS.map((n) => (
            <i key={n} data-n={n} className={MAJOR.has(n) ? "major" : undefined} />
          ))}
        </div>
      </div>

      <div className="book-total" aria-live="polite">
        <span>{t("booking.estimate")}</span>
        <strong>{fmt(total)} FCFA</strong>
      </div>
      <span> {t("cta.nb")}</span>
      <a className="btn" href={href} target="_blank" rel="noopener noreferrer">
        {t("cta.stay")}
      </a>
    </div>
  );
}