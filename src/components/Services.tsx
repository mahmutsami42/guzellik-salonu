import { ArrowUpRight } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import { services, WA_GENERAL } from "../data";
import { useBooking } from "../lib/booking";
import { Reveal, SectionHead } from "./ui";

export default function Services() {
  const open = useBooking();
  return (
    <section id="hizmetler" className="relative py-24 lg:py-32">
      <div className="hairline absolute inset-x-0 top-0 mx-auto w-[min(1280px,100%-48px)]" />
      <div className="mx-auto w-[min(1280px,100%-32px)] sm:w-[min(1280px,100%-48px)]">
        <SectionHead
          eyebrow="Hizmetlerimiz"
          title={
            <>
              Size özel <span className="gold-text italic">VIP bakım</span> deneyimi
            </>
          }
          text="Her uygulama kişiye özel planlanır. Konfor, hijyen ve kalıcı sonuç odağında hazırlanan protokollerle tanışın."
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.name} delay={(i % 3) * 100}>
              <article className="group relative h-full overflow-hidden rounded-[24px] border border-gold/20 bg-ink-2 transition-all duration-500 hover:-translate-y-2 hover:border-gold/60 hover:shadow-[0_30px_70px_rgba(0,0,0,0.6),0_0_40px_rgba(212,175,55,0.12)]">
                <div className="relative aspect-[4/3.3] overflow-hidden">
                  <img
                    src={s.img}
                    alt={s.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-2 via-ink-2/10 to-transparent" />
                  <span className="font-display absolute top-4 left-5 text-4xl leading-none text-white/25 italic">0{i + 1}</span>
                  <span className="absolute bottom-4 left-5 rounded-full border border-ice/35 bg-ink/60 px-3.5 py-1 text-[0.68rem] font-medium tracking-wide text-ice backdrop-blur">
                    {s.tag}
                  </span>
                </div>
                <div className="flex flex-col p-7 pt-5">
                  <h3 className="font-display text-[1.7rem] leading-tight font-medium">{s.title}</h3>
                  <p className="mt-3 mb-6 text-[0.9rem] leading-relaxed font-light text-mute">{s.desc}</p>
                  <button
                    onClick={() => open(s.name)}
                    className="inline-flex items-center gap-2 self-start border-b border-gold/40 pb-1 text-[0.72rem] font-semibold tracking-[0.16em] text-gold uppercase transition-colors hover:border-gold-light hover:text-gold-light"
                  >
                    Bilgi ve randevu <ArrowUpRight size={14} />
                  </button>
                </div>
              </article>
            </Reveal>
          ))}

          <Reveal delay={200}>
            <article className="relative flex h-full min-h-[320px] flex-col justify-center overflow-hidden rounded-[24px] border border-gold/50 bg-gradient-to-br from-gold/[0.16] via-ink-2 to-ink-2 p-8">
              <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-gold/20 blur-3xl" aria-hidden="true" />
              <span className="eyebrow relative">Size özel plan</span>
              <h3 className="font-display relative mt-4 text-3xl leading-tight font-medium">Hangi bakım size uygun?</h3>
              <p className="relative mt-3 mb-7 text-[0.9rem] font-light text-white/70">Uzman ekibimize yazın, ihtiyacınıza göre planlayalım.</p>
              <a href={WA_GENERAL} target="_blank" rel="noopener noreferrer" className="btn btn-gold relative self-start">
                <FaWhatsapp size={18} /> WhatsApp'tan Yazın
              </a>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
