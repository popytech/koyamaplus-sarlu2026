import { useState, useEffect } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import WhatsAppButton from './components/Layout/WhatsAppButton';
import AuthModal from './components/Auth/AuthModal';
import CartSidebar from './components/Cart/CartSidebar';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Cleaning from './pages/Cleaning';
import QuoteForm from './pages/QuoteForm';
import Blog from './pages/Blog';
import About from './pages/About';
import Contact from './pages/Contact';
import Account from './pages/Account';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import TermsOfUse from './pages/TermsOfUse';
import PrivacyPolicy from './pages/PrivacyPolicy';
import LegalNotice from './pages/LegalNotice';
import Admin from './pages/Admin';
import AdminLogin from './pages/AdminLogin';

type Page = 'home' | 'shop' | 'cleaning' | 'quote' | 'blog' | 'about' | 'contact' | 'account' | 'orders' | 'checkout' | 'terms' | 'privacy' | 'legal' | 'admin' | 'admin-login';

// Mapper les URLs aux pages
const urlToPageMap: Record<string, Page> = {
  '/': 'home',
  '/shop': 'shop',
  '/cleaning': 'cleaning',
  '/quote': 'quote',
  '/blog': 'blog',
  '/about': 'about',
  '/contact': 'contact',
  '/account': 'account',
  '/orders': 'orders',
  '/checkout': 'checkout',
  '/terms': 'terms',
  '/privacy': 'privacy',
  '/legal': 'legal',
  '/admin': 'admin',
  '/admin-login': 'admin-login',
};

const getPageFromUrl = (): Page => {
  const path = window.location.pathname;
  return urlToPageMap[path] || 'home';
};

function App() {
  const [currentPage, setCurrentPage] = useState<Page>(getPageFromUrl());
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState<string | undefined>();

  // Écouter les changements d'URL (bouton retour/avant)
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPage(getPageFromUrl());
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
    
    // Trouver l'URL correspondante
    const url = Object.entries(urlToPageMap).find(([_, p]) => p === page)?.[0] || '/';
    window.history.pushState({ page }, '', url);
    window.scrollTo(0, 0);
  };

  const handleQuoteClick = (serviceId?: string) => {
    setSelectedServiceId(serviceId);
    setCurrentPage('quote');
  };

  const handleCheckout = () => {
    setCartOpen(false);
    setCurrentPage('checkout');
    window.scrollTo(0, 0);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={handleNavigate} />;
      case 'shop':
        return (
          <Shop
            onAuthClick={() => setAuthModalOpen(true)}
            onProductClick={(id) => console.log('Product:', id)}
          />
        );
      case 'cleaning':
        return <Cleaning onQuoteClick={handleQuoteClick} />;
      case 'quote':
        return (
          <QuoteForm
            preselectedServiceId={selectedServiceId}
            onSuccess={() => handleNavigate('home')}
          />
        );
      case 'blog':
        return <Blog />;
      case 'about':
        return <About />;
      case 'contact':
        return <Contact/>;
      case 'account':
        return <Account />;
      case 'orders':
        return <Orders />;
      case 'checkout':
        return (
          <Checkout
            onSuccess={() => handleNavigate('home')}
            onBack={() => handleNavigate('shop')}
          />
        );
      case 'terms':
        return <TermsOfUse onNavigate={handleNavigate} />;
      case 'privacy':
        return <PrivacyPolicy onNavigate={handleNavigate} />;
      case 'legal':
        return <LegalNotice onNavigate={handleNavigate} />;
      case 'admin':
        return <Admin onNavigate={handleNavigate} />;
      case 'admin-login':
        return <AdminLogin onNavigate={handleNavigate} />;
      default:
        return <Home onNavigate={handleNavigate} />;
    }
  };

  const isAdminPage = currentPage === 'admin' || currentPage === 'admin-login';

  return (
    <AuthProvider>
      <CartProvider>
        <div className="min-h-screen flex flex-col w-full">
          {!isAdminPage && (
            <Header
              onCartClick={() => setCartOpen(true)}
              onAuthClick={() => setAuthModalOpen(true)}
              currentPage={currentPage}
              onNavigate={handleNavigate}
            />
          )}

          <main className="flex-1 w-full">
            {renderPage()}
          </main>

          {!isAdminPage && <Footer onNavigate={handleNavigate} />}
          {!isAdminPage && <WhatsAppButton />}

          <AuthModal
            isOpen={authModalOpen}
            onClose={() => setAuthModalOpen(false)}
          />

          <CartSidebar
            isOpen={cartOpen}
            onClose={() => setCartOpen(false)}
            onCheckout={handleCheckout}
          />
        </div>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
