# Poker Ledger

[English](README.md) | [Français](README.fr.md)

Poker Ledger est une application web progressive (PWA) permettant de suivre les résultats et l'évolution des jetons des joueurs d'un groupe de poker.

L'application est conçue pour un groupe de joueurs qui se retrouvent régulièrement. À la fin de chaque journée, chaque joueur enregistre les jetons qu'il lui reste. Ce montant est automatiquement reporté comme capital de départ lors de la journée suivante.

L'objectif est de centraliser les résultats, d'éviter les calculs manuels et de proposer un suivi statistique des performances individuelles et collectives.

> **État du projet :** ✅ **Application entièrement fonctionnelle et testée (85/85 tests réussis).** Architecture complète PWA, Supabase Auth, PostgreSQL RLS, Recharts sans interpolation, saisie tactile des jetons et guide officiel des 10 combinaisons de poker.

---

## 📱 Guide d'installation sur téléphone (PWA)

Poker Ledger est une PWA (*Progressive Web App*). Une fois déployée (ou accessible via votre réseau local), elle s'installe en 5 secondes sur votre smartphone sans passer par l'App Store ou le Google Play Store.

### Sur iPhone / iPad (Safari)
1. Ouvrez l'URL de l'application dans **Safari**.
2. Appuyez sur le bouton **Partager** (le carré avec une flèche vers le haut ⎋ en bas de l'écran).
3. Faites défiler vers le bas et appuyez sur **« Sur l'écran d'accueil »** (ou *Add to Home Screen*).
4. Appuyez sur **« Ajouter »** en haut à droite.
5. L'icône Poker Ledger apparaît sur votre écran d'accueil avec son icône de jeton et s'ouvre en plein écran sans barre d'adresse navigateur !

### Sur Android (Chrome / Brave / Firefox)
1. Ouvrez l'URL de l'application dans votre navigateur (ex : **Chrome**).
2. Une bannière **« Ajouter Poker Ledger à l'écran d'accueil »** ou **« Installer l'application »** apparaît automatiquement au bas de l'écran.
3. Si elle n'apparaît pas, appuyez sur les **3 petits points ⋮** en haut à droite.
4. Sélectionnez **« Installer l'application »** ou **« Ajouter à l'écran d'accueil »**.
5. L'application s'installe immédiatement comme une application native.

---

## 🚀 Comment déployer l'application et l'envoyer à vos collègues

### Étape 1 : Créer votre base de données Supabase (Gratuit, 2 minutes)
1. Rendez-vous sur [https://supabase.com](https://supabase.com) et créez un compte gratuit.
2. Cliquez sur **« New Project »**, nommez-le `Poker Ledger` et choisissez un mot de passe de base de données.
3. Une fois créé, allez dans le menu **SQL Editor** à gauche.
4. Cliquez sur **« New query »**, collez l'intégralité du fichier [`supabase/migrations/20261028000001_initial_schema.sql`](supabase/migrations/20261028000001_initial_schema.sql) et cliquez sur **« Run »**.
5. Allez dans **Project Settings > API** et récupérez :
   - `Project URL`
   - `anon public key`

### Étape 2 : Déployer le frontend sur Vercel (Gratuit, 2 minutes)
1. Rendez-vous sur [https://vercel.com](https://vercel.com) et connectez-vous avec votre compte GitHub.
2. Cliquez sur **« Add New... > Project »** et importez votre dépôt **`MariusSubrin/Labnum-Poker`**.
3. Dans la section **Environment Variables**, ajoutez :
   - `VITE_SUPABASE_URL` = (l'URL copiée de Supabase)
   - `VITE_SUPABASE_ANON_KEY` = (la clé anon copiée de Supabase)
   - `VITE_DEFAULT_TIMEZONE` = `Europe/Paris`
4. Cliquez sur **« Deploy »**.
5. En moins d'une minute, Vercel vous fournit une URL HTTPS sécurisée (ex: `https://labnum-poker.vercel.app`).

### Étape 3 : Configurer l'URL de retour dans Supabase
1. Dans Supabase, allez dans **Authentication > URL Configuration**.
2. Dans **Site URL**, collez votre URL Vercel (ex: `https://labnum-poker.vercel.app`).
3. Dans **Redirect URLs**, ajoutez `https://labnum-poker.vercel.app/**`.

---

## 👥 Comment inviter vos collègues et démarrer

1. **Vous (Propriétaire) :**
   - Ouvrez l'application sur votre téléphone.
   - Cliquez sur **« Connexion »** pour créer votre compte propriétaire avec votre email.
   - Cliquez sur **« Changer / Créer Table »** dans l'onglet **Joueurs** pour créer votre table (ex: `Table Labnum`).
   - Appuyez sur le bouton **« Inviter »** en haut à droite : l'application génère un code sécurisé unique (ex : `PK-8X42-KM9`).
   - Copiez le code.
2. **Vos collègues :**
   - Envoyez-leur le lien du site (ex: `https://labnum-poker.vercel.app`) et le code d'invitation (par WhatsApp, Slack, Teams ou email).
   - Vos collègues ouvrent le lien, créent leur compte avec leur propre email, saisissent le code d'invitation et leur pseudo.
   - Ils sont instantanément ajoutés à la table !
3. **Chaque jour de jeu :**
   - Chaque joueur ouvre Poker Ledger, va sur l'onglet **Compter**, saisit ses jetons (soit en tapotant les jetons de couleur, soit en montant total direct), vérifie le récapitulatif et valide.
   - Le classement et les courbes de tout le monde se mettent à jour automatiquement !

## Fonctionnalités

### Gestion des résultats quotidiens

- Enregistrement du nombre de jetons restants à la fin de chaque journée.
- Report automatique des jetons d'une journée à la suivante.
- Saisie des résultats selon deux modes :
  - Saisie détaillée par dénomination de jetons.
  - Saisie directe du montant total.
- Modification des résultats après leur enregistrement.
- Conservation de l'historique des résultats.
- Association de chaque résultat à un joueur, un groupe et une date.

### Classement et statistiques

- Classement des joueurs selon leur nombre de jetons.
- Consultation de la date du dernier résultat enregistré pour chaque joueur.
- Statistiques individuelles et collectives.
- Graphiques présentant l'évolution du nombre de jetons dans le temps.
- Comparaison des performances entre joueurs.
- Consultation des records et des meilleures performances.
- Calcul des variations entre les résultats successifs.

Les variations entre deux résultats enregistrés ne doivent pas nécessairement être interprétées comme le gain ou la perte d'une seule session : plusieurs journées ou mouvements de jetons peuvent séparer deux enregistrements.

### Gestion des joueurs

- Ajout de nouveaux joueurs.
- Gestion des membres du groupe.
- Archivage des joueurs qui quittent le groupe.
- Conservation des résultats historiques des joueurs archivés.
- Gestion du rôle de propriétaire du groupe.

### Authentification et invitations

- Authentification individuelle des utilisateurs.
- Possibilité de rejoindre un groupe grâce à un code d'invitation.
- Gestion des invitations par le propriétaire du groupe.
- Contrôle des accès selon le rôle et l'appartenance au groupe.

### Référence des mains de poker

Une page dédiée doit présenter les différentes combinaisons de poker, classées de la plus forte à la plus faible, afin de servir de référence aux joueurs.

## Technologies utilisées

Le projet utilise les technologies suivantes :

| Technologie | Utilisation |
|---|---|
| React | Développement de l'interface utilisateur |
| TypeScript | Typage et fiabilité du code |
| Vite | Environnement de développement et compilation |
| Tailwind CSS | Mise en forme de l'interface |
| Supabase | Authentification, base de données et sécurité |
| PostgreSQL | Stockage des données |
| Recharts | Graphiques et statistiques |
| Vitest | Tests unitaires |
| React Testing Library | Tests des composants |
| Playwright | Tests de bout en bout |
| PWA | Installation et utilisation sur téléphone |

Les versions des dépendances devront être vérifiées au moment de l'initialisation du projet afin de garantir leur compatibilité.

## Architecture générale

Poker Ledger est une application web progressive accessible depuis un navigateur et installable sur les appareils compatibles.

L'application repose sur deux parties principales :

**Frontend :**
- React et TypeScript.
- Interface responsive pensée prioritairement pour les téléphones.
- Navigation adaptée à une utilisation mobile.
- Gestion des formulaires, résultats et graphiques.

**Backend :**
- Supabase pour l'authentification.
- PostgreSQL pour le stockage des données.
- Row Level Security (RLS) pour la gestion des autorisations.
- Fonctions serveur lorsque des opérations sensibles le nécessitent.

GitHub est utilisé pour héberger le code source du projet. Les données des joueurs sont stockées dans Supabase et non dans le dépôt GitHub.

## Modèle de données

Le modèle de données s'articule autour des entités suivantes :

- **Profiles :** informations personnelles des utilisateurs.
- **Groups :** groupes de poker.
- **Group Members :** appartenance des utilisateurs aux groupes et gestion de leurs rôles.
- **Invitations :** codes d'invitation permettant de rejoindre un groupe.
- **Daily Results :** résultats quotidiens des joueurs.

Les profils utilisateurs doivent être distincts de leur appartenance à un groupe.

Un résultat quotidien doit notamment contenir :
- Le joueur concerné.
- Le groupe concerné.
- La date du résultat.
- Le mode de saisie utilisé.
- Le détail des dénominations, lorsque celui-ci est disponible.
- Le nombre total de jetons.

Une contrainte d'unicité doit empêcher un joueur d'enregistrer plusieurs résultats pour un même groupe et une même date : `(group_id, user_id, result_date)`.

Le mode de saisie directe du total ne doit pas générer artificiellement une répartition par dénomination.

Les résultats historiques doivent être conservés même après l'archivage d'un joueur.

## Règles de comptabilisation des jetons

Les valeurs des jetons sont les suivantes :

| Couleur | Valeur |
|---|---:|
| Bleu | 1 |
| Rouge | 5 |
| Noir | 10 |
| Vert | 25 |
| Blanc | 100 |

Le total est calculé selon la formule :

`Total = Bleu + (5 × Rouge) + (10 × Noir) + (25 × Vert) + (100 × Blanc)`

En mode détaillé, le total doit être calculé et vérifié côté serveur ou au niveau de la base de données. Il ne doit pas être considéré comme fiable simplement parce qu'il a été transmis par le frontend.

En mode total direct, seule la valeur totale est enregistrée.

L'application ne doit jamais inventer de résultats ou attribuer automatiquement une valeur de zéro à une journée sans résultat enregistré.

Les graphiques doivent commencer à partir du premier résultat réel de chaque joueur.

## Sécurité

La sécurité constitue une priorité du projet.

Les règles suivantes doivent être respectées :

- Tous les utilisateurs doivent être authentifiés.
- Les membres actifs d'un groupe peuvent consulter les résultats des autres membres actifs de ce groupe.
- Un joueur ne peut modifier que ses propres résultats.
- Seul le propriétaire du groupe peut gérer les membres et les invitations.
- Un joueur archivé perd son accès au groupe.
- L'archivage ne doit pas supprimer les résultats historiques.
- Les autorisations doivent être appliquées directement au niveau de la base de données avec Supabase RLS.
- Les opérations sensibles doivent être validées côté serveur.

### Gestion des invitations

Les codes d'invitation doivent être sécurisés :

- Génération aléatoire et suffisamment robuste.
- Stockage sous forme de hash plutôt qu'en clair.
- Possibilité de définir une date d'expiration.
- Possibilité de révoquer une invitation.
- Limitation du nombre d'utilisations.
- Protection contre les tentatives répétées.
- Validation côté serveur.
- Absence d'exposition des codes dans les logs.

Le code d'invitation ne doit pas remplacer l'authentification individuelle de l'utilisateur.

### Protection des clés et secrets

Aucune clé secrète Supabase ne doit être exposée dans le code frontend.

En particulier :
- La clé `service_role` ne doit jamais être utilisée côté client.
- Aucun secret ne doit être intégré dans le dépôt GitHub.
- Le fichier `.env` doit être ignoré par Git.
- Un fichier `.env.example` doit être fourni avec des valeurs fictives.
- Les variables exposées au frontend doivent être limitées aux clés publiques prévues à cet effet.
- Une vérification des secrets doit être intégrée au processus de développement.

## Interface et expérience utilisateur

L'interface doit être pensée en priorité pour les téléphones.

La direction graphique souhaitée est inspirée des tables de poker :
- Fond sombre.
- Vert profond rappelant le tapis de poker.
- Noir et nuances de gris pour structurer l'interface.
- Touches dorées discrètes.
- Typographie lisible.
- Interface élégante et épurée.
- Navigation mobile simple.

La navigation principale doit comporter les sections suivantes :
- Accueil.
- Compter.
- Joueurs.
- Mains.

Les paramètres, les informations du profil et l'administration du groupe doivent être accessibles depuis l'espace personnel.

L'application doit être disponible en français, utiliser le format de date `JJ/MM/AAAA` et se baser par défaut sur le fuseau horaire `Europe/Paris`, avec une possibilité de configuration.

## Installation et configuration

### Prérequis

- Node.js.
- npm.
- Git.
- Un compte Supabase.

### Récupération du projet

```bash
git clone <YOUR_REPOSITORY_URL>
cd poker-ledger
```

### Installation des dépendances

```bash
npm install
```

### Configuration des variables d'environnement

Créer un fichier `.env` à la racine du projet à partir du fichier `.env.example`.

Exemple :

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
```

Les noms des variables doivent correspondre à ceux réellement utilisés dans la configuration de l'application.

Ne jamais renseigner de clé secrète dans une variable destinée au frontend.

### Lancement en développement

```bash
npm run dev
```

Les commandes exactes disponibles seront définies dans le fichier `package.json`.

## Tests

Les tests doivent être réalisés régulièrement, à chaque étape du développement.

Les outils prévus sont :

- **Vitest :** tests unitaires des fonctions et de la logique métier.
- **React Testing Library :** tests des composants.
- **Playwright :** tests des parcours utilisateur complets.

Une attention particulière doit être accordée :
- Aux calculs des jetons.
- Au report des résultats entre les journées.
- Aux modifications des résultats.
- Aux droits d'accès des utilisateurs.
- Aux règles RLS de Supabase.
- À l'archivage des joueurs.
- À la gestion des invitations.
- Aux cas où un résultat est manquant.

Les règles de sécurité doivent être testées avec plusieurs comptes utilisateurs distincts, notamment pour vérifier qu'un joueur ne peut pas modifier les résultats d'un autre.

## Déploiement

L'application doit être déployable en tant que PWA.

Les solutions envisagées sont :
- Cloudflare Pages.
- Vercel.

Le déploiement doit intégrer les variables d'environnement nécessaires et être configuré pour permettre le fonctionnement de l'application sur les navigateurs mobiles.

L'application doit pouvoir être installée depuis un navigateur compatible, sans nécessiter de publication sur les stores.

## Structure du projet

La structure exacte sera définie au cours du développement. Une organisation possible est :

```text
poker-ledger/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── pages/
│   ├── hooks/
│   ├── services/
│   ├── lib/
│   ├── types/
│   ├── utils/
│   └── App.tsx
├── supabase/
│   ├── migrations/
│   └── tests/
├── tests/
├── .env.example
├── .gitignore
├── package.json
├── README.md
└── AI_USAGE.md
```

## Méthodologie de développement

Le développement doit être réalisé progressivement.

Chaque étape doit être :
1. Analysée.
2. Planifiée.
3. Implémentée.
4. Testée.
5. Vérifiée et validée.

Les fonctionnalités ne doivent pas être considérées comme terminées sans tests appropriés.

La priorité doit être donnée à la fiabilité, à la sécurité, à la maintenabilité et à la simplicité d'utilisation.

## Statut du projet

L’application est développée progressivement.
Les fonctionnalités décrites dans ce document représentent la portée du produit prévu. Leur statut d’implémentation doit être vérifié par rapport au code source réel et aux tests.

##Contributions

Ce projet est initialement destiné à un usage privé au sein d’un petit groupe d’amis.
Les contributions externes et la distribution publique peuvent être prises en compte ultérieurement.
