import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Package, MapPin } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import api from '../utils/api';

const Profile = () => {
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const [orders, setOrders] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const activeTab = searchParams.get('tab') || 'orders';

  useEffect(() => {
    if (user) {
      fetchOrders();
      fetchAddresses();
    }
  }, [user]);

  const fetchOrders = async () => {
    try {
      const response = await api.get('/orders');
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAddresses = async () => {
    try {
      const response = await api.get('/addresses');
      setAddresses(response.data);
    } catch (error) {
      console.error('Error fetching addresses:', error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'text-yellow-500';
      case 'processing':
        return 'text-blue-500';
      case 'shipped':
        return 'text-purple-500';
      case 'delivered':
        return 'text-green-500';
      case 'cancelled':
        return 'text-red-500';
      default:
        return 'text-zinc-400';
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <p className="text-zinc-400">Please login to view your profile</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="font-oswald text-4xl sm:text-5xl font-bold text-white mb-8 tracking-tight uppercase" data-testid="profile-title">
          My Account
        </h1>

        <div className="glass-card rounded-3xl p-6 mb-8 shadow-lg" data-testid="user-info-card">
          <h2 className="font-oswald text-2xl font-bold text-white mb-4 uppercase">Profile Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-zinc-400 text-sm">Name</p>
              <p className="text-white font-semibold" data-testid="user-name">{user.name}</p>
            </div>
            <div>
              <p className="text-zinc-400 text-sm">Email</p>
              <p className="text-white font-semibold" data-testid="user-email">{user.email}</p>
            </div>
            <div>
              <p className="text-zinc-400 text-sm">Role</p>
              <p className="text-white font-semibold capitalize" data-testid="user-role">{user.role}</p>
            </div>
            <div>
              <p className="text-zinc-400 text-sm">Member Since</p>
              <p className="text-white font-semibold">
                {new Date(user.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={(val) => setSearchParams({ tab: val })} className="space-y-6">
          <TabsList className="bg-zinc-800 border-zinc-700">
            <TabsTrigger value="orders" className="data-[state=active]:bg-orange-500" data-testid="orders-tab">
              <Package className="w-4 h-4 mr-2" />
              Orders
            </TabsTrigger>
            <TabsTrigger value="addresses" className="data-[state=active]:bg-orange-500" data-testid="addresses-tab">
              <MapPin className="w-4 h-4 mr-2" />
              Addresses
            </TabsTrigger>
          </TabsList>

          <TabsContent value="orders">
            {loading ? (
              <div className="text-center py-12">
                <p className="text-zinc-400">Loading orders...</p>
              </div>
            ) : orders.length === 0 ? (
              <div className="text-center py-12 glass-card rounded-2xl" data-testid="no-orders-message">
                <Package className="w-16 h-16 text-zinc-600 mx-auto mb-4" />
                <p className="text-zinc-400 mb-4">No orders yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order.id} className="glass-card rounded-2xl p-6" data-testid={`order-${order.id}`}>
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <p className="text-zinc-400 text-sm">Order ID</p>
                        <p className="text-white font-mono text-sm" data-testid="order-id">{order.id}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-zinc-400 text-sm">Status</p>
                        <p className={`font-semibold uppercase ${getStatusColor(order.status)}`} data-testid="order-status">
                          {order.status}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-zinc-400 text-sm">Order Date</p>
                        <p className="text-white">{new Date(order.created_at).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-zinc-400 text-sm">Total Amount</p>
                        <p className="text-orange-500 font-bold text-xl" data-testid="order-amount">${order.total.toFixed(2)}</p>
                      </div>
                    </div>

                    <div className="border-t border-zinc-700 pt-4">
                      <p className="text-zinc-400 text-sm mb-2">Items</p>
                      <div className="space-y-2">
                        {order.items.map((item, index) => (
                          <div key={index} className="flex items-center space-x-3" data-testid={`order-item-${index}`}>
                            <img
                              src={item.product_image}
                              alt={item.product_name}
                              className="w-12 h-12 object-cover rounded-2xl"
                            />
                            <div className="flex-1">
                              <p className="text-white text-sm">{item.product_name}</p>
                              <p className="text-zinc-400 text-xs">
                                ${item.price.toFixed(2)} x {item.quantity}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="addresses">
            {addresses.length === 0 ? (
              <div className="text-center py-12 glass-card rounded-2xl" data-testid="no-addresses-message">
                <MapPin className="w-16 h-16 text-zinc-600 mx-auto mb-4" />
                <p className="text-zinc-400">No saved addresses</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {addresses.map((address) => (
                  <div key={address.id} className="glass-card rounded-2xl p-6" data-testid={`address-${address.id}`}>
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-oswald text-lg font-bold text-white">{address.full_name}</h3>
                      {address.is_default && (
                        <span className="text-xs bg-orange-500 text-white px-2 py-1 rounded-2xl">
                          DEFAULT
                        </span>
                      )}
                    </div>
                    <p className="text-zinc-300 text-sm">{address.phone}</p>
                    <p className="text-zinc-300 text-sm mt-2">
                      {address.address_line1}
                      {address.address_line2 && `, ${address.address_line2}`}
                    </p>
                    <p className="text-zinc-300 text-sm">
                      {address.city}, {address.state} {address.zip_code}
                    </p>
                    <p className="text-zinc-300 text-sm">{address.country}</p>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
