import Link from "next/link"
import { getSubjectWithTestSummaries } from "@/lib/test-data"
import { BookOpen, BrainCircuit, GraduationCap, ArrowLeft, ArrowRight, FileJson, Plus } from "lucide-react"

const subjectSlug = "data-mining-and-data-warehousing"

export default async function DataMiningPage() {
  const subjectData = await getSubjectWithTestSummaries(subjectSlug)
  const subjectName = "Data Mining & Warehousing"
  const tests = subjectData?.tests || []

  return (
    <div className="min-h-screen bg-[#FDFDFD] font-sans text-[#1E1A3C] selection:bg-[#6BB3C0] selection:text-white">
  

      {/* Subject Hero */}
      <section className="bg-[#1E1A3C] pt-12 pb-10 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="max-w-6xl mx-auto relative z-10 flex flex-col items-center text-center mt-12 mb-8">
           <div className="w-20 h-20 bg-[#6BB3C0] rounded-2xl flex items-center justify-center text-white mb-8 shadow-[0_0_0_8px_rgba(255,255,255,0.1)] rotate-3">
             <BrainCircuit size={40} strokeWidth={2.5}/>
           </div>
           <h1 className="text-4xl md:text-[54px] font-light text-white mb-6 tracking-tight leading-tight">
             Data Mining & <br className="hidden md:block"/> <span className="font-bold">Warehousing</span>
           </h1>
           <p className="text-lg md:text-[20px] text-white/70 max-w-2xl font-medium leading-relaxed">
             Unlock insights from data and master modern warehousing techniques. Select a test below to start practicing your active recall.
           </p>
        </div>
      </section>

      {/* Tests Grid */}
      <main className="max-w-6xl mx-auto px-6 py-20">
        <div className="flex items-center justify-between mb-10 border-b border-gray-100 pb-6">
          <h2 className="text-3xl font-light text-[#1E1A3C] tracking-tight">
            Generated <span className="font-bold text-[#6BB3C0]">Tests</span>
          </h2>
          <span className="bg-[#E7F3F5] text-[#6BB3C0] px-4 py-1.5 rounded-full text-sm font-bold tracking-wider">
            {tests.length} TOTAL
          </span>
        </div>

        {tests.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tests.map((test) => (
              <Link href={`/test/${subjectSlug}/${test.id}`} key={test.id}>
                <div className="bg-white p-8 rounded-[20px] border-2 border-gray-100 hover:border-[#6BB3C0] hover:shadow-[0_20px_40px_rgba(107,179,192,0.12)] transition-all flex flex-col justify-between h-full min-h-[260px]">
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <span className="bg-[#1E1A3C] text-white px-3 py-1.5 rounded text-[11px] font-bold tracking-widest uppercase">
                        {test.totalQuestions} Questions
                      </span>
                      <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-[#6BB3C0] group-hover:text-white transition-colors text-gray-400">
                        <ArrowRight size={16} strokeWidth={3}/>
                      </div>
                    </div>
                    <h3 className="text-[22px] font-bold text-[#1E1A3C] mb-3 leading-snug group-hover:text-[#6BB3C0] transition-colors">
                      {test.title}
                    </h3>
                    <div className="inline-flex items-center gap-1.5 text-[12px] text-[#1E1A3C]/50 font-bold font-mono bg-gray-50 px-2 py-1 rounded">
                      <FileJson size={13} strokeWidth={2.5}/> {test.filePath}
                    </div>
                  </div>

                  <div className="mt-8 flex flex-wrap gap-2 pt-6 border-t border-gray-50">
                    {Object.entries(test.typeCounts).map(([type, count]) => (
                      <span
                        key={type}
                        className="rounded-full border border-[#E7F3F5] bg-[#E7F3F5]/50 px-3 py-1 text-[11px] font-bold text-[#6BB3C0] uppercase tracking-wider"
                      >
                        {count} {type.replace(/_/g, ' ')}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-32 px-6 bg-white rounded-[24px] border-2 border-dashed border-gray-200">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300">
              <BookOpen size={40} strokeWidth={1.5} />
            </div>
            <h3 className="text-3xl font-light text-[#1E1A3C] tracking-tight mb-4">
              No Tests <span className="font-bold">Found</span>
            </h3>
            <p className="text-lg text-[#1E1A3C]/60 font-medium mb-10 max-w-md mx-auto">
              You haven't generated any active recall tests for this subject yet.
            </p>
            <Link href="/create-test">
              <button className="bg-[#6BB3C0] text-white px-8 py-4 rounded-full font-bold text-[15px] hover:bg-[#5AA1AE] transition-colors shadow-lg inline-flex items-center gap-2">
                <Plus size={18} strokeWidth={3}/> Create Your First Test
              </button>
            </Link>
          </div>
        )}
      </main>

      <footer className="bg-white py-10 mt-auto border-t border-gray-100 text-center">
         <p className="text-[13px] font-bold text-[#1E1A3C]/40 uppercase tracking-widest">&copy; 2026 CSITRecall</p>
      </footer>
    </div>
  )
}
