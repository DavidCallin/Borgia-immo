import { getTranslations } from "next-intl/server";

export default async function FAQ() {
  const t = await getTranslations("faq");
  const items = t.raw("items") as Array<{ q: string; a: string }>;

  return (
    <section id="faq">
      <div className="wrap">
        <div className="head rv">
          <span className="eyebrow">{t("eyebrow")}</span>
          <h2>{t("title")}</h2>
        </div>
        <div className="faq">
          {items.map((f, i) => (
            <details key={i} className="rv">
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}