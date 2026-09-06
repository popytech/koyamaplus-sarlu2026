import { useState, useEffect } from 'react';
import { Calendar, User } from 'lucide-react';
import { assetUrl } from '../lib/assetUrl';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  image_url: string;
  created_at: string;
}

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filter, setFilter] = useState<'all' | 'wellness' | 'cleaning'>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    // Mock blog posts data
    const mockPosts: BlogPost[] = [
      {
        id: '1',
        title: 'Les bienfaits des compléments naturels',
        excerpt: 'Découvrez comment les compléments naturels peuvent renforcer votre bien-être.',
        category: 'wellness',
        image_url: '/images/graine (1).jpeg',
        created_at: new Date().toISOString(),
      },
      {
        id: '2',
        title: 'Nettoyage professionnel: pourquoi faire appel à un expert',
        excerpt: 'Un nettoyage professionnel apporte des résultats qu\'on ne peut pas atteindre soi-même.',
        category: 'cleaning',
        image_url: '/images/nettoyage (1).jpeg',
        created_at: new Date(Date.now() - 86400000).toISOString(),
      },
    ];
    
    setPosts(mockPosts);
    setLoading(false);
  };

  const filteredPosts = filter === 'all'
    ? posts
    : posts.filter(post => post.category === filter);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-brand-blue text-white py-12 sm:py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-3 sm:mb-4">Blog & Conseils</h1>
          <p className="text-sm sm:text-base md:text-lg text-white/80">
            Découvrez nos articles sur le bien-être et l'hygiène
          </p>
        </div>
      </div>

      <div className="w-full px-4 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap gap-2 sm:gap-4 mb-6 sm:mb-8">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 sm:px-6 py-1.5 sm:py-2 rounded-lg font-medium text-sm sm:text-base transition-colors ${
              filter === 'all'
                ? 'bg-brand-red text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Tous les articles
          </button>
          <button
            onClick={() => setFilter('wellness')}
            className={`px-4 sm:px-6 py-1.5 sm:py-2 rounded-lg font-medium text-sm sm:text-base transition-colors ${
              filter === 'wellness'
                ? 'bg-brand-red text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Bien-être
          </button>
          <button
            onClick={() => setFilter('cleaning')}
            className={`px-4 sm:px-6 py-1.5 sm:py-2 rounded-lg font-medium text-sm sm:text-base transition-colors ${
              filter === 'cleaning'
                ? 'bg-brand-red text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Nettoyage
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-brand-red"></div>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg">
            <p className="text-sm sm:text-base md:text-lg text-gray-600">
              Aucun article disponible pour le moment. Revenez bientôt !
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
              >
                <div className="h-40 sm:h-48 bg-gray-200">
                  {post.image_url ? (
                    <img
                      src={assetUrl(post.image_url)}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <User className="w-12 sm:w-16 h-12 sm:h-16" />
                    </div>
                  )}
                </div>

                <div className="p-3 sm:p-6">
                  <div className="flex items-center space-x-2 sm:space-x-4 text-xs sm:text-sm text-gray-500 mb-2 sm:mb-3">
                    <span className={`px-2 py-0.5 sm:py-1 rounded-lg text-xs font-medium ${
                      post.category === 'wellness'
                        ? 'bg-brand-red/10 text-brand-red'
                        : 'bg-brand-blue/10 text-brand-blue'
                    }`}>
                      {post.category === 'wellness' ? 'Bien-être' : 'Nettoyage'}
                    </span>
                    <span className="flex items-center">
                      <Calendar className="w-3 sm:w-4 h-3 sm:h-4 mr-1" />
                      {formatDate(post.created_at)}
                    </span>
                  </div>

                  <h2 className="text-base sm:text-xl font-bold text-brand-blue mb-2 sm:mb-3 line-clamp-2">
                    {post.title}
                  </h2>

                  {post.excerpt && (
                    <p className="text-sm sm:text-base text-gray-600 line-clamp-3 mb-3 sm:mb-4">
                      {post.excerpt}
                    </p>
                  )}

                  <button className="text-xs sm:text-base text-brand-red font-semibold hover:text-brand-blue transition-colors">
                    Lire la suite →
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
        </div>
      </div>
    </div>
  );
}
