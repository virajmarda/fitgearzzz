import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import "./Story.css";

const stages = [
  {
    id: "stage-problem",
    index: "01",
    label: "Problem",
    title: "The problem was visible long before the solution was ready.",
    summary:
      "The story began with a simple observation: people were putting serious effort into fitness, but the products around them often felt generic, inconsistent, or built without enough care.",
    tension:
      "There was no shortage of options. The real shortage was trust — products that felt dependable enough to become part of a disciplined routine.",
    keyPoint:
      "The challenge was not to add more noise. It was to identify a gap worth solving properly.",
    evidence:
      "A clear problem became visible: a mismatch between the seriousness of training and the quality of tools supporting it.",
    accent: "Visible gap",
  },
  {
    id: "stage-thought",
    index: "02",
    label: "Thought",
    title: "The next stage was not speed. It was sharper thinking.",
    summary:
      "Before anything strong could be built, the problem had to be understood more deeply. That meant questioning what training products should actually do beyond looking acceptable in a listing.",
    tension:
      "It was easy to choose what looked marketable. It was harder to choose what would still feel right after repeated use and real expectations.",
    keyPoint:
      "This stage shifted the story from vague ambition to a clearer standard.",
    evidence:
      "The journey improved once the right question replaced surface-level thinking.",
    accent: "Sharper standard",
  },
  {
    id: "stage-plan",
    index: "03",
    label: "Plan",
    title: "A proper plan gave the journey structure.",
    summary:
      "After the problem and standard became clearer, the next move was to build a plan around consistency, selection, presentation, and long-term trust.",
    tension:
      "Planning always looks convincing from a distance. The real test was whether the structure could survive pressure, uncertainty, and revision.",
    keyPoint:
      "The plan centered on reducing friction and building a clearer, more reliable experience.",
    evidence:
      "This stage introduced priorities, filters, and decision-making discipline into the process.",
    accent: "Structured intent",
  },
  {
    id: "stage-process",
    index: "04",
    label: "Process",
    title: "The process was where weak ideas were removed.",
    summary:
      "This stage demanded more patience than excitement. Product directions, presentation choices, and assumptions had to be compared, tested, and improved repeatedly.",
    tension:
      "Some options looked promising at first but failed under scrutiny. Others worked technically but still lacked the clarity or confidence the brand needed.",
    keyPoint:
      "The process created discipline by making sure only strong decisions survived repetition.",
    evidence:
      "Progress depended on removing weak paths before they shaped the final experience.",
    accent: "Pressure-tested",
  },
  {
    id: "stage-progress",
    index: "05",
    label: "Progress",
    title: "Progress became visible when the system started holding together.",
    summary:
      "Once enough weak decisions were filtered out, the outcomes became more coherent. The experience started feeling more stable, clearer, and more credible.",
    tension:
      "At this point, the challenge changed: not whether progress could happen once, but whether it could repeat consistently.",
    keyPoint:
      "Real progress showed up when better selection, better presentation, and better structure began aligning.",
    evidence:
      "The system started producing stronger outcomes because its internal standards were becoming consistent.",
    accent: "Clearer outcomes",
  },
  {
    id: "stage-current",
    index: "06",
    label: "Current",
    title: "The current stage is stronger, but intentionally unfinished.",
    summary:
      "Today, the brand has more structure, clearer direction, and a stronger understanding of what it should represent in a serious training journey.",
    tension:
      "But stability creates a new risk: becoming comfortable too early. The challenge now is to keep evolving without losing the discipline that created improvement.",
    keyPoint:
      "The current stage is best understood as a strong platform, not a final destination.",
    evidence:
      "The system matured enough to support growth while staying anchored to a clearer standard.",
    accent: "Stable base",
  },
  {
    id: "stage-future",
    index: "07",
    label: "Future",
    title: "The future is being designed with more precision, not more noise.",
    summary:
      "What comes next is not random expansion. It is a more focused effort to improve product experience, storytelling, and long-term relevance.",
    tension:
      "Growth can easily weaken a story when it introduces distraction. The real responsibility now is to scale without dilution.",
    keyPoint:
      "The future matters only if refinement stays stronger than impulse.",
    evidence:
      "The next chapter is defined by smarter growth, stronger standards, and more intentional evolution.",
    accent: "Smarter growth",
  },
];

const signals = [
  {
    title: "The problem was named properly",
    text:
      "Progress only started once the issue became specific enough to guide better decisions.",
  },
  {
    title: "Weak directions were removed",
    text:
      "The brand got stronger because attractive but unreliable paths were filtered out early.",
  },
  {
    title: "The system became repeatable",
    text:
      "The strongest signal of progress was consistency: better outcomes showing up through structure, not luck.",
  },
];

