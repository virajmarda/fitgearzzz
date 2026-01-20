import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import { Package, Truck, CheckCircle, XCircle, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const Orders = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.get('/orders');
        setOrders(response.data);
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError('Failed to load orders');
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchOrders();
    } else {
      setLoading(false);
    }
  }, [user]);

  const getStatusColor = (status) => {
    const statusColors = {
      'FULFILLED': 'text-green-400',
      'IN_PROGRESS': 'text-yellow-400',
      'PENDING': 'text-orange-400',
      'UNFULFILLED': 'text-orange-400',
      'CANCELED': 'text-red-400',
    };
    return statusColors[status] || 'text-zinc-400';
  };

  const getStatusIcon = (status) => {
    const icons = {
      'FULFILLED': <CheckCircle className="w-5 h-5" />,
      'IN_PROGRESS': <Truck className="w-5 h-5" />,
      'PENDING': <Clock className="w-5 h-5" />,
      'UNFULFILLED': <Package className="w-5 h-5" />,
      'CANCELED': <XCircle className="w-5 h-5" />,
    };
    return icons[status] || <Package className="w-5 h-5" />;
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-zinc-950 pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h1 className="text-3xl font-bold mb-4">Your Orders</h1>
          <p className="text-zinc-400">Please log in to view your orders.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center text-white">
          <p className="text-zinc-400">Loading your orders...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-zinc-950 pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center text-red-400">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-zinc-950 pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center text-white">
          <Package className="w-16 h-16 mx-auto mb-4 text-zinc-600" />
          <h1 className="text-3xl font-bold mb-4">Your Orders</h1>
          <p className="text-zinc-400">You haven't placed any orders yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-white">Your Orders</h1>
        <div className="space-y-6">
          {orders.map((order, index) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">
                    Order {order.orderNumber}
                  </h3>
                  <p className="text-sm text-zinc-400">
                    {new Date(order.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
                <div className={`flex items-center gap-2 ${getStatusColor(order.status)}`}>
                  {getStatusIcon(order.status)}
                  <span className="font-semibold capitalize">
                    {order.status.toLowerCase().replace('_', ' ')}
                  </span>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                {order.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex items-center gap-4">
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg bg-zinc-800"
                      />
                    )}
                    <div className="flex-1">
                      <p className="text-white font-medium">{item.name}</p>
                      <p className="text-sm text-zinc-400">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-white font-semibold">₹{item.price.toFixed(2)}</p>
                  </div>
                ))}
              </div>

              <div className="border-t border-zinc-800 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-zinc-400">Total</span>
                  <span className="text-xl font-bold text-white">₹{order.total.toFixed(2)}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Orders;
