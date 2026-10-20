import { useEffect, useRef, useState } from 'react'
import {
	ArrowRight,
	Briefcase,
	Code,
	Database,
	Download,
	GitBranch,
	GraduationCap,
	HeartHandshake,
	Layers,
	Mail,
	MessageCircle,
	Phone,
	PenTool,
	Search,
	Sparkles,
	Sprout,
	Star,
	Users,
	Wrench,
	BrainCircuit,
	Trophy
} from 'lucide-react'
import './App.css'

function Squiggle({ className = '' }) {
	return (
		<svg viewBox="0 0 120 12" fill="none" aria-hidden="true" className={`h-3 w-24 ${className}`}>
			<path
				d="M2 8 C 12 0, 22 0, 32 8 S 52 16, 62 8 S 82 0, 92 8 S 112 16, 118 8"
				stroke="currentColor"
				strokeWidth="3"
				strokeLinecap="round"
			/>
		</svg>
	)
}

function SectionHead({ eyebrow, title, pillClass = 'bg-tertiary', squiggleClass = 'text-accent' }) {
	return (
		<div className="flex flex-col items-start gap-2" data-reveal>
			<span
				className={`rounded-full border-2 border-foreground px-3 py-1 text-xs font-bold uppercase tracking-widest ${pillClass}`}
			>
				{eyebrow}
			</span>
			<h2 className="font-heading text-3xl font-extrabold md:text-4xl">{title}</h2>
			<Squiggle className={squiggleClass} />
		</div>
	)
}

function CandyButton({ href, children, Icon }) {
	const isExternal = href.startsWith('http') || href.startsWith('mailto') || href.startsWith('tel')

	return (
		<a
			href={href}
			target={isExternal ? '_blank' : undefined}
			rel={isExternal ? 'noreferrer' : undefined}
			className="group inline-flex min-h-12 items-center gap-2.5 rounded-full border-2 border-foreground bg-accent px-6 py-3 font-heading font-bold text-accent-foreground shadow-pop transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-pop-hover active:translate-x-0.5 active:translate-y-0.5 active:shadow-pop-active"
		>
			{children}
			{Icon ? (
				<span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-foreground transition-transform duration-300 group-hover:translate-x-0.5">
					<Icon size={16} strokeWidth={2.5} />
				</span>
			) : null}
		</a>
	)
}

function GhostButton({ href, children, Icon, download = false }) {
	return (
		<a
			href={href}
			download={download || undefined}
			target={download ? undefined : '_blank'}
			rel={download ? undefined : 'noreferrer'}
			className="inline-flex min-h-12 items-center gap-2 rounded-full border-2 border-foreground bg-card px-6 py-3 font-heading font-bold text-foreground transition-colors duration-200 hover:bg-tertiary"
		>
			{children}
			{Icon ? <Icon size={18} strokeWidth={2.5} /> : null}
		</a>
	)
}

