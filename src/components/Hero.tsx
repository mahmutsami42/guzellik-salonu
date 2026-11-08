import { useEffect, useRef, useState } from "react";
import { FaInstagram } from "react-icons/fa6";
import { Star, Tags, ChevronDown, Snowflake } from "lucide-react";
import hero from "../assets/hero.jpg";
import { IG_URL } from "../data";
import { Reveal } from "./ui";

function Counter({ to, dec = 0, prefix = "", suffix = "" }: { to: number; dec?: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const fmt = (v: number) => prefix + v.toLocaleString("tr-TR", { minimumFractionDigits: dec, maximumFractionDigits: dec }) + suffix;
  const [text, setText] = useState(fmt(to));
  useEffect(() => {
    const el = ref.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setText(fmt(0));
    const io = new IntersectionObserver(
      (es) => {
        if (!es[0].isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const step = (t: number) => {
          const p = Math.min((t - t0) / 1800, 1);
          setText(fmt(to * (1 - Math.pow(1 - p, 3))));
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <span ref={ref}>{text}</span>;
}

const stats = [
  { node: <Counter to={11.8} dec={1} suffix=" Bin+" />, label: "Takipçi & Memnun Danışan" },
  { node: <Counter to={100} prefix="%" />, label: "Kişiye Özel VIP Hijyen & Bakım" },
  { node: <Counter to={8} suffix="+" />, label: "Aşama Medikal Cilt Bakım Protokolü" },
];

export default function Hero() {
  return (
    <section id="anasayfa" className="relative overflow-hidden pt-[130px] pb-44 lg:pt-[190px]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -right-40 h-[700px] w-[700px] rounded-full bg-gold/[0.09] blur-[140px]" />
        <div className="absolute bottom-0 -left-40 h-[500px] w-[500px] rounded-full bg-gold-deep/[0.12] blur-[140px]" />
      </div>

      <div className="relative mx-auto grid w-[min(1280px,100%-32px)] items-center gap-14 sm:w-[min(1280px,100%-48px)] lg:grid-cols-[1.12fr_0.88fr] lg:gap-20">
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2.5 rounded-full border border-gold/40 bg-gold/[0.07] px-5 py-2 text-[0.68rem] font-medium tracking-[0.14em] text-gold-light uppercase">
              <Star size={12} className="fill-gold text-gold" /> Karatay Konya'nın En Prestijli VIP Güzellik Salonu
            </span>
          </Reveal>
          <Reveal delay={90}>
            <h1 className="font-display mt-8 text-[2.9rem] leading-[1.02] font-medium sm:text-[4.2rem] lg:text-[5.4rem]">
              Güzelliğinizi <span className="gold-text italic">Sanata</span> Dönüştüren VIP Dokunuşlar
            </h1>
          </Reveal>
          <Reveal delay={180}>
            <p className="mt-8 max-w-xl text-base leading-8 font-light text-white/70 sm:text-[1.05rem]">
              Durdane Eda Coşkuner yönetiminde, son teknoloji buz başlık lazer epilasyon, medikal cilt bakımı, vücut
              şekillendirme ve estetik çözümler.
            </p>
          </Reveal>
          <Reveal delay={260} className="mt-10 flex flex-wrap gap-4">
            <a
              href={IG_URL}
              target="_blank"
              rel="noopener noreferrer"
              title="BLACK DIAMOND VIP BEAUTY Instagram'dan Yazın"
              className="btn btn-gold max-sm:w-full"
            >
              <FaInstagram size={17} /> Instagram'dan Yazın
            </a>
            <a href="#fiyatlar" className="btn btn-ghost max-sm:w-full">
              <Tags size={16} /> Canlı Fiyat Listesini İncele
            </a>
          </Reveal>

          <Reveal delay={340} className="mt-14 grid max-w-2xl grid-cols-3 border-t border-white/10 pt-8">
            {stats.map((s, i) => (
              <div key={i} className={i > 0 ? "border-l border-white/10 pl-4 sm:pl-7" : "pr-4 sm:pr-7"}>
                <span className="font-display gold-text block text-[1.7rem] leading-none font-semibold whitespace-nowrap sm:text-[2.6rem]">
                  {s.node}
                </span>
                <span className="mt-3 block text-[0.62rem] leading-snug tracking-wide text-mute sm:text-[0.74rem]">{s.label}</span>
              </div>
            ))}
          </Reveal>
        </div>

        <Reveal delay={200} className="relative mx-auto w-full max-w-[440px] lg:max-w-none">
          <div className="absolute -inset-5 rounded-t-[999px] rounded-b-[40px] border border-gold/25" aria-hidden="true" />
          <div className="relative aspect-[4/5.2] overflow-hidden rounded-t-[999px] rounded-b-[32px] border border-gold/50 shadow-[0_40px_100px_rgba(0,0,0,0.7),0_0_80px_rgba(212,175,55,0.12)]">
            <img src={hero} alt="Black Diamond VIP Beauty – ışıl ışıl cilt" className="h-full w-full object-cover object-top" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
          </div>
          <div className="glass animate-float absolute top-[28%] -left-4 flex items-center gap-3 rounded-2xl px-4 py-3 shadow-2xl sm:-left-10">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-ice/10 text-ice">
              <Snowflake size={20} />
            </span>
            <span className="text-[0.72rem] leading-tight">
              <b className="block text-[0.8rem] font-semibold">Buz Başlık</b>
              <span className="text-mute">Ağrısız lazer teknolojisi</span>
            </span>
          </div>
          <div className="glass absolute -right-2 bottom-12 rounded-2xl px-5 py-4 text-center shadow-2xl sm:-right-8">
            <span className="font-display gold-text block text-3xl leading-none font-semibold">VIP</span>
            <span className="mt-1 block text-[0.62rem] tracking-[0.22em] text-mute uppercase">Konfor & Hijyen</span>
          </div>
        </Reveal>
      </div>

      <a href="#hizmetler" aria-label="Aşağı kaydır" className="absolute bottom-24 left-1/2 hidden -translate-x-1/2 text-gold/60 transition hover:text-gold lg:block">
        <ChevronDown size={26} className="animate-bounce" />
      </a>
    </section>
  );
}
