import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export function Cursor() {
  const dotRef  = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    const dot  = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    /* ── Follow mouse ── */
    const onMove = (e) => {
      gsap.to(dot,  { x: e.clientX, y: e.clientY, duration: 0.08, ease: 'power3.out', overwrite: true })
      gsap.to(ring, { x: e.clientX, y: e.clientY, duration: 0.32, ease: 'power2.out', overwrite: true })
    }

    /* ── Hover interactive elements ── */
    const onOver = (e) => {
      if (e.target.closest('a, button, [data-hover]')) {
        gsap.to(dot,  { scale: 2.5, opacity: 0.7, duration: 0.25 })
        gsap.to(ring, { scale: 1.8, opacity: 0.5, duration: 0.25 })
      }
    }

    const onOut = (e) => {
      if (e.target.closest('a, button, [data-hover]')) {
        gsap.to(dot,  { scale: 1, opacity: 1, duration: 0.25 })
        gsap.to(ring, { scale: 1, opacity: 0.3, duration: 0.25 })
      }
    }

    /* ── Click burst ── */
    const onClick = () => {
      gsap.fromTo(ring, { scale: 1 }, { scale: 2.2, opacity: 0, duration: 0.4, ease: 'power3.out',
        onComplete: () => gsap.set(ring, { opacity: 0.3, scale: 1 }),
      })
    }

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout',  onOut)
    window.addEventListener('click',     onClick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout',  onOut)
      window.removeEventListener('click',     onClick)
    }
  }, [])

  const base = {
    position:      'fixed',
    top:           0,
    left:          0,
    pointerEvents: 'none',
    zIndex:        99999,
    borderRadius:  '50%',
    willChange:    'transform',
    /* GSAP translates with x/y, so the element starts at (0,0) */
    transform:     'translate(-50%, -50%)',
  }

  return (
    <>
      {/* Inner dot */}
      <div
        ref={dotRef}
        style={{
          ...base,
          width:      9,
          height:     9,
          background: 'var(--accent)',
        }}
      />
      {/* Trailing ring */}
      <div
        ref={ringRef}
        style={{
          ...base,
          width:   34,
          height:  34,
          border:  '1.5px solid var(--accent)',
          opacity: 0.3,
        }}
      />
    </>
  )
}
