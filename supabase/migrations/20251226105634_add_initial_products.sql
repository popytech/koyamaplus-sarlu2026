/*
  # Add Initial Products to KOYAMA PLUS Store
  
  ## Description
  Adds 10 wellness and health products with prices in GNF (Guinean Francs)
  
  ## Products Added
  1. Patchs Détox Pieds Premium - 150,000 GNF
  2. Savon Naturel au Karité - 25,000 GNF
  3. Complexe Multivitamines Bio - 95,000 GNF
  4. Huile de Moringa Pure - 45,000 GNF
  5. Patchs Minceur Abdominaux - 135,000 GNF
  6. Savon Intime Naturel - 30,000 GNF
  7. Spiruline Bio en Poudre - 85,000 GNF
  8. Appareil de Massage Électrique - 250,000 GNF
  9. Thé Détox Naturel - 35,000 GNF
  10. Crème Hydratante au Beurre de Karité - 55,000 GNF
*/

-- Get category IDs
DO $$
DECLARE
  cat_patches uuid;
  cat_naturels uuid;
  cat_intimes uuid;
  cat_supplements uuid;
  cat_appareils uuid;
BEGIN
  -- Get category IDs
  SELECT id INTO cat_patches FROM product_categories WHERE slug = 'patchs-detox';
  SELECT id INTO cat_naturels FROM product_categories WHERE slug = 'produits-naturels';
  SELECT id INTO cat_intimes FROM product_categories WHERE slug = 'soins-intimes';
  SELECT id INTO cat_supplements FROM product_categories WHERE slug = 'supplements-alimentaires';
  SELECT id INTO cat_appareils FROM product_categories WHERE slug = 'appareils-massage';

  -- Insert products
  INSERT INTO products (category_id, name, slug, description, benefits, contraindications, price, sale_price, stock, images, is_featured, is_active) VALUES
    (
      cat_patches,
      'Patchs Détox Pieds Premium',
      'patchs-detox-pieds-premium',
      'Patchs détoxifiants pour éliminer les toxines pendant la nuit. Boîte de 10 patchs.',
      'Élimine les toxines, améliore la circulation sanguine, favorise un sommeil réparateur, réduit la fatigue et les douleurs.',
      'Ne pas utiliser sur une peau lésée. Déconseillé aux femmes enceintes.',
      150000,
      NULL,
      50,
      '["/images/graine (1).jpeg"]'::jsonb,
      true,
      true
    ),
    (
      cat_naturels,
      'Savon Naturel au Karité',
      'savon-naturel-karite',
      'Savon artisanal 100% naturel enrichi au beurre de karité. Idéal pour tous types de peau.',
      'Nourrit et hydrate la peau, propriétés antibactériennes, adapté aux peaux sensibles, 100% naturel.',
      'Usage externe uniquement. Éviter le contact avec les yeux.',
      25000,
      20000,
      100,
      '["/images/image 2.jpeg"]'::jsonb,
      true,
      true
    ),
    (
      cat_supplements,
      'Complexe Multivitamines Bio',
      'complexe-multivitamines-bio',
      'Complément alimentaire complet avec 13 vitamines et 9 minéraux essentiels. Boîte de 60 gélules.',
      'Renforce le système immunitaire, combat la fatigue, améliore la concentration, formule bio certifiée.',
      'Respecter la dose recommandée. Tenir hors de portée des enfants.',
      95000,
      NULL,
      75,
      '["/images/Xpower coffee.jpeg"]'::jsonb,
      false,
      true
    ),
    (
      cat_naturels,
      'Huile de Moringa Pure',
      'huile-moringa-pure',
      'Huile de moringa 100% pure et naturelle. Flacon de 100ml pour usage cosmétique et alimentaire.',
      'Riche en antioxydants, nourrit cheveux et peau, anti-inflammatoire, boost l''énergie.',
      'Conserver à l''abri de la lumière. Femmes enceintes: consulter un médecin.',
      45000,
      NULL,
      60,
      '["/images/graine (2).jpeg"]'::jsonb,
      false,
      true
    ),
    (
      cat_patches,
      'Patchs Minceur Abdominaux',
      'patchs-minceur-abdominaux',
      'Patchs amincissants pour la zone abdominale. Aide à réduire la graisse localisée. Boîte de 30 patchs.',
      'Favorise la perte de poids localisée, stimule le métabolisme, effet raffermissant, facile à utiliser.',
      'Ne remplace pas une alimentation équilibrée. Déconseillé aux femmes enceintes.',
      135000,
      120000,
      40,
      '["/images/Thé detox.jpeg"]'::jsonb,
      true,
      true
    ),
    (
      cat_intimes,
      'Savon Intime Naturel',
      'savon-intime-naturel',
      'Savon d''hygiène intime au pH équilibré, formulé avec des ingrédients naturels doux.',
      'Respecte le pH naturel, apaise et protège, formule douce sans parfum agressif, usage quotidien.',
      'Usage externe uniquement. En cas d''irritation, cesser l''utilisation.',
      30000,
      NULL,
      80,
      '["/images/thé anti fibrome (1).jpeg"]'::jsonb,
      false,
      true
    ),
    (
      cat_supplements,
      'Spiruline Bio en Poudre',
      'spiruline-bio-poudre',
      'Spiruline bio en poudre, super-aliment riche en protéines et nutriments. Sachet de 250g.',
      'Source de protéines végétales, riche en fer, renforce le système immunitaire, énergie naturelle.',
      'Déconseillé en cas d''allergie aux algues. Consulter un médecin en cas de doute.',
      85000,
      NULL,
      55,
      '["/images/the energétique.jpeg"]'::jsonb,
      false,
      true
    ),
    (
      cat_appareils,
      'Appareil de Massage Électrique',
      'appareil-massage-electrique',
      'Appareil de massage multifonction avec plusieurs modes et intensités. Rechargeable par USB.',
      'Soulage les tensions musculaires, améliore la circulation, portable et rechargeable, 5 modes de massage.',
      'Ne pas utiliser sur plaies ouvertes. Déconseillé aux porteurs de pacemaker.',
      250000,
      220000,
      25,
      '["/images/materiel netoyage (1).jpeg"]'::jsonb,
      true,
      true
    ),
    (
      cat_supplements,
      'Thé Détox Naturel',
      'the-detox-naturel',
      'Mélange de plantes détoxifiantes pour purifier l''organisme. Boîte de 20 sachets.',
      'Purifie l''organisme, favorise la digestion, effet drainant, ingrédients 100% naturels.',
      'Ne pas dépasser 2 tasses par jour. Déconseillé aux femmes enceintes.',
      35000,
      NULL,
      90,
      '["/images/Thé Occulaire.jpeg"]'::jsonb,
      false,
      true
    ),
    (
      cat_naturels,
      'Crème Hydratante au Beurre de Karité',
      'creme-hydratante-karite',
      'Crème hydratante corps et visage enrichie au beurre de karité. Pot de 200ml.',
      'Hydratation intense 24h, nourrit en profondeur, convient à tous types de peau, texture non grasse.',
      'Usage externe uniquement. Tester sur une petite zone en cas de peau sensible.',
      55000,
      NULL,
      70,
      '["/images/The anti ulcère.jpeg"]'::jsonb,
      false,
      true
    )
  ON CONFLICT (slug) DO NOTHING;
END $$;
