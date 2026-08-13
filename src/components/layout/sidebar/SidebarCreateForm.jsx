import React from "react";
import { Plus, FolderPlus } from "lucide-react";

function SidebarCreateForm({
    isExpanded,
    isCreating,
    name,
    description,
    onNameChange,
    onDescriptionChange,
    onSubmit,
    onStartCreating,
    onCancelCreating,
    onExpand,
}) {
    if (!isExpanded && !isCreating) {
        return (
            <button
                type="button"
                onClick={onExpand}
                /* Removed title="Create Workspace" to stop tooltip flash */
                className="w-full py-2.5 rounded-xl bg-white text-black font-semibold flex items-center justify-center hover:bg-white/80 transition-all duration-300 active:scale-[0.98] outline-none focus:outline-none flex-shrink-0"
            >
                <Plus className="h-4 w-4" />
            </button>
        );
    }

    if (!isCreating) {
        return (
            <button
                type="button"
                onClick={onStartCreating}
                /* ADDED: whitespace-nowrap and overflow-hidden to prevent the text wrap jump */
                className="w-full py-2.5 px-4 rounded-xl bg-white text-[#0A0A0B] font-semibold text-sm flex items-center justify-center gap-2 hover:bg-slate-200 hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] transition-all duration-300 active:scale-[0.98] animate-in fade-in outline-none focus:outline-none whitespace-nowrap overflow-hidden flex-shrink-0"
            >
                <Plus className="h-4 w-4 flex-shrink-0" />
                <span className="truncate">Create Workspace</span>
            </button>
        );
    }

    return (
        <form
            onSubmit={onSubmit}
            className="p-4 rounded-2xl border border-indigo-500/30 bg-indigo-500/5 relative overflow-hidden shadow-[0_8px_32px_-8px_rgba(99,102,241,0.15)] animate-in fade-in zoom-in-95 flex-shrink-0 w-full"
        >
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500" />

            {/* ADDED: whitespace-nowrap to stop header wrapping */}
            <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-widest flex items-center gap-2 mb-4 whitespace-nowrap overflow-hidden">
                <FolderPlus className="h-4 w-4 flex-shrink-0" /> New Workspace
            </h3>

            <div className="space-y-3">
                <input
                    type="text"
                    placeholder="Workspace Name"
                    value={name}
                    onChange={(e) => onNameChange(e.target.value)}
                    required
                    autoFocus
                    className="w-full min-w-0 px-3.5 py-2.5 text-sm rounded-xl bg-white/5 border border-white/10 text-slate-200 placeholder-slate-500 outline-none focus:border-indigo-500/50 focus:bg-white/10 transition-colors duration-300"
                />
                <textarea
                    placeholder="Short description (optional)..."
                    value={description}
                    onChange={(e) => onDescriptionChange(e.target.value)}
                    rows={2}
                    className="w-full min-w-0 px-3.5 py-2.5 text-sm rounded-xl bg-white/5 border border-white/10 text-slate-200 placeholder-slate-500 outline-none focus:border-indigo-500/50 focus:bg-white/10 transition-colors duration-300 resize-none"
                />
            </div>

            <div className="flex gap-2 justify-end mt-4">
                <button
                    type="button"
                    onClick={onCancelCreating}
                    /* ADDED: whitespace-nowrap */
                    className="px-4 py-2 rounded-lg hover:bg-white/10 text-xs text-slate-400 hover:text-white font-medium transition-colors outline-none focus:outline-none whitespace-nowrap"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    /* ADDED: whitespace-nowrap */
                    className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs text-white font-semibold shadow-[0_0_15px_rgba(99,102,241,0.3)] transition-all active:scale-95 outline-none focus:outline-none whitespace-nowrap"
                >
                    Create
                </button>
            </div>
        </form>
    );
}

export default SidebarCreateForm;