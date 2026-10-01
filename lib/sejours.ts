import raw from '@/data/sejours.json';

export type Locale = 'fr' | 'en';
export type StayType = 'apartment' | 'duplex' | 'studio' | 'villa';
export type Category = 'studio' | '1-bedroom' | '2-bedroom' | '3-bedroom';

type Copy = {
  title: string;
  description: string;
  features: string[];
  electricity_included?: boolean;
  notes?: string;
};

export type Stay = {
  id: number;
  slug: string;
  type: StayType;
  category: Category;
  location: { city: string; district: string; area?: string };
  price: { amount: number; currency: string; period: string };
  contact: { phone: string };
  images: string[];
  translations: Record<Locale, Copy>;
};

// Le JSON fourni garde sa clé « apartments » ; on le lit tel quel.
export const stays: Stay[] = (raw as unknown as { apartments: Stay[] }).apartments;

export const FILTERS = ['all', 'studio', '1-bedroom', '2-bedroom', '3-bedroom', 'villa'] as const;
export type FilterKey = (typeof FILTERS)[number];

/** La villa a sa propre catégorie de filtre ; les autres suivent `category`. */
export const filterKey = (s: Stay): Exclude<FilterKey, 'all'> =>
  s.type === 'villa' ? 'villa' : s.category;

export const getStay = (slug: string) => stays.find((s) => s.slug === slug);

export const copyOf = (s: Stay, locale: string): Copy =>
  s.translations[locale as Locale] ?? s.translations.fr;

export const formatPrice = (amount: number, locale: string) =>
  new Intl.NumberFormat(locale === 'fr' ? 'fr-FR' : 'en-US').format(amount) + ' FCFA';

export const placeLabel = (s: Stay) =>
  [s.location.district, s.location.area].filter(Boolean).join(', ');

/** Numéro béninois à 10 chiffres : indicatif 229 + numéro tel quel. À vérifier avec le client. */
export const whatsappUrl = (phone: string, message: string) =>
  `https://wa.me/229${phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
