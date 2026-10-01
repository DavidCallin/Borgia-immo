import { getTranslations } from "next-intl/server";

const keys = ["excellence", "intégrite", "confiance", "innovation", "Satisfaction client"] as const;

export default async function Profiles() {
  const t = await getTranslations("profiles");

  return (
    <section className="stats">
      <div className="wrap">
        <div className="head rv">
          <span className="eyebrow">{t("eyebrow")}</span>
          <h2>{t("title")}</h2>
        </div>
        <div className="profiles">
          {keys.map((k, i) => {
            const item = t.raw(`items.${k}`) as { title: string; desc: string };
            return (
              <div key={k} className="pf rv" style={{ "--d": `${i * 0.08}s` } as any}>
                <span className="eyebrow">{k}</span>
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