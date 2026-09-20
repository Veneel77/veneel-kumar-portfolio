import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowUpRight,
  Download,
  Mail,
  Menu,
  X,
  Sparkles,
  ExternalLink,
  ChevronDown,
} from 'lucide-react';
import './styles.css';

const projects = [
  {
    number: '01',
    title: 'Agentic Data Pipeline Reliability Platform',
    label: 'AGENTIC AI · RAG · MLOPS',
    description:
      'LLM-powered agents automate the ETL incident lifecycle — failure classification, root-cause analysis, fix recommendation and incident-report generation.',
    stack: ['Python', 'CrewAI', 'Gemini', 'ChromaDB', 'FastAPI', 'Docker'],
    href: 'https://github.com/Veneel77',
  },
  {
    number: '02',
    title: 'RAG-Based Knowledge Assistant',
    label: 'RAG · VECTOR SEARCH · NLP',
    description:
      'End-to-end document intelligence pipeline with ingestion, chunking, HuggingFace embeddings, ChromaDB retrieval and a modular FastAPI backend.',
    stack: [
      'Python',
      'LangChain',
      'ChromaDB',
      'HuggingFace',
      'FastAPI',
      'Streamlit',
    ],
    href: 'https://github.com/Veneel77/RAG-based-Knowledge-assistant',
  },
  {
    number: '03',
    title: 'Customer Churn Prediction System',
    label: 'MACHINE LEARNING · BI',
    description:
      'Reproducible ML pipeline on the IBM Telco dataset with feature engineering, XGBoost modelling and a Power BI dashboard for business impact.',
    stack: ['Python', 'Scikit-Learn', 'XGBoost', 'Pandas', 'Power BI'],
    href: 'https://github.com/Veneel77/Customer-Churn-Prediction-System',
  },
];

const skills = [
  [
    'LLM & Agentic AI',
    'CrewAI · LangChain · Prompt Engineering · Tool Calling',
  ],
  [
    'RAG & Vector Search',
    'ChromaDB · Embeddings · Semantic Retrieval · Evaluation',
  ],
  [
    'ML & Deep Learning',
    'TensorFlow · Keras · Scikit-Learn · XGBoost · CNNs',
  ],
  [
    'Backend & APIs',
    'FastAPI · REST APIs · Microservices · Docker · Kubernetes',
  ],
  [
    'Cloud & MLOps',
    'AWS SageMaker · EC2 · S3 · IAM · GCP · CI/CD',
  ],
  [
    'Data Engineering',
    'Airflow · ETL/ELT · Pandas · NumPy · SQL',
  ],
];

const timeline = [
  {
    date: 'JUL 2026 — AUG 2026',
    role: 'AI Intern',
    company: 'Techjays',
    detail:
      'Structured AI internship focused on practical AI engineering workflows and applied AI delivery.',
  },
  {
    date: 'SEP 2024 — FEB 2025',
    role: 'AI/ML Engineer Trainee',
    company: 'Rooman Technologies',
    detail:
      'Engineered end-to-end ML pipelines and a Heart Disease Prediction system using ensemble methods, modular Python and systematic evaluation.',
  },
  {
    date: 'JUL 2025',
    role: 'B.E. — Artificial Intelligence & Data Science',
    company: 'KSSEM, Bangalore',
    detail:
      'Coursework across deep learning, computer vision, machine learning, cloud computing, image processing, NLP, DBMS and DSA.',
  },
];

function NetworkBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    let raf;
    let points = [];
    let w = 0;
    let h = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;

      w = window.innerWidth;
      h = window.innerHeight;

      canvas.width = w * dpr;
      canvas.height = h * dpr;

      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      points = Array.from(
        {
          length: Math.min(70, Math.floor(w / 18)),
        },
        () => ({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.18,
          vy: (Math.random() - 0.5) * 0.18,
        })
      );
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      for (const p of points) {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
      }

      for (let i = 0; i < points.length; i++) {
        const a = points[i];

        ctx.beginPath();
        ctx.arc(a.x, a.y, 1.2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(119,156,255,.48)';
        ctx.fill();

        for (let j = i + 1; j < points.length; j++) {
          const b = points[j];

          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.hypot(dx, dy);

          if (d < 135) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);

            ctx.strokeStyle = `rgba(93,115,255,${
              (1 - d / 135) * 0.18
            })`;

            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }

      raf = requestAnimationFrame(draw);
    };

    resize();

    window.addEventListener('resize', resize);

    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="network"
      aria-hidden="true"
    />
  );
}

function BrandIcon({ type }) {
  if (type === 'github') {
    return <span className="brand-icon github-brand">GH</span>;
  }

  if (type === 'linkedin') {
    return <span className="brand-icon linkedin-brand">in</span>;
  }

  return null;
}

