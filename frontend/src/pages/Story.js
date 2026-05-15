import React, { useEffect, useRef, useState } from "react";
import "./Story.css";

const chapters = [
  {
    id: "act-1",
    label: "Act I",
    title: "It started with a problem",
    kicker: "The gap",
    text:
      "Before this brand existed, there was a simple, frustrating pattern: people were serious about changing, but the tools around them were not. Gear slipped when effort peaked, bands snapped mid-session, and most products were built for polished photos instead of real progress.",
    detail:
      "The deeper we looked, the clearer the gap became. Workouts were built on discipline and discomfort, yet the equipment was built around shortcuts and aesthetics. There was no single, reliable ecosystem designed for people who genuinely wanted to show up, not just pose. The problem was not motivation alone; it was the environment that made staying consistent harder than it needed to be.",
  },
  {
    id: "act-2",
    label: "Act II",
    title: "Many attempts, honest failures",
    kicker: "The search",
    text:
      "The first instinct was not to build something new, but to search harder. Dozens of products were tested, mixed, matched, and combined, hoping the right setup already existed somewhere.",
    detail:
      "It didn’t. Some solutions were strong but uncomfortable. Others looked promising but broke under real pressure. Over time, a pattern emerged: whenever effort was at its highest, the gear was at its weakest. Those honest failures made one thing obvious—waiting for a perfect solution was just another form of delay. If the right system did not exist, it needed to be built from the ground up.",
  },
  {
    id: "act-3",
    label: "Act III",
    title: "Designing the solution",
    kicker: "The build",
    text:
      "The brand was created around a single principle: equipment should disappear in the moment of effort. No distractions, no drama, no fragile finishes—just tools that feel almost invisible when focus is at its peak.",
    detail:
      "Every detail was questioned: grip texture, band tension, stitching strength, materials, and how each element behaved on the hundredth use, not the first. Prototypes were refined, ruined, and rebuilt. The solution was not a single product but a connected system, designed to support the full journey from first attempt to long-term discipline.",
  },
  {
    id: "act-4",
    label: "Act IV",
    title: "Progress in motion",
    kicker: "The journey now",
    text:
      "Once the solution was real, the real story began. People started using the gear not as an accessory, but as a quiet constant in their routine.",
    detail:
      "Sessions became more consistent, not because everything felt easy, but because the environment finally stopped working against the person using it. The brand evolved from a response to a problem into a platform for steady, measurable progress. The journey is still moving—new ideas, new iterations, and new ways to remove friction from the path between intention and action.",
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

  // Track active section for progress indicator + curve
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
          <div className="story-hero-pill">
            <span className="story-hero-pill-dot" />
            <span className="story-hero-pill-text">Watch the brand story</span>
          </div>

          <h1 className="story-hero-title">
            It didn’t begin with a logo.
            <br />
            It began with a problem no one was fixing.
          </h1>

          <p className="story-hero-subtitle">
            This page is the journey from that first problem to a working
            solution: the attempts that failed, the work that followed, and the
            key moments that turned an idea into a progressing reality.
          </p>

          <div className="story-hero-meta">
            <div className="story-hero-meta-item">
              <span className="story-hero-meta-label">Structure</span>
              <span className="story-hero-meta-value">Problem → Attempts → Solution → Progress</span>
            </div>
            <div className="story-hero-meta-item">
              <span className="story-hero-meta-label">Focus</span>
              <span className="story-hero-meta-value">Real use, not appearance</span>
            </div>
            <div className="story-hero-meta-item">
              <span className="story-hero-meta-label">Status</span>
              <span className="story-hero-meta-value">Story in motion</span>
            </div>
          </div>

          <div className="story-hero-actions">
            <button
              className="story-btn story-btn-primary"
              onClick={scrollToFirstChapter}
            >
              Begin Act I
            </button>
            <a href="/" className="story-btn story-btn-secondary">
              Back to home
            </a>
          </div>

          <div className="story-hero-scroll">
            <span className="story-hero-scroll-line" />
            <span className="story-hero-scroll-label">
              Scroll to follow the curve
            </span>
          </div>
        </div>

        <div className="story-hero-bg-accent" />
        <div className="story-hero-bg-rings" />
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

      {/* MANIFESTO + MAIN SHELL WITH CURVE */}
      <ManifestoBlock />

      <div className="story-main-shell">
        <JourneyCurve activeChapter={activeChapter} />

        <main className="story-main">
          <PrequelSection />

          {chapters.map((chapter, index) => (
            <StoryChapter
              key={chapter.id}
              chapter={chapter}
              index={index}
            />
          ))}

          <TurningPointSection />
          <TribeSection />
          <FutureSection />
        </main>
      </div>
    </div>
  );
};

