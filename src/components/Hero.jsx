import { useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Scene3D }    from './Scene3D.jsx'
import { scrollState } from '../scrollState.js'

gsap.registerPlugin(ScrollTrigger)

const LINES = ['Cognition', 'at the speed', 'of now']

/* Split a string into <span class="char"> elements */
function SplitChars({ text, italic }) {
  return (
    <span style={{ display: 'block' }}>
      {text.split('').map((ch, i) => (
        <span
          key={i}
          className="char"
          style={{
            display:    'inline-block',
            opacity:    0,
            fontStyle:  italic ? 'italic' : 'normal',
          }}
        >
          {ch === ' ' ? '\u00A0' : ch}
        </span>
      ))}
    </span>
  )
}

export function Hero() {
  const heroRef      = useRef(null)
  const headlineRef  = useRef(null)
  const subtitleRef  = useRef(null)
  const indicatorRef = useRef(null)
  const ctaRef       = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      /* ── 1. Load-in: chars stagger from below ── */
      gsap.fromTo(
        '.char',
        { y: 100, opacity: 0, rotationX: -55 },
        {
          y: 0, opacity: 1, rotationX: 0,
          stagger:  0.022,
          duration: 1.15,
          ease:     'power4.out',
          delay:    0.15,
        },
      )

      /* ── 2. Supporting copy ── */
      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 22 },
        { opacity: 1, y: 0, duration: 0.9, delay: 1.0, ease: 'power3.out' },
      )

      /* ── 3. CTA buttons ── */
      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.8, delay: 1.25, ease: 'power3.out' },
      )

      /* ── 4. Scroll indicator ── */
      gsap.fromTo(
        indicatorRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.7, delay: 1.7, ease: 'power2.out' },
      )

      /* ── 5. ScrollTrigger: pin 200vh + scrub ── */
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger:      heroRef.current,
          start:        'top top',
          end:          '+=200%',
          pin:          true,
          scrub:        1.5,
          anticipatePin: 1,
          onUpdate: (self) => {
            scrollState.heroProgress = self.progress
          },
        },
      })

      /* Headline fades & rises while 3D object moves right (handled in Scene3D) */
      tl.to(headlineRef.current,  { opacity: 0, y: -80,  duration: 0.8 }, 0)
      tl.to(subtitleRef.current,  { opacity: 0, y: -40,  duration: 0.7 }, 0)
      tl.to(ctaRef.current,       { opacity: 0, y: -30,  duration: 0.6 }, 0)
      tl.to(indicatorRef.current, { opacity: 0,           duration: 0.3 }, 0)

    }, heroRef)

    return () => ctx.revert()
  }, [])

  /* ── Styles ── */
  const S = {
    section: {
      position: 'relative',
      width:    '100%',
      height:   '100vh',
      display:  'flex',
      alignItems:     'center',
      justifyContent: 'center',
      overflow: 'hidden',
      background: 'var(--bg)',
    },
    content: {
      position:       'relative',
      zIndex:         2,
      textAlign:      'center',
      padding:        '0 1.5rem',
      maxWidth:       '90vw',
      pointerEvents:  'none',
    },
    eyebrow: {
      fontFamily:    'var(--font-mono)',
      fontSize:      '0.68rem',
      letterSpacing: '0.22em',
      color:         'var(--accent)',
      textTransform: 'uppercase',
      marginBottom:  '2.5rem',
      animation:     'fadeSlideUp 0.6s ease both 0.05s',
    },
    h1: {
      fontFamily:   'var(--font-display)',
      fontSize:     'clamp(3.6rem, 10.5vw, 9rem)',
      fontWeight:   300,
      lineHeight:   1.0,
      letterSpacing:'-0.025em',
      color:        'var(--text)',
      perspective:  '900px',
      transformStyle:'preserve-3d',
    },
    subtitle: {
      fontFamily:  'var(--font-body)',
      fontSize:    'clamp(0.9rem, 1.5vw, 1.1rem)',
      color:       'var(--text-muted)',
      maxWidth:    '34rem',
      margin:      '2rem auto 0',
      lineHeight:  1.75,
      fontWeight:  300,
      opacity:     0,
    },
    cta: {
      display:        'flex',
      gap:            '0.9rem',
      justifyContent: 'center',
      marginTop:      '2.6rem',
      opacity:        0,
      pointerEvents:  'auto',
    },
    btnPrimary: {
      padding:        '0.82rem 2rem',
      background:     'var(--accent)',
      color:          '#fff',
      borderRadius:   '2rem',
      fontFamily:     'var(--font-body)',
      fontSize:       '0.85rem',
      fontWeight:     500,
      letterSpacing:  '0.01em',
      transition:     'opacity 0.25s, transform 0.25s',
      display:        'inline-block',
    },
    btnSecondary: {
      padding:        '0.82rem 2rem',
      border:         '1px solid var(--card-border)',
      color:          'var(--text)',
      borderRadius:   '2rem',
      fontFamily:     'var(--font-body)',
      fontSize:       '0.85rem',
      fontWeight:     400,
      transition:     'border-color 0.25s',
      display:        'inline-block',
    },
    indicator: {
      position:        'absolute',
      bottom:          '2.8rem',
      left:            '50%',
      transform:       'translateX(-50%)',
      display:         'flex',
      flexDirection:   'column',
      alignItems:      'center',
      gap:             '0.55rem',
      opacity:         0,
      zIndex:          3,
    },
    indicatorLabel: {
      fontFamily:    'var(--font-mono)',
      fontSize:      '0.6rem',
      letterSpacing: '0.22em',
      color:         'var(--text-muted)',
      textTransform: 'uppercase',
    },
    indicatorLine: {
      width:      1,
      height:     44,
      background: 'linear-gradient(to bottom, var(--accent), transparent)',
      animation:  'breathe 1.6s ease-in-out infinite',
    },
    vignette: {
      position:      'absolute',
      inset:         0,
      background:    'radial-gradient(ellipse at 50% 50%, transparent 30%, rgba(10,10,10,.28) 62%, rgba(10,10,10,.72) 82%, #0a0a0a 96%)',
      pointerEvents: 'none',
      zIndex:        1,
    },
    /* Subtle corner label */
    cornerLabel: {
      position:      'absolute',
      bottom:        '2.4rem',
      right:         'max(2rem, 5vw)',
      fontFamily:    'var(--font-mono)',
      fontSize:      '0.6rem',
      letterSpacing: '0.14em',
      color:         'var(--text-dim)',
      textTransform: 'uppercase',
      zIndex:        3,
      animation:     'fadeSlideUp 0.6s ease both 1.9s',
    },
  }

  return (
    <section ref={heroRef} style={S.section}>
      {/* Full-viewport 3D scene */}
      <Scene3D />

      {/* Radial vignette over the 3D scene */}
      <div style={S.vignette} />

      {/* Centered text content */}
      <div style={S.content}>
        <div style={S.eyebrow}>◆ Intelligence infrastructure</div>

        <h1 ref={headlineRef} style={S.h1}>
          {LINES.map((line, li) => (
            <div key={li} style={{ overflow: 'hidden' }}>
              <SplitChars text={line} italic={li === LINES.length - 1} />
            </div>
          ))}
        </h1>

        <p ref={subtitleRef} style={S.subtitle}>
          The cognitive layer between your team and the world's complexity.&nbsp;
          Built for decisions that can't wait.
        </p>

        <div ref={ctaRef} style={S.cta}>
          <a href="#features" style={S.btnPrimary}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            Get started
          </a>
          <a href="#about" style={S.btnSecondary}
            onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)')}
            onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--card-border)')}
          >
            Learn more →
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div ref={indicatorRef} style={S.indicator}>
        <span style={S.indicatorLabel}>Scroll to continue</span>
        <div style={S.indicatorLine} />
      </div>

      {/* Corner label */}
      <div style={S.cornerLabel}>v2.4 · production</div>
    </section>
  )
}
