import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useForm, ValidationError } from '@formspree/react'
import {
  Mail,
  ArrowUpRight,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Menu,
  X,
  Upload,
  TrendingDown,
  TrendingUp,
  Users,
  Wrench,
  Home,
  Scissors,
  Car,
  Heart,
  Building2,
  Globe,
  Search,
  Megaphone,
  Palette,
  ShoppingBag,
  Sparkles,
  ExternalLink,
  Rocket,
  Coffee,
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

/* ----------------------------------------------------------------
   useInView — reliable scroll-reveal hook (IntersectionObserver based).
   GSAP ScrollTrigger's "once: true" pattern races with React 19
   StrictMode's mount/cleanup/remount cycle and can leave elements
   stuck at their hidden "from" state. IntersectionObserver doesn't.
---------------------------------------------------------------- */
function useInView(threshold = 0.15) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect() } },
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return [ref, visible]
}

/* ----------------------------------------------------------------
   Logo Mark
---------------------------------------------------------------- */
function LogoMark({ size = 36 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="lm-bg" x1="0" y1="40" x2="40" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#4338CA" />
          <stop offset="100%" stopColor="#6366F1" />
        </linearGradient>
        <linearGradient id="lm-glow" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#14B8A6" />
          <stop offset="100%" stopColor="#5850EC" />
        </linearGradient>
        <filter id="lm-dot-glow">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      {/* Background */}
      <rect width="40" height="40" rx="11" fill="url(#lm-bg)" />
      {/* Subtle inner highlight */}
      <rect x="0.5" y="0.5" width="39" height="39" rx="10.5" stroke="white" strokeOpacity="0.12" strokeWidth="1" fill="none" />
      {/* First chevron (faded — the "past") */}
      <path
        d="M9 13.5 L18.5 20 L9 26.5"
        stroke="white"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        strokeOpacity="0.28"
      />
      {/* Second chevron (bright — the "edge") */}
      <path
        d="M18 13.5 L27.5 20 L18 26.5"
        stroke="white"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        strokeOpacity="0.9"
      />
      {/* Teal node at the leading tip */}
      <circle cx="27.5" cy="20" r="3.2" fill="#14B8A6" filter="url(#lm-dot-glow)" />
      <circle cx="27.5" cy="20" r="1.4" fill="white" fillOpacity="0.9" />
    </svg>
  )
}

/* ----------------------------------------------------------------
   Browser Frame — wraps real site screenshots for the portfolio
---------------------------------------------------------------- */
function BrowserFrame({ src, alt, label, className = '' }) {
  return (
    <div className={`relative rounded-2xl overflow-hidden border border-white/10 bg-[#0d0b1a] ${className}`}>
      <div className="flex items-center gap-1.5 px-3 py-2 bg-white/5 border-b border-white/10">
        <span className="h-2 w-2 rounded-full bg-red-400/60" />
        <span className="h-2 w-2 rounded-full bg-yellow-400/60" />
        <span className="h-2 w-2 rounded-full bg-emerald-400/60" />
        {label && (
          <span className="ml-2 font-mono text-[9px] text-white/35 truncate tracking-wide">{label}</span>
        )}
      </div>
      <div className="max-h-64 overflow-hidden">
        <img src={src} alt={alt} loading="lazy" className="w-full h-auto object-cover object-top" />
      </div>
    </div>
  )
}

/* ----------------------------------------------------------------
   Constants
---------------------------------------------------------------- */
const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Work', href: '#work' },
  { label: 'Services', href: '#services' },
  { label: 'Process', href: '#process' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Contact', href: '#contact' },
]

const SERVICES_FULL = [
  {
    icon: Globe,
    title: 'Website Design & Development',
    text: 'Custom-built, mobile-first websites that load fast and make a great first impression — no bloated templates, no drag-and-drop compromises.',
  },
  {
    icon: ShoppingBag,
    title: 'eCommerce & Shopify Builds',
    text: 'Full Shopify and custom storefronts wired up to convert browsers into buyers — clean product pages, fast checkout, real merchandising.',
  },
  {
    icon: Search,
    title: 'SEO & Content',
    text: 'Technical SEO, on-page optimisation, and content that actually ranks and reads well — so customers find you before they find your competitor.',
  },
  {
    icon: Megaphone,
    title: 'Paid Ads (Google & Meta)',
    text: 'High-converting campaigns across Google, Facebook and Instagram — copy, creative, targeting, and optimisation, done for you.',
  },
  {
    icon: Palette,
    title: 'Branding & Identity',
    text: 'Logo, colour, type, and voice — a brand system that makes you look like the obvious choice the moment someone lands on your site.',
  },
  {
    icon: Mail,
    title: 'Email & SMS Marketing',
    text: 'Automated flows that turn one-time visitors into repeat customers — welcome series, abandoned cart, win-back, and more.',
  },
  {
    icon: Sparkles,
    title: 'AI-Powered Features',
    text: 'Smart on-site chat, lead follow-up, and workflow automation layered into your site to save you hours every week.',
  },
  {
    icon: ShieldCheck,
    title: 'Website Care & Hosting',
    text: 'Ongoing updates, hosting, backups, and performance monitoring — your site stays fast, secure, and online.',
  },
]

