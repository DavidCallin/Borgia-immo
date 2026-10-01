import { getTranslations } from "next-intl/server";

const icons: Record<string, string> = {
  immo: "M3 12l9-9 9 9M5 10v10h14V10",
  tourisme: "M12 2a7 7 0 017 7c0 5-7 13-7 13S5 14 5 9a7 7 0 017-7z",
  vehicules: "M3 13l2-6h14l2 6M5 13h14v6H5z",
  deco: "M4 20l8-16 8 16M8 14h8",
};

export default async function Services() {
  const t = await getTranslations("services");
  const keys = ["immo", "tourisme", "vehicules", "deco"] as const;

  return (
    <section id="services" className="services">
      <div className="wrap">
        <div className="head rv">
          <span className="eyebrow">{t("eyebrow")}</span>
          <h2>{t("title")}</h2>
          <p>{t("subtitle")}</p>
        </div>
        <div className="grid4">
          {keys.map((k, i) => {
            const item = t.raw(`items.${k}`) as { title: string; desc: string };
            return (
              <div key={k} className="svc rv" style={{ "--d": `${i * 0.08}s` } as any}>
                <svg viewBox="0 0 24 24">
                  <path d={icons[k]} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}