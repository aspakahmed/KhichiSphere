function Logo({ size = "text-3xl" }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-300/20 bg-cyan-400/10 shadow-lg shadow-cyan-950/30">
        <span className="text-sm font-bold tracking-tight text-cyan-300">KS</span>
      </div>

      <div>
        <h1 className={`${size} font-bold text-white`}>
          KhichiSphere
        </h1>

        <p className="text-xs font-medium tracking-wide text-slate-500">
          AI Recruitment Platform
        </p>
      </div>
    </div>
  );
}

export default Logo;
