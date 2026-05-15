import React, { useEffect, useRef, useState } from "react";
import "./styles/Story.css";

const chapters = [
  {
    id: "act-1",
    label: "Act I",
    title: "The wake-up call",
    kicker: "Origin",
    text: "FitGearzzz was born from that one moment when excuses finally felt heavier than the weights. No fancy gym, no sponsorships—just raw frustration and a resolve to build gear that never lets you hide from your potential.",
  },
  {
    id: "act-2",
    label: "Act II",
    title: "Built in the grind",
    kicker: "Relentless testing",
    text: "Every strap, every band, every piece of gear was tested in real sweat—late-night sessions, cramped rooms, and makeshift setups. If something slipped, tore, or failed, it never made it to the store.",
  },
  {
    id: "act-3",
    label: "Act III",
    title: "From one room to a tribe",
    kicker: "Community",
    text: "What started as orders from a single room turned into a tribe of people who chose discipline over doubt. FitGearzzz became less about products and more about a promise to never go back to the old version of yourself.",
  },
  {
    id: "act-4",
    label: "Act IV",
    title: "This is your chapter",
    kicker: "Where you enter",
    text: "The story is unfinished on purpose. Every time you pick up a FitGearzzz product, you’re writing the next line—one more rep, one more early morning, one more version of you that refuses to quit.",
  },
];

function useInView(options = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      {
        threshold: 0.2,
        ...options,
      }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [options]);

  return [ref, inView];
}

const Story = () => {
  const [activeChapter, setActiveChapter] = useState(chapters[0].id);

  // Track active section for progress indicator
  useEffect(() => {
    const sectionEls = chapters.map((c) => document.getElementById(c.id));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          setActiveChapter(visible[0].target.id);
        }
      },
      { threshold: 0.35 }
    );

    sectionEls.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollToChapter = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    window.scrollTo({
      top: el.offsetTop - 80,
      behavior: "smooth",
    });
  };

  const scrollToFirstChapter = () => scrollToChapter(chapters[0].id);

  return (
    <div className="story-page">
      {/* HERO */}
      <section className="story-hero" id="top">
        <div className="story-hero-inner">
          <p className="story-hero-kicker">FitGearzzz • Origin Story</p>
          <h1 className="story-hero-title">
            Transform your potential.
            <br />
            Transform your life.
          </h1>
          <p className="story-hero-subtitle">
            This isn’t just a brand story. It’s the moment you stop watching
            motivation and start living it—rep after rep, day after day.
          </p>

          <div className="story-hero-actions">
            <button
              className="story-btn story-btn-primary"
              onClick={scrollToFirstChapter}
            >
              Start the story
            </button>
            <a href="/products" className="story-btn story-btn-secondary">
              Explore the gear
            </a>
          </div>

          <div className="story-hero-scroll">
            <span className="story-hero-scroll-line" />
            <span className="story-hero-scroll-label">Scroll to begin</span>
          </div>
        </div>

        <div className="story-hero-bg-accent" />
      </section>

      {/* PROGRESS INDICATOR (DESKTOP) */}
      <aside className="story-progress">
        <div className="story-progress-rail">
          {chapters.map((chapter) => (
            <button
              key={chapter.id}
              className={`story-progress-dot ${
                activeChapter === chapter.id ? "is-active" : ""
              }`}
              onClick={() => scrollToChapter(chapter.id)}
            >
              <span className="story-progress-dot-label">
                {chapter.label}
              </span>
            </button>
          ))}
        </div>
      </aside>

      {/* MANIFESTO BLOCK */}
      <ManifestoBlock />

      {/* CHAPTERS */}
      <main className="story-main">
        {chapters.map((chapter, index) => (
          <StoryChapter
            key={chapter.id}
            chapter={chapter}
            index={index}
          />
        ))}

        <TribeSection />
      </main>
    </div>
  );
};

const ManifestoBlock = () => {
  const [ref, inView] = useInView();

  return (
    <section
      ref={ref}
      className={`story-manifesto ${inView ? "is-visible" : ""}`}
    >
      <p className="story-manifesto-label">Manifesto</p>
      <p className="story-manifesto-text">
        Time does not care. Motivation fades. The only thing that stays is the
        work you put in. FitGearzzz exists so you never have an excuse when it
        is time to show up.
      </p>
    </section>
  );
};

const StoryChapter = ({ chapter, index }) => {
  const [ref, inView] = useInView();
  const isEven = index % 2 === 0;

  return (
    <section
      id={chapter.id}
      ref={ref}
      className={`story-chapter ${inView ? "is-visible" : ""} ${
        isEven ? "is-even" : "is-odd"
      }`}
    >
      <div className="story-chapter-inner">
        <div className="story-chapter-copy">
          <p className="story-chapter-kicker">{chapter.kicker}</p>
          <h2 className="story-chapter-title">{chapter.title}</h2>
          <p className="story-chapter-text">{chapter.text}</p>
        </div>

        <div className="story-chapter-visual">
          <div className="story-chapter-visual-card">
            <div className="story-chapter-visual-gradient" />
            <p className="story-chapter-visual-tag">
              {chapter.label}
            </p>
            <p className="story-chapter-visual-line">
              {index === 0 &&
                "From a single room, packing orders between study sessions and late-night workouts."}
              {index === 1 &&
                "Gear tested in real sweat—doors locked, music loud, reps until the room felt like a furnace."}
              {index === 2 &&
                "DMs from strangers turning into progress photos and stories of lives quietly being rebuilt."}
              {index === 3 &&
                "Every time you add one more rep, the story writes one more line. This chapter has your name on it."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const TribeSection = () => {
  const [ref, inView] = useInView();

  return (
    <section
      ref={ref}
      className={`story-tribe ${inView ? "is-visible" : ""}`}
    >
      <div className="story-tribe-inner">
        <p className="story-tribe-kicker">The FitGearzzz tribe</p>
        <h2 className="story-tribe-title">
          Not influencers. Not actors.
          <br />
          Just people who refused to quit.
        </h2>
        <p className="story-tribe-text">
          Every order shipped from that first room was a silent promise: this
          gear will see the worst and best of you and still be there when you
          are ready for round two.
        </p>

        <div className="story-tribe-grid">
          <div className="story-tribe-card">
            <p className="story-tribe-stat">50K+</p>
            <p className="story-tribe-label">Workouts powered</p>
            <p className="story-tribe-desc">
              Sessions tracked, sweat logged, and tiny wins stacked over time.
            </p>
          </div>
          <div className="story-tribe-card">
            <p className="story-tribe-stat">4.9 / 5</p>
            <p className="story-tribe-label">Average rating</p>
            <p className="story-tribe-desc">
              Real feedback from people who test gear with brutal honesty.
            </p>
          </div>
          <div className="story-tribe-card">
            <p className="story-tribe-stat">1</p>
            <p className="story-tribe-label">Decision</p>
            <p className="story-tribe-desc">
              The only thing between you and your story: the choice to start
              today instead of tomorrow.
            </p>
          </div>
        </div>

        <div className="story-tribe-cta">
          <a href="/products" className="story-btn story-btn-primary">
            Join the story
          </a>
          <a href="/contact" className="story-btn story-btn-secondary">
            Talk to the team
          </a>
        </div>
      </div>
    </section>
  );
};

export default Story;
