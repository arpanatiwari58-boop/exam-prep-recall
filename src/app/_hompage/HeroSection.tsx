// components/HeroSection.tsx
"use client";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#0a0a0f] flex items-center">

      {/* Grid background */}
  <div
  className="pointer-events-none absolute inset-0"
  style={{
    backgroundImage: `
      linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.75)),
      linear-gradient(rgba(124,58,237,0.08) 1px, transparent 1px),
      linear-gradient(90deg, rgba(124,58,237,0.08) 1px, transparent 1px),
      url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee')
    `,
    backgroundSize: "cover, 48px 48px, 48px 48px, cover",
    backgroundPosition: "center, 0 0, 0 0, center",
    backgroundRepeat: "no-repeat, repeat, repeat, no-repeat",
  }}
/>

      {/* Glows */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.25)_0%,transparent_70%)]" />
      <div className="pointer-events-none absolute -bottom-20 -right-16 h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(245,158,11,0.15)_0%,transparent_70%)]" />

      {/* Scan line animation */}
      <div className="pointer-events-none absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-purple-600/50 to-transparent animate-scan" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl items-center gap-12 px-8 py-20 lg:px-16">

        {/* LEFT */}
        <div className="flex flex-1 flex-col">
          {/* Tag */}
          <div className="mb-6 flex items-center gap-3">
            <div className="h-[3px] w-8 rounded-full bg-amber-400" />
            <span className="font-sans text-xs font-medium uppercase tracking-[0.15em] text-amber-400">
              Your Study Weapon — Built for CSIT
            </span>
          </div>

          {/* Heading */}
          <h1
            className="mb-4 font-black uppercase leading-[0.95] text-white"
            style={{ fontFamily: "'Oswald', sans-serif", fontSize: "clamp(52px, 8vw, 80px)" }}
          >
            No More
            <span className="block text-amber-400">Excuses.</span>
            <span
              className="block"
              style={{ WebkitTextStroke: "2px #7c3aed", color: "transparent" }}
            >
              Just Results.
            </span>
          </h1>

          {/* Sub quote */}
          <p className="mb-6 text-xl font-semibold uppercase tracking-widest text-white/50">
            Test yourself. Break your limits.{" "}
            <span className="text-violet-500">Own every exam.</span>
          </p>

          {/* Divider */}
          <div className="mb-6 h-[3px] w-16 rounded-full bg-gradient-to-r from-violet-600 to-amber-400" />

          {/* Desc */}
          <p className="mb-8 max-w-md font-sans text-sm leading-relaxed text-white/40">
            Paste your notes. Get instant MCQs, fill-in-the-blanks, and short
            answer tests — powered by AI. Active recall is the only shortcut
            that actually works.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4">
            <button className="flex items-center gap-2 rounded bg-amber-400 px-7 py-3.5 text-sm font-bold uppercase tracking-widest text-black transition hover:bg-amber-300">
              Start Now <ArrowRight className="h-4 w-4" />
            </button>
            <button className="rounded border-2 border-white/20 px-7 py-3.5 text-sm font-bold uppercase tracking-widest text-white transition hover:border-white/50">
              Watch Demo
            </button>
          </div>
        </div>

        {/* RIGHT — stat blocks */}
        <div className="hidden flex-col gap-3 lg:flex" style={{ flex: "0 0 280px" }}>
          {[
            { num: "3×", suffix: " faster", label: "Retention vs passive reading", accent: "#7c3aed" },
            { num: "MCQ", suffix: " + more", label: "Fill blanks · Short answer · Score", accent: "#f59e0b" },
            { num: "AI", suffix: "-powered", label: "Auto-generates from your notes", accent: "#10b981" },
          ].map((s) => (
            <div
              key={s.num}
              className="relative overflow-hidden rounded-lg border border-white/[0.08] bg-white/[0.04] px-5 py-4"
            >
              <div
                className="absolute bottom-0 left-0 top-0 w-[3px]"
                style={{ background: s.accent }}
              />
              <p className="font-black leading-none text-white" style={{ fontFamily: "'Oswald', sans-serif", fontSize: 36 }}>
                {s.num}
                <span className="text-xl" style={{ color: s.accent }}>{s.suffix}</span>
              </p>
              <p className="mt-1 font-sans text-[11px] uppercase tracking-widest text-white/40">
                {s.label}
              </p>
            </div>
          ))}

          {/* Quote */}
          <div className="rounded-md border border-violet-500/25 bg-violet-500/10 p-4 flex gap-3 items-start">
            <span className="text-5xl font-black leading-[0.7] text-violet-500" style={{ fontFamily: "'Oswald', sans-serif" }}>"</span>
            <p className="text-sm font-semibold uppercase tracking-wide text-white/60">
              Hard work beats talent when talent doesn't work hard.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}