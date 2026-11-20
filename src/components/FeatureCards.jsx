import { useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const CARDS = [
  {
    icon:  '⬡',
    stat:  '99.7%',
    unit:  'Accuracy',
    title: 'Neural Inference',
    desc:  'State-of-the-art reasoning engine trained on curated enterprise datasets. Fewer hallucinations. More signal.',
    hue:   '#4f8ef7',
  },
  {
    icon:  '◈',
    stat:  '< 50ms',
    unit:  'Latency',
    title: 'Real-time Processing',
    desc:  'Sub-50ms inference for tasks that demand instant response. No batching, no queuing — just results.',
    hue:   '#8b5cf6',
  },
  {
    icon:  '□',
    stat:  '256K',
    unit:  'Token context',
    title: 'Extended Memory',
    desc:  'Hold entire codebases, legal corpora, or conversation histories in a single unbroken context window.',
    hue:   '#4f8ef7',
  },
  {
    icon:  '∞',
    stat:  '∞',
    unit:  'Scale',
    title: 'Elastic Infrastructure',
    desc:  'Auto-scaling compute that handles one request or ten million without a single line of configuration.',
    hue:   '#34d399',
  },
]

function Card({ card, index }) {
  const ref = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { opacity: 0, y: 48 },
        {
          opacity:  1,
          y:        0,
          duration: 0.75,
          ease:     'power3.out',
          delay:    index * 0.08,
          scrollTrigger: {
            trigger: ref.current,
            start:   'top 88%',
            once:    true,
          },
        },
      )
    })
    return () => ctx.revert()
  }, [index])

  const S = {
    card: {
      flex:               '0 0 clamp(280px, 78vw, 360px)',
      scrollSnapAlign:    'start',
      background:         'var(--card-bg)',
      backdropFilter:     'blur(24px)',
      WebkitBackdropFilter: 'blur(24px)',
      border:             '1px solid var(--card-border)',
      borderRadius:       '1.25rem',
      padding:            '2.6rem 2.1rem',
      display:            'flex',
      flexDirection:      'column',
      gap:                '1.4rem',
      opacity:            0,
      transition:         'border-color 0.3s, transform 0.3s',
      cursor:             'default',
    },
    icon: {
      fontFamily:  'var(--font-mono)',
      fontSize:    '1.4rem',
      color:       card.hue,
      lineHeight:  1,
    },
    statWrap: {},
    stat: {
      fontFamily:    'var(--font-display)',
      fontSize:      'clamp(2.6rem, 5vw, 3.6rem)',
      fontWeight:    300,
      lineHeight:    1,
      letterSpacing: '-0.03em',
      color:         'var(--text)',
    },
    unit: {
      fontFamily:    'var(--font-mono)',
      fontSize:      '0.63rem',
      letterSpacing: '0.2em',
      color:         card.hue,
      textTransform: 'uppercase',
      marginTop:     '0.3rem',
    },
    title: {
      fontFamily:    'var(--font-body)',
      fontSize:      '1rem',
      fontWeight:    500,
      color:         'var(--text)',
      letterSpacing: '-0.01em',
    },
    desc: {
      fontFamily: 'var(--font-body)',
      fontSize:   '0.875rem',
      color:      'var(--text-muted)',
      lineHeight: 1.68,
      fontWeight: 300,
    },
    /* Glow accent at top of card */
    glow: {
      position:     'absolute',
      top:          0,
      left:         '50%',
      transform:    'translateX(-50%)',
      width:        '60%',
      height:       1,
      background:   `linear-gradient(to right, transparent, ${card.hue}55, transparent)`,
      borderRadius: '1px',
    },
  }

  return (
    <div
      ref={ref}
      style={{ ...S.card, position: 'relative' }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = card.hue + '40'
        e.currentTarget.style.transform   = 'translateY(-4px)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'var(--card-border)'
        e.currentTarget.style.transform   = 'translateY(0)'
      }}
    >
      <div style={S.glow} />
      <div style={S.icon}>{card.icon}</div>
      <div style={S.statWrap}>
        <div style={S.stat}>{card.stat}</div>
        <div style={S.unit}>{card.unit}</div>
      </div>
      <div>
        <div style={S.title}>{card.title}</div>
        <p   style={{ ...S.desc, marginTop: '0.5rem' }}>{card.desc}</p>
      </div>
    </div>
  )
}

export function FeatureCards() {
  const sectionRef = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.feat-heading',
        { opacity: 0, y: 36 },
        {
          opacity:  1,
          y:        0,
          duration: 0.85,
          ease:     'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start:   'top 72%',
            once:    true,
          },
        },
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const S = {
    section: {
      padding:    '9rem 0 7rem',
      background: 'var(--bg)',
      overflow:   'hidden',
    },
    headWrap: {
      padding:      '0 max(2rem, 8vw)',
      marginBottom: '3.5rem',
      opacity:      0,
    },
    eyebrow: {
      fontFamily:    'var(--font-mono)',
      fontSize:      '0.65rem',
      letterSpacing: '0.25em',
      color:         'var(--accent)',
      textTransform: 'uppercase',
      marginBottom:  '1rem',
    },
    h2: {
      fontFamily:    'var(--font-display)',
      fontSize:      'clamp(2.6rem, 6.5vw, 5.5rem)',
      fontWeight:    300,
      lineHeight:    1.08,
      letterSpacing: '-0.025em',
      color:         'var(--text)',
      maxWidth:      '22rem',
    },
    track: {
      display:              'flex',
      gap:                  '1.3rem',
      padding:              '2rem max(2rem, 8vw)',
      overflowX:            'auto',
      scrollSnapType:       'x mandatory',
      scrollbarWidth:       'none',
      msOverflowStyle:      'none',
      WebkitOverflowScrolling: 'touch',
    },
    hint: {
      textAlign:     'center',
      marginTop:     '1.8rem',
      fontFamily:    'var(--font-mono)',
      fontSize:      '0.6rem',
      letterSpacing: '0.18em',
      color:         'var(--text-muted)',
      opacity:       0.45,
      animation:     'breathe 2.4s ease-in-out infinite',
    },
    /* Separator line above section */
    rule: {
      height:     1,
      margin:     '0 max(2rem, 8vw)',
      background: 'var(--card-border)',
      marginBottom: '0',
    },
  }

  return (
    <section ref={sectionRef} id="features" style={S.section}>
      <div style={S.rule} />

      <div className="feat-heading" style={{ ...S.headWrap, paddingTop: '5rem' }}>
        <div style={S.eyebrow}>◆ Capabilities</div>
        <h2 style={S.h2}>
          Built for the <em>edge</em> of possibility
        </h2>
      </div>

      {/* Horizontal scroll track */}
      <div style={S.track} className="no-scrollbar">
        {CARDS.map((card, i) => (
          <Card key={i} card={card} index={i} />
        ))}
        {/* End spacer so last card scrolls fully into view */}
        <div style={{ flex: '0 0 max(2rem, 8vw)' }} />
      </div>

      <p style={S.hint}>← drag to explore →</p>
    </section>
  )
}
