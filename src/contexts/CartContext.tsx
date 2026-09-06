import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { cartService } from '../lib/dataService';
import { useAuth } from './AuthContext';

export interface LocalCartItem {
  product_id: string;
  quantity: number;
  product: {
    id: string;
    name: string;
    price: number;
    sale_price: number | null;
    images: string[];
    stock: number;
  };
}

export interface CartItem {
  id: string;
  product_id: string;
  quantity: number;
  product: {
    id: string;
    name: string;
    price: number;
    sale_price: number | null;
    images: string[];
    stock: number;
  };
}

interface CartContextType {
  cartItems: CartItem[] | LocalCartItem[];
  loading: boolean;
  addToCart: (productId: string, quantity: number, productData?: any) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  cartTotal: number;
  cartCount: number;
  isGuest: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const GUEST_CART_KEY = 'koyama_guest_cart';

export function CartProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState<CartItem[] | LocalCartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isGuest, setIsGuest] = useState(!user);

  // Charger le panier au démarrage ou quand l'user change
  useEffect(() => {
    if (user) {
      // Utilisateur connecté : charger depuis la base de données
      setIsGuest(false);
      fetchCart();
    } else {
      // Utilisateur déconnecté : charger depuis localStorage
      setIsGuest(true);
      loadGuestCart();
    }
  }, [user]);

  const loadGuestCart = () => {
    try {
      const saved = localStorage.getItem(GUEST_CART_KEY);
      if (saved) {
        setCartItems(JSON.parse(saved));
      } else {
        setCartItems([]);
      }
    } catch (error) {
      console.error('Error loading guest cart:', error);
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  };

  const saveGuestCart = (items: LocalCartItem[]) => {
    try {
      localStorage.setItem(GUEST_CART_KEY, JSON.stringify(items));
      setCartItems(items);
    } catch (error) {
      console.error('Error saving guest cart:', error);
    }
  };

  const fetchCart = async () => {
    try {
      const items = await cartService.getCart();
      setCartItems(items);
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId: string, quantity: number, productData?: any) => {
    try {
      if (user) {
        // Utilisateur connecté : ajouter à la base de données
        await cartService.addToCart(productId, quantity);
        await fetchCart();
      } else {
        // Utilisateur déconnecté : ajouter à localStorage
        const current = (cartItems as LocalCartItem[]) || [];
        const existing = current.find(item => item.product_id === productId);
        
        let updated: LocalCartItem[];
        if (existing) {
          updated = current.map(item =>
            item.product_id === productId
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        } else {
          updated = [...current, {
            product_id: productId,
            quantity,
            product: productData || {
              id: productId,
              name: 'Produit',
              price: 0,
              sale_price: null,
              images: [],
              stock: 0,
            }
          }];
        }
        saveGuestCart(updated);
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error;
    }
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    try {
      if (user) {
        await cartService.updateQuantity(productId, quantity);
        await fetchCart();
      } else {
        const updated = (cartItems as LocalCartItem[]).map(item =>
          item.product_id === productId ? { ...item, quantity } : item
        ).filter(item => item.quantity > 0);
        saveGuestCart(updated);
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
      throw error;
    }
  };

  const removeFromCart = async (productId: string) => {
    try {
      if (user) {
        await cartService.removeFromCart(productId);
        await fetchCart();
      } else {
        const updated = (cartItems as LocalCartItem[]).filter(item => item.product_id !== productId);
        saveGuestCart(updated);
      }
    } catch (error) {
      console.error('Error removing from cart:', error);
      throw error;
    }
  };

  const clearCart = async () => {
    try {
      if (user) {
        await cartService.clearCart();
        await fetchCart();
      } else {
        saveGuestCart([]);
      }
    } catch (error) {
      console.error('Error clearing cart:', error);
      throw error;
    }
  };

  const cartTotal = cartItems.reduce((sum, item) => {
    const price = item.product.sale_price || item.product.price;
    return sum + price * item.quantity;
  }, 0);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        loading,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        cartTotal,
        cartCount,
        isGuest,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
