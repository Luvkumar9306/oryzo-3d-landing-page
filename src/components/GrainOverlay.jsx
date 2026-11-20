import { useEffect, useRef } from 'react'

export function GrainOverlay() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let animFrame
    let w = 0
    let h = 0
    let tick = 0

    const resize = () => {
      w = canvas.width  = window.innerWidth
      h = canvas.height = window.innerHeight
    }

    const paint = () => {
      tick++
      /* Repaint every 3rd frame — enough animation, lower cost */
      if (tick % 3 === 0) {
        const img = ctx.createImageData(w, h)
        const d   = img.data
        for (let i = 0; i < d.length; i += 4) {
          const v  = (Math.random() * 255) | 0
          d[i]     = v
          d[i + 1] = v
          d[i + 2] = v
          d[i + 3] = 20   /* very low alpha — grain is a hint, not a filter */
        }
        ctx.putImageData(img, 0, 0)
      }
      animFrame = requestAnimationFrame(paint)
    }

    resize()
    window.addEventListener('resize', resize)
    paint()

    return () => {
      cancelAnimationFrame(animFrame)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position:      'fixed',
        inset:         0,
        pointerEvents: 'none',
        zIndex:        9999,
        opacity:       0.13,
        mixBlendMode:  'screen',
      }}
    />
  )
}
