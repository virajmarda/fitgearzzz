import React, { useEffect, useMemo, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  ArrowRight,
  ChevronDown,
  Dumbbell,
  Flame,
  Sparkles,
  Target,
  Users,
  Zap,
} from 'lucide-react';

const Story = () => {
  const [activeSection, setActiveSection] = useState('hero');

  const sections = useMemo(
    () => [
      { id: 'hero', label: 'Intro' },
      { id: 'problem', label: 'Pain' },
      { id: 'origin', label: 'Origin' },
      { id: 'craft', label: 'Craft' },
      { id: 'tribe', label: 'Tribe' },
      { id: 'future', label: 'Future' },
      { id: 'finale', label: 'Join' },
    ],
    []
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target?.id) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        threshold: [0.2, 0.35, 0.5, 0.7],
        rootMargin: '-10% 0px -20% 0px',
      }
    );

    sections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#05070b] text-white">
      <StoryStyles />

      <ProgressRail
        sections={sections}
        activeSection={activeSection}
        onNavigate={scrollToSection}
      />

      <HeroSection onScrollNext={() => scrollToSection('problem')} />
      <ProblemSection />
      <OriginSection />
      <CraftSection />
      <TribeSection />
      <FutureSection />
      <FinaleSection />
    </div>
  );
};

const ProgressRail = ({ sections, activeSection, onNavigate }) => {
  return (
    <div className="fixed right-8 top-1/2 z-50 hidden -translate-y-1/2 lg:flex flex-col gap-3">
      {sections.map((section) => {
        const isActive = activeSection === section.id;

        return (
          <button
            key={section.id}
            onClick={() => onNavigate(section.id)}
            className={`group flex items-center justify-end gap-3 transition-all duration-300 ${
              isActive ? 'opacity-100' : 'opacity-50 hover:opacity-90'
            }`}
            aria-label={`Go to ${section.label}`}
          >
            <span
              className={`text-[10px] uppercase tracking-[0.28em] transition-all duration-300 ${
                isActive ? 'text-white' : 'text-white/45'
              }`}
            >
              {section.label}
            </span>

            <span
              className={`block rounded-full border transition-all duration-300 ${
                isActive
                  ? 'h-9 w-9 border-orange-400 bg-orange-400 text-black shadow-[0_0_30px_rgba(251,146,60,0.4)]'
                  : 'h-3 w-3 border-white/30 bg-white/10 group-hover:border-white/60'
              }`}
            />
          </button>
        );
      })}
    </div>
  );
};

const HeroSection = ({ onScrollNext }) => {
  const { scrollYProgress } = useScroll();
  const glowY = useTransform(scrollYProgress, [0, 0.2], [0, 160]);
  const textY = useTransform(scrollYProgress, [0, 0.18], [0, 90]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.16], [1, 0.35]);

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 md:px-10"
    >
      <motion.div style={{ y: glowY }} className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(249,115,22,0.16),transparent_28%),radial-gradient(circle_at_80%_25%,rgba(255,255,255,0.07),transparent_18%),radial-gradient(circle_at_50%_75%,rgba(234,88,12,0.18),transparent_26%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#040507_0%,#05070b_28%,#0a0d12_100%)]" />
        <div className="story-grid absolute inset-0 opacity-[0.08]" />
      </motion.div>

      <div className="relative z-10 w-full max-w-6xl">
        <motion.div
          style={{ y: textY, opacity: textOpacity }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl"
        >
          <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-xl">
            <Sparkles className="h-4 w-4 text-orange-300" />
            <span className="text-[11px] uppercase tracking-[0.34em] text-white/70">
              Watch Story
            </span>
          </div>

          <p className="mb-4 text-[11px] uppercase tracking-[0.4em] text-orange-300/90">
            FitGearzzz / Brand Narrative
          </p>

          <h1 className="max-w-5xl font-serif text-5xl leading-[0.95] md:text-7xl xl:text-[7.5rem]">
            This is not
            <span className="block text-white/60"> about fitness gear.</span>
            <span className="mt-2 block text-white">It is about who refuses to quit.</span>
          </h1>

          <p className="mt-8 max-w-2xl text-base leading-8 text-white/72 md:text-xl">
            FitGearzzz was built for the person who shows up before the applause,
            before the transformation, before anyone notices. This page is not a video.
            It is a living, scrolling story designed to feel like a film you walk through.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <button
              onClick={onScrollNext}
              className="group inline-flex min-h-[52px] items-center gap-3 rounded-full bg-orange-400 px-7 py-3 text-[12px] font-semibold uppercase tracking-[0.24em] text-black transition-all duration-300 hover:bg-orange-300 hover:shadow-[0_15px_50px_rgba(251,146,60,0.35)]"
            >
              Enter the Story
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>

            <a
              href="/products"
              className="inline-flex min-h-[52px] items-center rounded-full border border-white/15 px-7 py-3 text-[12px] font-semibold uppercase tracking-[0.24em] text-white/85 transition-all duration-300 hover:border-white/35 hover:bg-white/6"
            >
              Explore Gear
            </a>
          </div>
        </motion.div>
      </div>

      <button
        onClick={onScrollNext}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3 text-white/55 transition hover:text-white"
        aria-label="Scroll to next section"
      >
        <span className="text-[10px] uppercase tracking-[0.35em]">Scroll</span>
        <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
          <ChevronDown className="h-5 w-5 animate-bounce" />
        </span>
      </button>
    </section>
  );
};

