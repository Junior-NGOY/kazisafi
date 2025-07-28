# 🧹 Kazisafi - Plateforme de Services de Nettoyage

## 📖 Description

Kazisafi est une application web moderne pour une société de nettoyage professionnelle en RDC. La plateforme offre une présentation complète des services, un système de blog pour showcaser les réalisations, et un panneau d'administration pour gérer le contenu.

## ✨ Fonctionnalités

### 🎯 Frontend (React + Vite)
- **Page d'accueil moderne** avec design landing page
- **Catalogue de services détaillé** (7 services principaux)
- **Système de blog** avec articles et projets réalisés
- **Pages de détail** pour chaque service
- **Design responsive** et animations fluides
- **Interface utilisateur intuitive**

### 🔧 Backend (Node.js + Express + Prisma)
- **API RESTful complète** pour tous les services
- **Base de données SQLite** avec Prisma ORM
- **Gestion d'uploads d'images**
- **Système CRUD** pour services, projets et blog
- **Configuration des paramètres du site**
- **Sécurité intégrée** (CORS, Helmet, Rate limiting)

### 📊 Panneau d'Administration
- **Interface d'administration moderne**
- **Gestion des services** (CRUD complet)
- **Gestion des projets/réalisations**
- **Gestion du blog**
- **Paramètres configurables**
- **Upload d'images dynamique**

## 🛠️ Technologies Utilisées

### Frontend
- **React 18** - Interface utilisateur
- **Vite** - Bundler moderne et rapide
- **Tailwind CSS** - Framework CSS utilitaire
- **React Router** - Routage côté client
- **AOS** - Animations on scroll
- **React Icons** - Icônes
- **React Slick** - Carrousels

### Backend
- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **Prisma** - ORM moderne
- **SQLite** - Base de données
- **Multer** - Upload de fichiers
- **CORS** - Cross-Origin Resource Sharing
- **Helmet** - Sécurité HTTP
- **Dotenv** - Variables d'environnement

## 🚀 Installation et Configuration

### Prérequis
- Node.js 16+ 
- npm ou yarn

### 1. Installation Backend

```bash
# Aller dans le dossier backend
cd backend

# Installer les dépendances
npm install

# Configurer les variables d'environnement
cp .env.example .env

# Générer le client Prisma
npx prisma generate

# Créer et migrer la base de données
npx prisma migrate dev --name init

# Seeder la base de données avec des données de test
npm run db:seed

# Lancer le serveur de développement
npm run dev
```

### 2. Installation Frontend

```bash
# Retour à la racine
cd ..

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

## 🌐 URLs et Accès

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3001/api
- **Administration**: http://localhost:5173/admin
- **API Health Check**: http://localhost:3001/api/health
- **Prisma Studio**: `npx prisma studio` (depuis le dossier backend)

## 📡 API Endpoints

### Services
- `GET /api/services` - Liste des services
- `POST /api/services` - Créer un service
- `PUT /api/services/:id` - Modifier un service
- `DELETE /api/services/:id` - Supprimer un service

### Projets
- `GET /api/projects` - Liste des projets
- `POST /api/projects` - Créer un projet
- `PUT /api/projects/:id` - Modifier un projet
- `DELETE /api/projects/:id` - Supprimer un projet

### Blog
- `GET /api/blog` - Liste des articles
- `POST /api/blog` - Créer un article
- `PUT /api/blog/:id` - Modifier un article
- `DELETE /api/blog/:id` - Supprimer un article

### Upload
- `POST /api/upload` - Upload d'images

### Paramètres
- `GET /api/settings` - Paramètres du site
- `PUT /api/settings/:key` - Modifier un paramètre

## 🏗️ Structure du Projet

```
kazisafi/
├── backend/                 # API Backend
│   ├── prisma/             # Schema et migrations
│   ├── routes/             # Routes API
│   ├── uploads/            # Fichiers uploadés
│   └── server.js           # Serveur principal
├── src/                    # Frontend React
│   ├── components/         # Composants réutilisables
│   ├── pages/              # Pages de l'application
│   ├── hooks/              # Hooks personnalisés
│   └── assets/             # Images et médias
└── public/                 # Fichiers statiques
```

## 🎨 Services Disponibles

1. **🧹 Nettoyage Professionnel** - Bureaux, maisons, commerces
2. **💨 Fumigation** - Élimination des nuisibles
3. **👕 Buanderie** - Lavage, séchage, repassage
4. **🏊‍♂️ Entretien Piscine** - Maintenance complète
5. **🌿 Jardinage** - Aménagement paysager
6. **🐛 Désinsectisation** - Traitement écologique
7. **🚽 Débouchage Fosse Septique** - Vidange et entretien

## 🔒 Sécurité

- Protection CORS configurée
- Rate limiting sur les API
- Validation des entrées
- Helmet pour les headers de sécurité
- Variables d'environnement pour les secrets

## 📱 Responsive Design

L'application est entièrement responsive et s'adapte à tous les écrans :
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (< 768px)

## 🚀 Déploiement

### Production
1. Build du frontend : `npm run build`
2. Configuration des variables d'environnement production
3. Migration de la base de données : `npx prisma migrate deploy`
4. Démarrage du serveur : `npm start`

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add some AmazingFeature'`)
4. Push sur la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📞 Contact

**Kazisafi** - Société de Nettoyage Professionnel
- 📧 Email: contact@kazisafi.com
- 📱 Téléphone: +243 811 632 595
- 📍 Adresse: Lubumbashi, République Démocratique du Congo

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

---

**Développé avec ❤️ pour Kazisafi** - *Excellence, Qualité et Fiabilité dans tous nos services*
