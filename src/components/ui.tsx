import { useEffect, useRef, useState, type ReactNode, type CSSProperties } from "react";
import { cn } from "../utils/cn";

export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "article" | "li" | "p";
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (es) => {
        if (es[0].isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const style: CSSProperties = { transitionDelay: delay + "ms" };
  return (
    <Tag ref={ref as never} style={style} className={cn("reveal", shown && "in", className)}>
      {children}
    </Tag>
  );
}

export function SectionHead({
  eyebrow,
  title,
  text,
  center,
}: {
  eyebrow: string;
  title: ReactNode;
  text?: string;
  center?: boolean;
}) {
  return (
    <Reveal className={cn("mb-14 max-w-3xl", center && "mx-auto text-center")}>
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="font-display mt-5 text-4xl leading-[1.08] font-medium sm:text-5xl lg:text-[3.4rem]">{title}</h2>
      {text && <p className="mt-5 max-w-xl text-[0.95rem] font-light text-mute" style={center ? { marginInline: "auto" } : undefined}>{text}</p>}
    </Reveal>
  );
}

export function Diamond({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 56" className={className} fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round" aria-hidden="true">
      <path d="M16 4h32l14 17L32 52 2 21 16 4Z" />
      <path d="M2 21h60M22 4l-6 17 16 31 16-31-6-17M22 4l10 17L42 4" strokeWidth="1.8" />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <a href="#anasayfa" aria-label="Black Diamond VIP Beauty anasayfa" className={cn("flex items-center gap-3", className)}>
      <Diamond className="h-7 w-8 text-gold drop-shadow-[0_0_10px_rgba(212,175,55,0.6)]" />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.28rem] font-semibold tracking-[0.22em]">BLACK DIAMOND</span>
        <span className="mt-1 text-[0.58rem] font-medium tracking-[0.5em] text-gold">VIP BEAUTY</span>
      </span>
    </a>
  );
}
