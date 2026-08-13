import React from "react";
import { Play, Trash2, ExternalLink, Copy, CheckCircle2, AlertTriangle } from "lucide-react";
import { getFileIcon } from "../../utils/fileIcons";

function ResourceItem({ resource, onLaunch, onRemove, onCopy, copied, isDuplicate }) {
  const isUrl = resource.resourceType === "url";

  return (
    <div 
      className={`group relative px-3 py-2 rounded-xl border transition-all duration-300 flex items-center justify-between gap-3 overflow-hidden ${
        isDuplicate 
          ? "border-amber-500/30 bg-amber-500/[0.05] hover:bg-amber-500/[0.08] hover:border-amber-500/50 hover:shadow-[0_4px_20px_-8px_rgba(245,158,11,0.15)]"
          : "border-white/10 bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/20 hover:shadow-[0_4px_20px_-8px_rgba(0,0,0,0.5)]"
      }`}
    >
      
      {/* Dynamic Left Edge Accent Line */}
      <div 
        className={`absolute left-0 top-1/2 -translate-y-1/2 w-[3px] rounded-r-full transition-all duration-300 ${
          isDuplicate 
            ? "bg-amber-500/80 h-1/2 group-hover:bg-amber-400 group-hover:h-[60%]" 
            : "bg-indigo-500/0 h-1/2 group-hover:bg-indigo-500/80 group-hover:h-[60%]"
        }`} 
      />

      <div className="flex items-center gap-3 min-w-0 z-10 pl-1">
        {/* Compact Icon Container */}
        <div className={`h-8 w-8 rounded-lg bg-[#0A0A0B] flex items-center justify-center shrink-0 shadow-inner group-hover:scale-105 transition-all duration-300 border [&>svg]:h-4 [&>svg]:w-4 ${
          isDuplicate ? "border-amber-500/30 group-hover:border-amber-500/50 text-amber-400" : "border-white/20 group-hover:border-white/30"
        }`}>
          {getFileIcon(resource.path, resource.resourceType)}
        </div>
        
        {/* Typography */}
        <div className="min-w-0 flex flex-col justify-center">
          <div className="flex items-center gap-1.5">
            <h4 
              className={`font-semibold text-sm truncate select-all transition-colors duration-300 ${
                isDuplicate ? "text-amber-200 group-hover:text-amber-100" : "text-slate-100 group-hover:text-white"
              }`} 
              title={resource.name}
            >
              {resource.name}
            </h4>
            
            {/* Tiny Warning Icon for Duplicates */}
            {isDuplicate && (
              <AlertTriangle className="h-[12px] w-[12px] text-amber-500 animate-pulse shrink-0" title="This exact path is duplicated in your list" />
            )}
          </div>
          
          <p 
            className={`text-xs truncate mt-0.5 select-all font-mono tracking-wide transition-colors duration-300 ${
              isDuplicate ? "text-amber-400/80 group-hover:text-amber-300" : "text-slate-400 group-hover:text-slate-300"
            }`} 
            title={resource.path}
          >
            {resource.path}
          </p>
        </div>
      </div>

      {/* Action Buttons (Compact Slide-in) */}
      <div className="flex items-center gap-1 shrink-0 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-out z-10 bg-[#0A0A0B]/80 backdrop-blur-md p-0.5 rounded-lg border border-white/10">
        <button
          onClick={() => onCopy(resource.path, resource.id)}
          className={`p-1.5 rounded-md border transition-all duration-300 active:scale-95 ${
            copied
              ? "bg-emerald-500/20 border-emerald-500/30 text-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.2)]"
              : "bg-transparent border-transparent text-slate-300 hover:bg-white/10 hover:text-white hover:border-white/20"
          }`}
          title={copied ? "Copied!" : "Copy path"}
        >
          {copied ? <CheckCircle2 className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        </button>
        
        <button
          onClick={() => onLaunch(resource.path)}
          className="p-1.5 rounded-md bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 hover:bg-indigo-500/20 hover:border-indigo-500/40 hover:text-indigo-200 transition-all duration-300 active:scale-95 shadow-[0_0_10px_rgba(99,102,241,0.1)]"
          title="Launch item"
        >
          {isUrl ? <ExternalLink className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </button>
        
        <button
          onClick={() => onRemove(resource.id)}
          className="p-1.5 rounded-md bg-rose-500/5 border border-rose-500/10 text-rose-400/80 hover:bg-rose-500/20 hover:border-rose-500/30 hover:text-rose-300 transition-all duration-300 active:scale-95"
          title="Remove from session"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

export default ResourceItem;