import { useState, useEffect } from 'react';
import { productsService } from '../lib/dataService';
import { ShoppingCart, Star, Search, ChevronDown, X } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { assetUrl } from '../lib/assetUrl';
import { showToast } from '../lib/toast';
import { useAuth } from '../contexts/AuthContext';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  sale_price: number | null;
  images: string[];
  stock: number;
  is_featured: boolean;
  category_id: string;
  benefits?: string;
  contraindications?: string;
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface ShopProps {
  onAuthClick: () => void;
  onProductClick: (productId: string) => void;
}

export default function Shop({ onAuthClick, onProductClick }: ShopProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'name'>('featured');
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({ min: 0, max: 500000 });
  const [showFilters, setShowFilters] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const { user } = useAuth();

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  const fetchCategories = async () => {
    try {
      const data = await productsService.getCategories();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await productsService.getProducts();
      setProducts(data as Product[]);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (productId: string, qty: number = 1) => {
    try {
      const product = products.find(p => p.id === productId);
      await addToCart(productId, qty, product);
      showToast('Produit ajouté au panier !');
      setSelectedProduct(null);
      setQuantity(1);
    } catch (error) {
      console.error('Error adding to cart:', error);
      showToast("Erreur lors de l'ajout au panier");
    }
  };

  // Filtrage et tri
  let filteredProducts = products.filter(p => {
    const matchCategory = selectedCategory === 'all' || p.category_id === selectedCategory;
    const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       p.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchPrice = p.price >= priceRange.min && p.price <= priceRange.max;
    return matchCategory && matchSearch && matchPrice;
  });

  // Tri
  filteredProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return (a.sale_price || a.price) - (b.sale_price || b.price);
      case 'price-high':
        return (b.sale_price || b.price) - (a.sale_price || a.price);
      case 'name':
        return a.name.localeCompare(b.name, 'fr');
      case 'featured':
      default:
        return (b.is_featured ? 1 : 0) - (a.is_featured ? 1 : 0);
    }
  });

  const maxPrice = Math.max(...products.map(p => p.price), 100000);

  return (
    <div className="min-h-screen bg-stone-50">
      {/* En-tête */}
      <div className="bg-brand-blue text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Boutique en ligne</h1>
          <p className="text-xl text-white/90">Découvrez nos produits de bien-être et de santé naturelle</p>
        </div>
      </div>

      <div className="w-full px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Barre Recherche */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher un produit... (thé, savon, ceinture...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-red text-sm sm:text-base"
              />
            </div>
          </div>

          {/* Filtres et Catégories */}
          <div className="mb-6 space-y-4">
            {/* Catégories */}
            <div className="flex flex-wrap gap-1 xs:gap-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-3 xs:px-4 py-1.5 xs:py-2 rounded-lg font-medium text-xs xs:text-sm transition-colors ${
                  selectedCategory === 'all'
                    ? 'bg-brand-blue text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                Tous
              </button>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-3 xs:px-4 py-1.5 xs:py-2 rounded-lg font-medium text-xs xs:text-sm transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-brand-blue text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>

            {/* Filtres avancés */}
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 text-gray-700 font-semibold hover:text-brand-red transition"
              >
                <ChevronDown className={`w-5 h-5 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                Filtres avancés
              </button>

              {showFilters && (
                <div className="mt-4 pt-4 border-t border-gray-200 space-y-4">
                  {/* Tri */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Trier par</label>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as any)}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-red"
                    >
                      <option value="featured">Produits vedettes</option>
                      <option value="price-low">Prix: Du moins cher au plus cher</option>
                      <option value="price-high">Prix: Du plus cher au moins cher</option>
                      <option value="name">Alphabétique (A-Z)</option>
                    </select>
                  </div>

                  {/* Filtre Prix */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Prix: {priceRange.min.toLocaleString()} - {priceRange.max.toLocaleString()} GNF
                    </label>
                    <div className="space-y-2">
                      <input
                        type="range"
                        min="0"
                        max={maxPrice}
                        value={priceRange.min}
                        onChange={(e) => setPriceRange({ ...priceRange, min: Number(e.target.value) })}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-red"
                      />
                      <input
                        type="range"
                        min="0"
                        max={maxPrice}
                        value={priceRange.max}
                        onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-red"
                      />
                    </div>
                  </div>

                  {/* Filtre Stock */}
                  <div>
                    <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-brand-red" />
                      En stock uniquement
                    </label>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Résultats */}
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-brand-red"></div>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg">
              <p className="text-gray-600 text-base">Aucun produit ne correspond à votre recherche.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
              {filteredProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  {/* Image */}
                  <div
                    className="h-32 xs:h-40 sm:h-48 md:h-56 bg-gray-200 relative cursor-pointer group overflow-hidden"
                    onClick={() => setSelectedProduct(product)}
                  >
                    {product.images && product.images.length > 0 ? (
                      <img
                          src={assetUrl(product.images[0])}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <ShoppingCart className="w-10 h-10" />
                      </div>
                    )}
                    {product.sale_price && (
                      <div className="absolute top-2 right-2 bg-brand-red text-white px-2 py-1 rounded-lg text-xs font-bold">
                        -20%
                      </div>
                    )}
                    {product.is_featured && (
                      <div className="absolute top-2 left-2 bg-brand-blue text-white px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1">
                        <Star className="w-3 h-3 fill-current" />
                        STAR
                      </div>
                    )}
                  </div>

                  {/* Contenu */}
                  <div className="p-2 sm:p-3 md:p-4">
                    <h3 
                      className="font-semibold text-gray-900 mb-1 line-clamp-2 text-xs sm:text-sm cursor-pointer hover:text-brand-red"
                      onClick={() => setSelectedProduct(product)}
                    >
                      {product.name}
                    </h3>
                    
                    {/* Prix */}
                    <div className="mb-2">
                      {product.sale_price ? (
                        <div>
                          <span className="text-sm sm:text-base font-bold text-brand-red">
                            {product.sale_price.toLocaleString()} GNF
                          </span>
                          <span className="text-xs text-gray-500 line-through ml-2 hidden xs:inline">
                            {product.price.toLocaleString()}
                          </span>
                        </div>
                      ) : (
                        <span className="text-sm sm:text-base font-bold text-gray-900">
                          {product.price.toLocaleString()} GNF
                        </span>
                      )}
                    </div>

                    {/* Stock */}
                    {product.stock === 0 ? (
                      <div className="text-brand-red text-xs font-medium mb-2">Rupture de stock</div>
                    ) : product.stock < 5 ? (
                      <div className="text-brand-red text-xs font-medium mb-2">Plus que {product.stock}</div>
                    ) : (
                      <div className="text-brand-blue text-xs font-medium mb-2">En stock</div>
                    )}

                    {/* Barre Stock */}
                    <div className="w-full bg-gray-200 rounded-lg h-1.5 mb-2 overflow-hidden">
                      <div
                        className={`h-full ${product.stock === 0 ? 'bg-brand-red' : product.stock < 5 ? 'bg-orange-500' : 'bg-brand-blue'}`}
                        style={{ width: `${Math.min((product.stock / 100) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Bouton */}
                  <div className="px-2 sm:px-3 md:px-4 pb-2 sm:pb-3 md:pb-4">
                    <button
                      onClick={() => setSelectedProduct(product)}
                      disabled={product.stock === 0}
                      className="w-full bg-brand-red text-white py-1.5 sm:py-2 rounded-lg font-semibold text-xs sm:text-sm hover:bg-brand-blue transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-1"
                    >
                      <ShoppingCart className="w-3 h-3" />
                      <span className="hidden sm:inline">Ajouter</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal Détail Produit */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* En-tête */}
            <div className="flex justify-between items-center p-4 sm:p-6 border-b border-gray-200 sticky top-0 bg-white">
              <h2 className="text-xl sm:text-2xl font-bold text-brand-blue">{selectedProduct.name}</h2>
              <button
                onClick={() => setSelectedProduct(null)}
                className="p-1 hover:bg-gray-100 rounded-lg transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Contenu */}
            <div className="p-4 sm:p-6 space-y-6">
              {/* Image */}
              <div className="flex justify-center">
                <img
                  src={selectedProduct.images?.[0] || ''}
                  alt={selectedProduct.name}
                  className="w-full sm:w-96 h-64 sm:h-96 object-cover rounded-lg"
                />
              </div>

              {/* Prix et Stock */}
              <div className="space-y-3">
                <div className="flex items-baseline gap-2">
                  {selectedProduct.sale_price ? (
                    <>
                      <span className="text-3xl font-bold text-brand-red">
                        {selectedProduct.sale_price.toLocaleString()} GNF
                      </span>
                      <span className="text-lg text-gray-500 line-through">
                        {selectedProduct.price.toLocaleString()} GNF
                      </span>
                    </>
                  ) : (
                    <span className="text-3xl font-bold text-gray-900">
                      {selectedProduct.price.toLocaleString()} GNF
                    </span>
                  )}
                </div>

                {/* Stock */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Disponibilité:</span>
                    <span className={selectedProduct.stock === 0 ? 'text-brand-red font-semibold' : selectedProduct.stock < 5 ? 'text-brand-red font-semibold' : 'text-brand-blue font-semibold'}>
                      {selectedProduct.stock === 0 ? 'Rupture de stock' : `${selectedProduct.stock} en stock`}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-lg h-2 overflow-hidden">
                    <div
                      className={`h-full ${selectedProduct.stock === 0 ? 'bg-brand-red' : selectedProduct.stock < 5 ? 'bg-orange-500' : 'bg-brand-blue'}`}
                      style={{ width: `${Math.min((selectedProduct.stock / 100) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Description */}
              {selectedProduct.description && (
                <div>
                  <h3 className="font-semibold text-brand-blue mb-2">Description</h3>
                  <p className="text-gray-700">{selectedProduct.description}</p>
                </div>
              )}

              {/* Avantages */}
              {selectedProduct.benefits && (
                <div>
                  <h3 className="font-semibold text-brand-blue mb-2">✓ Avantages</h3>
                  <p className="text-gray-700">{selectedProduct.benefits}</p>
                </div>
              )}

              {/* Contre-indications */}
              {selectedProduct.contraindications && (
                <div>
                  <h3 className="font-semibold text-brand-blue mb-2">⚠️ Important</h3>
                  <p className="text-gray-700">{selectedProduct.contraindications}</p>
                </div>
              )}

              {/* Quantité et Panier */}
              <div className="space-y-3 pt-4 border-t border-gray-200">
                <div className="flex items-center gap-4">
                  <label className="text-sm font-semibold text-gray-700">Quantité:</label>
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-2 hover:bg-gray-100 transition"
                    >
                      −
                    </button>
                    <span className="px-4 font-semibold">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-2 hover:bg-gray-100 transition"
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => handleAddToCart(selectedProduct.id, quantity)}
                  disabled={selectedProduct.stock === 0}
                  className="w-full bg-brand-red text-white py-3 rounded-lg font-semibold text-base hover:bg-brand-blue transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Ajouter au panier ({quantity} × {(selectedProduct.sale_price || selectedProduct.price).toLocaleString()} GNF)
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