const JourneyCurve = ({ activeChapter }) => {
  return (
    <div className="story-curve-wrapper" aria-hidden="true">
      <svg
        className="story-curve"
        viewBox="0 0 300 1400"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="curveGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="rgba(148,163,184,0.3)" />
            <stop offset="45%" stopColor="rgba(249,115,22,0.6)" />
            <stop offset="100%" stopColor="rgba(148,163,184,0.25)" />
          </linearGradient>
        </defs>
        <path
          d="M 60 40
             C 210 160, 40 320, 200 460
             S 40 760, 210 900
             S 40 1160, 200 1300"
          fill="none"
          stroke="url(#curveGradient)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="8 14"
        />
      </svg>

      {/* Subtle glowing nodes roughly aligned with chapter cards */}
      <div
        className={`story-curve-node node-1 ${
          activeChapter === "act-1" ? "is-active" : ""
        }`}
      />
      <div
        className={`story-curve-node node-2 ${
          activeChapter === "act-2" ? "is-active" : ""
        }`}
      />
      <div
        className={`story-curve-node node-3 ${
          activeChapter === "act-3" ? "is-active" : ""
        }`}
      />
      <div
        className={`story-curve-node node-4 ${
          activeChapter === "act-4" ? "is-active" : ""
        }`}
      />
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
      <p className="story-manifesto-label">Principle</p>
      <p className="story-manifesto-text">
        When people are serious about changing, the tools around them should be
        equally serious. This brand exists so that effort is never wasted
        because of weak equipment, poor design, or shortcuts.
      </p>
    </section>
  );
};