function App() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('home');

  useEffect(() => {
    const els = [...document.querySelectorAll('section[id]')];

    const onScroll = () => {
      const y = window.scrollY + 180;

      let id = 'home';

      els.forEach((element) => {
        if (y >= element.offsetTop) {
          id = element.id;
        }
      });

      setActive(id);
    };

    window.addEventListener('scroll', onScroll, {
      passive: true,
    });

    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const nav = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: 'smooth',
    });

    setOpen(false);
  };

  return (
    <div className="site">
      <NetworkBackground />

      <div className="noise" />

      <header className="nav">
        <button
          className="brand"
          onClick={() => nav('home')}
          type="button"
        >
          <span>VK</span>
          <b>VENEEL KUMAR A.</b>
        </button>

        <button
          className="menu"
          onClick={() => setOpen(!open)}
          type="button"
          aria-label="Toggle navigation"
        >
          {open ? <X /> : <Menu />}
        </button>

        <nav className={open ? 'open' : ''}>
          {['home', 'about', 'work', 'experience', 'skills'].map(
            (id) => (
              <button
                key={id}
                className={active === id ? 'active' : ''}
                onClick={() => nav(id)}
                type="button"
              >
                {id}
              </button>
            )
          )}

          <a
            className="nav-cta"
            href="mailto:veneeldas77@gmail.com"
          >
            LET'S TALK <ArrowUpRight size={15} />
          </a>
        </nav>
      </header>

      <main>
        {/* HERO */}

        <section id="home" className="hero section-pad">
          <div className="eyebrow">
            <span className="pulse" />
            AVAILABLE FOR AI / ML OPPORTUNITIES
          </div>

          <div className="hero-grid">
            <div className="hero-copy">
              <p className="kicker">
                AI ENGINEER · GENAI · MLOPS
              </p>

              <h1>
                Building <em>intelligent</em>
                <br />
                systems that matter.
              </h1>

              <p className="lead">
                I design, train and deploy AI systems across computer
                vision, deep learning, RAG, agentic AI and cloud-native
                MLOps.
              </p>

              <div className="actions">
                <button
                  className="primary"
                  onClick={() => nav('work')}
                  type="button"
                >
                  EXPLORE MY WORK
                  <ArrowUpRight size={17} />
                </button>

                <a
                  className="secondary"
                  href={`${import.meta.env.BASE_URL}assets/Veneel-Kumar-CV.pdf`}
                  download
                >
                  <Download size={16} />
                  DOWNLOAD CV
                </a>
              </div>

              <div className="quick-links">
                <a
                  href="https://github.com/Veneel77"
                  target="_blank"
                  rel="noreferrer"
                >
                  <BrandIcon type="github" />
                  GitHub
                </a>

                <a
                  href="https://www.linkedin.com/in/veneelkumara77"
                  target="_blank"
                  rel="noreferrer"
                >
                  <BrandIcon type="linkedin" />
                  LinkedIn
                </a>

                <a href="mailto:veneeldas77@gmail.com">
                  <Mail size={16} />
                  Email
                </a>
              </div>
            </div>

            <div className="hero-visual">
              <div className="orbit orbit-a" />
              <div className="orbit orbit-b" />

              <div className="profile-wrap">
                <img
                  src={`${import.meta.env.BASE_URL}assets/veneel-profile.jpeg`}
                  alt="Veneel Kumar A."
                />

                <div className="profile-glow" />
              </div>

              <div className="floating-tag tag-one">
                PYTHON × AI
              </div>

              <div className="floating-tag tag-two">
                RAG / AGENTS
              </div>

              <div className="floating-tag tag-three">
                AWS · MLOPS
              </div>
            </div>
          </div>

          <div className="scroll-cue">
            <span>SCROLL TO EXPLORE</span>
            <ChevronDown size={17} />
          </div>
        </section>

        {/* ABOUT */}

        <section id="about" className="section-pad about">
          <div className="section-head">
            <span>01 / ABOUT</span>

            <h2>
              An engineer who likes
              <br />
              <em>building end-to-end.</em>
            </h2>
          </div>

          <div className="about-grid">
            <div className="big-number">
              AI
              <br />
              <span>ENGINEER</span>
            </div>

            <div className="about-text">
              <p className="large">
                My work sits at the intersection of{' '}
                <strong>
                  machine learning, generative AI and production
                  engineering.
                </strong>
              </p>

              <p>
                I build systems that move beyond notebooks — from
                data ingestion and model training to APIs, containers,
                cloud deployment, retrieval pipelines and
                observability.
              </p>

              <p>
                My foundation spans computer vision and deep learning,
                while my current focus is LLM-powered agents, RAG
                systems and cloud-native AI.
              </p>

              <div className="facts">
                <div>
                  <b>01</b>
                  <span>
                    Peer-reviewed
                    <br />
                    AI research
                  </span>
                </div>

                <div>
                  <b>90%+</b>
                  <span>
                    MRI classification
                    <br />
                    accuracy
                  </span>
                </div>

                <div>
                  <b>210+</b>
                  <span>
                    LeetCode
                    <br />
                    problems
                  </span>
                </div>

                <div>
                  <b>01</b>
                  <span>
                    College AI
                    <br />
                    Hackathon win
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PROJECTS */}

        <section id="work" className="section-pad work">
          <div className="section-head row">
            <div>
              <span>02 / SELECTED WORK</span>

              <h2>
                Systems I've
                <br />
                <em>built.</em>
              </h2>
            </div>

            <p>
              Selected projects across agentic AI, RAG, machine
              learning and business intelligence.
            </p>
          </div>

          <div className="project-list">
            {projects.map((project) => (
              <article
                className="project"
                key={project.number}
              >
                <div className="project-num">
                  {project.number}
                </div>

                <div className="project-main">
                  <div className="project-label">
                    {project.label}
                  </div>

                  <h3>{project.title}</h3>

                  <p>{project.description}</p>

                  <div className="chips">
                    {project.stack.map((stack) => (
                      <span key={stack}>{stack}</span>
                    ))}
                  </div>
                </div>

                <a
                  className="project-link"
                  href={project.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Open ${project.title}`}
                >
                  <ArrowUpRight />
                </a>
              </article>
            ))}
          </div>
        </section>

        {/* EXPERIENCE */}

        <section
          id="experience"
          className="section-pad experience"
        >
          <div className="section-head">
            <span>03 / EXPERIENCE</span>

            <h2>The path so far.</h2>
          </div>

          <div className="timeline">
            {timeline.map((item, index) => (
              <div
                className="timeline-item"
                key={item.date}
              >
                <div className="timeline-dot">
                  0{index + 1}
                </div>

                <div className="timeline-date">
                  {item.date}
                </div>

                <div className="timeline-content">
                  <h3>{item.role}</h3>
                  <h4>{item.company}</h4>
                  <p>{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SKILLS */}

        <section id="skills" className="section-pad skills">
          <div className="section-head row">
            <div>
              <span>04 / TOOLKIT</span>

              <h2>
                My engineering
                <br />
                <em>stack.</em>
              </h2>
            </div>

            <p>
              Tools I use to turn ideas into working AI products.
            </p>
          </div>

          <div className="skill-grid">
            {skills.map(([name, description], index) => (
              <div
                className="skill-card"
                key={name}
              >
                <span>0{index + 1}</span>

                <h3>{name}</h3>

                <p>{description}</p>

                <div className="skill-line">
                  <i
                    style={{
                      width: `${88 - index * 6}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="cloud-strip">
            <span>PYTHON</span>
            <span>SQL</span>
            <span>TENSORFLOW</span>
            <span>LANGCHAIN</span>
            <span>CREWAI</span>
            <span>FASTAPI</span>
            <span>DOCKER</span>
            <span>AWS</span>
            <span>SPARK</span>
            <span>AIRFLOW</span>
          </div>
        </section>

        {/* RESEARCH */}

        <section className="section-pad research">
          <div className="research-card">
            <div>
              <span>RESEARCH / 2025</span>

              <h2>
                Alzheimer's Diagnosis
                <br />
                <em>via Deep Learning.</em>
              </h2>
            </div>

            <div>
              <p>
                Peer-reviewed research applying CNN architectures
                and transfer learning with VGG16 and ResNet50 on
                MRI medical-imaging datasets for multi-class
                Alzheimer's stage classification.
              </p>

              <strong>
                &gt;90% accuracy · Hyperparameter tuning · Data
                augmentation
              </strong>
            </div>
          </div>
        </section>

        {/* CONTACT */}

        <section className="section-pad contact">
          <div className="contact-card">
            <Sparkles size={20} />

            <span>05 / CONTACT</span>

            <h2>
              Let's build something
              <br />
              <em>intelligent.</em>
            </h2>

            <p>
              Open to full-time opportunities in AI Engineering,
              Machine Learning, Data Science and MLOps.
            </p>

            <a
              href="mailto:veneeldas77@gmail.com"
              className="primary"
            >
              START A CONVERSATION
              <ArrowUpRight size={17} />
            </a>
          </div>
        </section>
      </main>

      {/* FOOTER */}

      <footer>
        <div>
          <b>VENEEL KUMAR A.</b>
          <span>AI ENGINEER · BANGALORE, INDIA</span>
        </div>

        <div className="footer-links">
          <a href="mailto:veneeldas77@gmail.com">
            <Mail size={15} />
            Email
          </a>

          <a
            href="https://github.com/Veneel77"
            target="_blank"
            rel="noreferrer"
          >
            <BrandIcon type="github" />
            GitHub
          </a>

          <a
            href="https://www.linkedin.com/in/veneelkumara77"
            target="_blank"
            rel="noreferrer"
          >
            <BrandIcon type="linkedin" />
            LinkedIn
          </a>
        </div>

        <small>
          © {new Date().getFullYear()} VENEEL KUMAR A. · BUILT WITH
          REACT
        </small>
      </footer>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);