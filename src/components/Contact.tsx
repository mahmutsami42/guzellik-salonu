import { useEffect, useRef, useState } from "react";
import { FaWhatsapp, FaInstagram, FaApple, FaWaze } from "react-icons/fa6";
import { Phone, Route, MapPin, UserRound, Map as MapIcon, Loader2 } from "lucide-react";
import { ADDRESS, IG_URL, IG_USER, MAP_Q, OWNER, PHONE_DISPLAY, PHONE_TEL, WA_GENERAL } from "../data";
import { copyText, toast } from "../lib/messaging";
import { Reveal, SectionHead } from "./ui";
import { cn } from "../utils/cn";

const q = encodeURIComponent(MAP_Q);
const links = {
  gDir: "https://www.google.com/maps/dir/?api=1&destination=" + q,
  gOpen: "https://www.google.com/maps/search/?api=1&query=" + q,
  apple: "https://maps.apple.com/?q=" + q,
  waze: "https://waze.com/ul?q=" + q + "&navigate=yes",
  embed: "https://www.google.com/maps?q=" + q + "&hl=tr&z=16&output=embed",
};

function MapBox() {
  const [state, setState] = useState<"idle" | "loading" | "loaded" | "failed">("idle");
  const timer = useRef<number>(0);

  const load = () => {
    setState("loading");
    timer.current = window.setTimeout(() => {
      setState((s) => {
        if (s === "loading") {
          toast("Harita bu cihazda yüklenemedi. Yol tarifi butonlarını kullanabilirsiniz.", { ms: 6000, bad: true });
          return "failed";
        }
        return s;
      });
    }, 9000);
  };
  useEffect(() => () => clearTimeout(timer.current), []);

  return (
    <div className="glass flex min-h-[460px] flex-col overflow-hidden rounded-[26px] p-0">
      <div
        className="relative min-h-[380px] flex-1"
        style={{
          background:
            "linear-gradient(rgba(212,175,55,.06) 1px,transparent 1px) 0 0/44px 44px,linear-gradient(90deg,rgba(212,175,55,.06) 1px,transparent 1px) 0 0/44px 44px,radial-gradient(circle at 50% 45%,rgba(212,175,55,.14),transparent 60%),#0c0c0f",
        }}
      >
        {state !== "loaded" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2.5 p-6 text-center">
            <span className="gold-bg grid h-16 w-16 place-items-center rounded-full text-[#1a1200] shadow-[0_0_0_8px_rgba(212,175,55,0.15),0_0_40px_rgba(212,175,55,0.5)]">
              <MapPin size={26} />
            </span>
            <b className="font-display mt-3 text-2xl font-medium">My Office Plaza A2 Blok</b>
            <span className="max-w-[300px] text-[0.84rem] text-mute">Karatay / Konya, Akabe mah. Yeniceler cad. No:145</span>
            <button type="button" disabled={state === "loading"} onClick={load} className="btn btn-ghost btn-sm mt-3">
              {state === "loading" ? <Loader2 size={16} className="animate-spin" /> : <MapIcon size={16} />}
              {state === "loading" ? "Harita yükleniyor…" : state === "failed" ? "Tekrar dene" : "Haritayı bu sayfada göster"}
            </button>
          </div>
        )}
        {(state === "loading" || state === "loaded") && (
          <iframe
            title="Black Diamond VIP Beauty konumu – My Office Plaza, Karatay / Konya"
            src={links.embed}
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            onLoad={() => {
              clearTimeout(timer.current);
              setState("loaded");
            }}
            className={cn("absolute inset-0 h-full w-full border-0 transition-opacity duration-500 [filter:invert(92%)_hue-rotate(180deg)_saturate(.65)_contrast(.95)]", state === "loaded" ? "opacity-100" : "opacity-0")}
          />
        )}
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gold/20 bg-ink/90 px-5 py-4 text-[0.78rem] text-mute">
        <span>
          Harita görünmüyorsa{" "}
          <a href={links.gOpen} target="_blank" rel="noopener noreferrer" className="font-medium text-gold hover:underline">
            Google Haritalar'da açın
          </a>
        </span>
        <span className="flex items-center gap-1.5">
          <MapPin size={13} className="text-gold" /> Karatay / Konya
        </span>
      </div>
    </div>
  );
}