function useInView(options = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      {
        threshold: 0.2,
        ...options,
      }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [options]);

  return [ref, inView];
}

const Story = () => {
  const [activeStage, setActiveStage] = useState(stages[0].id);
  const [curveNodes, setCurveNodes] = useState([]);
  const [curveHeight, setCurveHeight] = useState(0);
  const mainShellRef = useRef(null);

  const stageMap = useMemo(
    () => Object.fromEntries(stages.map((stage) => [stage.id, stage])),
    []
  );

  const updateCurve = useCallback(() => {
    const shell = mainShellRef.current;
    if (!shell) return;

    const shellRect = shell.getBoundingClientRect();
    const nodes = stages.map((stage) => {
      const el = document.getElementById(stage.id);
      if (!el) return null;
      const rect = el.getBoundingClientRect();
      return rect.top - shellRect.top + rect.height / 2;
    });

    const valid = nodes.filter((value) => value != null);
    const maxY = valid.length ? Math.max(...valid) : 0;

    setCurveNodes(nodes);
    setCurveHeight(maxY + 220);
  }, []);

  useEffect(() => {
    const elements = stages
      .map((stage) => document.getElementById(stage.id))
      .filter(Boolean);

    if (!elements.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target?.id) {
          setActiveStage(visible[0].target.id);
        }
      },
      {
        threshold: [0.25, 0.4, 0.6, 0.75],
        rootMargin: "-12% 0px -18% 0px",
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    updateCurve();

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;

      window.requestAnimationFrame(() => {
        updateCurve();
        ticking = false;
      });
    };

    window.addEventListener("resize", updateCurve);
    window.addEventListener("load", updateCurve);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("resize", updateCurve);
      window.removeEventListener("load", updateCurve);
      window.removeEventListener("scroll", onScroll);
    };
  }, [updateCurve]);

  const scrollToStage = useCallback((id) => {
    const el = document.getElementById(id);
    if (!el) return;

    const rect = el.getBoundingClientRect();
    window.scrollTo({
      top: rect.top + window.scrollY - 104,
      behavior: "smooth",
    });
  }, []);

  const activeStageData = stageMap[activeStage] || stages[0];

  return (
    <div className="story-page">
      <StageDial stages={stages} activeStage={activeStage} />

      <header className="story-hero">
        <div className="story-hero-bg-rings" />
        <div className="story-hero-bg-accent" />

        <div className="story-hero-inner">
          <div className="story-hero-pill">
            <span className="story-hero-pill-dot" />
            <span className="story-hero-pill-text">A progress story</span>
          </div>

          <div className="story-hero-eyebrow">
            Built with discipline, not decoration.
          </div>

          <h1 className="story-hero-title">
            A visible problem.
            <br />
            A stronger system.
          </h1>

          <p className="story-hero-subtitle">
            This story follows a progression: problem, thought, plan, process,
            progress, current position, and future direction — each revealed as
            part of one continuous chapter scroll.
          </p>

          <p className="story-hero-trailer">
            Scroll through the page and the chapter dial will move with the story,
            turning the narrative into a visual progression instead of a static page.
          </p>

          <div className="story-hero-actions">
            <button
              type="button"
              className="story-btn story-btn-primary"
              onClick={() => scrollToStage(stages[0].id)}
            >
              Start the story
            </button>

            <a className="story-btn story-btn-secondary" href="/products">
              Explore collection
            </a>
          </div>

          <div className="story-hero-meta">
            <div className="story-hero-meta-card">
              <span className="story-hero-meta-label">Current chapter</span>
              <span className="story-hero-meta-value">
                {activeStageData.index} · {activeStageData.label}
              </span>
            </div>

            <div className="story-hero-meta-card">
              <span className="story-hero-meta-label">Format</span>
              <span className="story-hero-meta-value">Narrative chapter scroll</span>
            </div>
          </div>

          <div className="story-hero-scroll">
            <span className="story-hero-scroll-line" />
            <span className="story-hero-scroll-label">Scroll to move chapters</span>
          </div>
        </div>
      </header>

      <ManifestoBlock />

      <div className="story-main-shell" ref={mainShellRef}>
        <JourneyCurve
          stages={stages}
          activeStage={activeStage}
          curveNodes={curveNodes}
          curveHeight={curveHeight}
        />

        <TimelineStrip
          stages={stages}
          activeStage={activeStage}
          onStageClick={scrollToStage}
        />

        <main className="story-main">
          {stages.map((stage, index) => (
            <StageSection key={stage.id} stage={stage} index={index} />
          ))}
        </main>
      </div>

      <SignalsSection />
      <ClosingSection />
    </div>
  );
};

