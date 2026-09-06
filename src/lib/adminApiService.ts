import { Product, BlogPost, DashboardStats } from '../types/admin';

/**
 * Service API pour les opérations admin
 * À intégrer avec Supabase ou votre API backend
 */

class AdminApiService {
  private baseURL = '/api/admin';

  // ============ PRODUITS ============

  async getProducts(): Promise<Product[]> {
    try {
      // À remplacer par l'appel API réel
      // const response = await fetch(`${this.baseURL}/products`);
      // return response.json();
      return [];
    } catch (error) {
      console.error('Erreur lors du chargement des produits:', error);
      throw error;
    }
  }

  async createProduct(product: Omit<Product, 'id'>): Promise<Product> {
    try {
      // const response = await fetch(`${this.baseURL}/products`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(product),
      // });
      // return response.json();
      return { ...product, id: Date.now().toString() } as Product;
    } catch (error) {
      console.error('Erreur lors de la création du produit:', error);
      throw error;
    }
  }

  async updateProduct(id: string, product: Partial<Product>): Promise<Product> {
    try {
      // const response = await fetch(`${this.baseURL}/products/${id}`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(product),
      // });
      // return response.json();
      return { id, ...product } as Product;
    } catch (error) {
      console.error('Erreur lors de la mise à jour du produit:', error);
      throw error;
    }
  }

  async deleteProduct(id: string): Promise<void> {
    try {
      // await fetch(`${this.baseURL}/products/${id}`, {
      //   method: 'DELETE',
      // });
    } catch (error) {
      console.error('Erreur lors de la suppression du produit:', error);
      throw error;
    }
  }

  // ============ ARTICLES DE BLOG ============

  async getBlogPosts(): Promise<BlogPost[]> {
    try {
      // const response = await fetch(`${this.baseURL}/blog`);
      // return response.json();
      return [];
    } catch (error) {
      console.error('Erreur lors du chargement des articles:', error);
      throw error;
    }
  }

  async createBlogPost(post: Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>): Promise<BlogPost> {
    try {
      // const response = await fetch(`${this.baseURL}/blog`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(post),
      // });
      // return response.json();
      const now = new Date().toISOString();
      return {
        ...post,
        id: Date.now().toString(),
        created_at: now,
        updated_at: now,
      } as BlogPost;
    } catch (error) {
      console.error('Erreur lors de la création de l\'article:', error);
      throw error;
    }
  }

  async updateBlogPost(id: string, post: Partial<BlogPost>): Promise<BlogPost> {
    try {
      // const response = await fetch(`${this.baseURL}/blog/${id}`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(post),
      // });
      // return response.json();
      return {
        ...post,
        id,
        updated_at: new Date().toISOString(),
      } as BlogPost;
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'article:', error);
      throw error;
    }
  }

  async deleteBlogPost(id: string): Promise<void> {
    try {
      // await fetch(`${this.baseURL}/blog/${id}`, {
      //   method: 'DELETE',
      // });
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'article:', error);
      throw error;
    }
  }

  // ============ STATISTIQUES ============

  async getDashboardStats(): Promise<DashboardStats> {
    try {
      // const response = await fetch(`${this.baseURL}/stats`);
      // return response.json();
      return {
        totalProducts: 0,
        totalCleaningServices: 0,
        lowStockProducts: 0,
        blogArticles: 0,
        totalRevenue: 0,
      };
    } catch (error) {
      console.error('Erreur lors du chargement des statistiques:', error);
      throw error;
    }
  }

  // ============ AUTHENTIFICATION ============

  async login(email: string, password: string): Promise<{ token: string; user: any }> {
    try {
      // const response = await fetch(`${this.baseURL}/login`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, password }),
      // });
      // return response.json();
      if (email === 'admin@koyamaplus.com' && password === 'admin123') {
        return {
          token: 'fake-token-' + Date.now(),
          user: { id: '1', email, role: 'admin' },
        };
      }
      throw new Error('Identifiants invalides');
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
      throw error;
    }
  }

  async logout(): Promise<void> {
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('adminEmail');
    localStorage.removeItem('adminToken');
  }
}

export const adminApiService = new AdminApiService();