/* ----------------------------------------------------------------
   Navbar
---------------------------------------------------------------- */
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <nav
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 rounded-full px-4 sm:px-6 py-2.5 w-[calc(100%-2rem)] max-w-5xl ${
          scrolled ? 'glass shadow-lg shadow-primary/10' : 'bg-transparent'
        }`}
      >
        <div className="flex items-center justify-between gap-6">
          <a href="#home" className="flex items-center gap-2.5 group">
            <span className="relative flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
              <LogoMark size={36} />
            </span>
            <span className="font-display font-bold tracking-tight text-lg text-white transition-colors">
              On The Edge
            </span>
          </a>

          <div className="hidden lg:flex items-center gap-7">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium tracking-tight lift-on-hover text-white/70 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <a
            href="#contact"
            className="hidden lg:inline-flex magnetic-btn items-center gap-1.5 bg-primary text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg shadow-primary/30"
          >
            Get a Free Audit
            <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
          </a>

          <button
            onClick={() => setOpen(true)}
            className="lg:hidden p-2 rounded-full text-white"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-[60] transition-all duration-500 lg:hidden ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="absolute inset-0 bg-deep/90 backdrop-blur-2xl" onClick={() => setOpen(false)} />
        <div
          className={`absolute top-0 left-0 right-0 bg-surface rounded-b-5xl px-6 pt-8 pb-12 transition-transform duration-500 ${
            open ? 'translate-y-0' : '-translate-y-full'
          }`}
        >
          <div className="flex items-center justify-between mb-10">
            <span className="font-display font-bold text-xl text-ink">On The Edge</span>
            <button onClick={() => setOpen(false)} className="p-2 rounded-full bg-divider/40">
              <X className="h-5 w-5 text-ink" />
            </button>
          </div>
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="font-display text-3xl font-semibold text-ink py-3 border-b border-divider"
              >
                {link.label}
              </a>
            ))}
          </div>
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-8 magnetic-btn flex items-center justify-center gap-2 bg-primary text-white px-6 py-4 rounded-full font-semibold w-full"
          >
            Get a Free Audit
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </>
  )
}

/* ----------------------------------------------------------------
   Hero
---------------------------------------------------------------- */
function Hero() {
  const heroRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-line-1', { y: 40, opacity: 0, duration: 1, ease: 'power3.out', delay: 0.3 })
      gsap.from('.hero-line-2', { y: 60, opacity: 0, duration: 1.2, ease: 'power3.out', delay: 0.5 })
      gsap.from('.hero-cta, .hero-meta', { y: 24, opacity: 0, duration: 0.8, ease: 'power3.out', delay: 0.8, stagger: 0.12 })
    }, heroRef)
    return () => ctx.revert()
  }, [])

  const capabilities = ['Website Design', 'Shopify & eCommerce', 'SEO', 'Google Ads', 'Meta Ads', 'Branding', 'Email Marketing', 'Landing Pages', 'Web Apps', 'AI Automation']

  return (
    <section id="home" ref={heroRef} className="relative min-h-[100dvh] w-full overflow-hidden">
      {/* Background — layered navy gradient with mesh */}
      <div className="absolute inset-0 bg-deep" />
      {/* Radial glow orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[36rem] w-[56rem] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(79,70,229,0.22) 0%, transparent 70%)' }} />
        <div className="absolute top-[30%] -left-32 h-[28rem] w-[28rem] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(20,184,166,0.10) 0%, transparent 70%)' }} />
        <div className="absolute bottom-0 right-0 h-[24rem] w-[36rem] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(79,70,229,0.12) 0%, transparent 70%)' }} />
      </div>
      {/* Dot grid */}
      <div className="absolute inset-0 grid-bg opacity-60 pointer-events-none" />
      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, #121316)' }} />

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-[18%] h-1.5 w-1.5 rounded-full bg-primary/60 animate-float" style={{ animationDelay: '0s' }} />
        <div className="absolute top-[55%] right-[10%] h-1 w-1 rounded-full bg-accent/50 animate-float" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-[38%] right-[27%] h-1 w-1 rounded-full bg-primary-light/40 animate-float" style={{ animationDelay: '3s' }} />
        <div className="absolute top-[20%] right-[35%] h-1 w-1 rounded-full bg-white/20 animate-float" style={{ animationDelay: '2.2s' }} />
        <div className="absolute top-[65%] left-[15%] h-1.5 w-1.5 rounded-full bg-accent/30 animate-float" style={{ animationDelay: '0.8s' }} />
      </div>

      {/* Top frame */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      {/* Content */}
      <div className="relative z-10 flex min-h-[100dvh] flex-col items-center justify-center text-center">
        <div className="px-6 sm:px-10 lg:px-16 max-w-5xl">
          <p className="hero-meta font-mono text-xs uppercase tracking-[0.3em] text-white/50 mb-8">
            Built for Small Business &nbsp;·&nbsp; Website &amp; Marketing Studio
          </p>

          <h1 className="font-display font-extrabold text-white leading-[0.95] tracking-tight">
            <span className="hero-line-1 block text-5xl sm:text-7xl md:text-8xl">
              Built to be seen.
            </span>
            <span
              className="hero-line-2 block font-serif italic font-medium text-primary text-6xl sm:text-8xl md:text-9xl mt-2"
              style={{ lineHeight: '0.92' }}
            >
              Built to sell.
            </span>
          </h1>

          <p className="hero-meta mx-auto max-w-xl text-white/65 text-base sm:text-lg mt-8 leading-relaxed">
            We design and build fast, beautiful websites for small businesses — then run the SEO, ads, and content that fill them with customers.
            <span className="text-white"> One team. One roof. AI-accelerated builds, live in days.</span>
          </p>

          {/* Capability ticker */}
          <div className="hero-meta mt-8 overflow-hidden w-full max-w-2xl mx-auto mask-fade-x">
            <div className="flex items-center gap-3 animate-ticker whitespace-nowrap" style={{ width: 'max-content' }}>
              {[...capabilities, ...capabilities].map((cap, i) => (
                <span key={i} className="inline-flex items-center gap-2 bg-white/8 border border-white/12 rounded-full px-3 py-1 text-xs font-mono text-white/60 uppercase tracking-widest flex-shrink-0">
                  <span className="h-1 w-1 rounded-full bg-primary" />
                  {cap}
                </span>
              ))}
            </div>
          </div>

          <div className="hero-cta mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#contact"
              className="magnetic-btn group inline-flex items-center justify-center gap-2 bg-primary text-white font-semibold px-8 py-4 rounded-full shadow-2xl shadow-primary/40"
            >
              Get My Free Website &amp; Marketing Audit
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="#work"
              className="lift-on-hover inline-flex items-center justify-center gap-2 bg-white/8 backdrop-blur-md text-white border border-white/15 font-medium px-8 py-4 rounded-full"
            >
              See Our Work
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 right-6 sm:right-12 hidden md:flex flex-col items-center gap-2 text-white/40">
          <span className="font-mono uppercase text-[10px] tracking-[0.3em]">Scroll</span>
          <div className="h-8 w-px bg-gradient-to-b from-white/40 to-transparent" />
        </div>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------
   Feature Card 1 — Build Speed Shuffler
---------------------------------------------------------------- */
function AutomationShuffler() {
  const items = [
    { tag: 'Design', label: 'Homepage design approved', metric: 'Day 2' },
    { tag: 'Build', label: 'Full site built & staged', metric: 'Day 5' },
    { tag: 'Launch', label: 'Site live & indexed', metric: 'Day 7' },
  ]
  const [stack, setStack] = useState(items)

  useEffect(() => {
    const interval = setInterval(() => {
      setStack((prev) => {
        const next = [...prev]
        next.unshift(next.pop())
        return next
      })
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative h-44 w-full">
      {stack.map((item, i) => {
        const offset = i
        const total = stack.length
        return (
          <div
            key={item.tag}
            style={{
              transform: `translate(${offset * 14}px, ${offset * 14}px) scale(${1 - offset * 0.05})`,
              zIndex: total - offset,
              opacity: 1 - offset * 0.25,
              transition: 'transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.6s ease',
            }}
            className="absolute inset-0 bg-surface border border-divider rounded-3xl p-5 shadow-lg shadow-black/30"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-widest text-primary bg-primary/15 px-2 py-1 rounded-full">
                {item.tag}
              </span>
              <span className="font-mono text-xs text-muted">{item.metric}</span>
            </div>
            <div className="mt-4 font-display text-lg font-semibold text-ink leading-tight">
              {item.label}
            </div>
            <div className="mt-3 flex items-center gap-1.5">
              {Array.from({ length: 24 }).map((_, idx) => (
                <span
                  key={idx}
                  className="h-1 w-1 rounded-full"
                  style={{ background: idx < 24 - offset * 6 ? '#5850EC' : '#E2E4E8' }}
                />
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}

/* ----------------------------------------------------------------
   Feature Card 2 — Growth Monitor (signature animation)
---------------------------------------------------------------- */
function AIDataFlow() {
  const [statusIdx, setStatusIdx] = useState(0)
  const [count, setCount] = useState(0)

  const statuses = [
    { text: 'Tracking site traffic · monitoring', label: 'Idle', tone: 'primary' },
    { text: 'New inquiry detected · routing', label: 'Triggered', tone: 'accent' },
    { text: 'Running follow-up sequence', label: 'Active', tone: 'accent' },
    { text: 'Lead converted to customer', label: 'Done', tone: 'emerald' },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setStatusIdx((idx) => {
        const next = (idx + 1) % statuses.length
        if (statuses[next].label === 'Done') setCount((c) => c + 1)
        return next
      })
    }, 2300)
    return () => clearInterval(interval)
  }, [])

  const packets = [
    { left: '12%', delay: '0.0s', dur: '2.6s', size: 12 },
    { left: '24%', delay: '1.3s', dur: '3.0s', size: 10 },
    { left: '37%', delay: '0.6s', dur: '2.8s', size: 14 },
    { left: '50%', delay: '1.8s', dur: '2.4s', size: 11 },
    { left: '63%', delay: '0.9s', dur: '3.1s', size: 13 },
    { left: '76%', delay: '2.0s', dur: '2.7s', size: 10 },
    { left: '87%', delay: '0.4s', dur: '2.9s', size: 12 },
  ]

  const ripples = [
    { left: '22%', delay: '0.2s' },
    { left: '50%', delay: '1.0s' },
    { left: '76%', delay: '1.8s' },
  ]

  const status = statuses[statusIdx]
  const dotColor =
    status.tone === 'emerald' ? 'bg-emerald-400' :
    status.tone === 'accent' ? 'bg-accent' : 'bg-primary'
  const textColor =
    status.tone === 'emerald' ? 'text-emerald-400' :
    status.tone === 'accent' ? 'text-accent' : 'text-primary-light'

  return (
    <div
      className="relative h-44 w-full rounded-3xl overflow-hidden border border-primary/20"
      style={{ background: 'linear-gradient(180deg, #101114 0%, #17181D 60%, #1C1E24 100%)' }}
    >
      {/* Ambient glow */}
      <div className="absolute -top-4 left-1/4 h-16 w-32 rounded-full bg-primary/25 blur-2xl pointer-events-none" />
      <div className="absolute top-0 right-1/4 h-12 w-24 rounded-full bg-accent/10 blur-xl pointer-events-none" />

      {/* Header */}
      <div className="absolute top-3 left-4 right-4 flex items-center justify-between z-20">
        <div className="flex items-center gap-2">
          <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="#818CF8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 3v18h18" />
            <path d="M18.7 8 12 14.7 8.7 11.4 3 17" />
          </svg>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary-light">
            Growth Monitor
          </span>
        </div>
        <div className="flex items-baseline gap-1">
          <span className="font-display font-bold text-sm tabular-nums text-white">
            {String(count).padStart(2, '0')}
          </span>
          <span className="font-mono text-[9px] uppercase tracking-widest text-white/40">
            leads
          </span>
        </div>
      </div>

      {/* Server rack / chip bar */}
      <svg className="absolute left-3 right-3 top-9 h-5" viewBox="0 0 400 20" preserveAspectRatio="none">
        <rect x="0" y="4" width="400" height="12" rx="4" fill="#5850EC" fillOpacity="0.12" />
        <rect x="0" y="5" width="400" height="2" fill="#818CF8" fillOpacity="0.25" />
        {[30, 80, 140, 200, 260, 320, 370].map((x) => (
          <g key={x}>
            <circle cx={x} cy="10" r="3" fill="#5850EC" fillOpacity="0.5" />
            <circle cx={x} cy="10" r="1.5" fill="#818CF8" fillOpacity="0.9" />
          </g>
        ))}
        <rect x="0" y="3" width="8" height="14" rx="2" fill="#4338CA" fillOpacity="0.5" />
        <rect x="392" y="3" width="8" height="14" rx="2" fill="#4338CA" fillOpacity="0.5" />
      </svg>

      {/* Data packet field */}
      <div className="absolute inset-x-0 top-14 bottom-11 overflow-hidden">
        {packets.map((p, i) => (
          <svg
            key={i}
            className="absolute top-0"
            style={{
              left: p.left,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animation: `rain-fall ${p.dur} cubic-bezier(0.55,0.05,0.7,0.45) ${p.delay} infinite`,
              filter: 'drop-shadow(0 0 5px rgba(124,92,252,0.8))',
              transform: 'translateX(-50%)',
            }}
            viewBox="0 0 24 24"
          >
            <defs>
              <linearGradient id={`pkt-${i}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#818CF8" />
                <stop offset="55%" stopColor="#5850EC" />
                <stop offset="100%" stopColor="#14B8A6" />
              </linearGradient>
            </defs>
            <circle cx="12" cy="12" r="10" fill={`url(#pkt-${i})`} />
            <circle cx="9" cy="9" r="3.5" fill="white" fillOpacity="0.35" />
          </svg>
        ))}
      </div>

      {/* Circuit trace surface */}
      <svg className="absolute bottom-9 left-3 right-3 h-3" viewBox="0 0 200 12" preserveAspectRatio="none">
        <line x1="0" y1="6" x2="200" y2="6" stroke="#5850EC" strokeOpacity="0.35" strokeWidth="0.8" strokeDasharray="5 4" />
        <line x1="0" y1="9" x2="200" y2="9" stroke="#14B8A6" strokeOpacity="0.15" strokeWidth="0.6" />
      </svg>

      {/* Ripples */}
      <div className="absolute bottom-[34px] left-3 right-3 h-2">
        {ripples.map((r, i) => (
          <span
            key={i}
            className="absolute top-0 -translate-x-1/2 rounded-full border border-primary/50"
            style={{
              left: r.left,
              width: '4px',
              height: '4px',
              animation: `rain-ripple 2.4s ease-out ${r.delay} infinite`,
            }}
          />
        ))}
      </div>

      {/* Status bar */}
      <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between z-20">
        <div className="flex items-center gap-2 min-w-0">
          <span className={`relative h-2 w-2 rounded-full flex-shrink-0 ${dotColor}`}>
            {status.tone === 'accent' && (
              <span className={`absolute inset-0 rounded-full ${dotColor} animate-ping`} />
            )}
          </span>
          <span
            key={status.text}
            className={`font-mono text-[10px] truncate ${textColor}`}
            style={{ animation: 'rain-fadein 0.35s ease-out' }}
          >
            {status.text}
          </span>
        </div>
        <span className={`font-mono text-[9px] uppercase tracking-[0.2em] whitespace-nowrap pl-2 ${textColor}`}>
          {status.label}
        </span>
      </div>

      <style>{`
        @keyframes rain-fall {
          0%   { transform: translate(-50%, -10px); opacity: 0; }
          12%  { opacity: 1; }
          82%  { opacity: 1; }
          100% { transform: translate(-50%, 95px); opacity: 0; }
        }
        @keyframes rain-ripple {
          0%   { transform: translateX(-50%) scale(0.4); opacity: 0.9; }
          80%  { transform: translateX(-50%) scale(3.5); opacity: 0; }
          100% { transform: translateX(-50%) scale(3.5); opacity: 0; }
        }
        @keyframes rain-fadein {
          from { opacity: 0; transform: translateY(2px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}

/* ----------------------------------------------------------------
   Feature Card 3 — Discovery Call Scheduler
---------------------------------------------------------------- */
function BookingScheduler() {
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
  const [step, setStep] = useState(0)
  const activeDay = 2

  useEffect(() => {
    const interval = setInterval(() => setStep((prev) => (prev + 1) % 5), 1400)
    return () => clearInterval(interval)
  }, [])

  const cursorPos = (() => {
    switch (step) {
      case 0: return { x: 8, y: 110, opacity: 0 }
      case 1: return { x: 60, y: 60, opacity: 1 }
      case 2: return { x: 60 + activeDay * 36, y: 60, opacity: 1 }
      case 3: return { x: 60 + activeDay * 36, y: 60, opacity: 1 }
      case 4: return { x: 130, y: 130, opacity: 1 }
      default: return { x: 8, y: 110, opacity: 0 }
    }
  })()

  return (
    <div className="relative h-44 w-full bg-surface border border-divider rounded-3xl p-5 overflow-hidden">
      <div className="flex items-center justify-between mb-3">
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted">
          Week 24 · June
        </span>
        <span className="font-mono text-[10px] uppercase tracking-widest text-primary bg-primary/15 px-2 py-0.5 rounded-full">
          Discovery Call
        </span>
      </div>

      <div className="grid grid-cols-7 gap-2 mb-4">
        {days.map((d, idx) => (
          <div
            key={idx}
            className={`flex flex-col items-center justify-center h-9 rounded-xl text-xs font-medium transition-all duration-300 ${
              step >= 3 && idx === activeDay
                ? 'bg-primary text-white scale-110 shadow-lg shadow-primary/40'
                : 'bg-background text-ink'
            }`}
          >
            <span className="font-mono text-[9px] text-muted">{d}</span>
            <span className="font-display font-semibold text-sm">{idx + 10}</span>
          </div>
        ))}
      </div>

      <button
        className={`w-full py-2.5 rounded-2xl font-medium text-xs transition-all duration-300 ${
          step === 4
            ? 'bg-accent text-deep scale-[1.02] shadow-md shadow-accent/30'
            : 'bg-divider/60 text-muted'
        }`}
      >
        {step >= 3 ? '✓ Call confirmed' : 'Select a time'}
      </button>

      <div
        className="absolute pointer-events-none transition-all duration-500 ease-out"
        style={{
          left: `${cursorPos.x}px`,
          top: `${cursorPos.y}px`,
          opacity: cursorPos.opacity,
          transform: step === 3 ? 'scale(0.85)' : 'scale(1)',
        }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path d="M5 3L19 12L12 13L9 20L5 3Z" fill="#F5F5F7" stroke="#5850EC" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  )
}

/* ----------------------------------------------------------------
   Features Section
---------------------------------------------------------------- */
function Features() {
  const [ref, visible] = useInView(0.1)

  const cards = [
    {
      eyebrow: '01 / Build',
      heading: 'Live in Days',
      sub: 'Not months',
      text: 'Most agencies take 8-12 weeks to launch a website. We use AI-accelerated design and build workflows to ship a full site in days — without cutting corners.',
      Component: AutomationShuffler,
    },
    {
      eyebrow: '02 / Grow',
      heading: 'Marketing That Compounds',
      sub: 'SEO + Ads + Content',
      text: 'Once your site is live, we run the growth engine — search rankings, paid campaigns, and content that keeps working long after launch day.',
      Component: AIDataFlow,
    },
    {
      eyebrow: '03 / Convert',
      heading: 'Book More Calls',
      sub: 'Zero back-and-forth',
      text: 'A smart booking flow turns interested visitors into booked consultations — prospects pick a time, land on your calendar, no phone tag.',
      Component: BookingScheduler,
    },
  ]

  return (
    <section id="services" ref={ref} className="relative py-16 sm:py-24 px-6 sm:px-10 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className={`feature-heading max-w-3xl mb-10 sm:mb-14 transition-all duration-1000 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary">
            ╱ What we do
          </span>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-ink mt-4 leading-[1.05] tracking-tight">
            From blank page
            <span className="block font-serif italic font-medium text-primary mt-1">
              to booked calendar.
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {cards.map((card, idx) => (
            <article
              key={idx}
              style={{ transitionDelay: visible ? `${idx * 150}ms` : '0ms' }}
              className={`feature-card group relative bg-surface border border-divider rounded-5xl p-7 hover:border-primary/40 transition-all duration-700 ease-out shadow-sm hover:shadow-xl hover:shadow-primary/10 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <div className="flex items-center justify-between mb-6">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                  {card.eyebrow}
                </span>
                <ArrowUpRight
                  className="h-5 w-5 text-ink/20 group-hover:text-primary group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all"
                  strokeWidth={1.8}
                />
              </div>

              <card.Component />

              <div className="mt-6">
                <h3 className="font-display font-bold text-2xl text-ink leading-tight">{card.heading}</h3>
                <p className="font-serif italic text-primary-light text-sm mt-1">{card.sub}</p>
                <p className="text-muted text-[15px] mt-4 leading-relaxed">{card.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------
   CountUp
---------------------------------------------------------------- */
function CountUp({ target, duration = 1800 }) {
  const [count, setCount] = useState(0)
  const elemRef = useRef(null)
  const startedRef = useRef(false)

  useEffect(() => {
    const el = elemRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !startedRef.current) {
            startedRef.current = true
            const startTime = performance.now()
            const animate = (now) => {
              const elapsed = now - startTime
              const progress = Math.min(elapsed / duration, 1)
              const eased = 1 - Math.pow(1 - progress, 3)
              setCount(Math.floor(target * eased))
              if (progress < 1) requestAnimationFrame(animate)
              else setCount(target)
            }
            requestAnimationFrame(animate)
          }
        })
      },
      { threshold: 0.35 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [target, duration])

  return <span ref={elemRef}>{count}</span>
}

/* ----------------------------------------------------------------
   Pillars
---------------------------------------------------------------- */
function Pillars() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect() } },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const pillars = [
    {
      n: '01', title: 'Speed',
      target: 7, suffix: 'd',
      label: 'from kickoff to launch',
      desc: 'AI-accelerated design and build workflows get your new site live in about a week — not the 8-12 week industry standard.',
    },
    {
      n: '02', title: 'Performance',
      target: 95, suffix: '+',
      label: 'average Lighthouse score',
      desc: 'Every site we ship is fast, accessible, and built to Google\'s Core Web Vitals — because a slow site is a leaky funnel.',
    },
    {
      n: '03', title: 'One Team',
      target: 3, suffix: '-in-1',
      label: 'design, build & marketing',
      desc: 'Skip the handoffs. The same team that designs and builds your site also runs the SEO, ads, and content that grow it.',
    },
  ]

  return (
    <section id="results" ref={ref} className="relative py-16 sm:py-24 px-6 sm:px-10 lg:px-16 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-64 w-[44rem] rounded-full bg-primary/12 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-accent/6 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        <div
          className={`flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-10 sm:mb-14 transition-all duration-1000 ease-out ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <div className="max-w-2xl">
            <span className="inline-block font-mono text-xs uppercase tracking-[0.3em] text-primary mb-5">
              ╱ What you get
            </span>
            <h2 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-ink leading-[1.05] tracking-tight">
              Commitments,
              <span className="block font-serif italic font-medium text-primary">not vanity metrics.</span>
            </h2>
          </div>
          <p className="text-muted text-lg leading-relaxed max-w-md lg:text-right">
            Three things that define how On The Edge works — not marketing fluff, just what you can expect.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-divider rounded-5xl overflow-hidden border border-divider shadow-xl shadow-black/30">
          {pillars.map((p, i) => (
            <article
              key={i}
              style={{ transitionDelay: visible ? `${i * 150}ms` : '0ms' }}
              className={`relative bg-surface p-7 sm:p-9 group overflow-hidden transition-all duration-1000 ease-out ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <div className="flex items-center justify-between mb-10">
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
                  {p.n} / {p.title}
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-primary/40 group-hover:bg-primary group-hover:scale-150 transition-all duration-500" />
              </div>

              <div className="flex items-end gap-1 leading-none">
                <span className="font-display font-extrabold text-[6rem] sm:text-[8rem] md:text-[9rem] leading-[0.85] text-ink tabular-nums tracking-tight">
                  <CountUp target={p.target} duration={1800 + i * 200} />
                </span>
                <span className="font-serif italic font-medium text-4xl sm:text-5xl md:text-6xl text-primary mb-3 sm:mb-4">
                  {p.suffix}
                </span>
              </div>

              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary mt-5">
                {p.label}
              </p>

              <p className="text-muted text-[15px] mt-6 leading-relaxed max-w-xs">{p.desc}</p>

              <div className="absolute bottom-0 left-9 right-9 sm:left-12 sm:right-12 h-px bg-divider overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-transparent via-primary to-transparent"
                  style={{ animation: `pillar-sweep 4s ease-in-out ${i * 0.4}s infinite` }}
                />
              </div>
            </article>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes pillar-sweep {
          0%   { transform: translateX(-100%); }
          50%  { transform: translateX(100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </section>
  )
}

/* ----------------------------------------------------------------
   Protocol — Sticky Stack
---------------------------------------------------------------- */
function Protocol() {
  const containerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.protocol-card')
      cards.forEach((card, i) => {
        if (i === cards.length - 1) return
        gsap.to(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top top+=100',
            endTrigger: cards[cards.length - 1],
            end: 'top top+=120',
            scrub: 1,
          },
          scale: 0.92,
          filter: 'blur(6px) saturate(0.6)',
          opacity: 0.45,
          ease: 'none',
        })
      })
    }, containerRef)
    return () => ctx.revert()
  }, [])

  const steps = [
    {
      num: '01',
      title: 'Discovery & Strategy',
      tagline: 'We learn your business.',
      text: 'We start with a deep-dive into your business, your customers, and your competitors — then map the exact site structure and marketing plan that will move the needle for you specifically. No generic templates.',
      image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1200&q=80',
      alt: 'Strategy session',
      meta: 'Step 1 / Discover',
    },
    {
      num: '02',
      title: 'Design & Build',
      tagline: 'We ship it fast.',
      text: 'We design a custom site around your brand and build it using modern tools — React, Shopify, or whatever fits your business — with AI-powered features layered in where they add real value. Most clients are live within 7 days.',
      image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1200&q=80',
      alt: 'Designing and building the site',
      meta: 'Step 2 / Build',
    },
    {
      num: '03',
      title: 'Launch & Grow',
      tagline: 'We don\'t disappear.',
      text: 'Once live, we run your SEO, ads, and content — tracking what\'s working and tuning the system over time. You get a plain-English monthly report showing exactly what moved and why.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
      alt: 'Business growth',
      meta: 'Step 3 / Grow',
    },
  ]

  return (
    <section id="process" ref={containerRef} className="relative px-4 sm:px-6 py-12">
      <div className="max-w-7xl mx-auto mb-10 px-2 sm:px-6">
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary">
          ╱ How we work
        </span>
        <h2 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-ink mt-4 leading-[1.05] tracking-tight max-w-3xl">
          Three steps.
          <span className="block font-serif italic font-medium text-primary">
            No surprises.
          </span>
        </h2>
      </div>

      <div className="space-y-8">
        {steps.map((step, idx) => (
          <article
            key={idx}
            className="protocol-card sticky top-24 sm:top-28 mx-auto max-w-6xl bg-surface border border-divider rounded-6xl overflow-hidden shadow-2xl shadow-black/40"
          >
            <div className="grid lg:grid-cols-5 gap-0 min-h-[45vh] lg:min-h-[52vh]">
              <div className="lg:col-span-3 p-6 sm:p-8 lg:p-12 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs uppercase tracking-[0.25em] text-muted">
                    {step.meta}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-primary bg-primary/15 px-2.5 py-1 rounded-full">
                    Edge Protocol
                  </span>
                </div>

                <div className="my-6">
                  <span className="font-display font-extrabold text-[7rem] sm:text-[10rem] leading-none text-primary/10 -mb-4 block">
                    {step.num}
                  </span>
                  <h3 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl text-ink leading-[1.02] tracking-tight">
                    {step.title}
                  </h3>
                  <p className="font-serif italic text-primary text-2xl sm:text-3xl mt-3">
                    {step.tagline}
                  </p>
                </div>

                <p className="text-muted text-base sm:text-lg leading-relaxed max-w-lg">{step.text}</p>
              </div>

              <div className="lg:col-span-2 relative overflow-hidden min-h-[300px] lg:min-h-full bg-deep">
                <img
                  src={step.image}
                  alt={step.alt}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover brightness-[0.6]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deep/70 via-transparent to-deep/20" />
                <div className="absolute top-5 left-5 flex items-center gap-2 bg-surface/90 backdrop-blur-sm rounded-full pl-3 pr-4 py-1.5 shadow-lg border border-divider">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  <span className="font-mono text-[10px] uppercase tracking-widest text-ink">
                    Step {step.num}
                  </span>
                </div>
                <div className="absolute bottom-4 right-4 font-mono text-[10px] uppercase tracking-widest text-white/50">
                  {step.num} / On The Edge
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------
   Services Grid
---------------------------------------------------------------- */
function ServicesGrid() {
  const [ref, visible] = useInView(0.1)

  return (
    <section ref={ref} className="relative py-14 px-6 sm:px-10 lg:px-16 bg-deep text-white overflow-hidden rounded-t-6xl">
      <div className="absolute inset-0 grid-bg opacity-25" />
      <div className="absolute -top-20 -right-20 h-96 w-96 rounded-full bg-primary/15 blur-3xl" />
      <div className="absolute bottom-0 -left-20 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />

      <div className="relative max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-8">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary">╱ Everything we do</span>
            <h2 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl mt-4 leading-[1.05] tracking-tight">
              The full stack,
              <span className="block font-serif italic font-medium text-primary">
                under one roof.
              </span>
            </h2>
          </div>
          <p className="text-white/50 max-w-md text-base leading-relaxed">
            Website design, development, and the ongoing marketing to grow it — every service built around one goal: more customers, less manual effort.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/8 rounded-4xl overflow-hidden">
          {SERVICES_FULL.map((svc, i) => {
            const Icon = svc.icon
            return (
              <div
                key={i}
                style={{ transitionDelay: visible ? `${i * 70}ms` : '0ms' }}
                className={`svc-tile group bg-deep p-7 sm:p-8 hover:bg-white/[0.02] transition-all duration-700 ease-out relative ${
                  visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="h-12 w-12 rounded-2xl bg-primary/15 border border-primary/25 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-500">
                    <Icon className="h-5 w-5 text-primary group-hover:text-white" strokeWidth={2} />
                  </div>
                  <span className="font-mono text-[10px] text-white/25 uppercase tracking-widest">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="font-display font-bold text-lg sm:text-xl mb-3">{svc.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{svc.text}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------
   Pain Points
---------------------------------------------------------------- */
function PainPoints() {
  const [ref, visible] = useInView(0.12)

  const pains = [
    {
      Icon: Globe,
      title: 'Your website is costing you customers',
      text: 'A slow, outdated, or DIY-built site is the #1 reason visitors leave without buying. First impressions happen in under a second.',
    },
    {
      Icon: Search,
      title: 'You\'re invisible on Google',
      text: 'If you\'re not ranking, you don\'t exist. Most small businesses have zero SEO strategy — competitors are capturing searches that should be yours.',
    },
    {
      Icon: TrendingDown,
      title: 'Marketing feels like guesswork',
      text: 'Boosting a post here, running an ad there — with no strategy or tracking, you have no real idea what\'s actually driving customers.',
    },
    {
      Icon: Users,
      title: 'You can\'t afford an in-house team',
      text: 'A designer, a marketer, and a developer would cost well into six figures a year. On The Edge gives you all three for a fraction of that.',
    },
  ]

  return (
    <section ref={ref} className="relative py-14 sm:py-20 px-6 sm:px-10 lg:px-16 bg-background overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary">╱ The problem</span>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-ink mt-4 leading-[1.05] tracking-tight">
            Sound familiar?
            <span className="block font-serif italic font-medium text-primary mt-1">You're not alone.</span>
          </h2>
          <p className="text-muted text-lg mt-6 max-w-xl mx-auto leading-relaxed">
            Every small business owner we've ever spoken to has the same four problems.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {pains.map(({ Icon, title, text }, i) => (
            <div
              key={i}
              style={{ transitionDelay: visible ? `${i * 120}ms` : '0ms' }}
              className={`pain-card group relative bg-surface border border-divider rounded-4xl p-7 sm:p-9 hover:border-primary/40 transition-all duration-700 ease-out shadow-sm hover:shadow-xl hover:shadow-primary/10 overflow-hidden ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-9'
              }`}
            >
              <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-primary/5 group-hover:bg-primary/10 transition-all duration-700" />
              <div className="flex items-start gap-5 relative">
                <div className="h-12 w-12 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/15 group-hover:border-primary/30 transition-all duration-500">
                  <Icon className="h-5 w-5 text-red-400 group-hover:text-primary transition-colors duration-500" strokeWidth={2} />
                </div>
                <div>
                  <h3 className="font-display font-bold text-xl text-ink mb-2">{title}</h3>
                  <p className="text-muted text-[15px] leading-relaxed">{text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-muted text-base mb-5">We fix all four — website live in days, marketing running within weeks.</p>
          <a href="#process" className="magnetic-btn inline-flex items-center gap-2 bg-primary text-white font-semibold px-7 py-3.5 rounded-full shadow-xl shadow-primary/30">
            See How It Works
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------
   Who We Help
---------------------------------------------------------------- */
function WhoWeHelp() {
  const [ref, visible] = useInView(0.1)

  const industries = [
    { Icon: Wrench, label: 'HVAC', color: 'from-orange-500/20 to-orange-500/5', border: 'border-orange-500/20', text: 'text-orange-400' },
    { Icon: Wrench, label: 'Plumbing', color: 'from-blue-500/20 to-blue-500/5', border: 'border-blue-500/20', text: 'text-blue-400' },
    { Icon: Home, label: 'Roofing', color: 'from-amber-500/20 to-amber-500/5', border: 'border-amber-500/20', text: 'text-amber-400' },
    { Icon: ShoppingBag, label: 'Retail & eCommerce', color: 'from-fuchsia-500/20 to-fuchsia-500/5', border: 'border-fuchsia-500/20', text: 'text-fuchsia-400' },
    { Icon: Home, label: 'Landscaping', color: 'from-green-500/20 to-green-500/5', border: 'border-green-500/20', text: 'text-green-400' },
    { Icon: Heart, label: 'Dental', color: 'from-pink-500/20 to-pink-500/5', border: 'border-pink-500/20', text: 'text-pink-400' },
    { Icon: Building2, label: 'Real Estate', color: 'from-purple-500/20 to-purple-500/5', border: 'border-purple-500/20', text: 'text-purple-400' },
    { Icon: Car, label: 'Auto Repair', color: 'from-slate-500/20 to-slate-500/5', border: 'border-slate-500/20', text: 'text-slate-400' },
    { Icon: Scissors, label: 'Salons & Spas', color: 'from-rose-500/20 to-rose-500/5', border: 'border-rose-500/20', text: 'text-rose-400' },
    { Icon: Coffee, label: 'Cafés & Restaurants', color: 'from-orange-500/20 to-orange-500/5', border: 'border-orange-500/20', text: 'text-orange-400' },
    { Icon: Heart, label: 'Chiropractic', color: 'from-teal-500/20 to-teal-500/5', border: 'border-teal-500/20', text: 'text-teal-400' },
    { Icon: Building2, label: 'Law Firms', color: 'from-indigo-500/20 to-indigo-500/5', border: 'border-indigo-500/20', text: 'text-indigo-400' },
  ]

  return (
    <section ref={ref} className="relative py-14 sm:py-20 px-6 sm:px-10 lg:px-16 bg-deep overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-25" />
      <div className="absolute -top-20 right-0 h-80 w-80 rounded-full blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(79,70,229,0.15) 0%, transparent 70%)' }} />
      <div className="max-w-7xl mx-auto relative">
        <div className="flex flex-col lg:flex-row lg:items-end gap-8 mb-10">
          <div className="flex-1">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary">╱ Who we help</span>
            <h2 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-white mt-4 leading-[1.05] tracking-tight">
              If you sell to local customers,
              <span className="block font-serif italic font-medium text-primary">we can grow you.</span>
            </h2>
          </div>
          <p className="text-white/50 max-w-sm text-base leading-relaxed lg:text-right">
            From service businesses to local retail and eCommerce — we build for businesses that live and die by their online presence.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {industries.map(({ Icon, label, color, border, text }, i) => (
            <div
              key={i}
              style={{ transitionDelay: visible ? `${i * 40}ms` : '0ms' }}
              className={`industry-chip group relative bg-gradient-to-br ${color} border ${border} rounded-3xl p-5 sm:p-6 hover:scale-[1.03] transition-all duration-500 cursor-default ${
                visible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
              }`}
            >
              <Icon className={`h-6 w-6 ${text} mb-3`} strokeWidth={1.8} />
              <p className="font-display font-semibold text-white text-base leading-tight">{label}</p>
              <div className="absolute top-3 right-3">
                <CheckCircle2 className={`h-4 w-4 ${text} opacity-60`} strokeWidth={2} />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 p-6 rounded-4xl bg-white/[0.04] border border-white/8 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8">
          <div className="flex items-center gap-3">
            <span className="relative flex h-3 w-3">
              <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping" />
              <span className="relative h-3 w-3 rounded-full bg-emerald-400" />
            </span>
            <span className="font-mono text-xs uppercase tracking-widest text-emerald-400">Don't see your industry?</span>
          </div>
          <p className="text-white/50 text-sm flex-1">
            If you run a local business and customers find you or buy from you online, we can almost certainly help.
            <a href="#contact" className="text-primary hover:text-primary-light transition ml-1 font-medium">Let's talk →</a>
          </p>
        </div>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------
   Portfolio — Selected Work
---------------------------------------------------------------- */
function Portfolio() {
  const [ref, visible] = useInView(0.1)
  const reveal = (i) => ({
    style: { transitionDelay: visible ? `${i * 150}ms` : '0ms' },
    className: `transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`,
  })

  return (
    <section id="work" ref={ref} className="relative py-14 sm:py-20 px-6 sm:px-10 lg:px-16 bg-background overflow-hidden">
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 h-64 w-[44rem] rounded-full bg-primary/8 blur-3xl pointer-events-none" />
      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-10">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary">╱ Selected work</span>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-ink mt-4 leading-[1.05] tracking-tight">
            Real sites.
            <span className="block font-serif italic font-medium text-primary mt-1">Real businesses.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Flower Hunt — wide card, two screenshots */}
          <article
            style={reveal(0).style}
            className={`work-card lg:col-span-2 relative bg-surface border border-divider rounded-5xl p-6 sm:p-8 hover:border-primary/40 shadow-sm hover:shadow-xl hover:shadow-primary/10 ${reveal(0).className}`}
          >
            <div className="flex items-start justify-between mb-5">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-primary mb-1">Website Design · Custom Build</p>
                <h3 className="font-display font-bold text-2xl text-ink">Petal &amp; Co. — Melbourne Florist</h3>
              </div>
              <span className="hidden sm:flex h-10 w-10 rounded-full bg-primary/10 items-center justify-center flex-shrink-0">
                <ArrowUpRight className="h-4 w-4 text-primary" />
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-5">
              <BrowserFrame src="/portfolio/flower-hunt-home.jpg" alt="Petal & Co. homepage" label="petalandco.com.au" />
              <BrowserFrame src="/portfolio/flower-hunt-shop.jpg" alt="Petal & Co. shop page" label="petalandco.com.au/shop" />
            </div>
            <p className="text-muted text-[15px] leading-relaxed mb-4">
              A full rebrand and rebuild for a Melbourne florist — same-day delivery messaging, verified reviews, and a shop experience designed to convert browsers into orders.
            </p>
            <div className="flex flex-wrap gap-2">
              {['Custom Design', 'React + Vite', 'Stripe Checkout', 'Local SEO'].map((tag) => (
                <span key={tag} className="font-mono text-[10px] uppercase tracking-widest text-primary bg-primary/10 border border-primary/20 px-2.5 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </article>

          {/* Gen Retro Games — Shopify build */}
          <article
            style={reveal(1).style}
            className={`work-card relative bg-deep border border-white/10 rounded-5xl p-6 sm:p-8 overflow-hidden hover:border-primary/40 shadow-sm hover:shadow-xl hover:shadow-primary/10 flex flex-col ${reveal(1).className}`}
          >
            <div className="absolute -top-16 -right-16 h-48 w-48 rounded-full bg-primary/20 blur-3xl pointer-events-none" />
            <div className="relative flex items-start justify-between mb-5">
              <p className="font-mono text-[10px] uppercase tracking-widest text-accent">eCommerce · Shopify</p>
              <a
                href="https://genretrogames.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 rounded-full bg-white/10 items-center justify-center flex-shrink-0 hover:bg-primary transition-colors"
                aria-label="Visit Gen Retro Games"
              >
                <ExternalLink className="h-4 w-4 text-white" />
              </a>
            </div>
            <div className="relative flex-1 rounded-2xl border border-white/10 bg-white/5 overflow-hidden mb-5">
              <img
                src="/portfolio/genretro-console.jpg"
                alt="Product photography from the Gen Retro Games Shopify store"
                loading="lazy"
                className="w-full h-40 object-cover object-center"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-deep/90 to-transparent px-3 pt-6 pb-2.5">
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/60">genretrogames.com</span>
              </div>
            </div>
            <h3 className="relative font-display font-bold text-xl text-white mb-2">Gen Retro Games</h3>
            <p className="relative text-white/50 text-sm leading-relaxed mb-4">
              A full Shopify storefront for a retro gaming retailer — product catalog, AUD checkout, and collection pages built to merchandise and convert.
            </p>
            <div className="relative flex flex-wrap gap-2">
              {['Shopify Advanced', 'AUD Storefront', 'eCommerce'].map((tag) => (
                <span key={tag} className="font-mono text-[10px] uppercase tracking-widest text-white/60 bg-white/8 border border-white/15 px-2.5 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </article>

          {/* CTA card */}
          <article
            style={reveal(2).style}
            className={`work-card lg:col-span-3 relative bg-surface border-2 border-dashed border-divider rounded-5xl p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left ${reveal(2).className}`}
          >
            <div className="flex items-center gap-5">
              <span className="hidden sm:flex h-14 w-14 rounded-2xl bg-primary/10 items-center justify-center flex-shrink-0">
                <Rocket className="h-6 w-6 text-primary" />
              </span>
              <div>
                <h3 className="font-display font-bold text-2xl text-ink">Want to be our next case study?</h3>
                <p className="text-muted text-[15px] mt-1">Let's build something you're proud to show off.</p>
              </div>
            </div>
            <a href="#contact" className="magnetic-btn flex-shrink-0 inline-flex items-center gap-2 bg-primary text-white font-semibold px-7 py-3.5 rounded-full shadow-lg shadow-primary/30">
              Start Your Project
              <ArrowRight className="h-4 w-4" />
            </a>
          </article>
        </div>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------
   Trust Signals
---------------------------------------------------------------- */
function TrustSignals() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect() } },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const badges = [
    {
      Icon: ShieldCheck,
      title: 'Small Business Specialists',
      text: 'We only work with small and local businesses — service, retail, and eCommerce. We know your budget and your customers because we work with them every day.',
    },
    {
      Icon: Sparkles,
      title: 'AI-Accelerated Builds',
      text: 'We use modern AI-assisted workflows to design and build faster than traditional agencies — without the traditional agency price tag.',
    },
    {
      Icon: Zap,
      title: 'Live in About a Week',
      text: 'No months-long projects, no bloated retainers. Most sites are designed, built, and live within about 7 days of kickoff.',
    },
  ]

  return (
    <section ref={ref} className="relative py-10 sm:py-14 px-6 bg-deep">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-6">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary">
            ╱ Why On The Edge
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-white mt-3 tracking-tight">
            Built for businesses like yours.
          </h2>
          <p className="text-white/55 text-base mt-3 max-w-md mx-auto">
            Not a template marketplace. Not a 6-month agency retainer. Real websites and real marketing, built around how your business actually works.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          {badges.map(({ Icon, title, text }, i) => (
            <div
              key={i}
              style={{ transitionDelay: visible ? `${i * 120}ms` : '0ms' }}
              className={`bg-surface border border-divider rounded-4xl p-6 hover:border-primary/40 transition-all duration-700 ease-out ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              <Icon className="h-6 w-6 text-primary mb-3" strokeWidth={1.8} />
              <h3 className="font-display font-bold text-lg text-ink mb-1.5">{title}</h3>
              <p className="text-muted text-sm leading-relaxed">{text}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <a
            href="#contact"
            className="magnetic-btn inline-flex items-center gap-2 bg-primary text-white font-semibold px-7 py-3.5 rounded-full shadow-xl shadow-primary/30"
          >
            Get a Free Audit
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------
   Packages
---------------------------------------------------------------- */
function Packages() {
  const [ref, visible] = useInView(0.1)

  const tiers = [
    {
      Icon: Rocket,
      name: 'Launch',
      tagline: 'For businesses that just need a great site.',
      features: [
        'Custom-designed website (up to 5 pages)',
        'Mobile & speed optimised',
        'Contact & booking forms',
        'Basic on-page SEO',
        'Live in about 7 days',
      ],
      highlight: false,
    },
    {
      Icon: TrendingUp,
      name: 'Grow',
      tagline: 'Website plus the marketing to fill it.',
      features: [
        'Everything in Launch',
        'eCommerce or booking system',
        'Monthly SEO & content',
        'Google Business optimisation',
        'Monthly performance report',
      ],
      highlight: true,
    },
    {
      Icon: Sparkles,
      name: 'Scale',
      tagline: 'The full growth engine.',
      features: [
        'Everything in Grow',
        'Paid ads management (Google & Meta)',
        'Email & SMS marketing flows',
        'AI-powered site features',
        'Dedicated monthly strategy call',
      ],
      highlight: false,
    },
  ]

  return (
    <section id="pricing" ref={ref} className="relative py-14 sm:py-20 px-6 sm:px-10 lg:px-16 bg-background overflow-hidden">
      <div className="absolute -top-20 right-0 h-72 w-72 rounded-full bg-accent/8 blur-3xl pointer-events-none" />
      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-10">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary">╱ Packages</span>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-ink mt-4 leading-[1.05] tracking-tight">
            Pick your
            <span className="block font-serif italic font-medium text-primary mt-1">starting point.</span>
          </h2>
          <p className="text-muted text-lg mt-6 max-w-xl mx-auto leading-relaxed">
            Every project is scoped to your business — here's roughly where most clients land. Get a quote in 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {tiers.map((tier, i) => (
            <article
              key={i}
              style={{ transitionDelay: visible ? `${i * 130}ms` : '0ms' }}
              className={`package-card relative rounded-5xl p-7 sm:p-9 flex flex-col transition-all duration-700 ease-out ${visible ? 'opacity-100' : 'opacity-0'} ${
                tier.highlight
                  ? 'bg-deep text-white border-2 border-warm shadow-2xl shadow-warm/20 lg:-translate-y-3'
                  : 'bg-surface border border-divider text-ink hover:border-primary/40 shadow-sm hover:shadow-xl hover:shadow-primary/10'
              }`}
            >
              {tier.highlight && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-widest bg-warm text-white px-3.5 py-1.5 rounded-full shadow-lg shadow-warm/40">
                  Most Popular
                </span>
              )}

              <div className={`h-12 w-12 rounded-2xl flex items-center justify-center mb-6 ${
                tier.highlight ? 'bg-warm/20 border border-warm/30' : 'bg-primary/10 border border-primary/20'
              }`}>
                <tier.Icon className={`h-5 w-5 ${tier.highlight ? 'text-warm' : 'text-primary'}`} strokeWidth={2} />
              </div>

              <h3 className="font-display font-bold text-2xl mb-1.5">{tier.name}</h3>
              <p className={`text-sm mb-6 ${tier.highlight ? 'text-white/55' : 'text-muted'}`}>{tier.tagline}</p>

              <ul className="space-y-3 mb-8 flex-1">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <CheckCircle2 className={`h-4 w-4 mt-0.5 flex-shrink-0 ${tier.highlight ? 'text-warm' : 'text-primary'}`} strokeWidth={2} />
                    <span className={`text-sm leading-relaxed ${tier.highlight ? 'text-white/80' : 'text-ink/80'}`}>{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className={`magnetic-btn inline-flex items-center justify-center gap-2 font-semibold px-6 py-3.5 rounded-full ${
                  tier.highlight ? 'bg-warm text-white shadow-lg shadow-warm/30' : 'bg-primary/10 text-primary border border-primary/25 hover:bg-primary hover:text-white'
                }`}
              >
                Get a Quote
                <ArrowRight className="h-4 w-4" />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------
   Field helper
---------------------------------------------------------------- */
function Field({ label, type = 'text', required, value, onChange, placeholder }) {
  return (
    <div>
      <label className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted mb-2 block">
        {label} {required && '*'}
      </label>
      <input
        type={type}
        required={required}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-background border border-divider rounded-2xl px-4 py-3.5 text-ink placeholder-muted/40 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition font-body"
      />
    </div>
  )
}

/* ----------------------------------------------------------------
   Contact Form
   Submits to Formspree (https://formspree.io/f/mgogwzrb) via the
   official @formspree/react hook — routes to ontheedgeai@ontheedgeau.com.
---------------------------------------------------------------- */
function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '', message: '' })
  const [files, setFiles] = useState([])
  const [formState, submitForm] = useForm('mgogwzrb')
  const dropRef = useRef(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return

    const data = new FormData()
    data.append('name', form.name)
    data.append('email', form.email)
    data.append('phone', form.phone)
    data.append('company', form.company)
    data.append('message', form.message)
    files.forEach((f) => data.append('attachments', f))

    await submitForm(data)
  }

  const handleFiles = (newFiles) => {
    setFiles((prev) => [...prev, ...Array.from(newFiles)].slice(0, 5))
  }

  return (
    <section id="contact" className="relative py-14 sm:py-20 px-6 sm:px-10 lg:px-16 bg-background">
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 h-64 w-[40rem] rounded-full bg-primary/8 blur-3xl pointer-events-none" />
      <div className="max-w-7xl mx-auto relative">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Left */}
          <div className="lg:col-span-5">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary">╱ Contact</span>
            <h2 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-ink mt-4 leading-[1.05] tracking-tight">
              Stop losing customers.
              <span className="block font-serif italic font-medium text-primary">Start today.</span>
            </h2>
            <p className="text-muted text-lg mt-6 leading-relaxed max-w-md">
              Tell us about your business and we'll map out exactly what your website and marketing need — free, no strings.
            </p>

            <div className="mt-10 space-y-4">
              <a href="mailto:ontheedgeai@ontheedgeau.com" className="lift-on-hover flex items-center gap-4 group">
                <span className="h-12 w-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary transition">
                  <Mail className="h-5 w-5 text-primary group-hover:text-white" />
                </span>
                <span>
                  <span className="block font-mono text-[10px] uppercase tracking-widest text-muted">Email us</span>
                  <span className="font-display font-semibold text-ink text-lg">ontheedgeai@ontheedgeau.com</span>
                </span>
              </a>
            </div>

            <div className="mt-10 p-5 rounded-3xl bg-primary/5 border border-primary/15">
              <p className="font-mono text-[10px] uppercase tracking-widest text-primary mb-2">
                Free Audit
              </p>
              <p className="text-sm text-muted leading-relaxed">
                Every new client starts with a free website &amp; marketing audit. We show you the gaps, you decide what to fix. No pressure.
              </p>
            </div>
          </div>

          {/* Right: form */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              className="bg-surface border border-divider rounded-5xl p-7 sm:p-10 shadow-xl shadow-black/30"
            >
              {!formState.succeeded ? (
                <>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <Field label="Full Name" required value={form.name} onChange={(v) => setForm({ ...form, name: v })} placeholder="Jane Smith" />
                    <Field label="Email Address" type="email" required value={form.email} onChange={(v) => setForm({ ...form, email: v })} placeholder="jane@business.com" />
                    <Field label="Phone Number" type="tel" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} placeholder="+61 4XX XXX XXX" />
                    <Field label="Business Name" value={form.company} onChange={(v) => setForm({ ...form, company: v })} placeholder="Acme Co." />
                  </div>

                  <div className="mt-5">
                    <label className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted mb-2 block">
                      Tell us about your business *
                    </label>
                    <textarea
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      required
                      rows={5}
                      placeholder="What does your business do? Do you need a new website, better marketing, or both?"
                      className="w-full bg-background border border-divider rounded-2xl px-4 py-3.5 text-ink placeholder-muted/40 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition resize-none font-body"
                    />
                  </div>

                  {/* File upload */}
                  <div
                    ref={dropRef}
                    onDragOver={(e) => { e.preventDefault(); dropRef.current?.classList.add('!border-primary', '!bg-primary/5') }}
                    onDragLeave={() => dropRef.current?.classList.remove('!border-primary', '!bg-primary/5')}
                    onDrop={(e) => { e.preventDefault(); dropRef.current?.classList.remove('!border-primary', '!bg-primary/5'); handleFiles(e.dataTransfer.files) }}
                    className="mt-5 border-2 border-dashed border-divider rounded-3xl p-6 text-center hover:border-primary/50 transition-colors cursor-pointer"
                  >
                    <input type="file" multiple id="file-up" className="hidden" onChange={(e) => handleFiles(e.target.files)} />
                    <label htmlFor="file-up" className="cursor-pointer block">
                      <Upload className="h-6 w-6 mx-auto text-primary mb-2" />
                      <p className="font-display font-semibold text-ink text-sm">Attach a logo, brand assets, or reference sites</p>
                      <p className="text-xs text-muted mt-1">Click or drag files here (max 5)</p>
                      {files.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-2 justify-center">
                          {files.map((f, i) => (
                            <span key={i} className="inline-flex items-center gap-1.5 bg-primary/10 text-primary text-xs px-3 py-1.5 rounded-full font-mono">
                              <CheckCircle2 className="h-3 w-3" />
                              {f.name.length > 22 ? f.name.slice(0, 22) + '…' : f.name}
                            </span>
                          ))}
                        </div>
                      )}
                    </label>
                  </div>

                  <ValidationError errors={formState.errors} className="mt-5 text-sm text-red-500 space-y-1" />
                  {formState.errors && formState.errors.getFormErrors?.().length > 0 && (
                    <p className="mt-2 text-xs text-muted">
                      Trouble sending? Email us directly at{' '}
                      <a href="mailto:ontheedgeai@ontheedgeau.com" className="underline">ontheedgeai@ontheedgeau.com</a>.
                    </p>
                  )}

                  <div className="mt-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <p className="text-xs text-muted">We respond within 24 hours. Fields marked * are required.</p>
                    <button
                      type="submit"
                      disabled={formState.submitting}
                      className="magnetic-btn inline-flex items-center gap-2 bg-primary text-white font-semibold px-7 py-3.5 rounded-full shadow-lg shadow-primary/30 disabled:opacity-50"
                    >
                      {formState.submitting ? 'Sending…' : 'Send Message'}
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-center py-12">
                  <div className="h-16 w-16 mx-auto rounded-full bg-primary/15 flex items-center justify-center mb-6">
                    <CheckCircle2 className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-display font-bold text-2xl text-ink mb-3">Message received</h3>
                  <p className="text-muted max-w-md mx-auto">
                    We'll be in touch within 24 hours with your free website &amp; marketing audit. Talk soon.
                  </p>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------
   Footer
---------------------------------------------------------------- */
function Footer() {
  return (
    <footer className="relative bg-deep text-white rounded-t-6xl mt-12 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-80 w-[50rem] rounded-full blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(79,70,229,0.18) 0%, transparent 70%)' }} />

      <div className="relative px-6 sm:px-10 lg:px-16 pt-12 pb-8 max-w-7xl mx-auto">
        {/* Big tagline */}
        <div className="border-b border-white/8 pb-8 mb-8">
          <h2 className="font-display font-extrabold text-5xl sm:text-7xl md:text-8xl leading-[0.92] tracking-tight">
            Websites Built.
            <span className="font-serif italic font-medium text-primary block">
              Growth Delivered.
            </span>
          </h2>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mt-8 gap-6">
            <p className="text-white/45 max-w-md">
              On The Edge — website design and marketing for small businesses. We build it, then we grow it. Live in days, not months.
            </p>
            <a
              href="#contact"
              className="magnetic-btn inline-flex items-center gap-2 bg-primary text-white font-semibold px-7 py-3.5 rounded-full self-start sm:self-auto"
            >
              Get a Free Audit
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <LogoMark size={36} />
              <span className="font-display font-bold text-lg">On The Edge</span>
            </div>
            <p className="text-white/45 text-sm leading-relaxed max-w-xs">
              Website design, development, and digital marketing for small and local businesses — website builds, eCommerce, SEO, paid ads, and AI-powered features.
            </p>
          </div>

          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary mb-4">Services</p>
            <ul className="space-y-2.5">
              {SERVICES_FULL.slice(0, 5).map((s, i) => (
                <li key={i}>
                  <a href="#services" className="text-white/55 hover:text-primary transition text-sm">{s.title}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary mb-4">Company</p>
            <ul className="space-y-2.5">
              <li><a href="#work" className="text-white/55 hover:text-primary transition text-sm">Our Work</a></li>
              <li><a href="#process" className="text-white/55 hover:text-primary transition text-sm">Process</a></li>
              <li><a href="#pricing" className="text-white/55 hover:text-primary transition text-sm">Pricing</a></li>
              <li><a href="#contact" className="text-white/55 hover:text-primary transition text-sm">Contact</a></li>
            </ul>
          </div>

          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary mb-4">Contact</p>
            <ul className="space-y-2.5">
              <li>
                <a href="mailto:ontheedgeai@ontheedgeau.com" className="text-white/55 hover:text-primary transition text-sm">
                  ontheedgeai@ontheedgeau.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-6 border-t border-white/8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping" />
              <span className="relative h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/50">
              Currently accepting new projects
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-white/40 text-xs font-mono">
            <Link to="/privacy" className="hover:text-primary transition">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-primary transition">Terms of Service</Link>
            <span>© 2026 On The Edge</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

/* ----------------------------------------------------------------
   App
---------------------------------------------------------------- */
export default function App() {
  useEffect(() => {
    const t1 = setTimeout(() => ScrollTrigger.refresh(), 200)
    const t2 = setTimeout(() => ScrollTrigger.refresh(), 1000)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  return (
    <div className="relative">
      <div className="noise-overlay" />
      <Navbar />
      <main>
        <Hero />
        <PainPoints />
        <WhoWeHelp />
        <Features />
        <Pillars />
        <Portfolio />
        <Protocol />
        <ServicesGrid />
        <TrustSignals />
        <Packages />
        <ContactForm />
      </main>
      <Footer />
    </div>
  )
}
