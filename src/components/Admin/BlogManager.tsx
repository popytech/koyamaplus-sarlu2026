import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X, Search, Eye, EyeOff } from 'lucide-react';
import ImageUpload from './ImageUpload';
import { assetUrl } from '../../lib/assetUrl';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: 'wellness' | 'cleaning';
  image_url: string;
  created_at: string;
  updated_at: string;
  published: boolean;
  author: string;
}

const BLOG_STORAGE_KEY = 'kp_blog_posts';

const DEFAULT_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'Les bienfaits des compléments naturels',
    excerpt: 'Découvrez comment les compléments naturels peuvent renforcer votre bien-être...',
    content: 'Lorem ipsum dolor sit amet...',
    category: 'wellness',
    image_url: '/images/graine (1).jpeg',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    published: true,
    author: 'Admin',
  },
  {
    id: '2',
    title: 'Nettoyage professionnel: pourquoi faire appel à un expert',
    excerpt: 'Un nettoyage professionnel apporte des résultats...',
    content: 'Lorem ipsum dolor sit amet...',
    category: 'cleaning',
    image_url: '/images/nettoyage (1).jpeg',
    created_at: new Date(Date.now() - 86400000).toISOString(),
    updated_at: new Date(Date.now() - 86400000).toISOString(),
    published: true,
    author: 'Admin',
  },
];

export default function BlogManager() {
  const [posts, setPosts] = useState<BlogPost[]>(() => {
    try {
      const stored = localStorage.getItem(BLOG_STORAGE_KEY);
      return stored ? JSON.parse(stored) : DEFAULT_POSTS;
    } catch {
      return DEFAULT_POSTS;
    }
  });

  useEffect(() => {
    localStorage.setItem(BLOG_STORAGE_KEY, JSON.stringify(posts));
  }, [posts]);

  const [searchQuery, setSearchQuery] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);

  const handleDelete = (postId: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet article?')) {
      setPosts(posts.filter(p => p.id !== postId));
    }
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setShowForm(true);
  };

  const handleAdd = () => {
    setEditingPost(null);
    setShowForm(true);
  };

  const handleSubmit = (formData: BlogPost) => {
    if (editingPost) {
      setPosts(posts.map(p => p.id === editingPost.id ? { ...formData, updated_at: new Date().toISOString() } : p));
    } else {
      setPosts([
        ...posts,
        {
          ...formData,
          id: Date.now().toString(),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }
      ]);
    }
    setShowForm(false);
    setEditingPost(null);
  };

  const togglePublish = (postId: string) => {
    setPosts(posts.map(p =>
      p.id === postId ? { ...p, published: !p.published } : p
    ));
  };

  const filteredPosts = posts.filter(p =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="space-y-6">
      {/* Header with Search and Add Button */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Rechercher un article..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-red focus:border-transparent"
          />
        </div>
        <button
          onClick={handleAdd}
          className="bg-brand-blue hover:bg-brand-red text-white px-6 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors whitespace-nowrap"
        >
          <Plus size={20} />
          Nouvel Article
        </button>
      </div>

      {/* Blog Posts Grid */}
      <div className="grid grid-cols-1 gap-6">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-12 text-gray-500 bg-white rounded-lg">
            Aucun article trouvé
          </div>
        ) : (
          filteredPosts.map((post) => (
            <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="md:flex">
                {/* Image */}
                <div className="md:w-1/4">
                  <img
                    src={assetUrl(post.image_url)}
                    alt={post.title}
                    className="w-full h-48 md:h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <span className={`px-3 py-1 rounded-lg text-xs font-medium ${
                        post.category === 'wellness'
                          ? 'bg-brand-red/10 text-brand-red'
                          : 'bg-brand-blue/10 text-brand-blue'
                      }`}>
                        {post.category === 'wellness' ? 'Bien-être' : 'Nettoyage'}
                      </span>
                      <span className={`flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-medium ${
                        post.published
                          ? 'bg-brand-blue/10 text-brand-blue'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {post.published ? <Eye size={14} /> : <EyeOff size={14} />}
                        {post.published ? 'Publié' : 'Brouillon'}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-2">{post.title}</h3>
                    <p className="text-gray-600 mb-4">{post.excerpt}</p>

                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>Par {post.author}</span>
                      <span>{formatDate(post.created_at)}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-4 pt-4 border-t border-gray-200 mt-4">
                    <button
                      onClick={() => togglePublish(post.id)}
                      className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                        post.published
                          ? 'bg-brand-blue/10 text-brand-blue hover:bg-brand-blue/20'
                          : 'bg-brand-red/10 text-brand-red hover:bg-brand-red/20'
                      }`}
                    >
                      {post.published ? 'Dépublier' : 'Publier'}
                    </button>
                    <button
                      onClick={() => handleEdit(post)}
                      className="flex-1 bg-brand-blue/10 text-brand-blue hover:bg-brand-blue/20 py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                    >
                      <Edit2 size={16} />
                      Modifier
                    </button>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="flex-1 bg-brand-red/10 text-brand-red hover:bg-brand-red/20 py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                    >
                      <Trash2 size={16} />
                      Supprimer
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Blog Post Form Modal */}
      {showForm && (
        <BlogPostForm
          post={editingPost}
          onSubmit={handleSubmit}
          onClose={() => {
            setShowForm(false);
            setEditingPost(null);
          }}
        />
      )}
    </div>
  );
}

function BlogPostForm({
  post,
  onSubmit,
  onClose,
}: {
  post: BlogPost | null;
  onSubmit: (formData: BlogPost) => void;
  onClose: () => void;
}) {
  const [formData, setFormData] = useState<BlogPost>(post || {
    id: '',
    title: '',
    excerpt: '',
    content: '',
    category: 'wellness',
    image_url: '',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    published: false,
    author: 'Admin',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold">
            {post ? 'Modifier Article' : 'Créer Article'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700" title="Fermer" aria-label="Fermer le formulaire">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Titre*
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-red"
              aria-label="Titre de l'article"
              placeholder="Titre de l'article"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Catégorie*
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-red"
              aria-label="Catégorie de l'article"
            >
              <option value="wellness">Bien-être</option>
              <option value="cleaning">Nettoyage</option>
            </select>
          </div>

          <ImageUpload
            images={formData.image_url ? [formData.image_url] : []}
            onChange={(imgs) => setFormData({ ...formData, image_url: imgs[0] || '' })}
            multiple={false}
            label="Image de l'article"
            accentColor="blue"
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Extrait*
            </label>
            <textarea
              name="excerpt"
              value={formData.excerpt}
              onChange={handleChange}
              rows={2}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-red"
              aria-label="Extrait de l'article"
              placeholder="Résumé court de l'article"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contenu*
            </label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              rows={6}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-red font-mono text-sm"
              aria-label="Contenu de l'article"
              placeholder="Écrivez votre article ici... (Vous pouvez utiliser du HTML ou Markdown)"
              required
            />
          </div>

          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.published}
                onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                className="w-4 h-4"
              />
              <span className="text-sm text-gray-700">Publier immédiatement</span>
            </label>
          </div>

          <div className="flex gap-4 justify-end pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-brand-blue text-white rounded-lg font-medium hover:bg-brand-red"
            >
              {post ? 'Modifier' : 'Créer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
