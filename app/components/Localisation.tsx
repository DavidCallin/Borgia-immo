import { getTranslations } from "next-intl/server";
import { WHATSAPP } from "@/lib/contact";
import ContactForm from "./ContactForm";

export default async function Localisation() {
  const t = await getTranslations("localisation");
  const whatsappHref = `https://wa.me/${WHATSAPP}`;

  return (
    <section id="contact">
      <div className="wrap">
        <div className="head rv">
          <span className="eyebrow">{t("eyebrow")}</span>
          <h2>{t("title")}</h2>
        </div>
        <div className="loc-wrap rv">
          <div className="map">
            <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
              <rect width="400" height="300" fill="#e9e7e0" />
              <path d="M50 200 Q150 100 250 180 T380 150" stroke="#560000" strokeWidth="3" fill="none" />
              <circle cx="200" cy="150" r="10" fill="#560000" />
              <circle cx="200" cy="150" r="22" fill="#560000" opacity=".2" />
            </svg>
          </div>
          <div>
            <div className="addr">
              <b>{t("agency")}</b>
              <span>{t("address")}</span>
            </div>
            <div className="addr">
              <b>{t("zones")}</b>
              <span>{t("zonesList")}</span>
            </div>
            
          </div>
        </div>

        <div className="rv">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}