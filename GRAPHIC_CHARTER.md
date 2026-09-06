# Charte Graphique - KOYAMA PLUS SARLU

## 🎨 Identité Visuelle

### Couleurs Officielles

| Élément | Couleur | Code Hex | Utilisation |
|---------|---------|----------|-------------|
| **Rouge** | <span style="background-color: #ff2353; color: white; padding: 5px;">■</span> | `#ff2353` | Éléments principaux, logo, accents |
| **Bleu** | <span style="background-color: #312883; color: white; padding: 5px;">■</span> | `#312883` | Textes secondaires, slogans, accents |
| **Blanc** | <span style="background-color: #F1F1F1; color: black; padding: 5px;">■</span> | `#F1F1F1` | Fond, espaces blancs |

### Codes CSS/Tailwind

**CSS Variables (:root)**
```css
--brand-red: #ff2353;
--brand-blue: #312883;
--brand-white: #F1F1F1;
```

**Tailwind Classes**
```html
bg-brand-red      /* Fond rouge #ff2353 */
bg-brand-blue     /* Fond bleu #312883 */
bg-brand-white    /* Fond blanc #F1F1F1 */
text-brand-red    /* Texte rouge */
text-brand-blue   /* Texte bleu */
```

---

## 📝 Typographie

### 1. Dénomination de l'Entreprise
**"KOYAMA PLUS SARLU"**
- **Police** : Tahoma
- **Taille** : 36px
- **Poids** : Bold
- **Couleur** : Rouge (#ff2353)
- **Classe CSS** : `.brand-denomination`

```html
<h1 class="brand-denomination">KOYAMA PLUS SARLU</h1>
```

### 2. Corps du Texte
**Texte principal du contenu**
- **Police** : Tahoma
- **Taille** : 12px
- **Poids** : Regular
- **Couleur** : Noir/Gris (#333)
- **Interligne** : 1.5
- **Classe CSS** : `.brand-body-text`

```html
<p class="brand-body-text">
  Votre contenu ici...
</p>
```

### 3. Slogan
**"Avec KPLUS, votre satisfaction est réelle !"**
- **Police** : Monotype Corsiva
- **Taille** : 12px
- **Style** : Italic
- **Couleur** : Bleu (#312883)
- **Interligne** : 1.5
- **Classe CSS** : `.brand-slogan`

```html
<p class="brand-slogan">Avec KPLUS, votre satisfaction est réelle !</p>
```

---

## 🎯 Guide d'Utilisation

### En Tailwind CSS
```tsx
// Utiliser les couleurs
<div className="bg-brand-red text-white">
  <h1 className="text-brand-denomination font-tahoma font-bold">
    KOYAMA PLUS SARLU
  </h1>
  <p className="text-brand-body font-tahoma">
    Corps du texte standard
  </p>
  <em className="text-brand-slogan font-corsiva">
    Avec KPLUS, votre satisfaction est réelle !
  </em>
</div>
```

### En HTML/CSS Pur
```html
<h1 class="brand-denomination">KOYAMA PLUS SARLU</h1>
<p class="brand-body-text">Contenu principal</p>
<p class="brand-slogan">Avec KPLUS, votre satisfaction est réelle !</p>
```

---

## 📱 Responsive Design

- Les couleurs restent constantes sur tous les appareils
- Les tailles de police s'adaptent automatiquement via les breakpoints Tailwind
- Les polarités (contraste) doivent être maintenues sur tous les écrans

---

## 🔧 Configuration dans Tailwind

Les variables de couleurs et typographie sont définies dans `tailwind.config.js` :

```javascript
colors: {
  'brand-red': '#ff2353',
  'brand-blue': '#312883',
  'brand-white': '#F1F1F1',
},
fontFamily: {
  'tahoma': ['Tahoma', 'system-ui', 'sans-serif'],
  'corsiva': ['Monotype Corsiva', 'Georgia', 'serif'],
},
fontSize: {
  'brand-denomination': ['36px', { lineHeight: '1.2' }],
  'brand-body': ['12px', { lineHeight: '1.5' }],
  'brand-slogan': ['12px', { lineHeight: '1.5' }],
}
```

---

## ✅ Checklist d'Implémentation

- [x] Couleurs définies dans Tailwind
- [x] Polices configurées
- [x] Classes CSS personnalisées créées
- [x] Header utilisant la dénomination correcte
- [x] Variables CSS disponibles
- [x] Documentation complète

---

## 📢 Contact

Pour toute question sur la charte graphique ou les modifications, veuillez consulter ce document ou contacter le responsable du design.
