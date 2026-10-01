import createNextIntlPlugin from 'next-intl/plugin';

// Indique à next-intl où se trouve ton fichier de configuration (i18n.ts à la racine)
const withNextIntl = createNextIntlPlugin('./i18n.ts');

const nextConfig = {
  reactStrictMode: true,
  // Tu peux ajouter d'autres options Next.js ici si besoin
  // ex: images: { remotePatterns: [...] }
};

export default withNextIntl(nextConfig);