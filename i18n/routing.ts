import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation'; // ✅ Correction ici
import { link } from 'fs/promises';

export const routing = defineRouting({
  locales: ['fr', 'en'],
  defaultLocale: 'fr',
  localePrefix: 'as-needed',
});

// ✅ Utilisation de createNavigation au lieu de createSharedPathnamesNavigation
export const { Link, redirect, usePathname, useRouter } = createNavigation(routing);