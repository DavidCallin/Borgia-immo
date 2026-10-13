#!/usr/bin/env node
/**
 * Importe data/biens.json dans Sanity.
 * Prérequis : NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_API_TOKEN
 * Usage : npm run seed:sanity
 *   (ou : node --env-file=.env.local scripts/seed-sanity.mjs)
 */
import { createClient } from '@sanity/client';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim();
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET?.trim() || 'production';
const token = process.env.SANITY_API_TOKEN?.trim();
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION?.trim() || '2025-01-01';

if (!projectId || !token) {
  console.error(
    'Missing env: NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_TOKEN are required.\n' +
      'Copy .env.example to .env.local and fill the values.',
  );
  process.exit(1);
}

const raw = JSON.parse(readFileSync(join(root, 'data/biens.json'), 'utf8'));
const items = raw.properties ?? raw.apartments ?? [];

if (!items.length) {
  console.error('No properties found in data/biens.json');
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
});

const tx = client.transaction();

for (const p of items) {
  const doc = {
    _id: `property-${p.id}`,
    _type: 'property',
    id: p.id,
    slug: { _type: 'slug', current: p.slug },
    offer: p.offer || undefined,
    type: p.type,
    category: p.category,
    location: p.location,
    price: p.price,
    contact: p.contact,
    images: p.images || [],
    translations: p.translations,
  };
  tx.createOrReplace(doc);
}

const result = await tx.commit();
console.log(`Seeded ${items.length} properties into ${projectId}/${dataset}`);
console.log(`Transaction: ${result.transactionId || 'ok'}`);
