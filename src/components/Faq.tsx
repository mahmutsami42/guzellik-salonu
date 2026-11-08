import { Plus } from "lucide-react";
import { faqs, PHONE_DISPLAY, PHONE_TEL } from "../data";
import { Reveal, SectionHead } from "./ui";

function Answer({ a }: { a: string }) {
  // Telefon ve iletişim bölümü bağlantılarını canlandır
  const parts = a.split(PHONE_DISPLAY);
  if (parts.length > 1) {
    return (
      <>
        {parts[0]}
        <a href={PHONE_TEL} className="text-gold hover:underline">
          {PHONE_DISPLAY}
        </a>
        {parts[1]}
      </>
    );
  }
  if (a.includes("iletişim bölümüne")) {
    const [pre, post] = a.split("iletişim bölümüne");
    return (
      <>
        {pre}
        <a href="#iletisim" className="text-gold hover:underline">
          iletişim bölümüne
        </a>
        {post}
      </>
    );
  }
  return <>{a}</>;
}

export default function Faq() {
  return (
    <section id="sss" className="relative py-24 lg:py-32">
      <div className="hairline absolute inset-x-0 top-0 mx-auto w-[min(1280px,100%-48px)]" />
      <div className="mx-auto grid w-[min(1280px,100%-32px)] gap-10 sm:w-[min(1280px,100%-48px)] lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHead
            eyebrow="SSS"
            title={
              <>
                Sık sorulan <span className="gold-text italic">sorular</span>
              </>
            }
            text="Randevu ve iletişimle ilgili merak edilenler."
          />
        </div>
        <Reveal>
          {faqs.map((f, i) => (
            <details
              key={f.q}
              open={i === 0}
              className="group mb-3 rounded-2xl border border-white/[0.08] bg-ink-2/80 transition-colors open:border-gold/40"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 text-[0.98rem] font-medium marker:content-none [&::-webkit-details-marker]:hidden">
                <span className="flex items-center gap-4">
                  <span className="font-display text-xl text-gold/60 italic">0{i + 1}</span> {f.q}
                </span>
                <Plus size={20} className="shrink-0 text-gold transition-transform duration-300 group-open:rotate-45" />
              </summary>
              <div className="px-6 pb-6 pl-[4.4rem] text-[0.92rem] leading-relaxed font-light text-mute">
                <Answer a={f.a} />
              </div>
            </details>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
