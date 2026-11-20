import { useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const SOCIALS = [
  { label: 'X / Twitter', href: 'https://twitter.com' },
  { label: 'GitHub',      href: 'https://github.com'  },
  { label: 'LinkedIn',    href: 'https://linkedin.com' },
]

export function Footer() {
  const footerRef = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        footerRef.current,
        { opacity: 0, y: 28 },
        {
          opacity:  1,
          y:        0,
          duration: 0.85,
          ease:     'power3.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start:   'top 88%',
            once:    true,
          },
        },
      )
    }, footerRef)
    return () => ctx.revert()
  }, [])

  const S = {
    footer: {
      padding:     '7rem max(2rem, 8vw) 4rem',
      borderTop:   '1px solid var(--card-border)',
      opacity:     0,
    },
    grid: {
      display:             'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
      gap:                 '3.5rem',
      marginBottom:        '4rem',
    },
    brandName: {
      fontFamily:    'var(--font-display)',
      fontSize:      '2rem',
      fontWeight:    300,
      letterSpacing: '-0.04em',
      marginBottom:  '0.8rem',
      color:         'var(--text)',
    },
    brandTagline: {
      fontFamily: 'var(--font-body)',
      fontSize:   '0.85rem',
      color:      'var(--text-muted)',
      lineHeight: 1.65,
      fontWeight: 300,
      maxWidth:   '20rem',
    },
    colTitle: {
      fontFamily:    'var(--font-mono)',
      fontSize:      '0.63rem',
      letterSpacing: '0.22em',
      color:         'var(--accent)',
      textTransform: 'uppercase',
      marginBottom:  '1.25rem',
    },
    link: {
      display:     'block',
      fontFamily:  'var(--font-body)',
      fontSize:    '0.9rem',
      color:       'var(--text-muted)',
      marginBottom:'0.55rem',
      transition:  'color 0.2s',
    },
    bottom: {
      display:        'flex',
      justifyContent: 'space-between',
      alignItems:     'center',
      flexWrap:       'wrap',
      gap:            '1rem',
      paddingTop:     '2rem',
      borderTop:      '1px solid var(--card-border)',
    },
    copy: {
      fontFamily:    'var(--font-mono)',
      fontSize:      '0.63rem',
      letterSpacing: '0.1em',
      color:         'var(--text-muted)',
      opacity:       0.4,
    },
    accentDot: {
      display:       'inline-block',
      width:          6,
      height:         6,
      borderRadius:  '50%',
      background:    'var(--accent)',
      marginRight:   '0.6rem',
      verticalAlign: 'middle',
      opacity:       0.7,
    },
  }

  const hoverIn  = (e) => { e.currentTarget.style.color = 'var(--text)' }
  const hoverOut = (e) => { e.currentTarget.style.color = 'var(--text-muted)' }

  return (
    <footer ref={footerRef} style={S.footer}>
      <div style={S.grid}>

        {/* Brand */}
        <div>
          <div style={S.brandName}>oryzo</div>
          <p style={S.brandTagline}>
            Cognition at the speed of now.
            Infrastructure for teams that can't afford to think slow.
          </p>
        </div>

        {/* Contact */}
        <div>
          <div style={S.colTitle}>Contact</div>
          <a
            href="mailto:hello@oryzo.ai"
            style={S.link}
            onMouseEnter={hoverIn}
            onMouseLeave={hoverOut}
          >
            hello@oryzo.ai
          </a>
          <a
            href="mailto:press@oryzo.ai"
            style={S.link}
            onMouseEnter={hoverIn}
            onMouseLeave={hoverOut}
          >
            press@oryzo.ai
          </a>
        </div>

        {/* Social */}
        <div>
          <div style={S.colTitle}>Follow</div>
          {SOCIALS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              style={S.link}
              onMouseEnter={hoverIn}
              onMouseLeave={hoverOut}
            >
              {label}
            </a>
          ))}
        </div>

        {/* Product links */}
        <div>
          <div style={S.colTitle}>Product</div>
          {['API docs', 'Changelog', 'Status', 'Pricing'].map(item => (
            <a
              key={item}
              href="#"
              style={S.link}
              onMouseEnter={hoverIn}
              onMouseLeave={hoverOut}
            >
              {item}
            </a>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div style={S.bottom}>
        <span style={S.copy}>
          <span style={S.accentDot} />
          © {new Date().getFullYear()} Oryzo Technologies, Inc. All rights reserved.
        </span>
        <span style={{ ...S.copy, opacity: 0.3 }}>
          Made with care · San Francisco
        </span>
      </div>
    </footer>
  )
}
