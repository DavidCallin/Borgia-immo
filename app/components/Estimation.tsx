"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";

const base = {
  vente: { appt: 650000, villa: 550000, terrain: 70000 },
  location: { appt: 3200, villa: 2600, terrain: 0 },
};

export default function Estimation() {
  const t = useTranslations("estimation");
  const [tr, setTr] = useState<"vente" | "location">("vente");
  const [ty, setTy] = useState<"appt" | "villa" | "terrain">("appt");
  const [su, setSu] = useState("");

  const price = base[tr][ty] * (+su || 0);
  const display = !price
    ? t("onQuote")
    : `${Math.round(price).toLocaleString("fr-FR")} FCFA${tr === "location" ? " / mois" : ""}`;

  return (
    <section id="estimation">
      <div className="wrap">
        <div className="head rv">
          <span className="eyebrow">{t("eyebrow")}</span>
          <h2>{t("title")}</h2>
          <p>{t("subtitle")}</p>
        </div>
        <div className="estim rv">
          <div className="f">
            <div>
              <label>{t("transaction")}</label>
              <select value={tr} onChange={(e) => setTr(e.target.value as any)}>
                <option value="vente">{t("vente")}</option>
                <option value="location">{t("location")}</option>
              </select>
            </div>
            <div>
              <label>{t("type")}</label>
              <select value={ty} onChange={(e) => setTy(e.target.value as any)}>
                <option value="appt">{t("appt")}</option>
                <option value="villa">{t("villa")}</option>
                <option value="terrain">{t("terrain")}</option>
              </select>
            </div>
            <div>
              <label>{t("surface")}</label>
              <input
                type="number"
                value={su}
                onChange={(e) => setSu(e.target.value)}
                placeholder="—"
              />
            </div>
          </div>
          <div className="out">
            <div className="price">{display}</div>
            <small>{t("disclaimer")}</small>
          </div>
        </div>
      </div>
    </section>
  );
}