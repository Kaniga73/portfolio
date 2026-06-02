import { useEffect, useRef, useState } from "react";
import "../styles/Certification.css";

// ── Import your certificate images here ──
import nptelImg from "../assets/NPTEL.jpeg";
import tnwiseImg from "../assets/TNWISE.jpeg";

export default function Certification() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const CertificateData = [
    {
      name: "NPTEL",
      image: nptelImg,
      tags: ["Human Computer Interaction"],
    },
    {
      name: "TNWISE",
      image: tnwiseImg,
      tags: ["Hackathon"],
    },
  ];

  return (
    <section id="Certifications" className="cert-section" ref={sectionRef}>

      {/* ── Header ── */}
      <div className={`cert-header ${visible ? "cert-header--visible" : ""}`}>
        <div className="cert-eyebrow">
          <span className="cert-eyebrow-line" />
          Certificates
        </div>
        <h2 className="cert-title-main">
          What I've <em>earned.</em>
        </h2>
      </div>

      {/* ── Cards ── */}
      <div className="cert-grid">
        {CertificateData.map((certificate, index) => (
          <div
            key={index}
            className={`cert-card ${visible ? "cert-card--visible" : ""}`}
            style={{ transitionDelay: `${index * 0.14}s` }}
          >
            {/* Thumbnail — full certificate image */}
            <div className="cert-thumb">
              <img
                src={certificate.image}
                alt={certificate.name}
                className="cert-thumb-img"
              />
            </div>

            {/* Body */}
            <div className="cert-body">
              <h3 className="cert-name">{certificate.name}</h3>

              <div className="cert-tags">
                {certificate.tags.map((tag, i) => (
                  <span key={i} className="cert-tag">{tag}</span>
                ))}
              </div>

              <div className="cert-links">
                <a href={certificate.image} download className="cert-link">
                  Download <span style={{ fontSize: 14 }}>↓</span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}