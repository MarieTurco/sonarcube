# Rapport – TP : Qualité, Sécurité et Maintenabilité du Code avec SonarQube

## Objectifs
- Identifier et corriger manuellement des problèmes de code (bugs, code smells, failles).
- Mettre en place une analyse avec SonarQube.
- (Optionnel) Intégrer l’analyse dans un pipeline CI via GitHub.

---

## Étape 1 : Identification manuelle des anomalies

| Fichier                | Type           | Anomalie détectée                                                                 |
|------------------------|----------------|-----------------------------------------------------------------------------------|
| `controllers/userController.js` | Sécurité       | Mots de passe stockés et comparés en clair                                       |
| `controllers/userController.js` | Code Smell     | Fonctions trop longues (`register`, `login`)                                     |
| `controllers/userController.js` | Code Smell     | Duplications de code dans la vérification des champs                             |
| `controllers/userController.js` | Sécurité       | Aucune validation d’entrée (ex : email invalide, mot de passe vide)              |
| `controllers/userController.js` | Qualité        | Boucle `for` à remplacer par `Array.find()`                                      |
| `middlewares/auth.js`          | Sécurité       | Vérification de token naïve, facilement falsifiable (`token = 'token-username'`) |
| `middlewares/auth.js`          | Code Smell     | Absence de message d’erreur spécifique si l’utilisateur n’existe pas             |
| `utils/utils.js`               | Sécurité       | `generateToken()` sans cryptographie ni clé secrète                              |
| `utils/utils.js`               | Code Smell     | Nom trompeur pour une fonction non sécurisée                                     |

---

## Étape 2 : Actions de correction

| Fichier corrigé          | Action                                                                 |
|--------------------------|------------------------------------------------------------------------|
| `userController.js`      | Hachage des mots de passe avec bcrypt                                  |
| `userController.js`      | Utilisation de `express-validator` pour valider les entrées            |
| `userController.js`      | Refactorisation des fonctions `register` et `login` (plus lisibles)    |
| `userController.js`      | Remplacement de la boucle `for` par `Array.find()`                     |
| `auth.js`                | Remplacement du token personnalisé par un JWT signé avec clé secrète   |
| `auth.js`                | Message d’erreur explicite pour les cas d’échec                        |
| `utils.js`               | `generateToken()` remplacé par génération de JWT via `jsonwebtoken`    |

---

## Étape 3 : Analyse SonarQube

![Capture d'écran du scan SonarQube](/sonarcube.png)


---

##  Bilan

Ce TP m’a permis de :
- Prendre conscience de l’importance de la validation des données côté serveur.
- Comprendre les dangers liés à un mauvais stockage des mots de passe.
- Apprendre à utiliser SonarQube pour détecter automatiquement les problèmes de code.
- Mettre en place de bonnes pratiques de sécurité et de qualité dans un projet Node.js.