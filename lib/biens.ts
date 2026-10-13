import raw from '@/data/biens.json';

export type Offer = 'stay' | 'rent' | 'sale';
export type Period = 'night' | 'month' | 'total';
export type PropType = 'apartment' | 'duplex' | 'studio' | 'villa' | 'house' | 'land';
export type Category =
  | 'studio'
  | '1-bedroom'
  | '2-bedroom'
  | '3-bedroom'
  | '4-bedroom-plus'
  | 'land';

type Copy = {
  title: string;
  link: string;
  description: string;
  features: string[];
  electricity_included?: boolean;
  notes?: string;
};

type RawProperty = {
  id: number;
  slug: string;
  /** Facultatif : sinon déduit de price.period (night = séjour, month = location, total = vente). */
  offer?: Offer;
  type: PropType;
  category: Category;
  location: { city: string; district: string; area?: string };
  price: { amount: number; currency: string; period: Period };
  contact: { phone: string };
  images: string[];
  translations: Record<'fr' | 'en', Copy>;
};

export type Property = RawProperty & { offer: Offer , pays: string};

const OFFER_BY_PERIOD: Record<Period, Offer> = { night: 'stay', month: 'rent', total: 'sale' };

// Accepte la clé « properties » ou l'ancienne clé « apartments » du JSON fourni.
const source = raw as unknown as { properties?: RawProperty[]; apartments?: RawProperty[] };

export function normalizeProperty(p: RawProperty): Property {
  return {
    ...p,
    offer: p.offer ?? OFFER_BY_PERIOD[p.price.period],
    pays: 'Bénin', // Valeur par défaut, à remplacer selon les besoins
  };
}

/** Fallback local : data/biens.json (utilisé si Sanity n'est pas configuré ou vide). */
export function getJsonProperties(): Property[] {
  return (source.properties ?? source.apartments ?? []).map(normalizeProperty);
}

/** @deprecated Préférer getProperties() async — conservé pour compatibilité sync / generateStaticParams de secours. */
export const properties: Property[] = getJsonProperties();

export const OFFERS: Offer[] = ['stay', 'rent', 'sale'];

export function offersOf(list: Property[]): Offer[] {
  return OFFERS.filter((o) => list.some((p) => p.offer === o));
}

export const availableOffers = offersOf(properties);

/** Clés de filtre « catégorie » (la villa et le terrain ont la leur). */
export const CATEGORY_ORDER = [
  'studio',
  '1-bedroom',
  '2-bedroom',
  '3-bedroom',
  '4-bedroom-plus',
  'villa',
  'land',
] as const;
export type CategoryKey = (typeof CATEGORY_ORDER)[number];

export const categoryKey = (p: Property): CategoryKey =>
  p.type === 'villa' ? 'villa' : p.type === 'land' ? 'land' : p.category;

export const getProperty = (slug: string) => properties.find((p) => p.slug === slug);

export const copyOf = (p: Property, locale: string): Copy =>
  p.translations[locale as 'fr' | 'en'] ?? p.translations.fr;

export const formatPrice = (amount: number, locale: string) =>
  new Intl.NumberFormat(locale === 'fr' ? 'fr-FR' : 'en-US').format(amount) + ' FCFA';

export const placeLabel = (p: Property) =>
  [p.location.district, p.location.area].filter(Boolean).join(', ');

/** Numéro béninois à 10 chiffres : indicatif 229 + numéro tel quel. À vérifier avec le client. */
export const whatsappUrl = (phone: string, message: string) =>
  `https://wa.me/229${phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
