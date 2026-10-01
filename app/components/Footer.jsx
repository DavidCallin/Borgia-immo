import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { PHONE_DISPLAY, PHONE_TEL, WHATSAPP, EMAIL, SOCIALS } from "@/lib/contact";

const NAV = ["biens", "galerie", "services", "estimation", "avis", "faq", "contact"];

export default async function Footer() {
  const t = await getTranslations("siteFooter");
  const nav = await getTranslations("nav");

  return (
    <footer>
      <div className="wrap">
        <div className="foot">
          <div>
            <Link href="/" className="logo">
              <span className="logo-mark-footer" style={{ "--logo": "url(/images/Logo/Logo-2.webp)" }}>
                <img src="/images/Logo/Logo-2.webp" alt="Borgia Immo" />
              </span>
            </Link>
          </div>
          
          <div>
            <br /><br /><br />
            <p className="foot-about">{t("about")}</p>
            <p className="foot-tag">{t("tagline")}</p>
          </div>

          <div>
            <h4>{t("navTitle")}</h4>
            <ul>
              {NAV.map((k) => (
                <li key={k}>
                  <Link href={`/#${k}`}>{nav(k)}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4>{t("contactTitle")}</h4>
            <address>
              <a href={`tel:${PHONE_TEL}`}>{PHONE_DISPLAY}</a>
              <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noopener noreferrer">
                WhatsApp
              </a>
              <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
              <span>{t("address")}</span>
            </address>
          </div>

          <div>
            <h4>{t("socialTitle")}</h4>
            <ul>
              {SOCIALS.map((s) => (
                <li key={s.name}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer">
                    {s.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="copy">{t("rights", { year: new Date().getFullYear() })}</p>
      </div>
    </footer>
  );
}