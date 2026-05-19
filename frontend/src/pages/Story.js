import React, { useEffect, useRef, useState } from "react";
import "./Story.css";

const stages = [
  {
    id: "stage-problem",
    index: "01",
    label: "Problem",
    title: "It started with a problem that stayed visible.",
    summary:
      "The first stage began with a persistent gap: people were serious about training, but the tools around them often lacked the same seriousness.",
    tension:
      "Products looked acceptable in listings and ads, yet too many failed under real effort, repeated use, and the practical demands of disciplined routines.",
    keyPoint:
      "The issue was not lack of choice. It was the lack of dependable, confidence-building tools that felt truly resolved.",
  },
  {
    id: "stage-thought",
    index: "02",
    label: "Thought",
    title: "The next step was not action first. It was sharper thinking.",
    summary:
      "Before building anything meaningful, the problem had to be understood more precisely. That meant questioning what good training gear should actually deliver.",
    tension:
      "The market rewarded appearance and novelty too easily. But consistency, usability, and trust were the standards that mattered most over time.",
    keyPoint:
      "This stage reframed the journey: the goal was not to add more products, but to build a more dependable standard around them.",
  },
  {
    id: "stage-plan",
    index: "03",
    label: "Plan",
    title: "A proper plan gave the story structure.",
    summary:
      "Once the problem and thought process were clearer, the journey moved into a planning stage built around standards, not assumptions.",
    tension:
      "Every plan looks convincing in theory. The real test was whether the plan could survive pressure, constraints, and repeated scrutiny.",
    keyPoint:
      "The plan centered on reliable product choices, clearer presentation, and an experience designed to reduce friction at every point.",
  },
  {
    id: "stage-process",
    index: "04",
    label: "Process",
    title: "Then came the long process of testing and refining.",
    summary:
      "This was the most demanding stage. Ideas, suppliers, formats, and selections were compared carefully, then improved or removed when they did not hold up.",
    tension:
      "Some options looked promising but failed in actual use. Others worked technically, yet still lacked the confidence or clarity the brand needed to represent.",
    keyPoint:
      "The process created discipline. It made sure that only decisions strong enough to survive repetition could move forward.",
  },
  {
    id: "stage-progress",
    index: "05",
    label: "Progress",
    title: "Progress became visible when the system started holding together.",
    summary:
      "Once the process improved, the outcomes became more coherent. The experience began to feel stronger, clearer, and more trustworthy across touchpoints.",
    tension:
      "The challenge at this stage was consistency: ensuring that progress was not a short-term spike, but the beginning of a repeatable pattern.",
    keyPoint:
      "Progress showed up through alignment—better selection, better presentation, and a more stable standard behind the brand.",
  },
  {
    id: "stage-current",
    index: "06",
    label: "Current",
    title: "The current stage is stable, but intentionally unfinished.",
    summary:
      "Today, the system is more mature. The brand has more clarity, more structure, and a stronger understanding of the role it plays in serious training routines.",
    tension:
      "But stability creates its own risk. The pressure now is not just to maintain quality, but to keep evolving without losing the discipline that made progress possible.",
    keyPoint:
      "The current scenario is not an endpoint. It is a controlled platform for better execution, better refinement, and smarter growth.",
  },
  {
    id: "stage-future",
    index: "07",
    label: "Future",
    title: "The next chapter is being designed with the same discipline.",
    summary:
      "The future is not about random expansion. It is about improving the experience with more precision, more depth, and more relevance to the people using it.",
    tension:
      "Growth can weaken a story when it introduces noise. The responsibility now is to scale what works without diluting the original standard.",
    keyPoint:
      "The next moves focus on stronger product experiences, sharper storytelling, and a brand journey that feels more intelligent at every stage.",
  },
];

