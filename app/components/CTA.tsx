import { getTranslations } from "next-intl/server";
import { WHATSAPP } from "@/lib/contact";



export default async function CTA() {
  const t = await getTranslations("cta");
  const whatsappHref = `https://wa.me/${WHATSAPP}`;


  return (
    <section className="cta">
      <div className="wrap">
        <span className="eyebrow">{t("eyebrow")}</span>
        <h2>{t("title")}</h2>
        <p>{t("subtitle")}</p>
        <div className="btns">
          <a className="btn" href={whatsappHref} >
            {t("btn1")}
          </a>
          <a
            className="btn ghost"
            href="#biens"
            style={{ color: "#fff", borderColor: "rgba(255,255,255,.3)" }}
          >
            {t("btn2")}
          </a>
        </div>
      </div>
    </section>
  );
}