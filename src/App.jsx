import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

import { Cursor }       from './components/Cursor.jsx'
import { GrainOverlay } from './components/GrainOverlay.jsx'
import { Hero }         from './components/Hero.jsx'
import { TextReveal }   from './components/TextReveal.jsx'
import { FeatureCards } from './components/FeatureCards.jsx'
import { Footer }       from './components/Footer.jsx'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  useEffect(() => {
    /* ── Lenis smooth scroll ── */
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.9,
    })

    /* Sync Lenis → ScrollTrigger */
    lenis.on('scroll', ScrollTrigger.update)

    /* Drive Lenis from GSAP's ticker (single RAF loop) */
    const onTick = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(onTick)
    gsap.ticker.lagSmoothing(0)

    /* Let DOM settle before computing offsets */
    const refresh = () => ScrollTrigger.refresh()
    const raf = requestAnimationFrame(() => requestAnimationFrame(refresh))

    return () => {
      cancelAnimationFrame(raf)
      gsap.ticker.remove(onTick)
      lenis.destroy()
    }
  }, [])

  return (
    <>
      <Cursor />
      <GrainOverlay />
      <main>
        <Hero />
        <TextReveal />
        <FeatureCards />
        <Footer />
      </main>
    </>
  )
}
