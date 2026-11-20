import { useEffect, useMemo, useRef, useState, type FormEvent, type KeyboardEvent, type PointerEvent as ReactPointerEvent } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowDownRight, ArrowRight, ArrowUpRight, Check, ChevronDown, Code2, Command, Copy, Database, GitBranch, Github, Globe2, Menu, MoveUpRight, Terminal as TerminalIcon, X } from 'lucide-react'
import { profile, projects, skills, additionalSkills, type Project } from './data'

const navItems = ['About','Skills','Projects','Journey','Contact']
const skillLogos: Record<string, string> = {
  HTML: 'html5', CSS: 'css3', JavaScript: 'javascript', React: 'react', 'Tailwind CSS': 'tailwindcss', Bootstrap: 'bootstrap',
  PHP: 'php', Python: 'python', FastAPI: 'fastapi', Laravel: 'laravel', MySQL: 'mysql', PostgreSQL: 'postgresql', Supabase: 'supabase',
  Git: 'git', GitHub: 'github', 'VS Code': 'vscode', Postman: 'postman', Figma: 'figma', XAMPP: 'xampp',
  TypeScript: 'typescript', Flutter: 'flutter', 'Chart.js': 'chartdotjs',
}

function Cat({ small = false, onClick }: { small?: boolean; onClick?: () => void }) {
  return <button className={`cat ${small ? 'cat--small' : ''}`} onClick={onClick} aria-label="A little developer cat" type="button">
    <svg viewBox="0 0 140 112" role="img" aria-label="Charcoal cat tapping on a tiny laptop">
      <path className="cat-tail" d="M105 78c24 1 28-17 19-25-5-4-11-1-10 4 1 3 5 3 6 0" fill="none" stroke="currentColor" strokeWidth="7" strokeLinecap="round" />
      <path d="M36 39 32 12l25 17M81 28l23-16-1 29" fill="#101924" stroke="#586576" strokeWidth="3" strokeLinejoin="round" />
      <path d="M36 68c0-24 12-39 34-39s35 15 35 39v24H36z" fill="#17212d" stroke="#667789" strokeWidth="2" />
      <path d="M45 53c4-4 9-4 13 0m25 0c4-4 9-4 13 0" fill="none" stroke="#f5f7fb" strokeWidth="3" strokeLinecap="round" />
      <ellipse cx="53" cy="58" rx="3.5" ry="5" fill="#22d3ee" className="cat-eye" /><ellipse cx="88" cy="58" rx="3.5" ry="5" fill="#22d3ee" className="cat-eye" />
      <path d="m67 68 4 3 4-3-4 0z" fill="#ff92aa"/><path d="M71 72v4m0 0c-5 6-9 1-9 1m9-1c5 6 9 1 9 1" fill="none" stroke="#aab6c4" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M24 91h92l-9 13H32z" fill="#233144" stroke="#4f6279" strokeWidth="2"/><path d="M40 96h61" stroke="#22d3ee" strokeOpacity=".7" strokeWidth="1.5" />
      <path d="M54 93v-4m15 4v-4m15 4v-4" stroke="#8292a5" strokeWidth="2" strokeLinecap="round" className="cat-paws"/>
    </svg>
  </button>
}

function Loader({ onDone }: { onDone: () => void }) {
  const reduced = useReducedMotion()
  const [step, setStep] = useState(0)
  const [complete, setComplete] = useState(false)
  useEffect(() => {
    const timers = [window.setTimeout(() => setStep(1), 220), window.setTimeout(() => setStep(2), 440), window.setTimeout(() => setStep(3), 660), window.setTimeout(() => { setComplete(true); setStep(4) }, reduced ? 40 : 850)]
    // Loading is content-light; the short sequence gives the illustration time to land, never gates app readiness.
    const failSafe = window.setTimeout(onDone, 3500)
    return () => { timers.forEach(clearTimeout); clearTimeout(failSafe) }
  }, [onDone, reduced])
  const messages = ['Initializing portfolio…','Loading projects…','Preparing experience…','Welcome, explorer.']
  return <motion.div className="loader" initial={{ opacity:1 }} animate={complete ? { opacity:0 } : { opacity:1 }} transition={{ duration: reduced ? 0 : .58, delay: complete && !reduced ? .4 : 0 }} aria-live="polite" aria-label="Loading portfolio" onAnimationComplete={() => { if (complete) onDone() }}>
    <div className="loader__grain"/><div className="loader__content"><div className="loader__eyebrow"><span className="live-dot"/> A SMALL MOMENT, PLEASE</div>
      <Cat onClick={() => setStep(4)} /><div className="loader__terminal"><span className="loader__prompt">&gt;</span> {complete?'Ready to explore?':messages[Math.min(step,3)]}<span className="cursor">▍</span></div>
      <div className="loader__meter"><span style={{ width:`${[12,38,64,86,100][Math.min(step,4)]}%` }}/></div><div className="loader__bottom"><span>JLG. / PORTFOLIO</span><span>{[12,38,64,86,100][Math.min(step,4)]}%</span></div>
    </div><button className="loader__skip" onClick={onDone}>Skip intro <ArrowRight size={13}/></button>
  </motion.div>
}

