import Link from "next/link";
import { Book, BrainCircuit, ChevronRight, User, Plus, Check, FileText, Activity, Award, GraduationCap } from "lucide-react";
import HeroSection from "./_hompage/HeroSection";
import MotivationSection from "./_hompage/MotivationSection";

const subjects = [
  {
    name: "Data Mining & Warehousing",
    slug: "data-mining-and-data-warehousing",
    description: "Unlock insights from data and master modern warehousing techniques.",
    icon: <BrainCircuit size={28} className="text-white" />,
    testsCount: 2,
  },
  {
    name: "Principles of Management",
    slug: "principles-of-management",
    description: "Core principles of effective management, planning, and leadership.",
    icon: <Book size={28} className="text-white" />,
    testsCount: 1,
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white font-sans text-[#1E1A3C] selection:bg-[#6BB3C0] selection:text-white">
      {/* 1. Nav/Header (Floating Pill Style) */}
      {/* <div className="fixed top-4 w-full z-50 flex justify-center px-4">
        <header className="w-full max-w-6xl bg-white/95 backdrop-blur-sm rounded-full shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] px-6 md:px-8 py-3.5 flex justify-between items-center transition-all">
          <div className="flex items-center gap-4">
            <div className="w-[30px] h-[30px] rounded-lg bg-[#6BB3C0] flex items-center justify-center text-white">
               <GraduationCap size={18} strokeWidth={2.5}/>
            </div>
            <h1 className="text-[17px] font-bold tracking-wider text-[#1E1A3C]/80 uppercase">
              <span className="text-[#6BB3C0]">CSIT</span>Recall
            </h1>
          </div>
          
          <nav className="hidden md:flex items-center gap-10 text-[13px] font-bold text-[#1E1A3C] uppercase tracking-wide">
            <Link href="#knowing" className="hover:text-[#6BB3C0] transition-colors">Why Recall</Link>
            <Link href="#how-it-works" className="hover:text-[#6BB3C0] transition-colors">How It Works</Link>
            <Link href="#subjects-section" className="hover:text-[#6BB3C0] transition-colors">Subjects</Link>
          </nav>

          <div className="flex items-center gap-6">
            <Link href="/create-test" className="hidden md:flex items-center gap-1.5 text-xs font-bold text-[#6BB3C0] hover:text-[#1E1A3C] transition-colors uppercase tracking-widest pl-4 border-l border-gray-100">
              <Plus size={14} strokeWidth={3} /> CREATE NEW
            </Link>
            <button className="flex items-center justify-center w-8 h-8 rounded-full border border-gray-200 text-gray-500 hover:text-[#6BB3C0] hover:border-[#6BB3C0] transition-colors">
              <User size={16} />
            </button>
          </div>
        </header>
      </div> */}

      {/* 2. Hero Section */}
      {/* <section className="relative w-full h-[90vh] min-h-[650px] flex flex-col justify-center">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover object-center" alt="Students learning" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 md:from-[#1E1A3C]/80 via-[#1E1A3C]/30 to-transparent"></div>
        
        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 mt-16">
          <div className="max-w-[620px]">
            <h1 className="text-[2.75rem] md:text-5xl lg:text-[4rem] font-light text-white leading-[1.05] mb-8 tracking-tight">
              Empowering students <br className="hidden md:block" />
              with access to life-changing <br className="hidden md:block" />
              insights, <span className="font-bold text-white">at exams & beyond.</span>
            </h1>
            <Link href="#pastel-subjects">
              <button className="bg-[#6BB3C0] text-white px-8 py-3.5 rounded-full font-bold text-[15px] hover:bg-[#599fa8] transition-colors flex items-center justify-center gap-2 w-full md:w-auto shadow-md">
                Start Practicing <ChevronRight size={18} strokeWidth={3}/>
              </button>
            </Link>
          </div>
        </div>
      </section> */}
      <HeroSection />

      {/* Subjects Section (Minimal Sleek List instead of bulky cards) */}
      <section id="pastel-subjects" className="py-16 md:py-24 bg-[#fdfbfb]">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex flex-col items-center text-center mb-12">
            <h2 className="text-3xl md:text-[38px] font-extrabold text-[#060b26] tracking-tight mb-4">
              Select Your <span className="text-[#a072ff]">Semester Subject</span>
            </h2>
            <p className="text-[17px] text-[#060b26]/50 font-medium max-w-xl">
              Don't waste time on passive reading. Instantly take active-recall tests generated specifically for your CSIT syllabus.
            </p>
          </div>

          <div className="flex flex-col gap-4">
             {subjects.map((subject) => (
                <Link key={subject.slug} href={`/subjects/${subject.slug}`} className="group outline-none block">
                   <div className="bg-white p-5 md:p-6 rounded-[16px] border border-gray-100 hover:border-[#a072ff]/40 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgba(160,114,255,0.08)] transition-all duration-300 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 overflow-hidden">
                      
                      <div className="flex items-center gap-5">
                         <div className="w-12 h-12 rounded-xl bg-[#ffb433]/10 border border-[#ffb433]/20 flex items-center justify-center text-[#e69b19] group-hover:bg-[#ffb433] group-hover:text-white transition-colors duration-300">
                            {subject.name.includes("Mining") ? <BrainCircuit size={22} strokeWidth={2.5}/> : <Book size={22} strokeWidth={2.5}/>}
                         </div>
                         <div>
                            <h3 className="text-[18px] md:text-[20px] font-bold text-[#060b26] mb-1.5 group-hover:text-[#a072ff] transition-colors">{subject.name}</h3>
                            <p className="text-[14px] font-medium text-[#060b26]/50 line-clamp-1">{subject.description}</p>
                         </div>
                      </div>

                      <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end border-t md:border-none border-gray-50 pt-4 md:pt-0">
                         <span className="bg-gray-50 px-3 py-1.5 rounded-[8px] text-[12px] font-bold text-[#060b26]/60 uppercase tracking-widest border border-gray-100 whitespace-nowrap">
                            {subject.testsCount} {subject.testsCount === 1 ? 'Test' : 'Tests'}
                         </span>
                         <button className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-400 group-hover:bg-[#a072ff] group-hover:border-[#a072ff] group-hover:text-white transition-all duration-300 shadow-sm shrink-0">
                            <ChevronRight size={18} strokeWidth={2.5} className="group-hover:translate-x-0.5 transition-transform"/>
                         </button>
                      </div>

                   </div>
                </Link>
             ))}

             <Link href="/create-test" className="group outline-none block mt-2">
                <div className="bg-transparent p-5 md:p-6 rounded-[16px] border-2 border-dashed border-gray-200 hover:border-[#ffb433]/50 hover:bg-[#ffb433]/[0.02] transition-all duration-300 flex items-center justify-center gap-3">
                   <Plus size={20} className="text-gray-400 group-hover:text-[#e69b19]" strokeWidth={2.5}/>
                   <span className="text-[16px] font-semibold text-[#060b26]/60 group-hover:text-[#e69b19]">Add A Custom Subject</span>
                </div>
             </Link>
          </div>
        </div>
      </section>

      {/* 4. Motivation Section */}
      <MotivationSection />


    </div>
  );
}
