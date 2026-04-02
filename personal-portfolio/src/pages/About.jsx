import React from "react";
import "../styles/About.css";

const About = () => {
  return (
    <section className="about-section" id="about">
      <div className="about-label">
        <span className="label-line" />
        ABOUT ME
        <span className="label-line" />
      </div>

      <h1 className="about-heading">
       Turning ideas into seamless 
        <br />
        <em className="about-heading-italic">digital experiences.</em>
      </h1>

   <div className="about-card">
  <p className="about-role">
    Hi, I’m Kaniga, a pre-final year Computer Science student passionate about frontend development.
  </p>

  <p className="about-body">
    I enjoy turning ideas into <strong>interactive, user-friendly web experiences</strong>, focusing on clean, maintainable code and intuitive interfaces.
  </p>

  <p className="about-body">
    I have hands-on experience in <strong>HTML, CSS, JavaScript, and React</strong>, building websites and web applications that are functional and visually appealing. I love exploring new technologies and staying up-to-date with modern trends.
  </p>

  <p className="about-body">
    What excites me most is crafting thoughtful interactions, experimenting with design patterns, and seeing a project come alive. I’m always looking to collaborate, contribute, and grow as a developer.
  </p>
</div>
    </section>
  );
};

export default About;