function Navbar() {
  const [open,setOpen] = useState(false); const [active,setActive] = useState('Home'); const [scrolled,setScrolled] = useState(false)
  useEffect(() => {
    const update = () => { setScrolled(window.scrollY > 20); const sections = ['Home',...navItems]; let current='Home'; for(const id of sections){const el=document.getElementById(id.toLowerCase());if(el && el.getBoundingClientRect().top < window.innerHeight*.38) current=id} setActive(current) }
    window.addEventListener('scroll',update,{passive:true}); update(); return ()=>window.removeEventListener('scroll',update)
  },[])
  return <header className={`nav ${scrolled?'nav--scrolled':''}`}><a href="#home" className="nav__logo" aria-label="John Loyd Guanzon home">JLG<span>.</span></a><button className="nav__mobile" aria-label={open?'Close menu':'Open menu'} aria-expanded={open} onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</button>
    <nav className={open?'nav__links nav__links--open':'nav__links'} aria-label="Main navigation">{navItems.map(x=><a key={x} className={active===x?'is-active':''} href={`#${x.toLowerCase()}`} onClick={()=>setOpen(false)}>{x}</a>)}<a className="nav__github" href={profile.github} target="_blank" rel="noreferrer" aria-label="Visit John Loyd Guanzons GitHub profile"><Github size={19} strokeWidth={2.2}/><span>GitHub</span></a><a className="nav__contact" href="#contact" onClick={()=>setOpen(false)}>Let’s talk <ArrowUpRight size={14}/></a></nav>
  </header>
}

function SectionLabel({ n, children }: { n:string; children:string }) { return <div className="section-label"><span>{n}</span><i/><span>{children}</span></div> }

function SkillTile({ name, selected, onSelect }: { name: string; selected: boolean; onSelect: (name: string) => void }) {
  const trackPointer = (event: ReactPointerEvent<HTMLButtonElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect()
    event.currentTarget.style.setProperty('--spot-x', `${event.clientX - bounds.left}px`)
    event.currentTarget.style.setProperty('--spot-y', `${event.clientY - bounds.top}px`)
  }
  const logo = skillLogos[name]
  const fallback = name === 'REST APIs' ? <Code2 size={19} strokeWidth={1.7}/> : name === 'SQL' ? <Database size={19} strokeWidth={1.7}/> : name === 'Relational design' ? <GitBranch size={19} strokeWidth={1.7}/> : null
  return <button type="button" className={`skill-tile ${selected ? 'skill-tile--selected' : ''}`} aria-pressed={selected} onClick={() => onSelect(name)} onPointerMove={trackPointer}>
    <span className="skill-tile__mark" aria-hidden="true">{logo ? <img src={`/skills/${logo}.svg`} alt="" loading="lazy" decoding="async"/> : fallback}</span><span className="skill-tile__name">{name}</span><ArrowUpRight size={14} aria-hidden="true" />
  </button>
}

