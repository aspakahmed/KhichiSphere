import Logo from "@/components/ui/Logo";
import LoginForm from "./LoginForm";

function LoginCard() {
  return (
    <div className="relative w-full max-w-[29rem] overflow-hidden rounded-3xl border border-slate-700/80 bg-slate-900/75 p-7 shadow-2xl shadow-black/35 backdrop-blur-xl sm:p-9">
      <div className="absolute -right-14 -top-14 h-36 w-36 rounded-full bg-cyan-400/10 blur-3xl" />
      <div className="relative z-10">
        <Logo />
        <div className="mt-8">
          <span className="inline-flex rounded-full border border-cyan-400/25 bg-cyan-400/10 px-3 py-1.5 text-xs font-medium text-cyan-200">AI-powered recruitment</span>
          <h2 className="mt-5 text-3xl font-semibold tracking-tight text-white sm:text-[2rem]">Welcome back.</h2>
          <p className="mt-2 text-sm leading-6 text-slate-400">Sign in to continue building a stronger hiring workflow.</p>
        </div>
        <div className="mt-7"><LoginForm /></div>
      </div>
    </div>
  );
}
export default LoginCard;
