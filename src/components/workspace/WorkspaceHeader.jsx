import React from "react";
import { Play, Loader2 } from "lucide-react";

function WorkspaceHeader({ workspace, launchStatus, onLaunchAll }) {
  const isLaunching = launchStatus === "launching";
  const isEmpty = workspace?.resources?.length === 0;

  return (
    <div className="relative px-8 py-8 border-b border-white/[0.04] bg-[#0A0A0B]/80 backdrop-blur-2xl flex justify-between items-center overflow-hidden">
      {/* Premium Ambient Background Effects */}
      <div className="absolute top-[-50%] right-[-5%] w-[30rem] h-[30rem] bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-white/[0.01] to-transparent pointer-events-none" />

      <div className="relative z-10 flex flex-col gap-2">
        <div className="flex items-center gap-4">
          {/* Gradient Text for Title */}
          <h2 className="text-2xl font-semibold bg-gradient-to-br from-white via-white/90 to-white/40 bg-clip-text text-transparent tracking-tight">
            {workspace.name}
          </h2>
          
          {/* Status Pill - Unified with emerald theme */}
          <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/[0.08] border border-emerald-500/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)] animate-pulse" />
            <span className="text-[10px] font-medium text-emerald-300 uppercase tracking-widest">
              Active
            </span>
          </div>
        </div>
        
        {/* Description Typography */}
        <p className="text-sm text-neutral-400/80 max-w-xl leading-relaxed font-light tracking-wide">
          {workspace.description || (
            <span className="italic opacity-60">No description provided for this session.</span>
          )}
        </p>
      </div>

      {/* Master Launch Button - Unified indigo theme */}
      <button
        onClick={onLaunchAll}
        disabled={isEmpty || isLaunching}
        className={`group relative z-10 overflow-hidden px-6 py-2.5 rounded-xl font-medium text-sm flex items-center gap-2.5 transition-all duration-300 ease-out active:scale-[0.98] ${
          isEmpty
            ? "bg-white/[0.03] border border-white/10 text-white/30 cursor-not-allowed"
            : isLaunching
            ? "bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 cursor-wait"
            : "bg-gradient-to-b from-indigo-500 to-indigo-600 hover:from-indigo-400 hover:to-indigo-500 border border-indigo-400/30 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_4px_20px_-5px_rgba(99,102,241,0.5)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.3),0_4px_25px_-5px_rgba(99,102,241,0.6)]"
        }`}
      >
        {isLaunching ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin text-indigo-300" />
            <span>Launching...</span>
          </>
        ) : (
          <>
            <Play className="h-4 w-4 fill-current transition-transform duration-300 ease-out group-hover:translate-x-0.5" />
            <span>Restore Environment</span>
          </>
        )}
        
        {/* Shine effect overlay */}
        {!isEmpty && !isLaunching && (
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 ease-in-out" />
        )}
      </button>
    </div>
  );
}

export default WorkspaceHeader;