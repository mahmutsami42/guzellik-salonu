import { useState } from "react";
import { FaWhatsapp, FaInstagram } from "react-icons/fa6";
import { Info, Leaf, Check } from "lucide-react";
import { packages, type Pkg, type PackageGroup } from "../data";
import { packageLabel } from "../data";
import { packageMessage, sendInstagram, sendWhatsApp } from "../lib/messaging";
import { useBooking } from "../lib/booking";
import { Reveal, SectionHead } from "./ui";
import { cn } from "../utils/cn";

type Filter = "all" | PackageGroup;
const filters: { id: Filter; label: string }[] = [
  { id: "all", label: "Tüm paketler" },
  { id: "bolgesel", label: "Bölgesel paketler" },
  { id: "vucut", label: "Tüm vücut paketleri" },
];

const steps = [
  "Size uygun paketi seçin",
  "Paket adı ve fiyatıyla mesajınız otomatik oluşur",
  "WhatsApp veya Instagram'dan gönderin, size dönelim",
];

function Actions({ p, compact }: { p: Pkg; compact?: boolean }) {
  const open = useBooking();
  return (
    <>
      <div className="grid gap-2.5 sm:grid-cols-2">
        <button className="btn btn-wa btn-sm" onClick={() => sendWhatsApp(packageMessage(p))}>
          <FaWhatsapp size={16} className="text-wa" /> {compact ? "WhatsApp" : "WhatsApp'tan Yaz"}
        </button>
        <button className="btn btn-ig btn-sm" onClick={() => sendInstagram(packageMessage(p))}>
          <FaInstagram size={16} className="text-[#ff6b9c]" /> {compact ? "Instagram" : "Instagram DM"}
        </button>
      </div>
      <button
        onClick={() => open(packageLabel(p))}
        className="mt-4 self-center border-b border-gold/35 pb-0.5 text-[0.72rem] font-medium tracking-wide text-gold transition hover:border-gold-light hover:text-gold-light"
      >
        Detaylı randevu formu
      </button>
    </>
  );
}

function FeaturedCard({ p }: { p: Pkg }) {
  return (
    <article className="relative grid gap-10 overflow-hidden rounded-[28px] border border-gold/60 bg-gradient-to-br from-gold/[0.16] via-ink-2 to-ink-2 p-8 shadow-[0_30px_80px_rgba(0,0,0,0.5),0_0_70px_rgba(212,175,55,0.1)] sm:p-12 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:gap-16">
      <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-gold/25 blur-3xl" aria-hidden="true" />
      <div className="relative">
        <span className="inline-flex items-center gap-2 rounded-full border border-gold/50 bg-gold/10 px-4 py-1.5 text-[0.7rem] font-semibold tracking-[0.14em] text-gold-light uppercase">
          <Leaf size={13} /> {p.tag}
        </span>
        <h3 className="font-display mt-6 text-4xl leading-[1.08] font-medium sm:text-5xl">{p.title}</h3>
        <p className="font-display gold-text mt-3 text-2xl italic">{p.sub}</p>
        <p className="mt-5 flex items-center gap-2.5 text-[0.95rem] font-light text-white/75">
          <Check size={16} className="text-gold" /> {p.detail}
        </p>
      </div>
      <div className="relative flex flex-col">
        <div className="mb-7 flex items-baseline gap-3">
          <span className="font-display gold-text text-7xl leading-none font-semibold sm:text-[5.5rem]">{p.amount}</span>
          <span className="text-sm font-semibold tracking-[0.25em] text-gold">TL</span>
        </div>
        <Actions p={p} />
      </div>
    </article>
  );
}

