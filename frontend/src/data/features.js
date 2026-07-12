// features.js
// Central data file for FitGearzzz editorial Features section.
// Each feature is a standalone article with rich content structure.
// Images: Unsplash free-to-use. Replace with owned photography when available.

export const features = [
  {
    id: 1,
    slug: 'built-in-the-heat',
    title: 'Built in the Heat',
    kicker: 'Origin',
    category: 'Founder',
    author: 'FitGearzzz Editorial',
    location: 'Solapur, MH',
    readTime: '6 min read',
    issue: 'Issue 01',
    date: 'June 2025',
    excerpt: 'A single overheating treadmill in a rented garage. No funding, no warehouse. This is what the first 90 days actually looked like.',
    heroImage: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?crop=entropy&cs=srgb&fm=jpg&q=85&w=2200',
    heroAlt: 'Early morning light through a gym window',
    pullQuote: 'We were packing orders at midnight and sourcing replacements at 7 a.m. There was no version of this that wasn\'t physical.',
    pullQuoteBy: 'Viraj Marda, Founder',
    content: [
      { type: 'paragraph', body: 'The first product we listed wasn\'t planned. A friend needed resistance bands and couldn\'t find a single decent option that would ship to Solapur in less than ten days. We sourced a set, tested them in a living room, and put them up. They sold out in three days.' },
      { type: 'paragraph', body: 'That was the entire thesis, compressed. Not a disruption narrative. Not a pivot story. Just a sourcing gap and a decision to close it — repeatedly, at scale.' },
      { type: 'heading', body: 'The infrastructure problem nobody talks about' },
      { type: 'paragraph', body: 'Pan-India fitness delivery sounds simple until you\'ve had a 15 kg adjustable dumbbell set routed through three hubs and delivered to the wrong pin code. The first six months were largely logistics triage. We learned courier partner behaviour, packaging failure points, and which product categories required what kind of packing density. None of this is glamorous. All of it compounds.' },
      { type: 'paragraph', body: 'We didn\'t build a system by reading about logistics. We built it by dispatching, tracking, failing, and adjusting — every weekday for eight months.' },
      { type: 'heading', body: 'The rejection policy that came from a single bad order' },
      { type: 'paragraph', body: 'One supplier sent foam rollers that delaminated after four uses. We pulled the entire SKU, refunded every order, and never relisted. That\'s when we wrote the first version of our sourcing checklist — not from a business school framework, but from that specific failure. It\'s been revised seventeen times since. The principle hasn\'t changed.' },
      { type: 'paragraph', body: 'Building in heat means the things that survive are the ones that were actually built well. The rest burns off.' },
    ],
  },
  {
    id: 2,
    slug: 'the-3am-barbell',
    title: 'The 3 a.m. Barbell',
    kicker: 'Culture',
    category: 'Training',
    author: 'FitGearzzz Editorial',
    location: 'Mumbai, MH',
    readTime: '5 min read',
    issue: 'Issue 02',
    date: 'July 2025',
    excerpt: 'Why the people who train before the city wakes up are the most honest customers we have — and what their gear choices tell us about everyone else.',
    heroImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?crop=entropy&cs=srgb&fm=jpg&q=85&w=2200',
    heroAlt: 'Empty gym floor under tungsten lights before dawn',
    pullQuote: 'Nobody performs at 3 a.m. Nobody is filming. The gear either works or it doesn\'t.',
    pullQuoteBy: 'FitGearzzz Field Notes',
    content: [
      { type: 'paragraph', body: 'There\'s a category of customer we\'ve come to think of as the honest demographic. They train between 4 a.m. and 6 a.m. They don\'t post their sessions. They buy the same barbell three years running because it held up. They return products fast and without noise when something fails.' },
      { type: 'paragraph', body: 'This group has shaped our catalog more than any marketing insight has. Their reorder rate tells us what actually works. Their returns tell us what doesn\'t. Their silence tells us what\'s reliable enough to be invisible — which is exactly what good equipment should be.' },
      { type: 'heading', body: 'What pre-dawn training reveals about product quality' },
      { type: 'paragraph', body: 'Gym mirrors and good lighting hide a lot. A barbell with inconsistent knurling still photographs well. A pull-up bar with sloppy welds still looks fine in a product image. At 3 a.m., in bad overhead light, with tired hands, those things become immediately apparent.' },
      { type: 'paragraph', body: 'We started doing pre-dawn review sessions internally — testing new SKUs in low-visibility conditions, under load, fatigued. The failure rate in our sourcing process went up. The failure rate of products we listed went down.' },
      { type: 'heading', body: 'What we stock for this customer' },
      { type: 'paragraph', body: 'No cosmetic chrome. No rubberised grips that feel good in the hand but crack at 60 kg. The barbell this customer wants is the one that\'s still tight in the collar after 600 sessions. We can\'t always stock that. But we can refuse to stock the alternative.' },
    ],
  },
  {
    id: 3,
    slug: 'made-in-ludhiana',
    title: 'Made in Ludhiana',
    kicker: 'Supply Chain',
    category: 'Sourcing',
    author: 'FitGearzzz Editorial',
    location: 'Ludhiana, PB',
    readTime: '7 min read',
    issue: 'Issue 03',
    date: 'August 2025',
    excerpt: 'Punjab\'s industrial belt has been making gym equipment for four decades. Most of it never gets credit. We went to find out why.',
    heroImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?crop=entropy&cs=srgb&fm=jpg&q=85&w=2200',
    heroAlt: 'Steel fabrication workshop with welding sparks',
    pullQuote: 'The same workshop that makes a budget barbell for a discount distributor makes a premium barbell for a European brand. The steel is identical. The spec sheet isn\'t.',
    pullQuoteBy: 'Workshop floor conversation, Ludhiana',
    content: [
      { type: 'paragraph', body: 'Ludhiana has been the manufacturing spine of Indian fitness equipment since the late 1980s. Steel tube bending, chrome plating, foam moulding, weight casting — it all happens within a 40 km radius of the city center. Most people who own Indian-made gym equipment have no idea it came from here.' },
      { type: 'paragraph', body: 'We spent two days visiting fabrication units and assembly workshops. What we found wasn\'t a backward industry. It was a highly capable one operating without a brand story.' },
      { type: 'heading', body: 'The spec sheet gap' },
      { type: 'paragraph', body: 'The same factory might run three different production lines in a single shift. One line runs 25 mm standard barbells for the domestic budget channel. Another runs 28 mm Olympic-spec barbells for a buyer who exports to Southeast Asia. The machinery is the same. The raw steel coil comes from the same supplier. The difference is in the customer\'s specification document.' },
      { type: 'paragraph', body: 'When a buyer doesn\'t provide a tight spec — or accepts whatever is available — quality becomes a coin flip. When a buyer specifies wall thickness, weld bead continuity, knurl depth, and chrome adhesion, they get a different product. Most domestic distributors don\'t ask. We do.' },
      { type: 'heading', body: 'What working directly with manufacturers changes' },
      { type: 'paragraph', body: 'We\'ve been building direct relationships with two Ludhiana units since early 2025. The goal is not to cut price. It\'s to get specification control and lead time predictability. Both matter more than margin at this stage.' },
      { type: 'paragraph', body: 'Indian manufacturing can make world-class fitness equipment. It already does — for brands that specify correctly and pay for it. FitGearzzz intends to be one of those brands.' },
    ],
  },
  {
    id: 4,
    slug: 'why-we-reject-more-than-we-list',
    title: 'Why We Reject More Than We List',
    kicker: 'Standards',
    category: 'Sourcing',
    author: 'FitGearzzz Editorial',
    location: 'Solapur, MH',
    readTime: '4 min read',
    issue: 'Issue 04',
    date: 'September 2025',
    excerpt: 'Our catalog is the products that survived a refusal process. Here\'s what that process looks like — and why most items don\'t make it through.',
    heroImage: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?crop=entropy&cs=srgb&fm=jpg&q=85&w=2200',
    heroAlt: 'Close-up of equipment inspection with calipers',
    pullQuote: 'A shorter catalog isn\'t a limitation. It\'s a position.',
    pullQuoteBy: 'FitGearzzz Sourcing Policy',
    content: [
      { type: 'paragraph', body: 'For every product currently listed on FitGearzzz, roughly three were considered and not listed. This isn\'t a high standard we invented for marketing purposes. It\'s the residue of having received — and returned — bad product.' },
      { type: 'paragraph', body: 'The evaluation process has five stages. A product doesn\'t move forward until it clears each one.' },
      { type: 'heading', body: 'Stage one: supplier legitimacy' },
      { type: 'paragraph', body: 'We verify that the supplier has consistent fulfillment history, documented return handling, and a physical address. Many don\'t pass this. Drop-shipping aggregators and grey-market resellers are disqualified at this stage.' },
      { type: 'heading', body: 'Stage two: spec verification' },
      { type: 'paragraph', body: 'If a supplier claims 10 kg per plate, we weigh it. If they claim 28 mm diameter, we measure it. Roughly 30% of submitted products fail spec verification.' },
      { type: 'heading', body: 'Stage three: use testing' },
      { type: 'paragraph', body: 'We use the product. Not once — repeatedly, over 2–4 weeks. Resistance bands are cycled to failure. Foam rollers are used under full body weight daily. Adjustable dumbbells are loaded and unloaded 200 times to test collar integrity.' },
      { type: 'heading', body: 'Stage four: returns simulation' },
      { type: 'paragraph', body: 'We ask: if a customer needs to return this, what is the packaging failure risk? Will the product survive a return courier? Products that would arrive back damaged — and therefore create a loss on the return — don\'t get listed.' },
      { type: 'paragraph', body: 'What\'s left after this process is a catalog we can stand behind. Not perfect. But deliberate.' },
    ],
  },
  {
    id: 5,
    slug: 'what-home-gym-ready-actually-means',
    title: 'What "Home Gym Ready" Actually Means',
    kicker: 'Gear Guide',
    category: 'Equipment',
    author: 'FitGearzzz Editorial',
    location: 'Pune, MH',
    readTime: '5 min read',
    issue: 'Issue 05',
    date: 'October 2025',
    excerpt: 'Every brand says their products are home gym ready. We tested what that phrase actually requires — space constraints, noise floors, weight limits, and all.',
    heroImage: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?crop=entropy&cs=srgb&fm=jpg&q=85&w=2200',
    heroAlt: 'Compact home gym setup in a small apartment room',
    pullQuote: 'A rack that requires 2.4m ceiling clearance is not home gym ready in 90% of Indian flats. The spec sheet doesn\'t mention this.',
    pullQuoteBy: 'FitGearzzz Product Notes',
    content: [
      { type: 'paragraph', body: '"Home gym ready" has become a listing phrase. It means nothing without context. A 20 kg barbell set requires space to clean and press. A cable machine needs ceiling height. A spin cycle needs a surface that absorbs vibration or your downstairs neighbour becomes a variable in your workout.' },
      { type: 'paragraph', body: 'We put together this piece because customer returns on large equipment are almost always preceded by a measurement oversight. Not dissatisfaction with quality — an incompatibility that should have been communicated at the point of purchase.' },
      { type: 'heading', body: 'The four constraints nobody lists' },
      { type: 'paragraph', body: 'Ceiling height. Floor load rating (especially relevant for adjustable plates on older buildings). Noise at peak RPM or impact load. Minimum clearance around the equipment for safe use. We now include at least two of these in every large equipment listing.' },
      { type: 'heading', body: 'The equipment that works in Indian homes' },
      { type: 'paragraph', body: 'Adjustable dumbbells under 20 kg per handle. Resistance bands with mounted door anchors. Foldable benches that fit behind a door. Yoga mats that roll, not fold. These are not exciting categories. But they\'re the ones that don\'t generate a return due to space miscalculation.' },
      { type: 'paragraph', body: 'If we list a power rack, we list its minimum room footprint. If we list a spin cycle, we list its decibel range at 80 RPM. This isn\'t over-specification. It\'s respect for the reality of training in 900 sq ft.' },
    ],
  },
  {
    id: 6,
    slug: 'the-return-that-taught-us-something',
    title: 'The Return That Taught Us Something',
    kicker: 'Insight',
    category: 'Customer Story',
    author: 'FitGearzzz Editorial',
    location: 'Kolkata, WB',
    readTime: '4 min read',
    issue: 'Issue 06',
    date: 'November 2025',
    excerpt: 'A single product return forced us to rewrite our entire returns policy. Not because we were wrong. Because the customer was more right.',
    heroImage: 'https://images.unsplash.com/photo-1553864250-05b20249ee0c?crop=entropy&cs=srgb&fm=jpg&q=85&w=2200',
    heroAlt: 'Shipping box being inspected under warehouse light',
    pullQuote: 'The product met spec. The listing was accurate. But the customer was still justified. That\'s when we learned the difference between being correct and being useful.',
    pullQuoteBy: 'FitGearzzz Internal Post-Mortem',
    content: [
      { type: 'paragraph', body: 'A customer in Kolkata ordered a 15 kg kettlebell. It arrived on time, undamaged, matching the product description and images. The customer initiated a return within 48 hours. Reason: "Too loud on floor impact." We approved the return, refunded in full, and archived it as a standard transaction.' },
      { type: 'paragraph', body: 'Two weeks later, a similar return came in from Bangalore. Same product. Same reason. We pulled the item and tested it ourselves. The kettlebell worked fine. The spec was fine. But the customer experience — in a typical residential setting — wasn\'t fine.' },
      { type: 'heading', body: 'What "works fine" actually means' },
      { type: 'paragraph', body: 'A cast-iron kettlebell dropped from hip height onto a tile floor produces roughly 85 decibels. That\'s not a product defect. It\'s physics. But it\'s also unusable in an apartment with shared walls and floors. The product listing didn\'t mention this. Most don\'t.' },
      { type: 'paragraph', body: 'We rewrote the description to include a noise warning and a recommendation for rubber flooring or drop mats. Returns on that SKU dropped by 40% over the next three months. Not because the product changed. Because the expectation did.' },
      { type: 'heading', body: 'What we changed after this' },
      { type: 'paragraph', body: 'Every product now includes a "real use context" note. Not marketing language. Actual constraints. If something requires ventilation, we say it. If it scratches wood floors, we say it. If it\'s too heavy for one person to unbox safely, we say it.' },
      { type: 'paragraph', body: 'Returns are still possible. But they\'re no longer surprises.' },
    ],
  },
  {
    id: 7,
    slug: 'the-problem-with-cheap-foam',
    title: 'The Problem With Cheap Foam',
    kicker: 'Materials',
    category: 'Quality',
    author: 'FitGearzzz Editorial',
    location: 'Delhi, DL',
    readTime: '5 min read',
    issue: 'Issue 07',
    date: 'December 2025',
    excerpt: 'Foam density determines whether a yoga mat lasts six weeks or six years. Most product listings don\'t mention it. Here\'s why we do.',
    heroImage: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?crop=entropy&cs=srgb&fm=jpg&q=85&w=2200',
    heroAlt: 'Close-up of foam roller texture and density',
    pullQuote: 'Foam density isn\'t a technical detail. It\'s the entire product. Everything else is packaging.',
    pullQuoteBy: 'FitGearzzz Material Standards',
    content: [
      { type: 'paragraph', body: 'A yoga mat priced at ₹400 and one priced at ₹1,800 look identical in product photos. They photograph the same. They ship in similar packaging. The difference is in the foam composition — something no image can communicate.' },
      { type: 'paragraph', body: 'We stopped listing budget foam products in mid-2025 after handling too many returns where the mat had compressed unevenly or the roller had developed a permanent dent. None of these were defects. They were predictable outcomes of low-density foam under repeated load.' },
      { type: 'heading', body: 'What foam density actually measures' },
      { type: 'paragraph', body: 'Foam density is measured in kg/m³. A budget yoga mat typically uses 40–60 kg/m³ EVA foam. A mid-tier mat uses 80–100 kg/m³. A professional mat uses 120+ kg/m³. The difference compounds over time. The budget mat compresses to half its original thickness within 40 sessions. The professional mat retains cushioning after 400.' },
      { type: 'paragraph', body: 'This information is almost never listed. Suppliers either don\'t test it or don\'t disclose it. We require it for every foam-based product we stock.' },
      { type: 'heading', body: 'What we changed in our foam catalog' },
      { type: 'paragraph', body: 'We delisted every yoga mat under 80 kg/m³ density. We delisted every foam roller under 100 kg/m³. We lost SKU count. We lost price-sensitive customers. But returns on foam products dropped 60%, and reorder rate on the remaining foam SKUs went up by 35%.' },
      { type: 'paragraph', body: 'Cheap foam isn\'t a value proposition. It\'s deferred dissatisfaction.' },
    ],
  },
  {
    id: 8,
    slug: 'notes-from-the-dispatch-floor',
    title: 'Notes From the Dispatch Floor',
    kicker: 'Operations',
    category: 'Logistics',
    author: 'FitGearzzz Editorial',
    location: 'Solapur, MH',
    readTime: '6 min read',
    issue: 'Issue 08',
    date: 'January 2026',
    excerpt: 'What actually happens between "Order Confirmed" and "Out for Delivery." The warehouse decisions that determine whether your barbell arrives intact or bent.',
    heroImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?crop=entropy&cs=srgb&fm=jpg&q=85&w=2200',
    heroAlt: 'Warehouse floor with organized shipping stations',
    pullQuote: 'Packaging isn\'t marketing. It\'s engineering. If the box fails, the product fails.',
    pullQuoteBy: 'FitGearzzz Dispatch Protocol',
    content: [
      { type: 'paragraph', body: 'Every order placed on FitGearzzz passes through one of two dispatch protocols: standard or fragile. The distinction isn\'t arbitrary. It\'s based on weight distribution, impact sensitivity, and observed courier handling patterns across six regional hubs.' },
      { type: 'paragraph', body: 'This feature is a breakdown of what happens on the dispatch floor — the decisions that don\'t show up on a tracking page but determine whether a product arrives usable.' },
      { type: 'heading', body: 'Standard protocol: what qualifies' },
      { type: 'paragraph', body: 'Resistance bands, yoga mats, foam rollers, apparel, supplements, and accessories under 5 kg. These go into double-walled corrugated boxes with corner bracing and tamper-evident tape. Box size is matched to product dimensions to prevent internal shifting. Courier partner is selected based on pin code reliability data, not cost.' },
      { type: 'heading', body: 'Fragile protocol: what changes' },
      { type: 'paragraph', body: 'Adjustable dumbbells, barbells, kettlebells, benches, and any product over 10 kg or with exposed metal components. Packaging moves to triple-walled boxes with foam inserts and edge guards. Courier selection prioritizes surface transport over air to reduce drop impact. Delivery attempts are capped at two before retrieval to prevent prolonged hub storage damage.' },
      { type: 'paragraph', body: 'These decisions add 12–18% to per-unit dispatch cost. They also reduce damage-on-arrival claims by 70%. We pay it forward because the alternative — reshipment, refund, customer frustration — costs more.' },
      { type: 'heading', body: 'The data we track that most brands ignore' },
      { type: 'paragraph', body: 'We log every damaged-on-arrival report by courier partner, hub location, product type, and weather condition. After 14 months of data, we know that certain hubs damage barbells at 4x the national average. We route around them. We know that foam products ship better in monsoon season than winter (moisture prevents compression cracking). We adjust stock allocation accordingly.' },
      { type: 'paragraph', body: 'Dispatch isn\'t the final step. It\'s the last line of quality control.' },
    ],
  },
];

// Helper function: get feature by slug
export const getFeatureBySlug = (slug) => {
  return features.find((f) => f.slug === slug);
};

// Helper function: get all features except current one (for related features)
export const getRelatedFeatures = (slug, category = null, limit = 3) => {
  let filtered = features.filter((f) => f.slug !== slug);
  
  // Prioritize same category if provided
  if (category) {
    const sameCategory = filtered.filter((f) => f.category === category);
    const otherCategory = filtered.filter((f) => f.category !== category);
    filtered = [...sameCategory, ...otherCategory];
  }
  
  return filtered.slice(0, limit);
};

// Helper function: get prev/next features for navigation
export const getAdjacentFeatures = (slug) => {
  const currentIndex = features.findIndex((f) => f.slug === slug);
  if (currentIndex === -1) return { prev: null, next: null };
  
  return {
    prev: currentIndex > 0 ? features[currentIndex - 1] : null,
    next: currentIndex < features.length - 1 ? features[currentIndex + 1] : null,
  };
};
