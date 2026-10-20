
import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const cvUrl = 'S.M._Abdullah.pdf'
  const [activeSection, setActiveSection] = useState('home')
  const [scrollY, setScrollY] = useState(0)

  const projects = [
    {
      title: 'BehaviorIQ',
      description:
        'E-commerce platforms treat every visitor the same. Built a FastAPI microservice that scores live session intent (0–100) from browsing signals, predicts RFM-based churn, builds behavioral vectors for hybrid intent-aware search, and ships a RAG-powered AI assistant so owners can query their commerce data in plain English.',
      stack: ['FastAPI', 'Python', 'Pinecone', 'PostgreSQL'],
      links: [{ label: 'GitHub', url: 'https://github.com/smabdullah2002/behavioriq-ml-service.git' }]
    },
    {
      title: 'Ember',
      description:
        'Full-stack AI mental health support platform integrating Hugging Face toxicity detection models with a React frontend and FastAPI backend. Supabase handles persistent user data and authentication.',
      stack: ['React', 'FastAPI', 'Supabase', 'Hugging Face'],
      links: [
        { label: 'Live', url: 'https://ember-mentalhealth-companion.netlify.app/' },
        { label: 'GitHub', url: 'https://github.com/smabdullah2002/Ember' }
      ]
    },
    {
      title: 'Onkur',
      description:
        'Personal plant-care application with AI-driven daily care routines, weather-based recommendations, and image-based plant health diagnostics via Plant.id API.',
      stack: ['React', 'FastAPI', 'AI/ML'],
      links: [
        { label: 'Live', url: 'https://onkur.netlify.app/' },
        { label: 'GitHub', url: 'https://github.com/smabdullah2002/onkur.git' }
      ]
    },
    {
      title: 'Universal Web Scraper & RAG Chatbot',
      description:
        'Production-grade web crawler using Crawlee + Playwright for dynamic site traversal and Trafilatura for clean extraction. Full RAG pipeline: LangChain chunking → sentence-transformers embeddings → Pinecone vector store → Gemini LLM generation. Handles arbitrary URLs with natural language querying.',
      stack: ['Crawlee', 'Playwright', 'LangChain', 'Gemini', 'Pinecone'],
      links: [{ label: 'GitHub', url: 'https://github.com/smabdullah2002/ran_gpt' }]
    },
    {
      title: 'Personal Blog Platform',
      description:
        'Blog platform with full CRUD, user authentication, and a responsive UI. Designed and implemented the REST API and data layer end-to-end.',
      stack: ['FastAPI', 'Supabase', 'REST API'],
      links: [
        { label: 'Live', url: 'https://blog.smabdullah.dev/' },
        { label: 'GitHub', url: 'https://github.com/smabdullah2002/sma-blog' }
      ]
    }
  ]

  const skillGroups = [
    { label: 'Languages', items: ['Python', 'JavaScript (ES6+)', 'C++', 'HTML', 'CSS'] },
    { label: 'Frameworks', items: ['FastAPI', 'React', 'Django'] },
    { label: 'Databases', items: ['PostgreSQL', 'Supabase', 'MongoDB', 'Pinecone'] },
    { label: 'Tools & Platforms', items: ['AWS', 'Git/GitHub', 'Docker', 'Postman', 'REST API', 'pgAdmin', 'Crawlee', 'Playwright', 'Selenium', 'LangChain', 'n8n'] },
    { label: 'Specialties', items: ['Python Backend Development', 'REST API Development', 'FastAPI', 'AI Engineering', 'LLM Integration', 'RAG Systems', 'Web Scraping & Data Extraction', 'Cloud Deployment & AWS', 'CI/CD & DevOps'] }
  ]

  const achievements = [
    'Prompt Engineering Competition by AgentX — 8th Place'
  ]

  const renderStackedTitle = (text) => {
    const [first, ...rest] = text.split(' ')
    const second = rest.join(' ')

    return (
      <>
        <span className="title-main">{first}</span>
        {second ? <span className="title-ghost">{second}</span> : null}
      </>
    )
  }

  useEffect(() => {
    const elements = document.querySelectorAll('[data-reveal]')

    if (!elements.length) {
      return undefined
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      elements.forEach((element) => {
        element.classList.add('is-visible')
      })

      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.16,
        rootMargin: '0px 0px -8% 0px'
      }
    )

    elements.forEach((element) => {
      observer.observe(element)
    })

    return () => {
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    const sections = document.querySelectorAll('main section[id]')

    if (!sections.length) {
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (visibleEntries.length) {
          setActiveSection(visibleEntries[0].target.id)
        }
      },
      {
        threshold: [0.2, 0.35, 0.5, 0.7],
        rootMargin: '-10% 0px -45% 0px'
      }
    )

    sections.forEach((section) => observer.observe(section))

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <div className="portfolio">
      <div
        className="bg-orb bg-orb-a"
        aria-hidden="true"
        style={{ transform: `translate3d(0, ${scrollY * 0.1}px, 0)` }}
      />
      <div
        className="bg-orb bg-orb-b"
        aria-hidden="true"
        style={{ transform: `translate3d(0, ${scrollY * -0.06}px, 0)` }}
      />

      <header className="topbar">
        <a className="brand" href="#home">Abdullah</a>
        <nav className="menu">
          <a className={activeSection === 'projects' ? 'active' : ''} href="#projects">Projects</a>
          <a className={activeSection === 'skills' ? 'active' : ''} href="#skills">Skills</a>
          <a className={activeSection === 'education' ? 'active' : ''} href="#education">Education</a>
          <a className={activeSection === 'achievements' ? 'active' : ''} href="#achievements">Achievements</a>
          <a className={activeSection === 'cv' ? 'active' : ''} href="#cv">CV</a>
          <a className={activeSection === 'contact' ? 'active' : ''} href="#contact">Contact</a>
        </nav>
      </header>

      <main>
        <section id="home" className="hero section reveal reveal-zoom" data-reveal>
          <p className="hero-name">S.M. Abdullah</p>
          <h1 className="title-stack hero-title">{renderStackedTitle('Fullstack Developer')}</h1>
          <p className="hero-subtitle">Backend-focused full-stack developer building modern web apps, AI platforms &amp; real-time systems.</p>
          <p className="lead">
            Proficient in FastAPI, React, PostgreSQL, and vector databases, with expertise in REST API
            development, authentication, embeddings, semantic search, and cloud deployment.
          </p>

          <div className="hero-cta">
            <a className="btn btn-primary" href="#projects">View Projects</a>
            <a className="btn btn-ghost" href={cvUrl} target="_blank" rel="noreferrer">
              Download CV
            </a>
          </div>

          <div className="stats">
            <article>
              <h3>5</h3>
              <p>Featured Projects</p>
            </article>
            <article>
              <h3>3.82</h3>
              <p>B.Sc. CGPA</p>
            </article>
            <article>
              <h3>8th</h3>
              <p>Prompt Eng. Comp. — AgentX</p>
            </article>
          </div>
        </section>

        <section id="projects" className="section reveal reveal-up" data-reveal>
          <div className="section-head reveal reveal-left" data-reveal>
            <p className="eyebrow">Recent Work</p>
            <h2 className="title-stack">{renderStackedTitle('Featured Projects')}</h2>
          </div>

          <div className="project-grid">
            {projects.map((project, index) => (
              <article
                className={`card reveal ${index % 2 === 0 ? 'reveal-left' : 'reveal-right'}`}
                data-reveal
                style={{ '--delay': `${index * 100}ms` }}
                key={project.title}
              >
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="tags">
                  {project.stack.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
                <div className="card-links">
                  {project.links.map((link) => (
                    <a key={link.label} href={link.url} target="_blank" rel="noreferrer">{link.label}</a>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="achievements" className="section reveal reveal-up" data-reveal>
          <div className="section-head reveal reveal-right" data-reveal>
            <p className="eyebrow">Recognition</p>
            <h2 className="title-stack">{renderStackedTitle('Achievements')}</h2>
          </div>

          <div className="timeline">
            {achievements.map((item, index) => (
              <article
                className="timeline-item reveal reveal-right"
                data-reveal
                style={{ '--delay': `${70 + index * 60}ms` }}
                key={item}
              >
                <div>
                  <h3>{item}</h3>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="skills" className="section reveal reveal-up" data-reveal>
          <div className="section-head reveal reveal-left" data-reveal>
            <p className="eyebrow">Toolkit</p>
            <h2 className="title-stack">{renderStackedTitle('Technical Skills')}</h2>
          </div>

          {skillGroups.map((group, groupIndex) => (
            <div className="skill-group" key={group.label}>
              <h3 className="skill-group-label">{group.label}</h3>
              <div className="skills-grid">
                {group.items.map((skill, index) => (
                  <div
                    className="skill-chip reveal reveal-pop"
                    data-reveal
                    style={{ '--delay': `${(groupIndex * 200) + (index * 40)}ms` }}
                    key={skill}
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="soft-skills reveal reveal-up" data-reveal>
            <h3 className="skill-group-label">Soft Skills</h3>
            <div className="tags">
              <span>Problem-Solving</span>
              <span>Critical Thinking</span>
              <span>Quick Learner</span>
              <span>Adaptability</span>
              <span>Team Collaboration</span>
            </div>
          </div>
        </section>

        <section id="education" className="section reveal reveal-up" data-reveal>
          <div className="section-head reveal reveal-right" data-reveal>
            <p className="eyebrow">Academic</p>
            <h2 className="title-stack">{renderStackedTitle('Education')}</h2>
          </div>

          <div className="timeline">
            <article className="timeline-item reveal reveal-right" data-reveal style={{ '--delay': '70ms' }}>
              <div>
                <h3>B.Sc. in Information and Communication Technology</h3>
                <p>
                  Institute of Information Technology, Jahangirnagar University, Savar.
                </p>
              </div>
              <span>CGPA: 3.82</span>
            </article>
          </div>
        </section>

        <section id="cv" className="section cv-section reveal reveal-up" data-reveal>
          <div className="section-head reveal reveal-right" data-reveal>
            <p className="eyebrow">Resume</p>
            <h2 className="title-stack">{renderStackedTitle('CV Section')}</h2>
          </div>

          <p>
            Download my latest CV for a complete overview of my profile, projects, skills, and work history.
          </p>

          <div className="cv-actions">
            <a className="btn btn-primary" href={cvUrl} target="_blank" rel="noreferrer">Open CV</a>
            <a className="btn btn-ghost" href={cvUrl} download>Download PDF</a>
          </div>
        </section>

        <section id="contact" className="section contact reveal reveal-up" data-reveal>
          <div className="section-head reveal reveal-left" data-reveal>
            <p className="eyebrow">Contact</p>
            <h2 className="title-stack">{renderStackedTitle("Let's Work Together")}</h2>
          </div>

          <p className="reveal reveal-rotate" data-reveal>Interested in working together? Reach out through one of the links below.</p>

          <div className="contact-links reveal reveal-zoom" data-reveal style={{ '--delay': '120ms' }}>
            <a href="https://github.com/smabdullah2002" target="_blank" rel="noreferrer">GitHub</a>
            <a href="https://www.linkedin.com/in/sheikh-muhammad-abdullah-a384aa284/" target="_blank" rel="noreferrer">LinkedIn</a>
            <a href="mailto:sheikhmuhammad2002@gmail.com">sheikhmuhammad2002@gmail.com</a>
            <a href="tel:+8801884173052">+8801884173052</a>
            <a
              className="whatsapp-btn"
              href="https://wa.me/8801884173052?text=Hello%20Abdullah%2C%20I%20want%20to%20discuss%20a%20website%20project."
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp: 01884173052
            </a>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>Developed by Abdullah</p>
      </footer>
    </div>
  )
}

export default App
