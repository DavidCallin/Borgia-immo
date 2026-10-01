import { getTranslations } from "next-intl/server";

export default async function Avis() {
  const t = await getTranslations("avis");
  const items = t.raw("items") as Array<{
    initials: string; name: string; role: string; text: string;
  }>;

  return (
    <section id="avis">
      <div className="wrap">
        <div className="head rv">
          <span className="eyebrow">{t("eyebrow")}</span>
          <h2>{t("title")}</h2>
        </div>
        <div className="grid3">
          {items.map((a, i) => (
            <div key={i} className="tm rv" style={{ "--d": `${i * 0.1}s` } as any}>
              <div className="stars">★★★★★</div>
              <p>{a.text}</p>
              <div className="who">
                <div className="av">{a.initials}</div>
                <div>
                  <b>{a.name}</b>
                  <small>{a.role}</small>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}