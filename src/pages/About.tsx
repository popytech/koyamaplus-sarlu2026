import { Target, Eye, Heart, Users, Award, Zap, Shield, TrendingUp } from 'lucide-react';
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

interface AboutProps {
  onNavigate: (page: string) => void;
}

export default function About({ onNavigate }: AboutProps) {
  const stats = [
    { number: 500, label: 'Clients satisfaits', icon: Users, suffix: '+' },
    { number: 20, label: 'Produits premium', icon: Award, suffix: '' },
    { number: 100, label: 'Naturels & éco', icon: Heart, suffix: '%' },
    { number: 9, label: 'Services nettoyage', icon: Zap, suffix: '' },
  ];

  const team = [
    {
      name: 'Responsable Boutique',
      role: 'Wellness Expert',
      image: assetUrl('/images/equipe.jpeg'),
      description: 'Passionné par les produits naturels',
    },
    {
      name: 'Chef Nettoyage',
      role: 'Operations Manager',
      image: assetUrl('/images/nettoyage (1).jpeg'),
      description: 'Expert en hygiène professionnelle',
    },
    {
      name: 'Service Client',
      role: 'Customer Care',
      image: assetUrl('/images/image 2.jpeg'),
      description: 'Votre satisfaction est notre priorité',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 hero-bg-image" />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-brand-blue/10" />
        
        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center text-white">
          <div className="mb-6 sm:mb-8 animate-fade-in">
            <span className="inline-block px-4 sm:px-6 py-1.5 sm:py-2 rounded-lg text-brand-red text-xs sm:text-sm font-semibold mb-3 sm:mb-4 font-tahoma border border-brand-red bg-brand-red/20">
              Depuis 2024 • Leader du Well-Being
            </span>
          </div>
          
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight animate-fade-in-up font-tahoma">
            SOCIÉTÉ KOYAMA PLUS SARLU
            <span className="block text-brand-blue text-5xl sm:text-6xl font-normal">
              L'Excellence d'une Hygiène Intégrale
            </span>
          </h1>
          
          <p className="text-sm sm:text-xl md:text-2xl text-black mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in-up animation-delay-200">
            « Purifier le corps, assainir le cadre, libérer l'esprit. »
          </p>
          
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center animate-fade-in-up animation-delay-300">
              <button 
                onClick={() => onNavigate('shop')}
                className="px-6 sm:px-8 py-3 sm:py-4 text-white font-bold text-sm sm:text-base rounded-lg hover:opacity-90 transition-all transform hover:scale-105"
                style={{backgroundColor: '#ff2353'}}
              >
              Découvrir nos produits
            </button>
            <button 
              onClick={() => onNavigate('cleaning')}
              className="px-6 sm:px-8 py-3 sm:py-4 text-white font-bold text-sm sm:text-base rounded-lg hover:opacity-90 transition-all"
              style={{backgroundColor: '#312883', border: '2px solid #ff2353'}}
            >
              Demander un devis
            </button>
          </div>
          <div className="mt-6 text-center">
            <a href="tel:+224611243030" className="inline-block text-base sm:text-lg text-brand-blue font-semibold bg-white rounded-lg px-5 py-3 shadow-sm hover:bg-gray-100 transition">
              +224 611 24 30 30
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-brand-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 px-4 relative overflow-hidden bg-brand-blue text-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-4 sm:gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center text-white animate-fade-in-up">
                <div className="flex justify-center mb-3 sm:mb-4">
                  <stat.icon className="w-8 sm:w-10 h-8 sm:h-10" />
                </div>
                <div className="text-2xl sm:text-4xl md:text-5xl font-bold mb-2 font-tahoma">
                  <AnimatedNumber end={stat.number} duration={2000} suffix={stat.suffix} />
                </div>
                <div className="text-sm sm:text-lg font-semibold opacity-90" style={{fontFamily: 'Tahoma, system-ui, sans-serif'}}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Notre Histoire Section */}
      <div className="w-full px-4 py-12 sm:py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6 sm:gap-12 items-center">
            <div className="relative group">
              <div className="absolute inset-0 bg-brand-blue/10 rounded-lg opacity-80 group-hover:opacity-100 transition duration-300" />
              <img
                src={assetUrl('/images/equipe.jpeg')}
                alt="Notre équipe"
                className="relative w-full h-48 sm:h-96 object-cover rounded-lg shadow-2xl"
              />
            </div>

            <div className="text-gray-900">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">Qui sommes-nous ?</h2>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4 sm:mb-6">
                Bienvenue dans l'univers de la SOCIÉTÉ KOYAMA PLUS (K-PLUS). Basés en Guinée, nous sommes animés par une conviction profonde : la réussite et l'épanouissement d'un individu dépendent de l'harmonie entre sa santé intérieure et la qualité de son environnement de vie.
              </p>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-6 sm:mb-8">
                Nous avons choisi de briser les codes traditionnels en réunissant deux expertises complémentaires au service de votre sérénité : le bien-être par les plantes et l'hygiène professionnelle des espaces.
              </p>

              <div className="space-y-3 sm:space-y-4">
                {[
                  'Plus de 500 clients satisfaits',
                  '17 produits naturels certifiés',
                  'Services 24/7 disponibles',
                  'Garantie de satisfaction 100%',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center space-x-3">
                    <div className="w-2 h-2 rounded-full bg-brand-blue" />
                    <span className="text-sm sm:text-base text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mission, Vision, Valeurs */}
      <div className="bg-brand-blue py-8 sm:py-12 md:py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white text-center mb-6 sm:mb-8 md:mb-12">
            Notre Engagement
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
            {/* Mission */}
            <div className="group relative">
              <div className="absolute inset-0 bg-brand-blue/10 rounded-lg opacity-30 group-hover:opacity-60 transition duration-300" />
              <div className="relative bg-white/10 p-3 sm:p-4 md:p-6 rounded-lg h-full border border-white/20">
                <div className="mb-2 sm:mb-3 flex justify-center">
                  <Target className="w-6 sm:w-8 h-6 sm:h-8 text-brand-red" />
                </div>
                <h3 className="text-sm sm:text-base md:text-lg font-bold text-white mb-2 sm:mb-3 text-center">Notre Mission</h3>
                <p className="text-xs sm:text-sm text-white/80 text-center leading-relaxed">
                  « Purifier le corps, assainir le cadre, libérer l'esprit. »
                </p>
              </div>
            </div>

            {/* Vision */}
            <div className="group relative">
              <div className="absolute inset-0 bg-white/10 rounded-lg opacity-30 group-hover:opacity-60 transition duration-300" />
              <div className="relative bg-white/10 p-3 sm:p-4 md:p-6 rounded-lg h-full border border-white/20">
                <div className="mb-2 sm:mb-3 flex justify-center">
                  <Eye className="w-6 sm:w-8 h-6 sm:h-8 text-white" />
                </div>
                <h3 className="text-sm sm:text-base md:text-lg font-bold text-white mb-2 sm:mb-3 text-center">Notre Vision</h3>
                <p className="text-xs sm:text-sm text-white/80 text-center leading-relaxed">
                  Être le partenaire de confiance en Guinée et en Afrique de l'Ouest.
                </p>
              </div>
            </div>

            {/* Valeurs */}
            <div className="group relative">
              <div className="absolute inset-0 bg-brand-blue/10 rounded-lg opacity-30 group-hover:opacity-60 transition duration-300" />
              <div className="relative bg-white/10 p-3 sm:p-4 md:p-6 rounded-lg h-full border border-white/20">
                <div className="mb-2 sm:mb-3 flex justify-center">
                  <Heart className="w-6 sm:w-8 h-6 sm:h-8 text-brand-red" />
                </div>
                <h3 className="text-sm sm:text-base md:text-lg font-bold text-white mb-2 sm:mb-3 text-center">Notre Excellence</h3>
                <p className="text-xs sm:text-sm text-white/80 text-center leading-relaxed">
                  Soins naturels et nettoyage professionnel pour votre bien-être.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pourquoi nous choisir */}
      <div className="w-full px-4 py-12 sm:py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-brand-blue text-center mb-8 sm:mb-16">
            Pourquoi Choisir KOYAMA PLUS ?
          </h2>

          <div className="grid md:grid-cols-2 gap-4 sm:gap-8">
            {[
              {
                icon: Award,
                title: 'Approche 360°',
                description: 'Nous sommes les seuls à prendre soin de vous et de votre environnement simultanément.',
                color: 'emerald',
              },
              {
                icon: Shield,
                title: 'Engagement Qualité',
                description: 'Que ce soit pour un produit de bien-être ou une prestation de nettoyage, l\'excellence est notre standard.',
                color: 'blue',
              },
              {
                icon: Heart,
                title: 'Confiance & Discrétion',
                description: 'Nous traitons vos besoins de bien-être et vos espaces professionnels avec le plus haut niveau de respect et de confidentialité.',
                color: 'pink',
              },
              {
                icon: Zap,
                title: 'Support 24/7',
                description: 'Une équipe dédiée prête à répondre à vos questions et à résoudre vos problèmes à tout moment.',
                color: 'yellow',
              },
              {
                icon: TrendingUp,
                title: 'Innovation Continue',
                description: 'Nous investissons constamment dans la recherche pour améliorer nos produits et services.',
                color: 'green',
              },
              {
                icon: Users,
                title: 'Communauté Active',
                description: '500+ clients satisfaits qui font confiance à KOYAMA PLUS pour leur bien-être quotidien.',
                color: 'purple',
              },
            ].map((item, index) => (
              <div key={index} className="group relative">
                <div className="absolute inset-0 bg-brand-blue/10 rounded-lg opacity-80 group-hover:opacity-100 transition duration-300" />
                <div className="relative bg-brand-blue/10 border border-brand-blue/20 p-4 sm:p-8 rounded-lg h-full flex items-start space-x-3 sm:space-x-4 transition">
                  <div className="flex-shrink-0 w-10 sm:w-12 h-10 sm:h-12 bg-brand-blue/20 rounded-lg flex items-center justify-center">
                    <item.icon className="w-5 sm:w-6 h-5 sm:h-6 text-brand-blue" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-xl font-bold text-brand-blue mb-1 sm:mb-2">{item.title}</h3>
                    <p className="text-sm sm:text-base text-brand-blue leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Notre Équipe */}
      <div className="bg-gray-900 py-12 sm:py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center mb-8 sm:mb-16">
            Notre Équipe Dévouée
          </h2>

          <div className="grid md:grid-cols-3 gap-4 sm:gap-8">
            {team.map((member, index) => (
              <div key={index} className="group relative">
                <div className="absolute inset-0 bg-brand-blue/10 rounded-lg opacity-80 group-hover:opacity-100 transition duration-300" />
                <div className="relative bg-gray-800 rounded-lg overflow-hidden">
                  <div className="h-40 sm:h-64 overflow-hidden relative">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                    />
                    <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition duration-300" />
                  </div>
                  <div className="p-4 sm:p-6">
                    <h3 className="text-base sm:text-xl font-bold text-white mb-1">{member.name}</h3>
                    <p className="text-xs sm:text-sm text-brand-red font-semibold mb-2 sm:mb-3">{member.role}</p>
                    <p className="text-sm sm:text-base text-gray-400">{member.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="w-full px-4 py-12 sm:py-20">
        <div className="max-w-6xl mx-auto">
          <div className="relative group">
            <div className="absolute -inset-1 rounded-lg blur-xl opacity-30 group-hover:opacity-60 transition duration-300 bg-brand-blue/30" />
            <div className="relative bg-gray-900 rounded-lg p-6 sm:p-12 text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 font-tahoma">
                Rejoignez la Communauté KOYAMA PLUS
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto" style={{fontFamily: 'Tahoma, system-ui, sans-serif'}}>
                Découvrez comment nos produits naturels et nos services professionnels peuvent transformer votre quotidien.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <a 
                  href="https://whatsapp.com/channel/0029VbBmHA7CBtx6TW463c2R"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 sm:px-8 py-3 sm:py-4 text-white font-bold text-sm sm:text-base rounded-lg hover:opacity-90 transition-all transform hover:scale-105 text-center"
                  style={{backgroundColor: '#ff2353'}}
                >
                  Commencer maintenant
                </a>
                <button 
                  onClick={() => onNavigate('contact')}
                  className="px-6 sm:px-8 py-3 sm:py-4 text-white font-bold text-sm sm:text-base rounded-lg hover:opacity-90 transition-all"
                  style={{backgroundColor: '#312883', border: '2px solid #ff2353'}}
                >
                  Nous contacter
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Quote */}
      <div className="py-8 sm:py-12 px-4 text-center bg-brand-blue text-white">
        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white italic font-corsiva" style={{fontFamily: 'Monotype Corsiva, Georgia, serif'}}>
          « AVEC KPLUS, VOTRE SATISFACTION EST RÉELLE ! »
        </h3>
      </div>
    </div>
  );
}
