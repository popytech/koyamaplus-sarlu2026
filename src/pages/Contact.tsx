import { useState } from 'react';
import { Mail, Phone, MapPin, MessageCircle, CheckCircle } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setTimeout(() => setSubmitted(false), 3000);
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-brand-blue text-white py-12 sm:py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-3 sm:mb-4">Contactez-nous</h1>
          <p className="text-sm sm:text-base md:text-lg text-white/80">
            Notre équipe est à votre écoute
          </p>
        </div>
      </div>

      <div className="w-full px-4 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 sm:gap-12">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-brand-blue mb-4 sm:mb-6">Envoyez-nous un message</h2>

            {submitted && (
              <div className="bg-brand-red/10 border border-brand-red/30 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6 flex items-center">
                <CheckCircle className="w-5 h-5 text-brand-red mr-2 sm:mr-3 flex-shrink-0" />
                <span className="text-sm sm:text-base text-brand-red">Message envoyé avec succès !</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                  Nom complet *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent text-sm sm:text-base"
                  required
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent text-sm sm:text-base"
                  required
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                  Téléphone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent text-sm sm:text-base"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                  Sujet *
                </label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent text-sm sm:text-base"
                  required
                >
                  <option value="">Sélectionnez un sujet</option>
                  <option value="boutique">Question sur la boutique</option>
                  <option value="cleaning">Service de nettoyage</option>
                  <option value="commande">Suivi de commande</option>
                  <option value="autre">Autre</option>
                </select>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent text-sm sm:text-base"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-brand-red text-white py-2 sm:py-3 rounded-lg font-semibold hover:bg-brand-blue transition-colors disabled:opacity-50 text-sm sm:text-base"
              >
                {loading ? 'Envoi en cours...' : 'Envoyer le message'}
              </button>
            </form>
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-brand-blue mb-4 sm:mb-6">Nos coordonnées</h2>

            <div className="space-y-4 sm:space-y-6">
              <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="bg-brand-blue/10 p-2 sm:p-3 rounded-lg flex-shrink-0">
                    <Phone className="w-5 sm:w-6 h-5 sm:h-6 text-brand-blue" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-brand-blue mb-1 sm:mb-2 text-sm sm:text-base">Téléphone</h3>
                    <p className="text-sm sm:text-base text-gray-600">+224 625 75 31 09</p>
                    <p className="text-sm sm:text-base text-gray-600">+224 611 24 30 30</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="bg-brand-blue/10 p-2 sm:p-3 rounded-lg flex-shrink-0">
                    <Mail className="w-5 sm:w-6 h-5 sm:h-6 text-brand-blue" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-brand-blue mb-1 sm:mb-2 text-sm sm:text-base">Email</h3>
                    <p className="text-sm sm:text-base text-gray-600 break-all">contact@koyamaplus.gn</p>
                    <p className="text-sm sm:text-base text-gray-600 break-all">info@koyamaplus.gn</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="bg-brand-blue/10 p-2 sm:p-3 rounded-lg flex-shrink-0">
                    <MapPin className="w-5 sm:w-6 h-5 sm:h-6 text-brand-blue" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-brand-blue mb-1 sm:mb-2 text-sm sm:text-base">Adresse</h3>
                    <p className="text-sm sm:text-base text-gray-600">Matoto kondebouyin, Conakry</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="bg-brand-red/10 p-2 sm:p-3 rounded-lg flex-shrink-0">
                    <MessageCircle className="w-5 sm:w-6 h-5 sm:h-6 text-brand-red" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-brand-blue mb-1 sm:mb-2 text-sm sm:text-base">WhatsApp</h3>
                    <p className="text-sm sm:text-base text-gray-600 mb-2 sm:mb-3">
                      Discutez avec nous directement sur WhatsApp
                    </p>
                    <button
                      onClick={() => window.open('https://wa.me/224625753109', '_blank')}
                      className="bg-brand-red text-white px-3 sm:px-4 py-2 rounded-lg font-semibold hover:bg-brand-blue transition-colors flex items-center text-sm sm:text-base"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Ouvrir WhatsApp
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 sm:mt-8 bg-brand-blue rounded-lg shadow-lg p-4 sm:p-6 text-white">
              <h3 className="text-lg sm:text-xl font-bold mb-2">Horaires d'ouverture</h3>
              <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-white/80">
                <p>Lundi - Vendredi : 8h00 - 17h00</p>
                <p>Samedi : 8h00 - 17h00</p>
                <p>Dimanche : Fermé</p>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
