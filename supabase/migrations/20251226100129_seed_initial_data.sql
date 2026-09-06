/*
  # Seed Initial Data for KOYAMA PLUS
  
  ## Description
  This migration populates initial data for:
  - Product categories (wellness products)
  - Cleaning services (professional cleaning types)
  
  ## Tables Populated
  1. product_categories - 5 main categories
  2. cleaning_services - 4 types of cleaning services
*/

-- Insert product categories
INSERT INTO product_categories (name, slug, description) VALUES
  ('Suppléments Alimentaires', 'supplements-alimentaires', 'Compléments nutritionnels pour votre bien-être quotidien'),
  ('Produits Naturels', 'produits-naturels', 'Soins et produits à base d''ingrédients naturels'),
  ('Soins Intimes', 'soins-intimes', 'Produits d''hygiène intime naturels et doux'),
  ('Patchs Détox', 'patchs-detox', 'Patchs détoxifiants pour purifier votre corps'),
  ('Appareils de Massage', 'appareils-massage', 'Appareils de massage et bien-être')
ON CONFLICT (slug) DO NOTHING;

-- Insert cleaning services
INSERT INTO cleaning_services (name, slug, description, base_price, icon, is_active) VALUES
  ('Nettoyage de Bureaux', 'nettoyage-bureaux', 'Service professionnel de nettoyage pour espaces de bureaux, open spaces et locaux professionnels', 50000, 'Building2', true),
  ('Nettoyage de Domiciles', 'nettoyage-domiciles', 'Nettoyage résidentiel complet pour particuliers : maisons, appartements et villas', 30000, 'Home', true),
  ('Nettoyage Fin de Chantier', 'nettoyage-fin-chantier', 'Nettoyage après travaux et fin de chantier pour bâtiments neufs ou rénovés', 75000, 'HardHat', true),
  ('Nettoyage Commercial', 'nettoyage-commercial', 'Nettoyage pour commerces, boutiques, restaurants et espaces commerciaux', 40000, 'Store', true)
ON CONFLICT (slug) DO NOTHING;
