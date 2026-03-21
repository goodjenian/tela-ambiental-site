import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  ArrowRight, Leaf, Building2, Map, MapPin,
  TreePine, Globe, CheckCircle2,
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const WA = 'https://api.whatsapp.com/send?phone=5511953028497'
const HERO_IMG = 'https://images.unsplash.com/photo-1591081658714-f576fb7ea3ed?auto=format&fit=crop&w=1920&q=80'
const PHILOS_IMG = 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&q=80'
const LOGO_URL = 'https://telaambiental.com.br/wp-content/uploads/2025/01/655e5924-1_104h036000000000000028.png'

// ─────────────────────────────────────────────────────────────────────────────
// NOISE SVG (global, fixed)
// ─────────────────────────────────────────────────────────────────────────────
function NoiseSVG() {
  return (
    <>
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <filter id="noise-filter">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
        </defs>
      </svg>
      <div id="noise-overlay" aria-hidden="true" />
    </>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// NAVBAR — floating pill
// ─────────────────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const hero = document.getElementById('hero')
    if (!hero) return
    const obs = new IntersectionObserver(([e]) => setScrolled(!e.isIntersecting), { threshold: 0.15 })
    obs.observe(hero)
    return () => obs.disconnect()
  }, [])

  const linkCls = `link-lift text-sm font-medium ${scrolled ? 'text-dark/70 hover:text-dark' : 'text-cream/80 hover:text-cream'}`

  return (
    <nav
      role="navigation"
      aria-label="Navegação principal"
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-6 px-6 py-3 rounded-full
        transition-all duration-500
        ${scrolled
          ? 'bg-cream/75 backdrop-blur-xl border border-primary/20 shadow-lg'
          : 'bg-primary/40 backdrop-blur-md border border-cream/15'
        }`}
    >
      <a href="#hero" className="flex items-center">
        <img
          src={LOGO_URL}
          alt="TELA Ambiental Engenharia"
          className="h-9 w-auto object-contain transition-all duration-500"
          style={{ filter: scrolled ? 'none' : 'brightness(0) invert(1)' }}
        />
      </a>
      <div className="hidden md:flex items-center gap-5">
        <a href="#nossos-servicos" className={linkCls}>Serviços</a>
        <a href="#por-que" className={linkCls}>Por Que</a>
        <a href="#quem-somos" className={linkCls}>Quem Somos</a>
      </div>
      <a
        href={WA} target="_blank" rel="noopener noreferrer"
        className="btn-magnetic bg-accent text-cream text-sm font-semibold px-4 py-2 rounded-full"
      >
        Proposta →
      </a>
    </nav>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// HERO — 100dvh, dark forest, text bottom-left
// ─────────────────────────────────────────────────────────────────────────────
function Hero() {
  const ref = useRef(null)
  const [imgLoaded, setImgLoaded] = useState(false)

  useEffect(() => {
    setImgLoaded(true)
    const ctx = gsap.context(() => {
      gsap.from('.hero-text', {
        y: 40, opacity: 0, duration: 1.2,
        stagger: 0.08, ease: 'power3.out', delay: 0.4,
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section id="hero" ref={ref} className="relative w-full overflow-hidden" style={{ height: '100dvh' }}>
      <img
        src={HERO_IMG}
        alt="Floresta nativa preservada — TELA Ambiental"
        className={`absolute inset-0 w-full h-full object-cover transition-transform duration-[8000ms] ease-out ${imgLoaded ? 'scale-100' : 'scale-105'}`}
        loading="eager"
        fetchPriority="high"
      />
      {/* Gradiente principal: base preta para textos na parte inferior e meio sutil verde */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-primary/50 to-transparent" />
      {/* Gradiente extra apenas no topo para garantir o contraste da navegação e textos */}
      <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-black/70 to-transparent" />

      <div className="relative h-full flex flex-col justify-end pb-14 px-8 md:px-16 max-w-5xl">
        <div className="hero-text mb-3">
          <span className="font-mono text-xs text-accent tracking-widest uppercase">
            Licenciamento Ambiental · Urbanístico · Aeronáutico
          </span>
        </div>

        <h1>
          <span className="hero-text block font-sans font-bold text-cream leading-tight hero-title-main"
            style={{ fontSize: 'clamp(1.25rem, 3vw, 2.5rem)' }}>
            Licenciamento é
          </span>
          <span className="hero-text block font-serif-drama text-cream leading-none hero-title-drama"
            style={{ fontSize: 'clamp(2.25rem, 7vw, 5.5rem)', fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic' }}>
            Conformidade Legal.
          </span>
        </h1>

        <p className="hero-text text-cream/70 text-base md:text-lg mt-5 max-w-lg leading-relaxed">
          Soluções eficazes e consultoria completa para questões ambientais e urbanísticas
          que impactam empreendimentos de todos os segmentos.
        </p>

        <div className="hero-text flex flex-wrap items-center gap-4 mt-8">
          <a
            href={WA} target="_blank" rel="noopener noreferrer"
            className="btn-magnetic group relative overflow-hidden bg-accent text-cream font-bold px-8 py-4 rounded-full inline-flex items-center gap-2 text-base"
          >
            Solicitar uma Proposta <ArrowRight size={18} />
          </a>
          <div className="font-mono text-sm text-cream/60">
            <span className="text-accent font-bold">+5.000</span> licenças emitidas
          </div>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// FEATURE CARD 1 — Diagnostic Shuffler
// ─────────────────────────────────────────────────────────────────────────────
function FeatureShuffler() {
  const [stack, setStack] = useState([
    { label: 'Licença Ambiental', tag: 'CETESB · IBAMA · IEF', dot: '#2E4036' },
    { label: 'Licença Urbanística', tag: 'CUOS · Habite-se · AVCB', dot: '#2ECC71' },
    { label: 'Licença Aeronáutica', tag: 'COMAR · Heliponto', dot: '#4A6741' },
  ])

  useEffect(() => {
    const id = setInterval(() => {
      setStack(prev => {
        const next = [...prev]
        next.unshift(next.pop())
        return next
      })
    }, 2800)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="flex flex-col h-full">
      <div className="mb-5">
        <span className="font-mono text-xs text-accent tracking-widest uppercase">Aprovação Ágil</span>
        <h3 className="font-sans font-bold text-dark text-lg mt-1">+5.000 licenças emitidas</h3>
        <p className="text-dark/55 text-sm mt-1 leading-relaxed">
          Processos em conformidade com órgãos licenciadores federais, estaduais e municipais.
        </p>
      </div>
      <div className="flex-1 relative" style={{ minHeight: 130 }}>
        {stack.map((item, i) => (
          <div
            key={item.label}
            className="absolute inset-x-0 flex items-center gap-3 bg-cream rounded-2xl px-4 py-3 border border-primary/10"
            style={{
              top: `${i * 16}px`,
              zIndex: stack.length - i,
              transition: 'all 0.65s cubic-bezier(0.34, 1.56, 0.64, 1)',
              opacity: 1 - i * 0.22,
              transform: `scale(${1 - i * 0.04}) translateY(${i * 3}px)`,
              boxShadow: i === 0 ? '0 4px 20px rgba(46,64,54,0.12)' : 'none',
            }}
          >
            <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: item.dot }} />
            <span className="font-sans font-semibold text-dark text-sm">{item.label}</span>
            <span className="ml-auto font-mono text-xs text-accent">✓</span>
            <span className="font-mono text-xs text-dark/40 hidden md:block">{item.tag}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// FEATURE CARD 2 — Telemetry Typewriter
// ─────────────────────────────────────────────────────────────────────────────
const FEED = [
  'CETESB/SP: Licença de Operação aprovada — Telecom',
  'IBAMA: EIA-RIMA concluído — Loteadora RS',
  'COMAR: Heliponto autorizado — São Paulo CBD',
  'INEA-RJ: LAI emitida — Construtora Médio Porte',
  'SEMA-MT: Supressão vegetal aprovada 180ha',
  'ANATEL: ERB licenciada — Fibra óptica 340km',
]

function FeatureTypewriter() {
  const [msgIdx, setMsgIdx] = useState(0)
  const [text, setText] = useState('')
  const [charIdx, setCharIdx] = useState(0)
  const [history, setHistory] = useState([])

  useEffect(() => {
    const cur = FEED[msgIdx]
    if (charIdx < cur.length) {
      const t = setTimeout(() => {
        setText(cur.slice(0, charIdx + 1))
        setCharIdx(c => c + 1)
      }, 40)
      return () => clearTimeout(t)
    } else {
      const t = setTimeout(() => {
        setHistory(h => [...h.slice(-4), cur])
        setMsgIdx(i => (i + 1) % FEED.length)
        setCharIdx(0)
        setText('')
      }, 2200)
      return () => clearTimeout(t)
    }
  }, [charIdx, msgIdx])

  return (
    <div className="flex flex-col h-full">
      <div className="mb-5">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-mono text-xs text-accent tracking-widest uppercase">Live Feed</span>
          <span className="w-2 h-2 rounded-full bg-accent status-dot" />
        </div>
        <h3 className="font-sans font-bold text-dark text-lg">Grandes players de mercado</h3>
        <p className="text-dark/55 text-sm mt-1 leading-relaxed">
          Telecomunicações, construtoras e loteadoras de grande, médio e pequeno porte.
        </p>
      </div>
      <div className="flex-1 bg-dark rounded-2xl p-4 font-mono text-xs overflow-hidden flex flex-col gap-1">
        <div className="text-primary/50 mb-2">TELA_MONITOR v2.1 ──── órgãos BR</div>
        {history.map((msg, i) => (
          <div key={i} className="text-cream/25 truncate">{msg}</div>
        ))}
        <div className="text-accent flex items-start gap-1">
          <span>&gt;</span>
          <span>{text}</span>
          <span className="cursor-blink inline-block w-[2px] h-[14px] bg-accent align-middle ml-0.5" />
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// FEATURE CARD 3 — Cursor Protocol Scheduler
// ─────────────────────────────────────────────────────────────────────────────
const DAYS_LABELS = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']
const WORK_DAYS = [1, 2, 3, 4, 5] // Mon–Fri

function FeatureScheduler() {
  const [active, setActive] = useState([])
  const [saved, setSaved] = useState(false)
  const timerRef = useRef(null)

  useEffect(() => {
    const run = () => {
      setActive([])
      setSaved(false)
      let i = 0
      const step = () => {
        if (i >= WORK_DAYS.length) {
          timerRef.current = setTimeout(() => { setSaved(true) }, 400)
          timerRef.current = setTimeout(run, 3200)
          return
        }
        const day = WORK_DAYS[i]
        setActive(a => [...a, day])
        i++
        timerRef.current = setTimeout(step, 550)
      }
      timerRef.current = setTimeout(step, 600)
    }
    run()
    return () => clearTimeout(timerRef.current)
  }, [])

  return (
    <div className="flex flex-col h-full">
      <div className="mb-5">
        <span className="font-mono text-xs text-accent tracking-widest uppercase">Cronograma</span>
        <h3 className="font-sans font-bold text-dark text-lg mt-1">Cartografia e geoprocessamento</h3>
        <p className="text-dark/55 text-sm mt-1 leading-relaxed">
          Suporte completo em dados geoespaciais e estudos de impacto ambiental.
        </p>
      </div>
      <div className="flex-1 flex flex-col gap-3">
        <div className="grid grid-cols-7 gap-1.5">
          {DAYS_LABELS.map((d, i) => {
            const isActive = active.includes(i)
            return (
              <div key={i} className="flex flex-col items-center gap-1">
                <span className="font-mono text-xs text-dark/40">{d}</span>
                <div
                  className="w-full aspect-square rounded-lg flex items-center justify-center transition-all duration-300"
                  style={{
                    backgroundColor: isActive ? '#2ECC71' : 'rgba(46,64,54,0.1)',
                    border: isActive ? '1px solid #2ECC71' : '1px solid transparent',
                    transform: isActive ? 'scale(0.95)' : 'scale(1)',
                  }}
                >
                  {isActive && <span className="text-cream text-xs font-bold">✓</span>}
                </div>
              </div>
            )
          })}
        </div>
        <button
          disabled
          className="w-full py-2.5 rounded-xl font-sans text-sm font-semibold transition-all duration-500"
          style={{
            backgroundColor: saved ? '#2ECC71' : 'rgba(46,64,54,0.1)',
            color: saved ? '#F2F0E9' : 'rgba(26,26,26,0.3)',
          }}
        >
          {saved ? '✓ Cronograma Salvo' : 'Aguardando...'}
        </button>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// FEATURES SECTION
// ─────────────────────────────────────────────────────────────────────────────
function Features() {
  return (
    <section id="diferenciais" className="py-24 px-8 md:px-16 bg-cream" aria-labelledby="features-title">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span className="font-mono text-xs text-accent tracking-widest uppercase">Diferenciais</span>
          <h2 id="features-title" className="font-sans font-bold text-dark text-3xl md:text-4xl mt-2">
            Por que a TELA Ambiental
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[FeatureShuffler, FeatureTypewriter, FeatureScheduler].map((Card, i) => (
            <div
              key={i}
              className="bg-cream border border-primary/10 rounded-4xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
              style={{ minHeight: 340 }}
            >
              <Card />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// PHILOSOPHY — manifesto section
// ─────────────────────────────────────────────────────────────────────────────
function Philosophy() {
  const secRef = useRef(null)
  const textRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const words = textRef.current?.querySelectorAll('.phil-word')
      if (!words?.length) return
      gsap.from(words, {
        y: 28, opacity: 0, duration: 0.7,
        stagger: 0.035, ease: 'power3.out',
        scrollTrigger: { trigger: textRef.current, start: 'top 72%' },
      })
    }, secRef)
    return () => ctx.revert()
  }, [])

  const split = (text) =>
    text.split(' ').map((w, i) => (
      <span key={i} className="phil-word inline-block mr-[0.3em]">{w}</span>
    ))

  return (
    <section
      ref={secRef}
      className="relative py-32 px-8 md:px-16 overflow-hidden"
      style={{ backgroundColor: '#1A1A1A' }}
      aria-labelledby="manifesto-title"
    >
      <img
        src={PHILOS_IMG}
        alt=""
        role="presentation"
        className="absolute inset-0 w-full h-full object-cover opacity-[0.08]"
        loading="lazy"
      />
      <div className="relative max-w-4xl mx-auto" ref={textRef}>
        <span className="font-mono text-xs text-accent tracking-widest uppercase block mb-10">Manifesto</span>
        <p id="manifesto-title" className="text-cream/40 text-lg md:text-2xl leading-relaxed font-sans mb-8">
          {split('A maioria das consultorias foca em: prazos indefinidos e burocracia sem compromisso com resultados.')}
        </p>
        <p className="text-cream text-2xl md:text-4xl leading-tight font-sans font-semibold">
          {split('Nós focamos em:')}
          {' '}
          <em
            className="font-serif-drama not-italic"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', color: '#2ECC71', fontSize: '1.2em' }}
          >
            <span className="phil-word inline-block">agilidade</span>
            {' '}
            <span className="phil-word inline-block">e</span>
            {' '}
            <span className="phil-word inline-block">conformidade.</span>
          </em>
        </p>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// PROTOCOL — sticky stacking cards with SVG animations
// ─────────────────────────────────────────────────────────────────────────────
function ConcentricCircles() {
  return (
    <svg width="120" height="120" viewBox="0 0 120 120" aria-hidden="true">
      {[44, 33, 22, 11].map((r, i) => (
        <circle key={r} cx="60" cy="60" r={r}
          fill="none"
          stroke={i % 2 === 0 ? '#2ECC71' : '#F2F0E9'}
          strokeWidth="1.5"
          opacity={1 - i * 0.15}
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from={`0 60 60`}
            to={`${i % 2 === 0 ? 360 : -360} 60 60`}
            dur={`${5 + i * 2}s`}
            repeatCount="indefinite"
          />
        </circle>
      ))}
    </svg>
  )
}

function ScanningGrid() {
  return (
    <svg width="140" height="100" viewBox="0 0 140 100" aria-hidden="true">
      {Array.from({ length: 6 }).map((_, row) =>
        Array.from({ length: 11 }).map((_, col) => (
          <circle key={`${row}-${col}`}
            cx={col * 13 + 7} cy={row * 15 + 7}
            r={2.5} fill="#F2F0E9" opacity={0.25}
          />
        ))
      )}
      <line x1="0" y1="50" x2="140" y2="50" stroke="#2ECC71" strokeWidth="2" opacity="0.9"
        className="scan-laser"
      />
    </svg>
  )
}

function EKGWave() {
  return (
    <svg width="180" height="70" viewBox="0 0 180 70" aria-hidden="true">
      <path
        d="M0,35 L25,35 L30,18 L35,52 L40,8 L45,62 L50,35 L80,35 L85,18 L90,52 L95,8 L100,62 L105,35 L140,35 L145,18 L150,52 L155,8 L160,62 L165,35 L180,35"
        fill="none" stroke="#2ECC71" strokeWidth="2.5"
        strokeLinecap="round" strokeLinejoin="round"
        className="ekg-path"
      />
    </svg>
  )
}

const STEPS = [
  {
    num: '01',
    title: 'Diagnóstico e Levantamento',
    desc: 'Análise técnica completa do empreendimento, identificando todas as exigências ambientais e urbanísticas aplicáveis.',
    Anim: ConcentricCircles,
    dark: false,
  },
  {
    num: '02',
    title: 'Elaboração e Protocolo',
    desc: 'Preparação de documentos, estudos técnicos, EIAs, RIMAs e relatórios exigidos pelos órgãos licenciadores competentes.',
    Anim: ScanningGrid,
    dark: true,
  },
  {
    num: '03',
    title: 'Acompanhamento e Aprovação',
    desc: 'Monitoramento ativo junto aos órgãos ambientais, garantindo agilidade e conformidade até a emissão da licença.',
    Anim: EKGWave,
    dark: false,
  },
]

function Protocol() {
  const containerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.protocol-card')
      cards.forEach((card, i) => {
        if (i < cards.length - 1) {
          ScrollTrigger.create({
            trigger: card,
            start: 'top top',
            pin: true,
            pinSpacing: false,
          })
          // Transição mais assertiva: começa quando o próximo card está 50% visível
          gsap.to(card, {
            scale: 0.88,
            opacity: 0.4,
            filter: 'blur(8px)',
            ease: 'power2.inOut',
            scrollTrigger: {
              trigger: cards[i + 1],
              start: 'top 50%',
              end: 'top top',
              scrub: 0.6,
            },
          })
        }
      })
    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="processo" ref={containerRef} aria-labelledby="protocol-header">
      <div className="text-center py-6 px-8 bg-cream">
        <span className="font-mono text-xs text-accent tracking-widest uppercase">Metodologia</span>
        <h2 id="protocol-header" className="font-sans font-bold text-dark text-3xl md:text-4xl mt-2">
          Nosso Protocolo
        </h2>
      </div>

      {STEPS.map(({ num, title, desc, Anim, dark }) => (
        <div
          key={num}
          className="protocol-card w-full flex items-center justify-center px-8"
          style={{
            height: '70svh',
            backgroundColor: dark ? '#2E4036' : '#F2F0E9',
          }}
        >
          <div className="max-w-lg w-full mx-auto text-center flex flex-col items-center gap-5">
            <div className="flex justify-center">
              <Anim />
            </div>
            <div className="font-mono text-xs text-accent tracking-widest">PASSO {num}</div>
            <h3
              className="font-sans font-bold text-3xl md:text-4xl leading-tight"
              style={{ color: dark ? '#F2F0E9' : '#1A1A1A' }}
            >
              {title}
            </h3>
            <p
              className="text-base md:text-lg leading-relaxed max-w-sm"
              style={{ color: dark ? 'rgba(242,240,233,0.65)' : 'rgba(26,26,26,0.6)' }}
            >
              {desc}
            </p>
          </div>
        </div>
      ))}
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// WHY SECTION — por que licenciar
// ─────────────────────────────────────────────────────────────────────────────
const WHY_ITEMS = [
  { n: '01', title: 'Conformidade Legal', desc: 'Empresas sem licenças podem sofrer multas, embargo de atividades e suspensão de operações.' },
  { n: '02', title: 'Reputação e Credibilidade', desc: 'Cumprir exigências ambientais fortalece a imagem da marca perante clientes, investidores e o mercado.' },
  { n: '03', title: 'Segurança em Investimentos', desc: 'Bancos e investidores exigem critérios ambientais antes de aprovar empréstimos e financiamentos.' },
  { n: '04', title: 'Mitigação de Riscos', desc: 'Com o licenciamento, empresas identificam e controlam impactos negativos ao meio ambiente.' },
  { n: '05', title: 'Acesso a Novos Mercados', desc: 'Certificações ambientais são necessárias para atuar em mercados nacionais e internacionais exigentes.' },
  { n: '06', title: 'Vantagem Competitiva', desc: 'Empresas responsáveis atendem à crescente demanda por produtos e serviços sustentáveis.' },
]

function WhySection() {
  return (
    <section id="por-que" className="py-24 px-8 md:px-16" style={{ background: 'linear-gradient(to bottom, #EAE8E1, #dff0e5)' }} aria-labelledby="why-title">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span className="font-mono text-xs text-accent tracking-widest uppercase">Importância</span>
          <h2 id="why-title" className="font-sans font-bold text-dark text-3xl md:text-4xl mt-2">
            Por que obter sua licença ambiental?
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {WHY_ITEMS.map(({ n, title, desc }) => (
            <article
              key={n}
              className="bg-cream rounded-4xl p-6 border border-primary/10 hover:border-accent/25 hover:shadow-sm hover:-translate-y-1 transition-all duration-300"
            >
              <div className="font-mono text-xs text-accent mb-3">{n}</div>
              <h3 className="font-sans font-bold text-dark text-base mb-2">{title}</h3>
              <p className="text-dark/58 text-sm leading-relaxed">{desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// SERVICES
// ─────────────────────────────────────────────────────────────────────────────
const SERVICES = [
  { Icon: Leaf, title: 'Licenciamento Ambiental e Urbanístico', desc: 'Todas as etapas para que seu projeto tenha as licenças ambientais necessárias, do início à operação.' },
  { Icon: TreePine, title: 'Serviços Florestais', desc: 'Reflorestamento, recomposição vegetal e recuperação de áreas degradadas conforme exigências dos órgãos.' },
  { Icon: Building2, title: 'Regularização Imobiliária', desc: 'Regularização de imóveis urbanos e rurais, desmembramento de lotes, registros e averbações necessárias.' },
  { Icon: CheckCircle2, title: 'Licenciamento Urbanístico', desc: 'CUOS, Alvará de Construção, Habite-se e AVCB, garantindo conformidade com todas as normas.' },
  { Icon: Globe, title: 'Licenciamento Aeronáutico (COMAR)', desc: 'Aprovação de helipontos e processos de sombreamento, cumprindo as exigências do Comando Aéreo.' },
  { Icon: Map, title: 'Cartografia e Geoprocessamento', desc: 'Mapas detalhados e dados geoespaciais precisos para suporte completo ao seu projeto.' },
  { Icon: MapPin, title: 'Levantamento Topográfico', desc: 'Análises precisas do relevo e condições físicas do terreno com equipamentos avançados de última geração.' },
]

function Services() {
  return (
    <section id="nossos-servicos" className="py-24 px-8 md:px-16 bg-cream" aria-labelledby="services-title">
      <div className="max-w-6xl mx-auto">
        <div className="mb-14">
          <span className="font-mono text-xs text-accent tracking-widest uppercase">Especialidades</span>
          <h2 id="services-title" className="font-sans font-bold text-dark text-3xl md:text-4xl mt-2">
            Nossos Serviços
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map(({ Icon, title, desc }) => (
            <article
              key={title}
              className="group bg-cream border border-primary/10 rounded-4xl p-6 hover:border-accent/30 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-5 transition-colors duration-300 group-hover:bg-accent/10"
                style={{ backgroundColor: 'rgba(46,64,54,0.08)' }}>
                <Icon size={20} className="text-primary group-hover:text-accent transition-colors duration-300" />
              </div>
              <h3 className="font-sans font-bold text-dark text-base mb-2">{title}</h3>
              <p className="text-dark/55 text-sm leading-relaxed">{desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// CLIENTS
// ─────────────────────────────────────────────────────────────────────────────
function ClientsSection() {
  const clients = [
    { name: 'Nexo SP', img: '/nexo.png' },
    { name: 'Procisa', img: '/procisa.png' },
    { name: 'Grupo TCZ', img: '/tcz.png' },
    { name: 'Claro', img: '/claro.png' },
  ]

  return (
    <section className="py-24 px-8 md:px-16" style={{ backgroundColor: '#EAE8E1' }} aria-labelledby="clients-title">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span className="font-mono text-xs text-accent tracking-widest uppercase">Portfólio</span>
          <h2 id="clients-title" className="font-sans font-bold text-dark text-3xl md:text-4xl mt-2">
            Empresas que Confiam na TELA Ambiental
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-5">
          {clients.map((client, i) => (
            <div
              key={i}
              className="w-[calc(50%-10px)] md:w-48 lg:w-56 border border-primary/10 rounded-2xl p-5 flex items-center justify-center grayscale transition-all duration-300 hover:grayscale-0 bg-cream/30"
              style={{ minHeight: '120px' }}
            >
              {client.img && (
                <img
                  src={client.img}
                  alt={client.name}
                  className="max-w-full max-h-full object-contain"
                  style={{ maxHeight: '60px' }}
                  onError={e => {
                    e.currentTarget.style.display = 'none'
                    if (e.currentTarget.nextSibling) e.currentTarget.nextSibling.style.display = 'block'
                  }}
                />
              )}
              <span className="font-mono text-xs text-dark/30 text-center" style={{ display: client.img ? 'none' : 'block' }}>
                {client.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// STATS
// ─────────────────────────────────────────────────────────────────────────────
const STATS = [
  { value: '+5.000', label: 'Licenças Emitidas', sub: 'em todo o Brasil' },
  { value: '+2.000', label: 'Relatórios Elaborados', sub: 'EIAs, RIMAs e estudos' },
  { value: '+4.000', label: 'ERBs Licenciadas', sub: 'torres de telecomunicações' },
  { value: '+7.000km', label: 'Fibra Óptica', sub: 'infraestrutura licenciada' },
]

function Stats() {
  return (
    <section className="py-24 px-8 md:px-16" style={{ background: 'linear-gradient(135deg, #2E4036, #1a5c2e)' }} aria-labelledby="stats-title">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span className="font-mono text-xs text-accent tracking-widest uppercase">Resultados comprovados</span>
          <h2 id="stats-title" className="font-sans font-bold text-cream text-3xl md:text-4xl mt-2">
            Números que falam por si
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {STATS.map(({ value, label, sub }) => (
            <div key={label} className="text-center p-6 rounded-4xl border border-cream/10" style={{ backgroundColor: 'rgba(242,240,233,0.05)' }}>
              <div className="font-mono text-accent text-3xl md:text-4xl font-bold mb-2">{value}</div>
              <div className="font-sans font-semibold text-cream text-sm mb-1">{label}</div>
              <div className="font-mono text-cream/35 text-xs">{sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// AGENCIES
// ─────────────────────────────────────────────────────────────────────────────
function AgenciesSection() {
  return (
    <section className="py-24 px-8 md:px-16 bg-cream" aria-labelledby="agencies-title">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span className="font-mono text-xs text-accent tracking-widest uppercase">Alcance</span>
          <h2 id="agencies-title" className="font-sans font-bold text-dark text-3xl md:text-4xl mt-2">
            Atuamos em Todo o Brasil
          </h2>
          <p className="text-dark/60 text-base md:text-lg mt-4 max-w-2xl mx-auto leading-relaxed">
            Experiência consolidada com os principais órgãos ambientais federais e estaduais — de norte a sul do país.
          </p>
        </div>

        <div className="w-full flex justify-center items-center">
          <img
            src="/orgaos.png"
            alt="Órgãos ambientais"
            className="w-full max-w-4xl object-contain opacity-80 hover:opacity-100 transition-all duration-500"
            onError={e => {
              e.currentTarget.style.display = 'none'
              if (e.currentTarget.nextSibling) e.currentTarget.nextSibling.style.display = 'block'
            }}
          />
          <div className="text-center p-12 border-2 border-dashed border-primary/20 rounded-2xl w-full max-w-4xl bg-cream/50" style={{ display: 'none' }}>
            <span className="block font-mono text-sm text-dark/40 mb-2">Imagem não encontrada</span>
            <span className="block font-sans text-lg font-semibold text-dark/70">
              Faça o upload do arquivo <strong className="text-accent">orgaos.png</strong> na pasta public
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// ABOUT
// ─────────────────────────────────────────────────────────────────────────────
function About() {
  return (
    <section id="quem-somos" className="py-24 px-8 md:px-16 bg-cream" aria-labelledby="about-title">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10">
          <span className="font-mono text-xs text-accent tracking-widest uppercase">Quem Somos</span>
          <h2 id="about-title" className="font-sans font-bold text-dark text-3xl md:text-4xl mt-2">
            A TELA Ambiental Engenharia
          </h2>
        </div>
        <p className="text-dark/70 text-lg leading-relaxed mb-5 max-w-2xl">
          A <strong className="text-dark">TELA Ambiental Engenharia</strong> é uma consultoria que conecta empresas
          a <strong className="text-dark">soluções ambientais inteligentes</strong>, oferecendo experiência técnica
          e rigor na gestão de projetos sustentáveis.
        </p>
        <p className="text-dark/60 leading-relaxed mb-10 max-w-2xl">
          Nossa missão é assegurar que cada projeto esteja não apenas em conformidade com a legislação, mas também
          preparado para gerar um <strong className="text-dark">impacto ambiental positivo e sustentável</strong>.
        </p>
        <a
          href={WA} target="_blank" rel="noopener noreferrer"
          className="btn-magnetic inline-flex items-center gap-2 bg-accent text-cream font-semibold px-7 py-3.5 rounded-full"
        >
          Fale com um Especialista <ArrowRight size={18} />
        </a>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// FOUNDERS — seção minimalista com sócio-fundadores
// ─────────────────────────────────────────────────────────────────────────────
const FOUNDERS = [
  {
    name: 'Filipe Cabral Generato',
    role: 'Engenheiro · Sócio-Fundador',
    bio: 'Carreira consolidada em licenciamento ambiental e urbanístico, com projetos para grandes players do mercado nacional.',
    img: '/filipe.jpeg',
  },
  {
    name: 'Bruna Regina Cação',
    role: 'Gestora Ambiental · Sócia-Fundadora',
    bio: 'Especialista em regularização fundiária, estudos de impacto e acompanhamento junto a órgãos licenciadores.',
    img: '/bruna.png',
  },
]

function Founders() {
  return (
    <section
      id="fundadores"
      className="py-20 px-8 md:px-16"
      style={{ background: 'linear-gradient(to bottom, #EAE8E1, #dff0e5)' }}
      aria-labelledby="founders-title"
    >
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <span className="font-mono text-xs text-accent tracking-widest uppercase">Liderança</span>
          <h2 id="founders-title" className="font-sans font-bold text-dark text-2xl md:text-3xl mt-2">
            Sócio-Fundadores
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {FOUNDERS.map(({ name, role, bio, img }) => (
            <div key={name} className="flex items-start gap-5">
              {/* Foto pequena — mantenha as fotos em public/filipe.jpg e public/bruna.jpg */}
              <div className="flex-shrink-0">
                <img
                  src={img}
                  alt={name}
                  className="h-20 w-20 rounded-2xl object-cover object-top"
                  style={{ imageRendering: 'auto' }}
                  onError={e => {
                    e.currentTarget.style.display = 'none'
                    e.currentTarget.nextSibling.style.display = 'flex'
                  }}
                />
                {/* Fallback inicial (exibido se a imagem não carregar) */}
                <div
                  className="h-20 w-20 rounded-2xl items-center justify-center font-mono text-xl font-bold text-cream"
                  style={{ backgroundColor: '#2E4036', display: 'none' }}
                >
                  {name.charAt(0)}
                </div>
              </div>

              <div className="pt-1">
                <div className="font-sans font-bold text-dark text-base leading-tight">{name}</div>
                <div className="font-mono text-xs text-accent mt-0.5 mb-2">{role}</div>
                <p className="text-dark/55 text-sm leading-relaxed">{bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// MEMBERSHIP / CTA — three tiers adapted for consulting
// ─────────────────────────────────────────────────────────────────────────────
const TIERS = [
  {
    name: 'Essencial',
    tag: 'Para pequenas atividades',
    items: ['Licença Ambiental Simplificada', 'Regularização Imobiliária', 'Consulta técnica inicial', 'Suporte por e-mail'],
    cta: 'Solicitar Proposta',
    highlight: false,
  },
  {
    name: 'Performance',
    tag: 'Para médios e grandes empreendimentos',
    items: ['Licenciamento completo (todas as etapas)', 'Cartografia e Geoprocessamento', 'ERBs e Fibra Óptica', 'Acompanhamento em órgãos', 'Suporte prioritário'],
    cta: 'Falar com Especialista',
    highlight: true,
  },
  {
    name: 'Enterprise',
    tag: 'Para grandes players de mercado',
    items: ['Gestão estratégica de portfólio', 'EIA/RIMA e estudos especializados', 'COMAR / Licenciamento Aeronáutico', 'Regularização fundiária complexa', 'Consultor dedicado'],
    cta: 'Solicitar Contato',
    highlight: false,
  },
]

function CTASection() {
  return (
    <section id="iniciar" className="py-24 px-8 md:px-16 bg-cream" aria-labelledby="cta-title">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span className="font-mono text-xs text-accent tracking-widest uppercase">Inicie Agora</span>
          <h2 id="cta-title" className="font-sans font-bold text-dark text-3xl md:text-4xl mt-2">
            Regularize seu empreendimento
          </h2>
          <p className="text-dark/55 text-lg mt-3 max-w-xl mx-auto">
            Nossa equipe está pronta para orientar você em cada etapa do processo de licenciamento.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TIERS.map(({ name, tag, items, cta, highlight }) => (
            <div
              key={name}
              className={`rounded-4xl p-8 flex flex-col border transition-all duration-300
                ${highlight
                  ? 'bg-primary border-primary shadow-xl scale-[1.03]'
                  : 'bg-cream border-primary/12 hover:border-accent/30 hover:shadow-md'
                }`}
            >
              <div className="mb-6">
                <div className="font-sans font-bold text-xl mb-1"
                  style={{ color: highlight ? '#F2F0E9' : '#1A1A1A' }}>{name}</div>
                <div className="font-mono text-xs"
                  style={{ color: highlight ? 'rgba(242,240,233,0.55)' : 'rgba(26,26,26,0.45)' }}>{tag}</div>
              </div>
              <ul className="space-y-2.5 flex-1 mb-8">
                {items.map(item => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span className="text-accent mt-0.5 text-base leading-none">✓</span>
                    <span className="text-sm leading-relaxed"
                      style={{ color: highlight ? 'rgba(242,240,233,0.8)' : 'rgba(26,26,26,0.65)' }}>{item}</span>
                  </li>
                ))}
              </ul>
              <a
                href={WA} target="_blank" rel="noopener noreferrer"
                className={`btn-magnetic w-full text-center font-semibold py-3.5 rounded-full text-sm
                  ${highlight
                    ? 'bg-accent text-cream'
                    : 'bg-primary/8 text-dark hover:bg-accent hover:text-cream'
                  } transition-colors duration-300`}
              >
                {cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// FOOTER
// ─────────────────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer
      className="rounded-t-5xl px-8 md:px-16 pt-14 pb-10"
      style={{ backgroundColor: '#0C0C0C' }}
      role="contentinfo"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
            <img
              src={LOGO_URL}
              alt="TELA Ambiental Engenharia"
              className="h-14 w-auto object-contain mb-3"
              style={{ filter: 'brightness(0) invert(1)' }}
            />
            <p className="text-cream/75 text-sm leading-relaxed max-w-xs">
              Consultoria especializada em licenciamento ambiental e urbanístico para empreendimentos
              de todos os segmentos em todo o Brasil.
            </p>
            <div className="flex items-center gap-2 mt-6">
              <span className="w-2 h-2 rounded-full bg-green-400 status-dot flex-shrink-0" />
              <span className="font-mono text-xs text-cream/60">Sistema Operacional</span>
            </div>
          </div>

          <nav aria-label="Serviços no rodapé">
            <div className="font-sans font-bold text-cream/80 text-xs uppercase tracking-widest mb-4">Serviços</div>
            <ul className="space-y-2.5">
              {['Licenciamento Ambiental', 'Licenciamento Urbanístico', 'Serviços Florestais', 'Cartografia', 'Geoprocessamento', 'COMAR'].map(s => (
                <li key={s}>
                  <a href="#nossos-servicos" className="link-lift text-cream/65 text-sm hover:text-cream transition-colors">{s}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <div className="font-sans font-bold text-cream/80 text-xs uppercase tracking-widest mb-4">Contato</div>
            <ul className="space-y-2.5">
              <li>
                <a href={WA} target="_blank" rel="noopener noreferrer"
                  className="link-lift text-cream/65 text-sm hover:text-accent transition-colors">
                  WhatsApp
                </a>
              </li>
              <li><span className="text-cream/65 text-sm font-mono">(11) 95302-8497</span></li>
              <li><span className="text-cream/55 text-sm">telaambiental.com.br</span></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-cream/15 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-mono text-xs text-cream/55">
            © {new Date().getFullYear()} TELA Ambiental Engenharia. Todos os direitos reservados.
          </span>
          <span className="font-mono text-xs text-cream/40">telaambiental.com.br</span>
        </div>
      </div>
    </footer>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// APP ROOT
// ─────────────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div className="bg-cream text-dark overflow-x-hidden">
      <NoiseSVG />
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Philosophy />
        <Protocol />
        <WhySection />
        <Services />
        <ClientsSection />
        <Stats />
        <AgenciesSection />
        <About />
        <Founders />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
