import React from "react";
import { Download } from "lucide-react";

function DragDropOverlay({ isVisible }) {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md transition-all duration-300 animate-fade-in">
      <div className="m-6 flex h-[calc(100%-3rem)] w-[calc(100%-3rem)] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-indigo-500/50 bg-indigo-950/20 px-6 py-12 text-center shadow-2xl shadow-indigo-500/10">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-indigo-500/15 text-indigo-400 shadow-lg shadow-indigo-500/10 animate-bounce">
          <Download className="h-10 w-10" />
        </div>
        <h2 className="mb-2 text-2xl font-bold tracking-wide text-indigo-100">
          Drop resources here
        </h2>
        <p className="max-w-md text-sm text-indigo-300/80 leading-relaxed">
          Release to automatically inspect and add files or folders to your active workspace.
        </p>
      </div>
    </div>
  );
}

export default DragDropOverlay;
