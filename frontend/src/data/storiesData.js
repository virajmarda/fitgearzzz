// Editorial brand stories for FitGearzzz.
// Each story uses a distinct layout variant rendered on the StoryDetail page:
//   - "cinematic"     : full-bleed hero, pull-quotes, chapter divisions
//   - "documentary"   : timeline + numeric milestones
//   - "photo-essay"   : alternating image / text columns with captions
//   - "editorial"     : interview Q&A
//   - "manifesto"     : typography-driven with restrained media

export const stories = [
  {
    id: 1,
    slug: 'built-in-the-heat',
    title: 'Built in the heat',
    subtitle:
      'How a single overheating treadmill in a Pune garage turned into a national fitness label.',
    category: 'Founder',
    location: 'Pune, MH',
    year: '2019 — Present',
    readTime: '7 min read',
    heroImage:
      'https://images.unsplash.com/photo-1505457315458-62417e662cf4?crop=entropy&cs=srgb&fm=jpg&q=85&w=2200',
    coverImage:
      'https://images.unsplash.com/photo-1505457315458-62417e662cf4?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200',
    excerpt:
      'A late-night workout, a broken belt, and a refusal to settle for imported gear that nobody could repair. This is how FitGearzzz began.',
    variant: 'cinematic',
    pullQuote:
      '“We didn’t want to import a brand. We wanted to build one that an Indian climate, an Indian floor and an Indian customer could actually live with.”',
    pullQuoteBy: 'Aniket Joshi, Founder',
    chapters: [
      {
        chapter: 'Chapter 01',
        kicker: 'The garage',
        title: 'A workout that ended at 11:42 pm.',
        body:
          'It was a humid August night in 2019 when the treadmill in Aniket’s garage tripped its third belt of the year. The unit was two years old, imported, and the local service centre had quietly shut down. He sat on the floor in a soaked t-shirt and did the math: every product in his small home gym had been engineered for someone in another country, and shipped here as an afterthought.',
      },
      {
        chapter: 'Chapter 02',
        kicker: 'The notebook',
        title: 'Forty-one pages of complaints.',
        body:
          'Over the next three weeks he filled a notebook with everything that frustrated him about home fitness gear in India — sticky grips after monsoon, plates that chipped on concrete, dumbbells that wobbled at the joint, customer service that wanted you to ship a 30 kg rack back to Shenzhen. Forty-one pages. Most of them in red ink.',
      },
      {
        chapter: 'Chapter 03',
        kicker: 'The first run',
        title: 'Twelve resistance bands and a small bet.',
        body:
          'FitGearzzz started with twelve resistance bands manufactured at a friend’s rubber unit in Ludhiana and a WhatsApp group of forty customers. There was no warehouse. There was no funding deck. There were a lot of late-night calls about how a band should feel when it stretches for the thousandth time.',
      },
      {
        chapter: 'Chapter 04',
        kicker: 'The line',
        title: 'Built for the floor it lives on.',
        body:
          'Today FitGearzzz ships across every PIN code in India. Every product is tested in conditions our customers actually train in — terrace gyms in Chennai, society garages in Pune, balconies in Kolkata. We don’t copy what an American catalogue does. We start with the floor, the heat, and the human, and we work backwards.',
      },
    ],
    facts: [
      { value: '2019', label: 'Started' },
      { value: '40', label: 'First customers' },
      { value: '12', label: 'First SKUs' },
      { value: '100%', label: 'Tested in-country' },
    ],
  },
  {
    id: 2,
    slug: 'the-3am-barbell',
    title: 'The 3 a.m. barbell',
    subtitle:
      'A night-shift nurse in Hyderabad rebuilt her body in eighteen months — between rounds.',
    category: 'Customer',
    location: 'Hyderabad, TS',
    year: '2023 — 2025',
    readTime: '9 min read',
    heroImage:
      'https://images.unsplash.com/photo-1581460484520-bc7c3f533c9e?crop=entropy&cs=srgb&fm=jpg&q=85&w=2200',
    coverImage:
      'https://images.unsplash.com/photo-1581460484520-bc7c3f533c9e?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200',
    excerpt:
      'There was no gym open at the hours she could train. So she built one — three feet by six feet — next to a sleeping toddler.',
    variant: 'documentary',
    timeline: [
      {
        date: 'March 2023',
        title: 'The first email',
        body:
          'Priya, 34, wrote in asking whether a pair of adjustable dumbbells would survive being placed on a tile floor at 3 a.m. without waking a child two rooms away. Our support lead suggested an interlocking mat and answered the actual question underneath the question: yes, you can do this.',
      },
      {
        date: 'April 2023',
        title: 'A six-foot footprint',
        body:
          'Her first order: a 24 kg adjustable dumbbell set, a 6mm mat, a doorway pull-up bar, a jump rope. Total floor space, measured with a measuring tape held by her husband while she took the photo: six feet by three feet.',
      },
      {
        date: 'November 2023',
        title: 'The replacement that wasn’t',
        body:
          'Eight months in, one of the locking pins began to stick. We sent a replacement. She wrote back to say she didn’t need it — she had figured out it was lint from the mat — but the gesture was the first time, she said, that a fitness brand had treated her like a person and not a transaction.',
      },
      {
        date: 'July 2024',
        title: 'First pull-up',
        body:
          'A 4-second voice note arrived at 03:17. No words. Just the sound of a chin clearing a steel bar and a quiet, almost embarrassed laugh.',
      },
      {
        date: 'October 2024',
        title: 'A second order',
        body:
          'She ordered a kettlebell, a foam roller, and a second mat — for her sister, who had started training at the same hour, in another city.',
      },
      {
        date: 'February 2025',
        title: 'The photograph',
        body:
          'Priya sent us the photograph that anchors this story. She asked us not to retouch it. We didn’t.',
      },
    ],
    facts: [
      { value: '18', label: 'Months' },
      { value: '03:00', label: 'Training hour' },
      { value: '6×3 ft', label: 'Home gym' },
      { value: '1', label: 'First pull-up' },
    ],
    closing:
      'Priya still trains at 3 a.m. She still uses the same adjustable dumbbells. The locking pin, she will tell you, has never stuck again.',
  },
  {
    id: 3,
    slug: 'made-in-ludhiana',
    title: 'Made in Ludhiana',
    subtitle:
      'Inside the family-run unit that forges every cast-iron plate, kettlebell and dumbbell we ship.',
    category: 'Craft',
    location: 'Ludhiana, PB',
    year: 'Ongoing',
    readTime: '6 min read',
    heroImage:
      'https://images.unsplash.com/photo-1547919307-1ecb10702e6f?crop=entropy&cs=srgb&fm=jpg&q=85&w=2200',
    coverImage:
      'https://images.unsplash.com/photo-1547919307-1ecb10702e6f?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200',
    excerpt:
      'The forge is in its third generation. The cast-iron recipe is unchanged. The standards have only gone up.',
    variant: 'photo-essay',
    panels: [
      {
        image:
          'https://images.unsplash.com/photo-1547919307-1ecb10702e6f?crop=entropy&cs=srgb&fm=jpg&q=85&w=1400',
        caption: '05:40 a.m. The furnace is lit before the city wakes up.',
        title: 'A fire that has not gone out in thirty-one years.',
        body:
          'The unit was founded in 1994 by a father and his two sons. They forged sugarcane-press parts for the first decade. Today they forge cast-iron plates and kettlebells for FitGearzzz under specifications they helped us write.',
      },
      {
        image:
          'https://images.unsplash.com/photo-1656774950529-44a6153521ee?crop=entropy&cs=srgb&fm=jpg&q=85&w=1400',
        caption: 'Every plate is weighed twice. Both readings are inked on the rim.',
        title: 'Two scales. One source of truth.',
        body:
          'No plate leaves the floor without being weighed on two independent calibrated scales. If they disagree by more than 25 grams, the plate is melted down. We don’t round. We don’t average.',
      },
      {
        image:
          'https://images.unsplash.com/photo-1582550559636-e0d22d20de1b?crop=entropy&cs=srgb&fm=jpg&q=85&w=1400',
        caption: 'The chrome bar is polished by hand on a felt wheel.',
        title: 'The grip is finished where the eye cannot reach.',
        body:
          'A barbell knurl that bites in February also has to be kind to the hands in May. The knurl pattern we use was tuned over four months with feedback from coaches in three cities.',
      },
      {
        image:
          'https://images.unsplash.com/photo-1709315957145-a4bad1feef28?crop=entropy&cs=srgb&fm=jpg&q=85&w=1400',
        caption: 'Each kettlebell is stamped with the initials of the welder who finished it.',
        title: 'A name on the metal.',
        body:
          'There is no anonymous unit in this story. Every kettlebell is stamped with the welder’s initials. If something is wrong, it can be traced — and more importantly, when something is right, the person who made it gets the credit.',
      },
    ],
    facts: [
      { value: '1994', label: 'Forge founded' },
      { value: '31', label: 'Years in operation' },
      { value: '±25 g', label: 'Plate tolerance' },
      { value: '3', label: 'Generations' },
    ],
  },
  {
    id: 4,
    slug: 'trial-by-ten-thousand-reps',
    title: 'Trial by ten thousand reps',
    subtitle:
      'A conversation with our head of testing on what it actually takes to be sold on this site.',
    category: 'Quality',
    location: 'Pune, MH',
    year: '2024',
    readTime: '8 min read',
    heroImage:
      'https://images.unsplash.com/photo-1591558409284-4c3b398cdcc1?crop=entropy&cs=srgb&fm=jpg&q=85&w=2200',
    coverImage:
      'https://images.unsplash.com/photo-1591558409284-4c3b398cdcc1?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200',
    excerpt:
      'Meera Iyer runs our testing lab. Nothing reaches the catalogue without passing through her clipboard.',
    variant: 'editorial',
    interviewee: {
      name: 'Meera Iyer',
      role: 'Head of Product Testing',
      portrait:
        'https://images.unsplash.com/photo-1591558409284-4c3b398cdcc1?crop=entropy&cs=srgb&fm=jpg&q=85&w=900',
    },
    qa: [
      {
        q: 'What is the first thing you test on a new product?',
        a: 'Not what most people assume. Before we test load or wear, we test how the product behaves when it is wrong. A misaligned dumbbell, a slightly off pin, a band with a small nick. We need to know how it fails, not how it performs at its best.',
      },
      {
        q: 'How many reps does a product actually go through before approval?',
        a: 'Our floor minimum is ten thousand. A folding bench will be opened and closed ten thousand times. A locking pin will be inserted and removed ten thousand times. A band will be stretched to 2.5x its resting length ten thousand times. If it survives, we move it to the next stage, which is humidity and salt.',
      },
      {
        q: 'You famously rejected a kettlebell that arrived in February. What happened?',
        a: 'The kettlebell met every spec on paper. The handle was correct, the weight was correct, the finish was correct. But when I held it for a full set of cleans, the centre of gravity sat about six millimetres too high. It was technically passable. It was not what we wanted to put a customer through on a Tuesday morning. We sent the whole batch back.',
      },
      {
        q: 'What is one thing customers do not know about how we test?',
        a: 'We do not test products in a lab room only. Every approved product goes home with a real coach for thirty days before it goes live on the site. If the coach says the product is fine but they would not recommend it to their friend, we delay the launch and start over. That has happened four times.',
      },
      {
        q: 'What is the test you have not yet figured out?',
        a: 'Long-term joy. We can measure load. We can measure durability. We have not yet figured out how to measure whether a customer will still be excited to pick the product up two years from now. That is the test we are still building.',
      },
    ],
    facts: [
      { value: '10,000', label: 'Min rep cycles' },
      { value: '30 days', label: 'Coach trial' },
      { value: '4', label: 'Delayed launches' },
      { value: '0', label: 'Compromised SKUs' },
    ],
  },
  {
    id: 5,
    slug: 'the-handshake-protocol',
    title: 'The handshake protocol',
    subtitle:
      'Our customer service does not start at the keyboard. It starts at the dispatch table.',
    category: 'Service',
    location: 'Across India',
    year: 'Always',
    readTime: '5 min read',
    heroImage:
      'https://images.unsplash.com/photo-1590487988256-9ed24133863e?crop=entropy&cs=srgb&fm=jpg&q=85&w=2200',
    coverImage:
      'https://images.unsplash.com/photo-1590487988256-9ed24133863e?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200',
    excerpt:
      'Six rules that govern every order, every reply, and every refund we have ever issued.',
    variant: 'manifesto',
    rules: [
      {
        n: '01',
        title: 'The package is part of the product.',
        body:
          'A dumbbell that arrives bent is not a delivery problem. It is a product problem. We pack as if the box itself is on display.',
      },
      {
        n: '02',
        title: 'Reply in the language of the question.',
        body:
          'If a customer writes to us in Marathi, we reply in Marathi. If they write to us in five-word sentences, we do not respond with five paragraphs.',
      },
      {
        n: '03',
        title: 'Never make a customer prove themselves.',
        body:
          'If a band snapped in week three, we do not ask for a video, a serial number, a receipt. We replace. We learn. We move on.',
      },
      {
        n: '04',
        title: 'Returns are a conversation, not a process.',
        body:
          'Our return window is seven days. Every one of those returns is read by a human who asks one follow-up question — not to argue, but to learn.',
      },
      {
        n: '05',
        title: 'A two-hour reply is the slow option.',
        body:
          'Our service window is 10 am to 6 pm Mon–Sat. The team has standing permission to reply at any hour from any city, but the promise stays: under two hours, every time.',
      },
      {
        n: '06',
        title: 'Refund first. Investigate later.',
        body:
          'If a refund is right, it is processed before any internal review. The bank takes time. The customer should not have to.',
      },
    ],
    closing:
      'These six rules are printed and pinned next to every dispatch table in our warehouse. They are also pinned, in slightly smaller font, above every customer service laptop.',
  },
];

export const getStoryBySlug = (slug) =>
  stories.find((s) => s.slug === slug) || null;

export const getOtherStories = (slug) =>
  stories.filter((s) => s.slug !== slug).slice(0, 3);

export default stories;
