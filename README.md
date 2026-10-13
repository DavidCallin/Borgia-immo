This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Sanity CMS (gestion du catalogue)

Le catalogue lit d'abord Sanity. Si les variables d'environnement Sanity sont absentes, ou si le dataset est vide / inaccessible, le site utilise automatiquement `data/biens.json` (comportement actuel).

### 1. Créer le projet Sanity

1. Créez un compte sur [sanity.io](https://www.sanity.io) si besoin.
2. Créez un projet (ou connectez-en un existant) et notez le **Project ID** et le **dataset** (souvent `production`).

### 2. Variables d'environnement

```bash
cp .env.example .env.local
```

Renseignez dans `.env.local` :

- `NEXT_PUBLIC_SANITY_PROJECT_ID` — ID du projet
- `NEXT_PUBLIC_SANITY_DATASET` — ex. `production`
- `SANITY_API_TOKEN` — token API avec droits d'écriture (Editor), uniquement pour le seed  
  (Sanity Manage → API → Tokens)

### 3. Importer les biens existants

```bash
npm run seed:sanity
```

Cela crée/met à jour les documents `property-*` à partir de `data/biens.json`.

### 4. Ouvrir le Studio

```bash
npm run dev
```

Ouvrez [http://localhost:3000/studio](http://localhost:3000/studio) pour ajouter ou modifier des biens. Les filtres du catalogue (offre, quartier, type, chambres) fonctionnent aussi sur les données Sanity.

### 5. Déploiement

1. Définissez les mêmes variables `NEXT_PUBLIC_SANITY_*` sur votre hébergeur (Vercel, etc.).
2. Dans Sanity Manage → API → **CORS origins**, ajoutez l'URL du site (ex. `https://votre-domaine.com`) et `http://localhost:3000` en local, avec credentials si demandé.
3. Le Studio est disponible sur `https://votre-domaine.com/studio`.

Sans configuration Sanity, le site continue de fonctionner uniquement avec `data/biens.json`.
