interface TermsOfUseProps {
  onNavigate: (page: string) => void;
}

export default function TermsOfUse({ onNavigate }: TermsOfUseProps) {
  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header Section */}
      <section className="bg-brand-blue text-white py-12 sm:py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Conditions d'Utilisation</h1>
          <p className="text-sm sm:text-base opacity-90">Dernière mise à jour: février 2026</p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 sm:py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {/* Section 1 */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-brand-blue mb-4">1. Acceptation des Conditions</h2>
              <p className="text-gray-700 leading-relaxed">
                En accédant et en utilisant le site web de KOYAMA PLUS SARLU, vous acceptez d'être lié par ces conditions d'utilisation. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser ce site.
              </p>
            </div>

            {/* Section 2 */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-brand-blue mb-4">2. Utilisation du Site</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                Vous acceptez d'utiliser ce site uniquement à des fins légales et de vous conformer à toutes les lois et réglementations applicables. Vous vous engagez à ne pas:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Utiliser le site de manière abusive ou malveillante</li>
                <li>Transmettre des virus ou du code malveillant</li>
                <li>Accéder sans autorisation à d'autres systèmes ou données</li>
                <li>Violer la propriété intellectuelle d'autrui</li>
                <li>Utiliser le site pour des activités illégales</li>
              </ul>
            </div>

            {/* Section 3 */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-brand-blue mb-4">3. Propriété Intellectuelle</h2>
              <p className="text-gray-700 leading-relaxed">
                Tout le contenu du site, y compris les textes, images, logos, et designs, est la propriété exclusive de KOYAMA PLUS SARLU ou de ses fournisseurs de contenu. Vous ne pouvez pas reproduire, distribuer ou transmettre ce contenu sans autorisation écrite.
              </p>
            </div>

            {/* Section 4 */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-brand-blue mb-4">4. Limitation de Responsabilité</h2>
              <p className="text-gray-700 leading-relaxed">
                KOYAMA PLUS SARLU n'est pas responsable des dommages directs, indirects, ou consécutifs résultant de l'utilisation du site ou de l'incapacité à l'utiliser. Le site est fourni « tel quel » sans garantie expresse ou implicite.
              </p>
            </div>

            {/* Section 5 */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-brand-blue mb-4">5. Indemnisation</h2>
              <p className="text-gray-700 leading-relaxed">
                Vous vous engagez à indemniser et à tenir KOYAMA PLUS SARLU indemne de toute réclamation, dommage, ou frais résultant de votre violation de ces conditions ou de votre utilisation du site.
              </p>
            </div>

            {/* Section 6 */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-brand-blue mb-4">6. Loi Applicable</h2>
              <p className="text-gray-700 leading-relaxed">
                Ces conditions sont régies par les lois de la Guinée. Tout litige découlant de ces conditions sera soumis à la juridiction exclusive des tribunaux de Conakry.
              </p>
            </div>

            {/* Section 7 */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-brand-blue mb-4">7. Modification des Conditions</h2>
              <p className="text-gray-700 leading-relaxed">
                KOYAMA PLUS SARLU se réserve le droit de modifier ces conditions à tout moment. Les modifications seront effectives immédiatement après leur publication sur le site.
              </p>
            </div>

            {/* Section 8 */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-brand-blue mb-4">8. Contact</h2>
              <p className="text-gray-700 leading-relaxed">
                Pour toute question concernant ces conditions d'utilisation, veuillez nous contacter à:
              </p>
              <p className="text-gray-700 mt-3">
                Email: info@koyamaplus.com<br />
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
