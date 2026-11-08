import { useEffect, useRef, useState, type FormEvent } from "react";
import { FaWhatsapp, FaInstagram } from "react-icons/fa6";
import { X, Lock } from "lucide-react";
import { BRAND } from "../data";
import { sendInstagram, sendWhatsApp } from "../lib/messaging";
import { ServiceOptions } from "./QuickBooking";

function digitsOf(v: string) {
  let d = v.replace(/\D/g, "");
  if (d.startsWith("90") && d.length > 10) d = d.slice(2);
  if (d.length === 10 && d[0] === "5") d = "0" + d;
  return d.slice(0, 11);
}
const fmtPhone = (d: string) => [d.slice(0, 4), d.slice(4, 7), d.slice(7, 9), d.slice(9, 11)].filter(Boolean).join(" ");

interface Props {
  open: boolean;
  preselect: string;
  onClose: () => void;
}

export default function BookingModal({ open, preselect, onClose }: Props) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [note, setNote] = useState("");
  const [errs, setErrs] = useState<{ name?: string; phone?: string; service?: string }>({});
  const boxRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const serviceRef = useRef<HTMLSelectElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    lastFocus.current = document.activeElement as HTMLElement;
    setService(preselect);
    setErrs({});
    document.body.classList.add("lock");
    const t = setTimeout(() => (name ? phoneRef : nameRef).current?.focus(), 60);
    return () => {
      clearTimeout(t);
      document.body.classList.remove("lock");
      lastFocus.current?.focus?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, preselect]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") return onClose();
      if (e.key !== "Tab" || !boxRef.current) return;
      const f = [...boxRef.current.querySelectorAll<HTMLElement>("button, input, select, textarea, a[href]")].filter((x) => !(x as HTMLButtonElement).disabled && x.offsetParent !== null);
      if (!f.length) return;
      const first = f[0],
        last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const validate = () => {
    const e: typeof errs = {};
    if (name.trim().length < 3) e.name = "Lütfen adınızı ve soyadınızı yazın.";
    if (!/^0?5\d{9}$/.test(digitsOf(phone))) e.phone = "Geçerli bir cep telefonu girin (05XX XXX XX XX).";
    if (!service) e.service = "Lütfen bir hizmet veya paket seçin.";
    setErrs(e);
    if (e.name) nameRef.current?.focus();
    else if (e.phone) phoneRef.current?.focus();
    else if (e.service) serviceRef.current?.focus();
    return !Object.keys(e).length;
  };

  const buildMessage = () => {
    const lines = [
      `Merhaba ${BRAND} 👋`,
      "Web siteniz üzerinden randevu talebi oluşturuyorum:",
      "",
      "👤 Ad Soyad: " + name.trim(),
      "📞 Telefon: " + fmtPhone(digitsOf(phone)),
      "💎 Hizmet / Paket: " + service,
    ];
    if (date) {
      const [y, m, d] = date.split("-").map(Number);
      const dt = new Date(y, m - 1, d);
      lines.push(`📅 Tarih: ${String(d).padStart(2, "0")}.${String(m).padStart(2, "0")}.${y} (${dt.toLocaleDateString("tr-TR", { weekday: "long" })})`);
    }
    if (time) lines.push("⏰ Saat: " + time);
    if (note.trim()) lines.push("📝 Not: " + note.trim());
    lines.push("", "Uygunluk ve detaylar için dönüş yapabilir misiniz? Teşekkürler 🙏");
    return lines.join("\n");
  };

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const ch = ((e.nativeEvent as SubmitEvent).submitter as HTMLButtonElement | null)?.dataset.channel || "wa";
    if (!validate()) return;
    const msg = buildMessage();
    if (ch === "ig") sendInstagram(msg);
    else sendWhatsApp(msg);
    onClose();
    setName("");
    setPhone("");
    setService("");
    setDate("");
    setTime("");
    setNote("");
  };

  if (!open) return null;
  const minDate = new Date().toLocaleDateString("sv-SE");
  const label = "mb-2 block text-xs font-medium text-white/85";
  const err = "mt-1.5 block text-xs text-[#ff8d99]";

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="mTitle">
      <div className="absolute inset-0 bg-black/75 backdrop-blur-md" onClick={onClose} />
      <div ref={boxRef} className="glass relative max-h-[calc(100svh-32px)] w-[min(580px,100%)] overflow-auto rounded-[28px] bg-[#121216]/90 p-7 shadow-[0_40px_100px_rgba(0,0,0,0.8),0_0_60px_rgba(212,175,55,0.12)] sm:p-10">
        <button type="button" onClick={onClose} aria-label="Kapat" className="absolute top-5 right-5 grid h-10 w-10 place-items-center rounded-full border border-gold/25 bg-white/5 transition hover:rotate-90 hover:bg-gold hover:text-black">
          <X size={18} />
        </button>
        <span className="eyebrow">Randevu</span>
        <h3 id="mTitle" className="font-display mt-3 mb-2 text-3xl font-medium sm:text-4xl">
          Randevu &amp; Teklif Talebi
        </h3>
        <p className="mb-7 text-sm font-light text-mute">Formu doldurun; mesajınız otomatik hazırlanır ve seçtiğiniz kanaldan iletilir.</p>

        <form onSubmit={submit} noValidate autoComplete="on" className="grid gap-4">
          <div>
            <label htmlFor="fName" className={label}>Ad Soyad</label>
            <input ref={nameRef} id="fName" type="text" autoComplete="name" placeholder="Adınız ve soyadınız" className="field-input" value={name} aria-invalid={!!errs.name} onChange={(e) => { setName(e.target.value); setErrs((x) => ({ ...x, name: undefined })); }} />
            <span className={err} role="alert">{errs.name}</span>
          </div>
          <div>
            <label htmlFor="fPhone" className={label}>Telefon Numarası</label>
            <input ref={phoneRef} id="fPhone" type="tel" inputMode="tel" autoComplete="tel" placeholder="05XX XXX XX XX" className="field-input" value={phone} aria-invalid={!!errs.phone}
              onChange={(e) => {
                const raw = e.target.value;
                const d = raw.replace(/\D/g, "").startsWith("90") ? digitsOf(raw) : raw.replace(/\D/g, "").slice(0, 11);
                setPhone(fmtPhone(d));
                setErrs((x) => ({ ...x, phone: undefined }));
              }} />
            <span className={err} role="alert">{errs.phone}</span>
          </div>
          <div>
            <label htmlFor="fService" className={label}>Hizmet / Paket</label>
            <select ref={serviceRef} id="fService" className="field-input" value={service} aria-invalid={!!errs.service} onChange={(e) => { setService(e.target.value); setErrs((x) => ({ ...x, service: undefined })); }}>
              <ServiceOptions placeholder />
            </select>
            <span className={err} role="alert">{errs.service}</span>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="fDate" className={label}>Tercih edilen tarih</label>
              <input id="fDate" type="date" min={minDate} className="field-input" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>
            <div>
              <label htmlFor="fTime" className={label}>Tercih edilen saat</label>
              <input id="fTime" type="time" className="field-input" value={time} onChange={(e) => setTime(e.target.value)} />
            </div>
          </div>
          <div>
            <label htmlFor="fNote" className={label}>Notunuz (isteğe bağlı)</label>
            <textarea id="fNote" placeholder="Eklemek istediğiniz bir şey var mı?" className="field-input min-h-[80px] resize-y" value={note} onChange={(e) => setNote(e.target.value)} />
          </div>
          <div className="mt-1 grid gap-3 sm:grid-cols-2">
            <button type="submit" data-channel="wa" className="btn btn-wa btn-sm !h-[50px]">
              <FaWhatsapp size={16} className="text-wa" /> WhatsApp ile gönder
            </button>
            <button type="submit" data-channel="ig" className="btn btn-ig btn-sm !h-[50px]">
              <FaInstagram size={16} className="text-[#ff6b9c]" /> Instagram ile gönder
            </button>
          </div>
          <p className="flex items-start justify-center gap-1.5 text-center text-[0.72rem] leading-relaxed text-mute">
            <Lock size={12} className="mt-0.5 shrink-0 text-ice" />
            Bilgileriniz yalnızca mesajı oluşturmak için kullanılır; bu sitede saklanmaz. Tarih ve saat tercihtir, onay için sizinle iletişime geçilir.
          </p>
        </form>
      </div>
    </div>
  );
}