const ProblemSection = () => {
  const cards = [
    {
      icon: Flame,
      title: 'The grind was real.',
      text: 'Crowded gyms. Broken promises. Cheap products dressed up like premium performance.',
    },
    {
      icon: Zap,
      title: 'Motivation was not the issue.',
      text: 'People were willing to sweat, struggle, and stay disciplined. The tools around them were failing first.',
    },
    {
      icon: Target,
      title: 'The problem was trust.',
      text: 'In fitness, one weak detail breaks momentum. Bad gear doesn’t just disappoint. It interrupts identity.',
    },
  ];

  return (
    <section
      id="problem"
      className="relative flex min-h-screen items-center px-6 py-24 md:px-10 lg:px-16"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(255,255,255,0.04),transparent_18%),radial-gradient(circle_at_80%_80%,rgba(249,115,22,0.12),transparent_25%)]" />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-14 lg:grid-cols-[0.9fr,1.1fr]">
        <motion.div
          initial={{ opacity: 0, x: -28 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.9 }}
        >
          <p className="mb-4 text-[11px] uppercase tracking-[0.35em] text-orange-300/90">
            Chapter I / The Pain
          </p>

          <h2 className="max-w-xl font-serif text-4xl leading-tight md:text-6xl">
            Before a brand is born,
            <span className="block text-white/55">frustration writes the first line.</span>
          </h2>

          <p className="mt-8 max-w-xl text-base leading-8 text-white/70">
            FitGearzzz did not begin as a business fantasy. It began as a reaction to
            disappointment, repetition, weak products, and a market that often looked
            stronger online than it felt in real life.
          </p>
        </motion.div>

        <div className="grid gap-5">
          {cards.map((card, index) => {
            const Icon = card.icon;

            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.8, delay: index * 0.08 }}
                className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.045] p-7 backdrop-blur-md transition duration-500 hover:border-orange-300/30 hover:bg-white/[0.06] md:p-9"
              >
                <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(249,115,22,0.0),rgba(249,115,22,0.08),rgba(255,255,255,0.0))] opacity-0 transition duration-500 group-hover:opacity-100" />

                <div className="relative z-10 flex items-start gap-5">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                    <Icon className="h-6 w-6 text-orange-300" />
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white">{card.title}</h3>
                    <p className="mt-3 max-w-xl text-[15px] leading-7 text-white/68">
                      {card.text}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const OriginSection = () => {
  const timeline = [
    {
      year: '01',
      title: 'Notice the gap',
      text: 'The market was full of noise, but not enough honesty. People wanted performance, not polished deception.',
    },
    {
      year: '02',
      title: 'Take the risk',
      text: 'Instead of accepting what existed, the decision was made to create a sharper standard and a stronger voice.',
    },
    {
      year: '03',
      title: 'Build the story',
      text: 'FitGearzzz became more than a name. It became a signal for grit, discipline, and better choices.',
    },
  ];

  return (
    <section id="origin" className="relative min-h-screen px-6 py-24 md:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.8 }}
          className="mb-14 max-w-3xl"
        >
          <p className="mb-4 text-[11px] uppercase tracking-[0.35em] text-orange-300/90">
            Chapter II / The Origin
          </p>

          <h2 className="font-serif text-4xl leading-tight md:text-6xl">
            Every powerful brand begins
            <span className="block text-white/58">with a refusal.</span>
          </h2>

          <p className="mt-8 text-base leading-8 text-white/70">
            This was the turning point. Not the moment of success, but the moment
            of no return. The choice to stop waiting for better and start shaping it.
          </p>
        </motion.div>

        <div className="relative grid gap-8 lg:grid-cols-[1fr,1.2fr]">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9 }}
            className="relative overflow-hidden rounded-[34px] border border-white/10 bg-[linear-gradient(160deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] p-8 md:p-10"
          >
            <div className="story-noise absolute inset-0 opacity-[0.08]" />

            <div className="relative z-10 flex h-full flex-col justify-between">
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-black/20 px-4 py-2 text-[10px] uppercase tracking-[0.28em] text-white/72">
                Founder energy
              </div>

              <div className="mt-20">
                <p className="max-w-md text-2xl font-serif leading-relaxed text-white/92 md:text-3xl">
                  “The story was never about selling products. It was about building
                  a standard people could feel.”
                </p>
                <p className="mt-6 text-sm uppercase tracking-[0.3em] text-white/45">
                  FitGearzzz philosophy
                </p>
              </div>
            </div>
          </motion.div>

          <div className="relative">
            <div className="absolute bottom-0 left-[18px] top-0 w-px bg-gradient-to-b from-orange-300 via-white/20 to-transparent" />

            <div className="space-y-8">
              {timeline.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: 34 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.8, delay: index * 0.08 }}
                  className="relative pl-16"
                >
                  <span className="absolute left-0 top-1 flex h-10 w-10 items-center justify-center rounded-full border border-orange-300/30 bg-orange-400/15 text-[11px] font-semibold tracking-[0.2em] text-orange-200">
                    {item.year}
                  </span>

                  <div className="rounded-[24px] border border-white/8 bg-white/[0.03] p-6 md:p-7">
                    <h3 className="text-xl font-semibold">{item.title}</h3>
                    <p className="mt-3 max-w-xl text-[15px] leading-7 text-white/68">
                      {item.text}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const CraftSection = () => {
  const features = [
    {
      title: 'Designed for pressure',
      text: 'The visual language is clean because discipline is clean. No chaos. No clutter. Only force, focus, and form.',
      stat: 'Precision',
    },
    {
      title: 'Built from restraint',
      text: 'A premium brand does not scream. It controls contrast, pacing, spacing, and emotional weight with purpose.',
      stat: 'Control',
    },
    {
      title: 'Made to disappear into performance',
      text: 'The best product experience does not distract the athlete. It supports confidence so completely it becomes invisible.',
      stat: 'Flow',
    },
  ];

  return (
    <section id="craft" className="relative min-h-screen px-6 py-24 md:px-10 lg:px-16">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,rgba(249,115,22,0.10),transparent_22%),radial-gradient(circle_at_20%_80%,rgba(255,255,255,0.05),transparent_18%)]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid items-end gap-12 lg:grid-cols-[0.95fr,1.05fr]">
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.8 }}
          >
            <p className="mb-4 text-[11px] uppercase tracking-[0.35em] text-orange-300/90">
              Chapter III / The Craft
            </p>

            <h2 className="font-serif text-4xl leading-tight md:text-6xl">
              Premium is not decoration.
              <span className="block text-white/56">Premium is control.</span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.8, delay: 0.08 }}
            className="max-w-2xl text-base leading-8 text-white/70"
          >
            This page is designed like a physical experience: tension in the dark,
            relief in the spacing, emotional beats in the pacing, and confidence in
            every interaction. It should feel expensive before a single product is sold.
          </motion.p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 34 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.75, delay: index * 0.08 }}
              className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.035] p-7 md:min-h-[320px]"
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-orange-300/60 to-transparent opacity-60" />
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-orange-400/10 blur-3xl transition duration-500 group-hover:bg-orange-400/20" />

              <p className="text-[11px] uppercase tracking-[0.3em] text-white/42">
                {feature.stat}
              </p>
              <h3 className="mt-6 text-2xl font-semibold leading-tight">{feature.title}</h3>
              <p className="mt-5 text-[15px] leading-7 text-white/68">{feature.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const TribeSection = () => {
  const stories = [
    {
      quote: 'I didn’t need hype. I needed gear and a brand that respected the grind.',
      name: 'The disciplined beginner',
    },
    {
      quote: 'This feels less like shopping and more like entering a mindset.',
      name: 'The serious upgrader',
    },
    {
      quote: 'Finally, a fitness brand that feels cinematic, not generic.',
      name: 'The aesthetic athlete',
    },
    {
      quote: 'I came for products. I stayed for the identity.',
      name: 'The loyal believer',
    },
  ];

  return (
    <section id="tribe" className="relative min-h-screen px-6 py-24 md:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <p className="mb-4 text-[11px] uppercase tracking-[0.35em] text-orange-300/90">
            Chapter IV / The Tribe
          </p>

          <h2 className="font-serif text-4xl leading-tight md:text-6xl">
            A brand becomes unforgettable
            <span className="block text-white/56">when people see themselves inside it.</span>
          </h2>

          <p className="mt-8 text-base leading-8 text-white/70">
            This chapter is about belonging. The strongest fitness brands do not just
            sell equipment. They create identity, energy, and a culture users want to
            carry publicly.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {stories.map((story, index) => (
            <motion.div
              key={story.name}
              initial={{ opacity: 0, y: 34 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.75, delay: index * 0.08 }}
              className="group relative overflow-hidden rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.025))] p-7"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(249,115,22,0.14),transparent_35%)] opacity-0 transition duration-500 group-hover:opacity-100" />

              <div className="relative z-10">
                <div className="mb-10 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-black/20">
                  <Users className="h-6 w-6 text-orange-300" />
                </div>

                <p className="text-lg leading-8 text-white/86">“{story.quote}”</p>

                <p className="mt-8 text-[11px] uppercase tracking-[0.28em] text-white/45">
                  {story.name}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FutureSection = () => {
  const pillars = [
    {
      icon: Dumbbell,
      title: 'Stronger products',
      text: 'Refined quality, better curation, and a sharper premium lens across every category.',
    },
    {
      icon: Target,
      title: 'Sharper positioning',
      text: 'Not just another gear site. A focused identity for serious people who want more from themselves.',
    },
    {
      icon: Sparkles,
      title: 'A world-class experience',
      text: 'Design, trust, conversion, and storytelling working together as one premium ecosystem.',
    },
  ];

  return (
    <section id="future" className="relative min-h-screen px-6 py-24 md:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl rounded-[36px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.02))] px-6 py-14 md:px-12 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <p className="mb-4 text-[11px] uppercase tracking-[0.35em] text-orange-300/90">
            Chapter V / The Future
          </p>

          <h2 className="text-white font-serif text-4xl leading-tight md:text-6xl">
            The final goal is not attention.
            <span className="block text-white/56">It is legacy.</span>
          </h2>

          <p className="mt-8 text-base leading-8 text-white/70">
            FitGearzzz should feel like the beginning of a larger world: premium,
            disciplined, distinctive, and impossible to confuse with anyone else.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;

            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 34 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.75, delay: index * 0.08 }}
                className="rounded-[28px] border border-white/10 bg-black/20 p-7"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-orange-300/25 bg-orange-400/10">
                  <Icon className="h-6 w-6 text-orange-300" />
                </div>

                <h3 className="mt-7 text-2xl font-semibold">{pillar.title}</h3>
                <p className="mt-4 text-[15px] leading-7 text-white/68">{pillar.text}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const FinaleSection = () => {
  return (
    <section
      id="finale"
      className="relative flex min-h-screen items-center px-6 py-24 md:px-10 lg:px-16"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(249,115,22,0.15),transparent_28%)]" />

      <motion.div
        initial={{ opacity: 0, y: 34 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.85 }}
        className="relative z-10 mx-auto max-w-4xl text-center"
      >
        <p className="mb-4 text-[11px] uppercase tracking-[0.35em] text-orange-300/90">
          Epilogue
        </p>

        <h2 className="font-serif text-4xl leading-tight md:text-6xl xl:text-7xl">
          If this story feels personal,
          <span className="block text-white/58">that is the point.</span>
        </h2>

        <p className="mx-auto mt-8 max-w-2xl text-base leading-8 text-white/70 md:text-lg">
          FitGearzzz is for people who are done with average, done with generic,
          and ready to train with more intention. The next chapter begins when
          the visitor stops reading and starts identifying.
        </p>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <a
            href="/products"
            className="group inline-flex min-h-[54px] items-center gap-3 rounded-full bg-orange-400 px-8 py-3 text-[12px] font-semibold uppercase tracking-[0.25em] text-black transition-all duration-300 hover:bg-orange-300 hover:shadow-[0_18px_60px_rgba(251,146,60,0.38)]"
          >
            Explore The Gear
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>

          <a
            href="/contact"
            className="inline-flex min-h-[54px] items-center rounded-full border border-white/15 px-8 py-3 text-[12px] font-semibold uppercase tracking-[0.25em] text-white/85 transition-all duration-300 hover:border-white/35 hover:bg-white/6"
          >
            Build With Us
          </a>
        </div>
      </motion.div>
    </section>
  );
};

const StoryStyles = () => (
  <style>{`
    .story-grid {
      background-image:
        linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
      background-size: 90px 90px;
      mask-image: radial-gradient(circle at center, black 35%, transparent 90%);
      -webkit-mask-image: radial-gradient(circle at center, black 35%, transparent 90%);
    }

    .story-noise {
      background-image:
        radial-gradient(rgba(255,255,255,0.12) 0.7px, transparent 0.7px);
      background-size: 18px 18px;
    }

    html {
      scroll-behavior: smooth;
    }

    body {
      background: #05070b;
    }

    @media (prefers-reduced-motion: reduce) {
      html {
        scroll-behavior: auto;
      }
    }
  `}</style>
);

export default Story;