function ProjectVisual({ project, compact=false }: { project:Project; compact?:boolean }) {
  const screenshot = project.id === 'ridenow'
    ? { src: '/images/ridenow.png', alt: 'RideNow Autopiloto Car Rentals homepage screenshot supplied by John Loyd' }
    : project.id === 'jumpstart'
      ? { src: '/images/jumpstart.png', alt: 'Jumpstart Therapy Center homepage screenshot supplied by John Loyd' }
      : null
  if (screenshot) return <figure className={`project-visual project-visual--screenshot ${compact?'project-visual--compact':''}`}>
    <img className="project-screenshot" src={screenshot.src} alt={screenshot.alt} loading={compact?'lazy':'eager'} decoding="async" />
    <figcaption className="project-screenshot__caption"><span>FIG. {project.number}</span><span>Provided project website screenshot</span></figcaption>
  </figure>
  return <div className={`project-visual project-visual--${project.theme} ${compact?'project-visual--compact':''}`} role="img" aria-label={`${project.visualLabel ?? 'Conceptual visual placeholder'} for ${project.name}`}>
    <div className="visual-noise"/><div className="visual-top"><span><i/> PROJECT / {project.number}</span><span>CONCEPT VISUAL</span></div>
    {project.theme==='restaurant' && <div className="restaurant-ui"><div className="rest-side"><b>Table<span>ly.</span></b><small>GOOD FOOD, GOOD DAY.</small><div className="rest-menu">MENU<br/>ORDERS<br/>INVENTORY<br/>REPORTS</div></div><div className="rest-main"><small>MONDAY, 09:41 AM</small><h3>Good morning,<br/>team.</h3><div className="rest-stats"><div><small>ORDERS TODAY</small><strong>48</strong><em>↑ 12.4%</em></div><div><small>LOW STOCK ITEMS</small><strong>03</strong><em className="warn">Needs attention</em></div></div><div className="rest-chart"><span>SALES OVERVIEW</span><div className="bars">{[40,63,52,78,48,91,70,100,62,84,54,74].map((x,i)=><i style={{height:`${x}%`}} key={i}/>)}</div></div></div></div>}
    {project.theme==='ridenow' && <div className="ride-ui"><div className="ride-head"><b>ride<span>now</span></b><span>FLEET MANAGEMENT <ArrowUpRight size={12}/></span></div><div className="ride-title"><small>YOUR NEXT MOVE</small><h3>Fleet, in<br/>full view.</h3></div><div className="ride-car"><div className="car-body"/><div className="car-window"/><i/><i/></div><div className="ride-bottom"><span>01 / AVAILABLE VEHICLES</span><b>08 <ArrowUpRight size={14}/></b></div></div>}
    {project.theme==='jumpstart' && <div className="jump-ui"><div className="jump-head"><span className="jump-mark">J</span><div>JUMPSTART <small>THERAPY CENTER</small></div><span className="jump-avatar">JL</span></div><div className="jump-main"><div><small>MONDAY, NOVEMBER 16</small><h3>Good morning,<br/>John.</h3><p>A clear view of today’s care.</p></div><div className="jump-cards"><div><small>SESSIONS TODAY</small><strong>12</strong><i>↑ Scheduled</i></div><div><small>ATTENDANCE</small><strong>92%</strong><i>Weekly overview</i></div></div><div className="jump-chart"><div><span>ATTENDANCE OVERVIEW</span><small>LAST 7 DAYS</small></div><div className="linechart"><svg viewBox="0 0 600 90" preserveAspectRatio="none"><path d="M0 72 C50 63 62 52 112 58S179 74 230 47 294 61 347 32 410 50 466 24 542 33 600 12" fill="none" stroke="#57ddc0" strokeWidth="3"/><path d="M0 72 C50 63 62 52 112 58S179 74 230 47 294 61 347 32 410 50 466 24 542 33 600 12V90H0z" fill="url(#area)"/><defs><linearGradient id="area" x1="0" x2="0" y1="0" y2="1"><stop stopColor="#57ddc0" stopOpacity=".2"/><stop offset="1" stopColor="#57ddc0" stopOpacity="0"/></linearGradient></defs></svg></div></div></div></div>}
    {project.theme==='store'&&<div className="store-cover"><div className="store-cover__side"><b>STOCK<span> / </span>FLOW</b><small>STORE OPERATIONS</small><div>OVERVIEW<br/>PRODUCTS<br/>ORDERS<br/>SALES</div></div><div className="store-cover__main"><span>OPERATIONS / INVENTORY</span><h3>Everything<br/>in its place.</h3><div className="store-cover__stats"><i>PRODUCTS <b>—</b></i><i>ORDERS <b>—</b></i><i>REPORTS <b>PDF</b></i></div></div></div>}
    {project.theme==='cinetrack'&&<div className="cine-cover"><img src="/images/cinetrack.png" alt="CineTrack movie discovery app home screen" /></div>}
    <div className="visual-caption"><span>FIG. {project.number}</span><span>{project.visualLabel ?? 'Conceptual placeholder · not a product screenshot'}</span></div>
  </div>
}

