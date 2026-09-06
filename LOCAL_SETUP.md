# KOYAMA PLUS - Site Web Multi-Services

## 🎉 Conversion Réussie - Mode Local

Ce projet a été converti pour fonctionner **100% en local** sans dépendance à Supabase.

### ✅ Changements Effectués

#### 1. **Suppression de Supabase**
   - Removed: `@supabase/supabase-js` dependency
   - Updated: `src/lib/supabase.ts` → Removed
   - Replaced with: `src/lib/dataService.ts` (service local)

#### 2. **Gestion des Données Locales**
   - **Products**: `src/data/products.json` (17 produits + 4 services nettoyage)
   - **Storage**: `localStorage` (panier, commandes, devis)
   - **Auth**: Simple système d'authentification local

#### 3. **Mises à Jour des Fichiers**
   - ✅ `src/contexts/AuthContext.tsx` - Auth locale
   - ✅ `src/contexts/CartContext.tsx` - Cart avec localStorage
   - ✅ `src/pages/Shop.tsx` - Produits locaux
   - ✅ `src/pages/Cleaning.tsx` - Services locaux
   - ✅ `src/lib/dataService.ts` - Service de gestion des données
   - ✅ `src/data/products.json` - Base de données JSON
   - ✅ `public/images/` - 38 images intégrées

#### 4. **Structure des Données**

**Products.json**:
```json
{
  "categories": [...],      // 5 catégories
  "products": [...],        // 17 produits
  "cleaning_services": [...] // 4 services
}
```

**Storage (localStorage)**:
- `koyama_user` - Session utilisateur
- `koyama_profiles` - Profils utilisateurs
- `koyama_cart` - Panier d'achat
- `koyama_orders` - Commandes
- `koyama_quotes` - Devis nettoyage

---

## 🚀 Installation & Lancement

### 1. Installer les dépendances
```bash
cd koyamaplus-sarlu-main
npm install
```

### 2. Lancer le serveur de développement
```bash
npm run dev
```

Le site sera accessible à: `http://localhost:5173`

### 3. Build pour production (FTP)
```bash
npm run build
```

Les fichiers générés seront dans le dossier `dist/`. C'est ce dossier que vous uploadez en FTP.

---

## 📦 Déploiement en FTP

### Structure du build:
```
dist/
├── index.html
├── assets/
│   ├── main-*.js
│   ├── main-*.css
│   └── ...
└── images/  # Vos 38 images
```

### Étapes de déploiement:
1. Exécuter `npm run build`
2. Uploader tout le contenu de `dist/` sur votre serveur FTP
3. Le site fonctionnera sans aucune dépendance externe

---

## 📝 Fonctionnalités

### ✅ Complètement Fonctionnel:
- 🛍️ **Boutique en ligne** - 17 produits avec images
- 🧹 **Services de nettoyage** - 4 types de services  
- 🛒 **Panier d'achat** - Sauvegarde locale
- 👤 **Authentification** - Inscription/Connexion locale
- 📋 **Commandes** - Historique avec localStorage
- 📞 **Devis nettoyage** - Formulaire avec stockage
- 📱 **Design Responsive** - Tailwind CSS

### 💾 Données Persistantes:
- Les panier, commandes, et devis sont sauvegardés en localStorage
- Survit au rechargement de page
- Se réinitialise si navigateur cache vidé

---

## 🎨 Images

Toutes vos 38 images sont maintenant intégrées:
- 📂 `public/images/` - Dossier des images
- Types: Produits, Thés, Nettoyage, Équipe
- Utilisées automatiquement par tous les produits

---

## 🔧 Points Importants pour FTP

### ✅ À Vérifier Avant Upload:
1. **Chemins d'images**: Utilisent `/images/` (chemins relatifs)
2. **Build optimisé**: Assets minifiés et compressés
3. **Pas de dépendances serveur**: 100% client-side
4. **Cache**: Navigateur mettra en cache les assets

### ⚠️ Éviter:
- Ne pas modifier les URLs des images
- Ne pas supprimer les assets minifiés du dossier `dist/`
- Vérifier les permissions FTP (644 pour fichiers, 755 pour dossiers)

---

## 📊 Structure du Projet

```
src/
├── data/
│   └── products.json          # Base de données
├── lib/
│   └── dataService.ts         # Service de gestion des données
├── contexts/
│   ├── AuthContext.tsx        # Auth locale
│   └── CartContext.tsx        # Cart local
├── pages/
│   ├── Shop.tsx               # ✅ Mis à jour
│   ├── Cleaning.tsx           # ✅ Mis à jour
│   └── ...
└── components/
    └── ...

public/
└── images/                    # 38 images intégrées ✅

supabase/
└── migrations/                # Plus utilisé (gardé pour référence)
```

---

## 🆘 Dépannage

### Le site ne charge pas?
```bash
# Vérifier node_modules
rm -rf node_modules
npm install

# Lancer avec debug
npm run dev
```

### Les images ne s'affichent pas?
- Vérifier que `public/images/` contient les fichiers
- Vérifier les chemins dans `src/data/products.json`
- Ouvrir DevTools (F12) pour voir les erreurs

### Le panier ne sauvegarde pas?
- Vérifier que localStorage est activé
- Vérifier la console pour les erreurs
- Tester dans une fenêtre incognito

---

## 📞 Notes Importantes

1. **Aucune dépendance backend** - Tout fonctionne localement
2. **localStorage = Données volatiles** - Vidées si navigateur cache vidé
3. **Pas de paiement réel** - À ajouter via Stripe, PayPal, etc. si nécessaire
4. **Pas de base de données** - Toutes les données sont en JSON

Si vous avez besoin de persistance sérieuse après déploiement, considérez:
- Ajouter Firebase pour la base de données
- Ou ajouter un simple backend Node.js

---

## 🎯 Prochaines Étapes

1. **Tester localement** - `npm run dev`
2. **Vérifier tous les produits** - Vérifier les images et prix
3. **Customiser les données** - Éditer `src/data/products.json`
4. **Builder** - `npm run build`
5. **Uploader en FTP** - Contenu de `dist/`

Bon courage! 🚀
