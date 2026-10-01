import { getTranslations } from "next-intl/server";

export default async function Biens() {
  const t = await getTranslations("biens");
  const items = t.raw("items") as Array<{
    tag: string; title: string; loc: string; meta: string;
    price: string; extra: string; bg: string;
  }>;

  return (
    <section id="biens">
      <div className="wrap">
        <div className="head rv">
          <span className="eyebrow">{t("eyebrow")}</span>
          <h2>{t("title")}</h2>
          <p>{t("subtitle")}</p>
        </div>
        <div className="grid3">
          {items.map((b, i) => (
            <article key={i} className="card rv" style={{ "--d": `${i * 0.1}s` } as any}>
              <div className="ph">
                <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
                  <rect width="400" height="300" fill={b.bg} />
                  <circle cx="300" cy="80" r="60" fill="#fff" opacity=".1" />
                </svg>
                <span className="tag">{b.tag}</span>
              </div>
              <div className="body">
                <h3>{b.title}</h3>
                <div className="loc">{b.loc}</div>
                <div className="meta">
                  <span>{b.meta}</span>
                  <span className="price">{b.price}</span>
                </div>
                <div className="am">{b.extra}</div>
              </div>
            </article>
          ))}
        </div>
        <a href="#" className="btn ghost more">{t("more")}</a>
      </div>
    </section>
  );
}