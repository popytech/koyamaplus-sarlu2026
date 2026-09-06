import { useState } from 'react';
import { assetUrl } from '../../lib/assetUrl';
import { ShoppingCart, Menu, X, User, Search, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';

interface HeaderProps {
  onCartClick: () => void;
  onAuthClick: () => void;
  currentPage: string;
  onNavigate: (page: string) => void;
}

export default function Header({ onCartClick, onAuthClick, currentPage, onNavigate }: HeaderProps) {
  const { user, profile, signOut } = useAuth();
  const { cartCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const navItems = [
    { label: 'Accueil', page: 'home' },
    { label: 'Boutique', page: 'shop' },
    { label: 'Nettoyage', page: 'cleaning' },
    { label: 'Blog', page: 'blog' },
    { label: 'À propos', page: 'about' },
    { label: 'Contact', page: 'contact' },
  ];

  const handleSignOut = async () => {
    try {
      await signOut();
      setUserMenuOpen(false);
      onNavigate('home');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50 w-full">
      <div className="max-w-7xl mx-auto px-2 xs:px-3 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 xs:h-20 sm:h-20">
          <div className="flex items-center cursor-pointer flex-shrink-0" onClick={() => onNavigate('home')}>
            <img 
              src={assetUrl('/images/LOGO KOYAMA PLUS SARLU PNG.png')}
              alt="KOYAMA PLUS SARLU" 
              className="h-12 xs:h-16 sm:h-20 object-contain"
            />
            <span className="hidden xs:hidden sm:block ml-1 xs:ml-2 font-tahoma font-bold text-sm xs:text-lg sm:text-2xl" style={{color: '#ff2353'}}>KOYAMA PLUS SARLU</span>
          </div>

          <nav className="hidden md:flex space-x-4 lg:space-x-8">
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => onNavigate(item.page)}
                className={`text-xs xs:text-sm md:text-sm lg:text-base font-medium transition-colors ${
                  currentPage === item.page
                    ? 'text-brand-blue font-semibold'
                    : 'text-brand-blue hover:text-brand-red'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center space-x-1 xs:space-x-2 sm:space-x-4">
            <button className="p-1.5 xs:p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Search className="w-4 xs:w-5 h-4 xs:h-5 text-gray-700" />
            </button>

            <button
              onClick={onCartClick}
              className="p-1.5 xs:p-2 hover:bg-gray-100 rounded-lg transition-colors relative"
            >
              <ShoppingCart className="w-4 xs:w-5 h-4 xs:h-5 text-gray-700" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 text-white text-xs font-bold rounded-full h-4 xs:h-5 w-4 xs:w-5 flex items-center justify-center text-[10px] xs:text-xs" style={{backgroundColor: '#ff2353'}}>
                  {cartCount}
                </span>
              )}
            </button>

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center space-x-1 xs:space-x-2 p-1.5 xs:p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <User className="w-4 xs:w-5 h-4 xs:h-5 text-gray-700" />
                  <span className="text-xs xs:text-sm font-medium text-gray-700 hidden sm:block">
                    {profile?.full_name || 'Mon compte'}
                  </span>
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 border">
                    <button
                      onClick={() => {
                        onNavigate('account');
                        setUserMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Mon compte
                    </button>
                    <button
                      onClick={() => {
                        onNavigate('orders');
                        setUserMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Mes commandes
                    </button>
                    {profile?.is_admin && (
                      <button
                        onClick={() => {
                          onNavigate('admin');
                          setUserMenuOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-brand-blue hover:bg-gray-100"
                      >
                        Administration
                      </button>
                    )}
                    <hr className="my-2" />
                    <button
                      onClick={handleSignOut}
                      className="w-full text-left px-4 py-2 text-sm text-brand-red hover:bg-gray-100 flex items-center"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Déconnexion
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={onAuthClick}
                className="hidden sm:flex items-center space-x-2 px-4 py-2 text-white rounded-lg transition-colors"
                style={{backgroundColor: '#ff2353'}}
              >
                <User className="w-4 h-4" />
                <span className="text-sm font-medium">Connexion</span>
              </button>
            )}

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t">
          <nav className="px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => {
                  onNavigate(item.page);
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  currentPage === item.page
                    ? 'bg-blue-100 text-brand-blue font-semibold'
                    : 'text-brand-blue hover:bg-blue-50'
                }`}
              >
                {item.label}
              </button>
            ))}
            {!user && (
              <button
                onClick={() => {
                  onAuthClick();
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left px-4 py-3 bg-brand-red text-white rounded-lg font-medium"
              >
                Connexion
              </button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
