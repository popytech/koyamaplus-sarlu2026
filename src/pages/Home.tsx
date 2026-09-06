import { ShoppingBag, Sparkles, Package, Shield, HeadphonesIcon, Star, Zap, Award } from 'lucide-react';
import { useState, useEffect } from 'react';
import { assetUrl } from '../lib/assetUrl';

// Composant pour animer les chiffres
interface AnimatedNumberProps {
  end: number;
  duration?: number;
  suffix?: string;
}

function AnimatedNumber({ end, duration = 2000, suffix = '' }: AnimatedNumberProps) {
  const [count, setCount] = useState(end);

  useEffect(() => {
    let currentValue = 0;
    
    if (end === 0) {
      setCount(0);
      return;
    }

    // Calculer le nombre d'étapes et l'incrément
    const steps = Math.min(end, 60); // Max 60 steps pour fluidité
    const increment = end / steps;
    const stepDuration = duration / steps;

    const timer = setInterval(() => {
      currentValue += increment;
      if (currentValue >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(currentValue));
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [end, duration]);

  return <span>{count}{suffix}</span>;
}

interface HomeProps {
  onNavigate: (page: string) => void;
}

export default function Home({ onNavigate }: HomeProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const carouselImages = [
    assetUrl('/images/image 2.jpeg'),
    assetUrl('/images/nettoyage (1).jpeg'),
    assetUrl('/images/graine (1).jpeg'),
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(prev => (prev + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [carouselImages.length]);
  const services = [
    {
      icon: ShoppingBag,
      title: 'Boutique en Ligne',
      description: '20 produits naturels premium',
      color: 'emerald',
      image: assetUrl('/images/graine (1).jpeg'),
    },
    {
      icon: Sparkles,
      title: 'Nettoyage Pro',
      description: '9 services professionnels',
      color: 'cyan',
      image: assetUrl('/images/nettoyage (1).jpeg'),
    },
  ];

  const shopCategories = [
    { name: 'Suppléments alimentaires', icon: Package, count: '2+', color: 'emerald' },
    { name: 'Appareils de Massage', icon: Sparkles, count: '12+', color: 'cyan' },
    { name: 'Bien - être & Soins Intime', icon: Package, count: '3+', color: 'blue' },
  ];

  const cleaningServices = [
    { name: 'Nettoyage de Bureaux', icon: Package, price: '50K', image: assetUrl('/images/nettoyage (2).jpeg') },
    { name: 'Nettoyage Commercial', icon: Package, price: '85K', image: assetUrl('/images/nettoyage (3).jpeg') },
    { name: 'Grand Ménage', icon: Package, price: '75K', image: assetUrl('/images/nettoyage (4).jpeg') },
    { name: 'Fin de Chantier', icon: Package, price: '150K', image: assetUrl('/images/nettoyage (5).jpeg') },
  ];

  const advantages = [
    { icon: Shield, title: 'Qualité Certifiée', description: '100% naturel & professionnel' },
    { icon: Zap, title: 'Livraison Rapide', description: 'Sous 1h dans Conakry' },
    { icon: HeadphonesIcon, title: 'Support 24/7', description: 'Équipe réactive & disponible' },
    { icon: Award, title: '500+ Clients', description: 'Satisfaction garantie' },
  ];

  const categoryAdvantages = [
    {
      title: 'Avantages Appareils',
      items: [
        'Facile à utiliser',
        'Prix concurrentiel',
        'Livraison rapide & gratuite à Conakry',
      ],
    },
    {
      title: 'Avantages Suppléments Alimentaires',
      items: [
        'Produit naturel',
        'Prix concurrentiel',
        'Livraison rapide & gratuite à Conakry',
      ],
    },
  ];

  const testimonials = [
    {
      name: 'Agnès Haba',
      role: 'Client Fidèle',
      rating: 5,
      comment: 'Sincèrement impressionnée par la qualité des produits. Résultats visibles très rapidement!',
      image: assetUrl('/images/client1.jpeg'),
    },
    {
      name: 'Mamadou Diallo.',
      role: 'Directeur Commercial',
      rating: 5,
      comment: 'Service de nettoyage impeccable. Notre bureau n\'a jamais été aussi propre. Merci!',
      image: assetUrl('/images/client2.jpeg'),
    },
    {
      name: 'Aïssatou Barry.',
      role: 'Entrepreneur',
      rating: 5,
      comment: 'Un vrai partenaire de confiance. Produits naturels authentiques avec des résultats garantis.',
      image: assetUrl('/images/client3.jpeg'),
    },
    {
      name: 'Ibrahim Kallo.',
      role: 'Responsable RH',
      rating: 5,
      comment: 'Équipe dynamique et professionnelle. Ils ont transformé notre environnement de travail!',
      image: assetUrl('/images/client4.jpeg'),
    },
  ];

  return (
    <div className="min-h-screen bg-stone-50">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-brand-blue">
        <div className="absolute inset-0">
          {carouselImages.map((image, idx) => (
            <div
              key={idx}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                idx === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={image}
                alt="Hero background"
                className="w-full h-full object-cover object-center"
                style={{ objectPosition: 'center center', filter: 'brightness(0.55)' }}
              />
            </div>
          ))}
          <div className="absolute inset-0 bg-brand-blue/90" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 py-24 sm:py-28 lg:py-32">
          <div className="grid gap-12 xl:grid-cols-[1.05fr_0.95fr] items-center">
            <div className="text-white">
              <span className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold uppercase tracking-wide text-white/90 shadow-sm">
                Leader en Bien-Être & Hygiène Professionnelle
              </span>
              <h1 className="mt-8 text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
                Votre Bien-Être,
                <span className="block font-corsiva text-5xl sm:text-6xl text-white/95">Notre Mission</span>
              </h1>
              <p className="mt-6 max-w-2xl text-base sm:text-lg text-white/80 leading-relaxed">
                Découvrez nos produits naturels premium et nos services de nettoyage professionnel pour un environnement plus sain, plus sûr et plus confortable.
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                <button
                  onClick={() => onNavigate('shop')}
                  className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-3 text-sm font-semibold text-brand-blue shadow-lg shadow-brand-blue/20 transition duration-300 hover:bg-gray-100"
                >
                  Visiter la boutique
                </button>
                <button
                  onClick={() => onNavigate('cleaning')}
                  className="inline-flex items-center justify-center rounded-lg border border-white/30 bg-white/10 px-8 py-3 text-sm font-semibold text-white transition duration-300 hover:bg-white/15"
                >
                  Demander un devis
                </button>
              </div>

              <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="rounded-lg border border-white/10 bg-white/10 p-5 shadow-lg shadow-black/10">
                  <p className="text-3xl font-bold text-white">500+</p>
                  <p className="mt-2 text-sm text-white/80">Clients Satisfaits</p>
                </div>
                <div className="rounded-lg border border-white/10 bg-white/10 p-5 shadow-lg shadow-black/10">
                  <p className="text-3xl font-bold text-white">20</p>
                  <p className="mt-2 text-sm text-white/80">Produits Premium</p>
                </div>
                <div className="rounded-lg border border-white/10 bg-white/10 p-5 shadow-lg shadow-black/10">
                  <p className="text-3xl font-bold text-white">100%</p>
                  <p className="mt-2 text-sm text-white/80">Naturel & Garanti</p>
                </div>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-xl">
              <div className="absolute -left-10 top-10 h-28 w-28 rounded-lg bg-brand-red/20 blur-3xl" />
              <div className="absolute -right-10 bottom-10 h-32 w-32 rounded-lg bg-white/10 blur-3xl" />
              <div className="overflow-hidden rounded-lg border border-white/10 bg-white/10 shadow-2xl shadow-brand-blue/20">
                <img
                  src={carouselImages[currentImageIndex]}
                  alt="KOYAMA PLUS hero"
                  className="h-[520px] w-full object-cover object-center"
                  style={{ objectPosition: 'center center' }}
                />
                <div className="absolute inset-x-0 bottom-0 bg-black/60 p-6">
                  <p className="text-sm text-white/70">Qualité, naturel et hygiène professionnelle</p>
                  <h2 className="mt-3 text-2xl font-bold text-white">Solutions complètes pour votre bien-être</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORY ADVANTAGES */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-brand-blue text-center mb-16">Avantages par catégorie</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {categoryAdvantages.map((category, index) => (
              <div key={index} className="border border-brand-blue/10 rounded-lg p-8 bg-white shadow-sm">
                <h3 className="text-2xl font-bold text-brand-blue mb-4">{category.title}</h3>
                <ul className="space-y-3 text-gray-700">
                  {category.items.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-1 h-2.5 w-2.5 rounded-full bg-brand-blue flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section className="py-20 px-4 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/5 bg-[size:50px_50px]" />
        <div className="relative max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-brand-blue text-center mb-16">
            Nos Services Exclusifs
          </h2>

          <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-6 xs:gap-8 sm:gap-10 md:gap-12">
            {services.map((service, idx) => (
              <div key={idx} className="group relative">
                <div className="absolute inset-0 bg-brand-blue/10 rounded-lg opacity-80 group-hover:opacity-100 transition duration-300" />
                <div className="relative bg-brand-blue rounded-lg overflow-hidden">
                  <div className="h-64 overflow-hidden relative">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                    />
                    <div className="absolute inset-0 bg-brand-blue/20" />
                  </div>
                  <div className="p-8">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-brand-red/20 rounded-lg flex items-center justify-center">
                        <service.icon className="w-6 h-6 text-brand-red" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white">{service.title}</h3>
                        <p className="text-gray-400">{service.description}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => onNavigate(service.title === 'Boutique en Ligne' ? 'shop' : 'cleaning')}
                      className="w-full mt-4 px-6 py-3 bg-brand-red text-white font-bold rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2"
                    >
                      Explorer
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SHOP CATEGORIES */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-brand-blue text-center mb-16">
            Catégories de Produits
          </h2>

          <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 xs:gap-4 sm:gap-5 md:gap-6">
            {shopCategories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => onNavigate('shop')}
                className="group p-8 bg-brand-blue rounded-lg border border-white/20 hover:border-brand-red transition text-center cursor-pointer transform hover:scale-105"
                aria-label={`Voir la catégorie ${cat.name}`}
              >
                <div className="w-16 h-16 bg-brand-red/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <cat.icon className="w-8 h-8 text-brand-red" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{cat.name}</h3>
                <p className="text-brand-red font-semibold">{cat.count} produits</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* CLEANING SERVICES */}
      <section className="py-20 px-4 bg-stone-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-brand-blue text-center mb-16">
            Services de Nettoyage
          </h2>

          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 xs:gap-4 sm:gap-5 md:gap-6">
            {cleaningServices.map((service, idx) => (
              <div key={idx} className="group relative overflow-hidden rounded-lg">
                <div className="absolute inset-0 bg-brand-blue/10 rounded-lg opacity-80 group-hover:opacity-100 transition duration-300" />
                <div className="relative bg-brand-blue p-6 rounded-lg h-full flex flex-col">
                  <div className="h-40 overflow-hidden rounded-lg mb-4 relative">
                    <img
                      src={service.image}
                      alt={service.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                    />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{service.name}</h3>
                  <p className="text-brand-red font-bold text-2xl mt-auto">{service.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ADVANTAGES */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-brand-blue text-center mb-16">
            Pourquoi Choisir KOYAMA PLUS ?
          </h2>

          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 xs:gap-5 sm:gap-6 md:gap-8">
            {advantages.map((adv, idx) => (
              <div key={idx} className="text-center group">
                <div className="w-16 h-16 bg-brand-blue/20 rounded-md flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition">
                  <adv.icon className="w-8 h-8 text-brand-red" />
                </div>
                <h3 className="text-xl font-bold text-brand-blue mb-3">{adv.title}</h3>
                <p className="text-gray-600">{adv.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 px-4 bg-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-red/10 rounded-lg blur-3xl" />
        </div>

        <div className="relative max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-brand-blue text-center mb-16">
            Avis de Nos Clients
          </h2>

          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 xs:gap-5 sm:gap-6 md:gap-8">
            {testimonials.map((testimonial, idx) => (
              <div key={idx} className="bg-brand-blue rounded-lg p-8 border border-brand-red/20 hover:border-brand-red transition">
                <div className="mb-4">
                  <h4 className="font-bold text-white">{testimonial.name}</h4>
                  <p className="text-sm text-white">{testimonial.role}</p>
                </div>

                <div className="flex gap-1 mb-4">
                  {Array(testimonial.rating)
                    .fill(0)
                    .map((_: any, i: number) => (
                      <Star key={i} className="w-5 h-5 text-brand-red fill-brand-red" />
                    ))}
                </div>

                <p className="text-gray-300 italic">"{testimonial.comment}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-20 px-4 relative overflow-hidden" style={{backgroundColor: 'rgba(255, 35, 83, 0.1)'}}>
        <div className="absolute inset-0 bg-grid-white/5 bg-[size:50px_50px]" />
        <div className="relative max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-brand-blue mb-6 font-tahoma">
            Prêt à Transformer Votre Vie ?
          </h2>
          <p className="text-2xl text-brand-red mb-12" style={{fontFamily: 'Tahoma, system-ui, sans-serif'}}>
            Rejoignez nos 500+ clients satisfaits et découvrez la différence KOYAMA PLUS
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button
              onClick={() => onNavigate('shop')}
              className="px-8 py-4 text-white font-bold rounded-lg hover:opacity-90 transition-all transform hover:scale-105 font-tahoma"
              style={{backgroundColor: '#ff2353'}}
            >
              Commencer les Achats
            </button>
            <button
              onClick={() => onNavigate('cleaning')}
              className="px-8 py-4 text-white font-bold rounded-lg hover:opacity-90 transition-all"
              style={{backgroundColor: '#312883', border: '2px solid #ff2353'}}
            >
              Demander un Devis
            </button>
          </div>

          <p className="text-white text-3xl font-bold italic mt-12 font-corsiva" style={{fontFamily: 'Monotype Corsiva, Georgia, serif', color: '#312883'}}>
            « AVEC KPLUS, VOTRE SATISFACTION EST RÉELLE ! »
          </p>
        </div>
      </section>
    </div>
  );
}
