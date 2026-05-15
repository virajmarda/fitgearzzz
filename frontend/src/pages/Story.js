import React, { useEffect, useRef, useState } from "react";
import "./Story.css";

const chapters = [
  {
    id: "act-1",
    label: "Act I",
    title: "The wake-up call",
    kicker: "Origin",
    text: "Before FitGearzzz, there was just that one heavy feeling: scrolling fitness videos at 1:30 AM, promising that tomorrow would be different while the same excuses played in the background. No fancy gym. No perfect setup. Just a body that was tired of its own stories.",
    detail:
      "It was in those late-night gaps between study sessions and overthinking that the idea hit: what if the gear itself removed excuses? No slipping grips. No flimsy bands. No equipment that failed when motivation was already fragile. One decision: build gear so honest that it forced you to be honest with yourself.",
  },
  {
    id: "act-2",
    label: "Act II",
    title: "Built in the grind",
    kicker: "Relentless testing",
    text: "FitGearzzz didn’t start in a boardroom. It started in cramped rooms, iron that didn’t match, and music so loud it drowned every doubt. Every strap, band, and handle was abused in real sessions, not studio tests.",
    detail:
      "Workouts were the lab. If a strap slipped in the tenth set, it was redesigned. If a band snapped under real tension, it never made it past the door. Nights blurred into mornings, with spreadsheets on one side, order labels on the other, and prototypes thrown on the floor in between. The rule was simple: if it can’t survive our worst days, it doesn’t deserve your best days.",
  },
  {
    id: "act-3",
    label: "Act III",
    title: "From one room to a tribe",
    kicker: "Momentum",
    text: "The first orders lived in a single room: boxes stacked near a study table, printer cables snaking around dumbbells. No one saw those nights—but they felt the result when the gear arrived at their door.",
    detail:
      "DMs turned into progress photos. Short reviews turned into stories. People wrote about their first unbroken set, the morning they didn’t skip, the day they chose a workout over a party. FitGearzzz quietly transformed from ‘products shipped’ to ‘chapters written’ by people who were tired of quitting on themselves.",
  },
  {
    id: "act-4",
    label: "Act IV",
    title: "This is your chapter",
    kicker: "Where you enter",
    text: "Every story needs the moment where the main character decides enough is enough. This page is that moment for you.",
    detail:
      "Maybe you’re reading this between two tabs. Maybe you’ve promised yourself a ‘fresh start’ more times than you can count. FitGearzzz doesn’t promise shortcuts. It promises that every time you choose to show up, the gear will be there—no drama, no excuses, just you versus the work. From here, every rep is a sentence, every set is a paragraph, and months of consistency become a whole new book with your name on the cover.",
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
              Start the journey
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
      <div className={`story-curve-node node-1 ${activeChapter === "act-1" ? "is-active" : ""}`} />
      <div className={`story-curve-node node-2 ${activeChapter === "act-2" ? "is-active" : ""}`} />
      <div className={`story-curve-node node-3 ${activeChapter === "act-3" ? "is-active" : ""}`} />
      <div className={`story-curve-node node-4 ${activeChapter === "act-4" ? "is-active" : ""}`} />
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

const PrequelSection = () => {
  const [ref, inView] = useInView();

  return (
    <section
      ref={ref}
      className={`story-prequel ${inView ? "is-visible" : ""}`}
    >
      <div className="story-prequel-inner">
        <div className="story-prequel-copy">
          <p className="story-prequel-kicker">Before FitGearzzz</p>
          <h2 className="story-prequel-title">
            Every brand starts as a quiet problem.
          </h2>
          <p className="story-prequel-text">
            For us, it was that loop of starting, stopping, and starting again.
            Training with gear that slipped when hands got sweaty. Bands that
            snapped mid-set. Equipment that felt like it was designed for
            pretty photos, not ugly work.
          </p>
          <p className="story-prequel-text">
            FitGearzzz was imagined as the opposite: gear that feels invisible
            when you are locked in—no drama, no distractions, just you and the
            work you promised yourself you would do.
          </p>
        </div>
        <div className="story-prequel-aside">
          <p className="story-prequel-aside-label">The question</p>
          <p className="story-prequel-aside-text">
            What if the best version of you wasn’t waiting for a perfect gym,
            coach, or timing—just gear that refused to let you off the hook?
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
                "From a single desk with scribbled plans and a pair of worn-out dumbbells, the decision was made: no more fragile gear and no more fragile mindset."}
              {index === 1 &&
                "Prototypes were thrown on the floor, stitched again, pulled until fingers burned. Designs went through more sets than most people’s New Year resolutions."}
              {index === 2 &&
                "Names in the order list turned into faces, progress screenshots, and late-night messages from people who finally felt momentum instead of guilt."}
              {index === 3 &&
                "Every time you choose to show up—no matter how small the session—you bend the curve of this story in your favor."}
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
          <p className="story-turning-kicker">The turning point</p>
          <h2 className="story-turning-title">
            Every journey has a day that changes everything.
          </h2>
        </div>
        <div className="story-turning-grid">
          <div className="story-turning-card">
            <p className="story-turning-label">The decision</p>
            <p className="story-turning-text">
              For us, it was choosing to stop waiting for “someday” and launch
              with what we had. For you, it might be this exact scroll—the
              moment you decide that the next six months will not look like the
              last six.
            </p>
          </div>
          <div className="story-turning-card">
            <p className="story-turning-label">The test</p>
            <p className="story-turning-text">
              We promised that if the gear failed, we would fix it fast and in
              public. That same honesty is what we expect from you: show up,
              even when the session is short, and own both the wins and the
              missed days.
            </p>
          </div>
          <div className="story-turning-card">
            <p className="story-turning-label">The proof</p>
            <p className="story-turning-text">
              Thousands of workouts later, the story is clear: consistency
              beats motivation, and reliable gear makes consistency easier to
              choose. The rest of this page—and your life—flows from that truth.
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

const FutureSection = () => {
  const [ref, inView] = useInView();

  return (
    <section
      ref={ref}
      className={`story-future ${inView ? "is-visible" : ""}`}
    >
      <div className="story-future-inner">
        <p className="story-future-kicker">The pages ahead</p>
        <h2 className="story-future-title">
          The story doesn’t end here.
        </h2>
        <p className="story-future-text">
          This page is just the prologue. The real story is what happens when
          you take the next step: the first session with new straps, the first
          early alarm you don’t snooze, the first month you don’t fall back
          into old patterns.
        </p>
        <p className="story-future-text">
          FitGearzzz will keep improving the gear. You keep writing the
          chapters. Together, the journey bends away from excuses and towards
          the person you always said you wanted to become.
        </p>

        <div className="story-future-actions">
          <a href="/products" className="story-btn story-btn-primary">
            Start with one product
          </a>
          <a href="/contact" className="story-btn story-btn-secondary">
            Build a custom setup
          </a>
        </div>
      </div>
    </section>
  );
};

export default Story;
