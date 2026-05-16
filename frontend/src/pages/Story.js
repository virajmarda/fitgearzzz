import React, { useEffect, useRef, useState } from "react";
import "./Story.css";

const stages = [
  {
    id: "stage-problem",
    index: "01",
    label: "Problem",
    title: "It started with something that would not go away.",
    summary:
      "The issue was simple to describe but hard to ignore: people were serious about training, but the tools around them were not designed with the same seriousness.",
    tension:
      "Sessions were interrupted by slipping grips, unreliable materials, and products that looked acceptable in a listing but collapsed under real effort.",
    keyPoint:
      "The first stage of the journey was not excitement. It was discomfort—realizing that the market was crowded, but the solutions still felt incomplete.",
  },
  {
    id: "stage-thought",
    index: "02",
    label: "Thought",
    title:
      "The question formed: what if the gear was as disciplined as the people using it?",
    summary:
      "Instead of accepting the situation as normal, the journey continued with a more precise question about what training equipment should really do.",
    tension:
      "Most options were chasing aesthetics or trends. Very few focused on consistency, durability, and the feeling of confidence when you pick something up again and again.",
    keyPoint:
      "The thought was not to add one more product to the noise, but to build a more considered standard around what gear should be.",
  },
  {
    id: "stage-plan",
    index: "03",
    label: "Plan",
    title: "A structured plan was drawn, not just another idea.",
    summary:
      "The next stage turned that thought into a framework: define the expectations, map the gaps, and decide what a better system would look like.",
    tension:
      "Every plan looks neat on paper. The challenge was to design one that would still hold under pressure, repetition, and real-world constraints.",
    keyPoint:
      "The plan focused on three pillars: reliability of products, clarity of presentation, and an experience that respected the time and focus of the user.",
  },
  {
    id: "stage-process",
    index: "04",
    label: "Process",
    title: "The process began: tests, rejections, and recalibrations.",
    summary:
      "This was the longest stage. Materials, suppliers, ideas, and structures were tested, compared, and, when necessary, discarded.",
    tension:
      "Some directions looked promising but failed under repetition. Others passed technical checks but did not feel right in the hand or in actual use.",
    keyPoint:
      "Progress here was measured less in quick wins and more in what survived strict evaluation. Anything that introduced doubt did not move forward.",
  },
  {
    id: "stage-progress",
    index: "05",
    label: "Progress",
    title: "The results started to line up in the same direction.",
    summary:
      "Once the process tightened, the signs of progress became visible. Customers began to notice the difference in how the experience felt.",
    tension:
      "Even then, the question remained: was this progress temporary, or was it the beginning of something that could scale without losing its standards?",
    keyPoint:
      "The answer came through repetition: more orders handled with consistency, more sessions powered without friction, more feedback confirming that the direction was working.",
  },
  {
    id: "stage-current",
    index: "06",
    label: "Current scenario",
    title: "Today, the system is stable, but intentionally unfinished.",
    summary:
      "FitGearzzz now operates with clearer standards, more refined curation, and a sharper understanding of what its role is in people’s training routines.",
    tension:
      "Stability is not the same as completion. The current stage still carries pressure: to keep improving, to avoid shortcuts, and to stay aligned with the original problem that started everything.",
    keyPoint:
      "Right now, the journey is in a phase where the foundation is strong enough to support growth, but flexible enough to keep evolving.",
  },
  {
    id: "stage-future",
    index: "07",
    label: "Future plans",
    title: "The next moves are already being designed.",
    summary:
      "The story does not end at a working system. The next stages involve deeper refinement, smarter experiences, and more connected support for people who train seriously.",
    tension:
      "The risk in any progress story is comfort. The plan is to avoid that by treating every new stage as a responsibility, not just a milestone.",
    keyPoint:
      "Upcoming work focuses on better guidance, more intelligent product experiences, and a journey that feels even more personal without ever losing its discipline.",
  },
];

const keySignals = [
  {
    title: "Clear friction point",
    text: "The journey began only when the real problem was defined precisely enough to act on.",
  },
  {
    title: "Structured evaluation",
    text: "Ideas were not trusted by default. They had to pass through deliberate testing and comparison.",
  },
  {
    title: "Consistent direction",
    text: "Once the right standard appeared, every part of the brand was aligned to support it.",
  },
];

