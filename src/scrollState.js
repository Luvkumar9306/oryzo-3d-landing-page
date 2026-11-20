/**
 * Shared mutable state between GSAP (DOM world) and Three.js (WebGL world).
 * Updated by ScrollTrigger.onUpdate in Hero.jsx, read by useFrame in Scene3D.jsx.
 */
export const scrollState = {
  heroProgress: 0,
}
