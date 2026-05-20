import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["about", "projects", "skills", "experience", "contact"];

const PROJECTS = [
  {
    title: "BubbleGoBoom ",
    desc: "2D dungeon crawler game started as submission in Global Game Jam 2025.  Built in Unity using C#.",
    tags: ["Unity", "C#", "JSON"],
    year: "2025",
    link: "https://github.com/WasdMash/BubbleGoBoom",
  },
  {
    title: "CLI social media prototype",
    desc: "Prototyped a C++ text-based social media platform with a voting system using dynamic memory allocation",
    tags: ["C++"],
    year: "2024",
    link: "https://github.com/WasdMash/C-Collection/tree/main/C%2B%2B/Assignment_2",
  },
];

const SKILLS = [
  { category: "Languages", items: ["C#", "Java",, "Python", "C++", "SQL"] },
  { category: "Frontend", items: ["React", "WebGL", "CSS/Sass", "Figma"] },
  { category: "Backend", items: ["FastAPI", "Flask", "REST"] },
  { category: "Infra", items: ["Docker","Jira"] },
];

const EXPERIENCE = [
  {
    role: "Software Developer",
    company: "MoneyAma ",
    period: "2024 — Present",
    desc: "Built client-facing web apps with social media management automation, wiring together n8n, Gemini, and Python scripts to handle email and LinkedIn workflows, plus websites with Stripe payment integration.",
  },
  {
    role: "Unity C# VR Developer",
    company: "Lancaster University Innovation Hub",
    period: "2024 — 2024",
    desc: "Developed VR experiences in Unity and utilising SCRUM practises with Azure DevOps to secure over £1 million in funding.",
  },
  {
    role: "Software Engineer Intern",
    company: "Inchtone (uH4tToH)",
    period: "2022 — 2022",
    desc: "Built a Python facial expression recognition model and supposed development of an AI shopping assistant",
  },
];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function FadeIn({ children, delay = 0, className = "" }) {
  const [ref, visible] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

function Dot() {
  return <span style={{ color: "#00FFC2", marginLeft: 1 }}>.</span>;
}

export default function Portfolio() {
  const [active, setActive] = useState("about");
  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const handler = () => {
      const sections = NAV_LINKS.map(id => document.getElementById(id));
      const scrollY = window.scrollY + 120;
      let cur = "about";
      sections.forEach(s => { if (s && s.offsetTop <= scrollY) cur = s.id; });
      setActive(cur);
    };
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const handleSend = async (e) => {
  e.preventDefault();
  try {
    const res = await fetch(`${API_URL}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    if (res.ok) setSent(true);
    else alert("Something went wrong, try again.");
  } catch {
    alert("Could not reach the server.");
  }
};

  return (
    <div style={{
      fontFamily: "'Space Mono', 'Fira Code', monospace",
      background: "#080C10",
      color: "#C8D6E5",
      minHeight: "100vh",
      position: "relative",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Syne:wght@400;600;700;800&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::selection { background: #00FFC233; }
        html { scroll-behavior: smooth; }

        .noise {
          position: fixed; inset: 0; pointer-events: none; z-index: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
          opacity: 0.4;
        }

        .grid-bg {
          position: fixed; inset: 0; pointer-events: none; z-index: 0;
          background-image:
            linear-gradient(rgba(0,255,194,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,255,194,0.03) 1px, transparent 1px);
          background-size: 40px 40px;
        }

        .nav-link {
          background: none; border: none; cursor: pointer;
          font-family: inherit; font-size: 11px; letter-spacing: 0.15em;
          text-transform: uppercase; padding: 6px 0;
          color: #5a7a8a; transition: color 0.2s;
          position: relative;
        }
        .nav-link:hover { color: #C8D6E5; }
        .nav-link.active { color: #00FFC2; }
        .nav-link.active::after {
          content: ''; position: absolute; bottom: 0; left: 0; right: 0;
          height: 1px; background: #00FFC2;
        }

        .tag {
          font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase;
          padding: 3px 8px; border: 1px solid #1a2a35;
          color: #00FFC2; background: #00FFC210;
          border-radius: 2px;
        }

        .card {
          border: 1px solid #111d24;
          background: #0b1117;
          border-radius: 4px;
          padding: 24px;
          transition: border-color 0.2s, transform 0.2s;
        }
        .card:hover {
          border-color: #00FFC240;
          transform: translateY(-2px);
        }

        .skill-item {
          font-size: 12px; letter-spacing: 0.05em;
          padding: 6px 12px;
          border: 1px solid #111d24;
          background: #0b1117;
          border-radius: 2px; color: #8aaabb;
          transition: color 0.2s, border-color 0.2s;
        }
        .skill-item:hover { color: #00FFC2; border-color: #00FFC230; }

        .timeline-line {
          position: absolute; left: 7px; top: 12px; bottom: 0;
          width: 1px; background: #111d24;
        }

        .form-field {
          width: 100%; background: #0b1117; border: 1px solid #111d24;
          color: #C8D6E5; font-family: inherit; font-size: 13px;
          padding: 10px 14px; border-radius: 2px; outline: none;
          transition: border-color 0.2s;
        }
        .form-field:focus { border-color: #00FFC250; }
        .form-field::placeholder { color: #2a4050; }

        .btn-primary {
          background: #00FFC215; border: 1px solid #00FFC260;
          color: #00FFC2; font-family: inherit; font-size: 11px;
          letter-spacing: 0.15em; text-transform: uppercase;
          padding: 10px 24px; cursor: pointer; border-radius: 2px;
          transition: background 0.2s, border-color 0.2s;
        }
        .btn-primary:hover { background: #00FFC230; border-color: #00FFC2; }

        .section { padding: 80px 0; position: relative; z-index: 1; }
        .section-label {
          font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase;
          color: #00FFC2; margin-bottom: 8px;
        }
        .section-title {
          font-family: 'Syne', sans-serif; font-size: clamp(28px, 5vw, 44px);
          font-weight: 800; color: #E8F4FF; line-height: 1.1; margin-bottom: 40px;
        }

        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #080C10; }
        ::-webkit-scrollbar-thumb { background: #1a2a35; border-radius: 2px; }
      `}</style>

      <div className="noise" />
      <div className="grid-bg" />

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        borderBottom: "1px solid #0f1a22",
        background: "rgba(8,12,16,0.9)",
        backdropFilter: "blur(12px)",
        padding: "0 clamp(16px, 5vw, 80px)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        height: 56,
      }}>
        <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 17, color: "#E8F4FF" }}>
          dev<Dot />
        </div>
        <div style={{ display: "flex", gap: 28 }}>
          {NAV_LINKS.map(id => (
            <button key={id} className={`nav-link ${active === id ? "active" : ""}`} onClick={() => scrollTo(id)}>
              {id}
            </button>
          ))}
        </div>
      </nav>

      <div style={{ maxWidth: 820, margin: "0 auto", padding: "0 clamp(16px, 5vw, 40px)" }}>

        {/* HERO */}
        <section id="about" className="section" style={{ paddingTop: 160, paddingBottom: 100 }}>
          <div style={{ fontSize: 11, letterSpacing: "0.2em", color: "#00FFC2", textTransform: "uppercase", marginBottom: 20 }}>
            — Available for work
          </div>
          <h1 style={{
            fontFamily: "'Syne', sans-serif", fontWeight: 800,
            fontSize: "clamp(40px, 8vw, 72px)", color: "#E8F4FF",
            lineHeight: 1.0, marginBottom: 24,
          }}>
            Nana Amfo-Brobbey<Dot /><br />
            <span style={{ color: "#2a4a60" }}>Software</span><br />
            <span style={{ color: "#2a4a60" }}>Engineer</span>
          </h1>
          <p style={{ fontSize: 14, lineHeight: 1.9, color: "#6a8a9a", maxWidth: 480, marginBottom: 36 }}>
            Software developer with hands-on experience across VR, AI automation, and full-stack development.
            I've contributed to Unity C# VR projects that helped secure over £1M in funding, working in agile SCRUM teams via Azure DevOps.
            Seeking a software development role where I can apply these skills.
            Based in Manchester, working everywhere.
          </p>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            {[
              { label: "GitHub", url: "https://github.com/WasdMash?tab=repositories" },
              { label: "LinkedIn", url: "https://www.linkedin.com/in/nana-amfo-brobbey-3424a1240/" },
              { label: "Resume", url: "src/assets/cv.pdf" },
            ].map(({ label, url }) => (
              <a key={label} href={url} target="_blank" rel="noopener noreferrer" className="btn-primary"
                style={{ textDecoration: "none" }}>
                {label}
              </a>
            ))}
          </div>

        </section>

        {/* PROJECTS */}
        <section id="projects" className="section">
          <FadeIn>
            <div className="section-label">// projects</div>
            <div className="section-title">Selected work</div>
          </FadeIn>
          <div style={{ display: "grid", gap: 16 }}>
            {PROJECTS.map((p, i) => (
              <FadeIn key={p.title} delay={i * 0.08}>
                <div className="card">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10, gap: 12 }}>
                    <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 18, color: "#E8F4FF" }}>{p.title}</div>
                    <div style={{ fontSize: 11, color: "#2a4a60", letterSpacing: "0.1em", flexShrink: 0 }}>{p.year}</div>
                  </div>
                  <p style={{ fontSize: 13, lineHeight: 1.8, color: "#6a8a9a", marginBottom: 16 }}>{p.desc}</p>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {p.tags.map(t => <span key={t} className="tag">{t}</span>)}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* SKILLS */}
        <section id="skills" className="section">
          <FadeIn>
            <div className="section-label">// skills</div>
            <div className="section-title">Technical stack</div>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 24 }}>
            {SKILLS.map((s, i) => (
              <FadeIn key={s.category} delay={i * 0.07}>
                <div>
                  <div style={{ fontSize: 10, letterSpacing: "0.15em", color: "#00FFC2", textTransform: "uppercase", marginBottom: 12 }}>
                    {s.category}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    {s.items.map(item => (
                      <div key={item} className="skill-item">{item}</div>
                    ))}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* EXPERIENCE */}
        <section id="experience" className="section">
          <FadeIn>
            <div className="section-label">// experience</div>
            <div className="section-title">Where I've worked</div>
          </FadeIn>
          <div style={{ position: "relative", paddingLeft: 28 }}>
            <div className="timeline-line" />
            {EXPERIENCE.map((e, i) => (
              <FadeIn key={e.company} delay={i * 0.1}>
                <div style={{ position: "relative", marginBottom: 40 }}>
                  <div style={{
                    position: "absolute", left: -28, top: 6,
                    width: 14, height: 14, borderRadius: "50%",
                    border: "2px solid #00FFC2", background: "#080C10",
                  }} />
                  <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 4, marginBottom: 4 }}>
                    <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 16, color: "#E8F4FF" }}>{e.role}</span>
                    <span style={{ fontSize: 11, color: "#2a4a60", letterSpacing: "0.1em" }}>{e.period}</span>
                  </div>
                  <div style={{ fontSize: 12, color: "#00FFC2", marginBottom: 10, letterSpacing: "0.05em" }}>{e.company}</div>
                  <p style={{ fontSize: 13, lineHeight: 1.8, color: "#6a8a9a" }}>{e.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>


        {/* CONTACT */}
        <section id="contact" className="section" style={{ paddingBottom: 120 }}>
          <FadeIn>
            <div className="section-label">// contact</div>
            <div className="section-title">Get in touch</div>
          </FadeIn>
          {sent ? (
            <FadeIn>
              <div className="card" style={{ textAlign: "center", padding: 48 }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>✓</div>
                <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 18, color: "#E8F4FF", marginBottom: 8 }}>Message sent</div>
                <div style={{ fontSize: 13, color: "#6a8a9a" }}>I'll get back to you within a couple of days.</div>
              </div>
            </FadeIn>
          ) : (
            <FadeIn>
              <div className="card" style={{ maxWidth: 520 }}>
                <div style={{ display: "grid", gap: 16 }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    <div>
                      <div style={{ fontSize: 10, letterSpacing: "0.15em", color: "#2a4a60", textTransform: "uppercase", marginBottom: 8 }}>Name</div>
                      <input
                        className="form-field"
                        placeholder="Your name"
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <div style={{ fontSize: 10, letterSpacing: "0.15em", color: "#2a4a60", textTransform: "uppercase", marginBottom: 8 }}>Email</div>
                      <input
                        className="form-field"
                        type="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: 10, letterSpacing: "0.15em", color: "#2a4a60", textTransform: "uppercase", marginBottom: 8 }}>Message</div>
                    <textarea
                      className="form-field"
                      rows={5}
                      placeholder="What's on your mind?"
                      value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                      style={{ resize: "vertical" }}
                    />
                  </div>
                  <div>
                    <button className="btn-primary" onClick={handleSend}>Send message →</button>
                  </div>
                </div>
              </div>
            </FadeIn>
          )}
        </section>

      </div>

      {/* Footer */}
      <div style={{
        borderTop: "1px solid #0f1a22", padding: "20px clamp(16px, 5vw, 40px)",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        fontSize: 11, letterSpacing: "0.1em", color: "#1a3040",
        position: "relative", zIndex: 1,
      }}>
        <span>© 2026 Nana Amfo-Brobbey</span>
        <span>Built with React</span>
      </div>
    </div>
  );
}
