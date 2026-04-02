import { useEffect, useRef, useState } from "react";
import "../styles/Education.css";

const educationData = [
  {
    period: "2023–2027",
    degree: "B.E. in Computer Science & Engineering",
    institution: "Adhiyamaan College Of Engineering,Hosur,Tamilnadu",
    description:
      "Focusing on software development, data structures, and web technologies.",
    badge: "CGPA: 9.6 / 10",
  },
  {
    period: "2022–2023",
    degree: "Higher Secondary ",
    institution: "St.Joseph's Matriculation Higher Secondary School,Hosur,Tamilnadu",
    description:
      "Completed 12th grade and Built a strong foundation in science and mathematics.",
    badge: "Score: 89.33%",
  },
];

function EduCard({ item, index }) {
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
      className={`edu-row ${visible ? "edu-visible" : ""}`}
      style={{ transitionDelay: `${index * 0.15}s` }}
    >
      <div className="edu-year">{item.period}</div>

      <div className="edu-content">
        <h3 className="edu-degree">{item.degree}</h3>
        <p className="edu-institution">{item.institution}</p>
        <p className="edu-desc">{item.description}</p>
        <span className="edu-badge">{item.badge}</span>
      </div>
    </div>
  );
}

export default function Education() {
  const titleRef = useRef(null);
  const [titleVisible, setTitleVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setTitleVisible(true); },
      { threshold: 0.3 }
    );
    if (titleRef.current) observer.observe(titleRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="edu-section" id="education">
      {/* Section Title */}
      <div
        ref={titleRef}
        className={`edu-header ${titleVisible ? "edu-header-visible" : ""}`}
      >
        <div className="section-label">
  <span className="section-label-line" />
  EDUCATION
</div>
        <h2 className="edu-title">
          Academic <em>foundations</em>
        </h2>
      </div>

      <div className="edu-divider" />

      {/* Cards */}
      <div className="edu-list">
        {educationData.map((item, i) => (
          <EduCard key={i} item={item} index={i} />
        ))}
      </div>
    </section>
  );
}