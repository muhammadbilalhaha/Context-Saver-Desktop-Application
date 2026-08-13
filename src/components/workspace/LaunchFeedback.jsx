import React, { useState, useEffect } from "react";
import { AlertCircle, CheckCircle2, X } from "lucide-react";

function LaunchFeedback({ launchStatus, failedPaths, autoCloseMs = 6000 }) {
  const [isVisible, setIsVisible] = useState(false);

  // Handle automatic opening and closing based on launchStatus
  useEffect(() => {
    let timeout;
    if (launchStatus === "success" || launchStatus === "partial-fail") {
      setIsVisible(true);
      
      // Auto-close after the specified time
      if (autoCloseMs > 0) {
        timeout = setTimeout(() => {
          setIsVisible(false);
        }, autoCloseMs);
      }
    } else {
      setIsVisible(false);
    }

    return () => clearTimeout(timeout);
  }, [launchStatus, autoCloseMs]);

  return (
    <div 
      className={`mx-6 overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] grid ${
        isVisible 
          ? "grid-rows-[1fr] opacity-100 mt-5" 
          : "grid-rows-[0fr] opacity-0 mt-0 pointer-events-none"
      }`}
    >
      <div className="overflow-hidden min-h-0">
        
        {/* SUCCESS STATE */}
        {launchStatus === "success" && (
          <div className="group relative p-4 rounded-xl bg-gradient-to-r from-emerald-500/10 via-emerald-500/5 to-transparent border border-emerald-500/20 text-emerald-300 text-sm flex items-start sm:items-center gap-3 shadow-[0_8px_32px_-8px_rgba(16,185,129,0.15)] backdrop-blur-xl">
            {/* Subtle Neon Glow Behind Icon */}
            <div className="absolute top-1/2 left-5 -translate-y-1/2 w-8 h-8 bg-emerald-500/20 blur-xl rounded-full pointer-events-none" />
            
            <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-400 relative z-10" />
            
            <span className="font-medium tracking-wide flex-1">
              All resources launched successfully! Your workspace is restored.
            </span>

            <button 
              onClick={() => setIsVisible(false)}
              className="shrink-0 p-1.5 rounded-md hover:bg-emerald-500/15 text-emerald-500/50 hover:text-emerald-400 transition-colors"
              aria-label="Dismiss message"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* PARTIAL FAIL STATE */}
        {launchStatus === "partial-fail" && (
          <div className="group relative p-5 rounded-xl bg-gradient-to-br from-rose-500/15 via-rose-500/5 to-transparent border border-rose-500/20 text-rose-200 text-sm shadow-[0_8px_32px_-8px_rgba(244,63,94,0.15)] backdrop-blur-xl">
            {/* Subtle Neon Glow Behind Icon */}
            <div className="absolute top-6 left-6 w-12 h-12 bg-rose-500/20 blur-2xl rounded-full pointer-events-none" />
            
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3 flex-1 relative z-10">
                <AlertCircle className="h-5 w-5 shrink-0 text-rose-400 mt-0.5" />
                
                <div className="flex-1">
                  <span className="font-semibold text-rose-200 tracking-wide">
                    Launch warning: Some resources could not be opened automatically.
                  </span>
                  
                  <ul className="mt-3 pl-4 pr-2 py-3 space-y-1.5 text-rose-300/80 max-h-28 overflow-y-auto font-mono text-[11px] bg-black/40 rounded-lg border border-rose-500/10 list-disc shadow-inner [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-rose-500/20 [&::-webkit-scrollbar-track]:bg-transparent hover:[&::-webkit-scrollbar-thumb]:bg-rose-500/40 transition-colors">
                    {failedPaths?.map((p, idx) => (
                      <li key={idx} className="truncate tracking-wide marker:text-rose-500/50">
                        {p}
                      </li>
                    ))}
                  </ul>
                  
                  <p className="mt-3 text-[11px] text-rose-400/60 font-medium tracking-wide">
                    Please make sure these files/folders still exist at their specified paths.
                  </p>
                </div>
              </div>

              <button 
                onClick={() => setIsVisible(false)}
                className="shrink-0 p-1.5 rounded-md hover:bg-rose-500/15 text-rose-500/50 hover:text-rose-400 transition-colors relative z-10"
                aria-label="Dismiss message"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default LaunchFeedback;