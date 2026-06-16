// src/pages/Orders.js
// Fetches customer orders directly from Shopify Storefront API.
// Requires customerAccessToken stored in localStorage by AuthContext.
import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { STOREFRONT_API_URL, STOREFRONT_ACCESS_TOKEN } from '../config/shopify';
import { Package, Truck, CheckCircle, XCircle, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

async function storefrontFetch(query, variables = {}) {
  const res = await fetch(STOREFRONT_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': STOREFRONT_ACCESS_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });
  if (!res.ok) throw new Error(`Storefront API error: ${res.status}`);
  const { data, errors } = await res.json();
  if (errors?.length) throw new Error(errors[0].message);
  return data;
}

const CUSTOMER_ORDERS_QUERY = `
  query CustomerOrders($customerAccessToken: String!, $first: Int!) {
    customer(customerAccessToken: $customerAccessToken) {
      orders(first: $first, sortKey: PROCESSED_AT, reverse: true) {
        edges {
          node {
            id
            orderNumber
            processedAt
            financialStatus
            fulfillmentStatus
            totalPriceV2 { amount currencyCode }
            lineItems(first: 20) {
              edges {
                node {
                  title
                  quantity
                  variant {
                    priceV2 { amount }
                    image { url altText }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

const STATUS_COLOURS = {
  FULFILLED:   'text-green-400',
  IN_PROGRESS: 'text-yellow-400',
  PENDING:     'text-orange-400',
  UNFULFILLED: 'text-orange-400',
  CANCELED:    'text-red-400',
};

const STATUS_ICON_MAP = {
  FULFILLED:   CheckCircle,
  IN_PROGRESS: Truck,
  PENDING:     Clock,
  UNFULFILLED: Package,
  CANCELED:    XCircle,
};

function getStatusColour(status) { return STATUS_COLOURS[status] || 'text-zinc-400'; }
function getStatusIcon(status) {
  const Icon = STATUS_ICON_MAP[status] || Package;
  return <Icon className="w-5 h-5" />;
}

const Orders = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [orders, setOrders]   = useState([]);
  const [error, setError]     = useState(null);

  useEffect(() => {
    if (!user) { setLoading(false); return; }

    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('customerAccessToken');
        if (!token) throw new Error('No access token');

        const data = await storefrontFetch(CUSTOMER_ORDERS_QUERY, {
          customerAccessToken: token,
          first: 50,
        });

        const edges = data?.customer?.orders?.edges ?? [];
        const mapped = edges.map(({ node }) => ({
          id:          node.id,
          orderNumber: node.orderNumber,
          date:        node.processedAt,
          status:      node.fulfillmentStatus || node.financialStatus || 'PENDING',
          total:       parseFloat(node.totalPriceV2.amount),
          items: node.lineItems.edges.map(({ node: li }) => ({
            name:     li.title,
            quantity: li.quantity,
            price:    parseFloat(li.variant?.priceV2?.amount ?? 0),
            image:    li.variant?.image?.url ?? null,
          })),
        }));

        setOrders(mapped);
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError('Failed to load orders. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  if (!user) return (
    <div className="min-h-screen bg-zinc-950 pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto text-center text-white">
        <h1 className="text-3xl font-bold mb-4">Your Orders</h1>
        <p className="text-zinc-400">Please log in to view your orders.</p>
      </div>
    </div>
  );

  if (loading) return (
    <div className="min-h-screen bg-zinc-950 pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-zinc-400">Loading your orders...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-zinc-950 pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto text-center text-red-400"><p>{error}</p></div>
    </div>
  );

  if (orders.length === 0) return (
    <div className="min-h-screen bg-zinc-950 pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto text-center text-white">
        <Package className="w-16 h-16 mx-auto mb-4 text-zinc-600" />
        <h1 className="text-3xl font-bold mb-4">Your Orders</h1>
        <p className="text-zinc-400">You haven't placed any orders yet.</p>
      </div>
    </div>
  );

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
                  <h3 className="text-lg font-bold text-white mb-1">Order #{order.orderNumber}</h3>
                  <p className="text-sm text-zinc-400">
                    {new Date(order.date).toLocaleDateString('en-US', {
                      year: 'numeric', month: 'long', day: 'numeric',
                    })}
                  </p>
                </div>
                <div className={`flex items-center gap-2 ${getStatusColour(order.status)}`}>
                  {getStatusIcon(order.status)}
                  <span className="font-semibold capitalize">
                    {order.status.toLowerCase().replace(/_/g, ' ')}
                  </span>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                {order.items.map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    {item.image && (
                      <img src={item.image} alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg bg-zinc-800" />
                    )}
                    <div className="flex-1">
                      <p className="text-white font-medium">{item.name}</p>
                      <p className="text-sm text-zinc-400">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-white font-semibold">&#8377;{item.price.toFixed(2)}</p>
                  </div>
                ))}
              </div>

              <div className="border-t border-zinc-800 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-zinc-400">Total</span>
                  <span className="text-xl font-bold text-white">&#8377;{order.total.toFixed(2)}</span>
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
