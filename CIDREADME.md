# 🎬 CID Movie App

Bienvenue dans le dépôt de **CID Movie App**, une application web moderne de catalogue de films et de séries TV construite avec **React** et stylisée en **SCSS**. Elle utilise l'API de **The Movie Database (TMDB)** pour récupérer les données en temps réel et supporte l'internationalisation via **i18next**.

## ✨ Fonctionnalités Principales

  * **Page d'Accueil Dynamique** : Affiche les films et séries TV tendances et les mieux notés via un carrousel (`HeroSlide`) et des listes thématiques.
  * **Détails des Médias** : Pages dédiées pour les films et les séries avec casting, aperçu, et recommandations de contenu similaire.
  * **Lecture Vidéo (Bande-annonce)** : Possibilité de regarder les bandes-annonces directement sur les pages de détail ou via la page de lecture dédiée (`/play/:id`).
  * **Recherche Instantanée** : Fonctionnalité de recherche réactive (`debounce`) pour trouver rapidement des titres.
  * **Catalogue Complet** : Pages séparées pour parcourir tous les films et toutes les séries TV.
  * **Internationalisation (i18n)** : Supporte plusieurs langues (anglais, français, espagnol, etc.) via `i18next`.
  * **Défilement Natif (Scroll Snap)** : Utilisation de CSS Scroll Snap pour des carrousels fluides et performants sans dépendance JavaScript lourde.

## 🛠️ Technologies Utilisées

| Technologie | Description |
| :--- | :--- |
| **React** | Bibliothèque JavaScript pour l'interface utilisateur. |
| **React Router v6** | Pour la navigation déclarative et les routes dynamiques. |
| **SCSS/Sass** | Pour un style modulable et maintenable. |
| **Swiper** | Utilisé pour le composant `HeroSlide`. |
| **i18next** | Pour l'internationalisation et la gestion des langues. |
| **TMDB API** | Source de données pour tous les films, séries, et images. |

## 🚀 Démarrage Rapide

### Prérequis

  * Node.js (v14+)
  * Un compte et une clé d'API valide de [The Movie Database (TMDB)](https://www.themoviedb.org/documentation/api)

### 1\. Installation

Clonez le dépôt et installez les dépendances :

```bash
git clone https://www.wordreference.com/fren/d%C3%A9p%C3%B4t
cd cid-movie-app
npm install
```

### 2\. Configuration de l'API

Créez un fichier `.env` à la racine de votre projet et ajoutez votre clé TMDB.

```
# .env
REACT_APP_API_KEY=VOTRE_CLÉ_TMDB_ICI
REACT_APP_BASE_URL=https://api.themoviedb.org/3/
```

### 3\. Lancement du Projet

Lancez l'application en mode développement :

```bash
npm start
```

L'application sera accessible à l'adresse `http://localhost:3000/cid-movie-app`.

## ⚙️ Structure des Routes

Toutes les routes sont basées sur la constante `HOME_PAGE` définie dans `constants/Config.jsx` (`cid-movie-app`).

| Route | Composant | Description |
| :--- | :--- | :--- |
| `/cid-movie-app` | `Home` | Page d'accueil avec les listes tendances. |
| `/cid-movie-app/:category` | `Catalog` | Affiche la grille complète des films ou séries (e.g., `/movie` ou `/tv`). |
| `/cid-movie-app/:category/:id` | `Detail` | Page de détail d'un film ou d'une série. |
| `/cid-movie-app/:category/search/:keyword` | `Catalog` | Résultats de la recherche. |
| `/cid-movie-app/:category/play/:id` | `Watch` | Lecteur vidéo pour la bande-annonce (avec autoplay). |
| `/cid-movie-app/terms`, `/about`, etc. | Pages Statiques | Pages d'information légale et générale. |

## 🌐 Internationalisation (i18n)

Le projet utilise `i18next` pour la gestion des langues.

  * **Fichiers de traduction** : Se trouvent dans `src/locales/`.
  * **Détection** : La langue est détectée via le navigateur (`navigator`) et stockée dans le `localStorage`.
  * **Utilisation** : Le hook `useTranslation()` est utilisé dans tous les composants nécessitant du texte traduit. Les changements de langue dans `i18n.language` déclenchent automatiquement le rechargement des données de l'API (e.g., `MovieGrid`, `Detail`).

## 🎨 Note sur les Styles

  * **Composants sans Swiper (Optimisation)** : Les listes de films (e.g., `MovieList.jsx` et `CastList.jsx`) ont été optimisées pour utiliser le **CSS Scroll Snap** plutôt que Swiper. Ceci garantit des carrousels plus légers et plus rapides, surtout sur mobile.
  * **Fichiers SCSS** : Suivent la convention BEM pour une meilleure structure.

## 🤝 Contribution

Les contributions, signalements de bugs et suggestions sont les bienvenus \! Veuillez soumettre une *issue* ou une *pull request*.

## 📄 Licence

Ce projet est distribué sous la licence [Insérer votre Licence, e.g., MIT].