const signals = [
  {
    title: "The problem was named clearly",
    text: "Progress only started once the issue was defined with enough precision to guide strong decisions.",
  },
  {
    title: "Weak options were rejected",
    text: "The journey improved because attractive but unreliable paths were filtered out early.",
  },
  {
    title: "The system became repeatable",
    text: "The real sign of maturity was consistency: better outcomes appearing through structure rather than luck.",
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
  const [activeStage, setActiveStage] = useState(stages[0].id);
  const [curveNodes, setCurveNodes] = useState([]);
  const [curveHeight, setCurveHeight] = useState(0);

  useEffect(() => {
    const sections = stages.map((s) => document.getElementById(s.id));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]) {
          setActiveStage(visible[0].target.id);
        }
      },
      { threshold: 0.38 }
    );

    sections.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const updateCurve = () => {
      const shell = document.querySelector(".story-main-shell");
      if (!shell) return;

      const shellRect = shell.getBoundingClientRect();

      const nodes = stages.map((stage) => {
        const el = document.getElementById(stage.id);
        if (!el) return null;
        const rect = el.getBoundingClientRect();
        return rect.top - shellRect.top + rect.height / 2;
      });

      const valid = nodes.filter((n) => n != null);
      const maxY = valid.length ? Math.max(...valid) : 0;

      setCurveNodes(nodes);
      setCurveHeight(maxY + 220);
    };

    updateCurve();
    window.addEventListener("resize", updateCurve);
    window.addEventListener("scroll", updateCurve, { passive: true });

    return () => {
      window.removeEventListener("resize", updateCurve);
      window.removeEventListener("scroll", updateCurve);
    };
  }, []);

  const scrollToStage = (id) => {
    const el = document.getElementById(id);
    if (!el) return;

    const rect = el.getBoundingClientRect();
    window.scrollTo({
      top: rect.top + window.scrollY - 84,
      behavior: "smooth",
    });
  };

  const scrollToFirstStage = () => scrollToStage(stages[0].id);

  return (
    <div className="story-page">
      <section className="story-hero" id="top">
        <div className="story-hero-inner">
          <div className="story-hero-pill">
            <span className="story-hero-pill-dot" />
            <span className="story-hero-pill-text">A progress story</span>
          </div>

          <h1 className="story-hero-title">
            A problem stayed.
            <br />
            A stronger system was built around it.
          </h1>

          <p className="story-hero-subtitle">
            This page tells the journey in stages: a visible problem, sharper
            thinking, a stronger plan, a longer process, measurable progress,
            the current scenario, and the future being built from it.
          </p>

          <p className="story-hero-trailer">
            Read it like a moving narrative. Each scroll reveals one more turn
            in how FitGearzzz moved from friction toward structure, clarity, and
            confidence.
          </p>

          <div className="story-hero-actions">
            <button
              className="story-btn story-btn-primary"
              onClick={scrollToFirstStage}
            >
              Start the journey
            </button>
            <a href="/products" className="story-btn story-btn-secondary">
              See the current outcome
            </a>
          </div>

          <div className="story-hero-scroll">
            <span className="story-hero-scroll-line" />
            <span className="story-hero-scroll-label">
              Scroll through the stages
            </span>
          </div>
        </div>

        <div className="story-hero-bg-accent" />
        <div className="story-hero-bg-rings" />
      </section>

      <StageDial stages={stages} activeStage={activeStage} />

      <ManifestoBlock />

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
            onStageClick={scrollToStage}
          />

          {stages.map((stage, index) => (
            <StageSection key={stage.id} stage={stage} index={index} />
          ))}

          <SignalsSection />
          <ClosingSection />
        </main>
      </div>
    </div>
  );
};

