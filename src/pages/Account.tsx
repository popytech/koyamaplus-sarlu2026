import { useState, useEffect } from 'react';
import { User, Package, Calendar, MapPin } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function Account() {
  const { profile, refreshProfile } = useAuth();
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    address: '',
    city: '',
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        full_name: profile.full_name || '',
        phone: profile.phone || '',
        address: profile.address || '',
        city: profile.city || '',
      });
    }
  }, [profile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Update the profile locally
      const profiles = JSON.parse(localStorage.getItem('koyama_profiles') || '{}');
      if (profile?.id) {
        profiles[profile.id] = {
          ...profile,
          full_name: formData.full_name,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
        };
        localStorage.setItem('koyama_profiles', JSON.stringify(profiles));
      }

      await refreshProfile();
      setEditing(false);
      alert('Profil mis à jour avec succès');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Erreur lors de la mise à jour du profil');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  if (!profile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-brand-red mb-4"></div>
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full px-4 py-8 sm:py-12">
        <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-8 mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-brand-blue flex items-center mb-4 sm:mb-0">
              <User className="w-6 sm:w-8 h-6 sm:h-8 mr-2 sm:mr-3 text-brand-blue" />
              Mon Compte
            </h1>
            {!editing && (
              <button
                onClick={() => setEditing(true)}
                className="px-4 sm:px-6 py-2 bg-brand-red text-white rounded-lg font-semibold text-sm sm:text-base hover:bg-brand-blue transition-colors"
              >
                Modifier
              </button>
            )}
          </div>

          {editing ? (
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                  Nom complet
                </label>
                <input
                  type="text"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-red focus:border-transparent text-sm sm:text-base"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={profile.email}
                  className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm sm:text-base"
                  disabled
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
                  className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-red focus:border-transparent text-sm sm:text-base"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                  Ville
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-red focus:border-transparent text-sm sm:text-base"
                />
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

              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-brand-red text-white py-2 sm:py-3 rounded-lg font-semibold text-sm sm:text-base hover:bg-brand-blue transition-colors disabled:opacity-50"
                >
                  {loading ? 'Enregistrement...' : 'Enregistrer'}
                </button>
                <button
                  type="button"
                  onClick={() => setEditing(false)}
                  className="flex-1 bg-gray-200 text-gray-700 py-2 sm:py-3 rounded-lg font-semibold text-sm sm:text-base hover:bg-gray-300 transition-colors"
                >
                  Annuler
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-start space-x-2 sm:space-x-3 pb-3 sm:pb-4 border-b">
                <User className="w-4 sm:w-5 h-4 sm:h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                <div className="min-w-0">
                  <div className="text-xs sm:text-sm text-gray-500">Nom complet</div>
                  <div className="font-medium text-sm sm:text-base text-gray-900 break-words">
                    {profile.full_name || 'Non renseigné'}
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-2 sm:space-x-3 pb-3 sm:pb-4 border-b">
                <Package className="w-4 sm:w-5 h-4 sm:h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                <div className="min-w-0">
                  <div className="text-xs sm:text-sm text-gray-500">Email</div>
                  <div className="font-medium text-sm sm:text-base text-gray-900 break-all">{profile.email}</div>
                </div>
              </div>

              <div className="flex items-start space-x-2 sm:space-x-3 pb-3 sm:pb-4 border-b">
                <Calendar className="w-4 sm:w-5 h-4 sm:h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                <div className="min-w-0">
                  <div className="text-xs sm:text-sm text-gray-500">Téléphone</div>
                  <div className="font-medium text-sm sm:text-base text-gray-900 break-words">
                    {profile.phone || 'Non renseigné'}
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-2 sm:space-x-3 pb-3 sm:pb-4 border-b">
                <MapPin className="w-4 sm:w-5 h-4 sm:h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                <div className="min-w-0">
                  <div className="text-xs sm:text-sm text-gray-500">Ville</div>
                  <div className="font-medium text-sm sm:text-base text-gray-900 break-words">
                    {profile.city || 'Non renseigné'}
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-2 sm:space-x-3">
                <MapPin className="w-4 sm:w-5 h-4 sm:h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                <div className="min-w-0">
                  <div className="text-xs sm:text-sm text-gray-500">Adresse</div>
                  <div className="font-medium text-sm sm:text-base text-gray-900 break-words">
                    {profile.address || 'Non renseigné'}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      </div>
    </div>
  );
}
