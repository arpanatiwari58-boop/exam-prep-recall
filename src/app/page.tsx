import Link from "next/link";
import { Book, BrainCircuit, ChevronRight, User, Plus, Check, FileText, Activity, Award, GraduationCap } from "lucide-react";

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
      <div className="fixed top-4 w-full z-50 flex justify-center px-4">
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
      </div>

      {/* 2. Hero Section */}
      <section className="relative w-full h-[90vh] min-h-[650px] flex flex-col justify-center">
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
      </section>

      {/* 3. Pastel Subject Cards */}
      <section id="pastel-subjects" className="py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {subjects.map((subject, index) => {
            const bgColors = [
              "bg-[#FCEBA3]/80 border-[#FCEBA3]",
              "bg-[#FBD6C2]/80 border-[#FDD9C3]",
              "bg-[#F4CACD]/80 border-[#F4CACD]",
              "bg-[#D2DDFA]/80 border-[#D2DDFA]"
            ];
            const colorClass = bgColors[index % bgColors.length];
            
            return (
              <Link key={subject.slug} href={`/subjects/${subject.slug}`} className="group outline-none block h-full">
                <div className={`p-8 rounded-[16px] border transition-transform hover:-translate-y-1 hover:shadow-[0_8px_20px_-4px_rgba(0,0,0,0.1)] h-full flex flex-col ${colorClass}`}>
                   <h3 className="text-[20px] font-bold mb-3 text-[#1E1A3C]">{subject.name}</h3>
                   <p className="text-sm text-[#1E1A3C]/80 leading-relaxed font-medium mb-6 flex-1">{subject.description}</p>
                   <div className="font-bold text-[12px] uppercase tracking-widest text-[#1E1A3C] flex items-center justify-between">
                     <span>{subject.testsCount} {subject.testsCount === 1 ? 'Test' : 'Tests'} Ready</span>
                     <ChevronRight size={16} strokeWidth={3} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all"/>
                   </div>
                </div>
              </Link>
            );
          })}
          
          <Link href="/create-test" className="group outline-none block h-full min-h-[220px]">
            <div className="p-8 rounded-[16px] border-2 border-dashed border-gray-200 transition-all hover:border-[#6BB3C0] hover:bg-[#E7F3F5]/30 h-full flex flex-col items-center justify-center text-center bg-gray-50">
               <div className="w-[48px] h-[48px] bg-white rounded-full flex items-center justify-center text-gray-400 group-hover:text-[#6BB3C0] group-hover:shadow-sm border border-gray-100 transition-all mb-4">
                 <Plus size={24} strokeWidth={2.5}/>
               </div>
               <h3 className="text-[18px] font-bold text-[#1E1A3C] transition-colors mb-1">Add Subject</h3>
            </div>
          </Link>
        </div>
      </section>

      {/* 4. Knowing is Better (Info text block) */}
      <section id="knowing" className="bg-[#F7F3EA] py-32 text-center px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-[46px] font-light mb-6 text-[#1E1A3C] tracking-tight">Active Recall is <span className="font-bold">better.</span></h2>
          <p className="text-lg md:text-[20px] text-[#1E1A3C]/70 mb-10 font-medium">
            Your syllabus is full of crucial concepts. CSITRecall is your key.
          </p>
          <p className="text-xl md:text-[22px] font-medium mb-12 text-[#6BB3C0] leading-snug">
            When you know your weak points in Data Mining, <br className="hidden md:block"/>
            You can <span className="font-bold">target them before the board exams.</span>
          </p>
          <Link href="/create-test">
             <button className="bg-[#1E1A3C] text-white px-8 py-[18px] rounded-full font-bold text-sm hover:bg-[#2A2552] transition-colors inline-flex items-center gap-2 shadow-lg">
               Learn About Creating Tests <ChevronRight size={18} strokeWidth={3}/>
             </button>
          </Link>
        </div>
      </section>

      {/* 5. How It Works (Timeline section) */}
      <section id="how-it-works" className="bg-[#FCEBA3]/80 py-32 px-6 relative">
         <div className="max-w-5xl mx-auto text-center">
            <h4 className="text-[#6BB3C0] font-bold tracking-widest uppercase text-[13px] mb-4">HOW IT WORKS</h4>
            <h2 className="text-4xl md:text-[46px] font-light text-[#1E1A3C] mb-24 tracking-tight">
              Effortless generation and <span className="font-bold">expert practice.</span>
            </h2>

            <div className="grid md:grid-cols-3 gap-16 md:gap-8 relative max-w-4xl mx-auto">
               {/* Dotted connecting line for desktop */}
               <div className="hidden md:block absolute top-[52px] left-[16%] right-[16%] h-[2px] border-t-[3px] border-dotted border-black/10 z-0"></div>
               
               <div className="relative z-10 flex flex-col items-center">
                 <div className="w-[104px] h-[104px] bg-[#6BB3C0] rounded-full flex items-center justify-center text-white mb-6 shadow-[0_0_0_8px_#FBE384] border-[4px] border-white">
                   <FileText size={36} strokeWidth={2.5}/>
                 </div>
                 <h3 className="text-[22px] font-bold mb-3 text-[#1E1A3C]">1. Generate</h3>
                 <p className="text-[16px] font-medium text-[#1E1A3C]/70 leading-relaxed max-w-[260px]">
                   Use AI to generate a JSON payload of questions from your university notes and paste it to create a test.
                 </p>
               </div>

               <div className="relative z-10 flex flex-col items-center">
                 <div className="w-[104px] h-[104px] bg-[#6BB3C0] rounded-full flex items-center justify-center text-white mb-6 shadow-[0_0_0_8px_#FBE384] border-[4px] border-white">
                   <Activity size={36} strokeWidth={2.5}/>
                 </div>
                 <h3 className="text-[22px] font-bold mb-3 text-[#1E1A3C]">2. Practice</h3>
                 <p className="text-[16px] font-medium text-[#1E1A3C]/70 leading-relaxed max-w-[260px]">
                   Take the exam on our tailored platform featuring interactive formats like MCQs, True/False, and blanks.
                 </p>
               </div>

               <div className="relative z-10 flex flex-col items-center">
                 <div className="w-[104px] h-[104px] bg-[#6BB3C0] rounded-full flex items-center justify-center text-white mb-6 shadow-[0_0_0_8px_#FBE384] border-[4px] border-white">
                   <Award size={36} strokeWidth={2.5}/>
                 </div>
                 <h3 className="text-[22px] font-bold mb-3 text-[#1E1A3C]">3. Master</h3>
                 <p className="text-[16px] font-medium text-[#1E1A3C]/70 leading-relaxed max-w-[260px]">
                   Review your results, read in-depth explanations, and master the material completely before exam day.
                 </p>
               </div>
            </div>

            <div className="mt-20">
              <Link href="#subjects-section">
                <button className="bg-[#1E1A3C] text-white px-8 py-[18px] rounded-full font-bold text-[15px] hover:bg-[#2A2552] transition-colors inline-flex items-center gap-2 shadow-lg">
                  See How We Recall Each Step <ChevronRight size={18} strokeWidth={3}/>
                </button>
              </Link>
            </div>
         </div>
      </section>

      {/* 6. Rooted In Science / Subjects */}
      <section id="subjects-section" className="bg-gradient-to-b from-[#E7F3F5] to-white py-32 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-[46px] font-light text-[#1E1A3C] mb-4 tracking-tight">
            Rooted In Science And Designed <br className="hidden md:block"/> 
            <span className="font-bold">For Peace Of Mind.</span>
          </h2>
          <p className="text-[20px] text-[#1E1A3C]/70 font-medium mb-16">Select a subject below to begin practicing what's unique to your semester.</p>

        </div>
      </section>

      {/* 7. Footer / Newsletter section */}
      <footer className="bg-[#1E1A3C] text-white pt-32 pb-16">
         <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-[34px] font-light mb-12 tracking-wide">Sign Up To Our Study Newsletter</h2>
            
            <div className="relative max-w-[650px] mx-auto mb-20 bg-white rounded-full p-[6px] shadow-lg flex">
               <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="flex-1 bg-transparent text-[#1E1A3C] py-4 px-8 outline-none font-bold placeholder-gray-400 text-lg" 
               />
               <button className="bg-[#6BB3C0] text-white px-10 rounded-full font-bold hover:bg-[#5AA1AE] transition-colors text-[17px]">
                 Submit
               </button>
            </div>

            <div className="flex flex-wrap justify-center gap-x-12 gap-y-4 text-[13px] font-bold uppercase tracking-widest mb-12 text-white">
              <Link href="#" className="hover:text-[#6BB3C0] transition-colors">Home</Link>
              <Link href="#knowing" className="hover:text-[#6BB3C0] transition-colors">What We Do</Link>
              <Link href="#subjects-section" className="hover:text-[#6BB3C0] transition-colors">Subjects</Link>
            </div>

            <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-[11px] font-bold uppercase tracking-[0.2em] mb-12 text-white/50">
              <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
              <Link href="#" className="hover:text-white transition-colors">Refund Policy</Link>
            </div>

            <p className="text-[13px] font-medium text-white/40">&copy;Copyright 2026 CSITRecall | All Rights Reserved</p>
         </div>
      </footer>
    </div>
  );
}
