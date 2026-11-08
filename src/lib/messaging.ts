import { BRAND, IG_DM, WA_NUMBER, GENERAL, packageLabel, packages, services, type Pkg } from "../data";

/* ---------- Toast (olay tabanlı) ---------- */
export function toast(message: string, opts: { ms?: number; bad?: boolean } = {}) {
  window.dispatchEvent(new CustomEvent("app:toast", { detail: { message, ...opts } }));
}

/* ---------- Pano ---------- */
function legacyCopy(text: string) {
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.setAttribute("readonly", "");
  ta.style.cssText = "position:fixed;top:-9999px;opacity:0";
  document.body.appendChild(ta);
  ta.select();
  let ok = false;
  try {
    ok = document.execCommand("copy");
  } catch {
    /* yoksay */
  }
  ta.remove();
  return ok;
}
export function copyText(text: string) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).catch(() => legacyCopy(text));
      return true;
    }
  } catch {
    /* yoksay */
  }
  return legacyCopy(text);
}

/* ---------- Gönderim ---------- */
export function sendWhatsApp(msg: string) {
  window.open("https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(msg), "_blank", "noopener");
}
export function sendInstagram(msg: string) {
  // Instagram DM, URL ile hazır metin kabul etmez: mesaj panoya kopyalanır, sohbet açılır.
  const copied = copyText(msg);
  window.open(IG_DM, "_blank", "noopener");
  toast(
    copied
      ? "Mesajınız kopyalandı. Instagram sohbetine yapıştırıp göndermeniz yeterli."
      : "Instagram açıldı. Lütfen mesajınızı sohbete yazın.",
    { ms: 6500 },
  );
}

/* ---------- Mesaj şablonları ---------- */
export const packageMessage = (p: Pkg) =>
  `Merhaba ${BRAND} 👋\n\nWeb sitenizdeki *${p.name}* (${p.detail} – ${p.price}) hakkında bilgi ve randevu almak istiyorum.\n\nUygun gün ve saatleri paylaşabilir misiniz? Teşekkürler 🙏`;
export const serviceMessage = (n: string) =>
  `Merhaba ${BRAND} 👋\n\n*${n}* hizmeti hakkında bilgi ve randevu almak istiyorum.\n\nTeşekkürler 🙏`;
export const generalMessage = () =>
  `Merhaba ${BRAND} 👋\n\nHizmetleriniz ve kampanyalarınız hakkında bilgi almak istiyorum.\n\nTeşekkürler 🙏`;

export function messageFor(label: string) {
  const p = packages.find((x) => packageLabel(x) === label);
  if (p) return packageMessage(p);
  if (services.some((s) => s.name === label)) return serviceMessage(label);
  if (label === GENERAL) return generalMessage();
  return generalMessage();
}
