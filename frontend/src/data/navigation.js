export const primaryNavigation = [
  {
    label: 'Shop',
    href: '/collections',
    children: [
      { label: 'All Products', href: '/collections' },
      { label: 'Home Gym', href: '/collections/home-gym' },
      { label: 'Training Essentials', href: '/collections/training-essentials' },
      { label: 'Recovery', href: '/collections/recovery' },
    ],
  },
  {
    label: 'Train',
    href: '/guides',
    children: [
      { label: 'Training Guides', href: '/guides' },
      { label: 'Beginner Home Gym', href: '/guides/beginners-home-gym-checklist' },
      { label: 'Small-Space Workouts', href: '/guides/home-workout-equipment-small-spaces' },
    ],
  },
  {
    label: 'Learn',
    href: '/journal',
    children: [
      { label: 'Journal', href: '/journal' },
      { label: 'Gear Guides', href: '/journal/category/gear-guides' },
      { label: 'Recovery', href: '/journal/category/recovery' },
      { label: 'Product Care', href: '/journal/category/product-care' },
    ],
  },
  {
    label: 'Collections',
    href: '/collections',
    children: [
      { label: 'Home Gym', href: '/collections/home-gym' },
      { label: 'Training Essentials', href: '/collections/training-essentials' },
      { label: 'Recovery', href: '/collections/recovery' },
    ],
  },
  {
    label: 'Gifts',
    href: '/gifts',
  },
];

export const utilityNavigation = [
  { label: 'Account', href: '/account' },
  { label: 'Wishlist', href: '/wishlist' },
  { label: 'Cart', href: '/cart' },
];

export const footerNavigation = [
  {
    title: 'Shop',
    links: [
      { label: 'All Products', href: '/collections' },
      { label: 'Home Gym', href: '/collections/home-gym' },
      { label: 'Training Essentials', href: '/collections/training-essentials' },
      { label: 'Recovery', href: '/collections/recovery' },
    ],
  },
  {
    title: 'Learn',
    links: [
      { label: 'Journal', href: '/journal' },
      { label: 'Guides', href: '/guides' },
      { label: 'Gear Guides', href: '/journal/category/gear-guides' },
      { label: 'Product Care', href: '/journal/category/product-care' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Contact', href: '/contact' },
      { label: 'FAQs', href: '/faq' },
      { label: 'Shipping & Returns', href: '/shipping-returns' },
      { label: 'Privacy Policy', href: '/privacy' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Gifts', href: '/gifts' },
      { label: 'Account', href: '/account' },
    ],
  },
];

export const getNavigationByLabel = (label) =>
  primaryNavigation.find((item) => item.label === label);
