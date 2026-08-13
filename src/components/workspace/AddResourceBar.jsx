import React from "react";
import { Plus, File, FolderOpen, AlertCircle, Check } from "lucide-react";

function AddResourceBar({
  urlInput,
  urlName,
  onUrlInputChange,
  onUrlNameChange,
  onAddUrl,
  onBrowseFile,
  onBrowseFolder,
}) {
  const urlRegex = /^(https?:\/\/)?([\w\-]+\.)+[\w\-]{2,}(\/.*)?$/i;
  
  const hasInput = urlInput.trim().length > 0;
  const isFormValid = hasInput && urlRegex.test(urlInput.trim());
  const isInvalid = hasInput && !isFormValid;

  return (
    <div className="p-6 border-t border-white/[0.04] bg-[#0A0A0B]/80 backdrop-blur-2xl flex flex-col md:flex-row gap-4 items-center justify-between shadow-[0_-12px_40px_rgba(0,0,0,0.6)] relative z-30">
      {/* Unified decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* File/Folder Pickers - Unified button styles */}
      <div className="flex gap-3 w-full md:w-auto">
        <button
          type="button"
          onClick={onBrowseFile}
          className="flex-1 md:flex-none py-2.5 px-5 rounded-xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] hover:border-white/10 text-slate-200 text-xs font-semibold flex items-center justify-center gap-2 transition-all duration-300 active:scale-[0.98] group"
        >
          <File className="h-4 w-4 text-emerald-400 group-hover:scale-110 transition-transform duration-300" />
          Add File
        </button>
        <button
          type="button"
          onClick={onBrowseFolder}
          className="flex-1 md:flex-none py-2.5 px-5 rounded-xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] hover:border-white/10 text-slate-200 text-xs font-semibold flex items-center justify-center gap-2 transition-all duration-300 active:scale-[0.98] group"
        >
          <FolderOpen className="h-4 w-4 text-amber-400 group-hover:scale-110 transition-transform duration-300" />
          Add Folder
        </button>
      </div>

      {/* URL Input Form - Unified input and button styles */}
      <form
        onSubmit={onAddUrl}
        className="flex gap-3 w-full md:w-auto md:max-w-xl md:flex-1 justify-end"
      >
        <div className="flex gap-2.5 w-full">
          {/* URL Input with Validation - Unified emerald/rose theme */}
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Web link URL (e.g. google.com)"
              value={urlInput}
              onChange={(e) => onUrlInputChange(e.target.value)}
              className={`w-full pl-4 pr-10 py-2.5 text-sm rounded-xl bg-white/5 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 transition-all duration-300 ${
                isInvalid
                  ? "border border-rose-500/40 focus:border-rose-500/60 focus:ring-rose-500/30"
                  : isFormValid
                  ? "border border-emerald-500/30 focus:border-emerald-500/50 focus:ring-emerald-500/20"
                  : "border border-white/10 focus:border-indigo-500/50 focus:ring-indigo-500/50"
              }`}
            />
            {/* Validation Icons - Unified with emerald/rose */}
            {isInvalid && (
              <div className="absolute right-3.5 top-3 text-rose-400 animate-in fade-in zoom-in-95 duration-200" title="Invalid URL format">
                <AlertCircle className="h-4 w-4" />
              </div>
            )}
            {isFormValid && (
              <div className="absolute right-3.5 top-3 text-emerald-400 animate-in fade-in zoom-in-95 duration-200">
                <Check className="h-4 w-4" />
              </div>
            )}
          </div>

          <input
            type="text"
            placeholder="Display Name (optional)"
            value={urlName}
            onChange={(e) => onUrlNameChange(e.target.value)}
            className="w-1/3 px-4 py-2.5 text-sm rounded-xl bg-white/5 border border-white/10 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all duration-300 hidden sm:block"
          />

          {/* Submit Button - Unified indigo theme */}
          <button
            type="submit"
            disabled={!isFormValid}
            className={`p-2.5 rounded-xl text-xs font-semibold flex items-center justify-center transition-all duration-300 group ${
              isFormValid
                ? "bg-gradient-to-b from-indigo-500 to-indigo-600 hover:from-indigo-400 hover:to-indigo-500 border border-indigo-400/30 text-white cursor-pointer active:scale-95 shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_0_20px_rgba(99,102,241,0.4)]"
                : "bg-white/[0.03] border border-white/5 text-slate-600 cursor-not-allowed"
            }`}
          >
            <Plus className={`h-5 w-5 transition-transform duration-300 ${isFormValid && "group-hover:rotate-90"}`} />
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddResourceBar;