import { useEffect, useRef, useState } from "react";
import "../styles/About.css";

export default function About() {
  const headerRef = useRef(null);
  const cardRef = useRef(null);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [cardVisible, setCardVisible] = useState(false);

  useEffect(() => {
    const makeObserver = (setter) =>
      new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setter(true); },
        { threshold: 0.2 }
      );

    const o1 = makeObserver(setHeaderVisible);
    const o2 = makeObserver(setCardVisible);

    if (headerRef.current) o1.observe(headerRef.current);
    if (cardRef.current) o2.observe(cardRef.current);

    return () => { o1.disconnect(); o2.disconnect(); };
  }, []);

  return (
    <section className="about-section" id="about">

      {/* Header */}
      <div
        ref={headerRef}
        className={`about-header-wrap ${headerVisible ? "about-fade-visible" : "about-fade-hidden"}`}
      >
        <div className="about-label">
          <span className="label-line" />
          ABOUT ME
        </div>
        <h2 className="about-heading">
          Turning ideas into seamless <br />
          <span className="about-heading-italic">digital experiences.</span>
        </h2>
      </div>

      {/* Card */}
      <div
        ref={cardRef}
        className={`about-card ${cardVisible ? "about-fade-visible" : "about-fade-hidden"}`}
        style={{ transitionDelay: "0.15s" }}
      >
        <p className="about-role">
          Hi, I'm Kaniga, a pre-final year Computer Science student passionate about frontend development.
        </p>

        <p className="about-body">
          I enjoy turning ideas into <strong>interactive, user-friendly web experiences</strong>, focusing on clean, maintainable code and intuitive interfaces.
        </p>

        <p className="about-body">
          I have hands-on experience in <strong>HTML, CSS, JavaScript, and React</strong>, building websites and web applications that are functional and visually appealing. I love exploring new technologies and staying up-to-date with modern trends.
        </p>

        <p className="about-body">
What excites me most is crafting thoughtful interactions and seeing a project come alive. I'm always looking to collaborate, contribute, and grow — and I'm currently open to internship and freelance opportunities.        </p>
      </div>

    </section>
  );
}