// simple tick sound using Web Audio (no external file)
const playDialSound = () => {
  if (typeof window === "undefined") return;
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtx) return;

  const ctx = new AudioCtx();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = "triangle";
  osc.frequency.setValueAtTime(850, ctx.currentTime);
  gain.gain.setValueAtTime(0.18, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start();
  osc.stop(ctx.currentTime + 0.15);
  osc.onended = () => ctx.close();
};

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
  const [activeStage, setActiveStage] = useState(stages[0].id);
  const [curveNodes, setCurveNodes] = useState([]);
  const [curveHeight, setCurveHeight] = useState(0);

  // track which stage is in view
  useEffect(() => {
    const sectionEls = stages.map((s) => document.getElementById(s.id));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]) {
          setActiveStage(visible[0].target.id);
        }
      },
      { threshold: 0.35 }
    );

    sectionEls.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // compute curve node positions so each point aligns with its stage
  useEffect(() => {
    const updateCurve = () => {
      const shell = document.querySelector(".story-main-shell");
      if (!shell) return;

      const shellRect = shell.getBoundingClientRect();
      const newNodes = stages.map((stage) => {
        const el = document.getElementById(stage.id);
        if (!el) return null;
        const rect = el.getBoundingClientRect();
        const centerY = rect.top - shellRect.top + rect.height / 2;
        return centerY;
      });

      const valid = newNodes.filter((y) => y != null);
      const maxY =
        valid.length > 0 ? valid.reduce((m, y) => Math.max(m, y), 0) : 0;

      setCurveNodes(newNodes);
      setCurveHeight(maxY + 200);
    };

    updateCurve();
    window.addEventListener("resize", updateCurve);
    window.addEventListener("scroll", updateCurve);

    return () => {
      window.removeEventListener("resize", updateCurve);
      window.removeEventListener("scroll", updateCurve);
    };
  }, []);

  const scrollToStage = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const offset = 80; // header spacing
    const targetTop = rect.top + window.scrollY - offset;

    window.scrollTo({
      top: targetTop,
      behavior: "smooth",
    });
  };

  const scrollToFirstStage = () => scrollToStage(stages[0].id);

  return (
    <div className="story-page">
      {/* HERO */}
      <section className="story-hero" id="top">
        <div className="story-hero-inner">
          <div className="story-hero-pill">
            <span className="story-hero-pill-dot" />
            <span className="story-hero-pill-text">A true progress story</span>
          </div>

          <h1 className="story-hero-title">
            A problem stayed.
            <br />
            A stronger system was built around it.
          </h1>

          <p className="story-hero-subtitle">
            This is not mythology. It is the real sequence of stages that took
            FitGearzzz from a persistent problem to a more disciplined way of
            supporting serious training.
          </p>

          <p className="story-hero-trailer">
            Scroll like you are watching a trailer: each stage reveals what
            changed, why it mattered, and how it still shapes what you see on
            the site today.
          </p>

          <div className="story-hero-actions">
            <button
              className="story-btn story-btn-primary"
              onClick={scrollToFirstStage}
            >
              Enter Stage 01
            </button>
            <a href="/products" className="story-btn story-btn-secondary">
              View the current results
            </a>
          </div>

          <div className="story-hero-scroll">
            <span className="story-hero-scroll-line" />
            <span className="story-hero-scroll-label">
              Scroll to follow the stages
            </span>
          </div>
        </div>

        <div className="story-hero-bg-accent" />
        <div className="story-hero-bg-rings" />
      </section>

      {/* RIGHT-SIDE SEMI-CIRCLE DIAL (DESKTOP) */}
      <StageDial
        stages={stages}
        activeStage={activeStage}
        onStageClick={(id) => {
          playDialSound();
          scrollToStage(id);
        }}
      />

      {/* MANIFESTO */}
      <ManifestoBlock />

      {/* TIMELINE + STAGES + CURVE */}
      <div className="story-main-shell">
        <JourneyCurve
          stages={stages}
          activeStage={activeStage}
          curveNodes={curveNodes}
          curveHeight={curveHeight}
        />

        <main className="story-main">
          <TimelineStrip
            stages={stages}
            activeStage={activeStage}
            onStageClick={(id) => {
              playDialSound();
              scrollToStage(id);
            }}
          />

          {stages.map((stage, index) => (
            <StageSection
              key={stage.id}
              stage={stage}
              index={index}
            />
          ))}

          <SignalsSection />
          <ClosingSection />
        </main>
      </div>
    </div>
  );
};

