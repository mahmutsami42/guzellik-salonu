import { useCallback, useState } from "react";
import { BookingContext } from "./lib/booking";
import Header from "./components/Header";
import Hero from "./components/Hero";
import QuickBooking from "./components/QuickBooking";
import Trust from "./components/Trust";
import About from "./components/About";
import Services from "./components/Services";
import Pricing from "./components/Pricing";
import BeforeAfter from "./components/BeforeAfter";
import Faq from "./components/Faq";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import BookingModal from "./components/BookingModal";
import FloatingActions from "./components/FloatingActions";
import Toast from "./components/Toast";
import Particles from "./components/Particles";

export default function App() {
  const [open, setOpen] = useState(false);
  const [preselect, setPreselect] = useState("");

  const openBooking = useCallback((p?: string) => {
    setPreselect(p ?? "");
    setOpen(true);
  }, []);
  const close = useCallback(() => setOpen(false), []);

  return (
    <BookingContext.Provider value={openBooking}>
      <Particles />
      <Header />
      <main className="relative z-[1]">
        <Hero />
        <QuickBooking />
        <Trust />
        <About />
        <Services />
        <Pricing />
        <BeforeAfter />
        <Faq />
        <Contact />
      </main>
      <div className="relative z-[1] max-md:pb-[78px]">
        <Footer />
      </div>
      <FloatingActions />
      <BookingModal open={open} preselect={preselect} onClose={close} />
      <Toast />
    </BookingContext.Provider>
  );
}
