import { useState } from 'react';
import { Lock, Mail } from 'lucide-react';

interface AdminLoginProps {
  onNavigate: (page: string) => void;
}

export default function AdminLogin({ onNavigate }: AdminLoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Credentials de test - À remplacer par une vraie authentification
  const ADMIN_EMAIL = 'admin@koyamaplus.com';
  const ADMIN_PASSWORD = 'admin123';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulation d'une vérification
    setTimeout(() => {
      if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        localStorage.setItem('isAdmin', 'true');
        localStorage.setItem('adminEmail', email);
        onNavigate('admin');
      } else {
        setError('Email ou mot de passe incorrect');
      }
      setLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-brand-blue flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-lg mb-4">
            <Lock className="text-brand-blue" size={32} />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">KOYAMA PLUS</h1>
          <p className="text-white/80">Panneau d'Administration</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-xl p-8">
          <h2 className="text-2xl font-bold text-brand-blue mb-6 text-center">Connexion Admin</h2>

          {error && (
            <div className="mb-6 p-4 bg-brand-red/10 border border-brand-red/30 rounded-lg text-brand-red text-sm">
              {error}
            </div>
          )}

          {/* Email Field */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent"
                placeholder="admin@koyamaplus.com"
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mot de passe
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brand-blue hover:bg-brand-red disabled:bg-gray-400 text-white font-medium py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            {loading ? 'Connexion en cours...' : 'Se Connecter'}
          </button>

          {/* Back to Home */}
          <button
            type="button"
            onClick={() => onNavigate('home')}
            className="w-full mt-4 border border-gray-300 text-gray-700 font-medium py-3 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Retour à l'accueil
          </button>
        </form>

        {/* Demo Credentials Info */}
        <div className="mt-6 bg-brand-blue/10 rounded-lg p-4 text-brand-blue text-sm">
          <p className="font-medium mb-2">🔐 Identifiants de test :</p>
          <p>Email: <span className="font-mono">admin@koyamaplus.com</span></p>
          <p>Mot de passe: <span className="font-mono">admin123</span></p>
        </div>
      </div>
    </div>
  );
}
