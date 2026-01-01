import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { toast } from 'sonner';
import api from '../utils/api';

const Checkout = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { cart, products, getCartTotal, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [discountCode, setDiscountCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [addressData, setAddressData] = useState({
    full_name: user?.name || '',
    phone: '',
    address_line1: '',
    address_line2: '',
    city: '',
    state: '',
    zip_code: '',
    country: 'USA',
  });

  useEffect(() => {
    if (!user) {
      toast.error('Please login to checkout');
      navigate('/products');
      return;
    }

    if (cart.length === 0) {
      toast.error('Your cart is empty');
      navigate('/products');
    }
  }, [user, cart, navigate]);

  const subtotal = getCartTotal();
  const total = subtotal - discount;

  const handleApplyDiscount = async () => {
    if (!discountCode.trim()) {
      toast.error('Please enter a discount code');
      return;
    }

    try {
      const response = await api.post('/discount/apply', {
        code: discountCode,
        subtotal,
      });

      if (response.data.valid) {
        setDiscount(response.data.discount);
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error('Invalid discount code');
    }
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const orderItems = cart.map((item) => {
        const product = products[item.product_id];
        return {
          product_id: product.id,
          product_name: product.name,
          product_image: product.images[0],
          price: product.price,
          quantity: item.quantity,
        };
      });

      const orderData = {
        items: orderItems,
        subtotal,
        discount,
        total,
        shipping_address: {
          id: '',
          user_id: user.id,
          ...addressData,
          is_default: false,
        },
      };

      const response = await api.post('/orders', orderData);
      toast.success('Order placed successfully!');
      await clearCart();
      navigate(`/profile?tab=orders`);
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error('Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="font-oswald text-4xl sm:text-5xl font-bold text-white mb-8 tracking-tight uppercase" data-testid="checkout-title">
          Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <form onSubmit={handlePlaceOrder} className="space-y-6">
              <div className="glass-card rounded-3xl p-6 shadow-lg">
                <h2 className="font-oswald text-2xl font-bold text-white mb-6 uppercase">Shipping Address</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <Label htmlFor="full_name" className="text-zinc-300">Full Name</Label>
                    <Input
                      id="full_name"
                      value={addressData.full_name}
                      onChange={(e) => setAddressData({ ...addressData, full_name: e.target.value })}
                      className="bg-zinc-800/50 border-zinc-700 text-white focus:border-orange-500 rounded-2xl"
                      required
                      data-testid="full-name-input"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <Label htmlFor="phone" className="text-zinc-300">Phone</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={addressData.phone}
                      onChange={(e) => setAddressData({ ...addressData, phone: e.target.value })}
                      className="bg-zinc-800/50 border-zinc-700 text-white focus:border-orange-500 rounded-2xl"
                      required
                      data-testid="phone-input"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <Label htmlFor="address_line1" className="text-zinc-300">Address Line 1</Label>
                    <Input
                      id="address_line1"
                      value={addressData.address_line1}
                      onChange={(e) => setAddressData({ ...addressData, address_line1: e.target.value })}
                      className="bg-zinc-800/50 border-zinc-700 text-white focus:border-orange-500 rounded-2xl"
                      required
                      data-testid="address-line1-input"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <Label htmlFor="address_line2" className="text-zinc-300">Address Line 2 (Optional)</Label>
                    <Input
                      id="address_line2"
                      value={addressData.address_line2}
                      onChange={(e) => setAddressData({ ...addressData, address_line2: e.target.value })}
                      className="bg-zinc-800/50 border-zinc-700 text-white focus:border-orange-500 rounded-2xl"
                      data-testid="address-line2-input"
                    />
                  </div>

                  <div>
                    <Label htmlFor="city" className="text-zinc-300">City</Label>
                    <Input
                      id="city"
                      value={addressData.city}
                      onChange={(e) => setAddressData({ ...addressData, city: e.target.value })}
                      className="bg-zinc-800/50 border-zinc-700 text-white focus:border-orange-500 rounded-2xl"
                      required
                      data-testid="city-input"
                    />
                  </div>

                  <div>
                    <Label htmlFor="state" className="text-zinc-300">State</Label>
                    <Input
                      id="state"
                      value={addressData.state}
                      onChange={(e) => setAddressData({ ...addressData, state: e.target.value })}
                      className="bg-zinc-800/50 border-zinc-700 text-white focus:border-orange-500 rounded-2xl"
                      required
                      data-testid="state-input"
                    />
                  </div>

                  <div>
                    <Label htmlFor="zip_code" className="text-zinc-300">ZIP Code</Label>
                    <Input
                      id="zip_code"
                      value={addressData.zip_code}
                      onChange={(e) => setAddressData({ ...addressData, zip_code: e.target.value })}
                      className="bg-zinc-800/50 border-zinc-700 text-white focus:border-orange-500 rounded-2xl"
                      required
                      data-testid="zip-code-input"
                    />
                  </div>

                  <div>
                    <Label htmlFor="country" className="text-zinc-300">Country</Label>
                    <Input
                      id="country"
                      value={addressData.country}
                      onChange={(e) => setAddressData({ ...addressData, country: e.target.value })}
                      className="bg-zinc-800/50 border-zinc-700 text-white focus:border-orange-500 rounded-2xl"
                      required
                      data-testid="country-input"
                    />
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-oswald text-lg uppercase tracking-wider rounded-full py-7 shadow-lg hover:shadow-orange-500/30"
                data-testid="place-order-button"
              >
                {loading ? 'Processing...' : 'Place Order'}
              </Button>
            </form>
          </div>

          <div>
            <div className="glass-card rounded-3xl p-6 sticky top-24 shadow-xl">
              <h2 className="font-oswald text-2xl font-bold text-white mb-6 uppercase">Order Summary</h2>

              <div className="space-y-4 mb-6">
                {cart.map((item) => {
                  const product = products[item.product_id];
                  if (!product) return null;

                  return (
                    <div key={item.id} className="flex space-x-3" data-testid={`order-summary-item-${item.id}`}>
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded-2xl"
                      />
                      <div className="flex-1">
                        <h3 className="text-white text-sm font-semibold">{product.name}</h3>
                        <p className="text-zinc-400 text-sm">
                          ${product.price.toFixed(2)} x {item.quantity}
                        </p>
                      </div>
                      <span className="text-orange-500 font-bold">
                        ${(product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="border-t border-zinc-700 pt-4 mb-4">
                <div className="flex items-center space-x-2 mb-4">
                  <Input
                    type="text"
                    placeholder="Discount code"
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value)}
                    className="bg-zinc-800/50 border-zinc-700 text-white focus:border-orange-500 rounded-2xl"
                    data-testid="discount-code-input"
                  />
                  <Button
                    type="button"
                    onClick={handleApplyDiscount}
                    variant="outline"
                    className="border-zinc-700 text-white hover:border-orange-500 hover:text-orange-500 bg-transparent rounded-full whitespace-nowrap px-6"
                    data-testid="apply-discount-button"
                  >
                    Apply
                  </Button>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-zinc-300">
                    <span>Subtotal:</span>
                    <span data-testid="order-subtotal">${subtotal.toFixed(2)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-500">
                      <span>Discount:</span>
                      <span data-testid="order-discount">-${discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-xl font-bold text-white pt-2 border-t border-zinc-700">
                    <span className="font-oswald">Total:</span>
                    <span className="text-orange-500" data-testid="order-total">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="text-sm text-zinc-400 bg-zinc-800/50 p-4 rounded-2xl shadow-md">
                <p className="mb-2">💳 Payment Method: Cash on Delivery</p>
                <p>🚚 Free shipping on orders over $100</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
