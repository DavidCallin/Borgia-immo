"use client";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/routing";

export default function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  return (
    <select
      value={locale}
      onChange={(e) => router.replace(pathname, { locale: e.target.value as any })}
      style={{
        padding: "8px 12px",
        border: "1px solid #d9d3c6",
        borderRadius: "2px",
        background: "transparent",
        cursor: "pointer",
        fontSize: ".85rem",
      }}
    >
      <option value="fr">🇫🇷 FR</option>
      <option value="en">🇬🇧 EN</option>
    </select>
  );
}