const StageDial = ({ stages, activeStage, onStageClick }) => {
  const [dialAngle, setDialAngle] = useState(0);

  // map active stage to pointer angle along the semi-circle
  useEffect(() => {
    const idx = stages.findIndex((s) => s.id === activeStage);
    if (idx === -1) return;
    const total = stages.length;
    const start = -80; // top
    const end = 80; // bottom
    const step = (end - start) / Math.max(total - 1, 1);
    const angle = start + idx * step;
    setDialAngle(angle);
  }, [activeStage, stages]);

  const activeIndex = stages.findIndex((s) => s.id === activeStage);
  const activeStageData = stages[activeIndex] || stages[0];

  return (
    <aside className="story-dial">
      <div className="story-dial-inner">
        <div className="story-dial-semi">
          <div
            className="story-dial-pointer"
            style={{
              transform: `translate(-50%, -50%) rotate(${dialAngle}deg)`,
            }}
          >
            <span className="story-dial-pointer-head" />
          </div>

          {stages.map((stage, index) => {
            const total = stages.length;
            const start = -80;
            const end = 80;
            const step = (end - start) / Math.max(total - 1, 1);
            const angle = start + index * step;
            const rad = (angle * Math.PI) / 180;
            const radius = 54;
            const cx = 100; // center at right edge
            const cy = 50;
            const x = cx + radius * Math.cos(rad);
            const y = cy + radius * Math.sin(rad);
            const isActive = activeStage === stage.id;

            return (
              <button
                key={stage.id}
                className={`story-dial-dot ${isActive ? "is-active" : ""}`}
                style={{ "--x": `${x}%`, "--y": `${y}%` }}
                onClick={() => onStageClick(stage.id)}
              >
                <span className="story-dial-dot-index">{stage.index}</span>
              </button>
            );
          })}
        </div>

        <div className="story-dial-label">
          <span className="story-dial-label-index">
            {activeStageData.index}
          </span>
          <span className="story-dial-label-text">
            {activeStageData.label}
          </span>
        </div>
      </div>
    </aside>
  );
};

const JourneyCurve = ({
  stages,
  activeStage,
  curveNodes,
  curveHeight,
}) => {
  return (
    <div
      className="story-curve-wrapper"
      style={{ height: curveHeight || 0 }}
      aria-hidden="true"
    >
      <svg
        className="story-curve"
        viewBox="0 0 320 1800"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="curveGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="rgba(148,163,184,0.28)" />
            <stop offset="45%" stopColor="rgba(249,115,22,0.62)" />
            <stop offset="100%" stopColor="rgba(148,163,184,0.24)" />
          </linearGradient>
        </defs>
        <path
          d="
            M 80 40
            C 250 220, 40 420, 240 620
            S 40 900, 240 1100
            S 40 1380, 240 1580
          "
          fill="none"
          stroke="url(#curveGradient)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="8 14"
        />
      </svg>

      {curveNodes.map((y, i) => {
        if (y == null) return null;
        const stage = stages[i];
        const isActive = stage && stage.id === activeStage;
        return (
          <div
            key={stage.id}
            className={`story-curve-node ${isActive ? "is-active" : ""}`}
            style={{ top: y }}
          />
        );
      })}
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
      <p className="story-manifesto-label">Perspective</p>
      <p className="story-manifesto-text">
        Real progress stories rarely move in straight lines. They move through
        tension: a problem that stays, ideas that fail, plans that change, and
        a solution that slowly proves it belongs.
      </p>
    </section>
  );
};

