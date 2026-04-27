"use client";

import React, { useState, useEffect } from "react";
import { PlusCircle, Book, CheckCircle2, X } from "lucide-react";
import { addStudySession, TRACKED_SUBJECTS } from "@/lib/spaced-repetition";

export function AddTopicCard() {
  const [isOpen, setIsOpen] = useState(false);
  const [subject, setSubject] = useState("");
  const [topic, setTopic] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject || !topic || isSubmitting) return;
    
    setIsSubmitting(true);
    
    try {
      const selectedSubj = TRACKED_SUBJECTS.find(s => s.id === subject);
      if (!selectedSubj) return;
      
      // Assume anonymous or hardcoded user for now, you can replace with real auth later
      await addStudySession("user123", selectedSubj.id, selectedSubj.name, topic);
      
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setSubject("");
        setTopic("");
        setIsOpen(false);
      }, 1500);
    } catch (error) {
      console.error("Error adding session to Firebase:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="w-full bg-white rounded-2xl p-6 sm:p-8 shadow-sm border-2 border-gray-100 border-dashed hover:border-[#a072ff]/40 hover:bg-[#a072ff]/[0.02] transition-all flex flex-col items-center justify-center gap-3 text-[#060b26]/50 hover:text-[#a072ff] group"
      >
        <div className="w-14 h-14 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-white shadow-sm border border-gray-100 group-hover:border-[#a072ff]/20 transition-all group-hover:scale-105 duration-300">
          <PlusCircle size={28} className="text-gray-400 group-hover:text-[#ffb433] transition-colors" />
        </div>
        <div className="text-center">
          <span className="font-extrabold text-[16px] block text-[#060b26] group-hover:text-[#a072ff] transition-colors">Log New Reading</span>
          <span className="text-[13px] font-medium">Add a new chapter to the Spaced Repetition Algorithm</span>
        </div>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#060b26]/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-[24px] w-full max-w-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-6 sm:px-8 sm:pt-8 sm:pb-6 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#ffb433]/10 flex items-center justify-center">
                  <PlusCircle className="text-[#ffb433]" size={20} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[#060b26]">
                    Log New Reading
                  </h2>
                  <p className="text-[12px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">
                    Start Algorithm Tracking
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors bg-gray-50"
              >
                <X size={18} strokeWidth={2.5} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6 bg-[#fcfcfd]">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2.5">
                  <label className="text-[12px] font-bold text-[#060b26]/60 uppercase tracking-widest pl-1">
                    Subject
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 focus:bg-white focus:border-[#a072ff] focus:ring-4 ring-[#a072ff]/10 outline-none transition-all font-semibold text-[14px] text-[#060b26] shadow-sm"
                    required
                    disabled={isSubmitting || showSuccess}
                  >
                    <option value="" disabled>Select a Subject</option>
                    {TRACKED_SUBJECTS.map((subj) => (
                      <option key={subj.id} value={subj.id}>{subj.name}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2.5">
                  <label className="text-[12px] font-bold text-[#060b26]/60 uppercase tracking-widest pl-1">
                    Topic / Unit Name
                  </label>
                  <input
                    type="text"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="e.g. Unit 1: Introduction"
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 focus:bg-white focus:border-[#a072ff] focus:ring-4 ring-[#a072ff]/10 outline-none transition-all font-semibold text-[14px] text-[#060b26] shadow-sm placeholder:font-medium placeholder:text-gray-300"
                    required
                    disabled={isSubmitting || showSuccess}
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-gray-100 mt-2">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-6 py-3.5 text-gray-500 font-bold text-[14px] rounded-xl hover:bg-gray-100 transition-colors"
                  disabled={isSubmitting || showSuccess}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || showSuccess}
                  className={`px-8 py-3.5 text-white text-[14px] font-bold rounded-xl transition-all flex items-center gap-2 shadow-sm ${
                    showSuccess ? 'bg-emerald-500 shadow-emerald-500/20' : 'bg-[#060b26] hover:bg-[#11183c] hover:shadow-[#060b26]/20 shadow-md'
                  }`}
                >
                  {showSuccess ? (
                    <>
                      <CheckCircle2 size={18} strokeWidth={2.5} /> Added to Algorithm
                    </>
                  ) : isSubmitting ? (
                    <> Saving... </>
                  ) : (
                    <>
                      <Book size={18} className="text-[#ffb433]" strokeWidth={2.5} /> Track in Algorithm
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
