export const clamp = (v: number, a = 0, b = 1) => Math.max(a, Math.min(b, v))

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t

export const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && !!window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches
