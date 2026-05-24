import React, { useEffect, useMemo, useRef, useState } from "react";
import "./Story.css";

const stages = [
  {
    id: "problem",
    chapter: "Chapter 01",
    kicker: "The problem",
    shortLabel: "Problem",
    dialLabel: "Problem",
    title: "Good intent was being lost inside a cluttered experience.",
    summary:
      "The story started with friction. Navigation felt heavier than it should, the message hierarchy was diluted, and key decisions were harder to follow than they needed to be.",
    tension:
      "The brand had direction, but the interface was not yet translating that clarity into a fast, premium customer journey.",
    why:
      "When the first impression is noisy, visitors spend effort understanding the page instead of trusting the product.",
    evidence: [
      {
        label: "Observed friction",
        text: "Dense layout rhythm, weaker content hierarchy, and too many competing visual signals on the same viewport.",
        accent: true,
      },
      {
        label: "Why it matters",
        text: "A fitness brand should feel sharp, confident, and controlled within seconds—not visually crowded.",
      },
    ],
  },
  {
    id: "thought",
    chapter: "Chapter 02",
    kicker: "The thought",
    shortLabel: "Thought",
    dialLabel: "Thought",
    title: "The redesign had to feel more like guided motion than static sections.",
    summary:
      "Instead of treating the page as stacked blocks, the experience was reframed as a narrative. Each section should arrive with intent, hold focus, and transition like one connected system.",
    tension:
      "The goal was not decoration. It was controlled emphasis—less noise, more direction, and stronger visual confidence.",
    why:
      "Smooth progression makes complex information easier to absorb and gives the brand a premium product feel.",
    evidence: [
      {
        label: "Design intent",
        text: "Create a storytelling structure with smoother visual state changes, cleaner spacing, and fewer dead areas.",
        accent: true,
      },
      {
        label: "Expected outcome",
        text: "A page that feels engineered, not assembled—where sections guide the eye instead of competing for it.",
      },
    ],
  },
  {
    id: "plan",
    chapter: "Chapter 03",
    kicker: "The plan",
    shortLabel: "Plan",
    dialLabel: "Plan",
    title:
      "The plan centered on reducing friction and building a clearer, more reliable experience.",
    summary:
      "The layout was tightened, the right-side visual system was resized, and the scroll rhythm was redesigned to remove the giant empty gap between content and dial.",
    tension:
      "The challenge was balancing visual drama with restraint so the page still matched the fitgearzzz storefront instead of feeling like an unrelated microsite.",
    why:
      "A premium page should create momentum without stealing attention away from the message itself.",
    evidence: [
      {
        label: "Structured intent",
        text: "Smaller dial, smoother state changes, sharper section pacing, and a brand-matched dark/orange component system.",
        accent: true,
      },
      {
        label: "Interaction logic",
        text: "Section activation now follows the viewport center rather than raw scroll distance, which makes the progression feel calmer and more stable.",
      },
    ],
  },
  {
    id: "build",
    chapter: "Chapter 04",
    kicker: "The build",
    shortLabel: "Build",
    dialLabel: "Build",
    title:
      "The process was where weak ideas were simplified and strong ones were refined.",
    summary:
      "Motion, spacing, and layout all had to work together. The stage transitions were softened, the dial geometry was reduced, and the visual system was aligned with the site’s orange CTA and dark glass surfaces.",
    tension:
      "The result needed to feel expressive, but still production-ready and usable across large screens and mobile breakpoints.",
    why:
      "When visuals and movement follow the same system, the page feels more trustworthy and much easier to navigate.",
    evidence: [
      {
        label: "Implementation focus",
        text: "Refined grid widths, lower dial radius, reduced stage gaps, and controlled morph timing across sections.",
        accent: true,
      },
      {
        label: "Brand alignment",
        text: "The dial now behaves like a premium instrument detail from the store rather than a separate futuristic widget.",
      },
    ],
  },
  {
    id: "future",
    chapter: "Chapter 05",
    kicker: "What this unlocks",
    shortLabel: "Future",
    dialLabel: "Future",
    title: "Now the story reads as one connected flow instead of isolated screens.",
    summary:
      "The page feels more cohesive, the transitions are smoother, and the right-side dial supports the narrative without overpowering the layout.",
    tension:
      "This creates a stronger base for future polish—whether you add richer media, product proof, or animated case-study moments later.",
    why: "A strong story page should feel premium today and extensible tomorrow.",
    evidence: [
      {
        label: "Immediate gain",
        text: "Cleaner storytelling rhythm, tighter spacing, and a better visual match with the fitgearzzz brand system.",
        accent: true,
      },
      {
        label: "Next layer",
        text: "You can now add richer product visuals, before/after comparisons, or campaign proof without breaking the flow.",
      },
    ],
  },
];

