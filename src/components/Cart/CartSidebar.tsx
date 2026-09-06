import { X, Plus, Minus, Trash2 } from 'lucide-react';
import { assetUrl } from '../../lib/assetUrl';
import { useCart } from '../../contexts/CartContext';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: () => void;
}

export default function CartSidebar({ isOpen, onClose, onCheckout }: CartSidebarProps) {
  const { cartItems, updateQuantity, removeFromCart, cartTotal, loading } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 flex justify-end pointer-events-none">
      <div 
        className="absolute inset-0 bg-gray-900/20 pointer-events-auto cursor-pointer transition-opacity backdrop-blur-sm" 
        onClick={onClose}
        aria-label="Fermer le panier"
      />

      <div className="relative h-full w-full max-w-sm xs:max-w-xs sm:max-w-md pointer-events-auto bg-white shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-3 xs:p-4 sm:p-6 border-b bg-white sticky top-0 z-10">
          <h2 className="text-lg xs:text-xl sm:text-2xl font-bold text-gray-900">
            Panier ({cartItems.length})
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 xs:p-2 hover:bg-brand-red/10 rounded-lg transition-all duration-200 hover:scale-110"
            title="Fermer le panier"
            aria-label="Fermer le panier"
          >
            <X className="w-5 xs:w-6 h-5 xs:h-6 text-gray-700 hover:text-brand-red" />
          </button>
        </div>

        {/* Contenu */}
        <div className="flex-1 overflow-y-auto p-3 xs:p-4 sm:p-6">
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-brand-red"></div>
            </div>
          ) : cartItems.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xs xs:text-sm text-gray-600 mb-4">Votre panier est vide</p>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-brand-red text-white rounded-lg text-sm font-medium hover:bg-brand-blue transition-colors"
              >
                Continuer les achats
              </button>
            </div>
          ) : (
            <div className="space-y-3 xs:space-y-4">
              {cartItems.map((item) => {
                const price = item.product.sale_price || item.product.price;
                const key = 'id' in item ? item.id : item.product_id;
                return (
                  <div key={key} className="flex gap-2 xs:gap-3 sm:gap-4 pb-3 xs:pb-4 border-b last:border-b-0">
                    <div className="w-16 xs:w-20 h-16 xs:h-20 bg-gray-200 rounded-lg flex-shrink-0 overflow-hidden">
                      {item.product.images?.[0] ? (
                        <img
                          src={assetUrl(item.product.images[0])}
                          alt={item.product.name}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : null}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 mb-0.5 xs:mb-1 text-xs xs:text-sm line-clamp-2">
                        {item.product.name}
                      </h3>
                      <p className="text-brand-red font-bold mb-1 xs:mb-2 text-xs xs:text-sm">
                        {price.toLocaleString()} GNF
                      </p>

                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center space-x-1.5 xs:space-x-2 bg-gray-100 rounded-lg p-1">
                          <button
                            onClick={() => updateQuantity(item.product_id, Math.max(1, item.quantity - 1))}
                            className="p-0.5 xs:p-1 hover:bg-gray-200 rounded transition-colors"
                            title="Réduire la quantité"
                            aria-label="Réduire la quantité"
                          >
                            <Minus className="w-3 xs:w-4 h-3 xs:h-4" />
                          </button>
                          <span className="min-w-6 text-center font-medium text-xs xs:text-sm">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                            disabled={item.quantity >= item.product.stock}
                            className="p-0.5 xs:p-1 hover:bg-gray-200 rounded disabled:opacity-50 transition-colors"
                            title="Augmenter la quantité"
                            aria-label="Augmenter la quantité"
                          >
                            <Plus className="w-3 xs:w-4 h-3 xs:h-4" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.product_id)}
                          className="p-1.5 xs:p-2 hover:bg-brand-red/10 text-brand-red rounded transition-colors"
                          title="Supprimer du panier"
                          aria-label="Supprimer du panier"
                        >
                          <Trash2 className="w-4 xs:w-4 h-4 xs:h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="border-t p-3 xs:p-4 sm:p-6 bg-gray-50 sticky bottom-0">
            <div className="flex justify-between items-center mb-3 xs:mb-4 pb-3 xs:pb-4 border-b">
              <span className="font-semibold text-gray-900">Total</span>
              <span className="text-lg xs:text-xl font-bold text-brand-red">{cartTotal.toLocaleString()} GNF</span>
            </div>
            <button
              onClick={onCheckout}
              className="w-full bg-brand-red text-white py-2.5 xs:py-3 sm:py-3 rounded-lg font-semibold hover:bg-brand-blue transition-colors active:scale-95"
            >
              Passer la commande
            </button>
            <button
              onClick={onClose}
              className="w-full mt-2 px-4 py-2 text-gray-700 hover:text-gray-900 font-medium text-sm transition-colors"
            >
              Continuer les achats
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
