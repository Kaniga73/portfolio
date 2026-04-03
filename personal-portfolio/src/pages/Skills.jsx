import { useEffect, useRef, useState } from "react";
import "../styles/Skills.css";

const skillsData = [
  {
    icon: "</>",
    category: "Frontend",
    skills: ["React", "JavaScript",  "HTML5", "CSS3", "Tailwind CSS", "Responsive Design","Git"],
  },
  {
    icon:"▲",
    category: "Soft Skills",
    skills: ["Presentation", "Creativity", "Collaboration","Content Writing"],
  },
  {
    icon: "✦",
    category: "Tools & Platforms",
    skills: ["VS Code", "GitHub", "Figma", "npm", "Vite", "Vercel"],
  },
];

function SkillColumn({ data, index }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`skill-col ${visible ? "skill-col-visible" : ""}`}
      style={{ transitionDelay: `${index * 0.12}s` }}
    >
      <div className="skill-cat-header">
        <span className="skill-cat-icon">{data.icon}</span>
        <h3 className="skill-cat-title">{data.category}</h3>
      </div>

      <div className="skill-tags">
        {data.skills.map((skill, i) => (
          <span
            key={i}
            className="skill-tag"
            style={{ animationDelay: visible ? `${index * 0.12 + i * 0.05}s` : "0s" }}
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  const headerRef = useRef(null);
  const [headerVisible, setHeaderVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setHeaderVisible(true); },
      { threshold: 0.3 }
    );
    if (headerRef.current) observer.observe(headerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="skills-section" id="skills">
      {/* Header */}
      <div
        ref={headerRef}
        className={`skills-header ${headerVisible ? "skills-header-visible" : ""}`}
      >
        <div className="skills-label">
          <span className="skills-label-line" />
          SKILLS
        </div>
        <h2 className="skills-title">
          Tools and <em>Technologies.</em>
        </h2>
      </div>

      {/* Grid */}
      <div className="skills-grid">
        {skillsData.map((col, i) => (
          <SkillColumn key={i} data={col} index={i} />
        ))}
      </div>
    </section>
  );
}