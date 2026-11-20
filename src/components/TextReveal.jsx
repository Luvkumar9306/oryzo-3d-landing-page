import { useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const PARAGRAPH =
  "We didn't build another chatbot. We built a cognitive layer that sits between your team and the infinite complexity of modern data — translating intent into action, ambiguity into clarity, and raw information into decisions worth making. Every query carries weight. Every response carries consequence."

export function TextReveal() {
  const sectionRef = useRef(null)
  const textRef    = useRef(null)
  const labelRef   = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const words = Array.from(textRef.current.querySelectorAll('.word'))

      /* Set initial dim state */
      gsap.set(words, { opacity: 0.1 })

      /* Build a scrubbed timeline — one tween per word, staggered */
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger:      sectionRef.current,
          start:        'top top',
          end:          '+=290%',
          pin:          true,
          scrub:        1,
          anticipatePin: 1,
        },
      })

      words.forEach((word, i) => {
        tl.to(
          word,
          { opacity: 1, filter: 'blur(0px)', duration: 0.08, ease: 'none' },
          i * 0.06,
        )
      })

      /* Label slides in once on enter */
      gsap.fromTo(
        labelRef.current,
        { opacity: 0, x: -20 },
        {
          opacity: 1, x: 0, duration: 0.7, ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start:   'top 80%',
            once:    true,
          },
        },
      )

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const S = {
    section: {
      position:        'relative',
      width:           '100%',
      height:          '100vh',
      display:         'flex',
      alignItems:      'center',
      justifyContent:  'center',
      background:      'var(--bg)',
      overflow:        'hidden',
    },
    inner: {
      maxWidth: '56rem',
      padding:  '0 max(2rem, 8vw)',
      width:    '100%',
    },
    label: {
      fontFamily:    'var(--font-mono)',
      fontSize:      '0.65rem',
      letterSpacing: '0.26em',
      color:         'var(--accent)',
      textTransform: 'uppercase',
      marginBottom:  '3rem',
      opacity:       0,
    },
    para: {
      fontFamily:    'var(--font-display)',
      fontSize:      'clamp(1.45rem, 2.9vw, 2.5rem)',
      fontWeight:    300,
      lineHeight:    1.6,
      color:         'var(--text)',
    },
    accentLine: {
      position:   'absolute',
      left:       'max(2.5rem, 6vw)',
      top:        '12%',
      bottom:     '12%',
      width:      1,
      background: 'linear-gradient(to bottom, transparent, var(--card-border) 30%, var(--card-border) 70%, transparent)',
    },
    progressDot: {
      position:     'absolute',
      right:        'max(2.5rem, 6vw)',
      top:          '50%',
      transform:    'translateY(-50%)',
      width:        6,
      height:       6,
      borderRadius: '50%',
      background:   'var(--accent)',
      opacity:      0.5,
    },
  }

  return (
    <section ref={sectionRef} id="about" style={S.section}>
      {/* Decorative left bar */}
      <div style={S.accentLine} />
      <div style={S.progressDot} />

      <div style={S.inner}>
        <div ref={labelRef} style={S.label}>— Our philosophy</div>

        <p ref={textRef} style={S.para}>
          {PARAGRAPH.split(' ').map((word, i) => (
            <span
              key={i}
              className="word"
              style={{
                display:    'inline',
                filter:     'blur(2px)',
                transition: 'filter 0.2s',
              }}
            >
              {word}{' '}
            </span>
          ))}
        </p>
      </div>
    </section>
  )
}
