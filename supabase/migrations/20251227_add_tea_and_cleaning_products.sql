/*
  # Add Tea Products and Cleaning Services
  
  ## Description
  Adds specialized tea products and cleaning service packages with your actual images
*/

-- Get category IDs
DO $$
DECLARE
  cat_naturels uuid;
  cat_cleaning uuid;
BEGIN
  -- Get category IDs
  SELECT id INTO cat_naturels FROM product_categories WHERE slug = 'produits-naturels';
  SELECT id INTO cat_cleaning FROM product_categories WHERE slug = 'nettoyage';

  -- Insert tea products
  INSERT INTO products (category_id, name, slug, description, benefits, contraindications, price, sale_price, stock, images, is_featured, is_active) VALUES
    (
      cat_naturels,
      'Thé Anti-Fibrome',
      'the-anti-fibrome',
      'Mélange spécial de plantes pour lutter contre les fibromes. Boîte de 20 sachets.',
      'Aide à réduire les fibromes, propriétés anti-inflammatoires, améliore la circulation, ingrédients naturels.',
      'Consulter un médecin avant utilisation. Ne remplace pas un traitement médical.',
      45000,
      NULL,
      60,
      '["/images/thé anti fibrome (2).jpeg"]'::jsonb,
      false,
      true
    ),
    (
      cat_naturels,
      'Thé Anti-Ulcère',
      'the-anti-ulcere',
      'Mélange thérapeutique pour soulager les ulcères. Boîte de 20 sachets.',
      'Apaise les ulcères, protège la muqueuse digestive, réduit l''inflammation, action cicatrisante.',
      'Ne remplace pas un traitement médical. Consulter un médecin en cas d''ulcère grave.',
      40000,
      NULL,
      70,
      '["/images/The anti ulcère.jpeg"]'::jsonb,
      false,
      true
    ),
    (
      cat_naturels,
      'Thé Oculaire',
      'the-oculaire',
      'Thé spécialisé pour la santé des yeux et amélioration de la vision. Boîte de 20 sachets.',
      'Renforce la vision, protège les yeux, riche en antioxydants, prévient la fatigue oculaire.',
      'Ne remplace pas une consultation ophtalmologique. À consommer régulièrement.',
      38000,
      NULL,
      75,
      '["/images/Thé Occulaire.jpeg"]'::jsonb,
      false,
      true
    ),
    (
      cat_naturels,
      'Thé pour Hémorroïdes',
      'the-hemorroides',
      'Mélange naturel pour soulager les hémorroïdes. Boîte de 20 sachets.',
      'Soulage les symptômes, propriétés astringentes, réduit l''inflammation, action apaisante.',
      'À combiner avec une hygiène appropriée. Consulter un médecin si persistance.',
      42000,
      NULL,
      65,
      '["/images/The hemorrîde.jpeg"]'::jsonb,
      false,
      true
    ),
    (
      cat_naturels,
      'Thé Énergétique',
      'the-energetique',
      'Thé boostant pour augmenter l''énergie et la vitalité. Boîte de 20 sachets.',
      'Augmente l''énergie naturellement, combat la fatigue, améliore la concentration, sans caféine synthétique.',
      'À consommer le matin ou en début d''après-midi. Non conseillé le soir.',
      35000,
      NULL,
      80,
      '["/images/the energétique.jpeg"]'::jsonb,
      true,
      true
    ),
    (
      cat_naturels,
      'Graine de Vitalité',
      'graine-vitalite',
      'Graines sélectionnées pour booster votre santé et vitalité. Sachet de 500g.',
      'Source de nutriments essentiels, améliore l''immunité, riche en protéines, énergie durable.',
      'À consommer avec modération. Stocker dans un endroit sec.',
      50000,
      NULL,
      55,
      '["/images/graine (2).jpeg"]'::jsonb,
      false,
      true
    ),
    (
      cat_naturels,
      'Xpower Coffee - Café Énergisant',
      'xpower-coffee',
      'Café premium avec formule énergisante. Sachet de 250g.',
      'Énergie durable, améliore la concentration, saveur riche et naturelle, formule énergisante.',
      'À consommer avec modération. Non conseillé aux enfants.',
      55000,
      48000,
      50,
      '["/images/Xpower coffee.jpeg"]'::jsonb,
      true,
      true
    )
  ON CONFLICT (slug) DO NOTHING;
END $$;

function AnimatedNumber({ end, duration = 2000, suffix = '' }: AnimatedNumberProps) {
  const [count, setCount] = useState(end);  // ✅ Commence à la valeur finale

  useEffect(() => {
    let currentValue = 0;
    
    if (end === 0) {
      setCount(0);
      return;
    }

    // ✅ Max 60 étapes pour fluidité (peu importe le nombre)
    const steps = Math.min(end, 60);
    const increment = end / steps;
    const stepDuration = duration / steps;

    const timer = setInterval(() => {
      currentValue += increment;
      if (currentValue >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(currentValue));
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [end, duration]);

  return <span>{count}{suffix}</span>;
}
