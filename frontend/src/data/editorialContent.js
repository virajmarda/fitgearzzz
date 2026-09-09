// src/data/editorialContent.js
// PROGRESS pillar content: journal entries that tie real blog posts (see
// blogData.js) to the products they discuss. No fabricated testimonials.

export const JOURNAL = [
  {
    number: '01',
    category: 'Training',
    title: 'Resistance bands vs dumbbells for home training',
    excerpt:
      'Which one earns its place in a small room? A practical look at load, progression and the sessions you will actually do.',
    slug: 'resistance-bands-vs-dumbbells-home-training',
    products: ['resistance-band-set', 'cast-iron-dumbbell-pair'],
  },
  {
    number: '02',
    category: 'Recovery',
    title: 'Seven recovery essentials that keep you consistent',
    excerpt:
      'Consistency is a recovery problem before it is a motivation problem. The tools that make tomorrow\u2019s session easier to start.',
    slug: '7-recovery-essentials-stay-consistent',
    products: ['high-density-foam-roller', 'studio-exercise-mat'],
  },
  {
    number: '03',
    category: 'Gear guides',
    title: 'Choosing home equipment without wasting money',
    excerpt:
      'Fewer, better decisions. How to build a setup around the work you plan to do \u2014 not the one you saw in an ad.',
    slug: 'how-to-choose-right-home-workout-equipment',
    products: ['powder-coat-kettlebell', 'everyday-gym-duffel'],
  },
];

export const COLLECTION_SPLIT = {
  primary: {
    pillar: 'train',
    title: 'Train',
    line: 'Strength that compounds.',
    text: 'Dumbbells, kettlebells, plates and bands \u2014 the honest tools for the work between motivation and progress.',
    image:
      'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?auto=format&fit=crop&w=1400&q=80',
  },
  secondary: [
    {
      pillar: 'recover',
      title: 'Recover',
      line: 'Move better. Recover smarter.',
      image:
        'https://images.unsplash.com/photo-1552196563-55cd4e45efb3?auto=format&fit=crop&w=900&q=80',
    },
    {
      pillar: 'wear',
      title: 'Wear',
      line: 'Quiet pieces. Strong character.',
      image:
        'https://images.unsplash.com/photo-1554139844-af2fc8ad3a3a?auto=format&fit=crop&w=900&q=80',
    },
  ],
};
