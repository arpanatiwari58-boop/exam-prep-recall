import { AlertCircle } from "lucide-react";
import Link from "next/link";

interface TestWarningDialogProps {
  showWarning: boolean;
  setShowWarning: (show: boolean) => void;
  subjectSlug: string;
}

export function TestWarningDialog({ showWarning, setShowWarning, subjectSlug }: TestWarningDialogProps) {
  if (!showWarning) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-slate-900/50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
        <div className="flex items-center gap-3 text-rose-600 mb-4">
          <AlertCircle size={28} />
          <h3 className="text-xl font-bold text-slate-900">Leave Test?</h3>
        </div>
        <p className="text-slate-600 mb-8 font-medium">
          Are you sure you want to leave? Your progress will be lost and the test will not be saved.
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={() => setShowWarning(false)}
            className="px-5 py-2 rounded-full font-bold text-slate-600 hover:bg-slate-100 transition"
          >
            Cancel
          </button>
          <Link
            href={`/subjects/${subjectSlug}`}
            className="px-5 py-2 rounded-full font-bold bg-rose-600 text-white hover:bg-rose-700 transition"
          >
            Leave
          </Link>
        </div>
      </div>
    </div>
  );
}