export const articleCategories = [
  { slug: 'training', name: 'Training' },
  { slug: 'gear-guides', name: 'Gear Guides' },
  { slug: 'recovery', name: 'Recovery' },
  { slug: 'home-gym', name: 'Home Gym' },
  { slug: 'product-care', name: 'Product Care' },
  { slug: 'lifestyle', name: 'Lifestyle' },
];

export const articles = [
  {
    slug: 'beginners-home-gym-checklist',
    title: 'The Beginner’s Home Gym Checklist',
    category: 'home-gym',
    excerpt: 'Build a practical home workout space with versatile, space-conscious essentials.',
    readingTime: '6 min read',
    updatedAt: '2026-11-10',
    heroImage: '/images/journal/beginners-home-gym-checklist.svg',
    relatedCollections: ['home-gym'],
    relatedProducts: [],
    relatedArticles: ['how-to-choose-resistance-bands', 'home-workout-equipment-small-spaces'],
    sections: [
      {
        heading: 'Start with versatile essentials',
        body: 'A useful home gym does not need to be large or expensive. Begin with equipment that supports strength, mobility, conditioning, and recovery.',
      },
      {
        heading: 'Core equipment',
        body: 'Resistance bands, a training mat, a jump rope, and simple storage can support a wide range of workouts without taking over your space.',
      },
      {
        heading: 'Build gradually',
        body: 'Add equipment only when it solves a clear training need. Prioritise items you will use consistently over trend-led purchases.',
      },
    ],
    faqs: [
      {
        question: 'How much space do I need?',
        answer: 'A clear area large enough to move safely is enough for many beginner routines. Choose compact, stackable, or easy-to-store equipment where space is limited.',
      },
    ],
  },
  {
    slug: 'how-to-choose-resistance-bands',
    title: 'How to Choose Resistance Bands',
    category: 'gear-guides',
    excerpt: 'Understand resistance levels, materials, and use cases before choosing bands.',
    readingTime: '5 min read',
    updatedAt: '2026-11-10',
    heroImage: '/images/journal/how-to-choose-resistance-bands.svg',
    relatedCollections: ['training-essentials'],
    relatedProducts: [],
    relatedArticles: ['beginners-home-gym-checklist'],
    sections: [
      {
        heading: 'Match resistance to your goal',
        body: 'Lighter bands suit mobility and warm-ups, while heavier resistance can support strength work. Choose based on your current ability and intended exercises.',
      },
      {
        heading: 'Check material and durability',
        body: 'Look for clear product specifications, comfortable handles or loops where applicable, and care instructions that help maintain the product.',
      },
    ],
    faqs: [
      {
        question: 'Can beginners use resistance bands?',
        answer: 'Yes. Resistance bands can be useful for beginners because resistance can often be adjusted through band choice, positioning, and exercise variation.',
      },
    ],
  },
];

export const getArticleBySlug = (slug) =>
  articles.find((article) => article.slug === slug);

export const getArticlesByCategory = (categorySlug) =>
  articles.filter((article) => article.category === categorySlug);