const StageDial = ({ stages, activeStage }) => {
  const [angle, setAngle] = useState(-110);

  useEffect(() => {
    const idx = stages.findIndex((s) => s.id === activeStage);
    if (idx === -1) return;

    const total = stages.length;
    const start = -130;
    const end = 130;
    const step = (end - start) / Math.max(total - 1, 1);
    setAngle(start + idx * step);
  }, [activeStage, stages]);

  return (
    <aside className="story-watch-dial" aria-hidden="true">
      <div className="story-watch-dial-wrap">
        <svg
          className="story-watch-svg"
          viewBox="0 0 320 320"
          preserveAspectRatio="xMidYMid meet"
        >
          <g transform="translate(160 160)">
            <circle r="118" className="dial-ring dial-ring-main" />
            <circle r="92" className="dial-ring dial-ring-secondary" />

            <path
              d="M -78 -88 A 118 118 0 0 1 78 -88"
              className="dial-arc-accent"
            />

            <path
              d="M -95 70 A 118 118 0 0 0 0 118 A 118 118 0 0 0 95 70"
              className="dial-arc-dashed"
            />

            {stages.map((stage, index) => {
              const start = -130;
              const end = 130;
              const step = (end - start) / Math.max(stages.length - 1, 1);
              const tickAngle = start + index * step;
              const rad = (tickAngle * Math.PI) / 180;

              const x1 = Math.cos(rad) * 102;
              const y1 = Math.sin(rad) * 102;
              const x2 = Math.cos(rad) * 118;
              const y2 = Math.sin(rad) * 118;

              return (
                <line
                  key={stage.id}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  className="dial-tick"
                />
              );
            })}

            <g
              className="dial-hand"
              style={{ transform: `rotate(${angle}deg)`, transformOrigin: "center" }}
            >
              <line x1="0" y1="0" x2="0" y2="-86" className="dial-hand-line" />
              <circle cx="0" cy="0" r="6" className="dial-hand-core" />
              <circle cx="0" cy="-86" r="5" className="dial-hand-tip" />
            </g>
          </g>
        </svg>
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
            <stop offset="0%" stopColor="rgba(148,163,184,0.2)" />
            <stop offset="45%" stopColor="rgba(249,115,22,0.42)" />
            <stop offset="100%" stopColor="rgba(148,163,184,0.16)" />
          </linearGradient>
        </defs>
        <path
          d="
            M 82 40
            C 252 210, 44 400, 242 610
            S 44 900, 242 1110
            S 44 1390, 242 1600
          "
          fill="none"
          stroke="url(#curveGradient)"
          strokeWidth="2.5"
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
        Strong stories are not born from perfection. They are built through a
        recurring sequence: a problem becomes visible, weak paths are tested and
        rejected, a better system emerges, and progress proves itself through
        repetition.
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
              <span className="story-timeline-pill-index">{stage.index}</span>
              <span className="story-timeline-pill-label">{stage.label}</span>
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
            <span className="story-stage-key-label">Turning point</span>
            <p className="story-stage-key-text">{stage.keyPoint}</p>
          </div>
        </div>

        <div className="story-stage-evidence">
          <div className="story-stage-card">
            <p className="story-stage-card-label">What defined this stage</p>
            <p className="story-stage-card-text">
              {index === 0 &&
                "A real problem was identified clearly enough that it could no longer be ignored."}
              {index === 1 &&
                "The right question replaced vague ambition and gave the journey sharper direction."}
              {index === 2 &&
                "Structure entered the process through standards, priorities, and a more disciplined plan."}
              {index === 3 &&
                "Testing became a filter. Weak ideas were removed before they could shape the brand."}
              {index === 4 &&
                "Progress appeared when quality, presentation, and confidence began aligning together."}
              {index === 5 &&
                "The system matured into something stable enough to support growth without losing its center."}
              {index === 6 &&
                "The future became a responsibility: to refine what works rather than expanding without judgment."}
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
          <p className="story-section-kicker">Signals of real progress</p>
          <h2 className="story-section-title">
            Signs that the journey has depth behind it.
          </h2>
        </div>

        <div className="story-signals-grid">
          {signals.map((signal) => (
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
        <p className="story-closing-kicker">Where this story meets you</p>
        <h2 className="story-closing-title">
          Every stage matters only if the result supports real effort.
        </h2>

        <p className="story-closing-text">
          The journey behind FitGearzzz is not mythology. It is a sequence of
          responses to a genuine problem, refined into a stronger system over
          time.
        </p>

        <p className="story-closing-text">
          If this page works the way it should, it leaves one clear impression:
          the tools used in training should feel as disciplined as the people
          using them.
        </p>

        <div className="story-closing-actions">
          <a href="/products" className="story-btn story-btn-primary">
            Continue into the collection
          </a>
          <a href="/contact" className="story-btn story-btn-secondary">
            Connect with FitGearzzz
          </a>
        </div>
      </div>
    </section>
  );
};

export default Story;
