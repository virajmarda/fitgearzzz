export const faqGroups = {
  homeGym: [
    {
      question: 'What should I buy first for a home gym?',
      answer: 'Start with versatile basics such as a training mat, resistance bands, and a jump rope. Add equipment gradually based on your training goals and available space.',
    },
    {
      question: 'Can I train effectively in a small space?',
      answer: 'Yes. Compact equipment, bodyweight movements, and a clear workout area can support strength, mobility, and conditioning routines.',
    },
    {
      question: 'How should I store home gym equipment?',
      answer: 'Use storage that keeps equipment accessible but out of the way. Hooks, baskets, and storage bags can help maintain a tidy training area.',
    },
  ],
  trainingEssentials: [
    {
      question: 'What equipment is best for beginners?',
      answer: 'Versatile basics such as resistance bands, a training mat, and a jump rope can support mobility, conditioning, and introductory strength work.',
    },
    {
      question: 'How do I choose resistance bands?',
      answer: 'Consider the resistance level, material, intended exercises, and product care instructions. Choose based on your current ability and training goal.',
    },
    {
      question: 'Can I use training accessories while travelling?',
      answer: 'Many compact accessories can be travel-friendly, but suitability depends on the specific product, its size, and airline or transport requirements.',
    },
  ],
  recovery: [
    {
      question: 'Do I need recovery equipment?',
      answer: 'Recovery equipment is optional. It may support mobility and comfort, but adequate rest, hydration, nutrition, and sleep remain foundational.',
    },
    {
      question: 'When should I use recovery tools?',
      answer: 'Use recovery tools according to the product instructions and your comfort level. Stop use if you experience pain, numbness, or unusual symptoms.',
    },
    {
      question: 'Can recovery tools replace professional advice?',
      answer: 'No. For persistent pain, injury, or medical concerns, seek advice from a qualified healthcare professional.',
    },
  ],
  shippingReturns: [
    {
      question: 'What is the return window?',
      answer: 'Returns are accepted within 7 days, subject to the eligibility and refund terms in the Shipping & Returns policy.',
    },
    {
      question: 'How can I track my order?',
      answer: 'Order information is available through the order experience supported by your account and the store’s existing checkout and fulfilment process.',
    },
    {
      question: 'What should I do if my order arrives damaged?',
      answer: 'Contact support with your order details and clear photographs of the item and packaging so the team can review the issue.',
    },
  ],
  productCare: [
    {
      question: 'How should I clean my training mat?',
      answer: 'Follow the care instructions provided with the specific mat. Avoid harsh chemicals unless the product guidance explicitly permits them.',
    },
    {
      question: 'How should I care for resistance bands?',
      answer: 'Keep bands away from sharp objects, excessive heat, and prolonged direct sunlight. Inspect them before use and follow the manufacturer’s care guidance.',
    },
    {
      question: 'How should I store fitness accessories?',
      answer: 'Store accessories clean, dry, and away from sharp objects or extreme heat. Proper storage can help maintain their condition.',
    },
  ],
  support: [
    {
      question: 'How can I contact support?',
      answer: 'Use the contact options available on the website. The contact experience prepares a message draft for you to review and send.',
    },
    {
      question: 'Where can I find product information?',
      answer: 'Product pages include available specifications, images, options, pricing, and purchase details where supported by the connected store.',
    },
  ],
};

export const getFaqGroup = (groupKey) => faqGroups[groupKey] || [];
