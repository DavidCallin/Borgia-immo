import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import LocaleSwitcher from "./LocaleSwitcher";
import ScrollBar from "./ScrollBar";
import { WHATSAPP } from "@/lib/contact";

export default async function Header() {
  const t = await getTranslations("nav");

  return (
    <ScrollBar>
      <div className="wrap nav">
        <Link href="/" className="logo">
          {/* Le logo est recoloré en beige par le CSS (voir .logo-mark) */}
          <span className="logo-mark" style={{ "--logo": "url(/images/Logo/Logo.webp)" }}>
            <img src="/images/Logo/Logo.webp" alt="Borgia Immo" />
          </span>
        </Link>
        <input type="checkbox" id="menu" />
        <label className="burger" htmlFor="menu">☰</label>
        <nav>
          <ul>
            <li><Link href="/#biens">{t("biens")}</Link></li>
            <li><Link href="/#galerie">{t("galerie")}</Link></li>
            <li><Link href="/#services">{t("services")}</Link></li>
            <li><Link href="/#avis">{t("avis")}</Link></li>
            <li><Link href="/#faq">{t("faq")}</Link></li>
            <li><Link href="/#contact">{t("contact")}</Link></li>
          </ul>
        </nav>
        <LocaleSwitcher />
        <a className="nav-cta" href={`https://wa.me/${WHATSAPP}`}>
          {t("whatsapp")}
        </a>
      </div>
    </ScrollBar>
  );
}