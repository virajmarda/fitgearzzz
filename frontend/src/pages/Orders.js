import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Orders = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // TODO: Replace with real API call to your backend / Shopify
        // Example placeholder:
        // const res = await fetch('/api/orders', { credentials: 'include' });
        // const data = await res.json();
        // setOrders(data.orders);

        setOrders([]); // keep empty for now
      } catch (err) {
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

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center text-white">
        <h1 className="text-2xl font-bold mb-4">Your Orders</h1>
        <p>Please log in to view your orders.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center text-white">
        <p>Loading your orders...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center text-red-400">
        <p>{error}</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center text-white">
        <h1 className="text-2xl font-bold mb-4">Your Orders</h1>
        <p>You do not have any orders yet.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 text-white">
      <h1 className="text-2xl font-bold mb-6">Your Orders</h1>
      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="border border-zinc-800 rounded-lg p-4 bg-zinc-900"
          >
            <div className="flex justify-between mb-2">
              <span className="font-semibold">Order #{order.name}</span>
              <span className="text-sm text-zinc-400">
                {new Date(order.createdAt).toLocaleString()}
              </span>
            </div>
            <div className="text-sm text-zinc-300">
              {order.lineItems?.length || 0} items • {order.totalPrice}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
