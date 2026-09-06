import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X, Search } from 'lucide-react';
import { assetUrl } from '../../lib/assetUrl';
import { productsService } from '../../lib/dataService';
import type { Product } from '../../lib/dataService';
import ImageUpload from './ImageUpload';

export default function ProductManager() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await productsService.getAllProducts();
      setProducts(data);
    } catch (error) {
      console.error('Erreur lors du chargement des produits:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (productId: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce produit?')) {
      await productsService.deleteProduct(productId);
      setProducts(prev => prev.filter(p => p.id !== productId));
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleAdd = () => {
    setEditingProduct(null);
    setShowForm(true);
  };

  const handleSubmit = async (formData: Product) => {
    const product: Product = editingProduct
      ? formData
      : { ...formData, id: `prod-${Date.now()}`, slug: formData.name.toLowerCase().replace(/\s+/g, '-') };

    await productsService.saveProduct(product);

    if (editingProduct) {
      setProducts(prev => prev.map(p => p.id === editingProduct.id ? product : p));
    } else {
      setProducts(prev => [...prev, product]);
    }
    setShowForm(false);
    setEditingProduct(null);
  };

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.description ?? '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return <div className="text-center py-8">Chargement...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Rechercher un produit..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-red focus:border-transparent"
          />
        </div>
        <button
          onClick={handleAdd}
          className="bg-brand-red hover:bg-brand-blue text-white px-6 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors whitespace-nowrap"
        >
          <Plus size={20} />
          Ajouter Produit
        </button>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-8 text-gray-500">Aucun produit trouvé</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Produit</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Prix</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Stock</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Catégorie</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Statut</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {product.images[0] && (
                          <img
                            src={assetUrl(product.images[0])}
                            alt={product.name}
                            className="w-10 h-10 rounded object-cover"
                          />
                        )}
                        <div>
                          <p className="font-medium text-gray-900">{product.name}</p>
                          <p className="text-sm text-gray-500">{(product.description ?? '').substring(0, 50)}...</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-medium">{product.price.toLocaleString()} GNF</span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-block px-3 py-1 rounded-lg text-sm font-medium ${
                          product.stock > 20
                            ? 'bg-brand-red/10 text-brand-red'
                            : product.stock > 0
                            ? 'bg-brand-blue/10 text-brand-blue'
                            : 'bg-brand-red/10 text-brand-red'
                        }`}
                      >
                        {product.stock} unités
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {product.category_id === 'cat-1' && 'Suppléments Alimentaires'}
                      {product.category_id === 'cat-2' && 'Appareils de Massage'}
                      {product.category_id === 'cat-3' && 'Bien-être & Soins Intime'}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-block px-3 py-1 rounded-lg text-sm font-medium ${
                          product.is_active
                            ? 'bg-brand-blue/10 text-brand-blue'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {product.is_active ? 'Actif' : 'Inactif'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleEdit(product)}
                          className="text-brand-blue hover:text-brand-red transition-colors"
                          title="Modifier"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="text-brand-red hover:text-brand-blue transition-colors"
                          title="Supprimer"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showForm && (
        <ProductForm
          product={editingProduct}
          onSubmit={handleSubmit}
          onClose={() => {
            setShowForm(false);
            setEditingProduct(null);
          }}
        />
      )}
    </div>
  );
}

function ProductForm({
  product,
  onSubmit,
  onClose,
}: {
  product: Product | null;
  onSubmit: (formData: Product) => void;
  onClose: () => void;
}) {
  const [formData, setFormData] = useState<Product>(
    product || {
      id: '',
      slug: '',
      name: '',
      description: null,
      price: 0,
      sale_price: null,
      stock: 0,
      images: [],
      category_id: 'cat-1',
      is_featured: false,
      is_active: true,
      benefits: null,
      contraindications: null,
    }
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
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
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold">
            {product ? 'Modifier Produit' : 'Ajouter Produit'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            title="Fermer"
            aria-label="Fermer le formulaire"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Image Upload */}
          <ImageUpload
            images={formData.images}
            onChange={(imgs) => setFormData({ ...formData, images: imgs })}
            multiple
            label="Images du produit"
            accentColor="emerald"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nom du Produit*
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-red"
                aria-label="Nom du Produit"
                placeholder="Nom du produit"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Catégorie*
              </label>
              <select
                name="category_id"
                value={formData.category_id}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-red"
                aria-label="Catégorie du produit"
              >
                <option value="cat-1">Suppléments Alimentaires</option>
                <option value="cat-2">Appareils de Massage</option>
                <option value="cat-3">Bien-être & Soins Intime</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description*
            </label>
            <textarea
              name="description"
              value={formData.description ?? ''}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-red"
              aria-label="Description du produit"
              placeholder="Description du produit"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Prix (GNF)*
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-red"
                aria-label="Prix en GNF"
                placeholder="0"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Stock*
              </label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-red"
                aria-label="Quantité en stock"
                placeholder="0"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bénéfices
            </label>
            <textarea
              name="benefits"
              value={formData.benefits ?? ''}
              onChange={handleChange}
              rows={2}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-red"
              aria-label="Bénéfices du produit"
              placeholder="Listez les bénéfices du produit"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contre-indications
            </label>
            <textarea
              name="contraindications"
              value={formData.contraindications ?? ''}
              onChange={handleChange}
              rows={2}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-red"
              aria-label="Contre-indications du produit"
              placeholder="Listez les contre-indications"
            />
          </div>

          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="is_featured"
                checked={formData.is_featured}
                onChange={handleChange}
                className="w-4 h-4"
              />
              <span className="text-sm text-gray-700">Produit en vedette</span>
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="is_active"
                checked={formData.is_active}
                onChange={handleChange}
                className="w-4 h-4"
              />
              <span className="text-sm text-gray-700">Actif</span>
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
              className="px-6 py-2 bg-brand-red text-white rounded-lg font-medium hover:bg-brand-blue"
            >
              {product ? 'Modifier' : 'Créer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
