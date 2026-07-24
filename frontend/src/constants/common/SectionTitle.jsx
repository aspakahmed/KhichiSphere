function SectionTitle({ title, subtitle }) {
  return (
    <div className="space-y-2">
      <h1 className="text-4xl font-bold tracking-tight text-white">
        {title}
      </h1>

      <p className="text-slate-400">
        {subtitle}
      </p>
    </div>
  );
}

export default SectionTitle;