import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { locales } from "@/i18n/config";
import "../../globals.css";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}



export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>; // ✅ Type mis à jour
}): Promise<Metadata> {
  const { locale } = await params; // ✅ await ajouté
  
  const titles: Record<string, string> = {
    fr: "BORGIA IMMO — Pour le Comfort et l'Élégance",
    en: "BORGIA IMMO — For Comfort and Elegance",
  };
  const descriptions: Record<string, string> = {
    fr: "Acheter, vendre, louer ou investir au Bénin. BORGIA vous accompagne avec des solutions fiables, adaptées et élégantes.",
    en: "Buy, sell, rent or invest in Benin. BORGIA supports you with reliable, tailored and elegant solutions.",
  };
  
  return {
    title: titles[locale] ?? titles.fr,
    description: descriptions[locale] ?? descriptions.fr,
    alternates: {
      languages: { fr: "/fr", en: "/en" },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>; // ✅ Type mis à jour
}) {
  const { locale } = await params; // ✅ await ajouté

  if (!routing.locales.includes(locale as any)) notFound();

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}