function Row({ icon: Icon, label, children }: { icon: typeof Phone; label: string; children: React.ReactNode }) {
  return (
    <div className="mb-6 flex gap-4">
      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-gold/30 bg-gold/[0.07] text-gold">
        <Icon size={19} strokeWidth={1.6} />
      </span>
      <div>
        <small className="mb-0.5 block text-[0.68rem] tracking-[0.18em] text-mute uppercase">{label}</small>
        {children}
      </div>
    </div>
  );
}

export default function Contact() {
  return (
    <section id="iletisim" className="relative py-24 lg:py-32">
      <div className="hairline absolute inset-x-0 top-0 mx-auto w-[min(1280px,100%-48px)]" />
      <div className="mx-auto w-[min(1280px,100%-32px)] sm:w-[min(1280px,100%-48px)]">
        <SectionHead
          eyebrow="İletişim"
          title={
            <>
              Bizi <span className="gold-text italic">ziyaret</span> edin
            </>
          }
          text="Randevu ve detaylı bilgi için WhatsApp'tan, telefonla veya Instagram'dan ulaşabilirsiniz."
        />

        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal className="glass flex flex-col rounded-[26px] p-7 sm:p-10">
            <h3 className="font-display mb-8 text-3xl font-medium">İletişim bilgileri</h3>
            <Row icon={UserRound} label="Yetkili">
              <span className="text-[0.95rem]">{OWNER}</span>
            </Row>
            <Row icon={MapPin} label="Adres">
              <span id="addrText" className="text-[0.95rem] leading-relaxed">{ADDRESS}</span>
              <br />
              <button
                type="button"
                onClick={() => {
                  const ok = copyText(ADDRESS);
                  toast(ok ? "Adres kopyalandı." : "Adres kopyalanamadı, lütfen elle seçin.", { ms: 3000, bad: !ok });
                }}
                className="mt-2 border-b border-gold/35 text-[0.78rem] font-medium text-gold hover:border-gold-light"
              >
                Adresi kopyala
              </button>
            </Row>
            <Row icon={Phone} label="Telefon / WhatsApp">
              <a href={PHONE_TEL} className="text-[0.95rem] transition hover:text-gold">
                {PHONE_DISPLAY}
              </a>
            </Row>

            <div className="mt-auto grid gap-2.5 pt-3 sm:grid-cols-2">
              <a href={links.gDir} target="_blank" rel="noopener noreferrer" className="btn btn-gold sm:col-span-2 max-sm:h-auto max-sm:py-4 max-sm:whitespace-normal">
                <Route size={17} /> Google Haritalar'da yol tarifi al
              </a>
              <a href={links.apple} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm">
                <FaApple size={16} /> Apple Haritalar
              </a>
              <a href={links.waze} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm">
                <FaWaze size={16} /> Waze
              </a>
              <a href={WA_GENERAL} target="_blank" rel="noopener noreferrer" className="btn btn-wa btn-sm">
                <FaWhatsapp size={16} className="text-wa" /> WhatsApp
              </a>
              <a href={PHONE_TEL} className="btn btn-ghost btn-sm">
                <Phone size={15} /> Hemen ara
              </a>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <MapBox />
          </Reveal>
        </div>

        <Reveal className="glass relative mt-6 flex flex-wrap items-center gap-6 overflow-hidden rounded-[26px] border-gold/45 p-7 sm:p-9">
          <span
            className="grid h-[68px] w-[68px] shrink-0 place-items-center rounded-full text-white shadow-[0_0_0_4px_rgba(212,175,55,0.35),0_0_36px_rgba(214,36,159,0.4)]"
            style={{ background: "radial-gradient(circle at 30% 107%,#fdf497 0%,#fd5949 45%,#d6249f 60%,#285AEB 90%)" }}
          >
            <FaInstagram size={32} />
          </span>
          <div className="min-w-[240px] flex-1">
            <h3 className="font-display text-2xl leading-tight font-medium sm:text-[1.9rem]">Sorularınız ve anında randevu için Instagram'dan ulaşın</h3>
            <span className="mt-1 block text-[0.9rem] font-medium text-gold">@{IG_USER}</span>
          </div>
          <a href={IG_URL} target="_blank" rel="noopener noreferrer" title="BLACK DIAMOND VIP BEAUTY Instagram'dan Yazın" className="btn btn-gold max-sm:w-full">
            <FaInstagram size={17} /> Instagram'dan Yazın
          </a>
        </Reveal>
      </div>
    </section>
  );
}
