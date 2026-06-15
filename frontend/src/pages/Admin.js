// src/pages/Admin.js
// Admin dashboard powered by Shopify Storefront API for reads.
// All write operations (create/edit/delete products, orders, discounts)
// are delegated to the Shopify Admin Dashboard via direct deeplinks,
// since those require the Admin API (server-side / private key).
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Package, ShoppingBag, Percent, ExternalLink } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Button } from '../components/ui/button';
import { toast } from 'sonner';
import { fetchProducts } from '../services/shopifyService';
import { SHOPIFY_STORE_DOMAIN } from '../config/shopify';

// Build Shopify Admin base URL from the store domain
const SHOPIFY_ADMIN_URL = `https://${SHOPIFY_STORE_DOMAIN}/admin`;

const Admin = () => {
  const { user } = useAuth();
  const navigate  = useNavigate();
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts]   = useState([]);
  const [loading, setLoading]     = useState(true);

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      toast.error('Admin access required');
      navigate('/');
      return;
    }
    loadProducts();
  }, [user, navigate]);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const prods = await fetchProducts();
      setProducts(prods);
    } catch (err) {
      console.error('Failed to load products:', err);
      toast.error('Failed to load products from Shopify');
    } finally {
      setLoading(false);
    }
  };

  if (!user || user.role !== 'admin') return null;

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <h1 className="font-oswald text-4xl sm:text-5xl font-bold text-white tracking-tight uppercase"
            data-testid="admin-title">
            Admin Dashboard
          </h1>
          <a
            href={SHOPIFY_ADMIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-oswald uppercase tracking-wider rounded-full px-6 py-2 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            Open Shopify Admin
          </a>
        </div>

        {/* Info Banner */}
        <div className="bg-zinc-900 border border-orange-500/30 rounded-2xl p-4 mb-8 text-sm text-zinc-300">
          <strong className="text-orange-400">Note:</strong> Product creation, editing, deletion, order management and discount codes are now fully managed in your{' '}
          <a href={SHOPIFY_ADMIN_URL} target="_blank" rel="noopener noreferrer"
            className="underline text-orange-400 hover:text-orange-300">
            Shopify Admin Dashboard
          </a>. This panel provides a read-only overview powered by the Storefront API.
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="glass-card rounded-3xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-zinc-400 text-sm">Total Products</p>
                <p className="text-3xl font-oswald font-bold text-white" data-testid="total-products">
                  {loading ? '...' : products.length}
                </p>
              </div>
              <ShoppingBag className="w-12 h-12 text-orange-500" />
            </div>
          </div>
          <div className="glass-card rounded-3xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-zinc-400 text-sm">Orders & Discounts</p>
                <p className="text-sm text-zinc-400 mt-1">Managed in Shopify Admin</p>
              </div>
              <Package className="w-12 h-12 text-blue-500" />
            </div>
          </div>
          <div className="glass-card rounded-3xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-zinc-400 text-sm">Discount Codes</p>
                <p className="text-sm text-zinc-400 mt-1">Managed in Shopify Admin</p>
              </div>
              <Percent className="w-12 h-12 text-orange-500" />
            </div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-zinc-800 border-zinc-700">
            <TabsTrigger value="products" className="data-[state=active]:bg-orange-500"
              data-testid="products-tab">Products</TabsTrigger>
            <TabsTrigger value="orders" className="data-[state=active]:bg-orange-500"
              data-testid="orders-tab">Orders</TabsTrigger>
            <TabsTrigger value="discounts" className="data-[state=active]:bg-orange-500"
              data-testid="discounts-tab">Discount Codes</TabsTrigger>
          </TabsList>

          {/* Products Tab */}
          <TabsContent value="products">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-oswald text-2xl font-bold text-white uppercase">Products</h2>
              <a
                href={`${SHOPIFY_ADMIN_URL}/products/new`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-oswald uppercase tracking-wider rounded-full px-6 py-2 transition-colors text-sm"
                data-testid="add-product-button"
              >
                <ExternalLink className="w-4 h-4" /> Add in Shopify
              </a>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <p className="text-zinc-400">Loading products...</p>
              </div>
            ) : (
              <div className="glass-card rounded-3xl overflow-hidden shadow-lg">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-zinc-800 border-b border-zinc-700">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-oswald text-white uppercase">Product</th>
                        <th className="px-4 py-3 text-left text-sm font-oswald text-white uppercase">Price</th>
                        <th className="px-4 py-3 text-left text-sm font-oswald text-white uppercase">Variants</th>
                        <th className="px-4 py-3 text-left text-sm font-oswald text-white uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800">
                      {products.map((product) => (
                        <tr key={product.id} data-testid={`product-row-${product.id}`}>
                          <td className="px-4 py-3">
                            <div className="flex items-center space-x-3">
                              {product.images?.[0] && (
                                <img src={product.images[0]} alt={product.title}
                                  className="w-12 h-12 object-cover rounded-2xl" />
                              )}
                              <div>
                                <p className="text-white font-semibold text-sm">{product.title}</p>
                                <p className="text-zinc-400 text-xs">{product.handle}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-orange-500 font-bold">
                            {product.priceRange
                              ? `\u20B9${parseFloat(product.priceRange.minVariantPrice?.amount ?? product.price ?? 0).toFixed(2)}`
                              : `\u20B9${parseFloat(product.price ?? 0).toFixed(2)}`}
                          </td>
                          <td className="px-4 py-3 text-zinc-300">
                            {product.variants?.length ?? 1}
                          </td>
                          <td className="px-4 py-3">
                            <a
                              href={`${SHOPIFY_ADMIN_URL}/products/${product.id?.split('/').pop() ?? ''}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-400 hover:text-blue-300 flex items-center gap-1 text-sm"
                              data-testid={`edit-product-${product.id}`}
                            >
                              <ExternalLink className="w-3 h-3" /> Edit
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-oswald text-2xl font-bold text-white uppercase">Orders</h2>
              <a
                href={`${SHOPIFY_ADMIN_URL}/orders`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-oswald uppercase tracking-wider rounded-full px-6 py-2 transition-colors text-sm"
                data-testid="manage-orders-button"
              >
                <ExternalLink className="w-4 h-4" /> Manage in Shopify
              </a>
            </div>
            <div className="glass-card rounded-3xl p-8 text-center">
              <Package className="w-16 h-16 text-blue-500 mx-auto mb-4" />
              <p className="text-white font-oswald text-xl mb-2">Order Management</p>
              <p className="text-zinc-400 mb-6">All order details, fulfilment, and status updates are managed directly in your Shopify Admin dashboard.</p>
              <a
                href={`${SHOPIFY_ADMIN_URL}/orders`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8 py-3 font-oswald uppercase transition-colors"
              >
                <ExternalLink className="w-4 h-4" /> Open Orders in Shopify Admin
              </a>
            </div>
          </TabsContent>

          {/* Discounts Tab */}
          <TabsContent value="discounts">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-oswald text-2xl font-bold text-white uppercase">Discount Codes</h2>
              <a
                href={`${SHOPIFY_ADMIN_URL}/discounts/new`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-oswald uppercase tracking-wider rounded-full px-6 py-2 transition-colors text-sm"
                data-testid="add-discount-button"
              >
                <ExternalLink className="w-4 h-4" /> Create in Shopify
              </a>
            </div>
            <div className="glass-card rounded-3xl p-8 text-center">
              <Percent className="w-16 h-16 text-orange-500 mx-auto mb-4" />
              <p className="text-white font-oswald text-xl mb-2">Discount Management</p>
              <p className="text-zinc-400 mb-6">Create and manage discount codes, automatic discounts, and promotions in your Shopify Admin.</p>
              <a
                href={`${SHOPIFY_ADMIN_URL}/discounts`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white rounded-full px-8 py-3 font-oswald uppercase transition-colors"
              >
                <ExternalLink className="w-4 h-4" /> Open Discounts in Shopify Admin
              </a>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
