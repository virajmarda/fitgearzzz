export const bundles = [
  {
    slug: 'beginner-home-gym-kit',
    title: 'Beginner Home Gym Kit',
    subtitle: 'A simple starting point for home strength, mobility, and conditioning.',
    description: 'Build a practical home training setup with versatile essentials designed to support consistent workouts.',
    collection: 'home-gym',
    audience: ['Beginners', 'Home trainers', 'Small-space workouts'],
    productSlugs: [],
    highlights: [
      'Supports strength, mobility, and conditioning',
      'Suitable for compact training spaces',
      'Easy to store between sessions',
    ],
    faqs: [
      {
        question: 'Is this kit suitable for beginners?',
        answer: 'Yes. The kit is designed as a practical starting point for home training and can be adapted to different fitness levels.',
      },
    ],
  },
  {
    slug: 'starter-training-kit',
    title: 'Starter Training Kit',
    subtitle: 'Everyday essentials for consistent training.',
    description: 'A focused selection of training essentials for gym, home, and travel workouts.',
    collection: 'training-essentials',
    audience: ['Beginners', 'Regular trainers', 'Travel-friendly workouts'],
    productSlugs: [],
    highlights: [
      'Versatile everyday training essentials',
      'Suitable for home, gym, and travel',
      'Designed around practical, repeatable use',
    ],
    faqs: [
      {
        question: 'Can I use this kit while travelling?',
        answer: 'Many training essentials are portable, but suitability depends on the specific products included and your travel requirements.',
      },
    ],
  },
  {
    slug: 'recovery-starter-kit',
    title: 'Recovery Starter Kit',
    subtitle: 'Practical tools for mobility and post-workout comfort.',
    description: 'Support your recovery routine with simple tools designed for regular use alongside rest, hydration, and nutrition.',
    collection: 'recovery',
    audience: ['Regular trainers', 'Beginners', 'Mobility-focused routines'],
    productSlugs: [],
    highlights: [
      'Supports mobility and comfort routines',
      'Easy-to-use recovery essentials',
      'Designed to complement rest and recovery habits',
    ],
    faqs: [
      {
        question: 'Does recovery equipment replace rest?',
        answer: 'No. Recovery equipment may support mobility and comfort, but adequate rest, hydration, nutrition, and sleep remain essential.',
      },
    ],
  },
];

export const getBundleBySlug = (slug) =>
  bundles.find((bundle) => bundle.slug === slug);

export const getBundlesByCollection = (collectionSlug) =>
  bundles.filter((bundle) => bundle.collection === collectionSlug);
