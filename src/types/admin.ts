// Types utilisés dans le dashboard admin

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  sale_price: number | null;
  stock: number;
  images: string[];
  category_id: string;
  is_featured: boolean;
  is_active: boolean;
  benefits?: string;
  contraindications?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: 'wellness' | 'cleaning';
  image_url: string;
  created_at: string;
  updated_at: string;
  published: boolean;
  author: string;
}

export interface DashboardStats {
  totalProducts: number;
  totalCleaningServices: number;
  lowStockProducts: number;
  blogArticles: number;
  totalRevenue: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image_url: string;
}

export interface AdminUser {
  id: string;
  email: string;
  role: 'admin' | 'moderator' | 'editor';
  created_at: string;
}
