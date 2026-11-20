# Oryzo-Inspired Landing Page

A full-featured, production-ready single-page site built with:

| Tech | Purpose |
|------|---------|
| **React 18 + Vite 5** | Component framework & dev server |
| **React Three Fiber + Three.js** | 3D torus-knot with PBR material |
| **GSAP + ScrollTrigger** | Split-text load animation, scroll scrubbing, pinned sections |
| **Lenis** | Buttery smooth scroll inertia (synced with GSAP ticker) |

---

## Quick start

```bash
npm install
npm run dev
```

Then open **http://localhost:5173**

---

## Build for production

```bash
npm run build
npm run preview   # preview the production build locally
```

---

## Architecture

```
src/
├── main.jsx            Entry point
├── App.jsx             Lenis + GSAP ScrollTrigger bootstrap
├── index.css           CSS variables, resets, keyframes
├── scrollState.js      Shared mutable state (GSAP ↔ Three.js bridge)
└── components/
    ├── Cursor.jsx      Dual-ring custom cursor
    ├── GrainOverlay.jsx  Animated canvas noise grain
    ├── Hero.jsx        Full-viewport hero, split-text GSAP load-in,
    │                   200vh pin + scrub (headline fades, 3D moves right)
    ├── Scene3D.jsx     R3F canvas — TorusKnot + particles, reads scrollState
    ├── TextReveal.jsx  Sticky section — word-by-word opacity scrub (290vh pin)
    ├── FeatureCards.jsx  Horizontal scroll-snap frosted-glass cards
    └── Footer.jsx      Minimal footer — email, socials, copy
```

---

## Design tokens

| Token | Value |
|-------|-------|
| Background | `#0a0a0a` |
| Text | `#f0ede8` (warm off-white) |
| Accent | `#4f8ef7` (electric blue) |
| Display font | Cormorant Garamond (Google Fonts) |
| Body font | Bricolage Grotesque (Google Fonts) |
| Mono font | IBM Plex Mono (Google Fonts) |

---

## How the scroll animations work

### Hero pin (200 vh)
`ScrollTrigger` pins the hero section for 200 vh of scroll distance.
During this pin, a scrubbed GSAP timeline:
- fades and lifts the headline + subtitle out
- simultaneously writes `scrollState.heroProgress` (0 → 1)

`Scene3D` reads `scrollState.heroProgress` every frame inside `useFrame`,
lerping the torus knot's X position and scale so it drifts right and grows.

### Text reveal pin (290 vh)
Each word in the paragraph gets its own tween inside a single scrubbed
`gsap.timeline`. As the user scrolls through the pinned section, words
sequentially reach full opacity — word-by-word reveal with zero JS loops
at read time.

### Lenis ↔ GSAP sync
```js
lenis.on('scroll', ScrollTrigger.update)      // tell ST about each Lenis tick
gsap.ticker.add((time) => lenis.raf(time * 1000))  // drive Lenis from GSAP RAF
gsap.ticker.lagSmoothing(0)                   // prevent lag spikes
```

This keeps both systems on the same animation frame, avoiding jitter.