const StageDial = ({ stages, activeStage }) => {
  const [isDialMorphing, setIsDialMorphing] = useState(false);

  const activeIndex = Math.max(
    0,
    stages.findIndex((stage) => stage.id === activeStage)
  );

  const progressPercent = ((activeIndex + 1) / stages.length) * 100;

  const dialToneMap = useMemo(
    () => ({
      "stage-problem": "problem",
      "stage-thought": "thought",
      "stage-plan": "plan",
      "stage-process": "process",
      "stage-progress": "progress",
      "stage-current": "current",
      "stage-future": "future",
    }),
    []
  );

  const dialTone = dialToneMap[activeStage] || "problem";

  useEffect(() => {
    setIsDialMorphing(true);
    const timer = setTimeout(() => setIsDialMorphing(false), 1350);
    return () => clearTimeout(timer);
  }, [activeStage]);

  return (
    <div className="story-watch-dial story-watch-dial-left" aria-hidden="true">
      <div
        className={`story-watch-dial-wrap ${isDialMorphing ? "is-morphing" : ""}`}
        data-tone={dialTone}
        style={{
          "--dial-progress": progressPercent,
        }}
      >
        <svg
          className="story-watch-svg"
          viewBox="0 0 360 360"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient
              id="dialGlowStroke"
              x1="84"
              y1="72"
              x2="132"
              y2="300"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#fdba74" />
              <stop offset="45%" stopColor="#f97316" />
              <stop offset="100%" stopColor="#ea580c" />
            </linearGradient>
          </defs>

          <circle
            className="dial-ring dial-ring-main"
            cx="180"
            cy="180"
            r="116"
          />
          <circle
            className="dial-ring dial-ring-secondary"
            cx="180"
            cy="180"
            r="86"
          />
          <circle
            className="dial-core"
            cx="180"
            cy="180"
            r="56"
          />
          <circle
            className="dial-orbit"
            cx="180"
            cy="180"
            r="101"
          />

          <circle
            className="dial-arc-track"
            cx="180"
            cy="180"
            r="116"
            pathLength="100"
          />
          <circle
            className="dial-arc-accent"
            cx="180"
            cy="180"
            r="116"
            pathLength="100"
            style={{
              strokeDasharray: `${progressPercent} 100`,
            }}
          />

          {stages.map((stage, index) => {
            const start = -110;
            const end = 110;
            const step = (end - start) / Math.max(stages.length - 1, 1);
            const angle = start + index * step;
            const rad = (angle * Math.PI) / 180;

            const inner = index % 2 === 0 ? 93 : 98;
            const outer = index % 2 === 0 ? 116 : 112;

            const x1 = 180 + Math.cos(rad) * inner;
            const y1 = 180 + Math.sin(rad) * inner;
            const x2 = 180 + Math.cos(rad) * outer;
            const y2 = 180 + Math.sin(rad) * outer;

            const isActive = stage.id === activeStage;

            return (
              <line
                key={stage.id}
                className={`dial-tick ${index % 2 === 1 ? "tick-soft" : ""} ${isActive ? "is-active" : ""}`}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
              />
            );
          })}

          <g className="dial-hand">
            <path
              className="dial-hand-shape"
              d="M176 181 L112 177 Q104 180 99 186 Q107 191 116 192 L176 185 Z"
            />
            <line
              className="dial-hand-core-line"
              x1="176"
              y1="183"
              x2="108"
              y2="184"
            />
            <path
              className="dial-hand-tail"
              d="M182 180 L168 176 L171 184 Z"
            />
            <circle className="dial-hand-joint" cx="180" cy="180" r="10" />
            <circle className="dial-hand-joint-inner" cx="180" cy="180" r="4.5" />
            <circle className="dial-hand-tip" cx="104" cy="184" r="5" />
          </g>
        </svg>
      </div>
    </div>
  );
};

const ManifestoBlock = () => {
  const [ref, inView] = useInView();

  return (
    <section ref={ref} className={`story-manifesto ${inView ? "is-visible" : ""}`}>
      <div className="story-manifesto-label">Perspective</div>
      <p className="story-manifesto-text">
        Strong stories are not built from instant perfection. They are built from a
        problem that stays visible, a process that removes weak decisions, and a
        standard that becomes clearer through repetition.
      </p>
    </section>
  );
};