const PrequelSection = () => {
  const [ref, inView] = useInView();

  return (
    <section
      ref={ref}
      className={`story-prequel ${inView ? "is-visible" : ""}`}
    >
      <div className="story-prequel-inner">
        <div className="story-prequel-copy">
          <p className="story-prequel-kicker">Before the solution</p>
          <h2 className="story-prequel-title">
            The environment made consistency harder than it should be.
          </h2>
          <p className="story-prequel-text">
            People were willing to put in the work, but the tools in their
            hands were built for marketing angles and highlight reels. Handles
            looked premium until they were actually used. Surfaces were smooth
            for photos but slippery in real sessions. Most gear was designed to
            be seen, not to be trusted.
          </p>
          <p className="story-prequel-text">
            The idea of this brand was not to create yet another product line,
            but to rebuild the training environment so that it stopped fighting
            the person using it. The story that follows is how that idea turned
            into a system.
          </p>
        </div>
        <div className="story-prequel-aside">
          <p className="story-prequel-aside-label">Core question</p>
          <p className="story-prequel-aside-text">
            What if every piece of equipment around you was designed to stay
            quiet and reliable, so you could focus only on the work that
            actually changes your life?
          </p>
        </div>
      </div>
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
          <p className="story-chapter-detail">{chapter.detail}</p>
        </div>

        <div className="story-chapter-visual">
          <div className="story-chapter-visual-card">
            <div className="story-chapter-visual-gradient" />
            <p className="story-chapter-visual-tag">
              {chapter.label}
            </p>
            <p className="story-chapter-visual-line">
              {index === 0 &&
                "It became clear that the real obstacle was not a lack of desire, but an environment that constantly interrupted momentum just when it was most fragile."}
              {index === 1 &&
                "Those deliberate failures were the turning point: instead of searching for the perfect product, the focus shifted to designing one that earned trust through performance, not promises."}
              {index === 2 &&
                "Prototypes moved from sketches to consistent use. Every improvement came from asking a simple question: does this make it easier to stay committed over months, not just days?"}
              {index === 3 &&
                "With each iteration and each new user, the story shifted from frustration to measurable progress—and that shift is still underway right now."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const TurningPointSection = () => {
  const [ref, inView] = useInView();

  return (
    <section
      ref={ref}
      className={`story-turning ${inView ? "is-visible" : ""}`}
    >
      <div className="story-turning-inner">
        <div className="story-turning-header">
          <p className="story-turning-kicker">Key turning points</p>
          <h2 className="story-turning-title">
            From isolated problem to shared solution.
          </h2>
        </div>
        <div className="story-turning-grid">
          <div className="story-turning-card">
            <p className="story-turning-label">Recognition</p>
            <p className="story-turning-text">
              The first shift came when the problem was named clearly: people
              were serious about their goals, but the equipment was not built
              to match that seriousness. Once the problem was defined, every
              decision around design became sharper.
            </p>
          </div>
          <div className="story-turning-card">
            <p className="story-turning-label">First release</p>
            <p className="story-turning-text">
              The next turning point was committing to a public release. Instead
              of waiting for perfection, the brand launched with the standard
              that any flaw discovered would be fixed quickly and transparently.
              That decision created a direct feedback loop between real use and
              rapid improvement.
            </p>
          </div>
          <div className="story-turning-card">
            <p className="story-turning-label">Momentum</p>
            <p className="story-turning-text">
              As more people used the gear, the story moved from theory to
              proof. Consistency improved, sessions felt smoother, and the
              equipment turned into a quiet constant. The brand became less
              about what it looked like and more about the results it
              supported.
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
        <p className="story-tribe-kicker">The people behind the numbers</p>
        <h2 className="story-tribe-title">
          A community built on effort, not noise.
        </h2>
        <p className="story-tribe-text">
          The brand’s progress is measured less in followers and more in quiet
          metrics: sessions completed, streaks maintained, and people who moved
          from starting over to steadily moving forward.
        </p>

        <div className="story-tribe-grid">
          <div className="story-tribe-card">
            <p className="story-tribe-stat">50K+</p>
            <p className="story-tribe-label">Workouts supported</p>
            <p className="story-tribe-desc">
              Sessions where the equipment stayed out of the way, letting
              effort stay front and center.
            </p>
          </div>
          <div className="story-tribe-card">
            <p className="story-tribe-stat">4.9 / 5</p>
            <p className="story-tribe-label">Average rating</p>
            <p className="story-tribe-desc">
              Feedback from people who judge gear not by how it looks on a
              shelf, but how it feels on the tenth set.
            </p>
          </div>
          <div className="story-tribe-card">
            <p className="story-tribe-stat">1</p>
            <p className="story-tribe-label">Decision</p>
            <p className="story-tribe-desc">
              The same decision every person makes: keep letting the environment
              decide the outcome, or choose tools that finally match the level
              of commitment.
            </p>
          </div>
        </div>

        <div className="story-tribe-cta">
          <a href="/products" className="story-btn story-btn-primary">
            Explore the system
          </a>
          <a href="/contact" className="story-btn story-btn-secondary">
            Talk to the team
          </a>
        </div>
      </div>
    </section>
  );
};

const FutureSection = () => {
  const [ref, inView] = useInView();

  return (
    <section
      ref={ref}
      className={`story-future ${inView ? "is-visible" : ""}`}
    >
      <div className="story-future-inner">
        <p className="story-future-kicker">What comes next</p>
        <h2 className="story-future-title">
          The problem is smaller. The work continues.
        </h2>
        <p className="story-future-text">
          The original problem that started this story has been reduced, but
          not erased. There will always be new challenges, new conditions, and
          new demands on the body and mind. The brand’s role is to keep
          removing unnecessary friction so that energy can stay where it
          matters most.
        </p>
        <p className="story-future-text">
          Every new product, update, and iteration is measured against a simple
          standard: does this make it easier for someone serious about change
          to stay on track for longer? If the answer is no, it does not ship.
          That is how this story continues to move in the right direction.
        </p>

        <div className="story-future-actions">
          <a href="/products" className="story-btn story-btn-primary">
            See current solutions
          </a>
          <a href="/contact" className="story-btn story-btn-secondary">
            Suggest what’s missing
          </a>
        </div>
      </div>
    </section>
  );
};

export default Story;
