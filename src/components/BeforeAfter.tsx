import { useCallback, useEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent } from "react";
import { MoveHorizontal } from "lucide-react";
import skin from "../assets/skin.jpg";
import laser from "../assets/laser.jpg";
import { Reveal, SectionHead } from "./ui";
import { cn } from "../utils/cn";

/* Gerçek müşteri fotoğraflarını (izinli) eklemek için before/after alanlarına dosya yolu verin.
   Boş bırakılırsa tek görselin filtreli "temsili" karşılaştırması gösterilir. */
const cases = [
  { label: "Medikal cilt bakımı", img: skin, before: "", after: "", pos: "center 35%" },
  { label: "Lazer epilasyon", img: laser, before: "", after: "", pos: "center 50%" },
];

const beforeFilter = "grayscale(.5) contrast(.78) brightness(.82) sepia(.4) saturate(.8)";

export default function BeforeAfter() {
  const [idx, setIdx] = useState(0);
  const [pos, setPos] = useState(50);
  const boxRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const touched = useRef(false);
  const c = cases[idx];
  const real = !!(c.before && c.after);

  const move = useCallback((clientX: number) => {
    const r = boxRef.current?.getBoundingClientRect();
    if (!r) return;
    setPos(Math.max(0, Math.min(100, ((clientX - r.left) / r.width) * 100)));
  }, []);

  const onDown = (e: PointerEvent<HTMLDivElement>) => {
    dragging.current = true;
    touched.current = true;
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      /* yoksay */
    }
    move(e.clientX);
  };
  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const map: Record<string, number> = { ArrowLeft: pos - 4, ArrowRight: pos + 4, Home: 0, End: 100 };
    if (e.key in map) {
      e.preventDefault();
      touched.current = true;
      setPos(Math.max(0, Math.min(100, map[e.key])));
    }
  };

  useEffect(() => {
    const el = boxRef.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      (es) => {
        if (!es[0].isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const step = (t: number) => {
          if (touched.current) return;
          const p = Math.min((t - t0) / 2200, 1);
          setPos(p < 1 ? 50 + Math.sin(p * Math.PI * 2) * 22 * (1 - p * 0.3) : 50);
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      },
      { threshold: 0.55 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const layer = (src: string, filter?: string): CSSProperties => ({
    backgroundImage: `url(${src})`,
    backgroundSize: "cover",
    backgroundPosition: c.pos,
    filter,
  });

  return (
    <section id="oncesi-sonrasi" className="relative py-24 lg:py-32">
      <div className="hairline absolute inset-x-0 top-0 mx-auto w-[min(1280px,100%-48px)]" />
      <div className="mx-auto w-[min(1280px,100%-32px)] sm:w-[min(1280px,100%-48px)]">
        <SectionHead
          center
          eyebrow="Öncesi / Sonrası"
          title={
            <>
              Farkı <span className="gold-text italic">kendiniz</span> görün
            </>
          }
          text="Ortadaki altın çubuğu fareyle veya parmağınızla sürükleyerek öncesi ve sonrasını karşılaştırın."
        />

        <Reveal className="mx-auto max-w-4xl">
          <div role="tablist" aria-label="Sonuç kategorisi" className="mb-6 flex flex-wrap justify-center gap-2.5">
            {cases.map((x, i) => (
              <button
                key={x.label}
                role="tab"
                aria-selected={idx === i}
                onClick={() => {
                  setIdx(i);
                  setPos(50);
                }}
                className={cn(
                  "rounded-full border px-6 py-2.5 text-[0.72rem] font-semibold tracking-[0.12em] uppercase transition-all",
                  idx === i
                    ? "gold-bg border-transparent text-[#1a1200] shadow-[0_8px_26px_rgba(212,175,55,0.28)]"
                    : "border-white/10 bg-white/[0.03] text-mute hover:border-gold/40 hover:text-white",
                )}
              >
                {x.label}
              </button>
            ))}
          </div>

          <div
            ref={boxRef}
            onPointerDown={onDown}
            onPointerMove={(e) => dragging.current && move(e.clientX)}
            onPointerUp={() => (dragging.current = false)}
            onPointerCancel={() => (dragging.current = false)}
            onLostPointerCapture={() => (dragging.current = false)}
            className="relative aspect-[4/3.4] cursor-ew-resize touch-pan-y overflow-hidden rounded-[26px] border border-gold/50 bg-ink-3 shadow-[0_30px_80px_rgba(0,0,0,0.6),0_0_60px_rgba(212,175,55,0.08)] select-none sm:aspect-[16/10]"
          >
            <div className="absolute inset-0" style={layer(real ? c.after : c.img, real ? undefined : "brightness(1.05) saturate(1.05)")} />
            <div
              className="absolute inset-0"
              style={{ ...layer(real ? c.before : c.img, real ? undefined : beforeFilter), clipPath: `inset(0 ${100 - pos}% 0 0)` }}
            >
              {!real && (
                <div
                  className="absolute inset-0 mix-blend-multiply"
                  style={{
                    background:
                      "radial-gradient(circle at 24% 34%,rgba(120,50,40,.5) 0 3%,transparent 6%),radial-gradient(circle at 55% 28%,rgba(120,50,40,.4) 0 2.5%,transparent 5%),radial-gradient(circle at 70% 62%,rgba(110,45,35,.5) 0 3.5%,transparent 7%),radial-gradient(circle at 38% 66%,rgba(120,55,45,.4) 0 3%,transparent 6%)",
                  }}
                />
              )}
            </div>

            <span className="absolute top-4 left-4 z-10 rounded-full border border-white/20 bg-ink/65 px-4 py-1.5 text-[0.68rem] font-semibold tracking-[0.14em] uppercase backdrop-blur">Öncesi</span>
            <span className="absolute top-4 right-4 z-10 rounded-full border border-gold/40 bg-ink/65 px-4 py-1.5 text-[0.68rem] font-semibold tracking-[0.14em] text-gold uppercase backdrop-blur">Sonrası</span>
            {!real && (
              <span className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2 rounded-full bg-ink/60 px-3.5 py-1 text-[0.68rem] whitespace-nowrap text-white/80 backdrop-blur">Temsili görsel</span>
            )}

            <div
              role="slider"
              tabIndex={0}
              aria-label="Öncesi sonrası karşılaştırma"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(pos)}
              onKeyDown={onKey}
              className="absolute inset-y-0 z-20 w-14 -translate-x-1/2 outline-offset-[-6px]"
              style={{ left: pos + "%" }}
            >
              <span className="gold-bg absolute inset-y-0 left-1/2 w-[3px] -translate-x-1/2 shadow-[0_0_18px_rgba(212,175,55,0.9)]" />
              <span className="absolute top-1/2 left-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-gold bg-ink/80 text-gold shadow-[0_0_28px_rgba(212,175,55,0.6)] backdrop-blur">
                <MoveHorizontal size={20} />
              </span>
            </div>
          </div>
          <p className="mt-5 text-center text-[0.78rem] text-mute">Sonuçlar cilt tipine ve kişiye göre değişiklik gösterebilir.</p>
        </Reveal>
      </div>
    </section>
  );
}
