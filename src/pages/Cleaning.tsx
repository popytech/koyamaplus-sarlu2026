import { useState, useEffect } from 'react';
import { Building2, Home, Wrench, ShoppingCart, Star, Zap, Shield, Clock, Users, Sparkles, Phone, MapPin } from 'lucide-react';
import { cleaningService } from '../lib/dataService';
import { assetUrl } from '../lib/assetUrl';

interface CleaningService {
  id: string;
  name: string;
  description: string | null;
  base_price: number | null;
  icon: string | null;
}

interface CleaningProps {
  onQuoteClick: (serviceId?: string) => void;
}

export default function Cleaning({ onQuoteClick }: CleaningProps) {
  const [services, setServices] = useState<CleaningService[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const carouselImages = [
    '/images/nettoyage (6).jpeg',
    '/images/nettoyage (7).jpeg',
    '/images/nettoyage (8).jpeg',
  ];

  useEffect(() => {
    fetchServices();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(prev => (prev + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [carouselImages.length]);

  const fetchServices = async () => {
    try {
      const data = await cleaningService.getServices();
      setServices(data);
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setLoading(false);
    }
  };

  const getIcon = (iconName: string | null) => {
    const icons: { [key: string]: any } = {
      Building2,
      Home,
      Wrench,
      ShoppingCart,
    };
    return icons[iconName || 'Building2'] || Building2;
  };

  const features = [
    { icon: Users, title: 'Personnel Qualifié', description: 'Équipe expérimentée et certifiée' },
    { icon: Shield, title: 'Matériel Professionnel', description: 'Équipements de haut niveau' },
    { icon: Sparkles, title: 'Produits Écologiques', description: 'Respectueux de l\'environnement' },
    { icon: Zap, title: 'Intervention Rapide', description: 'Disponible sous 30 Min' },
    { icon: Star, title: 'Satisfaction Garantie', description: '100% client satisfait' },
    { icon: Clock, title: 'Devis Gratuit', description: 'Sans engagement' },
  ];

  const testimonials = [
    {
      name: 'Alphonse T.',
      role: 'Directeur Entreprise',
      comment: 'Service impeccable ! Notre bureau n\'a jamais été aussi propre. Équipe très professionnelle.',
      rating: 5,
    },
    {
      name: 'Mariam S.',
      role: 'Propriétaire',
      comment: 'Excellent nettoyage après rénovation. Très rapides et efficaces. Je recommande vivement !',
      rating: 5,
    },
    {
      name: 'Jean-Paul M.',
      role: 'Responsable Boutique',
      comment: 'Intervention régulière chez nous. Produits écologiques, équipe courtoise et fiable.',
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Ultra Premium */}
      <div className="relative overflow-hidden text-white bg-brand-blue">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-brand-blue rounded-lg mix-blend-multiply filter blur-3xl opacity-20"></div>
          <div className="absolute top-40 -left-40 w-80 h-80 bg-brand-red rounded-lg mix-blend-multiply filter blur-3xl opacity-20"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-16 sm:py-24 md:py-32">
          <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div className="animate-fade-in-left">
              <div className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg mb-4 sm:mb-6 border font-tahoma" style={{backgroundColor: 'rgba(255, 35, 83, 0.2)', borderColor: '#ff2353', color: '#ff2353'}}>
                <span className="text-xs sm:text-sm font-semibold">Service Premium</span>
              </div>
              <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight font-tahoma">
                Nettoyage 
                <span className="block font-corsiva text-white">Professionnel</span>
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-white/90 mb-6 sm:mb-8 leading-relaxed" style={{fontFamily: 'Tahoma, system-ui, sans-serif'}}>
                Transformez vos espaces avec nos services de nettoyage haut de gamme. Personnel qualifié, matériel professionnel, résultats garantis.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button
                  onClick={() => onQuoteClick()}
                  className="text-white px-6 sm:px-8 py-2.5 sm:py-4 rounded-lg font-bold text-sm sm:text-base hover:opacity-90 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
                  style={{backgroundColor: '#ff2353'}}
                >
                  Devis Gratuit
                </button>
                <button className="border-2 border-white text-white px-6 sm:px-8 py-2.5 sm:py-4 rounded-lg font-bold text-sm sm:text-base hover:bg-white/10 transition-all">
                  Voir les tarifs
                </button>
              </div>
            </div>

            <div className="relative animate-fade-in-right">
              <div className="relative rounded-lg overflow-hidden shadow-2xl">
                <img 
                  src={assetUrl(carouselImages[currentImageIndex])}
                  alt="Nettoyage professionnel"
                  className="w-full h-full object-cover object-center transition-opacity duration-1000"
                  style={{ objectPosition: 'center center' }}
                />
                <div className="absolute inset-0 bg-brand-blue/40"></div>
                {/* Carousel Indicators */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                  {carouselImages.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`w-3 h-3 rounded-full transition-all ${
                        idx === currentImageIndex ? 'bg-white w-8' : 'bg-white/50 hover:bg-white/75'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Services Section */}
      <div className="w-full px-4 py-12 sm:py-20">
        <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-brand-blue mb-3 sm:mb-4">Nos Services Premium</h2>
          <p className="text-sm sm:text-base md:text-lg text-white/80 max-w-3xl mx-auto">
            Chaque service est conçu pour répondre à vos besoins spécifiques avec excellence et professionnalisme
          </p>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-brand-red/20 border-t-brand-red"></div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4 sm:gap-8 mb-12">
            {services.map((service, index) => {
              const Icon = getIcon(service.icon);
              const serviceImages = ['/images/nettoyage (1).jpeg', '/images/nettoyage (2).jpeg', '/images/nettoyage (3).jpeg', '/images/nettoyage (4).jpeg', '/images/nettoyage (5).jpeg'];
              const imageUrl = serviceImages[index % serviceImages.length];
              
              return (
                <div
                  key={service.id}
                  className="group bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  {/* Image Container */}
                  <div className="relative h-40 sm:h-48 overflow-hidden bg-white">
                    <img 
                      src={assetUrl(imageUrl)}
                      alt={service.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/10"></div>
                    <div className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-white/95 backdrop-blur p-2 sm:p-3 rounded-lg">
                      <Icon className="w-5 sm:w-6 h-5 sm:h-6 text-brand-blue" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 sm:p-6 md:p-8">
                    <h3 className="text-lg sm:text-2xl font-bold text-brand-blue mb-2 sm:mb-3">
                      {service.name}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 leading-relaxed">
                      {service.description}
                    </p>

                    {/* Price Tag */}
                    {service.base_price && (
                      <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-white/5 rounded-lg border border-brand-red/20">
                        <p className="text-xs sm:text-sm text-gray-600 mb-1">À partir de</p>
                        <p className="text-2xl sm:text-3xl font-bold text-brand-red">
                          {service.base_price.toLocaleString()} GNF
                        </p>
                      </div>
                    )}

                    {/* Button */}
                    <button
                      onClick={() => onQuoteClick(service.id)}
                      className="w-full bg-brand-red text-white py-2.5 sm:py-3 rounded-lg font-bold text-sm sm:text-base hover:shadow-lg transition-all group/btn flex items-center justify-center space-x-2"
                    >
                      <span>Demander un devis</span>
                      <Sparkles className="w-4 h-4 group-hover/btn:animate-spin" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white w-full px-4 py-12 sm:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-brand-blue mb-3 sm:mb-4">Pourquoi nous choisir ?</h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600">L'excellence à chaque intervention</p>
          </div>

          <div className="grid md:grid-cols-3 gap-4 sm:gap-8">
            {features.map((feature, index) => {
              const FeatureIcon = feature.icon;
              return (
                <div
                  key={index}
                  className="group p-4 sm:p-8 rounded-lg bg-white border border-gray-100 hover:border-brand-red hover:shadow-lg transition-all duration-300"
                >
                  <div className="bg-white/5 w-14 sm:w-16 h-14 sm:h-16 rounded-lg flex items-center justify-center mb-4 sm:mb-6 group-hover:shadow-lg transition-shadow">
                    <FeatureIcon className="w-7 sm:w-8 h-7 sm:h-8 text-brand-blue" />
                  </div>
                  <h3 className="text-base sm:text-xl font-bold text-brand-blue mb-2 sm:mb-3">{feature.title}</h3>
                  <p className="text-sm sm:text-base text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-12 sm:py-20 bg-white w-full px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-brand-blue mb-3 sm:mb-4">Ce que disent nos clients</h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600">Plus de 500 clients satisfaits</p>
          </div>

          <div className="grid md:grid-cols-4 gap-4 sm:gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white p-4 sm:p-8 rounded-lg shadow-md hover:shadow-xl transition-all border border-gray-100"
              >
                <div className="flex items-center gap-1 mb-3 sm:mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 sm:w-5 h-4 sm:h-5 fill-brand-red text-brand-red" />
                  ))}
                </div>
                <p className="text-sm sm:text-base text-gray-700 mb-4 sm:mb-6 italic">"{testimonial.comment}"</p>
                <div className="border-t pt-3 sm:pt-4">
                  <p className="font-bold text-sm sm:text-base text-gray-900">{testimonial.name}</p>
                  <p className="text-xs sm:text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-white w-full px-4 py-12 sm:py-20 bg-brand-red/10">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 font-tahoma">Prêt à transformer vos espaces ?</h2>
          <p className="text-sm sm:text-base md:text-lg text-white/90 mb-8 sm:mb-12 max-w-2xl mx-auto" style={{fontFamily: 'Tahoma, system-ui, sans-serif'}}>
            Obtenez un devis gratuit et personnalisé en quelques minutes. Aucun engagement.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <button
              onClick={() => onQuoteClick()}
              className="bg-white text-white px-6 sm:px-10 py-2.5 sm:py-4 rounded-lg font-bold text-sm sm:text-lg hover:opacity-90 transition-all shadow-lg transform hover:scale-105"
              style={{backgroundColor: '#312883'}}
            >
              Devis Gratuit
            </button>
            <button className="border-2 border-white text-white px-6 sm:px-10 py-2.5 sm:py-4 rounded-lg font-bold text-sm sm:text-lg hover:bg-white/10 transition-all">
              Contactez-nous
            </button>
          </div>
        </div>
      </div>

      {/* Contact Info Footer */}
      <div className="bg-gray-900 text-white w-full px-4 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6 sm:gap-8 text-center">
            <div className="flex flex-col items-center">
              <Phone className="w-6 sm:w-8 h-6 sm:h-8 text-brand-red mb-2 sm:mb-4" />
              <h3 className="font-bold mb-1 sm:mb-2 text-sm sm:text-base">Téléphone</h3>
              <p className="text-xs sm:text-base text-gray-400">611 24 30 30</p>
            </div>
            <div className="flex flex-col items-center">
              <Clock className="w-6 sm:w-8 h-6 sm:h-8 text-brand-blue mb-2 sm:mb-4" />
              <h3 className="font-bold mb-1 sm:mb-2 text-sm sm:text-base">Horaires</h3>
              <p className="text-xs sm:text-base text-gray-400">Lun - Sam: 8H - 17H <br/> Dim: Fermé</p>
            </div>
            <div className="flex flex-col items-center">
              <MapPin className="w-6 sm:w-8 h-6 sm:h-8 text-brand-red mb-2 sm:mb-4" />
              <h3 className="font-bold mb-1 sm:mb-2 text-sm sm:text-base">Localisation</h3>
              <p className="text-xs sm:text-base text-gray-400">Matoto kondebouyin, Conakry</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