function SkillDeck({ groups, chipBgs }) {
	const [activeIndex, setActiveIndex] = useState(0)
	const deckRef = useRef(null)

	useEffect(() => {
		const deck = deckRef.current
		if (!deck) return undefined

		let frame = 0

		const update = () => {
			frame = 0
			const rect = deck.getBoundingClientRect()
			const pin = 80
			const distance = deck.offsetHeight - window.innerHeight
			const scrolled = pin - rect.top
			const progress = distance > 0 ? Math.min(Math.max(scrolled / distance, 0), 1) : 0

			const nextIndex = Math.min(
				Math.max(Math.round(progress * (groups.length - 1)), 0),
				groups.length - 1
			)
			setActiveIndex(nextIndex)
		}

		const handleScroll = () => {
			if (!frame) {
				frame = window.requestAnimationFrame(update)
			}
		}

		update()
		window.addEventListener('scroll', handleScroll, { passive: true })
		window.addEventListener('resize', handleScroll)

		return () => {
			window.removeEventListener('scroll', handleScroll)
			window.removeEventListener('resize', handleScroll)
			if (frame) {
				window.cancelAnimationFrame(frame)
			}
		}
	}, [groups.length])

	const scrollToCard = (index) => {
		if (!deckRef.current) return
		const deck = deckRef.current
		const rect = deck.getBoundingClientRect()
		const scrollTop = window.scrollY || window.pageYOffset
		const deckTop = rect.top + scrollTop
		const pin = 80
		const distance = deck.offsetHeight - window.innerHeight
		const targetY = deckTop - pin + (index / (groups.length - 1)) * distance
		window.scrollTo({ top: Math.max(targetY, 0), behavior: 'smooth' })
	}

	return (
		<div
			ref={deckRef}
			className="relative mt-8"
			style={{ height: `${groups.length * 40 + 40}vh` }}
		>
			<div className="sticky top-20 z-10 pt-2 pb-6">
				{/* Category Tabs: follow scroll and allow instant jump */}
				<div className="flex flex-wrap items-center justify-between gap-3 pb-4">
					<div className="flex flex-wrap gap-2">
						{groups.map((group, index) => {
							const isActive = index === activeIndex
							return (
								<button
									key={group.label}
									type="button"
									onClick={() => scrollToCard(index)}
									className={`inline-flex items-center gap-2 rounded-full border-2 border-foreground px-3.5 py-1.5 text-xs font-bold transition-all duration-200 sm:text-sm ${
										isActive
											? `${group.iconBg} shadow-pop -translate-y-0.5`
											: 'bg-card text-foreground hover:-translate-y-0.5 hover:bg-tertiary/40'
									}`}
								>
									<group.Icon size={14} strokeWidth={2.5} />
									<span>{group.label}</span>
									<span
										className={`rounded-full border border-foreground/30 px-1.5 py-0.5 text-[10px] font-bold ${
											isActive ? 'bg-white/30 text-current' : 'bg-muted text-muted-foreground'
										}`}
									>
										{group.items.length}
									</span>
								</button>
							)
						})}
					</div>

					<span className="hidden items-center gap-1.5 rounded-full border-2 border-foreground bg-card px-3 py-1 font-heading text-xs font-bold shadow-pop md:inline-flex">
						Card {activeIndex + 1} of {groups.length}
					</span>
				</div>

				{/* 3D Stacked Card Display (Driven by Scroll) */}
				<div className="relative min-h-[380px] pt-2 pb-14 sm:min-h-[330px]">
					{groups.map((group, index) => {
						const offset = index - activeIndex
						const isFront = offset === 0
						const isUpcoming = offset > 0 && offset < 4

						let transform = ''
						let zIndex = 1
						let opacity = 1
						let pointerEvents = 'none'

						if (isFront) {
							transform = 'translate3d(0, 0, 0) scale(1) rotate(0deg)'
							zIndex = 30
							opacity = 1
							pointerEvents = 'auto'
						} else if (offset === 1) {
							transform = 'translate3d(0, 16px, 0) scale(0.96) rotate(-1.5deg)'
							zIndex = 20
							opacity = 0.95
							pointerEvents = 'auto'
						} else if (offset === 2) {
							transform = 'translate3d(0, 32px, 0) scale(0.92) rotate(1.5deg)'
							zIndex = 15
							opacity = 0.85
							pointerEvents = 'auto'
						} else if (offset === 3) {
							transform = 'translate3d(0, 48px, 0) scale(0.88) rotate(-0.5deg)'
							zIndex = 10
							opacity = 0.65
							pointerEvents = 'none'
						} else if (offset > 3) {
							transform = 'translate3d(0, 56px, 0) scale(0.84)'
							zIndex = 5
							opacity = 0
							pointerEvents = 'none'
						} else if (offset === -1) {
							// Smoothly peel off upwards when scrolled past
							transform = 'translate3d(0, -36px, 0) scale(1.02) rotate(-3deg)'
							zIndex = 40
							opacity = 0
							pointerEvents = 'none'
						} else {
							transform = 'translate3d(0, -52px, 0) scale(1.04) rotate(-5deg)'
							zIndex = 35
							opacity = 0
							pointerEvents = 'none'
						}

						return (
							<article
								key={group.label}
								onClick={() => {
									if (isUpcoming) scrollToCard(index)
								}}
								aria-hidden={!isFront}
								className={`absolute inset-x-0 top-0 min-h-[290px] rounded-xl border-2 border-foreground bg-card p-6 md:p-8 sm:min-h-[260px] ${group.shadow} ${
									isUpcoming ? 'cursor-pointer transition-transform hover:-translate-y-1' : ''
								}`}
								style={{
									transform,
									transformOrigin: 'top center',
									opacity,
									zIndex,
									pointerEvents,
									transition:
										'transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.35s ease'
								}}
							>
								<div className="flex items-center justify-between gap-3 border-b-2 border-foreground/10 pb-4">
									<div className="flex items-center gap-3">
										<span
											className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-foreground shadow-pop ${group.iconBg}`}
										>
											<group.Icon size={20} strokeWidth={2.5} />
										</span>
										<div>
											<h3 className="font-heading text-xl font-bold sm:text-2xl">{group.label}</h3>
											<p className="text-xs font-semibold text-muted-foreground">
												Category {index + 1} of {groups.length}
											</p>
										</div>
									</div>

									<div className="flex items-center gap-2">
										{isUpcoming ? (
											<span className="hidden rounded-full border-2 border-foreground bg-tertiary px-3 py-1 font-heading text-xs font-bold shadow-pop sm:inline-block">
												Click or scroll
											</span>
										) : null}
										<span className="rounded-full border-2 border-foreground bg-muted px-3 py-1 text-xs font-bold">
											{group.items.length} {group.items.length === 1 ? 'skill' : 'skills'}
										</span>
									</div>
								</div>

								<div className="mt-6 flex flex-wrap gap-2.5">
									{group.items.map((skill, skillIndex) => (
										<span
											key={skill}
											className={`hover-wiggle rounded-full border-2 border-foreground px-4 py-2 text-sm font-bold shadow-pop transition-transform ${
												chipBgs[(index + skillIndex) % chipBgs.length]
											}`}
										>
											{skill}
										</span>
									))}
								</div>
							</article>
						)
					})}
				</div>

				{/* Progress Dots: indicate current card on scroll & allow click to scroll */}
				<div className="mt-4 flex items-center justify-center gap-2" aria-label="Skill deck progress">
					{groups.map((group, index) => {
						const isActive = index === activeIndex
						return (
							<button
								key={group.label}
								type="button"
								onClick={() => scrollToCard(index)}
								aria-label={`Scroll to ${group.label}`}
								className={`h-3 rounded-full border-2 border-foreground transition-all duration-300 ${
									isActive ? 'w-8 bg-accent' : 'w-3 bg-card hover:bg-tertiary'
								}`}
							/>
						)
					})}
				</div>
			</div>
		</div>
	)
}

function App() {
	const cvUrl = 'S.M._Abdullah.pdf'
	const [activeSection, setActiveSection] = useState('home')

	const projects = [
		{
			title: 'BehaviorIQ',
			description:
				'E-commerce platforms treat every visitor the same. Built a FastAPI microservice that scores live session intent (0–100) from browsing signals, predicts RFM-based churn, builds behavioral vectors for hybrid intent-aware search, and ships a RAG-powered AI assistant so owners can query their commerce data in plain English.',
			stack: ['FastAPI', 'Python', 'Pinecone', 'PostgreSQL'],
			links: [{ label: 'GitHub', url: 'https://github.com/smabdullah2002/behavioriq-ml-service.git' }],
			Icon: BrainCircuit,
			iconBg: 'bg-accent text-accent-foreground',
			shadow: 'shadow-card-violet',
			hoverShadow: 'hover:shadow-card-pink'
		},
		{
			title: 'Ember',
			description:
				'Full-stack AI mental health support platform integrating Hugging Face toxicity detection models with a React frontend and FastAPI backend. Supabase handles persistent user data and authentication.',
			stack: ['React', 'FastAPI', 'Supabase', 'Hugging Face'],
			links: [
				{ label: 'Live', url: 'https://ember-mentalhealth-companion.netlify.app/' },
				{ label: 'GitHub', url: 'https://github.com/smabdullah2002/Ember' }
			],
			Icon: HeartHandshake,
			iconBg: 'bg-secondary text-foreground',
			shadow: 'shadow-card-pink',
			hoverShadow: 'hover:shadow-card-violet'
		},
		{
			title: 'Onkur',
			description:
				'Personal plant-care application with AI-driven daily care routines, weather-based recommendations, and image-based plant health diagnostics via Plant.id API.',
			stack: ['React', 'FastAPI', 'AI/ML'],
			links: [
				{ label: 'Live', url: 'https://onkur.netlify.app/' },
				{ label: 'GitHub', url: 'https://github.com/smabdullah2002/onkur.git' }
			],
			Icon: Sprout,
			iconBg: 'bg-tertiary text-foreground',
			shadow: 'shadow-card-amber',
			hoverShadow: 'hover:shadow-card-mint'
		},
		{
			title: 'Universal Web Scraper & RAG Chatbot',
			description:
				'Production-grade web crawler using Crawlee + Playwright for dynamic site traversal and Trafilatura for clean extraction. Full RAG pipeline: LangChain chunking → sentence-transformers embeddings → Pinecone vector store → Gemini LLM generation. Handles arbitrary URLs with natural language querying.',
			stack: ['Crawlee', 'Playwright', 'LangChain', 'Gemini', 'Pinecone'],
			links: [{ label: 'GitHub', url: 'https://github.com/smabdullah2002/ran_gpt' }],
			Icon: Search,
			iconBg: 'bg-quaternary text-foreground',
			shadow: 'shadow-card-mint',
			hoverShadow: 'hover:shadow-card-violet'
		},
		{
			title: 'Personal Blog Platform',
			description:
				'Blog platform with full CRUD, user authentication, and a responsive UI. Designed and implemented the REST API and data layer end-to-end.',
			stack: ['FastAPI', 'Supabase', 'REST API'],
			links: [
				{ label: 'Live', url: 'https://blog.smabdullah.dev/' },
				{ label: 'GitHub', url: 'https://github.com/smabdullah2002/sma-blog' }
			],
			Icon: PenTool,
			iconBg: 'bg-accent text-accent-foreground',
			shadow: 'shadow-card',
			hoverShadow: 'hover:shadow-card-amber'
		}
	]

	const skillGroups = [
		{
			label: 'Specialties',
			Icon: Sparkles,
			shadow: 'shadow-card-pink',
			iconBg: 'bg-secondary text-foreground',
			items: ['Python Backend Development', 'REST API Development', 'FastAPI', 'AI Engineering', 'LLM Integration', 'RAG Systems', 'Web Scraping & Data Extraction', 'Cloud Deployment & AWS', 'CI/CD & DevOps']
		},
		{
			label: 'Languages',
			Icon: Code,
			shadow: 'shadow-card-violet',
			iconBg: 'bg-accent text-accent-foreground',
			items: ['Python', 'JavaScript (ES6+)', 'C++', 'HTML', 'CSS']
		},
		{
			label: 'Frameworks',
			Icon: Layers,
			shadow: 'shadow-card-amber',
			iconBg: 'bg-tertiary text-foreground',
			items: ['FastAPI', 'React', 'Django']
		},
		{
			label: 'Tools & Platforms',
			Icon: Wrench,
			shadow: 'shadow-card-violet',
			iconBg: 'bg-accent text-accent-foreground',
			items: ['AWS', 'Git/GitHub', 'Docker', 'Postman', 'REST API', 'pgAdmin', 'Crawlee', 'Playwright', 'Selenium', 'LangChain', 'n8n']
		},
		{
			label: 'Databases',
			Icon: Database,
			shadow: 'shadow-card-mint',
			iconBg: 'bg-quaternary text-foreground',
			items: ['PostgreSQL', 'Supabase', 'MongoDB', 'Pinecone']
		},
		{
			label: 'Soft Skills',
			Icon: Users,
			shadow: 'shadow-card',
			iconBg: 'bg-muted text-foreground',
			items: ['Problem-Solving', 'Critical Thinking', 'Quick Learner', 'Adaptability', 'Team Collaboration']
		}
	]

	const chipBgs = ['bg-card', 'bg-tertiary/25', 'bg-secondary/20', 'bg-quaternary/25']

	const achievements = ['Prompt Engineering Competition by AgentX — 8th Place']

	const marqueeItems = [
		'FastAPI',
		'React',
		'PostgreSQL',
		'Pinecone',
		'LangChain',
		'RAG Systems',
		'AWS',
		'Docker',
		'LLM Integration',
		'Web Scraping',
		'AI Engineering',
		'REST APIs',
		'Supabase',
		'MongoDB'
	]

	const navItems = [
		['projects', 'Projects'],
		['skills', 'Skills'],
		['education', 'Education'],
		['achievements', 'Achievements'],
		['cv', 'CV'],
		['contact', 'Contact']
	]

	const contactCards = [
		{
			label: 'GitHub',
			sub: 'smabdullah2002',
			href: 'https://github.com/smabdullah2002',
			Icon: GitBranch,
			circle: 'bg-accent text-accent-foreground',
			hover: 'hover:shadow-card-violet'
		},
		{
			label: 'LinkedIn',
			sub: 'S.M. Abdullah',
			href: 'https://www.linkedin.com/in/sheikh-muhammad-abdullah-a384aa284/',
			Icon: Briefcase,
			circle: 'bg-secondary text-foreground',
			hover: 'hover:shadow-card-pink'
		},
		{
			label: 'Email',
			sub: 'sheikhmuhammad2002@gmail.com',
			href: 'mailto:sheikhmuhammad2002@gmail.com',
			Icon: Mail,
			circle: 'bg-tertiary text-foreground',
			hover: 'hover:shadow-card-amber'
		},
		{
			label: 'Phone',
			sub: '+8801884173052',
			href: 'tel:+8801884173052',
			Icon: Phone,
			circle: 'bg-quaternary text-foreground',
			hover: 'hover:shadow-card-mint'
		}
	]

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
		<div className="min-h-screen">
			<div className="mx-auto max-w-6xl px-4">
				<header className="sticky top-3 z-50 mt-4 flex flex-wrap items-center justify-between gap-3 rounded-full border-2 border-foreground bg-card px-4 py-2.5 shadow-pop">
					<a href="#home" className="flex items-center gap-2.5">
						<span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-foreground bg-accent font-heading text-sm font-extrabold text-accent-foreground">
							A
						</span>
						<span className="font-heading text-lg font-extrabold">S.M. Abdullah</span>
					</a>
					<nav className="flex flex-wrap items-center gap-1 text-sm font-semibold">
						{navItems.map(([id, label]) => (
							<a
								key={id}
								href={`#${id}`}
								className={`rounded-full border-2 px-3 py-1.5 transition-colors duration-200 ${
									activeSection === id
										? 'border-foreground bg-tertiary text-foreground'
										: 'border-transparent text-muted-foreground hover:border-foreground hover:bg-tertiary/60 hover:text-foreground'
								}`}
							>
								{label}
							</a>
						))}
					</nav>
				</header>

				<main>
					<section
						id="home"
						className="reveal reveal-zoom relative mt-6 overflow-hidden rounded-lg border-2 border-foreground bg-card p-6 shadow-card md:p-10"
						data-reveal
					>
						<div
							aria-hidden="true"
							className="pointer-events-none absolute -left-24 -top-28 h-72 w-72 rounded-full bg-tertiary opacity-70"
						/>
						<svg
							aria-hidden="true"
							viewBox="0 0 24 24"
							className="pointer-events-none absolute right-10 top-8 hidden h-8 w-8 rotate-12 text-secondary md:block"
						>
							<polygon points="12,2 22,20 2,20" fill="currentColor" />
						</svg>
						<div
							aria-hidden="true"
							className="pointer-events-none absolute bottom-16 left-1/2 hidden h-4 w-4 rounded-full border-2 border-foreground bg-quaternary md:block"
						/>

						<div className="relative grid items-center gap-10 md:grid-cols-2">
							<div>
								<span className="inline-flex items-center gap-1.5 rounded-full border-2 border-foreground bg-quaternary/50 px-3 py-1 text-xs font-bold uppercase tracking-widest">
									S.M. Abdullah
								</span>
								<h1 className="mt-5 font-heading text-5xl font-extrabold leading-[0.95] md:text-6xl">
									Fullstack <span className="text-accent">Developer</span>
								</h1>
								<p className="mt-4 max-w-md text-lg font-semibold">
									Backend-focused full-stack developer building modern web apps, AI platforms &amp; real-time
									systems.
								</p>
								<p className="mt-3 max-w-md text-muted-foreground">
									Proficient in FastAPI, React, PostgreSQL, and vector databases, with expertise in REST API
									development, authentication, embeddings, semantic search, and cloud deployment.
								</p>

								<div className="mt-6 flex flex-wrap gap-3">
									<CandyButton href="#projects" Icon={ArrowRight}>
										View Projects
									</CandyButton>
									<GhostButton href={cvUrl} Icon={Download}>
										Download CV
									</GhostButton>
								</div>
							</div>

							<div className="relative mx-auto w-full max-w-sm">
								<div
									aria-hidden="true"
									className="dot-grid absolute -inset-4 -rotate-2 rounded-lg border-2 border-foreground opacity-60"
								/>
								<div className="blob-photo-wrap relative">
									<img src="profile.jpeg" alt="S.M. Abdullah" className="blob-photo" />
									<span className="blob-photo-tint" aria-hidden="true" />
								</div>
								<span className="absolute -bottom-4 right-4 rotate-6 rounded-full border-2 border-foreground bg-tertiary px-3 py-1 font-heading text-xs font-extrabold shadow-pop">
									FastAPI · ML · AI
								</span>
							</div>
						</div>

						<div className="relative mt-10 grid gap-4 sm:grid-cols-3">
							<article className="rounded-md border-2 border-foreground bg-card p-4 shadow-card-violet">
								<h3 className="font-heading text-3xl font-extrabold text-accent">5</h3>
								<p className="text-sm font-semibold text-muted-foreground">Featured Projects</p>
							</article>
							<article className="rounded-md border-2 border-foreground bg-card p-4 shadow-card-pink">
								<h3 className="font-heading text-3xl font-extrabold text-secondary">3.82</h3>
								<p className="text-sm font-semibold text-muted-foreground">B.Sc. CGPA</p>
							</article>
							<article className="rounded-md border-2 border-foreground bg-card p-4 shadow-card-amber">
								<h3 className="font-heading text-3xl font-extrabold">8th</h3>
								<p className="text-sm font-semibold text-muted-foreground">Prompt Eng. Comp. — AgentX</p>
							</article>
						</div>
					</section>

					<div
						className="marquee mt-6 rounded-full border-2 border-foreground bg-accent py-3 text-accent-foreground"
						aria-hidden="true"
					>
						<div className="marquee-track">
							{[0, 1].map((copy) => (
								<div key={copy} className="flex shrink-0 items-center">
									{marqueeItems.map((item) => (
										<span
											key={item}
											className="flex items-center gap-4 whitespace-nowrap px-4 font-heading text-sm font-bold uppercase tracking-widest"
										>
											{item}
											<Sparkles size={14} strokeWidth={2.5} className="text-tertiary" />
										</span>
									))}
								</div>
							))}
						</div>
					</div>

					<section id="projects" className="reveal mt-16" data-reveal>
						<SectionHead eyebrow="Recent Work" title="Featured Projects" />

						<div className="mt-10 grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
							{projects.map((project, index) => (
								<article
									className={`reveal ${index % 2 === 0 ? 'reveal-left' : 'reveal-right'} relative rounded-md border-2 border-foreground bg-card p-6 pt-10 ${project.shadow} ${project.hoverShadow} transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:-rotate-1 hover:scale-[1.02]`}
									data-reveal
									style={{ '--delay': `${index * 90}ms` }}
									key={project.title}
								>
									<span
										className={`absolute -top-6 left-5 flex h-12 w-12 items-center justify-center rounded-full border-2 border-foreground ${project.iconBg}`}
									>
										<project.Icon size={22} strokeWidth={2.5} />
									</span>
									<h3 className="font-heading text-xl font-bold">{project.title}</h3>
									<p className="mt-2 text-sm leading-relaxed text-muted-foreground">{project.description}</p>
									<div className="mt-4 flex flex-wrap gap-1.5">
										{project.stack.map((item) => (
											<span
												key={item}
												className="rounded-full border-2 border-foreground bg-muted px-2.5 py-0.5 text-xs font-bold"
											>
												{item}
											</span>
										))}
									</div>
									<div className="mt-5 flex flex-wrap gap-2">
										{project.links.map((link, linkIndex) => (
											<a
												key={link.label}
												href={link.url}
												target="_blank"
												rel="noreferrer"
												className={`inline-flex min-h-9 items-center rounded-full border-2 border-foreground px-3.5 py-1 text-sm font-bold transition-colors duration-200 ${
													linkIndex === 0
														? 'bg-accent text-accent-foreground hover:bg-accent/85'
														: 'bg-card text-foreground hover:bg-tertiary'
												}`}
											>
												{link.label}
											</a>
										))}
									</div>
								</article>
							))}
						</div>
					</section>

					<div className="flex justify-center py-2" aria-hidden="true">
						<Squiggle className="h-3 w-32 text-secondary" />
					</div>

					<section id="achievements" className="reveal mt-10" data-reveal>
						<SectionHead
							eyebrow="Recognition"
							title="Achievements"
							pillClass="bg-secondary/30"
							squiggleClass="text-tertiary"
						/>

						<div className="mt-8 space-y-6">
							{achievements.map((item, index) => {
								const [title, detail] = item.split(' — ')

								return (
									<article
										className="reveal reveal-right relative flex flex-wrap items-center justify-between gap-4 rounded-md border-2 border-foreground bg-card p-6 shadow-card-amber"
										data-reveal
										style={{ '--delay': `${70 + index * 60}ms` }}
										key={item}
									>
										<div className="flex items-center gap-4">
											<span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-foreground bg-tertiary text-foreground">
												<Trophy size={22} strokeWidth={2.5} />
											</span>
											<div>
												<h3 className="font-heading text-lg font-bold">{title}</h3>
												{detail ? <p className="text-sm text-muted-foreground">{detail}</p> : null}
											</div>
										</div>
										<span className="rotate-6 rounded-full border-2 border-foreground bg-quaternary/40 px-4 py-1.5 font-heading text-sm font-extrabold shadow-pop">
											Nice!
										</span>
									</article>
								)
							})}
						</div>
					</section>

					<div className="flex justify-center py-2" aria-hidden="true">
						<Squiggle className="h-3 w-32 text-accent" />
					</div>

					<section id="skills" className="mt-10">
						<div data-reveal className="reveal">
							<SectionHead
								eyebrow="Toolkit"
								title="Technical Skills"
								pillClass="bg-quaternary/40"
								squiggleClass="text-secondary"
							/>

							<p className="mt-3 text-sm text-muted-foreground">
								Scroll through the deck to flip cards, or click any category to jump.
							</p>
						</div>

						<SkillDeck groups={skillGroups} chipBgs={chipBgs} />
					</section>

					<div className="flex justify-center py-2" aria-hidden="true">
						<Squiggle className="h-3 w-32 text-tertiary" />
					</div>

					<section id="education" className="reveal mt-10" data-reveal>
						<SectionHead
							eyebrow="Academic"
							title="Education"
							pillClass="bg-accent text-accent-foreground"
							squiggleClass="text-quaternary"
						/>

						<article
							className="reveal reveal-left mt-8 flex flex-wrap items-center justify-between gap-4 rounded-md border-2 border-foreground bg-card p-6 shadow-card-mint"
							data-reveal
							style={{ '--delay': '70ms' }}
						>
							<div className="flex items-center gap-4">
								<span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-foreground bg-quaternary text-foreground">
									<GraduationCap size={22} strokeWidth={2.5} />
								</span>
								<div>
									<h3 className="font-heading text-lg font-bold">B.Sc. in Information and Communication Technology</h3>
									<p className="text-sm text-muted-foreground">
										Institute of Information Technology, Jahangirnagar University, Savar.
									</p>
								</div>
							</div>
							<span className="flex rotate-6 items-center gap-1.5 rounded-full border-2 border-foreground bg-tertiary px-4 py-1.5 font-heading text-sm font-extrabold shadow-pop">
								<Star size={14} strokeWidth={2.5} fill="currentColor" />
								CGPA 3.82
							</span>
						</article>
					</section>

					<section id="cv" className="reveal dot-grid mt-16 rounded-lg border-2 border-foreground p-8 text-center shadow-card" data-reveal>
						<span className="inline-flex rounded-full border-2 border-foreground bg-card px-3 py-1 text-xs font-bold uppercase tracking-widest">
							Resume
						</span>
						<h2 className="mt-4 font-heading text-3xl font-extrabold">Grab My CV</h2>
						<p className="mx-auto mt-3 max-w-md text-muted-foreground">
							Download my latest CV for a complete overview of my profile, projects, skills, and work history.
						</p>
						<div className="mt-6 flex flex-wrap justify-center gap-3">
							<CandyButton href={cvUrl} Icon={ArrowRight}>
								Open CV
							</CandyButton>
							<GhostButton href={cvUrl} Icon={Download} download>
								Download PDF
							</GhostButton>
						</div>
					</section>

					<div className="flex justify-center py-2" aria-hidden="true">
						<Squiggle className="h-3 w-32 text-secondary" />
					</div>

					<section id="contact" className="reveal mt-10" data-reveal>
						<SectionHead
							eyebrow="Contact"
							title="Let's Work Together"
							pillClass="bg-tertiary"
							squiggleClass="text-accent"
						/>

						<p className="mt-4 text-muted-foreground">Interested in working together? Reach out through any channel below.</p>

						<div className="mt-8 grid gap-5 sm:grid-cols-2">
							{contactCards.map((card, index) => (
								<a
									className={`reveal ${index % 2 === 0 ? 'reveal-left' : 'reveal-right'} group flex items-center gap-3 rounded-md border-2 border-foreground bg-card p-4 shadow-card transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:-translate-y-1 hover:shadow-pop ${card.hover}`}
									data-reveal
									style={{ '--delay': `${index * 70}ms` }}
									href={card.href}
									target="_blank"
									rel="noreferrer"
									key={card.label}
								>
									<span
										className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-foreground ${card.circle}`}
									>
										<card.Icon size={20} strokeWidth={2.5} />
									</span>
									<span className="min-w-0">
										<span className="block font-heading font-bold">{card.label}</span>
										<span className="block truncate text-xs text-muted-foreground">{card.sub}</span>
									</span>
								</a>
							))}

							<a
								className="reveal reveal-zoom group flex items-center justify-center gap-3 rounded-md border-2 border-foreground bg-quaternary/30 p-4 shadow-card-mint transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:-translate-y-1 sm:col-span-2"
								data-reveal
								style={{ '--delay': '280ms' }}
								href="https://wa.me/8801884173052?text=Hello%20Abdullah%2C%20I%20want%20to%20discuss%20a%20website%20project."
								target="_blank"
								rel="noreferrer"
							>
								<span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-foreground bg-quaternary text-foreground">
									<MessageCircle size={20} strokeWidth={2.5} />
								</span>
								<span>
									<span className="block font-heading font-bold">WhatsApp</span>
									<span className="block text-xs text-muted-foreground">Chat on WhatsApp: 01884173052</span>
								</span>
							</a>
						</div>
					</section>
				</main>

				<footer className="mt-14 flex flex-col items-center gap-2 pb-8 text-sm font-semibold text-muted-foreground">
					<Squiggle className="h-3 w-24 text-tertiary" />
					<p>Developed by S.M. Abdullah</p>
				</footer>
			</div>
		</div>
	)
}

export default App
