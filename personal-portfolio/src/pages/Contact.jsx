import { useEffect, useRef, useState } from "react";
import "../styles/Contact.css";

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/Kaniga73",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
      </svg>
    ),
  },

  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/kaniga-r",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
        <rect x="2" y="9" width="4" height="12"/>
        <circle cx="4" cy="4" r="2"/>
      </svg>
    ),
  },
  {
    label: "Email",
    href: "mailto:kanigar7@gmail.com ",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
  },
];

export default function Contact() {
  const headerRef = useRef(null);
  const formRef = useRef(null);
  const socialsRef = useRef(null);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const [socialsVisible, setSocialsVisible] = useState(false);
  const [status, setStatus] = useState("idle"); // idle | sending | sent

  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("sending");
    setTimeout(() => {
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 3000);
    }, 1200);
  };

  useEffect(() => {
    const makeObserver = (setter) =>
      new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setter(true); }, { threshold: 0.2 });

    const o1 = makeObserver(setHeaderVisible);
    const o2 = makeObserver(setFormVisible);
    const o3 = makeObserver(setSocialsVisible);

    if (headerRef.current) o1.observe(headerRef.current);
    if (formRef.current) o2.observe(formRef.current);
    if (socialsRef.current) o3.observe(socialsRef.current);

    return () => { o1.disconnect(); o2.disconnect(); o3.disconnect(); };
  }, []);

  return (
    <section className="contact-section" id="contact">
      {/* Header */}
      <div
        ref={headerRef}
        className={`contact-header ${headerVisible ? "contact-header-visible" : ""}`}
      >
        <div className="contact-label">
          <span className="contact-label-line" />
          CONTACT
        </div>
        <h2 className="contact-title">Let's connect.</h2>
        <p className="contact-sub">
          Have a project in mind, want to collaborate, or just say hi?<br />
          I'd love to hear from you.
        </p>
      </div>

      {/* Form */}
      <div
        ref={formRef}
        className={`contact-form-wrap ${formVisible ? "contact-form-visible" : ""}`}
      >
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="contact-field">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              required
              className="contact-input"
            />
          </div>

          <div className="contact-field">
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              required
              className="contact-input"
            />
          </div>

          <div className="contact-field">
            <textarea
              name="message"
              placeholder="Your Message"
              value={form.message}
              onChange={handleChange}
              required
              rows={6}
              className="contact-input contact-textarea"
            />
          </div>

          <div className="contact-submit-wrap">
            <button
              type="submit"
              className={`contact-btn ${status === "sent" ? "contact-btn-sent" : ""}`}
              disabled={status === "sending"}
            >
              {status === "idle" && "Send"}
              {status === "sending" && (
                <span className="contact-spinner" />
              )}
              {status === "sent" && "✓ Sent!"}
            </button>
          </div>
        </form>
      </div>

      {/* Social Icons */}
      <div
        ref={socialsRef}
        className={`contact-socials ${socialsVisible ? "contact-socials-visible" : ""}`}
      >
        {socialLinks.map((s, i) => (
          <a
            key={i}
            href={s.href}
            className="contact-social-btn"
            aria-label={s.label}
            style={{ transitionDelay: `${i * 0.08}s` }}
          >
            {s.icon}
          </a>
        ))}
      </div>
    </section>
  );
}