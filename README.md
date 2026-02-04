## Mini plateforme de gestion de campagnes publicitaires côtés backend

### 1. Introduction

Ce projet est le **backend** d’une mini plateforme de gestion de campagnes publicitaires digitales.
Il permet de créer des campagnes, de suivre leur performance et de calculer des statistiques simples comme le CTR (Click Through Rate) et le CPC (Cost Per Click).

**Stack utilisée :**

- Node.js (JavaScript)
- Express.js
- MongoDB

---

### 2. Installation et lancement

1. Cloner le dépôt :

```bash
git clone <URL_DU_REPO>
```

2. Se placer dans le dossier backend :

```bash
cd backend
```

3. Installer les dépendances :

```bash
npm install
```

4. Configurer la base de données :

- Copier le fichier `.env.example` en `.env`
- Remplir les variables d’environnement

5. Lancer le serveur :

```bash
npm start      # pour production
npm run dev    # pour développement avec nodemon
```

---

### 3. Architecture et structure du projet

Le projet suit l’architecture **MVC (Model-View-Controller)** :

```
backend/
├─ src/
├── models/
├── controllers/
├── routes/
├── constants.js
├── server.js
```

**Note sur les services :**
Dans une architecture complète, on peut ajouter un dossier `services/` pour isoler la **logique métier** du controller.

- Par exemple, calculer CTR/CPC ou vérifier des conditions complexes.
- Cela rend le code plus **propre et testable**, surtout pour des projets plus grands.
- Ici, pour aller vite, j’ai mis la logique directement dans les controllers.

---

### 4. Modèle de données

**Campaign :**

| Champ       | Type   | Description                       |
| ----------- | ------ | --------------------------------- |
| id          | string | Identifiant unique de la campagne |
| name        | string | Nom de la campagne                |
| advertiser  | string | Nom de l’annonceur                |
| budget      | number | Budget de la campagne             |
| startDate   | date   | Date de début                     |
| endDate     | date   | Date de fin                       |
| status      | string | active / paused / finished        |
| impressions | number | Nombre d’impressions              |
| clicks      | number | Nombre de clics                   |

---

### 5. Endpoints de l’API

#### Créer une campagne

```http
POST /campaigns
Body:
{
  "name": "Campagne Test",
  "advertiser": "Annonceur A",
  "budget": 1000,
  "startDate": "2026-02-01",
  "endDate": "2026-02-10"
}
Response:
{
  "id": "634abf1234",
  "name": "Campagne Test",
  "advertiser": "Annonceur A",
  "budget": 1000,
  "startDate": "2026-02-01",
  "endDate": "2026-02-10",
  "status": "active",
  "impressions": 0,
  "clicks": 0
}
```

#### Lister toutes les campagnes

```http
GET /campaigns
Response: [ {...}, {...} ]
```

#### Détail d’une campagne

```http
GET /campaigns/:id
Response: { ...détails de la campagne... }
```

#### Mettre à jour le statut

```http
PATCH /campaigns/:id/status
Body: { "status": "paused" }
```

#### Statistiques (CTR et CPC)

```http
GET /campaigns/:id/stats
Response:
{
  "CTR": 0.05,
  "CPC": 20
}
```

---

### 6. Choix techniques et explications

- **Node.js en JavaScript** : rapide à mettre en place et très flexible pour communiquer avec le frontend React.
- **Architecture MVC** : séparation claire des responsabilités.
- **.env.example** : pour que le projet soit facilement configuré sans divulguer de données sensibles.

---

### 7. Ce que j’améliorerais avec plus de temps

- Ajouter **TypeScript côté backend** pour sécuriser les types et réduire les erreurs runtime.
- Ajouter un dossier `services/` pour isoler la logique métier des controllers.
- Ajouter des tests unitaires et d’intégration.
- Implémenter pagination et filtres avancés pour les listes de campagnes.
- Ajouter authentification et gestion des rôles.

---

### 8. Validation et sécurité

- Les données envoyées par le frontend sont validées dans le controller.
- Le backend ne permet que des statuts définis (`active`, `paused`, `finished`).
- Les erreurs sont renvoyées de manière claire pour le frontend.
