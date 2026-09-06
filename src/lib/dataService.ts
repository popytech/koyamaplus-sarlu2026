import productsData from '../data/products.json';

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image_url?: string;
}

export interface Product {
  id: string;
  category_id: string | null;
  name: string;
  slug: string;
  description: string | null;
  benefits: string | null;
  contraindications: string | null;
  price: number;
  sale_price: number | null;
  stock: number;
  images: string[];
  is_featured: boolean;
  is_active: boolean;
}

export interface CleaningService {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  base_price: number | null;
  icon: string | null;
  is_active: boolean;
}

// Simulated localStorage for cart and orders
const STORAGE_KEYS = {
  CART: 'koyama_cart',
  ORDERS: 'koyama_orders',
  USER: 'koyama_user',
};

// ─── Products storage (localStorage as source of truth, JSON as seed) ───────

const PRODUCTS_STORAGE_KEY = 'kp_products';
const PRODUCTS_VERSION_KEY = 'kp_products_version';
const PRODUCTS_VERSION = '2.2';

const getStoredProducts = (): Product[] => {
  const storedVersion = localStorage.getItem(PRODUCTS_VERSION_KEY);

  // If version mismatch, reset entirely from JSON
  if (storedVersion !== PRODUCTS_VERSION) {
    localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(productsData.products));
    localStorage.setItem(PRODUCTS_VERSION_KEY, PRODUCTS_VERSION);
    return productsData.products;
  }

  const stored = localStorage.getItem(PRODUCTS_STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(productsData.products));
    return productsData.products;
  }

  return JSON.parse(stored);
};

const persistProducts = (products: Product[]) => {
  localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products));
};

// Products API
export const productsService = {
  getCategories: async (): Promise<Category[]> => {
    return productsData.categories;
  },

  // Admin: all products regardless of is_active
  getAllProducts: async (): Promise<Product[]> => {
    return getStoredProducts();
  },

  // Shop: active products only
  getProducts: async (): Promise<Product[]> => {
    return getStoredProducts().filter(p => p.is_active);
  },

  getProductById: async (id: string): Promise<Product | null> => {
    return getStoredProducts().find(p => p.id === id) || null;
  },

  getProductsByCategory: async (categoryId: string): Promise<Product[]> => {
    return getStoredProducts().filter(
      p => p.category_id === categoryId && p.is_active
    );
  },

  getFeaturedProducts: async (): Promise<Product[]> => {
    return getStoredProducts().filter(p => p.is_featured && p.is_active);
  },

  searchProducts: async (query: string): Promise<Product[]> => {
    const searchTerm = query.toLowerCase();
    return getStoredProducts().filter(
      p =>
        p.is_active &&
        (p.name.toLowerCase().includes(searchTerm) ||
          p.description?.toLowerCase().includes(searchTerm))
    );
  },

  saveProduct: async (product: Product): Promise<void> => {
    const all = getStoredProducts();
    const idx = all.findIndex(p => p.id === product.id);
    if (idx !== -1) {
      all[idx] = product;
    } else {
      all.push(product);
    }
    persistProducts(all);
  },

  deleteProduct: async (id: string): Promise<void> => {
    persistProducts(getStoredProducts().filter(p => p.id !== id));
  },
};

// Cleaning Services API
export const cleaningService = {
  getServices: async (): Promise<CleaningService[]> => {
    return productsData.cleaning_services.filter(s => s.is_active);
  },

  getServiceById: async (id: string): Promise<CleaningService | null> => {
    return productsData.cleaning_services.find(s => s.id === id) || null;
  },
};

// Cart Management (localStorage based)
export interface CartItem {
  id: string;
  product_id: string;
  quantity: number;
  product: Product;
}

export const cartService = {
  getCart: async (): Promise<CartItem[]> => {
    const cart = localStorage.getItem(STORAGE_KEYS.CART);
    return cart ? JSON.parse(cart) : [];
  },

  addToCart: async (productId: string, quantity: number): Promise<void> => {
    const product = await productsService.getProductById(productId);
    if (!product) throw new Error('Product not found');

    const cart = await cartService.getCart();
    const existingItem = cart.find(item => item.product_id === productId);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      const newItem: CartItem = {
        id: `cart-${Date.now()}`,
        product_id: productId,
        quantity,
        product,
      };
      cart.push(newItem);
    }

    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
  },

  updateQuantity: async (productId: string, quantity: number): Promise<void> => {
    const cart = await cartService.getCart();
    const item = cart.find(item => item.product_id === productId);

    if (item) {
      if (quantity <= 0) {
        await cartService.removeFromCart(productId);
      } else {
        item.quantity = quantity;
        localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
      }
    }
  },

  removeFromCart: async (productId: string): Promise<void> => {
    const cart = await cartService.getCart();
    const filtered = cart.filter(item => item.product_id !== productId);
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(filtered));
  },

  clearCart: async (): Promise<void> => {
    localStorage.removeItem(STORAGE_KEYS.CART);
  },
};

// Orders Management (localStorage based)
export interface Order {
  id: string;
  order_number: string;
  items: CartItem[];
  total_amount: number;
  status: string;
  payment_method?: string;
  shipping_address?: any;
  notes?: string;
  created_at: string;
}

export const ordersService = {
  getOrders: async (): Promise<Order[]> => {
    const orders = localStorage.getItem(STORAGE_KEYS.ORDERS);
    return orders ? JSON.parse(orders) : [];
  },

  createOrder: async (items: CartItem[], address: any, notes?: string): Promise<Order> => {
    const order: Order = {
      id: `order-${Date.now()}`,
      order_number: `KP-${Date.now().toString().slice(-8)}`,
      items,
      total_amount: items.reduce((sum, item) => {
        const price = item.product.sale_price || item.product.price;
        return sum + (price * item.quantity);
      }, 0),
      status: 'pending',
      shipping_address: address,
      notes,
      created_at: new Date().toISOString(),
    };

    const orders = await ordersService.getOrders();
    orders.push(order);
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));

    return order;
  },

  getOrderById: async (id: string): Promise<Order | null> => {
    const orders = await ordersService.getOrders();
    return orders.find(order => order.id === id) || null;
  },

  updateOrderStatus: async (id: string, status: string): Promise<void> => {
    const orders = await ordersService.getOrders();
    const order = orders.find(o => o.id === id);
    if (order) {
      order.status = status;
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    }
  },
};

// Cleaning Quotes (localStorage based)
export interface CleaningQuote {
  id: string;
  service_id: string;
  full_name: string;
  email: string;
  phone: string;
  city: string;
  address?: string;
  surface_area?: number;
  number_of_rooms?: number;
  preferred_date?: string;
  message?: string;
  status: string;
  quoted_amount?: number;
  created_at: string;
}

export const quotesService = {
  getQuotes: async (): Promise<CleaningQuote[]> => {
    const quotes = localStorage.getItem('koyama_quotes');
    return quotes ? JSON.parse(quotes) : [];
  },

  createQuote: async (quote: Omit<CleaningQuote, 'id' | 'created_at' | 'status'>): Promise<CleaningQuote> => {
    const newQuote: CleaningQuote = {
      ...quote,
      id: `quote-${Date.now()}`,
      status: 'pending',
      created_at: new Date().toISOString(),
    };

    const quotes = await quotesService.getQuotes();
    quotes.push(newQuote);
    localStorage.setItem('koyama_quotes', JSON.stringify(quotes));

    return newQuote;
  },

  getQuoteById: async (id: string): Promise<CleaningQuote | null> => {
    const quotes = await quotesService.getQuotes();
    return quotes.find(quote => quote.id === id) || null;
  },
};
