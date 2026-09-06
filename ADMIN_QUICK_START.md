# Accès au Dashboard Admin - Koyama Plus

## 🚀 Comment accéder au panel administrateur

### Méthode 1 : URL directe
```
http://localhost:5173/admin-login
```

### Méthode 2 : Ajouter un lien dans le footer ou header
```html
<a href="/admin-login">Espace Admin</a>
```

---

## 🔐 Connexion

### Identifiants de test
| Champ | Valeur |
|-------|--------|
| **Email** | `admin@koyamaplus.com` |
| **Mot de passe** | `admin123` |

---

## 📋 Fonctionnalités disponibles

### 1. 📊 Tableau de Bord
- Vue d'ensemble complète
- Statistiques en temps réel
- Alertes pour stocks faibles
- Dernière activité

### 2. 📦 Gestion des Produits
- **Ajouter** un nouveau produit
- **Modifier** les informations d'un produit
- **Supprimer** un produit
- **Rechercher** des produits
- **Visualiser** le stock de chaque produit

Exemple d'ajout :
```
Nom: Thé Énergétique
Catégorie: Suppléments Alimentaires
Prix: 100000 GNF
Stock: 50 unités
Image: /images/the-energetique.jpeg
```

### 3. 📝 Gestion du Blog
- **Créer** des articles de blog
- **Modifier** le contenu des articles
- **Publier/Dépublier** les articles
- **Supprimer** des articles
- Catégories: Bien-être et Nettoyage

Exemple de création :
```
Titre: Comment nettoyer efficacement votre maison
Catégorie: Nettoyage
Extrait: Découvrez nos conseils pour un nettoyage en profondeur
Contenu: [Contenu complet de l'article]
Image: /images/nettoyage.jpeg
```

---

## 🛠️ Installation et Setup

### Prérequis
- Node.js 18+
- npm ou yarn

### Installation
```bash
cd koyamaplus-sarlu-main
npm install
npm run dev
```

### Accéder au admin
1. Démarrer le serveur de développement : `npm run dev`
2. Aller à : `http://localhost:5173/admin-login`
3. Connectez-vous avec les identifiants de test

---

## 📁 Structure des fichiers créés

```
src/
├── pages/
│   ├── Admin.tsx                 # Page admin principale
│   └── AdminLogin.tsx            # Page de connexion
├── components/Admin/
│   ├── AdminDashboard.tsx        # Tableau de bord
│   ├── ProductManager.tsx        # Gestion des produits
│   └── BlogManager.tsx           # Gestion du blog
├── lib/
│   └── adminApiService.ts        # Service API admin
└── types/
    └── admin.ts                  # Types TypeScript
```

---

## ⚙️ Configuration avancée

### Remplacer les identifiants de test

**Fichier:** `src/pages/AdminLogin.tsx`

Modifiez ces lignes :
```typescript
const ADMIN_EMAIL = 'admin@koyamaplus.com';
const ADMIN_PASSWORD = 'admin123';
```

### Intégrer avec Supabase

**Fichier:** `src/lib/adminApiService.ts`

Décommentez et activez les vraies requêtes API :
```typescript
const response = await fetch(`${this.baseURL}/products`);
return response.json();
```

---

## 🔒 Sécurité en production

⚠️ **IMPORTANT** : Avant de passer en production :

1. **Implémenter une vraie authentification** (OAuth, JWT, etc.)
2. **Sécuriser l'API** avec des tokens et vérifications côté serveur
3. **Mettre en place des rôles et permissions** (admin, modérateur, etc.)
4. **Ajouter de l'audit** pour tracer les modifications
5. **Configurer CORS** correctement
6. **Utiliser HTTPS** obligatoirement
7. **Valider les entrées** côté serveur

---

## 📝 Notes d'utilisation

### Images
- Les images doivent être stockées dans `/public/images/`
- Utilisez le chemin relatif : `/images/mon-image.jpeg`

### Produits
- Le prix est en GNF (Franc Guinéen)
- Le stock doit être un nombre entier positif
- Les produits peuvent être marqués comme "en vedette" pour l'affichage principal

### Articles de Blog
- Les articles peuvent être sauvegardés en brouillon
- Vous pouvez utiliser du HTML ou Markdown dans le contenu
- Les articles publiés sont visibles sur la page blog publique

---

## 🆘 Dépannage

### Problème : Impossible de se connecter
**Solution :** Vérifiez que vous utilisez les bons identifiants et que localStorage est activé dans votre navigateur.

### Problème : Les images ne s'affichent pas
**Solution :** Vérifiez que les fichiers images existent dans `/public/images/` et que le chemin est correct.

### Problème : Les modifications ne sont pas sauvegardées
**Solution :** Actuellement, les données sont stockées en mémoire. Implémentez une vraie base de données pour la persistance.

---

## 📞 Support

Pour des questions ou problèmes, consultez :
- 📄 `ADMIN_GUIDE.md` - Guide complet
- 📚 Documentation du projet
- 🐛 Rapport un bug

---

## 🚀 Prochaines étapes

- [ ] Intégrer avec Supabase pour la persistance
- [ ] Ajouter un système de permissions granulaires
- [ ] Implémenter l'authentification avec JWT
- [ ] Créer des rapports et statistiques avancées
- [ ] Ajouter un système de notifications
- [ ] Gérer les commandes et les clients
- [ ] Exporter les données (CSV, PDF)

---

**Créé le :** 21 avril 2026  
**Version :** 1.0.0
