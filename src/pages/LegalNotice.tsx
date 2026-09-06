interface LegalNoticeProps {
  onNavigate: (page: string) => void;
}

export default function LegalNotice({ onNavigate }: LegalNoticeProps) {
  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header Section */}
      <section className="bg-brand-blue text-white py-12 sm:py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Mentions Légales</h1>
          <p className="text-sm sm:text-base opacity-90">Dernière mise à jour: février 2026</p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 sm:py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {/* Section 1 */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-brand-blue mb-4">1. Identifier de l'Entreprise</h2>
              <div className="text-gray-700 space-y-2">
                <p><strong>Dénomination Sociale:</strong> KOYAMA PLUS SARLU</p>
                <p><strong>Siège Social:</strong> Conakry, Guinée</p>
                <p><strong>Numéro RCCM:</strong> [À compléter]</p>
                <p><strong>Représentant Légal:</strong> [À compléter]</p>
                <p><strong>Email:</strong> info@koyamaplus.com</p>
                <p><strong>Téléphone:</strong> +224 XXXXXXXXX</p>
              </div>
            </div>

            {/* Section 2 */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-brand-blue mb-4">2. Direction de la Publication</h2>
              <p className="text-gray-700 leading-relaxed">
                Directeur de la Publication: [Nom du Directeur]<br />
                Email: director@koyamaplus.com
              </p>
            </div>

            {/* Section 3 */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-brand-blue mb-4">3. Hébergement du Site</h2>
              <p className="text-gray-700 leading-relaxed">
                Fournisseur d'Hébergement: [À compléter]<br />
                Adresse: [À compléter]<br />
                Téléphone: [À compléter]
              </p>
            </div>

            {/* Section 4 */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-brand-blue mb-4">4. Propriété Intellectuelle</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                Le contenu du site, y compris les textes, images, logos, graphiques, et designs, est la propriété exclusive de KOYAMA PLUS SARLU et est protégé par les lois applicables sur la propriété intellectuelle.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Toute reproduction, distribution, ou transmission sans autorisation express est interdite.
              </p>
            </div>

            {/* Section 5 */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-brand-blue mb-4">5. Responsabilité</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                KOYAMA PLUS SARLU s'efforce de maintenir l'exactitude et la mise à jour du contenu du site. Cependant:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Le site est fourni « tel quel » sans garantie expresse ou implicite</li>
                <li>KOYAMA PLUS SARLU n'est pas responsable des erreurs ou omissions dans le contenu</li>
                <li>KOYAMA PLUS SARLU n'est pas responsable des dommages résultant de l'utilisation du site</li>
                <li>Les liens externes ne sont pas sous le contrôle de KOYAMA PLUS SARLU</li>
              </ul>
            </div>

            {/* Section 6 */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-brand-blue mb-4">6. Conditions Commerciales</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                Les prix affichés sur le site sont en Francs Guinéens (GNF) ou dans la devise indiquée. Les prix sont sujets à modification sans préavis. Toutes les commandes sont acceptées sous réserve de disponibilité des produits.
              </p>
              <p className="text-gray-700 leading-relaxed">
                KOYAMA PLUS SARLU se réserve le droit de refuser ou d'annuler toute commande.
              </p>
            </div>

            {/* Section 7 */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-brand-blue mb-4">7. Livraison et Retours</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                <strong>Délais de Livraison:</strong> Les commandes sont généralement traitées sous 48 à 72 heures. Les délais de livraison dépendent de votre localisation.
              </p>
              <p className="text-gray-700 leading-relaxed mb-3">
                <strong>Politique de Retour:</strong> Les produits peuvent être retournés sous 14 jours à compter de la date d'achat, dans leur état d'origine et avec approbation préalable.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Pour plus de détails, veuillez consulter nos conditions de vente.
              </p>
            </div>

            {/* Section 8 */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-brand-blue mb-4">8. Paiement et Sécurité</h2>
              <p className="text-gray-700 leading-relaxed">
                Tous les paiements sont traités de manière sécurisée. Nous acceptons les cartes bancaires, les virements, et d'autres méthodes de paiement. Vos informations de paiement ne sont jamais stockées sur nos serveurs.
              </p>
            </div>

            {/* Section 9 */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-brand-blue mb-4">9. Loi Applicable</h2>
              <p className="text-gray-700 leading-relaxed">
                Ces mentions légales sont régies par les lois de la Guinée. Tout litige découlant de l'utilisation de ce site sera soumis à la juridiction exclusive des tribunaux compétents de Conakry.
              </p>
            </div>

            {/* Section 10 */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-brand-blue mb-4">10. Contact et Réclamations</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                Pour toute question, réclamation, ou signalement d'abus concernant ce site:
              </p>
              <p className="text-gray-700">
                Email: legal@koyamaplus.com<br />
                Téléphone: +224 XXXXXXXXX<br />
                Adresse: Conakry, Guinée
              </p>
            </div>
          </div>

          {/* Back Button */}
          <div className="mt-12 pt-8 border-t border-gray-300">
            <button
              onClick={() => onNavigate('home')}
              className="px-6 py-3 bg-brand-red text-white font-semibold rounded-lg hover:bg-brand-blue transition-colors"
            >
              Retour à l'Accueil
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