function DetailModal({ project, close }: { project:Project; close:()=>void }) {
  useEffect(()=>{const prev=document.body.style.overflow;document.body.style.overflow='hidden';const key=(e:globalThis.KeyboardEvent)=>{if(e.key==='Escape') close()};window.addEventListener('keydown',key);return()=>{document.body.style.overflow=prev;window.removeEventListener('keydown',key)}},[close])
  return <motion.div className="modal-backdrop" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onMouseDown={e=>{if(e.target===e.currentTarget)close()}}><motion.article className="modal" initial={{y:28,opacity:0}} animate={{y:0,opacity:1}} exit={{y:20,opacity:0}} role="dialog" aria-modal="true" aria-labelledby="modal-title"><button className="modal__close" onClick={close} aria-label="Close project details"><X/></button><div className="modal__top"><span>CASE STUDY / {project.number}</span><span>{project.year}</span></div><ProjectVisual project={project} compact/><div className="modal__body"><div className="modal__category">{project.category}</div><h2 id="modal-title">{project.name}</h2><p className="modal__intro">{project.short}</p><div className="modal__grid"><div><h3>THE CHALLENGE</h3><p>{project.problem}</p><h3>THE APPROACH</h3><p>{project.solution}</p></div><div><h3>KEY FUNCTIONALITY</h3><ul>{project.features.map(f=><li key={f}>{f}</li>)}</ul><h3>PROJECT STATUS</h3><p>{project.stage ?? (project.repoUrl ? "Public source available" : "Source repository not publicly accessible")}</p></div></div><div className="modal__contribution"><span>MY CONTRIBUTION</span><p>{project.contribution}</p></div><div className="modal__stack">{project.tags.map(t=><span key={t}>{t}</span>)}</div>{project.repoUrl&&<a className="text-link modal-live-link" href={project.repoUrl} target="_blank" rel="noreferrer"><Github size={14}/> View source repository <ArrowUpRight size={14}/></a>}{project.infoUrl&&<a className="text-link modal-live-link" href={project.infoUrl} target="_blank" rel="noreferrer">Visit organization website <ArrowUpRight size={14}/></a>}{!["ridenow","jumpstart"].includes(project.id) && <p className="modal__note">Project cover is a conceptual visual placeholder, not an application screenshot.</p>}</div></motion.article></motion.div>
}

function Terminal() {
  const [input,setInput] = useState(''); const [history,setHistory] = useState<{cmd:string;out:string}[]>([]); const field=useRef<HTMLInputElement>(null)
  const commands:Record<string,string> = {help:'Available: about · skills · projects · contact · cat · clear',about:'IT student in System Management. Aspiring full-stack developer based in Lipa City, Philippines.',skills:'React · Laravel · FastAPI · Python · MySQL · PostgreSQL',projects:'3 projects available. Open a case study or follow a verified repository link.',contact:'Write to johnloydwasquin27@gmail.com — the Contact section has a direct email link.',cat:' /\_/\\\n( o.o )  purr-gram initialized. Keep building something useful.\n > ^ <'}
  const run=(raw:string)=>{const cmd=raw.trim().toLowerCase();setInput('');if(!cmd)return;if(cmd==='clear'){setHistory([]);return}setHistory(h=>[...h,{cmd,out:commands[cmd]??`Command not found: ${cmd}. Try “help”.`}])}
  const key=(e:KeyboardEvent<HTMLInputElement>)=>{if(e.key==='Enter')run(input)}
  return <div className="terminal" onClick={()=>field.current?.focus()}><div className="terminal__bar"><div className="terminal__lights"><i/><i/><i/></div><span><TerminalIcon size={13}/> johnloyd@portfolio — interactive terminal</span><span className="terminal__hint"><Command size={12}/> TRY A COMMAND</span></div><div className="terminal__body"><div className="term-line"><span className="term-prompt">johnloyd@portfolio:~$</span> whoami</div><div className="term-out">John Loyd W. Guanzon</div><div className="term-line"><span className="term-prompt">johnloyd@portfolio:~$</span> skills</div><div className="term-out">React&nbsp; | &nbsp;Laravel&nbsp; | &nbsp;FastAPI&nbsp; | &nbsp;Python&nbsp; | &nbsp;MySQL</div><div className="term-line"><span className="term-prompt">johnloyd@portfolio:~$</span> projects</div><div className="term-out">3 featured projects available</div>{history.map((h,i)=><div key={i}><div className="term-line"><span className="term-prompt">johnloyd@portfolio:~$</span> {h.cmd}</div><div className="term-out term-out--response">{h.out.split('\n').map((l,j)=><span key={j}>{l}</span>)}</div></div>)}<label className="term-input-line"><span className="term-prompt">johnloyd@portfolio:~$</span><input ref={field} value={input} onChange={e=>setInput(e.target.value)} onKeyDown={key} aria-label="Enter a terminal command" autoComplete="off" spellCheck="false"/><span className="cursor"/></label><div className="term-commands">{['help','about','skills','projects','contact','cat','clear'].map(c=><button key={c} onClick={e=>{e.stopPropagation();run(c)}}>{c}</button>)}</div></div></div>
}

