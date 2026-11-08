import { FaWhatsapp } from "react-icons/fa6";
import { CalendarCheck, Phone } from "lucide-react";
import { PHONE_TEL, WA_GENERAL } from "../data";
import { useBooking } from "../lib/booking";

export default function FloatingActions() {
  const open = useBooking();
  return (
    <>
      <a
        href={WA_GENERAL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp'tan yazın"
        className="fixed right-6 bottom-6 z-[90] hidden h-[60px] w-[60px] place-items-center rounded-full bg-gradient-to-br from-[#2be074] to-[#128c4a] text-white shadow-[0_10px_32px_rgba(37,211,102,0.4)] transition-transform hover:scale-110 md:grid"
      >
        <span className="animate-ring absolute inset-0 rounded-full border-2 border-wa" />
        <FaWhatsapp size={30} />
      </a>

      <nav
        aria-label="Hızlı iletişim"
        className="fixed inset-x-0 bottom-0 z-[95] grid grid-cols-[1fr_1.25fr_1fr] gap-2 border-t border-gold/20 bg-ink/95 px-3 pt-2.5 pb-[calc(10px+env(safe-area-inset-bottom))] backdrop-blur-xl md:hidden"
      >
        <a href={PHONE_TEL} className="flex flex-col items-center justify-center gap-1 rounded-xl border border-gold/20 bg-white/[0.04] py-2.5 text-[0.68rem] font-semibold">
          <Phone size={18} className="text-gold" /> Ara
        </a>
        <button type="button" onClick={() => open()} className="gold-bg flex flex-col items-center justify-center gap-1 rounded-xl py-2.5 text-[0.68rem] font-semibold text-[#1a1200]">
          <CalendarCheck size={18} /> Randevu Al
        </button>
        <a href={WA_GENERAL} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center gap-1 rounded-xl border border-gold/20 bg-white/[0.04] py-2.5 text-[0.68rem] font-semibold">
          <FaWhatsapp size={18} className="text-wa" /> WhatsApp
        </a>
      </nav>
    </>
  );
}
