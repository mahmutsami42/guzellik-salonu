import { Snowflake, ShieldCheck, Sparkles, MapPin } from "lucide-react";
import body from "../assets/body.jpg";
import { OWNER } from "../data";
import { Reveal, SectionHead } from "./ui";

const features = [
  { icon: Snowflake, title: "Buz başlık lazer teknolojisi", text: "Ağrısız, acısız, 4 mevsim uygulanabilir." },
  { icon: ShieldCheck, title: "Kişiye özel hijyen ve bakım", text: "Her uygulama kişiye özel planlanır." },
  { icon: Sparkles, title: "Medikal cilt bakım protokolleri", text: "8+ aşamalı protokollerle derinlemesine bakım." },
  { icon: MapPin, title: "Karatay / Konya", text: "My Office Plaza A2 Blok, Akabe mah. Yeniceler cad." },
];

export default function About() {
  return (
    <section id="hakkimizda" className="relative py-24 lg:py-32">
      <div className="mx-auto grid w-[min(1280px,100%-32px)] items-center gap-14 sm:w-[min(1280px,100%-48px)] lg:grid-cols-2 lg:gap-24">
        <Reveal className="relative">
          <div className="absolute -bottom-5 -left-5 h-full w-full rounded-[28px] border border-gold/25" aria-hidden="true" />
          <div className="relative aspect-[5/4.4] overflow-hidden rounded-[28px] border border-gold/40">
            <img src={body} alt="Black Diamond VIP Beauty bakım odası ambiyansı" loading="lazy" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-tr from-ink/50 to-transparent" />
          </div>
          <div className="glass absolute -right-3 -bottom-8 max-w-[260px] rounded-2xl p-5 sm:-right-8">
            <p className="font-display text-xl leading-snug italic">"Konfor, hijyen ve kalıcı sonuç."</p>
            <p className="mt-3 text-[0.68rem] tracking-[0.2em] text-gold uppercase">{OWNER}</p>
          </div>
        </Reveal>

        <div>
          <SectionHead
            eyebrow="VIP Deneyim"
            title={
              <>
                <span className="gold-text italic">{OWNER}</span> yönetiminde size özel bakım
              </>
            }
            text="Her uygulama kişiye özel planlanır. Konfor, hijyen ve kalıcı sonuç odağında hazırlanan protokollerle tanışın."
          />
          <ul className="m-0 grid list-none gap-6 p-0 sm:grid-cols-2">
            {features.map((f, i) => (
              <Reveal as="li" key={f.title} delay={i * 80} className="flex gap-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-gold/35 bg-gold/[0.06] text-gold">
                  <f.icon size={20} strokeWidth={1.6} />
                </span>
                <span>
                  <b className="block text-[0.9rem] leading-snug font-semibold">{f.title}</b>
                  <span className="mt-1 block text-[0.82rem] leading-relaxed font-light text-mute">{f.text}</span>
                </span>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
