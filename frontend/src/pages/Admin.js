import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Package, ShoppingBag, Percent, Plus, Edit, Trash2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { toast } from 'sonner';
import api from '../utils/api';

const Admin = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [discountCodes, setDiscountCodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showProductDialog, setShowProductDialog] = useState(false);
  const [showDiscountDialog, setShowDiscountDialog] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Gym Equipment',
    brand: '',
    images: [''],
    stock: '',
  });

  const [discountData, setDiscountData] = useState({
    code: '',
    discount_type: 'percentage',
    discount_value: '',
  });

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      toast.error('Admin access required');
      navigate('/');
      return;
    }

    fetchData();
  }, [user, navigate]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [productsRes, ordersRes, codesRes] = await Promise.all([
        api.get('/products'),
        api.get('/orders'),
        api.get('/discount'),
      ]);
      setProducts(productsRes.data);
      setOrders(ordersRes.data);
      setDiscountCodes(codesRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    try {
      const data = {
        ...productData,
        price: parseFloat(productData.price),
        stock: parseInt(productData.stock),
        images: productData.images.filter((img) => img.trim() !== ''),
      };

      if (editingProduct) {
        await api.put(`/products/${editingProduct.id}`, data);
        toast.success('Product updated!');
      } else {
        await api.post('/products', data);
        toast.success('Product created!');
      }

      setShowProductDialog(false);
      setEditingProduct(null);
      setProductData({
        name: '',
        description: '',
        price: '',
        category: 'Gym Equipment',
        brand: '',
        images: [''],
        stock: '',
      });
      fetchData();
    } catch (error) {
      toast.error('Failed to save product');
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;

    try {
      await api.delete(`/products/${id}`);
      toast.success('Product deleted!');
      fetchData();
    } catch (error) {
      toast.error('Failed to delete product');
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setProductData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      category: product.category,
      brand: product.brand,
      images: product.images,
      stock: product.stock.toString(),
    });
    setShowProductDialog(true);
  };

  const handleCreateDiscountCode = async (e) => {
    e.preventDefault();
    try {
      const data = {
        ...discountData,
        discount_value: parseFloat(discountData.discount_value),
      };
      await api.post('/discount', data);
      toast.success('Discount code created!');
      setShowDiscountDialog(false);
      setDiscountData({
        code: '',
        discount_type: 'percentage',
        discount_value: '',
      });
      fetchData();
    } catch (error) {
      toast.error('Failed to create discount code');
    }
  };

  const handleUpdateOrderStatus = async (orderId, status) => {
    try {
      await api.put(`/orders/${orderId}/status?status=${status}`);
      toast.success('Order status updated!');
      fetchData();
    } catch (error) {
      toast.error('Failed to update order status');
    }
  };

  if (!user || user.role !== 'admin') {
    return null;
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <h1 className="font-oswald text-4xl sm:text-5xl font-bold text-white mb-8 tracking-tight uppercase" data-testid="admin-title">
          Admin Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="glass-card rounded-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-zinc-400 text-sm">Total Products</p>
                <p className="text-3xl font-oswald font-bold text-white" data-testid="total-products">{products.length}</p>
              </div>
              <ShoppingBag className="w-12 h-12 text-orange-500" />
            </div>
          </div>
          <div className="glass-card rounded-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-zinc-400 text-sm">Total Orders</p>
                <p className="text-3xl font-oswald font-bold text-white" data-testid="total-orders">{orders.length}</p>
              </div>
              <Package className="w-12 h-12 text-blue-500" />
            </div>
          </div>
          <div className="glass-card rounded-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-zinc-400 text-sm">Discount Codes</p>
                <p className="text-3xl font-oswald font-bold text-white" data-testid="total-discount-codes">{discountCodes.length}</p>
              </div>
              <Percent className="w-12 h-12 text-orange-500" />
            </div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-zinc-800 border-zinc-700">
            <TabsTrigger value="products" className="data-[state=active]:bg-orange-500" data-testid="products-tab">
              Products
            </TabsTrigger>
            <TabsTrigger value="orders" className="data-[state=active]:bg-orange-500" data-testid="orders-tab">
              Orders
            </TabsTrigger>
            <TabsTrigger value="discounts" className="data-[state=active]:bg-orange-500" data-testid="discounts-tab">
              Discount Codes
            </TabsTrigger>
          </TabsList>

          <TabsContent value="products">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-oswald text-2xl font-bold text-white uppercase">Manage Products</h2>
              <Button
                onClick={() => {
                  setEditingProduct(null);
                  setProductData({
                    name: '',
                    description: '',
                    price: '',
                    category: 'Gym Equipment',
                    brand: '',
                    images: [''],
                    stock: '',
                  });
                  setShowProductDialog(true);
                }}
                className="bg-orange-500 hover:bg-orange-600 text-white font-oswald uppercase tracking-wider rounded-sm"
                data-testid="add-product-button"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Product
              </Button>
            </div>

            <div className="glass-card rounded-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-zinc-800 border-b border-zinc-700">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-oswald text-white uppercase">Product</th>
                      <th className="px-4 py-3 text-left text-sm font-oswald text-white uppercase">Category</th>
                      <th className="px-4 py-3 text-left text-sm font-oswald text-white uppercase">Price</th>
                      <th className="px-4 py-3 text-left text-sm font-oswald text-white uppercase">Stock</th>
                      <th className="px-4 py-3 text-left text-sm font-oswald text-white uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800">
                    {products.map((product) => (
                      <tr key={product.id} data-testid={`product-row-${product.id}`}>
                        <td className="px-4 py-3">
                          <div className="flex items-center space-x-3">
                            <img src={product.images[0]} alt={product.name} className="w-12 h-12 object-cover rounded-sm" />
                            <div>
                              <p className="text-white font-semibold text-sm">{product.name}</p>
                              <p className="text-zinc-400 text-xs">{product.brand}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-zinc-300">{product.category}</td>
                        <td className="px-4 py-3 text-orange-500 font-bold">${product.price.toFixed(2)}</td>
                        <td className="px-4 py-3">
                          <span className={`${product.stock > 10 ? 'text-green-500' : 'text-yellow-500'}`}>
                            {product.stock}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleEditProduct(product)}
                              className="text-blue-500 hover:text-blue-400"
                              data-testid={`edit-product-${product.id}`}
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(product.id)}
                              className="text-red-500 hover:text-red-400"
                              data-testid={`delete-product-${product.id}`}
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="orders">
            <h2 className="font-oswald text-2xl font-bold text-white uppercase mb-6">Manage Orders</h2>
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="glass-card rounded-sm p-6" data-testid={`order-row-${order.id}`}>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-zinc-400 text-sm">Order ID</p>
                      <p className="text-white font-mono text-sm">{order.id}</p>
                    </div>
                    <select
                      value={order.status}
                      onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                      className="bg-zinc-800 border border-zinc-700 text-white rounded-sm px-3 py-1 text-sm"
                      data-testid={`order-status-select-${order.id}`}
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-zinc-400 text-sm">Customer</p>
                      <p className="text-white">{order.shipping_address.full_name}</p>
                    </div>
                    <div>
                      <p className="text-zinc-400 text-sm">Date</p>
                      <p className="text-white">{new Date(order.created_at).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-zinc-400 text-sm">Total</p>
                      <p className="text-orange-500 font-bold">${order.total.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-zinc-400 text-sm">Items</p>
                      <p className="text-white">{order.items.length}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="discounts">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-oswald text-2xl font-bold text-white uppercase">Manage Discount Codes</h2>
              <Button
                onClick={() => setShowDiscountDialog(true)}
                className="bg-orange-500 hover:bg-orange-600 text-white font-oswald uppercase tracking-wider rounded-sm"
                data-testid="add-discount-button"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Code
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {discountCodes.map((code) => (
                <div key={code.id} className="glass-card rounded-sm p-6" data-testid={`discount-code-${code.id}`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-oswald text-xl font-bold text-orange-500">{code.code}</span>
                    <span className={`text-xs px-2 py-1 rounded-sm ${code.is_active ? 'bg-green-500' : 'bg-zinc-700'} text-white`}>
                      {code.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  <p className="text-zinc-300">
                    {code.discount_type === 'percentage'
                      ? `${code.discount_value}% off`
                      : `$${code.discount_value} off`}
                  </p>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Dialog open={showProductDialog} onOpenChange={setShowProductDialog}>
        <DialogContent className="bg-zinc-900 border-zinc-800 text-white rounded-sm max-w-2xl max-h-[80vh] overflow-y-auto" data-testid="product-dialog">
          <DialogHeader>
            <DialogTitle className="font-oswald text-2xl">
              {editingProduct ? 'Edit Product' : 'Add New Product'}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleCreateProduct} className="space-y-4">
            <div>
              <Label className="text-zinc-300">Name</Label>
              <Input
                value={productData.name}
                onChange={(e) => setProductData({ ...productData, name: e.target.value })}
                className="bg-zinc-800/50 border-zinc-700 text-white focus:border-orange-500 rounded-sm"
                required
                data-testid="product-name-input"
              />
            </div>
            <div>
              <Label className="text-zinc-300">Description</Label>
              <textarea
                value={productData.description}
                onChange={(e) => setProductData({ ...productData, description: e.target.value })}
                rows={3}
                className="w-full bg-zinc-800/50 border border-zinc-700 text-white rounded-sm px-3 py-2 focus:border-orange-500 focus:outline-none"
                required
                data-testid="product-description-input"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-zinc-300">Price</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={productData.price}
                  onChange={(e) => setProductData({ ...productData, price: e.target.value })}
                  className="bg-zinc-800/50 border-zinc-700 text-white focus:border-orange-500 rounded-sm"
                  required
                  data-testid="product-price-input"
                />
              </div>
              <div>
                <Label className="text-zinc-300">Stock</Label>
                <Input
                  type="number"
                  value={productData.stock}
                  onChange={(e) => setProductData({ ...productData, stock: e.target.value })}
                  className="bg-zinc-800/50 border-zinc-700 text-white focus:border-orange-500 rounded-sm"
                  required
                  data-testid="product-stock-input"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-zinc-300">Category</Label>
                <select
                  value={productData.category}
                  onChange={(e) => setProductData({ ...productData, category: e.target.value })}
                  className="w-full bg-zinc-800/50 border border-zinc-700 text-white rounded-sm px-3 py-2"
                  data-testid="product-category-input"
                >
                  <option>Gym Equipment</option>
                  <option>Supplements</option>
                  <option>Apparel</option>
                  <option>Accessories</option>
                </select>
              </div>
              <div>
                <Label className="text-zinc-300">Brand</Label>
                <Input
                  value={productData.brand}
                  onChange={(e) => setProductData({ ...productData, brand: e.target.value })}
                  className="bg-zinc-800/50 border-zinc-700 text-white focus:border-orange-500 rounded-sm"
                  required
                  data-testid="product-brand-input"
                />
              </div>
            </div>
            <div>
              <Label className="text-zinc-300">Image URLs (one per line)</Label>
              {productData.images.map((img, index) => (
                <Input
                  key={index}
                  value={img}
                  onChange={(e) => {
                    const newImages = [...productData.images];
                    newImages[index] = e.target.value;
                    setProductData({ ...productData, images: newImages });
                  }}
                  className="bg-zinc-800/50 border-zinc-700 text-white focus:border-orange-500 rounded-sm mb-2"
                  placeholder="https://example.com/image.jpg"
                  data-testid={`product-image-input-${index}`}
                />
              ))}
              <Button
                type="button"
                onClick={() => setProductData({ ...productData, images: [...productData.images, ''] })}
                variant="outline"
                className="border-zinc-700 text-white hover:border-orange-500 rounded-sm"
              >
                Add Another Image
              </Button>
            </div>
            <Button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-oswald uppercase tracking-wider rounded-sm"
              data-testid="save-product-button"
            >
              {editingProduct ? 'Update Product' : 'Create Product'}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={showDiscountDialog} onOpenChange={setShowDiscountDialog}>
        <DialogContent className="bg-zinc-900 border-zinc-800 text-white rounded-sm" data-testid="discount-dialog">
          <DialogHeader>
            <DialogTitle className="font-oswald text-2xl">Create Discount Code</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleCreateDiscountCode} className="space-y-4">
            <div>
              <Label className="text-zinc-300">Code</Label>
              <Input
                value={discountData.code}
                onChange={(e) => setDiscountData({ ...discountData, code: e.target.value.toUpperCase() })}
                className="bg-zinc-800/50 border-zinc-700 text-white focus:border-orange-500 rounded-sm"
                required
                data-testid="discount-code-input"
              />
            </div>
            <div>
              <Label className="text-zinc-300">Type</Label>
              <select
                value={discountData.discount_type}
                onChange={(e) => setDiscountData({ ...discountData, discount_type: e.target.value })}
                className="w-full bg-zinc-800/50 border border-zinc-700 text-white rounded-sm px-3 py-2"
                data-testid="discount-type-input"
              >
                <option value="percentage">Percentage</option>
                <option value="fixed">Fixed Amount</option>
              </select>
            </div>
            <div>
              <Label className="text-zinc-300">
                Value {discountData.discount_type === 'percentage' ? '(%)' : '($)'}
              </Label>
              <Input
                type="number"
                step="0.01"
                value={discountData.discount_value}
                onChange={(e) => setDiscountData({ ...discountData, discount_value: e.target.value })}
                className="bg-zinc-800/50 border-zinc-700 text-white focus:border-orange-500 rounded-sm"
                required
                data-testid="discount-value-input"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-oswald uppercase tracking-wider rounded-sm"
              data-testid="save-discount-button"
            >
              Create Code
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Admin;