const TimelineStrip = ({ stages, activeStage, onStageClick }) => {
  const [ref, inView] = useInView();

  return (
    <section
      ref={ref}
      className={`story-timeline-strip ${inView ? "is-visible" : ""}`}
    >
      <div className="story-timeline-inner">
        <p className="story-timeline-label">Stages of the journey</p>
        <div className="story-timeline-track">
          {stages.map((stage) => (
            <button
              key={stage.id}
              className={`story-timeline-pill ${
                activeStage === stage.id ? "is-active" : ""
              }`}
              onClick={() => onStageClick(stage.id)}
            >
              <span className="story-timeline-pill-index">
                {stage.index}
              </span>
              <span className="story-timeline-pill-label">
                {stage.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

const StageSection = ({ stage, index }) => {
  const [ref, inView] = useInView();
  const isEven = index % 2 === 0;

  return (
    <section
      id={stage.id}
      ref={ref}
      className={`story-stage ${inView ? "is-visible" : ""} ${
        isEven ? "is-even" : "is-odd"
      }`}
    >
      <div className="story-stage-inner">
        <div className="story-stage-copy">
          <p className="story-stage-kicker">
            Stage {stage.index} · {stage.label}
          </p>
          <h2 className="story-stage-title">{stage.title}</h2>
          <p className="story-stage-summary">{stage.summary}</p>
          <p className="story-stage-tension">{stage.tension}</p>
          <div className="story-stage-key">
            <span className="story-stage-key-label">Key turning point</span>
            <p className="story-stage-key-text">{stage.keyPoint}</p>
          </div>
        </div>

        <div className="story-stage-evidence">
          <div className="story-stage-card">
            <p className="story-stage-card-label">Focus in this stage</p>
            <p className="story-stage-card-text">
              {index === 0 &&
                "Name the problem clearly enough that it cannot be ignored or explained away."}
              {index === 1 &&
                "Think beyond trends and ask what would stand up to real training conditions."}
              {index === 2 &&
                "Design a plan that can survive contact with deadlines, budgets, and reality."}
              {index === 3 &&
                "Let testing be honest enough that weak ideas are removed quickly, not protected."}
              {index === 4 &&
                "Protect consistency: repeat wins, study failures, and remove friction step by step."}
              {index === 5 &&
                "Keep the system stable while still questioning where it can be sharper."}
              {index === 6 &&
                "Decide on the next upgrades with the same seriousness as the first solution."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const SignalsSection = () => {
  const [ref, inView] = useInView();

  return (
    <section
      ref={ref}
      className={`story-signals ${inView ? "is-visible" : ""}`}
    >
      <div className="story-signals-inner">
        <div className="story-section-heading">
          <p className="story-section-kicker">
            Signals that the story is working
          </p>
          <h2 className="story-section-title">
            How you know this journey has weight behind it.
          </h2>
        </div>

        <div className="story-signals-grid">
          {keySignals.map((signal) => (
            <div key={signal.title} className="story-signal-card">
              <p className="story-signal-title">{signal.title}</p>
              <p className="story-signal-text">{signal.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ClosingSection = () => {
  const [ref, inView] = useInView();

  return (
    <section
      ref={ref}
      className={`story-closing ${inView ? "is-visible" : ""}`}
    >
      <div className="story-closing-inner">
        <p className="story-closing-kicker">Where you enter the story</p>
        <h2 className="story-closing-title">
          The next stage is written by how you choose to train.
        </h2>
        <p className="story-closing-text">
          The journey behind FitGearzzz is not a fantasy. It is a sequence of
          decisions made in response to a real problem. What happens next is
          measured by how well the products support your own progress, session
          after session.
        </p>
        <p className="story-closing-text">
          If the story has done its job, you leave this page with one clear
          thought: the tools you use should match the effort you are willing to
          give. Everything here is built to support that decision.
        </p>

        <div className="story-closing-actions">
          <a href="/products" className="story-btn story-btn-primary">
            Continue the journey in the store
          </a>
          <a href="/contact" className="story-btn story-btn-secondary">
            Share your feedback
          </a>
        </div>
      </div>
    </section>
  );
};

export default Story;
