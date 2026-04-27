// components/MotivationSection.tsx
export default function MotivationSection() {
  const pillars = [
    {
      num: "01",
      title: "Active Recall",
      titleColor: "text-amber-400",
      barColor: "bg-amber-400",
      barWidth: "w-3/4",
      desc: "Don't just re-read. Test yourself until the answer comes before the question does.",
    },
    {
      num: "02",
      title: "Spaced Repetition",
      titleColor: "text-violet-400",
      barColor: "bg-violet-600",
      barWidth: "w-3/5",
      desc: "Review what you almost forgot — right before you forget it. That's how memory sticks.",
    },
    {
      num: "03",
      title: "Show Up Daily",
      titleColor: "text-emerald-400",
      barColor: "bg-emerald-500",
      barWidth: "w-4/5",
      desc: "30 focused minutes beats 5 frantic hours the night before. Consistency is the only cheat code.",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-[#0f0a1e] py-24 px-6">

      {/* Grid bg */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(124,58,237,0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(124,58,237,0.07) 1px, transparent 1px)
          `,
          backgroundSize: "44px 44px",
        }}
      />

      {/* Subtle horizontal scan lines */}
      {["18%", "52%", "80%"].map((top, i) => (
        <div
          key={i}
          className="pointer-events-none absolute left-0 right-0 h-px"
          style={{
            top,
            background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.3), rgba(245,158,11,0.2), transparent)",
          }}
        />
      ))}

      {/* Glows */}
      <div className="pointer-events-none absolute -top-24 -left-28 h-[480px] w-[480px] rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.22)_0%,transparent_70%)]" />
      <div className="pointer-events-none absolute -bottom-20 -right-20 h-[360px] w-[360px] rounded-full bg-[radial-gradient(circle,rgba(245,158,11,0.15)_0%,transparent_70%)]" />

      <div className="relative z-10 mx-auto max-w-4xl">

        {/* Eyebrow */}
        <div className="flex items-center justify-center gap-3 mb-5">
          <div className="h-[2px] w-6 bg-amber-400 rounded-full" />
          <span className="text-[10px] font-bold uppercase tracking-[.18em] text-amber-400">
            The Only Mindset That Works
          </span>
          <div className="h-[2px] w-6 bg-amber-400 rounded-full" />
        </div>

        {/* Big quote */}
        <div className="text-center mb-12">
          <span
            className="block text-[80px] leading-[.6] font-black text-violet-800/40 mb-2"
            style={{ fontFamily: "'Oswald', sans-serif" }}
          >
            "
          </span>
          <p
            className="text-4xl md:text-5xl font-black uppercase leading-[1.1] text-white"
            style={{ fontFamily: "'Oswald', sans-serif" }}
          >
            The exam doesn't care<br />
            <span className="text-amber-400">how busy you were.</span><br />
            <span style={{ WebkitTextStroke: "2px #7c3aed", color: "transparent" }}>
              Only how ready you are.
            </span>
          </p>
          <p className="mt-4 text-[11px] font-bold uppercase tracking-[.15em] text-white/20">
            — A student who learned the hard way
          </p>
        </div>

        {/* Divider */}
        <div
          className="w-full h-px mb-12"
          style={{ background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.4), rgba(245,158,11,0.4), transparent)" }}
        />

        {/* Pillars */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 mb-12 rounded-xl overflow-hidden"
          style={{ border: "1px solid rgba(124,58,237,0.2)", gap: "1px", background: "rgba(124,58,237,0.15)" }}
        >
          {pillars.map((p) => (
            <div key={p.num} className="bg-[#0f0a1e] p-7 flex flex-col gap-2">
              <span className="text-[10px] font-black uppercase tracking-[.18em] text-violet-700/60">{p.num}</span>
              <p className={`text-lg font-black uppercase leading-tight ${p.titleColor}`}>{p.title}</p>
              <p className="text-xs text-white/90 leading-relaxed">{p.desc}</p>
              <div className={`h-[2px] rounded-full mt-1 ${p.barColor} ${p.barWidth}`} />
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex gap-3 flex-wrap">
            {[
              { num: "3×", numColor: "text-amber-400", label: "Better retention" },
              { num: "2", numColor: "text-violet-400", label: "Subjects. Zero excuses." },
              { num: "7th", numColor: "text-emerald-400", label: "Sem. Final push." },
            ].map((c) => (
              <div
                key={c.label}
                className="flex items-baseline gap-2 px-4 py-2 rounded-md"
                style={{ border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <span className={`text-xl font-black ${c.numColor}`}>{c.num}</span>
                <span className="text-[10px] font-semibold uppercase tracking-[.1em] text-white/90">{c.label}</span>
              </div>
            ))}
          </div>

          <button className="inline-flex items-center gap-2 bg-violet-700 hover:bg-violet-800 text-white text-[11px] font-black uppercase tracking-[.14em] px-8 py-3.5 rounded-md transition-colors">
            Start Testing →
          </button>
        </div>

      </div>
    </section>
  );
}