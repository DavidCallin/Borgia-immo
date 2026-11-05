# Borgia Immo - Plateforme immobilière 

**Borgia Immo** est une plateforme web immobilière moderne conçue pour valoriser les biens immobiliers, faciliter leur découverte et simplifier la mise en relation entre les clients et les professionnels de l'immobilier.

Disponible en **français et en anglais**, la plateforme propose une expérience utilisateur intuitive et responsive, un catalogue de biens immobiliers, des galeries photos ainsi qu'un système de gestion de contenu permettant d'administrer les informations immobilières.

---

## ✨ Fonctionnalités principales

### 🏘️ Gestion et présentation immobilière
- Catalogue de biens immobiliers avec présentation détaillée.
- Fiches individuelles pour chaque propriété.
- Affichage des caractéristiques et informations des biens.
- Galeries photos pour valoriser les propriétés.
- Présentation des services immobiliers.
- Section dédiée à l'estimation immobilière.

### 🌍 Internationalisation (i18n)
- Interface disponible en français et en anglais.
- Système de changement de langue.
- Gestion des traductions et des contenus multilingues.
- Adaptation des éléments de navigation et des différentes sections selon la langue sélectionnée.

### 📅 Réservation et interaction
- Possibilité d'effectuer des demandes de réservation en ligne.
- Formulaires de contact.
- Appels à l'action pour faciliter la prise de contact.
- Mise en relation entre les visiteurs et l'agence immobilière.

### 🧩 Gestion de contenu
- Intégration de Sanity CMS.
- Gestion dynamique des contenus.
- Administration des informations relatives aux biens immobiliers.
- Gestion des contenus destinés aux différentes sections du site.

### 📱 Expérience utilisateur
- Interface moderne et intuitive.
- Design responsive adapté aux ordinateurs, tablettes et smartphones.
- Navigation fluide.
- Organisation des contenus pour faciliter l'accès aux informations.

---

## 🛠️ Technologies utilisées

| Technologie | Rôle |
|---|---|
| Next.js 14+ | Framework de développement web |
| React | Construction des interfaces utilisateur |
| TypeScript | Typage statique et fiabilité du code |
| Sanity CMS | Gestion de contenu dynamique |
| Tailwind CSS | Stylisation et responsive design |

---

## 🏗️ Architecture et organisation

Le projet repose sur une architecture Next.js utilisant **App Router**, avec une organisation modulaire des composants et des différentes sections de l'application.

Les principales sections de la plateforme comprennent :

- **Header :** navigation principale et sélecteur de langue.
- **Hero :** présentation et mise en avant de l'offre immobilière.
- **Biens immobiliers :** catalogue des propriétés.
- **Galerie :** présentation visuelle des biens.
- **Statistiques :** chiffres clés de l'agence.
- **Services :** présentation des prestations immobilières.
- **Estimation :** section dédiée aux demandes d'estimation.
- **Équipe :** présentation des profils professionnels.
- **Témoignages :** retours d'expérience des clients.
- **FAQ :** réponses aux questions fréquentes.
- **Localisation :** informations géographiques.
- **CTA :** sections d'incitation à la prise de contact.

---

## 🌐 Internationalisation

La plateforme intègre un système de gestion multilingue permettant aux visiteurs de naviguer entre deux langues :

- 🇫🇷 Français
- 🇬🇧 Anglais

L'internationalisation permet notamment :
- D'adapter les textes de l'interface à la langue sélectionnée.
- De proposer une navigation cohérente dans les deux langues.
- De rendre les contenus accessibles à une audience internationale.
- D'améliorer l'expérience utilisateur pour les visiteurs francophones et anglophones.

---

## 🚀 Installation et configuration

### Prérequis

Avant de commencer, assurez-vous de disposer des éléments suivants :

- Node.js
- npm, yarn ou pnpm
- Un compte Sanity CMS.
- Un projet Sanity configuré.

### 1. Cloner le dépôt

```bash
git clone https://github.com/DavidCallin/Borgia-immo.git

cd borgia-immo
```

### 2. Installer les dépendances

Avec npm :

```bash
npm install
```

### 3. Configurer les variables d'environnement

Créer un fichier `.env.local` à la racine du projet.

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=
NEXT_PUBLIC_SANITY_API_VERSION=
```

Renseigner les valeurs correspondant à votre configuration Sanity.

### 4. Démarrer le serveur de développement

```bash
npm run dev
```

Accéder ensuite à l'application depuis :

http://localhost:3000

### 5. Générer la version de production

```bash
npm run build

npm run start
```

---

## 🎯 Compétences techniques mobilisées

Ce projet met en évidence plusieurs compétences en développement web :

- Conception et développement d'une application avec Next.js.
- Utilisation de React et TypeScript pour construire des interfaces modulaires.
- Mise en place d'une architecture basée sur Next.js App Router.
- Intégration d'un CMS headless avec Sanity.
- Gestion dynamique des contenus immobiliers.
- Implémentation d'un système d'internationalisation français / anglais.
- Développement d'interfaces responsive.
- Intégration de fonctionnalités de réservation et de contact.
- Structuration et optimisation de l'expérience utilisateur.

---

## 👨‍💻 Réalisation

**Callin HOUNGA - CalDav**

Développeur Web 

Ce projet représente une réalisation dans le domaine du développement de solutions numériques, combinant conception d'interfaces, architecture applicative, gestion de contenu et internationalisation.

---

## 🔗 Liens utiles

- **Site web :** [Borgia Immo](https://www.borgia-immo.com/)
- **Dépôt GitHub :** [Code source](https://github.com/DavidCallin/Borgia-immo)

---

*Conception et développement avec des solutions numériques utiles, accessibles et performantes.*
