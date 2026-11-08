import { Diamond } from "./ui";

const items = [
  "Buz başlık lazer teknolojisi",
  "Kişiye özel hijyen ve bakım",
  "Medikal cilt bakım protokolleri",
  "Karatay / Konya",
  "Protez tırnak & nail art",
  "Kirpik lifting & kaş laminasyonu",
];

export default function Trust() {
  const row = [...items, ...items];
  return (
    <section aria-label="Öne çıkan özellikler" className="mt-14 border-y border-white/[0.07] bg-ink-2/70 py-6">
      <div className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
        <ul className="animate-marquee m-0 flex w-max list-none items-center p-0">
          {row.map((t, i) => (
            <li key={i} className="flex items-center whitespace-nowrap">
              <span className="font-display px-9 text-xl tracking-wide text-white/80 italic sm:text-2xl">{t}</span>
              <Diamond className="h-4 w-4 text-gold/70" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
