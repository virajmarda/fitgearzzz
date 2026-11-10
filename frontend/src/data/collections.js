export const collections = [
  {
    slug: 'home-gym',
    title: 'Build Your Home Gym',
    subtitle: 'Practical equipment for strength, mobility, conditioning, and recovery at home.',
    description: 'Create a training space that fits your routine, your space, and your goals. Start with versatile essentials and build gradually.',
    heroImage: '/images/collections/home-gym.svg',
    ctaLabel: 'Shop Home Gym Essentials',
    audience: [
      'Beginners building their first training space',
      'People training in apartments or limited space',
      'Anyone who wants flexible home workouts',
    ],
    buyingConsiderations: [
      'Start with versatile equipment that supports multiple movement patterns',
      'Choose compact or easy-to-store options where space is limited',
      'Prioritise durable materials and clear product specifications',
      'Build around consistency rather than buying everything at once',
    ],
    relatedGuides: ['beginners-home-gym-checklist', 'home-workout-equipment-small-spaces'],
    relatedArticles: ['beginners-home-gym-checklist'],
    bundleSlug: 'beginner-home-gym-kit',
    faqs: [
      {
        question: 'What should I buy first for a home gym?',
        answer: 'Start with versatile basics such as a training mat, resistance bands, and a jump rope. Add equipment gradually based on your training goals and available space.',
      },
      {
        question: 'Can I train effectively in a small space?',
        answer: 'Yes. Compact equipment, bodyweight movements, and a clear workout area can support strength, mobility, and conditioning routines.',
      },
    ],
  },
  {
    slug: 'training-essentials',
    title: 'Training Essentials',
    subtitle: 'Everyday gear for strength, conditioning, mobility, and consistent training.',
    description: 'Build a reliable foundation for your workouts with practical equipment designed for regular use.',
    heroImage: '/images/collections/training-essentials.svg',
    ctaLabel: 'Shop Training Essentials',
    audience: [
      'Beginners starting a regular routine',
      'Home and gym trainers',
      'Anyone upgrading their workout essentials',
    ],
    buyingConsiderations: [
      'Choose equipment that matches your current training level',
      'Look for clear specifications and practical use cases',
      'Select versatile items that support multiple exercises',
      'Consider storage, portability, and maintenance',
    ],
    relatedGuides: ['how-to-choose-resistance-bands'],
    relatedArticles: ['how-to-choose-resistance-bands'],
    bundleSlug: 'starter-training-kit',
    faqs: [
      {
        question: 'What equipment is best for beginners?',
        answer: 'Versatile basics such as resistance bands, a training mat, and a jump rope can support mobility, conditioning, and introductory strength work.',
      },
    ],
  },
  {
    slug: 'recovery',
    title: 'Recovery Essentials',
    subtitle: 'Support mobility, comfort, and recovery between training sessions.',
    description: 'Recovery is part of a consistent training routine. Explore practical tools and guidance for mobility, comfort, and post-workout care.',
    heroImage: '/images/collections/recovery.svg',
    ctaLabel: 'Shop Recovery Essentials',
    audience: [
      'People training regularly',
      'Beginners building sustainable routines',
      'Anyone focusing on mobility and recovery',
    ],
    buyingConsiderations: [
      'Choose recovery tools that match your training routine',
      'Prioritise comfort, ease of use, and practical storage',
      'Use recovery alongside adequate rest, hydration, and nutrition',
      'Follow product-specific care and safety guidance',
    ],
    relatedGuides: [],
    relatedArticles: [],
    bundleSlug: 'recovery-starter-kit',
    faqs: [
      {
        question: 'Do I need recovery equipment?',
        answer: 'Recovery equipment can be useful, but it is optional. Consistent training, adequate rest, hydration, and nutrition remain foundational.',
      },
    ],
  },
];

export const getCollectionBySlug = (slug) =>
  collections.find((collection) => collection.slug === slug);

export const getCollectionTitles = () =>
  collections.map((collection) => ({
    slug: collection.slug,
    title: collection.title,
  }));
