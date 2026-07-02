# RecipeApp

Application mobile de recettes de cuisine développée avec React Native et Expo.

## Aperçu

RecipeApp permet aux utilisateurs de découvrir, rechercher et consulter des recettes de cuisine. Les données proviennent de l'API FatSecret via une authentification OAuth 1.0.

## Fonctionnalités

- **Accueil** — grille de recettes recommandées avec filtres par catégorie
- **Recherche** — barre de recherche intégrée
- **Détail recette** — image, description, liste d'ingrédients et étapes de préparation
- **Favoris** — sauvegarde locale des recettes aimées
- **Notifications** — système de notifications push
- **Profil** — page utilisateur
- **Onboarding** — écran d'accueil au premier lancement

## Stack technique

| Technologie | Version | Rôle |
|---|---|---|
| React Native | 0.81.5 | Framework mobile |
| Expo | 54 | Toolchain & modules natifs |
| Expo Router | 6 | Navigation par fichiers |
| TanStack Query | 5 | Gestion des requêtes et cache |
| Uniwind / Tailwind | 4 | Styles utilitaires |
| AsyncStorage | 2 | Persistance locale |
| FatSecret API | v1 (OAuth 1.0) | Source de données recettes |

## Prérequis

- Node.js 18+
- pnpm
- Expo Go (iOS / Android) ou un émulateur

## Installation

```sh
pnpm install
```

## Lancement

```sh
pnpm start -- --clear
```

Scanner le QR code avec Expo Go ou appuyer sur `a` (Android) / `i` (iOS) pour ouvrir sur un émulateur.

## Configuration API

Les credentials FatSecret OAuth 1.0 sont définis dans `src/hooks/user-authentificate.tsx` :

```ts
const CONSUMER_KEY = 'votre_consumer_key';
const CONSUMER_SECRET = 'votre_consumer_secret';
```

Créer un compte et générer des credentials OAuth 1.0 sur [platform.fatsecret.com](https://platform.fatsecret.com).

## Structure du projet

```
src/
├── app/
│   ├── (tabs)/          # Pages principales (Home, Favoris, Create, Notifications, Profile)
│   ├── details/[id].tsx # Page de détail d'une recette
│   └── onboarding.tsx   # Écran d'accueil
├── hooks/
│   ├── user-authentificate.tsx   # Signature OAuth 1.0 (HMAC-SHA1)
│   ├── use-get-posts.ts          # Récupération de la liste de recettes
│   ├── use-get-post-by-id.ts     # Récupération d'une recette par ID
│   ├── use-async-storage.ts      # Hook AsyncStorage
│   └── use-notification.ts      # Gestion des notifications
└── components/
    └── slider.tsx
```
