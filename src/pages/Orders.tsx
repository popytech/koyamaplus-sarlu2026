import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { assetUrl } from '../lib/assetUrl';
import { ordersService } from '../lib/dataService';
import { Package, MapPin, Calendar, CreditCard, CheckCircle, Clock, Truck, XCircle } from 'lucide-react';

interface Order {
  id: string;
  order_number: string;
  status: string;
  total_amount: number;
  payment_method?: string;
  payment_status?: string;
  shipping_address: any;
  created_at: string;
  items: OrderItem[];
}

interface OrderItem {
  id: string;
  quantity: number;
  product: {
    id: string;
    name: string;
    price: number;
    sale_price: number | null;
    images: string[];
  };
}

export default function Orders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user]);

  const fetchOrders = async () => {
    try {
      const allOrders = await ordersService.getOrders();
      setOrders(allOrders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'pending':
        return {
          icon: Clock,
          label: 'En attente',
          color: 'text-brand-red bg-brand-red/10',
        };
      case 'processing':
        return {
          icon: Package,
          label: 'En préparation',
          color: 'text-brand-blue bg-brand-blue/10',
        };
      case 'shipped':
        return {
          icon: Truck,
          label: 'En livraison',
          color: 'text-brand-blue bg-brand-blue/10',
        };
      case 'delivered':
        return {
          icon: CheckCircle,
          label: 'Livrée',
          color: 'text-brand-red bg-brand-red/10',
        };
      case 'cancelled':
        return {
          icon: XCircle,
          label: 'Annulée',
          color: 'text-brand-red bg-brand-red/10',
        };
      default:
        return {
          icon: Clock,
          label: status,
          color: 'text-gray-600 bg-gray-100',
        };
    }
  };

  const getPaymentMethodLabel = (method: string) => {
    switch (method) {
      case 'orange_money':
        return 'Orange Money';
      case 'mtn_money':
        return 'MTN Money';
      case 'cash':
        return 'Espèces';
      default:
        return method;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-brand-red mb-4"></div>
          <p className="text-gray-600">Chargement de vos commandes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 sm:py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6 sm:mb-8 animate-fade-in-down">
          <h1 className="text-2xl sm:text-3xl font-bold text-brand-blue mb-1 sm:mb-2">Mes commandes</h1>
          <p className="text-sm sm:text-base text-gray-600">Suivez l'état de vos commandes</p>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white rounded-lg shadow-lg p-8 sm:p-12 text-center animate-fade-in-up">
            <Package className="w-12 sm:w-16 h-12 sm:h-16 text-gray-400 mx-auto mb-3 sm:mb-4" />
            <h2 className="text-lg sm:text-xl font-bold text-brand-blue mb-1 sm:mb-2">Aucune commande</h2>
            <p className="text-sm sm:text-base text-gray-600">Vous n'avez pas encore passé de commande.</p>
          </div>
        ) : (
          <div className="space-y-4 sm:space-y-6">
            {orders.map((order, index) => {
              const statusInfo = getStatusInfo(order.status);
              const StatusIcon = statusInfo.icon;

              return (
                <div
                  key={order.id}
                  className={`bg-white rounded-lg shadow-lg p-4 sm:p-6 animate-fade-in-up animation-delay-${Math.min(index * 100, 400)} hover-lift`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3 sm:mb-4 gap-3 sm:gap-4">
                    <div>
                      <div className="text-xs sm:text-sm text-gray-500 mb-0.5 sm:mb-1">Commande</div>
                      <div className="text-lg sm:text-xl font-bold text-gray-900">{order.order_number}</div>
                    </div>

                    <div className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg ${statusInfo.color} flex items-center font-semibold text-xs sm:text-sm w-fit`}>
                      <StatusIcon className="w-4 sm:w-5 h-4 sm:h-5 mr-1 sm:mr-2" />
                      {statusInfo.label}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
                    <div className="flex items-start space-x-2 sm:space-x-3">
                      <Calendar className="w-4 sm:w-5 h-4 sm:h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="text-xs sm:text-sm text-gray-500">Date</div>
                        <div className="font-medium text-sm sm:text-base text-gray-900">{formatDate(order.created_at)}</div>
                      </div>
                    </div>

                    <div className="flex items-start space-x-2 sm:space-x-3">
                      <CreditCard className="w-4 sm:w-5 h-4 sm:h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="text-xs sm:text-sm text-gray-500">Paiement</div>
                        <div className="font-medium text-sm sm:text-base text-gray-900">{getPaymentMethodLabel(order.payment_method)}</div>
                        <div className={`text-xs ${order.payment_status === 'paid' ? 'text-brand-red' : 'text-brand-blue'}`}>
                          {order.payment_status === 'paid' ? 'Payé' : 'En attente'}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start space-x-2 sm:space-x-3">
                      <MapPin className="w-4 sm:w-5 h-4 sm:h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                      <div className="min-w-0">
                        <div className="text-xs sm:text-sm text-gray-500">Livraison</div>
                        <div className="font-medium text-sm sm:text-base text-gray-900 break-words">{order.shipping_address?.city}</div>
                        <div className="text-xs sm:text-sm text-gray-600 break-words">{order.shipping_address?.address}</div>
                      </div>
                    </div>
                  </div>

                  {order.items && order.items.length > 0 && (
                    <div className="border-t pt-3 sm:pt-4">
                      <div className="text-xs sm:text-sm font-semibold text-gray-700 mb-2 sm:mb-3">Articles commandés</div>
                      <div className="space-y-2 sm:space-y-3">
                        {order.items.map((item: any) => (
                          <div key={item.id} className="flex items-center space-x-2 sm:space-x-4">
                            <div className="w-12 sm:w-16 h-12 sm:h-16 bg-gray-200 rounded-lg flex-shrink-0">
                              {item.product?.images?.[0] && (
                                <img
                                  src={assetUrl(item.product.images[0])}
                                  alt={item.product?.name}
                                  className="w-full h-full object-cover rounded-lg"
                                />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="font-medium text-sm sm:text-base text-gray-900 break-words">{item.product?.name}</div>
                              <div className="text-xs sm:text-sm text-gray-500">Quantité: {item.quantity}</div>
                            </div>
                            <div className="font-semibold text-sm sm:text-base text-gray-900 flex-shrink-0">
                              {((item.product?.sale_price || item.product?.price || 0) * item.quantity).toLocaleString()} GNF
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="border-t mt-3 sm:mt-4 pt-3 sm:pt-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-0">
                    <div className="text-xs sm:text-sm text-gray-600 break-words">
                      Téléphone de contact: <span className="font-medium text-gray-900">{order.shipping_address?.phone}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-xs sm:text-sm text-gray-500">Total</div>
                      <div className="text-xl sm:text-2xl font-bold text-brand-red">
                        {order.total_amount.toLocaleString()} GNF
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
