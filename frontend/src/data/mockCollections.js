// src/data/mockCollections.js
// Demo collections mapped to the five brand pillars.

const img = (id, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const mockCollections = [
  {
    id: 'col-train',
    handle: 'train',
    title: 'Train',
    pillar: 'train',
    description:
      'Strength, conditioning and mobility tools for the work that compounds.',
    image: img('1534438327276-14e5300c3a48'),
  },
  {
    id: 'col-carry',
    handle: 'carry',
    title: 'Carry',
    pillar: 'carry',
    description: 'Bags, bottles and daily essentials that move with you.',
    image: img('1581605405669-fcdf81165afa'),
  },
  {
    id: 'col-recover',
    handle: 'recover',
    title: 'Recover',
    pillar: 'recover',
    description: 'Mobility, rollers and recovery pieces that earn their space.',
    image: img('1552196563-55cd4e45efb3'),
  },
  {
    id: 'col-wear',
    handle: 'wear',
    title: 'Wear',
    pillar: 'wear',
    description: 'Training wear and athletic streetwear built for repeat wear.',
    image: img('1554139844-af2fc8ad3a3a'),
  },
];

export const getCollectionByHandle = (handle) =>
  mockCollections.find((c) => c.handle === handle) || null;
