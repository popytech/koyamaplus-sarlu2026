import { useState, useEffect } from 'react';
import { BarChart3, Package, FileText, LogOut } from 'lucide-react';
import AdminDashboard from '../components/Admin/AdminDashboard';
import ProductManager from '../components/Admin/ProductManager';
import BlogManager from '../components/Admin/BlogManager';

interface AdminProps {
  onNavigate: (page: string) => void;
}

type AdminTab = 'dashboard' | 'products' | 'blog';

export default function Admin({ onNavigate }: AdminProps) {
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  useEffect(() => {
    if (!isAdmin) {
      onNavigate('admin-login');
    }
  }, [isAdmin, onNavigate]);

  if (!isAdmin) return null;

  const tabs = [
    { id: 'dashboard', label: 'Tableau de Bord', icon: BarChart3 },
    { id: 'products', label: 'Produits', icon: Package },
    { id: 'blog', label: 'Blog', icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header Admin */}
      <div className="bg-brand-blue text-white sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold">Panneau d'Administration</h1>
          <button
            onClick={() => {
              localStorage.removeItem('isAdmin');
              onNavigate('home');
            }}
            className="flex items-center gap-2 bg-brand-red hover:bg-brand-blue px-4 py-2 rounded-lg transition-colors"
          >
            <LogOut size={20} />
            Déconnexion
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-4">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as AdminTab)}
                  className={`flex items-center gap-2 px-6 py-4 font-medium border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-brand-red text-brand-red'
                      : 'border-transparent text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Icon size={20} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'dashboard' && <AdminDashboard onNavigateTab={setActiveTab} />}
        {activeTab === 'products' && <ProductManager />}
        {activeTab === 'blog' && <BlogManager />}
      </div>
    </div>
  );
}
