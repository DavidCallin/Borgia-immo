import {
  getJsonProperties,
  normalizeProperty,
  type Offer,
  type Period,
  type PropType,
  type Category,
  type Property,
} from '@/lib/biens';
import { getSanityClient } from '@/lib/sanity/client';
import { isSanityConfigured } from '@/lib/sanity/env';
import { propertiesQuery, propertyBySlugQuery } from '@/lib/sanity/queries';

type SanityProperty = {
  id: number;
  slug: string;
  offer?: Offer;
  type: PropType;
  category: Category;
  location: { city: string; district: string; area?: string };
  price: { amount: number; currency: string; period: Period };
  contact: { phone: string };
  images?: string[];
  translations: Property['translations'];
};

function fromSanity(doc: SanityProperty): Property {
  return normalizeProperty({
    ...doc,
    images: Array.isArray(doc.images) ? doc.images.filter(Boolean) : [],
  });
}

/** Catalogue : Sanity si configuré et non vide, sinon data/biens.json. */
export async function getProperties(): Promise<Property[]> {
  if (!isSanityConfigured()) return getJsonProperties();

  const client = getSanityClient();
  if (!client) return getJsonProperties();

  try {
    const docs = await client.fetch<SanityProperty[]>(propertiesQuery);
    if (!docs || docs.length === 0) return getJsonProperties();
    return docs.map(fromSanity);
  } catch (err) {
    console.warn('[biens] Sanity indisponible, fallback JSON.', err);
    return getJsonProperties();
  }
}

export async function getPropertyBySlug(slug: string): Promise<Property | undefined> {
  if (isSanityConfigured()) {
    const client = getSanityClient();
    if (client) {
      try {
        const doc = await client.fetch<SanityProperty | null>(propertyBySlugQuery, { slug });
        if (doc) return fromSanity(doc);
      } catch (err) {
        console.warn('[biens] Sanity slug fetch échoué, fallback JSON.', err);
      }
    }
  }
  return getJsonProperties().find((p) => p.slug === slug);
}
