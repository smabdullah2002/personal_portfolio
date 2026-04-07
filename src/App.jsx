
import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const cvUrl = 'S.M._Abdullah.pdf'
  const [activeSection, setActiveSection] = useState('home')
  const [scrollY, setScrollY] = useState(0)

  const projects = [
    {
      title: 'Onkur',
      description: 'Personal plant-care AI based app using React and FastAPI',
      stack: ['React', 'Tailwind', 'FastAPI', 'Supabase'],
      link: 'https://onkur.netlify.app/'
    },
    {
      title: 'Ember',
      description: 'AI based mental Health Companion- built a full stack AI-powered mental health support platform.',
      stack: ['React','Tailwind', 'FastAPI', 'Supabase'],
      link: 'https://quiz-d7129dioh-abdullah-warraich-chs-projects.vercel.app/'
    },
    {
      title: 'Expense Tracker Application',
      description: 'Built a Python-based expense tracker using FastAPI and SQLite to track daily expenses, generate reports.',
      stack: ['Python', 'FastAPI', 'SQLite'],
      link: ''
    }
  ]

  const skills = [
    'React JS',
    'Python',
    'Fastapi',
    'Supabase',
    'Tailwind CSS',
    'Git & GitHub'
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
          <a className={activeSection === 'experience' ? 'active' : ''} href="#experience">Experience</a>
          <a className={activeSection === 'skills' ? 'active' : ''} href="#skills">Skills</a>
          <a className={activeSection === 'cv' ? 'active' : ''} href="#cv">CV</a>
          <a className={activeSection === 'contact' ? 'active' : ''} href="#contact">Contact</a>
        </nav>
      </header>

      <main>
        <section id="home" className="hero section reveal reveal-zoom" data-reveal>
          <h1 className="title-stack hero-title">{renderStackedTitle('Fullstack Developer')}</h1>
          <p className="hero-subtitle">Building clean, responsive products that people love to use.</p>
          <p className="lead">
            I design and develop modern web experiences using React and Fastapi best practices.
            I care about clarity, performance, and detail from concept to deployment.
          </p>

          <div className="hero-cta">
            <a className="btn btn-primary" href="#projects">View Projects</a>
            <a className="btn btn-ghost" href={cvUrl} target="_blank" rel="noreferrer">
              Download CV
            </a>
          </div>

          <div className="stats">
            <article>
              <h3>6+</h3>
              <p>Month Experience</p>
              <a href="https://rantechbd.netlify.app/" target="_blank" rel="noreferrer">Ran Tech Agency</a>
            </article>
            <article>
              <h3>3+</h3>
              <p>Projects Completed</p>
            </article>
            <article>
              <h3>2+</h3>
              <p>Clients</p>
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
                <a href={project.link} target="_blank" rel="noreferrer">Open Project</a>
              </article>
            ))}
          </div>
        </section>

        <section id="experience" className="section reveal reveal-up" data-reveal>
          <div className="section-head reveal reveal-right" data-reveal>
            <p className="eyebrow">Career</p>
            <h2 className="title-stack">{renderStackedTitle('Relevant Experience')}</h2>
          </div>

          <div className="timeline">
            <article className="timeline-item reveal reveal-right" data-reveal style={{ '--delay': '70ms' }}>
              <div>
                <h3>Ran Tech - Co-Founder</h3>
                <p>
                  Currently building websites with my friends through our tech agency, Ran Tech.
                  We create modern, responsive websites tailored for client businesses.
                </p>
              </div>
              <span>Present</span>
            </article>

            <article className="timeline-item reveal reveal-left" data-reveal style={{ '--delay': '130ms' }}>
              <div>
                <h3>Client Website Delivery</h3>
                <p>
                  At Ran Tech, we handle full website delivery from planning and design to development,
                  revisions, and final deployment.
                </p>
              </div>
              <span>Ongoing</span>
            </article>
          </div>
        </section>

        <section id="skills" className="section reveal reveal-up" data-reveal>
          <div className="section-head reveal reveal-left" data-reveal>
            <p className="eyebrow">Toolkit</p>
            <h2 className="title-stack">{renderStackedTitle('Technical Skills')}</h2>
          </div>

          <div className="skills-grid">
            {skills.map((skill, index) => (
              <div
                className="skill-chip reveal reveal-pop"
                data-reveal
                style={{ '--delay': `${index * 50}ms` }}
                key={skill}
              >
                {skill}
              </div>
            ))}
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
            <a href="mailto: sheikhmuhammad2002@gmail.com">sheikhmuhammad2002@gmail.com</a>
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
