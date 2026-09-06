import { useState, useEffect } from 'react';
import { TrendingUp, Package, FileText, Users, AlertCircle } from 'lucide-react';
import { productsService, cleaningService } from '../../lib/dataService';

interface DashboardStats {
  totalProducts: number;
  totalCleaningServices: number;
  lowStockProducts: number;
  blogArticles: number;
  totalRevenue: number;
}

interface AdminDashboardProps {
  onNavigateTab: (tab: 'dashboard' | 'products' | 'blog') => void;
}

export default function AdminDashboard({ onNavigateTab }: AdminDashboardProps) {
  const [stats, setStats] = useState<DashboardStats>({
    totalProducts: 0,
    totalCleaningServices: 0,
    lowStockProducts: 0,
    blogArticles: 2,
    totalRevenue: 0,
  });

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const [products, services] = await Promise.all([
        productsService.getAllProducts(),
        cleaningService.getServices(),
      ]);

      const blogPosts = localStorage.getItem('kp_blog_posts');
      const blogCount = blogPosts ? JSON.parse(blogPosts).length : 2;

      const lowStock = products.filter(p => p.stock < 20).length;

      setStats({
        totalProducts: products.length,
        totalCleaningServices: services.length,
        lowStockProducts: lowStock,
        blogArticles: blogCount,
        totalRevenue: 0,
      });
    } catch (error) {
      console.error('Erreur lors du chargement des données:', error);
    }
  };

  const StatCard = ({ 
    icon: Icon, 
    title, 
    value, 
    color,
    trend,
    alert
  }: { 
    icon: any; 
    title: string; 
    value: number | string;
    color: string;
    trend?: string;
    alert?: boolean;
  }) => (
    <div className={`bg-white rounded-lg shadow-md p-6 border-l-4 ${color} ${alert ? 'border-brand-red' : ''}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-gray-600 font-medium">{title}</h3>
        <Icon className="text-gray-400" size={24} />
      </div>
      <div className="flex items-baseline justify-between">
        <span className="text-3xl font-bold text-gray-900">{value}</span>
        {trend && <span className="text-sm text-brand-red flex items-center gap-1">
          <TrendingUp size={16} /> {trend}
        </span>}
      </div>
      {alert && (
        <div className="mt-4 flex items-center gap-2 text-brand-blue text-sm bg-brand-blue/5 p-2 rounded">
          <AlertCircle size={16} />
          <span>Action requise</span>
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-brand-blue text-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold mb-2">Bienvenue sur votre tableau de bord</h2>
        <p className="text-white/80">Gérez vos produits, articles de blog et services de nettoyage</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <StatCard
          icon={Package}
          title="Produits"
          value={stats.totalProducts}
          color="border-brand-red"
          trend="+12%"
        />
        <StatCard
          icon={Users}
          title="Services Nettoyage"
          value={stats.totalCleaningServices}
          color="border-brand-blue"
        />
        <StatCard
          icon={AlertCircle}
          title="Stock Faible"
          value={stats.lowStockProducts}
          color="border-brand-red"
          alert={stats.lowStockProducts > 0}
        />
        <StatCard
          icon={FileText}
          title="Articles Blog"
          value={stats.blogArticles}
          color="border-brand-blue"
        />
        <StatCard
          icon={TrendingUp}
          title="Revenu"
          value="0 GNF"
          color="border-brand-red"
        />
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <h3 className="text-2xl font-bold mb-6 text-gray-900">Actions Rapides</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => onNavigateTab('products')}
            className="bg-brand-red hover:bg-brand-blue text-white py-3 px-6 rounded-lg font-medium transition-colors"
          >
            + Ajouter un Produit
          </button>
          <button
            onClick={() => onNavigateTab('blog')}
            className="bg-brand-blue hover:bg-brand-red text-white py-3 px-6 rounded-lg font-medium transition-colors"
          >
            + Nouvel Article Blog
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <h3 className="text-2xl font-bold mb-6 text-gray-900">Activité Récente</h3>
        <div className="space-y-4">
          <div className="border-l-4 border-brand-red pl-4 py-2">
            <p className="text-gray-900 font-medium">Stock Thé Anti-Grippe mis à jour</p>
            <p className="text-gray-500 text-sm">Il y a 2 heures</p>
          </div>
          <div className="border-l-4 border-brand-blue pl-4 py-2">
            <p className="text-gray-900 font-medium">Nouvel article blog créé</p>
            <p className="text-gray-500 text-sm">Il y a 1 jour</p>
          </div>
          <div className="border-l-4 border-brand-blue pl-4 py-2">
            <p className="text-gray-900 font-medium">Service nettoyage ajouté</p>
            <p className="text-gray-500 text-sm">Il y a 3 jours</p>
          </div>
        </div>
      </div>
    </div>
  );
}