function PackageCard({ p }: { p: Pkg }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[24px] border border-gold/20 bg-ink-2/90 p-7 transition-all duration-500 hover:-translate-y-1.5 hover:border-gold/60 hover:shadow-[0_30px_70px_rgba(0,0,0,0.6),0_0_40px_rgba(212,175,55,0.1)]">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="mb-5 flex items-start justify-between gap-3">
        <span className="rounded-full border border-ice/35 bg-ice/[0.06] px-3.5 py-1 text-[0.68rem] font-medium text-ice">{p.tag}</span>
        <div className="min-w-[62px] rounded-xl border border-gold/25 bg-gold/[0.06] px-3 py-2 text-center">
          <b className="font-display block text-3xl leading-none font-semibold text-gold">{p.sessions}</b>
          <small className="text-[0.62rem] tracking-wider text-mute uppercase">seans</small>
        </div>
      </div>
      <h3 className="font-display text-[1.65rem] leading-tight font-medium">{p.name}</h3>
      <p className="mt-2 mb-6 flex-1 text-[0.88rem] leading-relaxed font-light text-mute">{p.detail}</p>
      <div className="mb-6 flex items-baseline gap-2 border-t border-white/10 pt-5">
        <span className="font-display gold-text text-5xl leading-none font-semibold">{p.amount}</span>
        <span className="text-xs font-semibold tracking-[0.25em] text-gold">TL</span>
      </div>
      <Actions p={p} compact />
    </article>
  );
}

export default function Pricing() {
  const [filter, setFilter] = useState<Filter>("all");
  const featured = packages.find((p) => p.featured)!;
  const list = packages.filter((p) => !p.featured && (filter === "all" || p.group === filter));
  const showFeatured = filter === "all" || featured.group === filter;

  return (
    <section id="fiyatlar" className="relative py-24 lg:py-32">
      <div className="hairline absolute inset-x-0 top-0 mx-auto w-[min(1280px,100%-48px)]" />
      <div className="mx-auto w-[min(1280px,100%-32px)] sm:w-[min(1280px,100%-48px)]">
        <SectionHead
          eyebrow="Kampanyalar & Fiyatlar"
          title={
            <>
              Güncel <span className="gold-text italic">lazer epilasyon</span> paketleri
            </>
          }
          text="Paketin altındaki butona dokunun; paket adı ve fiyatıyla mesajınız otomatik hazırlanır."
        />

        <ol className="m-0 mb-12 grid list-none gap-4 p-0 md:grid-cols-3">
          {steps.map((s, i) => (
            <Reveal as="li" key={s} delay={i * 90} className="glass flex items-center gap-4 rounded-2xl px-5 py-4">
              <b className="gold-bg font-display grid h-10 w-10 shrink-0 place-items-center rounded-full text-xl font-semibold text-[#1a1200]">{i + 1}</b>
              <span className="text-[0.84rem] leading-snug text-white/80">{s}</span>
            </Reveal>
          ))}
        </ol>

        <div role="tablist" aria-label="Paket filtresi" className="mb-8 flex flex-wrap gap-2.5">
          {filters.map((f) => (
            <button
              key={f.id}
              role="tab"
              aria-selected={filter === f.id}
              onClick={() => setFilter(f.id)}
              className={cn(
                "rounded-full border px-6 py-2.5 text-[0.72rem] font-semibold tracking-[0.12em] uppercase transition-all",
                filter === f.id
                  ? "gold-bg border-transparent text-[#1a1200] shadow-[0_8px_26px_rgba(212,175,55,0.28)]"
                  : "border-white/10 bg-white/[0.03] text-mute hover:border-gold/40 hover:text-white",
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {showFeatured && (
            <Reveal className="md:col-span-2 lg:col-span-3">
              <FeaturedCard p={featured} />
            </Reveal>
          )}
          {list.map((p, i) => (
            <Reveal key={p.name} delay={(i % 3) * 90}>
              <PackageCard p={p} />
            </Reveal>
          ))}
        </div>

        <Reveal as="p" className="mt-10 flex items-start gap-3 text-[0.8rem] text-mute">
          <Info size={16} className="mt-0.5 shrink-0 text-gold" />
          Fiyatlar Instagram profilimizdeki güncel kampanyalarla aynıdır. Uygunluk ve güncel durum için bize yazabilirsiniz.
        </Reveal>
      </div>
    </section>
  );
}
