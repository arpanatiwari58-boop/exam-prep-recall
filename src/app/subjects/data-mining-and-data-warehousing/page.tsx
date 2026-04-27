import Link from "next/link"
import { getSubjectWithTestSummaries } from "@/lib/test-data"
import { BookOpen, BrainCircuit, ArrowRight, FileJson, Plus, Sparkles } from "lucide-react"

const subjectSlug = "data-mining-and-data-warehousing"

export default async function DataMiningPage() {
  const subjectData = await getSubjectWithTestSummaries(subjectSlug)
  const subjectName = "Data Mining & Warehousing"
  const tests = subjectData?.tests || []

  return (
    <div className="min-h-screen bg-[#f4f5f9] font-sans text-[#060b26] selection:bg-[#be89ff] selection:text-white pb-20">
  
      {/* Subject Header */}
      <section className="bg-white py-12 px-6 border-b border-gray-200 shadow-[0_4px_30px_rgba(0,0,0,0.03)] relative z-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center gap-6">
           
           <div className="w-16 h-16 bg-gradient-to-br from-[#ffb433]/20 to-[#ffb433]/5 border border-[#ffb433]/30 rounded-[18px] shadow-[0_8px_20px_rgba(255,180,51,0.15)] flex items-center justify-center shrink-0">
             <BrainCircuit size={32} className="text-[#e69b19]" strokeWidth={2}/>
           </div>
           
           <div>
             <h1 className="text-3xl md:text-4xl font-extrabold text-[#060b26] tracking-tight mb-2">
               Data Mining & <span className="text-[#a072ff]">Warehousing</span>
             </h1>
             <p className="text-[16px] text-[#060b26]/60 font-medium max-w-2xl">
               Unlock insights from data and master modern warehousing techniques. Select a test below to practice.
             </p>
           </div>

        </div>
      </section>

      {/* Tests Area */}
      <main className="max-w-6xl mx-auto px-6 py-14">
<div className="flex items-center justify-between mb-8">
  
  {/* LEFT: Title */}
  <h2 className="text-[22px] font-bold text-[#060b26] tracking-tight">
    Available Tests
  </h2>

  {/* RIGHT: Create Button */}
  <Link
    href="/create-test"
    className="px-4 py-2 text-sm font-semibold bg-[#a072ff] text-white rounded-md hover:bg-[#8b5cf6] transition"
  >
    + Create Test
  </Link>

</div>

        {tests.length > 0 ? (
          <div className="grid grid-cols-2 gap-5">
            {tests.map((test) => (
              <Link href={`/test/${subjectSlug}/${test.id}`} key={test.id} className="group outline-none block">
                <div className="bg-white p-5 md:py-6 md:px-7 rounded-[20px] border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_15px_35px_-10px_rgba(160,114,255,0.25)] hover:border-[#a072ff]/40 hover:-translate-y-1 hover:bg-[#faf8ff] transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
                  
                  {/* Left Accent Bar */}
                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gray-100 group-hover:bg-[#a072ff] transition-colors duration-300"></div>

                  {/* Left: Icon & Titles */}
                  <div className="flex items-center gap-6 md:w-5/12 ml-2">
                    <div className="hidden sm:flex w-14 h-14 shrink-0 rounded-[14px] bg-gray-50 border border-gray-100 items-center justify-center text-gray-400 group-hover:bg-[#a072ff]/10 group-hover:border-[#a072ff]/30 group-hover:text-[#a072ff] transition-colors duration-300 shadow-inner">
                      <BookOpen size={24} strokeWidth={2.5} />
                    </div>
                    <div>
                      <h3 className="text-[19px] md:text-[21px] font-bold text-[#060b26] mb-1.5 group-hover:text-[#a072ff] transition-colors line-clamp-1">
                        {test.title}
                      </h3>
                      <div className="flex items-center gap-3 text-[14px] font-medium text-[#060b26]/50">
                       
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
                        <span className="text-[#e69b19] font-bold tracking-wide flex items-center gap-1">
                          <Sparkles size={13}/>
                          {test.totalQuestions} Questions
                        </span>
                      </div>
                    </div>
                  </div>

            

                  {/* Right: Action Area */}
                  <div className="flex items-center justify-between md:justify-end md:w-2/12 mt-3 md:mt-0 pt-4 md:pt-0 border-t md:border-none border-gray-100">
                    <span className="md:hidden text-[14px] font-bold text-[#a072ff] uppercase tracking-widest">Start Test</span>
                    <button className="w-12 h-12 rounded-[14px] bg-white border border-gray-200 flex items-center justify-center text-gray-400 group-hover:bg-[#a072ff] group-hover:border-[#a072ff] group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-[0_8px_20px_rgba(160,114,255,0.25)]">
                      <ArrowRight size={20} strokeWidth={2.5} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 px-6 bg-white rounded-[24px] border border-gray-200 shadow-[0_8px_30px_rgba(0,0,0,0.04)] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(160,114,255,0.04)_0%,transparent_70%)] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

            <div className="w-24 h-24 bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-[24px] shadow-sm flex items-center justify-center mx-auto mb-8 text-gray-400">
              <BookOpen size={36} strokeWidth={2} />
            </div>
            <h3 className="text-3xl font-extrabold text-[#060b26] tracking-tight mb-4">
              No Tests <span className="text-[#a072ff]">Found</span>
            </h3>
            <p className="text-[17px] text-[#060b26]/60 font-medium mb-10 max-w-md mx-auto leading-relaxed">
              You haven't generated any active recall tests for this subject yet. Upload your notes to get started.
            </p>
            <Link href="/create-test">
              <button className="bg-[#a072ff] text-white px-8 py-[16px] rounded-[14px] font-bold text-[16px] hover:bg-[#8f5ceb] transition-all shadow-[0_8px_20px_rgba(160,114,255,0.3)] hover:shadow-[0_12px_25px_rgba(160,114,255,0.4)] hover:-translate-y-1 inline-flex items-center gap-2.5">
                <Plus size={22} strokeWidth={2.5}/> Create Your First Test
              </button>
            </Link>
          </div>
        )}
      </main>

    </div>
  )
}
