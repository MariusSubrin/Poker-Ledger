[English](AI_USAGE.md) | [Français](AI_USAGE.fr.md)

# Utilisation de l'intelligence artificielle et règles de développement

## 1. Objectif

Ce document décrit la manière dont les outils d'intelligence artificielle sont utilisés pendant le développement de Poker Ledger.

Le projet utilise l'assistance de l'IA afin d'améliorer la productivité, d'explorer des solutions techniques, de générer du code et d'identifier des problèmes potentiels.

Cependant, tout contenu généré par une IA doit être relu, testé et validé avant d'être considéré comme faisant partie du projet.

Les outils d'intelligence artificielle sont des assistants et non des décideurs autonomes.

## 2. Outils d'intelligence artificielle utilisés

Deux outils principaux sont utilisés pendant le développement.

### Google Gemini via Antigravity

Gemini est l'assistant principal pour le développement informatique.

Il est utilisé directement dans l'environnement de développement pour :

- Analyser l'état actuel du projet.
- Proposer des plans d'implémentation.
- Générer et modifier du code source.
- Expliquer des concepts techniques.
- Identifier des bugs.
- Écrire des tests.
- Proposer des améliorations de l'architecture.
- Aider au débogage des erreurs.

Gemini doit travailler de manière progressive plutôt que de générer l'intégralité de l'application en une seule fois.

### ChatGPT

ChatGPT est utilisé comme assistant complémentaire.

Il intervient notamment pour :

- Définir les besoins fonctionnels.
- Concevoir la structure de la base de données.
- Vérifier les règles métier.
- Comprendre et contrôler la sécurité de Supabase.
- Examiner les choix techniques.
- Identifier les cas particuliers.
- Améliorer la documentation.
- Analyser les problèmes et proposer des solutions.

## 3. Méthodologie de développement

Le développement assisté par l'IA doit suivre une méthodologie structurée.

Chaque phase de développement doit respecter les étapes suivantes :

1. **Analyse :** comprendre l'état actuel du projet et la fonctionnalité demandée.
2. **Planification :** définir les étapes d'implémentation et identifier les risques potentiels.
3. **Implémentation :** modifier uniquement les fichiers nécessaires.
4. **Tests :** exécuter les tests pertinents et vérifier le comportement attendu.
5. **Relecture :** examiner les modifications et rechercher d'éventuelles régressions.
6. **Validation :** obtenir une validation humaine avant de passer à la prochaine grande étape.

L'IA ne doit jamais considérer qu'une fonctionnalité fonctionne simplement parce que le code correspondant a été généré.

Une fonctionnalité ne peut être considérée comme validée qu'après vérification de son comportement.

## 4. Supervision humaine

Le propriétaire du projet reste responsable de toutes les décisions de développement.

Les outils d'IA doivent :

- Expliquer les décisions techniques importantes.
- Signaler les incertitudes plutôt que d'inventer des réponses.
- Demander des précisions lorsque les besoins sont ambigus.
- Éviter les modifications inutiles.
- Éviter de réécrire des fichiers entiers lorsqu'une modification plus ciblée suffit.
- Expliquer les opérations potentiellement destructrices avant de les effectuer.
- Attendre une validation avant les changements architecturaux importants.

Le développeur doit relire le code généré avant de l'accepter.

## 5. Tests et validation

Les tests sont obligatoires tout au long du développement.

Le code généré par l'IA doit être vérifié à l'aide des outils adaptés.

Selon la fonctionnalité concernée, cela peut inclure :

- Tests unitaires.
- Tests de composants.
- Tests d'intégration.
- Tests de bout en bout.
- Tests de base de données.
- Tests des politiques Row Level Security de Supabase.
- Tests manuels sur les appareils mobiles.

L'IA doit clairement distinguer :

- Les tests réellement exécutés avec succès.
- Les tests ayant échoué.
- Les tests qui n'ont pas été exécutés.
- Les comportements uniquement examinés de manière théorique.

L'IA ne doit jamais affirmer qu'un test a réussi s'il n'a pas réellement été exécuté.

## 6. Sécurité et confidentialité

Le code sensible du point de vue de la sécurité nécessite une attention particulière.

Les règles suivantes doivent toujours être respectées :

- Ne jamais exposer les clés Supabase `service_role` dans le frontend.
- Ne jamais envoyer de fichiers d'environnement privés sur GitHub.
- Ne jamais placer de secrets dans des dépôts publics.
- Utiliser les politiques Row Level Security de Supabase pour contrôler les accès à la base de données.
- Valider les opérations sensibles côté serveur.
- Ne pas faire confiance aux valeurs transmises directement par le frontend.
- Examiner attentivement la logique d'authentification et d'autorisation.
- Éviter d'exposer inutilement des informations personnelles.

Les outils d'IA ne doivent pas recevoir de secrets de production ou de données personnelles qui ne sont pas nécessaires à leur intervention.

## 7. Limites de l'intelligence artificielle

Le code généré par une IA peut contenir :

- Des erreurs logiques.
- Des failles de sécurité.
- Des hypothèses incorrectes.
- Des dépendances ou API obsolètes.
- Des implémentations incomplètes.
- Des cas particuliers non pris en compte.
- Des requêtes incorrectes vers la base de données.

Tout code généré doit donc être considéré comme potentiellement non fiable tant qu'il n'a pas été relu et testé.

Lorsque de la documentation ou des informations techniques externes sont nécessaires, l'IA doit privilégier les documentations officielles, notamment celles de React, TypeScript, Supabase et des bibliothèques utilisées.

## 8. Transparence

Les outils d'intelligence artificielle sont utilisés comme assistants de développement.

Leur contribution peut inclure la génération de code, le débogage, la documentation, les propositions d'architecture et la création de tests.

Cependant, le propriétaire du projet reste responsable de l'implémentation finale, de sa validation et des décisions techniques.

## 9. Principes fondamentaux

Les principes suivants encadrent le développement assisté par l'IA :

1. **Contrôle humain :** les décisions importantes restent sous supervision humaine.
2. **Développement progressif :** implémenter et valider une étape à la fois.
3. **Qualité du code :** privilégier un code maintenable et compréhensible.
4. **Sécurité avant tout :** ne jamais sacrifier la sécurité pour gagner du temps.
5. **Tests :** vérifier le comportement réel plutôt que de faire confiance au code généré.
6. **Transparence :** communiquer clairement ce qui a été testé et ce qui ne l'a pas été.
7. **Simplicité :** éviter la complexité et les optimisations prématurées.

L'objectif n'est pas de générer le plus de code possible, mais de construire une application fiable, sécurisée et maintenable.