function ContactForm() {
  const [status,setStatus]=useState('');const [copied,setCopied]=useState(false)
  const copy=async()=>{try{await navigator.clipboard.writeText(profile.email);setCopied(true);window.setTimeout(()=>setCopied(false),1700)}catch{window.location.href=`mailto:${profile.email}`}}
  const submit=(e:FormEvent<HTMLFormElement>)=>{e.preventDefault();const data=new FormData(e.currentTarget);const name=String(data.get('name')||'').trim(),email=String(data.get('email')||'').trim(),subject=String(data.get('subject')||'').trim(),message=String(data.get('message')||'').trim();if(!name||!email||!subject||!message){setStatus('Please complete every field.');return}if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){setStatus('Please enter a valid email address.');return}const mailto=`mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Hi John,\n\n${message}\n\n— ${name}\n${email}`)}`;setStatus('Your email app will open with the message ready to send.');window.location.href=mailto}
  return <div className="contact-grid"><div className="contact-aside"><p className="contact-copy">I’m interested in opportunities to collaborate, learn, and build meaningful digital solutions.</p><div className="contact-email"><span>EMAIL ME DIRECTLY</span><button onClick={copy}>{profile.email} {copied?<Check size={15}/>:<Copy size={15}/>}</button></div><div className="contact-location"><Globe2 size={15}/><span>Lipa City, Batangas<br/>Philippines</span></div><div className="contact-phone"><span>PHONE</span><a href="tel:+639317683228">+63 931 768 3228</a></div><p className="social-note">GitHub is linked below. LinkedIn profile not provided.</p></div><form className="contact-form" onSubmit={submit} noValidate><div className="form-row"><label>YOUR NAME<input name="name" autoComplete="name" required placeholder="John Doe"/></label><label>EMAIL ADDRESS<input name="email" type="email" autoComplete="email" required placeholder="you@example.com"/></label></div><label>SUBJECT<input name="subject" required placeholder="A project, a role, a good idea…"/></label><label>MESSAGE<textarea name="message" rows={4} required placeholder="Tell me a little about it."/></label><div className="form-foot"><p role="status">{status || 'Opens your email app — no message is stored here.'}</p><button className="button button--primary" type="submit">Prepare email <ArrowUpRight size={15}/></button></div></form></div>
}

function App() {
  const [loading,setLoading]=useState(true);const [selected,setSelected]=useState<Project|null>(null);const [selectedSkill,setSelectedSkill]=useState<string|null>(null);const [terminalVisible,setTerminalVisible]=useState(true);const reduced=useReducedMotion()
  const finishLoading=useMemo(()=>()=>setLoading(false),[])
  useEffect(()=>{
    const progress=()=>{const max=document.documentElement.scrollHeight-window.innerHeight;document.documentElement.style.setProperty('--scroll-progress',max>0?`${window.scrollY/max}`:'0')}
    window.addEventListener('scroll',progress,{passive:true});progress();return()=>window.removeEventListener('scroll',progress)
  },[])
  useEffect(()=>{if(loading)return;const io=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');io.unobserve(entry.target)}}),{threshold:.12});document.querySelectorAll('.reveal').forEach(el=>io.observe(el));return()=>io.disconnect()},[loading])
  useEffect(()=>{
    if(loading||reduced)return
    let disposed=false
    let revert:()=>void=()=>{}
    Promise.all([import('gsap'),import('gsap/ScrollTrigger')]).then(([gsapModule,scrollModule])=>{
      if(disposed)return
      const gsap=gsapModule.gsap
      gsap.registerPlugin(scrollModule.ScrollTrigger)
      const context=gsap.context(()=>{
        gsap.utils.toArray<HTMLElement>('.project-visual').forEach(visual=>gsap.fromTo(visual,{y:14},{y:-14,ease:'none',scrollTrigger:{trigger:visual,start:'top bottom',end:'bottom top',scrub:.7}}))
      })
      revert=()=>context.revert()
    }).catch(()=>undefined)
    return()=>{disposed=true;revert()}
  },[loading,reduced])
  return <>
    <AnimatePresence>{loading&&<Loader onDone={finishLoading}/>}</AnimatePresence>
    <div className="page-shell"><div className="scroll-progress"/><Navbar/>
      <main>
        <section id="home" className="hero hero--editorial">
          <div className="hero-grid" aria-hidden="true" />
          <div className="hero-editorial__copy">
            <div className="hero-meta"><span className="hero-greeting"><i /> IT STUDENT · SYSTEM MANAGEMENT</span><span className="mono">LIPA CITY, PHILIPPINES</span></div>
            <h1 className="hero-title"><span>JOHN LOYD W.</span><span className="hero-title__second">GUANZON<span className="hero-period">.</span></span></h1>
            <p className="hero-statement">BUILDING SOFTWARE<br /><em>THAT SOLVES REAL PROBLEMS.</em></p>
            <p className="hero-copy">I’m an Information Technology student and aspiring full-stack developer focused on reliable web applications, structured backend systems, and intuitive digital experiences.</p>
            <div className="hero-techline"><span>WORKING WITH</span><b>REACT</b><i /> <b>LARAVEL</b><i /> <b>MYSQL</b><i /> <b>FASTAPI</b></div>
            <div className="hero-actions"><a className="button button--primary" href="#projects">View my projects <ArrowDownRight size={16} /></a><a className="button button--quiet" href="#contact">Contact me <ArrowUpRight size={15} /></a></div>
            <div className="hero-links"><a href={profile.github} target="_blank" rel="noreferrer"><Github size={16} /> GitHub profile <ArrowUpRight size={13} /></a><span>Resume available on request</span></div>
          </div>
          <figure className="hero-portrait reveal"><div className="hero-portrait__frame"><img src="/images/john-loyd-portrait.png" alt="John Loyd Guanzon — Full-Stack Developer" width="1254" height="1254" fetchPriority="high" decoding="async" /><span className="hero-portrait__marker">JLG / 01</span></div><figcaption><span>JOHN LOYD W. GUANZON</span><span>ASPIRING FULL-STACK DEVELOPER</span></figcaption><div className="hero-portrait__note"><i /> OPEN TO INTERNSHIP & OJT</div></figure>
        </section>

        <section id="about" className="section about-section"><div className="section-inner"><SectionLabel n="01" children="ABOUT ME"/><div className="about-layout"><aside className="about-art reveal"><span className="about-index">JLG / 2026</span><p className="about-manifesto">SYSTEMS<br/><em>THINKING.</em><br/>HUMAN<br/><em>WORKFLOWS.</em></p><div className="about-signal"><i/><span>LIPA CITY, BATANGAS</span></div><div className="about-lines" aria-hidden="true"><i/><i/><i/><i/><i/><i/><i/></div></aside><div className="about-text reveal"><div className="eyebrow">BS INFORMATION TECHNOLOGY · SYSTEM MANAGEMENT</div><h2>BEYOND<br/>THE <em>CODE.</em></h2><div className="about-prose"><p>I’m an Information Technology student at Batangas State University and an aspiring full-stack developer based in Lipa City, Philippines.</p><p>My interest is in turning real workflows into useful software: clear interfaces on the surface, dependable application logic and structured data underneath.</p><p>Coursework and project teams have given me hands-on practice with web applications, databases, API integrations, and management systems. I’m continuing to grow my skills in backend development, system architecture, and product thinking.</p></div><div className="about-facts"><div><span>DEGREE</span><strong>BS Information Technology</strong></div><div><span>MAJOR</span><strong>System Management</strong></div><div><span>UNIVERSITY</span><strong>Batangas State University · Lipa Campus</strong></div><div><span>GRADUATION</span><strong>Expected 2027</strong></div></div></div></div></div></section>

        <section id="skills" className="section skills-section"><div className="section-inner"><SectionLabel n="02" children="TOOLS I USE"/><div className="skills-intro reveal"><div><span className="eyebrow">BUILT THROUGH COURSEWORK & PROJECTS</span><h2>MY TECHNICAL<br/><em>TOOLKIT.</em></h2></div><p>Practical tools for shaping interfaces, connecting application logic, and organizing data. Each tile responds to pointer, focus, and touch.</p></div><div className="skills-grid">{skills.map(group=><section className="skill-group reveal" key={group.index} aria-labelledby={`skill-group-${group.index}`}><div className="skill-group__top"><span>{group.index} / 04</span><span className="skill-group__rule"/></div><h3 id={`skill-group-${group.index}`}>{group.title}</h3><div className="skill-tiles" role="list">{group.items.map(item=><div role="listitem" key={item}><SkillTile name={item} selected={selectedSkill===item} onSelect={setSelectedSkill}/></div>)}</div></section>)}</div><div className="additional-skills"><span>ALSO EXPLORED IN PROJECT WORK</span><div>{additionalSkills.map(item=><span className="additional-skill" key={item}><img src={`/skills/${skillLogos[item]}.svg`} alt="" loading="lazy" decoding="async"/>{item}</span>)}</div></div><p className="skills-footnote" aria-live="polite">{selectedSkill?`${selectedSkill} · selected from the ${skills.find(group=>group.items.includes(selectedSkill))?.title.toLowerCase()} toolkit.`:'Select a tile to pin its spotlight. No proficiency scores are implied.'}</p></div></section>

        <section id="projects" className="section projects-section"><div className="section-inner"><SectionLabel n="03" children="SELECTED WORK"/><div className="section-heading section-heading--projects reveal"><h2>REAL WORK.<br/><span>REAL SYSTEMS.</span></h2><p>Three projects, checked against their public source where available. RideNow and Jumpstart are shown with screenshots supplied for this portfolio.</p></div><div className="project-list">{projects.map((project,i)=><article className={`project-row reveal ${i%2?'project-row--reverse':''}`} key={project.id}><button className="project-visual-button" onClick={()=>setSelected(project)} aria-label={`Open ${project.name} case study`}><ProjectVisual project={project}/><span className="project-zoom"><MoveUpRight size={18}/></span></button><div className="project-info"><div className="project-meta"><span>{project.number} / {project.category}</span><span>{project.year}</span></div><button className="project-title-button" onClick={()=>setSelected(project)}><h3>{project.name}</h3><ArrowUpRight size={19}/></button><p>{project.short}</p><div className="project-tags">{project.tags.map(tag=><span key={tag}>{tag}</span>)}</div>{project.stage&&<p className="project-stage">{project.stage}</p>}<div className="project-keyline"><span>MODULES</span><p>{project.features.slice(0,3).join(' · ')}</p></div><div className="project-actions"><button className="text-link" onClick={()=>setSelected(project)}>Explore case study <ArrowRight size={15}/></button>{project.repoUrl?<a className="project-repo" href={project.repoUrl} target="_blank" rel="noreferrer"><Github size={14}/> Source repository <ArrowUpRight size={13}/></a>:<span className="project-source-note">No public repository link</span>}</div></div></article>)}</div><div className="projects-foot reveal"><span>01—03 / SOURCE-VERIFIED WHERE PUBLICLY AVAILABLE</span><a href={profile.github} target="_blank" rel="noreferrer">MORE ON GITHUB <ArrowUpRight size={13}/></a></div></div></section>

        <section id="journey" className="section journey-section"><div className="section-inner"><SectionLabel n="04" children="THE JOURNEY SO FAR"/><div className="section-heading reveal"><h2>BUILT ONE<br/><span>STEP AT A TIME.</span></h2><p>A growing practice shaped by learning, experimentation, and real project work.</p></div><div className="timeline"><div className="timeline-line"/><div className="timeline-item reveal"><div className="timeline-date">2023</div><div className="timeline-dot"/><div className="timeline-content"><span>EDUCATION</span><h3>ICT · Senior High School</h3><p>Fernando Airbase Integrated National High School</p><small>Information and Communications Technology strand</small></div></div><div className="timeline-item reveal"><div className="timeline-date">2023—27</div><div className="timeline-dot"/><div className="timeline-content"><span>EDUCATION · IN PROGRESS</span><h3>BS Information Technology</h3><p>Batangas State University – The National Engineering University, Lipa Campus</p><small>Major in System Management · Expected graduation 2027</small></div></div><div className="timeline-item reveal"><div className="timeline-date">2025</div><div className="timeline-dot"/><div className="timeline-content"><span>PROJECT</span><h3>RideNow car rental system</h3><p>Group repository with Laravel booking, staff, and admin modules.</p><button onClick={()=>setSelected(projects.find(project=>project.id==='ridenow')!)}>View project <ArrowUpRight size={13}/></button></div></div><div className="timeline-item reveal"><div className="timeline-date">2026</div><div className="timeline-dot"/><div className="timeline-content"><span>CAPSTONE · IN PROGRESS</span><h3>Jumpstart Therapy Center</h3><p>Capstone in progress; public repository URL did not resolve during review.</p><button onClick={()=>setSelected(projects.find(project=>project.id==='jumpstart')!)}>View project <ArrowUpRight size={13}/></button></div></div></div>
          <div className="affiliations reveal"><div className="affiliation-head"><span>OUTSIDE THE EDITOR</span><span>ACADEMIC COMMUNITY</span></div><div className="affiliation-row"><div><h3>Junior Philippine Computer Society</h3><span>BatStateU TNEU · Lipa Chapter</span></div><span>Member</span><span>Aug 2023 — Jun 2027</span></div><div className="affiliation-row"><div><h3>Tech Innovation Society</h3><span>BatStateU TNEU</span></div><span>Member</span><span>Aug 2023 — Jun 2027</span></div><div className="affiliation-row"><div><h3>BITCON Conference</h3><span>Participant</span></div><span>Conference</span><span>—</span></div></div></div></section>

        <section className="terminal-section"><div className="section-inner"><SectionLabel n="05" children="A LITTLE DEVELOPER MODE"/><div className="terminal-heading reveal"><div><h2>TAKE THE<br/><span>SHORTCUT.</span></h2><p>A tiny terminal, with a very limited command set.</p></div><button className="terminal-toggle" onClick={()=>setTerminalVisible(!terminalVisible)} aria-expanded={terminalVisible}>{terminalVisible?'Close terminal':'Open terminal'} <ChevronDown size={14}/></button></div><AnimatePresence initial={false}>{terminalVisible&&<motion.div initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}} exit={{height:0,opacity:0}} transition={{duration:.28}}><Terminal/></motion.div>}</AnimatePresence><p className="terminal-disclaimer">No shell commands here. Just a few things about the work.</p></div></section>

        <section id="contact" className="section contact-section"><div className="section-inner"><SectionLabel n="06" children="YOUR TURN"/><div className="contact-head reveal"><span className="contact-kicker"><i/> OPEN TO GOOD CONVERSATIONS</span><h2>HAVE AN IDEA?<br/><em>LET’S MAKE IT REAL.</em></h2><ArrowDownRight className="contact-arrow" strokeWidth={1}/></div><ContactForm/><div className="contact-bottom"><span>BUILD WITH CURIOSITY. SHIP WITH CARE.</span><span>MANILA TIME · AVAILABLE FOR COLLABORATION</span></div></div></section>
      </main>
      <footer className="footer"><div className="footer-top"><a href="#home" className="footer-logo">JLG<span>.</span></a><p>Designed & developed<br/>with intention by John Loyd Guanzon.</p><a href="#home" className="back-top">BACK TO TOP <ArrowUpRight size={14}/></a></div><div className="footer-main"><Cat small onClick={()=>window.scrollTo({top:0,behavior:'smooth'})}/><div className="footer-links">{navItems.map(n=><a href={`#${n.toLowerCase()}`} key={n}>{n}</a>)}</div><div className="footer-right"><a className="footer-github" href={profile.github} target="_blank" rel="noreferrer"><Github size={14}/> GitHub <ArrowUpRight size={13}/></a><a href={`mailto:${profile.email}`}>{profile.email} <ArrowUpRight size={13}/></a><span>JUNIOR DEVELOPER · LIPA CITY, PH</span></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} JOHN LOYD W. GUANZON</span><span>BUILT WITH REACT · TYPESCRIPT · A LITTLE CAT ENERGY</span><span>DESIGNED TO BE USEFUL.</span></div></footer>
    </div><AnimatePresence>{selected&&<DetailModal project={selected} close={()=>setSelected(null)}/>}</AnimatePresence>
  </>
}

export default App


