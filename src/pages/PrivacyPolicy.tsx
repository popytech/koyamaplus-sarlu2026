interface PrivacyPolicyProps {
  onNavigate: (page: string) => void;
}

export default function PrivacyPolicy({ onNavigate }: PrivacyPolicyProps) {
  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header Section */}
      <section className="bg-brand-blue text-white py-12 sm:py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Politique de Confidentialité</h1>
          <p className="text-sm sm:text-base opacity-90">Dernière mise à jour: février 2026</p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 sm:py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {/* Section 1 */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-brand-blue mb-4">1. Introduction</h2>
              <p className="text-gray-700 leading-relaxed">
                KOYAMA PLUS SARLU est attachée à la protection de votre vie privée. Cette politique de confidentialité explique comment nous collectons, utilisons, et protégez vos données personnelles lorsque vous utilisez notre site web et nos services.
              </p>
            </div>

            {/* Section 2 */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-brand-blue mb-4">2. Données Collectées</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                Nous collectons les types de données suivants:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li><strong>Informations personnelles:</strong> Nom, email, numéro de téléphone, adresse</li>
                <li><strong>Informations de compte:</strong> Nom d'utilisateur, mot de passe, historique d'achats</li>
                <li><strong>Informations de paiement:</strong> Numéro de carte détails de facturation (traité de manière sécurisée)</li>
                <li><strong>Données de navigation:</strong> Pages visitées, clic, temps passé, adresse IP</li>
                <li><strong>Données de communication:</strong> Contenu des messages, requêtes d'assistance</li>
              </ul>
            </div>

            {/* Section 3 */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-brand-blue mb-4">3. Utilisation des Données</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                Nous utilisons vos données pour:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Traiter vos commandes et livraisons</li>
                <li>Envoyer des confirmations et mises à jour concernant votre compte</li>
                <li>Améliorer nos services et produits</li>
                <li>Personnaliser votre expérience utilisateur</li>
                <li>Vous envoyer des notifications et promotions (avec votre consentement)</li>
                <li>Respecter les obligations légales et réglementaires</li>
              </ul>
            </div>

            {/* Section 4 */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-brand-blue mb-4">4. Sécurité des Données</h2>
              <p className="text-gray-700 leading-relaxed">
                KOYAMA PLUS SARLU met en place des mesures de sécurité appropriées pour protéger vos données contre l'accès non autorisé, l'altération, ou la destruction. Nous utilisons le chiffrement SSL/TLS pour sécuriser les informations sensibles.
              </p>
            </div>

            {/* Section 5 */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-brand-blue mb-4">5. Partage des Données</h2>
              <p className="text-gray-700 leading-relaxed">
                Vos données ne sont partagées avec des tiers que lorsque cela est nécessaire pour:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Traiter vos paiements (prestataires de paiement sécurisés)</li>
                <li>Livrer vos commandes (partenaires logistiques)</li>
                <li>Respecter les lois applicables</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-3">
                Nous ne vendons jamais vos données personnelles à des tiers à des fins commerciales.
              </p>
            </div>

            {/* Section 6 */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-brand-blue mb-4">6. Droits de l'Utilisateur</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                Vous avez le droit de:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Accéder à vos données personnelles</li>
                <li>Demander la correction des données incorrectes</li>
                <li>Demander la suppression de vos données</li>
                <li>Retirer votre consentement à tout moment</li>
                <li>Recevoir une copie de vos données au format structuré</li>
              </ul>
            </div>

            {/* Section 7 */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-brand-blue mb-4">7. Cookies</h2>
              <p className="text-gray-700 leading-relaxed">
                Notre site utilise des cookies pour améliorer votre expérience utilisateur. Vous pouvez contrôler les cookies via les paramètres de votre navigateur. Le refus de certains cookies pourrait affecter votre navigation.
              </p>
            </div>

            {/* Section 8 */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-brand-blue mb-4">8. Modifications de la Politique</h2>
              <p className="text-gray-700 leading-relaxed">
                KOYAMA PLUS SARLU se réserve le droit de modifier cette politique de confidentialité. Les modifications seront publiées sur cette page avec une date de mise à jour.
              </p>
            </div>

            {/* Section 9 */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-brand-blue mb-4">9. Contact</h2>
              <p className="text-gray-700 leading-relaxed">
                Pour les questions concernant votre vie privée ou cette politique, veuillez nous contacter:
              </p>
              <p className="text-gray-700 mt-3">
                Email: privacy@koyamaplus.com<br />
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
