import { useState, useEffect } from 'react';
import { cleaningService, quotesService } from '../lib/dataService';
import { useAuth } from '../contexts/AuthContext';
import { CheckCircle } from 'lucide-react';

interface Service {
  id: string;
  name: string;
}

interface QuoteFormProps {
  preselectedServiceId?: string;
  onSuccess: () => void;
}

export default function QuoteForm({ preselectedServiceId, onSuccess }: QuoteFormProps) {
  const { user, profile } = useAuth();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    service_id: preselectedServiceId || '',
    full_name: profile?.full_name || '',
    email: profile?.email || '',
    phone: profile?.phone || '',
    city: profile?.city || '',
    address: '',
    surface_area: '',
    number_of_rooms: '',
    preferred_date: '',
    message: '',
  });

  useEffect(() => {
    fetchServices();
  }, []);

  useEffect(() => {
    if (profile) {
      setFormData(prev => ({
        ...prev,
        full_name: profile.full_name || '',
        email: profile.email || '',
        phone: profile.phone || '',
        city: profile.city || '',
      }));
    }
  }, [profile]);

  const fetchServices = async () => {
    try {
      const data = await cleaningService.getServices();
      const serviceOptions = data.map(s => ({ id: s.id, name: s.name }));
      setServices(serviceOptions);
      if (serviceOptions.length > 0 && !formData.service_id) {
        setFormData(prev => ({ ...prev, service_id: serviceOptions[0].id }));
      }
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await quotesService.createQuote({
        service_id: formData.service_id,
        full_name: formData.full_name,
        email: formData.email,
        phone: formData.phone,
        city: formData.city,
        address: formData.address || undefined,
        surface_area: formData.surface_area ? parseFloat(formData.surface_area) : undefined,
        number_of_rooms: formData.number_of_rooms ? parseInt(formData.number_of_rooms) : undefined,
        preferred_date: formData.preferred_date || undefined,
        message: formData.message || undefined,
      });

      setSubmitted(true);
      setTimeout(() => {
        onSuccess();
      }, 2000);
    } catch (error) {
      console.error('Error submitting quote:', error);
      alert('Erreur lors de l\'envoi de la demande');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 max-w-md text-center">
          <div className="bg-brand-red/10 w-12 sm:w-16 h-12 sm:h-16 rounded-lg flex items-center justify-center mx-auto mb-3 sm:mb-4">
            <CheckCircle className="w-7 sm:w-10 h-7 sm:h-10 text-brand-red" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-brand-blue mb-1 sm:mb-2">Demande envoyée !</h2>
          <p className="text-sm sm:text-base text-gray-600">
            Nous avons bien reçu votre demande de devis. Notre équipe vous contactera dans les plus brefs délais.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 sm:py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-brand-blue mb-1 sm:mb-2">Demande de devis</h1>
          <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8">
            Remplissez ce formulaire pour recevoir un devis personnalisé
          </p>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                Type de service *
              </label>
              <select
                name="service_id"
                value={formData.service_id}
                onChange={handleChange}
                className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-red focus:border-transparent text-sm sm:text-base"
                required
              >
                <option value="">Sélectionnez un service</option>
                {services.map(service => (
                  <option key={service.id} value={service.id}>
                    {service.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid md:grid-cols-2 gap-3 sm:gap-6">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                  Nom complet *
                </label>
                <input
                  type="text"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-red focus:border-transparent text-sm sm:text-base"
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
                  className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-red focus:border-transparent text-sm sm:text-base"
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-3 sm:gap-6">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                  Téléphone *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-red focus:border-transparent text-sm sm:text-base"
                  required
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                  Ville *
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-red focus:border-transparent text-sm sm:text-base"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                Adresse
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-red focus:border-transparent text-sm sm:text-base"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-3 sm:gap-6">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                  Surface (m²)
                </label>
                <input
                  type="number"
                  name="surface_area"
                  value={formData.surface_area}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-red focus:border-transparent text-sm sm:text-base"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                  Nombre de pièces
                </label>
                <input
                  type="number"
                  name="number_of_rooms"
                  value={formData.number_of_rooms}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-red focus:border-transparent text-sm sm:text-base"
                  min="0"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                Date souhaitée
              </label>
              <input
                type="date"
                name="preferred_date"
                value={formData.preferred_date}
                onChange={handleChange}
                className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-red focus:border-transparent text-sm sm:text-base"
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                Message / Détails supplémentaires
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-red focus:border-transparent text-sm sm:text-base"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-red text-white py-2.5 sm:py-3 rounded-lg font-semibold text-sm sm:text-base hover:bg-brand-blue transition-colors disabled:opacity-50"
            >
              {loading ? 'Envoi en cours...' : 'Recevoir mon devis'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
