export const sanityProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim() || '';
export const sanityDataset = process.env.NEXT_PUBLIC_SANITY_DATASET?.trim() || 'production';
export const sanityApiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION?.trim() || '2025-01-01';

/** Sanity est considéré configuré dès qu'un projectId public est défini. */
export function isSanityConfigured(): boolean {
  return Boolean(sanityProjectId) && sanityProjectId !== 'unconfigured';
}
