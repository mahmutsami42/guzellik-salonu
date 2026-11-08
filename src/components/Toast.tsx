import { useEffect, useRef, useState } from "react";
import { CircleAlert, CircleCheck } from "lucide-react";
import { cn } from "../utils/cn";

export default function Toast() {
  const [state, setState] = useState({ message: "", bad: false, show: false });
  const timer = useRef<number>(0);

  useEffect(() => {
    const onToast = (e: Event) => {
      const { message, ms = 4500, bad = false } = (e as CustomEvent).detail;
      setState({ message, bad, show: true });
      clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setState((s) => ({ ...s, show: false })), ms);
    };
    window.addEventListener("app:toast", onToast);
    return () => window.removeEventListener("app:toast", onToast);
  }, []);

  const Icon = state.bad ? CircleAlert : CircleCheck;
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "pointer-events-none fixed bottom-24 left-1/2 z-[400] flex w-max max-w-[min(92vw,440px)] -translate-x-1/2 items-center gap-3 rounded-2xl border bg-[#0e0e12]/95 px-5 py-4 text-sm shadow-[0_20px_60px_rgba(0,0,0,0.7)] transition-all duration-300",
        state.bad ? "border-[#ff6b7a]" : "border-gold",
        state.show ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
      )}
    >
      <Icon size={18} className={cn("shrink-0", state.bad ? "text-[#ff6b7a]" : "text-gold")} />
      <span>{state.message}</span>
    </div>
  );
}
