# Dashboard Admin - Koyama Plus

## Vue d'ensemble

Le dashboard admin permet de gérer complètement votre boutique Koyama Plus :

- ✅ **Tableau de Bord** - Vue d'ensemble avec statistiques
- ✅ **Gestion des Produits** - Ajouter, modifier, supprimer des produits
- ✅ **Gestion du Blog** - Créer et publier des articles
- ✅ **Suivi du Stock** - Alertes pour les produits en faible stock

---

## Accès au Panel Admin

### URL d'accès
```
http://localhost:5173/admin-login
```

### Identifiants de test
- **Email** : `admin@koyamaplus.com`
- **Mot de passe** : `admin123`

> ⚠️ À remplacer par une vraie authentification en production

---

## Fonctionnalités

### 📊 Tableau de Bord
- Statistiques globales (nombre de produits, services, articles)
- Alertes pour les stocks faibles
- Dernière activité
- Actions rapides

### 📦 Gestion des Produits

#### Ajouter un produit
1. Cliquez sur "Ajouter Produit"
2. Remplissez le formulaire :
   - Nom du produit
   - Description
   - Catégorie (Suppléments / Appareils / Bien-être)
   - Prix en GNF
   - Stock initial
   - Bénéfices et contre-indications
   - URL de l'image
3. Cochez "Produit en vedette" si approprié
4. Cliquez sur "Créer"

#### Modifier un produit
1. Trouvez le produit dans la liste
2. Cliquez sur l'icône ✏️ "Modifier"
3. Mettez à jour les informations
4. Cliquez sur "Modifier" pour confirmer

#### Supprimer un produit
1. Trouvez le produit dans la liste
2. Cliquez sur l'icône 🗑️ "Supprimer"
3. Confirmez la suppression

#### Rechercher un produit
- Utilisez la barre de recherche en haut pour filtrer par nom ou description

### 📝 Gestion du Blog

#### Créer un article
1. Cliquez sur "Nouvel Article"
2. Remplissez les informations :
   - Titre
   - Catégorie (Bien-être / Nettoyage)
   - Image URL (ex: `/images/Thé detox.jpeg`)
   - Extrait (résumé court)
   - Contenu complet
3. Cochez "Publier immédiatement" pour le publier
4. Cliquez sur "Créer"

#### Modifier un article
1. Trouvez l'article dans la liste
2. Cliquez sur "Modifier"
3. Mettez à jour le contenu
4. Cliquez sur "Modifier" pour confirmer

#### Gérer la publication
- **Publier** : Rendre l'article visible aux clients
- **Dépublier** : Cacher l'article (reste en brouillon)
- **Supprimer** : Supprimer définitivement

---

## Intégration avec l'API

### Connexion à Supabase

Les composants sont prêts à être intégrés avec Supabase. Modifiez les appels API :

**Exemple pour les produits** (`ProductManager.tsx`):
```typescript
// À la place de la charge mock
const response = await supabase
  .from('products')
  .select('*');
setProducts(response.data);
```

**Exemple pour le blog** (`BlogManager.tsx`):
```typescript
const response = await supabase
  .from('blog_posts')
  .select('*');
setPosts(response.data);
```

---

## Architecture

```
src/
├── components/Admin/
│   ├── AdminDashboard.tsx      # Tableau de bord
│   ├── ProductManager.tsx      # Gestion des produits
│   └── BlogManager.tsx         # Gestion du blog
├── pages/
│   ├── Admin.tsx              # Page admin principale
│   └── AdminLogin.tsx         # Page de connexion admin
```

---

## Sécurité

⚠️ **IMPORTANT** : Le système de connexion actuel est basique et stocke le token en localStorage.

Pour la production :

1. **Remplacer l'authentification** par une vraie intégration (JWT, OAuth, etc.)
2. **Implémenter des permissions** (rôles: admin, modérateur, etc.)
3. **Sécuriser l'API** avec des tokens et vérifications côté serveur
4. **Ajouter de l'audit** pour tracer les modifications

---

## Prochains développements

- [ ] Intégration complète avec Supabase
- [ ] Gestion des commandes/ventes
- [ ] Export de données (CSV, PDF)
- [ ] Graphiques avancés
- [ ] Gestion des utilisateurs
- [ ] Système de permissions granulaires
- [ ] Sauvegarde et historique des modifications

---

## Conseils d'utilisation

### Pour les images
- Mettez les images dans `/public/images/`
- Utilisez le chemin relatif dans l'URL de l'image : `/images/mon-image.jpeg`

### Pour le contenu du blog
- Vous pouvez utiliser du HTML ou Markdown
- Les images doivent aussi être dans `/public/images/`

### Sauvegarde
- Les données sont actuellement sauvegardées en localStorage
- Implémentez une vraie base de données pour la persistance

---

## Support

Pour des questions ou problèmes, consultez la documentation Koyama Plus complète.
