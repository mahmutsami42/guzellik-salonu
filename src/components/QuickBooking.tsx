import { useMemo, useState } from "react";
import { FaWhatsapp, FaInstagram } from "react-icons/fa6";
import { MessageSquareText, Phone } from "lucide-react";
import { GENERAL, PHONE_DISPLAY, PHONE_TEL, packageLabel, packages, services } from "../data";
import { messageFor, sendInstagram, sendWhatsApp } from "../lib/messaging";
import { Reveal } from "./ui";

export function ServiceOptions({ placeholder }: { placeholder?: boolean }) {
  return (
    <>
      {placeholder && <option value="">Seçiniz…</option>}
      <optgroup label="Kampanya paketleri">
        {packages.map((p) => (
          <option key={p.name} value={packageLabel(p)}>
            {p.name.replace(/\s*\(.*?\)/, "")} – {p.price}
          </option>
        ))}
      </optgroup>
      <optgroup label="Hizmetler">
        {services.map((s) => (
          <option key={s.name} value={s.name}>
            {s.name}
          </option>
        ))}
      </optgroup>
      <optgroup label="Diğer">
        <option value={GENERAL}>{GENERAL}</option>
      </optgroup>
    </>
  );
}

function renderBubble(msg: string) {
  return msg.split("\n").map((line, i) => (
    <span key={i}>
      {line.split(/(\*[^*]+\*)/g).map((part, j) =>
        part.startsWith("*") && part.endsWith("*") ? (
          <strong key={j} className="font-semibold text-white">
            {part.slice(1, -1)}
          </strong>
        ) : (
          part
        ),
      )}
      <br />
    </span>
  ));
}

export default function QuickBooking() {
  const [value, setValue] = useState(packageLabel(packages[0]));
  const msg = useMemo(() => messageFor(value), [value]);

  return (
    <section aria-label="Hızlı randevu" className="relative z-10 -mt-32 pb-8">
      <div className="mx-auto w-[min(1280px,100%-32px)] sm:w-[min(1280px,100%-48px)]">
        <Reveal className="glass overflow-hidden rounded-[28px] shadow-[0_40px_90px_rgba(0,0,0,0.6),0_0_60px_rgba(212,175,55,0.08)]">
          <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[0.9fr_1.1fr_0.8fr] lg:gap-10 lg:p-10">
            <div>
              <span className="eyebrow">Hızlı Randevu</span>
              <h2 className="font-display mt-4 text-3xl leading-tight font-medium sm:text-[2.2rem]">Seçin, mesajınız otomatik hazırlansın</h2>
              <label htmlFor="qService" className="mt-6 mb-2 block text-xs font-medium tracking-wide text-white/80">
                Hizmet veya paket
              </label>
              <select id="qService" className="field-input" value={value} onChange={(e) => setValue(e.target.value)}>
                <ServiceOptions />
              </select>
            </div>

            <div className="rounded-2xl border border-dashed border-white/12 bg-black/35 p-5">
              <div className="mb-3 flex items-center justify-between text-[0.68rem] tracking-wide text-mute">
                <span className="flex items-center gap-2">
                  <MessageSquareText size={14} className="text-ice" /> Gönderilecek mesaj
                </span>
                <span>Önizleme</span>
              </div>
              <div className="ml-auto max-w-[96%] rounded-2xl rounded-br-sm border border-wa/30 bg-gradient-to-br from-[#0f3d2b] to-[#0b2f22] px-4 py-3.5 text-[0.82rem] leading-relaxed break-words text-[#e7f7ee]">
                {renderBubble(msg)}
              </div>
            </div>

            <div className="flex flex-col justify-center gap-3">
              <button type="button" className="btn btn-wa" onClick={() => sendWhatsApp(msg)}>
                <FaWhatsapp size={18} className="text-wa" /> WhatsApp'tan Gönder
              </button>
              <button type="button" className="btn btn-ig" onClick={() => sendInstagram(msg)}>
                <FaInstagram size={18} className="text-[#ff6b9c]" /> Instagram'dan Gönder
              </button>
              <p className="mt-1 flex items-center justify-center gap-2 text-center text-xs text-mute">
                <Phone size={13} className="text-gold" /> Telefonla ulaşmak için{" "}
                <a href={PHONE_TEL} className="text-gold hover:underline">
                  {PHONE_DISPLAY}
                </a>
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
