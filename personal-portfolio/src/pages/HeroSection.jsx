import { useState, useEffect } from "react";
import "../styles/HeroSection.css";
import { Link } from "react-scroll";
import resume from "../assets/resume.pdf";
import profilePic from "../assets/photo.png";

const TYPING_LINES = [
  { plain: "Hi, I'm ", highlight: "Kaniga." },
  { plain: "I craft clean, user-focused ", highlight: "Web experiences." },
  { plain: "I Design with ", highlight: "Purpose." },
];

const TYPING_SPEED = 80;
const DELETING_SPEED = 45;
const PAUSE_AFTER_TYPE = 1600;
const PAUSE_AFTER_DELETE = 400;

export default function HeroSection() {
  const [count, setCount] = useState({ years: 0, projects: 0, clients: 0 });
  const [menuOpen, setMenuOpen] = useState(false);

  const [displayText, setDisplayText] = useState("");
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Counter animation
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

  // Typing animation
  useEffect(() => {
    if (isPaused) return;

    const currentLine = TYPING_LINES[lineIndex];
    const fullText = currentLine.plain + currentLine.highlight;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(fullText.slice(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);

        if (charIndex + 1 === fullText.length) {
          setIsPaused(true);
          setTimeout(() => {
            setIsPaused(false);
            setIsDeleting(true);
          }, PAUSE_AFTER_TYPE);
        }
      } else {
        setDisplayText(fullText.slice(0, charIndex - 1));
        setCharIndex((prev) => prev - 1);

        if (charIndex - 1 === 0) {
          setIsDeleting(false);
          setIsPaused(true);
          setTimeout(() => {
            setLineIndex((prev) => (prev + 1) % TYPING_LINES.length);
            setCharIndex(0);
            setIsPaused(false);
          }, PAUSE_AFTER_DELETE);
        }
      }
    }, isDeleting ? DELETING_SPEED : TYPING_SPEED);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, isPaused, lineIndex]);

  // Split displayText into plain and highlight parts
  const plainLength = TYPING_LINES[lineIndex].plain.length;
  const plainPart = displayText.slice(0, plainLength);
  const highlightPart = displayText.length > plainLength
    ? displayText.slice(plainLength)
    : "";

  return (
    <>
      <nav className="navbar">
        <div className="nav-logo">Kaniga R</div>
        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? "✕" : "☰"}
        </div>
        <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
          <li><Link to="home" smooth={true} duration={700} spy={true} activeClass="active-link" offset={-80} onClick={() => setMenuOpen(false)}>Home</Link></li>
          <li><Link to="about" smooth={true} duration={700} spy={true} activeClass="active-link" offset={-80} onClick={() => setMenuOpen(false)}>About</Link></li>
          <li><Link to="education" smooth={true} duration={700} spy={true} activeClass="active-link" offset={-80} onClick={() => setMenuOpen(false)}>Education</Link></li>
          <li><Link to="skills" smooth={true} duration={700} spy={true} activeClass="active-link" offset={-100} onClick={() => setMenuOpen(false)}>Skills</Link></li>
          <li><Link to="projects" smooth={true} duration={700} spy={true} activeClass="active-link" offset={-80} onClick={() => setMenuOpen(false)}>Projects</Link></li>
          <li><Link to="contact" smooth={true} duration={700} spy={true} activeClass="active-link" offset={-80} onClick={() => setMenuOpen(false)}>Contact</Link></li>
        </ul>
      </nav>

      <section className="hero" id="home">
        <div className="hero-left">

          <h1 className="hero-title typing-title">
            <span className="typed-plain">{plainPart}</span>
            <span className="typed-highlight">{highlightPart}</span>
            <span className="typing-cursor">|</span>
          </h1>

          <p className="hero-desc">
            Front-End Developer crafting clean, responsive, and user-friendly web experiences —
            where thoughtful design meets seamless interaction.
          </p>

          <div className="hero-btns">
            <a
              href={resume}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
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
        <div className="hero-right">
          <div className="blob-wrap">
            <div className="circle-frame">
        <img src={profilePic} alt="Profile" className="profile-img" />            </div>
            <div className="pill">
              <span className="pill-dot" />
              Open to work
            </div>
            <div className="badge">
              <div className="badge-num">Front-End Developer</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}