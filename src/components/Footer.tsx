import { FaInstagram, FaWhatsapp } from "react-icons/fa6";
import { MapPin, Phone, UserRound } from "lucide-react";
import { ADDRESS, IG_URL, IG_USER, OWNER, PHONE_DISPLAY, PHONE_TEL, WA_GENERAL } from "../data";
import { Logo } from "./ui";

const pages = [
  { href: "#hizmetler", label: "Hizmetlerimiz" },
  { href: "#fiyatlar", label: "Kampanyalar & Fiyatlar" },
  { href: "#oncesi-sonrasi", label: "Öncesi / Sonrası" },
  { href: "#sss", label: "Sık sorulan sorular" },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-gold/20 bg-[#050506] pt-16 pb-8">
      <div className="mx-auto w-[min(1280px,100%-32px)] sm:w-[min(1280px,100%-48px)]">
        <div className="mb-12 grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.3fr]">
          <div>
            <Logo />
            <p className="mt-6 max-w-sm text-[0.88rem] leading-relaxed font-light text-mute">
              Karatay / Konya'da buz başlık lazer epilasyon, medikal cilt bakımı ve estetik çözümler sunan VIP güzellik merkezi.
            </p>
            <div className="mt-6 flex gap-3">
              <a href={IG_URL} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="grid h-11 w-11 place-items-center rounded-full border border-gold/30 text-gold transition hover:bg-gold hover:text-black">
                <FaInstagram size={18} />
              </a>
              <a href={WA_GENERAL} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="grid h-11 w-11 place-items-center rounded-full border border-gold/30 text-gold transition hover:bg-gold hover:text-black">
                <FaWhatsapp size={18} />
              </a>
              <a href={PHONE_TEL} aria-label="Ara" className="grid h-11 w-11 place-items-center rounded-full border border-gold/30 text-gold transition hover:bg-gold hover:text-black">
                <Phone size={17} />
              </a>
            </div>
          </div>
          <div>
            <h4 className="mb-5 text-[0.72rem] font-semibold tracking-[0.24em] text-white uppercase">Sayfalar</h4>
            <ul className="m-0 grid list-none gap-3 p-0">
              {pages.map((p) => (
                <li key={p.href}>
                  <a href={p.href} className="text-[0.88rem] text-mute transition hover:text-gold">
                    {p.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-5 text-[0.72rem] font-semibold tracking-[0.24em] text-white uppercase">İletişim</h4>
            <ul className="m-0 grid list-none gap-3.5 p-0 text-[0.88rem] text-mute">
              <li className="flex gap-3">
                <UserRound size={16} className="mt-1 shrink-0 text-gold" /> {OWNER}
              </li>
              <li className="flex gap-3">
                <MapPin size={16} className="mt-1 shrink-0 text-gold" /> {ADDRESS.replace(", Turkey", "")}
              </li>
              <li className="flex gap-3">
                <Phone size={16} className="mt-1 shrink-0 text-gold" />
                <a href={PHONE_TEL} className="transition hover:text-gold">
                  {PHONE_DISPLAY}
                </a>
              </li>
              <li className="flex gap-3">
                <FaInstagram size={16} className="mt-1 shrink-0 text-gold" />
                <a href={IG_URL} target="_blank" rel="noopener noreferrer" className="transition hover:text-gold">
                  @{IG_USER}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-wrap justify-between gap-2 border-t border-white/[0.08] pt-6 text-[0.76rem] text-mute">
          <span>© {new Date().getFullYear()} Black Diamond VIP Beauty. Tüm hakları saklıdır.</span>
          <span>Karatay / Konya</span>
        </div>
      </div>
    </footer>
  );
}