const signals = [
  {
    title: "Sharper hierarchy",
    text: "Sections now resolve into a cleaner reading order, so users understand context before they reach detail.",
  },
  {
    title: "Better pacing",
    text: "Reduced spacing and smoother activation create momentum instead of long empty pauses between ideas.",
  },
  {
    title: "Brand continuity",
    text: "The dial and story surfaces now use the same dark/orange language already visible across the site experience.",
  },
];

const dialAngles = [-122, -54, 0, 56, 112];
const dialMarkerAngles = [-122, -90, -54, -24, 0, 28, 56, 86, 112];
const curveNodeOffsets = [12, 28, 46, 66, 84];

function polarPosition(angle, radius) {
  const radians = (angle - 90) * (Math.PI / 180);
  return {
    x: Math.cos(radians) * radius,
    y: Math.sin(radians) * radius,
  };
}

function Story() {
  const pageRef = useRef(null);
  const stageRefs = useRef([]);
  const manifestoRef = useRef(null);
  const timelineRef = useRef(null);
  const signalsRef = useRef(null);
  const closingRef = useRef(null);

  const [activeStage, setActiveStage] = useState(0);
  const [visibleStages, setVisibleStages] = useState(() => new Set());
  const [visibleBlocks, setVisibleBlocks] = useState({
    manifesto: false,
    timeline: false,
    signals: false,
    closing: false,
  });
  const [isMorphing, setIsMorphing] = useState(false);

  const dialItems = useMemo(
    () =>
      stages.map((stage, index) => ({
        ...stage,
        angle: dialAngles[index],
      })),
    []
  );

  useEffect(() => {
    const stageElements = stageRefs.current.filter(Boolean);
    if (!stageElements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        setVisibleStages((prev) => {
          const nextVisible = new Set(prev);

          entries.forEach((entry) => {
            const stageIndex = Number(entry.target.dataset.stageIndex);

            if (entry.isIntersecting) {
              nextVisible.add(stageIndex);
            } else if (entry.intersectionRatio < 0.05) {
              nextVisible.delete(stageIndex);
            }
          });

          return nextVisible;
        });
      },
      {
        threshold: [0.08, 0.2, 0.38, 0.55],
        rootMargin: "-8% 0px -8% 0px",
      }
    );

    stageElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const tracked = [
      { key: "manifesto", ref: manifestoRef },
      { key: "timeline", ref: timelineRef },
      { key: "signals", ref: signalsRef },
      { key: "closing", ref: closingRef },
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        setVisibleBlocks((prev) => {
          const next = { ...prev };

          entries.forEach((entry) => {
            const key = entry.target.dataset.block;
            next[key] = entry.isIntersecting;
          });

          return next;
        });
      },
      {
        threshold: 0.14,
        rootMargin: "0px 0px -8% 0px",
      }
    );

    tracked.forEach(({ ref, key }) => {
      if (ref.current) {
        ref.current.dataset.block = key;
        observer.observe(ref.current);
      }
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let ticking = false;

    const updateActiveStage = () => {
      const sections = stageRefs.current.filter(Boolean);
      if (!sections.length) {
        ticking = false;
        return;
      }

      const triggerY = window.innerHeight * 0.43;
      let nextIndex = 0;
      let closestDistance = Infinity;

      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        const center = rect.top + rect.height * 0.5;
        const distance = Math.abs(center - triggerY);

        if (distance < closestDistance) {
          closestDistance = distance;
          nextIndex = index;
        }
      });

      setActiveStage((prev) => (prev === nextIndex ? prev : nextIndex));
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(updateActiveStage);
      }
    };

    updateActiveStage();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    setIsMorphing(true);
    const timer = window.setTimeout(() => setIsMorphing(false), 900);
    return () => window.clearTimeout(timer);
  }, [activeStage]);

  const handleJumpToStage = (index) => {
    const target = stageRefs.current[index];
    if (!target) return;

    target.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div
      ref={pageRef}
      className={`story-page ${isMorphing ? "is-morphing" : ""}`}
    >
      <section className="story-hero">
        <div className="story-hero-inner">
          <div className="story-hero-pill">
            <span className="story-hero-pill-dot" />
            <span className="story-hero-pill-text">Fitgearzzz story mode</span>
          </div>

          <div className="story-hero-eyebrow">Case study / Experience flow</div>

          <h1 className="story-hero-title">
            We turned a cluttered narrative into a smoother premium story.
          </h1>

          <p className="story-hero-subtitle">
            This page explains how the experience evolved—from friction and
            scattered hierarchy to a cleaner, more controlled storytelling system
            designed to feel closer to the fitgearzzz brand.
          </p>

          <p className="story-hero-trailer">
            The goal was not to make it louder. The goal was to make every
            section feel more intentional, easier to scan, and visually tighter
            as users move through the page.
          </p>

          <div className="story-hero-actions">
            <button
              type="button"
              className="story-btn story-btn-primary"
              onClick={() => handleJumpToStage(0)}
            >
              Start the story
            </button>

            <button
              type="button"
              className="story-btn story-btn-secondary"
              onClick={() => handleJumpToStage(stages.length - 1)}
            >
              Jump to outcome
            </button>
          </div>

          <div className="story-hero-meta">
            <div className="story-hero-meta-card">
              <span className="story-hero-meta-label">Focus</span>
              <span className="story-hero-meta-value">
                Cleaner pacing and stronger visual hierarchy
              </span>
            </div>

            <div className="story-hero-meta-card">
              <span className="story-hero-meta-label">System</span>
              <span className="story-hero-meta-value">
                Dark glass surfaces with fitgearzzz orange accents
              </span>
            </div>

            <div className="story-hero-meta-card">
              <span className="story-hero-meta-label">Upgrade</span>
              <span className="story-hero-meta-value">
                Smaller dial, tighter spacing, smoother story motion
              </span>
            </div>
          </div>

          <div className="story-hero-scroll">
            <span className="story-hero-scroll-line" />
            <span className="story-hero-scroll-label">Scroll to continue</span>
          </div>
        </div>

        <div className="story-hero-bg-accent" />
        <div className="story-hero-bg-rings" />
      </section>

      <aside
        className={`story-dial-fixed ${isMorphing ? "is-morphing" : ""}`}
        aria-hidden="true"
      >
        <div className="story-dial-window">
          <div className="story-dial-rotor">
            <div className="story-dial-ring ring-1" />
            <div className="story-dial-ring ring-2" />
            <div className="story-dial-ring ring-3" />

            {dialMarkerAngles.map((angle, index) => {
              const { x, y } = polarPosition(angle, 92);

              let markerClass = "is-muted";
              if (index === activeStage * 2) markerClass = "is-active";
              else if (index < activeStage * 2) markerClass = "is-linked";

              return (
                <div
                  key={`marker-${angle}-${index}`}
                  className="story-dial-marker-wrap"
                  style={{
                    transform: `translate(${124 + x}px, ${124 + y}px) rotate(${angle + 90}deg)`,
                  }}
                >
                  <div className={`story-dial-marker ${markerClass}`} />
                </div>
              );
            })}

            {dialItems.map((item, index) => {
              const { x, y } = polarPosition(item.angle, 67);

              return (
                <div
                  key={item.id}
                  className="story-dial-label-wrap"
                  style={{
                    transform: `translate(${124 + x}px, ${124 + y}px)`,
                  }}
                >
                  <div className="story-dial-label-row">
                    <span
                      className={`story-dial-label ${
                        index === activeStage ? "is-active" : ""
                      }`}
                    >
                      {item.dialLabel}
                    </span>
                  </div>
                </div>
              );
            })}

            <div
              className="story-dial-hand-wrap"
              style={{
                transform: `translate(-50%, -50%) rotate(${dialAngles[activeStage]}deg)`,
              }}
            >
              <div className="story-dial-hand-line" />
              <div className="story-dial-hand-dot" />
            </div>

            <div className="story-dial-hub">
              <div className="story-dial-hub-core" />
            </div>
          </div>
        </div>
      </aside>

      <section
        ref={manifestoRef}
        className={`story-manifesto ${
          visibleBlocks.manifesto ? "is-visible" : ""
        }`}
      >
        <div className="story-manifesto-label">Why this mattered</div>
        <p className="story-manifesto-text">
          A strong story page should feel like one guided experience. It should
          reduce friction, preserve momentum, and make every section feel like a
          natural continuation of the one before it.
        </p>
      </section>

      <div className="story-main-shell">
        <div
          className={`story-curve-wrapper ${isMorphing ? "is-morphing" : ""}`}
          aria-hidden="true"
        >
          <svg
            className="story-curve"
            viewBox="0 0 360 1600"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M180 60C250 160 92 248 180 360C262 464 110 546 180 658C248 764 116 856 180 980C244 1092 106 1194 180 1316C230 1402 162 1488 180 1550"
              stroke="url(#storyCurveGradient)"
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0.8"
            />
            <defs>
              <linearGradient
                id="storyCurveGradient"
                x1="180"
                y1="60"
                x2="180"
                y2="1550"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="rgba(249,115,22,0.08)" />
                <stop offset="0.18" stopColor="#f97316" />
                <stop offset="0.5" stopColor="rgba(148,163,184,0.28)" />
                <stop offset="0.82" stopColor="#f97316" />
                <stop offset="1" stopColor="rgba(249,115,22,0.04)" />
              </linearGradient>
            </defs>
          </svg>

          {curveNodeOffsets.map((offset, index) => (
            <span
              key={`curve-node-${index}`}
              className={`story-curve-node ${
                index === activeStage ? "is-active" : ""
              }`}
              style={{ top: `${offset}%` }}
            />
          ))}
        </div>

        <div className="story-main">
          <section
            ref={timelineRef}
            className={`story-timeline-strip ${
              visibleBlocks.timeline ? "is-visible" : ""
            }`}
          >
            <div className="story-timeline-inner">
              <div className="story-timeline-label">Journey map</div>

              <div className="story-timeline-track">
                {stages.map((stage, index) => (
                  <button
                    key={stage.id}
                    type="button"
                    className={`story-timeline-pill ${
                      index === activeStage ? "is-active" : ""
                    }`}
                    onClick={() => handleJumpToStage(index)}
                  >
                    <span className="story-timeline-pill-index">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span>{stage.shortLabel}</span>
                  </button>
                ))}
              </div>
            </div>
          </section>

          {stages.map((stage, index) => {
            const isVisible = visibleStages.has(index);
            const isActive = activeStage === index;
            const isPrevious = activeStage - 1 === index;

            return (
              <section
                key={stage.id}
                ref={(node) => {
                  stageRefs.current[index] = node;
                }}
                data-story-stage
                data-stage-index={index}
                className={[
                  "story-stage",
                  isVisible ? "is-visible" : "",
                  isActive ? "is-active" : "",
                  isPrevious ? "is-previous" : "",
                  isMorphing && isActive ? "is-morphing" : "",
                  index % 2 === 1 ? "is-odd" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                <div className="story-stage-inner">
                  <div className="story-stage-copy">
                    <div className="story-stage-kicker">
                      {stage.chapter} · {stage.kicker}
                    </div>

                    <h2 className="story-stage-title">{stage.title}</h2>

                    <p className="story-stage-summary">{stage.summary}</p>

                    <p className="story-stage-tension">{stage.tension}</p>

                    <div className="story-stage-key">
                      <div className="story-stage-key-label">Why it matters</div>
                      <div className="story-stage-key-text">{stage.why}</div>
                    </div>
                  </div>

                  <div className="story-stage-evidence">
                    {stage.evidence.map((item, cardIndex) => (
                      <article
                        key={`${stage.id}-${cardIndex}`}
                        className={`story-stage-card ${
                          item.accent ? "story-stage-card-accent" : ""
                        }`}
                      >
                        <div className="story-stage-card-label">
                          {item.label}
                        </div>
                        <div className="story-stage-card-text">{item.text}</div>
                      </article>
                    ))}
                  </div>
                </div>
              </section>
            );
          })}

          <section
            ref={signalsRef}
            className={`story-signals ${
              visibleBlocks.signals ? "is-visible" : ""
            }`}
          >
            <div className="story-signals-inner">
              <div className="story-section-heading">
                <div className="story-section-kicker">What changed</div>
                <h2 className="story-section-title">
                  The upgraded structure now feels faster, cleaner, and more in
                  control.
                </h2>
              </div>

              <div className="story-signals-grid">
                {signals.map((signal) => (
                  <article key={signal.title} className="story-signal-card">
                    <div className="story-signal-title">{signal.title}</div>
                    <div className="story-signal-text">{signal.text}</div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section
            ref={closingRef}
            className={`story-closing ${
              visibleBlocks.closing ? "is-visible" : ""
            }`}
          >
            <div className="story-closing-inner">
              <div className="story-closing-kicker">Closing note</div>

              <h2 className="story-closing-title">
                This is now a stronger base for a premium brand story.
              </h2>

              <p className="story-closing-text">
                The page now feels more deliberate: less empty space, more visual
                continuity, and smoother transitions that support the message
                instead of interrupting it.
              </p>

              <p className="story-closing-text">
                From here, richer product proof, before/after comparisons, or
                campaign results can be added on top of a cleaner storytelling
                framework.
              </p>

              <div className="story-closing-actions">
                <button
                  type="button"
                  className="story-btn story-btn-primary"
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                >
                  Back to top
                </button>

                <button
                  type="button"
                  className="story-btn story-btn-secondary"
                  onClick={() => handleJumpToStage(2)}
                >
                  Review the plan
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Story;
