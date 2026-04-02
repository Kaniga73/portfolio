import { useState, useEffect } from "react";
import "../styles/HeroSection.css";
import { Link } from "react-scroll";

export default function HeroSection() {
  const [count, setCount] = useState({ years: 0, projects: 0, clients: 0 });

  useEffect(() => {
    const targets = { years: 2, projects: 2, clients: 2 };
    const duration = 1200;
    const steps = 40;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount({
        years: Math.round(targets.years * eased),
        projects: Math.round(targets.projects * eased),
        clients: Math.round(targets.clients * eased),
      });
      if (step >= steps) clearInterval(timer);
    }, duration / steps);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
    
<nav className="navbar">
  <div className="nav-logo">Kaniga R</div>
  <ul className="nav-links">
    <li><Link to="home" smooth={true} duration={700}>Home</Link></li>
    <li><Link to="about" smooth={true} duration={700}>About</Link></li>
    <li><Link to="education" smooth={true} duration={700}>Education</Link></li>
    <li><Link to="skills" smooth={true} duration={700}>Skills</Link></li>
    <li><Link to="projects" smooth={true} duration={700}>Projects</Link></li>
    <li><Link to="contact" smooth={true} duration={700}>Contact</Link></li>
    <li><Link to="contact" smooth={true} duration={700} className="nav-cta">Hire Me</Link></li>
  </ul>
</nav>

      <section className="hero" id="home">
        <div className="hero-left">
          

          <h1 className="hero-title">
            Crafting <em>beautiful</em><br />
            digital<br />
            experiences
          </h1>

          <p className="hero-desc">
           Hi, I’m Kaniga.
           I build clean, user-friendly web interfaces that look great and feel smooth, 
           focusing on thoughtful design and seamless interactions.          </p>

          <div className="hero-btns">
            <a href="#" className="btn-primary">
              Resume <span className="arrow">↗</span>
            </a>
            <a href="#contact" className="btn-secondary">Contact Me</a>
          </div>

          <div className="stats">
            <div className="stat-item">
              <div className="stat-number">{count.years}<sup>+</sup></div>
              <div className="stat-label">Years Exp.</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">{count.projects}</div>
              <div className="stat-label">Projects</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">{count.clients}</div>
              <div className="stat-label">Happy Clients</div>
            </div>
          </div>
        </div>

        {/* Right */}
{/* Right */}
<div className="hero-right">
  <div className="blob-wrap">

    {/* Circle Frame */}
    <div className="circle-frame">
      <img src="/your-photo.jpg" alt="Profile" className="profile-img" />
      <div className="photo-placeholder">
        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="1.2">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
        </svg>
        <span>Your Photo</span>
      </div>
      <div className="emoji-wrap">🧑‍💻</div>
    </div>

    {/* ✅ Pill moved outside the circle */}
    <div className="pill">
      <span className="pill-dot" />
      Open to work
    </div>

    {/* Badge */}
    <div className="badge">
      <div className="badge-num">Front-End Developer</div>
    </div>

  </div>
</div>
      </section>
    </>
  );
}
