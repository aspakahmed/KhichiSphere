import { motion } from "framer-motion";
import HeroSection from "@/components/auth/HeroSection";

function AuthLayout({ children }) {
  return (
    <div className="relative min-h-[100dvh] overflow-x-hidden bg-[#020617] px-5 py-8 sm:px-8 sm:py-10 lg:px-12 xl:px-16">
      <div className="absolute -left-48 -top-48 h-[500px] w-[500px] rounded-full bg-cyan-500/15 blur-[140px]" />
      <div className="absolute -bottom-44 -right-44 h-[500px] w-[500px] rounded-full bg-blue-600/15 blur-[140px]" />
      <div className="absolute inset-0 opacity-[0.035]" style={{ backgroundImage: "linear-gradient(#38bdf8 1px, transparent 1px), linear-gradient(to right,#38bdf8 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
      <div className="relative z-10 mx-auto flex min-h-[calc(100dvh-4rem)] w-full max-w-[1440px] items-center gap-12 sm:min-h-[calc(100dvh-5rem)] lg:grid lg:grid-cols-[minmax(0,1.05fr)_minmax(420px,0.95fr)] xl:gap-20">
        <motion.div initial={{ opacity: 0, x: -32 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.55 }} className="hidden min-w-0 lg:block"><HeroSection /></motion.div>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="flex w-full min-w-0 justify-center lg:justify-end">{children}</motion.div>
      </div>
    </div>
  );
}
export default AuthLayout;
