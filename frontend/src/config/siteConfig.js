// src/config/siteConfig.js
// Single source of truth for editable brand + content configuration.
// TODO(owner): replace placeholder contact/social values before launch.

export const COMMERCE_MODE = process.env.REACT_APP_COMMERCE_MODE || 'demo';

export const SITE = {
  name: 'Fitgearzzz',
  legalName: 'Fitgearzzz',
  positioning:
    'A modern fitness lifestyle brand for people who train with purpose and live actively outside the gym.',
  brandIdea:
    'Fitgearzzz equips the everyday athlete for training, recovery, and life beyond the gym.',
  currency: 'INR',
  currencySymbol: '\u20B9',
  // TODO(owner): replace with real business details
  email: 'hello@fitgearzzz.com',
  whatsapp: '', // e.g. '919000000000' (no + sign) — leave empty to hide float button
  phone: '',
  addressLine: 'India',
  social: {
    instagram: '#',
    youtube: '#',
    x: '#',
  },
};

// Five brand pillars drive navigation, collections and merchandising.
export const PILLARS = [
  {
    key: 'train',
    name: 'Train',
    label: 'TRAIN',
    number: '01',
    tagline: 'Strength, conditioning & mobility.',
    blurb:
      'Dumbbells, kettlebells, bars and bands for the work that compounds.',
  },
  {
    key: 'carry',
    name: 'Carry',
    label: 'CARRY',
    number: '02',
    tagline: 'Bags, bottles & daily essentials.',
    blurb: 'The gear that moves with you from home to gym to work.',
  },
  {
    key: 'recover',
    name: 'Recover',
    label: 'RECOVER',
    number: '03',
    tagline: 'Mobility, rollers & recovery.',
    blurb: 'Rollers, mats and recovery pieces that earn their space.',
  },
  {
    key: 'wear',
    name: 'Wear',
    label: 'WEAR',
    number: '04',
    tagline: 'Training wear & athletic streetwear.',
    blurb: 'Made for movement, repeat wear, and late nights.',
  },
  {
    key: 'progress',
    name: 'Progress',
    label: 'PROGRESS',
    number: '05',
    tagline: 'Routines, education & community.',
    blurb: 'Practical training ideas for the days you show up anyway.',
  },
];

export const PRIMARY_NAV = [
  { name: 'Shop', to: '/products' },
  { name: 'Train', to: '/products?pillar=train' },
  { name: 'Carry', to: '/products?pillar=carry' },
  { name: 'Recover', to: '/products?pillar=recover' },
  { name: 'Wear', to: '/products?pillar=wear' },
  { name: 'About', to: '/about' },
];

export const ANNOUNCEMENTS = [
  { text: 'Built for the daily grind —', highlight: 'free shipping over \u20B9499', to: '/products' },
  { text: 'COD available', highlight: 'pan-India', to: '/products' },
  { text: '7-day returns', highlight: 'on every order', to: '/products' },
];

export const FOOTER = {
  blurb:
    'Functional gear for people who keep showing up. Train with purpose. Recover smarter. Carry it into the rest of your life.',
  columns: [
    {
      title: 'Shop',
      links: [
        { name: 'All products', to: '/products' },
        { name: 'Train', to: '/products?pillar=train' },
        { name: 'Carry', to: '/products?pillar=carry' },
        { name: 'Recover', to: '/products?pillar=recover' },
        { name: 'Wear', to: '/products?pillar=wear' },
      ],
    },
    {
      title: 'Brand',
      links: [
        { name: 'Our story', to: '/about' },
        { name: 'Journal', to: '/blog' },
        { name: 'Contact', to: '/contact' },
        { name: 'FAQ', to: '/faq' },
      ],
    },
    {
      title: 'Support',
      links: [
        { name: 'Shipping & returns', to: '/faq' },
        { name: 'Privacy policy', to: '/privacy' },
        { name: 'Track your order', to: '/orders' },
      ],
    },
  ],
};

export const SEO_DEFAULT = {
  title: 'Fitgearzzz — Train with purpose',
  description:
    'Fitgearzzz equips the everyday athlete for training, recovery, and life beyond the gym. Strength gear, carry essentials, recovery tools and training wear.',
  image:
    'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80',
};
