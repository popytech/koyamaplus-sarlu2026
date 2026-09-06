/*
  # Update Cleaning Service Prices to GNF
  
  ## Description
  Updates cleaning service base prices from FCFA to GNF (Guinean Francs)
  
  ## Price Updates
  - Nettoyage de Bureaux: 500,000 GNF
  - Nettoyage de Domiciles: 300,000 GNF  
  - Nettoyage Fin de Chantier: 750,000 GNF
  - Nettoyage Commercial: 400,000 GNF
*/

UPDATE cleaning_services SET base_price = 500000 WHERE slug = 'nettoyage-bureaux';
UPDATE cleaning_services SET base_price = 300000 WHERE slug = 'nettoyage-domiciles';
UPDATE cleaning_services SET base_price = 750000 WHERE slug = 'nettoyage-fin-chantier';
UPDATE cleaning_services SET base_price = 400000 WHERE slug = 'nettoyage-commercial';
