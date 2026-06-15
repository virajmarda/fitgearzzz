// src/pages/Profile.js
// Shows customer profile, orders and addresses via Shopify Storefront API.
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { STOREFRONT_API_URL, STOREFRONT_ACCESS_TOKEN } from '../config/shopify';
import { Package, MapPin } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';

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

const CUSTOMER_PROFILE_QUERY = `
  query CustomerProfile($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      id
      email
      firstName
      lastName
      phone
      createdAt
      orders(first: 50, sortKey: PROCESSED_AT, reverse: true) {
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
      addresses(first: 10) {
        edges {
          node {
            id
            firstName
            lastName
            company
            address1
            address2
            city
            province
            zip
            country
            phone
          }
        }
      }
      defaultAddress {
        id
      }
    }
  }
`;

const getStatusColor = (status) => {
  const map = {
    FULFILLED:   'text-green-500',
    UNFULFILLED: 'text-orange-500',
    IN_PROGRESS: 'text-blue-500',
    PENDING:     'text-yellow-500',
    CANCELED:    'text-red-500',
  };
  return map[status] || 'text-zinc-400';
};

const Profile = () => {
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const [orders, setOrders]       = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [defaultAddressId, setDefaultAddressId] = useState(null);
  const [loading, setLoading]     = useState(true);
  const activeTab = searchParams.get('tab') || 'orders';

  useEffect(() => {
    if (!user) { setLoading(false); return; }

    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('customerAccessToken');
        if (!token) throw new Error('No access token');

        const data = await storefrontFetch(CUSTOMER_PROFILE_QUERY, {
          customerAccessToken: token,
        });

        const customer = data?.customer;
        if (!customer) throw new Error('Customer not found');

        // Map orders
        const mappedOrders = (customer.orders.edges ?? []).map(({ node }) => ({
          id:          node.id,
          orderNumber: node.orderNumber,
          date:        node.processedAt,
          status:      node.fulfillmentStatus || node.financialStatus || 'PENDING',
          total:       parseFloat(node.totalPriceV2.amount),
          items: node.lineItems.edges.map(({ node: li }) => ({
            name:    li.title,
            qty:     li.quantity,
            price:   parseFloat(li.variant?.priceV2?.amount ?? 0),
            image:   li.variant?.image?.url ?? null,
          })),
        }));

        // Map addresses
        const mappedAddresses = (customer.addresses.edges ?? []).map(({ node }) => ({
          id:         node.id,
          name:       `${node.firstName ?? ''} ${node.lastName ?? ''}`.trim(),
          company:    node.company,
          address1:   node.address1,
          address2:   node.address2,
          city:       node.city,
          province:   node.province,
          zip:        node.zip,
          country:    node.country,
          phone:      node.phone,
        }));

        setOrders(mappedOrders);
        setAddresses(mappedAddresses);
        setDefaultAddressId(customer.defaultAddress?.id ?? null);
      } catch (err) {
        console.error('Error fetching profile:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

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
        <h1 className="font-oswald text-4xl sm:text-5xl font-bold text-white mb-8 tracking-tight uppercase"
          data-testid="profile-title">
          My Account
        </h1>

        {/* Profile Info Card */}
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
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={(val) => setSearchParams({ tab: val })} className="space-y-6">
          <TabsList className="bg-zinc-800 border-zinc-700">
            <TabsTrigger value="orders" className="data-[state=active]:bg-orange-500" data-testid="orders-tab">
              <Package className="w-4 h-4 mr-2" /> Orders
            </TabsTrigger>
            <TabsTrigger value="addresses" className="data-[state=active]:bg-orange-500" data-testid="addresses-tab">
              <MapPin className="w-4 h-4 mr-2" /> Addresses
            </TabsTrigger>
          </TabsList>

          {/* Orders Tab */}
          <TabsContent value="orders">
            {loading ? (
              <div className="text-center py-12">
                <p className="text-zinc-400">Loading orders...</p>
              </div>
            ) : orders.length === 0 ? (
              <div className="text-center py-12 glass-card rounded-3xl" data-testid="no-orders-message">
                <Package className="w-16 h-16 text-zinc-600 mx-auto mb-4" />
                <p className="text-zinc-400 mb-4">No orders yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order.id} className="glass-card rounded-3xl p-6 shadow-lg"
                    data-testid={`order-${order.id}`}>
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <p className="text-zinc-400 text-sm">Order</p>
                        <p className="text-white font-mono text-sm" data-testid="order-id">#{order.orderNumber}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-zinc-400 text-sm">Status</p>
                        <p className={`font-semibold uppercase ${getStatusColor(order.status)}`}
                          data-testid="order-status">
                          {order.status.replace(/_/g, ' ')}
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-zinc-400 text-sm">Order Date</p>
                        <p className="text-white">{new Date(order.date).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-zinc-400 text-sm">Total Amount</p>
                        <p className="text-orange-500 font-bold text-xl" data-testid="order-amount">
                          &#8377;{order.total.toFixed(2)}
                        </p>
                      </div>
                    </div>
                    <div className="border-t border-zinc-700 pt-4">
                      <p className="text-zinc-400 text-sm mb-2">Items</p>
                      <div className="space-y-2">
                        {order.items.map((item, i) => (
                          <div key={i} className="flex items-center space-x-3"
                            data-testid={`order-item-${i}`}>
                            {item.image && (
                              <img src={item.image} alt={item.name}
                                className="w-12 h-12 object-cover rounded-2xl" />
                            )}
                            <div className="flex-1">
                              <p className="text-white text-sm">{item.name}</p>
                              <p className="text-zinc-400 text-xs">
                                &#8377;{item.price.toFixed(2)} x {item.qty}
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

          {/* Addresses Tab */}
          <TabsContent value="addresses">
            {addresses.length === 0 ? (
              <div className="text-center py-12 glass-card rounded-2xl" data-testid="no-addresses-message">
                <MapPin className="w-16 h-16 text-zinc-600 mx-auto mb-4" />
                <p className="text-zinc-400">No saved addresses</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {addresses.map((addr) => (
                  <div key={addr.id} className="glass-card rounded-2xl p-6"
                    data-testid={`address-${addr.id}`}>
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-oswald text-lg font-bold text-white">{addr.name}</h3>
                      {addr.id === defaultAddressId && (
                        <span className="text-xs bg-orange-500 text-white px-2 py-1 rounded-2xl">
                          DEFAULT
                        </span>
                      )}
                    </div>
                    {addr.phone && <p className="text-zinc-300 text-sm">{addr.phone}</p>}
                    <p className="text-zinc-300 text-sm mt-2">
                      {addr.address1}{addr.address2 ? `, ${addr.address2}` : ''}
                    </p>
                    <p className="text-zinc-300 text-sm">
                      {addr.city}, {addr.province} {addr.zip}
                    </p>
                    <p className="text-zinc-300 text-sm">{addr.country}</p>
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
