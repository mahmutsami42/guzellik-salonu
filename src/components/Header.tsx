import { useEffect, useState } from "react";
import { FaInstagram } from "react-icons/fa6";
import { MapPin, Phone, Menu, X } from "lucide-react";
import { IG_URL, IG_USER, PHONE_DISPLAY, PHONE_TEL, navLinks } from "../data";
import { Logo } from "./ui";
import { cn } from "../utils/cn";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("anasayfa");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(y > 24);
        const h = document.documentElement.scrollHeight - innerHeight;
        setProgress(h > 0 ? (y / h) * 100 : 0);
        ticking = false;
      });
    };
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    return () => removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    navLinks.forEach((l) => {
      const s = document.getElementById(l.id);
      if (s) io.observe(s);
    });
    return () => io.disconnect();
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-[100]">
      <div className="absolute top-0 left-0 z-10 h-[2px] gold-bg" style={{ width: progress + "%" }} />
      <div
        className={cn(
          "hidden overflow-hidden border-b border-white/[0.07] bg-ink/60 text-[0.72rem] tracking-wide text-mute backdrop-blur transition-all duration-300 lg:block",
          scrolled ? "h-0 border-transparent opacity-0" : "h-10 opacity-100",
        )}
      >
        <div className="mx-auto flex h-10 w-[min(1280px,100%-48px)] items-center justify-between">
          <span className="flex items-center gap-2">
            <MapPin size={13} className="text-gold" /> Karatay / Konya
          </span>
          <span className="flex items-center gap-8">
            <a href={PHONE_TEL} className="flex items-center gap-2 transition hover:text-gold">
              <Phone size={13} className="text-gold" /> {PHONE_DISPLAY}
            </a>
            <a href={IG_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 transition hover:text-gold">
              <FaInstagram size={14} className="text-gold" /> @{IG_USER}
            </a>
          </span>
        </div>
      </div>

      <div
        className={cn(
          "border-b transition-all duration-300",
          scrolled || open
            ? "border-gold/20 bg-ink/85 shadow-[0_10px_40px_rgba(0,0,0,0.45)] backdrop-blur-xl"
            : "border-transparent bg-transparent",
        )}
      >
        <div className="relative mx-auto flex h-[76px] w-[min(1280px,100%-32px)] items-center justify-between gap-6 sm:w-[min(1280px,100%-48px)]">
          <Logo />
          <nav
            id="navLinks"
            aria-label="Ana menü"
            className={cn(
              "max-xl:absolute max-xl:inset-x-[-16px] max-xl:top-full max-xl:border-b max-xl:border-gold/20 max-xl:bg-ink/97 max-xl:px-6 max-xl:pb-6 max-xl:backdrop-blur-xl sm:max-xl:inset-x-[-24px] max-xl:transition-all max-xl:duration-300",
              open ? "max-xl:visible max-xl:translate-y-0 max-xl:opacity-100" : "max-xl:invisible max-xl:-translate-y-2 max-xl:opacity-0",
            )}
          >
            <ul className="m-0 flex list-none gap-9 p-0 max-xl:flex-col max-xl:gap-0">
              {navLinks.map((l) => (
                <li key={l.id}>
                  <a
                    href={"#" + l.id}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "group relative block py-2 text-[0.72rem] font-medium tracking-[0.16em] whitespace-nowrap uppercase transition-colors max-xl:border-b max-xl:border-white/[0.07] max-xl:py-4 max-xl:text-[0.8rem]",
                      active === l.id ? "text-gold" : "text-white/75 hover:text-gold",
                    )}
                  >
                    {l.label}
                    <span
                      className={cn(
                        "absolute bottom-0 left-0 h-px bg-gold transition-all duration-300 max-xl:hidden",
                        active === l.id ? "w-full" : "w-0 group-hover:w-full",
                      )}
                    />
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex items-center gap-3">
            <a href={IG_URL} target="_blank" rel="noopener noreferrer" className="btn btn-gold btn-sm hidden sm:inline-flex">
              <FaInstagram size={16} /> Instagram DM
            </a>
            <button
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
              aria-expanded={open}
              aria-controls="navLinks"
              className="grid h-11 w-11 place-items-center rounded-full border border-gold/30 text-gold xl:hidden"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
