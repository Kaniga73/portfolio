import { useEffect, useRef, useState } from "react";
import "../styles/Projects.css";

const projectsData = [
  {
    
  
    title: "Ideate",
    desc: "Role-based web app with idea submission, status tracking, and feedback, built using LocalStorage and reusable components.",
    tags: ["React", "LocalStorage"],
    live: "https://ideate-two.vercel.app/",
    github: "https://github.com/Kaniga73/ideate.git",
  },
  {
   
    title: "Personal Portfolio",
    desc: "A responsive, interactive portfolio built with React and CSS to highlight my projects, skills, and frontend expertise.",
    tags: ["React", "CSS3"],
    live: "Kanigadev.vercel.app",
    github: "https://github.com/Kaniga73/portfolio.git",
  },
];

function ProjectCard({ project, index }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`proj-card ${visible ? "proj-card-visible" : ""}`}
      style={{ transitionDelay: `${(index % 3) * 0.12}s` }}
    >
      {/* Content only */}
      <div className="proj-body">
        <h3 className="proj-title">{project.title}</h3>
        <p className="proj-desc">{project.desc}</p>

        <div className="proj-tags">
          {project.tags.map((tag, i) => (
            <span key={i} className="proj-tag">{tag}</span>
          ))}
        </div>

        <div className="proj-links">
          <a href={project.live} className="proj-link">
            Live <span className="proj-arrow">↗</span>
          </a>
          <a href={project.github} className="proj-link">
            GitHub <span className="proj-arrow">↗</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
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
    <section className="proj-section" id="projects">
      {/* Header */}
      <div
        ref={headerRef}
        className={`proj-header ${headerVisible ? "proj-header-visible" : ""}`}
      >
        <div className="proj-label">
          <span className="proj-label-line" />
          PROJECTS
        </div>
        <h2 className="proj-title-main">
          what I've <em>Built.</em>
        </h2>
      </div>

      {/* Grid */}
      <div className="proj-grid">
        {projectsData.map((project, i) => (
          <ProjectCard key={i} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}