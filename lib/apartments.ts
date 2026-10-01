import data from '@/data/apartments.json';

export type Locale = 'fr' | 'en';

export type Apartment = (typeof data.apartments)[number];

export const getAll = () => data.apartments;

export const getBySlug = (slug: string) =>
  data.apartments.find((a) => a.slug === slug);

export function t(a: Apartment, locale: Locale) {
  return a.translations[locale] ?? a.translations.fr;
}

export const formatPrice = (amount: number, locale: Locale) =>
  new Intl.NumberFormat(locale === 'fr' ? 'fr-FR' : 'en-US').format(amount) + ' FCFA';

export const whatsappUrl = (phone: string, title: string) =>
  `https://wa.me/229${phone}?text=${encodeURIComponent(title)}`;