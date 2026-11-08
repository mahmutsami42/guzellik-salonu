import laser from "./assets/laser.jpg";
import nails from "./assets/nails.jpg";
import skin from "./assets/skin.jpg";
import lashes from "./assets/lashes.jpg";
import body from "./assets/body.jpg";

export const WA_NUMBER = "905528275303";
export const PHONE_DISPLAY = "+90 552 827 53 03";
export const PHONE_TEL = "tel:+905528275303";
export const IG_USER = "blackdiamondvipbeauty";
export const IG_URL = "https://www.instagram.com/blackdiamondvipbeauty";
export const IG_DM = "https://ig.me/m/" + IG_USER;
export const BRAND = "Black Diamond VIP Beauty";
export const OWNER = "Durdane Eda Coşkuner";
export const ADDRESS =
  "Akabe mah. Yeniceler cad. No:145, My Office Plaza A2 Blok Kat:3 Daire:306, Karatay / Konya, Turkey 42020";
export const MAP_Q = "My Office Plaza, Yeniceler Cd. No:145, Akabe Mah., 42020 Karatay/Konya";
export const WA_GENERAL =
  "https://wa.me/905528275303?text=Merhaba%20Black%20Diamond%20VIP%20Beauty%2C%20bilgi%20almak%20istiyorum.";

export type PackageGroup = "bolgesel" | "vucut";
export interface Pkg {
  name: string;
  detail: string;
  price: string;
  amount: string;
  tag: string;
  sessions?: number;
  group: PackageGroup;
  featured?: boolean;
  sub?: string;
  title?: string;
}

export const packages: Pkg[] = [
  {
    name: "Sonbahar Lazer Epilasyon Fırsat Kampanyası (Tepeden Tırnağa)",
    title: "Sonbahar Lazer Epilasyon Fırsat Kampanyası",
    sub: "Tepeden Tırnağa",
    detail: "8 Seans Tam Kapsamlı VIP Epilasyon",
    price: "6.499 TL",
    amount: "6.499",
    tag: "Sonbahar kampanyası",
    sessions: 8,
    group: "vucut",
    featured: true,
  },
  {
    name: "4 Bölge Lazer Epilasyon Paketi",
    detail: "8 Seans Seçmeli Bölge",
    price: "4.999 TL",
    amount: "4.999",
    tag: "Seçmeli bölge",
    sessions: 8,
    group: "bolgesel",
  },
  {
    name: "3 Bölge Lazer Epilasyon Paketi",
    detail: "8 Seans Seçmeli Bölge",
    price: "3.999 TL",
    amount: "3.999",
    tag: "Seçmeli bölge",
    sessions: 8,
    group: "bolgesel",
  },
  {
    name: "2 Bölge Lazer Epilasyon Paketi",
    detail: "8 Seans Seçmeli Bölge",
    price: "2.999 TL",
    amount: "2.999",
    tag: "Seçmeli bölge",
    sessions: 8,
    group: "bolgesel",
  },
  {
    name: "Tüm Vücut Lazer Epilasyon VIP Paketi",
    detail: "10 Seans Konforlu Buz Başlık Uygulaması",
    price: "7.999 TL",
    amount: "7.999",
    tag: "VIP • Buz başlık",
    sessions: 10,
    group: "vucut",
  },
  {
    name: "Tüm Vücut Lazer + Medikal Cilt Bakımı Kombin",
    detail: "10 Seans Lazer + Derin Gözenek Temizlik & Altın Maske",
    price: "5.999 TL",
    amount: "5.999",
    tag: "Kombin",
    sessions: 10,
    group: "vucut",
  },
  {
    name: "Tüm Vücut Lazer Fırsat Paketi",
    detail: "10 Seans Hızlı Sonuç Protokolü",
    price: "4.999 TL",
    amount: "4.999",
    tag: "Fırsat",
    sessions: 10,
    group: "vucut",
  },
];

export interface Service {
  name: string;
  title: string;
  tag: string;
  desc: string;
  img: string;
}

export const services: Service[] = [
  {
    name: "Lazer Epilasyon (CHAMPION Başlık)",
    title: "Lazer Epilasyon",
    tag: "CHAMPION Başlık",
    desc: "Ağrısız, acısız, 4 mevsim uygulanabilir buz başlık teknolojisi.",
    img: laser,
  },
  {
    name: "Medikal & Hollywood Cilt Bakımı",
    title: "Medikal & Hollywood Cilt Bakımı",
    tag: "LED terapi",
    desc: "Vakumlu hydrafacial, dermapen, leke protokolleri, LED terapisi.",
    img: skin,
  },
  {
    name: "Protez Tırnak & Nail Art",
    title: "Protez Tırnak & Nail Art",
    tag: "Medikal manikür",
    desc: "Medikal manikür, jel güçlendirme, özel tasarım nail art.",
    img: nails,
  },
  {
    name: "Kirpik Lifting & Kaş Laminasyonu",
    title: "Kirpik Lifting & Kaş Laminasyonu",
    tag: "6-8 hafta kalıcılık",
    desc: "Keratin bakım takviyeli 6-8 hafta kalıcı doğal kavis.",
    img: lashes,
  },
  {
    name: "Vücut Bakımı & Bölgesel İncelme",
    title: "Vücut Bakımı & Bölgesel İncelme",
    tag: "G5 • Pasif jimnastik",
    desc: "G5 masajı, pasif jimnastik ve sıkılaşma kürleri.",
    img: body,
  },
];

export const faqs: { q: string; a: string }[] = [
  {
    q: "Randevuyu nasıl alabilirim?",
    a: 'Sitedeki paket veya hizmet kartlarından WhatsApp ya da Instagram butonlarını kullanabilir, "Randevu Al" formunu doldurabilir veya +90 552 827 53 03 numarasını arayabilirsiniz.',
  },
  {
    q: "Butona dokununca ne olur?",
    a: "Seçtiğiniz paketin adı ve fiyatıyla bir mesaj hazırlanır. WhatsApp'ta mesaj hazır yazılmış olarak açılır. Instagram yazı aktarmaya izin vermediği için mesaj panonuza kopyalanır; sohbete yapıştırıp göndermeniz yeterlidir.",
  },
  {
    q: "Kampanya fiyatları güncel mi?",
    a: "Sitedeki fiyatlar Instagram profilimizdeki güncel kampanyalarla aynıdır. Kampanya dönemi ve uygunluk için bize yazarak teyit alabilirsiniz.",
  },
  {
    q: "Salon nerede?",
    a: "Akabe mah. Yeniceler cad. No:145, My Office Plaza A2 Blok Kat:3 Daire:306, Karatay / Konya. Haritadan yol tarifi almak için iletişim bölümüne bakabilirsiniz.",
  },
];

export const navLinks = [
  { id: "anasayfa", label: "Anasayfa" },
  { id: "hizmetler", label: "Hizmetlerimiz" },
  { id: "fiyatlar", label: "Kampanyalar & Fiyatlar" },
  { id: "oncesi-sonrasi", label: "Öncesi / Sonrası" },
  { id: "iletisim", label: "İletişim" },
];

export const GENERAL = "Genel bilgi / danışma";
export const packageLabel = (p: Pkg) => `${p.name} – ${p.detail} (${p.price})`;
