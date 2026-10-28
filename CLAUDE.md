# UNBOUND

Application personnelle de préparation d'expéditions et de randonnées. Utilisateur débutant : explications simples, petites étapes, vérification avant de passer à la suite.

## Stack
- React + TypeScript + Vite (PWA plus tard), tests Vitest + Testing Library, lint oxlint.
- Prévu : Supabase (base, auth, fichiers), MapLibre + MapTiler/IGN, Open-Meteo derrière une interface `WeatherProvider`.

## Commandes
- `npm run dev` : serveur local
- `npm test` : tests
- `npm run lint` : lint
- `npm run build` : build de production

## Règles
- Une étape du plan à la fois, une branche et une PR par étape, CI verte avant fusion.
- Ne jamais inventer de données météo ; toujours afficher source, modèle et heure de mise à jour.
- Distinguer dans les données : saisie, calcul, prévision, officiel, généré par IA.
- Aucune clé secrète dans le code du navigateur ni dans le dépôt.
- Textes de l'interface en français.
