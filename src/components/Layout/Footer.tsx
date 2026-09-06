import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin, Heart, Youtube, Music } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-brand-blue text-white relative pt-12 sm:pt-20 pb-6 sm:pb-8 border-t border-brand-red/20">
      <div className="max-w-7xl mx-auto px-3 sm:px-4">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 sm:gap-8 lg:gap-12 mb-8 sm:mb-12">
          {/* Brand Section */}
          <div className="col-span-2 sm:col-span-1 space-y-2 sm:space-y-4">
            <h3 className="brand-denomination text-lg sm:text-2xl !text-white">
              KOYAMA PLUS SARLU
            </h3>
            <p className="text-white text-xs sm:text-sm leading-relaxed hidden sm:block font-tahoma">
              Votre partenaire de confiance pour le bien-être naturel et les services professionnels de nettoyage.
            </p>
            <p className="brand-slogan text-xs sm:text-sm">
              « Avec KPLUS, votre satisfaction est réelle ! »
            </p>
            <div className="flex space-x-2 sm:space-x-3 pt-2 sm:pt-4">
              <a href="https://www.facebook.com/search/top?q=koyama%20plus%20sarlu" target="_blank" rel="noopener noreferrer" className="w-8 sm:w-10 h-8 sm:h-10 rounded-lg flex items-center justify-center hover:opacity-80 transition duration-300" style={{backgroundColor: 'rgba(255, 35, 83, 0.2)', border: '1px solid #ff2353'}}>
                <Facebook className="w-4 sm:w-5 h-4 sm:h-5" style={{color: '#ffffff'}} />
              </a>
              <a href="https://www.instagram.com/koyamaplus/" target="_blank" rel="noopener noreferrer" className="w-8 sm:w-10 h-8 sm:h-10 rounded-lg flex items-center justify-center hover:opacity-80 transition duration-300" style={{backgroundColor: 'rgba(255, 35, 83, 0.2)', border: '1px solid #ff2353'}}>
                <Instagram className="w-4 sm:w-5 h-4 sm:h-5" style={{color: '#ffffff'}} />
              </a>
              <a href="https://www.tiktok.com/@koyamaplus" target="_blank" rel="noopener noreferrer" className="w-8 sm:w-10 h-8 sm:h-10 rounded-lg flex items-center justify-center hover:opacity-80 transition duration-300" style={{backgroundColor: 'rgba(255, 35, 83, 0.2)', border: '1px solid #ff2353'}}>
                <Music className="w-4 sm:w-5 h-4 sm:h-5" style={{color: '#ffffff'}} />
              </a>
              <a href="https://www.youtube.com/@koyamaplussarlu" target="_blank" rel="noopener noreferrer" className="w-8 sm:w-10 h-8 sm:h-10 rounded-lg flex items-center justify-center hover:opacity-80 transition duration-300" style={{backgroundColor: 'rgba(255, 35, 83, 0.2)', border: '1px solid #ff2353'}}>
                <Youtube className="w-4 sm:w-5 h-4 sm:h-5" style={{color: '#ffffff'}} />
              </a>
              <a href="https://www.linkedin.com/company/koyama-plus-sarlu/" target="_blank" rel="noopener noreferrer" className="w-8 sm:w-10 h-8 sm:h-10 rounded-lg flex items-center justify-center hover:opacity-80 transition duration-300" style={{backgroundColor: 'rgba(49, 40, 131, 0.2)', border: '1px solid #312883'}}>
                <Linkedin className="w-4 sm:w-5 h-4 sm:h-5" style={{color: '#ffffff'}} />
              </a>
            </div>
          </div>

          {/* Boutique Links */}
          <div className="hidden sm:block">
            <h4 className="text-sm sm:text-lg font-bold text-white mb-3 sm:mb-6 flex items-center space-x-1 sm:space-x-2">
              <div className="w-1 h-4 sm:h-6 bg-white rounded" />
              <span>Boutique</span>
            </h4>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <button onClick={() => onNavigate('shop')} className="text-white hover:text-white/70 transition text-xs sm:text-sm">
                  Tous les produits
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('shop')} className="text-white hover:text-white/70 transition text-xs sm:text-sm">
                  Produits Naturels
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('shop')} className="text-white hover:text-white/70 transition text-xs sm:text-sm hidden md:block">
                  Suppléments Alimentaires
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('shop')} className="text-white hover:text-white/70 transition text-xs sm:text-sm hidden md:block">
                  Appareils de Massage
                </button>
              </li>
            </ul>
          </div>

          {/* Services Links */}
          <div className="hidden sm:block">
            <h4 className="text-sm sm:text-lg font-bold text-white mb-3 sm:mb-6 flex items-center space-x-1 sm:space-x-2">
              <div className="w-1 h-4 sm:h-6 bg-white rounded" />
              <span>Services</span>
            </h4>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <button onClick={() => onNavigate('cleaning')} className="text-white hover:text-white/70 transition text-xs sm:text-sm">
                  Nettoyage Bureaux
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('cleaning')} className="text-white hover:text-white/70 transition text-xs sm:text-sm">
                  Nettoyage Domiciles
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('cleaning')} className="text-white hover:text-white/70 transition text-xs sm:text-sm hidden md:block">
                  Fin de Chantier
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('cleaning')} className="text-white hover:text-white/70 transition text-xs sm:text-sm hidden md:block">
                  Services Commerciaux
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('quote')} className="text-white hover:text-white/70 transition text-xs sm:text-sm">
                  Devis Gratuit
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm sm:text-lg font-bold text-white mb-3 sm:mb-6 flex items-center space-x-1 sm:space-x-2">
              <div className="w-1 h-4 sm:h-6 bg-white rounded" />
              <span>Contact</span>
            </h4>
            <ul className="space-y-2 sm:space-y-4">
              <li className="flex flex-col sm:flex-row sm:items-start sm:space-x-3 gap-1 sm:gap-0">
                <div className="flex items-start space-x-2 sm:space-x-3">
                  <Phone className="w-4 sm:w-5 h-4 sm:h-5 text-white flex-shrink-0 mt-0.5" />
                  <div className="text-xs sm:text-sm space-y-0.5">
                    <a href="tel:+224625753109" className="block text-white hover:text-white/70">+224 625 75 31 09</a>
                    <a href="tel:+224611243030" className="block text-white hover:text-white/70">+224 611 24 30 30</a>
                  </div>
                </div>
              </li>
              <li className="flex items-start space-x-2 sm:space-x-3">
                <Mail className="w-4 sm:w-5 h-4 sm:h-5 text-white flex-shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm">contact@koyamaplus.gn</span>
              </li>
              <li className="flex items-start space-x-2 sm:space-x-3">
                <MapPin className="w-4 sm:w-5 h-4 sm:h-5 text-white flex-shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm">Matoto kondebouyin, Conakry</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700/50 my-4 sm:my-8" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-6">
          <div className="text-center md:text-left w-full">
            <p className="text-white text-xs sm:text-sm mb-1">
              © 2026 KOYAMA PLUS SARLU. Tous droits réservés.
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-2 text-xs text-white">
              <button onClick={() => onNavigate('terms')} className="hover:text-white/70 transition hidden sm:inline bg-none border-none cursor-pointer">Conditions d'utilisation</button>
              <span className="hidden sm:inline">•</span>
              <button onClick={() => onNavigate('privacy')} className="hover:text-white/70 transition hidden sm:inline bg-none border-none cursor-pointer">Politique de confidentialité</button>
              <span className="hidden sm:inline">•</span>
              <button onClick={() => onNavigate('legal')} className="hover:text-white/70 transition bg-none border-none cursor-pointer">Mentions légales</button>
            </div>
          </div>

          <div className="text-center md:text-right w-full md:w-auto">
            <p className="text-white text-xs sm:text-sm opacity-90">
              KOYAMA PLUS SARLU – Bien-être naturel & nettoyage professionnel
            </p>
          </div>
        </div>

        {/* Admin Access Link - Hidden but accessible */}
        <div className="flex justify-between items-center pt-6 border-t border-white/20">
          <div className="flex items-center gap-2 text-xs text-white/70">
            <span></span>
          </div>
          <button
            onClick={() => onNavigate('admin-login')}
            className="text-xs text-white/50 hover:text-white/80 transition-colors py-1 px-2 rounded hover:bg-white/10"
            title="Accès administrateur"
          >
            Admin
          </button>
        </div>
      </div>

      {/* Top Line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-white/20" />
    </footer>
  );
}