const JourneyCurve = ({ stages, activeStage, curveNodes, curveHeight }) => {
  if (!curveNodes.length || !curveHeight) return null;

  return (
    <div
      className="story-curve-wrapper"
      style={{ height: `${curveHeight}px` }}
      aria-hidden="true"
    >
      <svg
        className="story-curve"
        width="420"
        height={curveHeight}
        viewBox={`0 0 420 ${curveHeight}`}
        preserveAspectRatio="none"
      >
        <path
          d={`M210 20 C 310 ${curveHeight * 0.16}, 110 ${curveHeight * 0.34}, 210 ${
            curveHeight * 0.5
          } S 320 ${curveHeight * 0.82}, 210 ${curveHeight - 40}`}
          stroke="rgba(249, 115, 22, 0.22)"
          strokeWidth="1.5"
          fill="none"
        />
      </svg>

      {curveNodes.map((y, i) => {
        if (y == null) return null;
        const stage = stages[i];
        const isActive = stage?.id === activeStage;

        return (
          <span
            key={stage.id}
            className={`story-curve-node ${isActive ? "is-active" : ""}`}
            style={{ top: `${y}px` }}
          />
        );
      })}
    </div>
  );
};

const TimelineStrip = ({ stages, activeStage, onStageClick }) => {
  const [ref, inView] = useInView();

  return (
    <section ref={ref} className={`story-timeline-strip ${inView ? "is-visible" : ""}`}>
      <div className="story-timeline-inner">
        <div className="story-timeline-label">Journey chapters</div>

        <div className="story-timeline-track">
          {stages.map((stage) => (
            <button
              key={stage.id}
              className={`story-timeline-pill ${activeStage === stage.id ? "is-active" : ""}`}
              onClick={() => onStageClick(stage.id)}
              aria-pressed={activeStage === stage.id}
              type="button"
            >
              <span className="story-timeline-pill-index">{stage.index}</span>
              <span>{stage.label}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

const StageSection = ({ stage, index }) => {
  const [ref, inView] = useInView();
  const isOdd = index % 2 === 1;

  return (
    <section
      id={stage.id}
      ref={ref}
      className={`story-stage ${isOdd ? "is-odd" : ""} ${inView ? "is-visible" : ""}`}
    >
      <div className="story-stage-inner">
        <div className="story-stage-copy">
          <div className="story-stage-kicker">
            Chapter {stage.index} · {stage.label}
          </div>

          <h2 className="story-stage-title">{stage.title}</h2>
          <p className="story-stage-summary">{stage.summary}</p>
          <p className="story-stage-tension">{stage.tension}</p>

          <div className="story-stage-key">
            <div className="story-stage-key-label">Why it matters</div>
            <div className="story-stage-key-text">{stage.keyPoint}</div>
          </div>
        </div>

        <div className="story-stage-evidence">
          <div className="story-stage-card">
            <div className="story-stage-card-label">Stage insight</div>
            <div className="story-stage-card-text">{stage.evidence}</div>
          </div>

          <div className="story-stage-card story-stage-card-accent">
            <div className="story-stage-card-label">Signal</div>
            <div className="story-stage-card-text">{stage.accent}</div>
          </div>
        </div>
      </div>
    </section>
  );
};

const SignalsSection = () => {
  const [ref, inView] = useInView();

  return (
    <section ref={ref} className={`story-signals ${inView ? "is-visible" : ""}`}>
      <div className="story-signals-inner">
        <div className="story-section-heading">
          <div className="story-section-kicker">Signals of progress</div>
          <h2 className="story-section-title">
            The strongest signs appeared when the system became repeatable.
          </h2>
        </div>

        <div className="story-signals-grid">
          {signals.map((signal) => (
            <div key={signal.title} className="story-signal-card">
              <div className="story-signal-title">{signal.title}</div>
              <div className="story-signal-text">{signal.text}</div>
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
    <section ref={ref} className={`story-closing ${inView ? "is-visible" : ""}`}>
      <div className="story-closing-inner">
        <div className="story-closing-kicker">Closing thought</div>
        <h2 className="story-closing-title">
          Every chapter matters only if the result supports real effort.
        </h2>

        <p className="story-closing-text">
          This story is not about dramatic claims. It is about building a stronger
          system step by step, until the experience feels more disciplined,
          dependable, and worth trusting.
        </p>

        <p className="story-closing-text">
          That is what the future of FitGearzzz should keep protecting: not noise,
          but standards.
        </p>

        <div className="story-closing-actions">
          <a className="story-btn story-btn-primary" href="/products">
            View products
          </a>
          <a className="story-btn story-btn-secondary" href="/contact">
            Contact us
          </a>
        </div>
      </div>
    </section>
  );
};

export default Story;
