import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { CheckCircle, Package, MapPin, Phone, CreditCard } from 'lucide-react';

interface CheckoutProps {
  onSuccess: () => void;
  onBack: () => void;
}

export default function Checkout({ onSuccess, onBack }: CheckoutProps) {
  const { user, profile } = useAuth();
  const { cartItems, cartTotal, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [orderCreated, setOrderCreated] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [djomyStatus, setDjomyStatus] = useState<'idle' | 'checking' | 'failed' | 'pending_confirmation'>('idle');

  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    city: '',
    address: '',
    notes: '',
    payment_method: 'orange_money',
  });

  // Retour du parcours de paiement en ligne Djomy (redirection depuis leur page hébergée)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const returningOrder = params.get('order');
    if (params.get('djomy_return') !== '1' || !returningOrder) return;

    setOrderNumber(returningOrder);
    setDjomyStatus('checking');

    let attempts = 0;
    const maxAttempts = 20;
    const interval = setInterval(async () => {
      attempts += 1;
      try {
        const res = await fetch(`/api/orders/status?order=${encodeURIComponent(returningOrder)}`);
        if (res.ok) {
          const data = await res.json();
          if (data.payment_status === 'paid') {
            clearInterval(interval);
            await clearCart();
            setDjomyStatus('idle');
            setOrderCreated(true);
            setTimeout(() => onSuccess(), 2000);
            return;
          }
          if (data.payment_status === 'failed') {
            clearInterval(interval);
            setDjomyStatus('failed');
            return;
          }
        }
      } catch (error) {
        console.error('Error polling order status:', error);
      }

      if (attempts >= maxAttempts) {
        clearInterval(interval);
        setDjomyStatus('pending_confirmation');
      }
    }, 2500);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (profile) {
      setFormData(prev => ({
        ...prev,
        full_name: profile.full_name || '',
        phone: profile.phone || '',
        city: profile.city || '',
        address: profile.address || '',
      }));
    }
  }, [profile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      alert('Votre panier est vide');
      return;
    }

    if (!formData.full_name || !formData.phone || !formData.city || !formData.address) {
      alert('Veuillez remplir tous les champs requis');
      return;
    }

    setLoading(true);

    const shippingAddress = {
      full_name: formData.full_name,
      phone: formData.phone,
      city: formData.city,
      address: formData.address,
    };

    try {
      // Paiement en ligne réel via l'agrégateur Djomy : le serveur crée la
      // commande, ouvre la session de paiement, et on redirige vers la
      // page hébergée Djomy pour la saisie de l'OTP mobile money.
      const res = await fetch('/api/djomy/create-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paymentMethod: formData.payment_method,
          items: cartItems.map(item => ({ product_id: item.product_id, quantity: item.quantity })),
          shippingAddress,
          notes: formData.notes,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.redirectUrl) {
        throw new Error(data.error || 'Impossible de démarrer le paiement');
      }

      window.location.href = data.redirectUrl;
    } catch (error: any) {
      console.error('Error creating order:', error);
      alert(error.message || 'Erreur lors de la création de la commande');
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  if (djomyStatus === 'checking') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 max-w-md text-center">
          <div className="w-12 h-12 border-4 border-brand-red/20 border-t-brand-red rounded-full animate-spin mx-auto mb-4 sm:mb-6" />
          <h2 className="text-xl sm:text-2xl font-bold text-brand-blue mb-2">Vérification du paiement...</h2>
          <p className="text-sm sm:text-base text-gray-600">
            Commande <strong>{orderNumber}</strong>. Merci de patienter pendant que nous confirmons votre paiement mobile money.
          </p>
        </div>
      </div>
    );
  }

  if (djomyStatus === 'failed') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 max-w-md text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-red-600 mb-2">Paiement échoué</h2>
          <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
            Le paiement de la commande <strong>{orderNumber}</strong> n'a pas abouti. Aucun montant n'a été débité avec succès. Vous pouvez réessayer.
          </p>
          <button
            onClick={onBack}
            className="bg-brand-red text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-semibold text-sm sm:text-base hover:bg-brand-blue transition-colors"
          >
            Retour à la boutique
          </button>
        </div>
      </div>
    );
  }

  if (djomyStatus === 'pending_confirmation') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 max-w-md text-center">
          <Phone className="w-12 h-12 text-brand-blue mx-auto mb-4" />
          <h2 className="text-xl sm:text-2xl font-bold text-brand-blue mb-2">Confirmation en attente</h2>
          <p className="text-sm sm:text-base text-gray-600">
            Votre commande <strong>{orderNumber}</strong> est enregistrée. La confirmation du paiement mobile money prend parfois quelques minutes de plus — nous vous contacterons dès réception.
          </p>
        </div>
      </div>
    );
  }

  if (orderCreated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 max-w-md text-center animate-scale-in">
          <div className="bg-brand-red/10 w-16 sm:w-20 h-16 sm:h-20 rounded-lg flex items-center justify-center mx-auto mb-4 sm:mb-6 animate-bounce-slow">
            <CheckCircle className="w-8 sm:w-12 h-8 sm:h-12 text-brand-red" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-brand-blue mb-2 sm:mb-3">Commande confirmée !</h2>
          <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">
            Votre commande a été enregistrée avec succès.
          </p>
          <div className="bg-brand-red/10 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
            <p className="text-xs sm:text-sm text-gray-600 mb-0.5 sm:mb-1">Numéro de commande</p>
            <p className="text-xl sm:text-2xl font-bold text-brand-red">{orderNumber}</p>
          </div>
          <div className="text-left bg-gray-50 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
            <p className="text-xs sm:text-sm text-gray-700 mb-2 sm:mb-3">
              <strong>Notre livreur vous contactera bientôt :</strong>
            </p>
            <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-gray-600">
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-brand-red flex-shrink-0" />
                <span>Confirmation de votre commande par téléphone</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-brand-red flex-shrink-0" />
                <span>Livraison à votre adresse sous 24-48h</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-brand-red flex-shrink-0" />
                <span>Payé en ligne par {formData.payment_method === 'orange_money' ? 'Orange Money' : 'MTN Money'}</span>
              </li>
            </ul>
          </div>
          <p className="text-xs sm:text-sm text-gray-500">
            Vous serez redirigé automatiquement...
          </p>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 max-w-md text-center">
          <Package className="w-12 sm:w-16 h-12 sm:h-16 text-gray-400 mx-auto mb-3 sm:mb-4" />
          <h2 className="text-xl sm:text-2xl font-bold text-brand-blue mb-1 sm:mb-2">Panier vide</h2>
          <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
            Ajoutez des produits à votre panier avant de passer commande.
          </p>
          <button
            onClick={onBack}
            className="bg-brand-red text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-semibold text-sm sm:text-base hover:bg-brand-blue transition-colors"
          >
            Retour à la boutique
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 sm:py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6 sm:mb-8 animate-fade-in-down">
          <h1 className="text-2xl sm:text-3xl font-bold text-brand-blue mb-1 sm:mb-2">Finaliser la commande</h1>
          <p className="text-sm sm:text-base text-gray-600">Remplissez vos informations de livraison</p>
        </div>

        {!user && (
          <div className="bg-brand-blue/5 border border-brand-blue/20 rounded-lg p-4 sm:p-6 mb-6 sm:mb-8 animate-fade-in">
            <p className="text-sm sm:text-base text-brand-blue">
              ✓ <strong>Pas de compte requis !</strong> Vous pouvez commander en tant que visiteur. Un compte peut être créé après la commande si vous le souhaitez.
            </p>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-4 sm:gap-8">
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 animate-fade-in-left">
                <h2 className="text-lg sm:text-xl font-bold text-brand-blue mb-3 sm:mb-4 flex items-center">
                  <MapPin className="w-4 sm:w-5 h-4 sm:h-5 mr-2 sm:mr-3 text-brand-blue" />
                  Informations de livraison
                </h2>

                <div className="space-y-3 sm:space-y-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                      Nom complet *
                    </label>
                    <input
                      type="text"
                      name="full_name"
                      value={formData.full_name}
                      onChange={handleChange}
                      className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-red focus:border-transparent text-sm sm:text-base"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                      Téléphone *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+224 XXX XXX XXX"
                      className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-red focus:border-transparent text-sm sm:text-base"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                      Ville *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="Conakry, Kindia, etc."
                      className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-red focus:border-transparent text-sm sm:text-base"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                      Adresse de livraison *
                    </label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      rows={3}
                      placeholder="Quartier, rue, numéro de maison..."
                      className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-red focus:border-transparent text-sm sm:text-base"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                      Instructions de livraison (optionnel)
                    </label>
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      rows={2}
                      placeholder="Précisions pour le livreur..."
                      className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-red focus:border-transparent text-sm sm:text-base"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 animate-fade-in-left animation-delay-200">
                <h2 className="text-lg sm:text-xl font-bold text-brand-blue mb-3 sm:mb-4 flex items-center">
                  <CreditCard className="w-4 sm:w-5 h-4 sm:h-5 mr-2 sm:mr-3 text-brand-blue" />
                  Mode de paiement
                </h2>

                <div className="space-y-2 sm:space-y-3">
                  <label className="flex items-center p-3 sm:p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-brand-red transition-colors">
                    <input
                      type="radio"
                      name="payment_method"
                      value="orange_money"
                      checked={formData.payment_method === 'orange_money'}
                      onChange={handleChange}
                      className="w-4 h-4 text-brand-red"
                    />
                    <div className="ml-2 sm:ml-3 flex-1 min-w-0">
                      <div className="font-semibold text-sm sm:text-base text-gray-900">Orange Money</div>
                      <div className="text-xs sm:text-sm text-gray-500">Paiement immédiat en ligne</div>
                    </div>
                    <div className="text-lg sm:text-2xl font-bold text-brand-red flex-shrink-0">OM</div>
                  </label>

                  <label className="flex items-center p-3 sm:p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-brand-red transition-colors">
                    <input
                      type="radio"
                      name="payment_method"
                      value="mtn_money"
                      checked={formData.payment_method === 'mtn_money'}
                      onChange={handleChange}
                      className="w-4 h-4 text-brand-red"
                    />
                    <div className="ml-2 sm:ml-3 flex-1 min-w-0">
                      <div className="font-semibold text-sm sm:text-base text-gray-900">MTN Money</div>
                      <div className="text-xs sm:text-sm text-gray-500">Paiement immédiat en ligne</div>
                    </div>
                    <div className="text-lg sm:text-2xl font-bold text-brand-blue flex-shrink-0">MTN</div>
                  </label>
                </div>

                <div className="mt-3 sm:mt-4 bg-brand-blue/5 border border-brand-blue/20 rounded-lg p-3 sm:p-4">
                  <p className="text-xs sm:text-sm text-brand-blue">
                    <strong>Information:</strong> Vous serez redirigé vers la page sécurisée Djomy pour saisir le code de confirmation envoyé par votre opérateur mobile money.
                  </p>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-brand-red text-white py-3 sm:py-4 rounded-lg font-bold text-sm sm:text-lg hover:bg-brand-blue transition-colors disabled:opacity-50 hover-scale"
              >
                {loading ? 'Traitement en cours...' : 'Confirmer la commande'}
              </button>
            </form>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 animate-fade-in-right">
              <h2 className="text-lg sm:text-xl font-bold text-brand-blue mb-3 sm:mb-4">Récapitulatif</h2>

              <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6 max-h-64 overflow-y-auto">
                {cartItems.map((item) => {
                  const price = item.product.sale_price || item.product.price;
                  const key = 'id' in item ? item.id : item.product_id;
                  return (
                    <div key={key} className="flex justify-between text-xs sm:text-sm gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-gray-900 truncate">{item.product.name}</div>
                        <div className="text-gray-500">Qté: {item.quantity}</div>
                      </div>
                      <div className="font-semibold text-gray-900 flex-shrink-0">
                        {(price * item.quantity).toLocaleString()} GNF
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="border-t pt-3 sm:pt-4 space-y-1.5 sm:space-y-2">
                <div className="flex justify-between text-xs sm:text-sm text-gray-600">
                  <span>Sous-total</span>
                  <span>{cartTotal.toLocaleString()} GNF</span>
                </div>
                <div className="flex justify-between text-xs sm:text-sm text-gray-600">
                  <span>Frais de livraison</span>
                  <span className="text-brand-red font-semibold">Gratuit</span>
                </div>
                <div className="border-t pt-1.5 sm:pt-2 flex justify-between text-base sm:text-lg font-bold text-gray-900">
                  <span>Total</span>
                  <span className="text-brand-red">{cartTotal.toLocaleString()} GNF</span>
                </div>
              </div>

              <div className="mt-4 sm:mt-6 bg-brand-blue/5 rounded-lg p-3 sm:p-4">
                <div className="flex items-start space-x-2 sm:space-x-3">
                  <Phone className="w-4 sm:w-5 h-4 sm:h-5 text-brand-blue mt-0.5 flex-shrink-0" />
                  <div className="text-xs sm:text-sm text-brand-blue">
                    <strong>Livraison rapide:</strong> Notre équipe vous contactera sous 2h pour confirmer votre commande.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
