import { useEffect, useRef } from "react";

interface P { x: number; y: number; r: number; speed: number; dx: number; base: number; ph: number; tw: number }

export default function Particles() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = ref.current!;
    const ctx = c.getContext("2d")!;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let W = 0, H = 0, raf = 0, lastW = 0, rt = 0;
    let parts: P[] = [];
    const rnd = (a: number, b: number) => a + Math.random() * (b - a);
    const make = (init: boolean): P => ({
      x: rnd(0, W), y: init ? rnd(0, H) : H + 10, r: rnd(0.5, 1.8), speed: rnd(0.12, 0.5), dx: rnd(-0.1, 0.1),
      base: rnd(0.2, 0.65), ph: rnd(0, Math.PI * 2), tw: rnd(0.01, 0.03),
    });
    const resize = () => {
      const dpr = Math.min(devicePixelRatio || 1, 2);
      W = innerWidth; H = innerHeight;
      c.width = W * dpr; c.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.max(40, Math.min(80, Math.round(W / 22)));
      while (parts.length < n) parts.push(make(true));
      parts.length = n;
    };
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      for (const p of parts) {
        if (!reduce) {
          p.y -= p.speed; p.x += p.dx + Math.sin(p.ph) * 0.1; p.ph += p.tw;
          if (p.y < -10) Object.assign(p, make(false));
        }
        const a = p.base * (0.55 + 0.45 * Math.sin(p.ph * 2.3));
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 3.2, 0, 6.283); ctx.fillStyle = `rgba(212,175,55,${a * 0.1})`; ctx.fill();
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.283); ctx.fillStyle = `rgba(255,229,127,${a})`; ctx.fill();
      }
      if (!reduce) raf = requestAnimationFrame(draw);
    };
    resize(); lastW = innerWidth; draw();
    const onResize = () => {
      clearTimeout(rt);
      rt = window.setTimeout(() => {
        if (Math.abs(innerWidth - lastW) > 40) { lastW = innerWidth; resize(); if (reduce) draw(); }
      }, 150);
    };
    addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(raf); removeEventListener("resize", onResize); clearTimeout(rt); };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-70" />;
}
